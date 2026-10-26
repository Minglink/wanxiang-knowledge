import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, rm, symlink } from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { createServer } from 'node:http';
import { knowledgeTools, renderMarkdown, markdownLinks, Store, SearchService, KnowledgeService, registerRoutes } from '../lib/index.js';

test('knowledge_read pages recover long code including JSON expansion without lost characters', async () => {
  const body = '<>&"\\\n😀'.repeat(15000) + '最后一行';
  const entry = {id:'long',title:'Long code',body,links:[],sourceSeqs:[]};
  const read = knowledgeTools({store:{read:()=>entry}}).find(t=>t.name==='knowledge_read');
  let offset=0,joined='',pages=0;
  do {
    const raw=await read.execute({id:'long',offset});
    assert.ok(raw.length<=24000);const {items}=JSON.parse(raw);assert.equal(items.length,1);
    const page=items[0];assert.equal(page.offset,offset);joined+=page.body;pages++;
    if(page.nextOffset===null){assert.equal(page.truncated,false);break;}
    assert.ok(page.nextOffset>offset);assert.equal(page.nextOffset,offset+page.body.length);offset=page.nextOffset;
  } while(pages<200);
  assert.equal(joined,body);assert.ok(pages>10);
  await assert.rejects(read.execute({id:'long',offset:-1}),/偏移/);
  await assert.rejects(read.execute({id:'long',offset:body.length+1}),/偏移/);
  await assert.rejects(read.execute({id:'long',limit:12001}),/字符数/);
  assert.equal(JSON.parse(await read.execute({id:'long',offset:body.length})).items[0].nextOffset,null);
});

test('Markdown renders local images, links, tables, variable fences, and escapes executable content',()=>{
  const html=renderMarkdown('# 标题\n![配图](../sources/中文%23x/a(1).png)\n[附件](../sources/a.zip)\n[x](javascript:alert(1))\n<script>alert(1)</script>\n| a | b |\n| --- | --- |\n| 1 | 2 |\n````js\n```\n<img src=x>\n````',p=>'/api/asset?path='+encodeURIComponent(p));
  assert.match(html,/<img class="knowledge-image"/);assert.match(html,/<a href="\/api\/asset/);
  assert.match(html,/<table>/);assert.match(html,/<pre><code>```/);assert.doesNotMatch(html,/<script|href="javascript:|<img src=x>/);
  assert.match(html,/&lt;script&gt;/);
  assert.equal(markdownLinks('[a](x(y).zip)')[0].target,'x(y).zip');
});

test('Credential redaction before JSON encoding preserves the following code line across pages',async()=>{
 const original='password=abcdefgh123456\nreturn keep_this_line;\n'+'x'.repeat(12010);
 const expected='password=[已隐藏凭据]\nreturn keep_this_line;\n'+'x'.repeat(12010);
 const read=knowledgeTools({store:{read:()=>({id:'secret',body:original,title:'Secret',sourceSeqs:[]})}}).find(t=>t.name==='knowledge_read');
 let joined='',offset=0;while(true){const p=JSON.parse(await read.execute({id:'secret',offset})).items[0];joined+=p.body;if(p.nextOffset===null)break;offset=p.nextOffset;}
 assert.equal(joined,expected);
});

test('Exact article title outranks newer attachment chunks; pagination retains every result',async t=>{
  const root=await mkdtemp(path.join(os.tmpdir(),'wx-ranking-')),store=await new Store(root).init();
  t.after(async()=>{store.close();await rm(root,{recursive:true,force:true});});
  for(let i=0;i<40;i++)await store.save({id:'r'+i,title:i===39?'超星网页字体解密':'超星网页字体解密.zip · 第 '+i+' 组',body:'超星网页字体解密',l0:'超星网页字体解密',tags:[],type:'note',project:'book',sourceTitle:'1987108_title/a.md',file:'notes/r'+i+'.md',archived:false,updatedAt:i===39?'2020-01-01':'2026-01-01'});
  await store.save({id:'other',title:'字体解密的另一篇文章',body:'超星网页字体解密',l0:'超星网页字体解密',tags:[],type:'note',project:'book',sourceTitle:'1990000_other/a.md',file:'notes/other.md',archived:false,updatedAt:'2026-01-01'});
  for(const mode of ['exact','hybrid','deep']){
    const s=new SearchService(store),all=await s.search('超星网页字体解密',{mode,limit:100});
    assert.equal(all.items[0].id,'r39');assert.ok(all.items.slice(0,12).some(e=>e.id==='other'));assert.equal(all.total,41);
    const ids=[];for(let offset=0;offset<all.total;offset+=10)ids.push(...(await s.search('超星网页字体解密',{mode,offset,limit:10})).items.map(e=>e.id));
    assert.equal(new Set(ids).size,41);
  }
});

test('Asset HTTP authenticates, streams real images and downloads; rejects traversal and symlink escape',async t=>{
  const baseDir=await mkdtemp(path.join(os.tmpdir(),'wx-assets-'));
  const service=await new KnowledgeService(path.join(baseDir,'home'),{listSessions:async()=>[]},path.join(baseDir,'kb')).init();
  t.after(async()=>{await service.dispose();await rm(baseDir,{recursive:true,force:true});});
  await mkdir(service.store.local('sources','图#片'),{recursive:true});
  const png=Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jRZkAAAAASUVORK5CYII=','base64');
  await writeFile(service.store.local('sources','图#片','a.png'),png);
  await writeFile(service.store.local('sources','file.zip'),'ZIP');
  await writeFile(service.store.local('sources','bad.svg'),'<svg onload="alert(1)"></svg>');
  await writeFile(service.store.local('private.txt'),'private');
  await mkdir(path.join(baseDir,'outside'));await writeFile(path.join(baseDir,'outside','secret.txt'),'outside');
  await symlink(path.join(baseDir,'outside'),service.store.local('sources','escape'),'junction');
  const targets=['../sources/图%23片/a.png','../sources/file.zip','../sources/bad.svg','../private.txt','../sources/escape/secret.txt'];
  await service.store.save({id:'assets',title:'Images',body:targets.map(p=>'[asset]('+p+')').join('\n'),file:'notes/assets.md',type:'note',tags:[],project:'',archived:false,updatedAt:'2026-01-01'});
  const routes=[];registerRoutes({effect:f=>f(),webServer:{register:r=>routes.push(r)}},service);
  const server=createServer((req,res)=>{const p=new URL(req.url,'http://local').pathname;const route=routes.find(r=>r.kind==='exact'&&r.path===p)||routes.find(r=>r.kind==='prefix'&&p.startsWith(r.path+'/'));if(route)void route.handler(req,res);else{res.writeHead(404);res.end();}});
  await new Promise(r=>server.listen(0,'127.0.0.1',r));t.after(()=>new Promise(r=>server.close(r)));
  const base='http://127.0.0.1:'+server.address().port;
  const html=await fetch(base+'/wanxiang').then(r=>r.text()),token=html.match(/name="wanxiang-token" content="([^"]+)"/)[1];
  const url=(p,key=token)=>base+'/api/wanxiang/asset?'+new URLSearchParams({id:'assets',path:p,token:key});
  assert.equal((await fetch(url(targets[0],'wrong'))).status,403);
  let r=await fetch(url(targets[0]));assert.equal(r.status,200);assert.equal(r.headers.get('content-type'),'image/png');assert.deepEqual(Buffer.from(await r.arrayBuffer()),png);
  for(const p of targets.slice(1,3)){r=await fetch(url(p));assert.equal(r.status,200);assert.match(r.headers.get('content-disposition'),/^attachment;/);}
  for(const p of [...targets.slice(3),'../sources/not-listed.png'])assert.equal((await fetch(url(p))).status,400);
  assert.equal((await fetch(base+'/api/wanxiang/state?token='+token)).status,403);
});

test('Import encodes literal # and parentheses in existing asset names and keeps source anchors',async t=>{
  const root=await mkdtemp(path.join(os.tmpdir(),'wx-import-url-'));
  const s=await new KnowledgeService(path.join(root,'home'),{listSessions:async()=>[]},path.join(root,'kb')).init();
  t.after(async()=>{await s.dispose();await rm(root,{recursive:true,force:true});});
  const files=[['book/note.md','![图](images/a#b(1).png)\n[下一篇](next.md#section)'],['book/next.md','# Next'],['book/images/a#b(1).png','image']].map(([path,text])=>({path,data:Buffer.from(text).toString('base64')}));
  const j=await s.imports.upload(files,'test');await s.imports.wait();assert.equal(j.status,'success',j.error);
  const e=[...s.store.entries.values()].find(e=>e.sourceTitle==='book/note.md');
  assert.match(e.body,/a%23b%281%29\.png/);assert.match(e.body,/#section\)/);
});
