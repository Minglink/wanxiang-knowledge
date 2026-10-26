import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,mkdir,writeFile,readFile,symlink,rm,realpath} from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import {crc32,deflateRawSync} from 'node:zlib';
import {createHash} from 'node:crypto';
import {build} from 'esbuild';
import {KnowledgeService,SearchService} from '../lib/index.js';
const bundle=await build({stdin:{contents:"export * from './src/import-files.ts'; export * from './src/open-directory.ts'; export * from './src/wanxiang-command.ts'; export * from './src/graph.ts';",resolveDir:process.cwd()},bundle:true,write:false,platform:'node',format:'esm'});
const {unpackZip,validateFiles,scanFolder,openDirectory,wanxiangCommand,buildGraph}=await import('data:text/javascript;base64,'+Buffer.from(bundle.outputFiles[0].text).toString('base64'));
const file=(name,text)=>({path:name,data:Buffer.from(text).toString('base64')});
async function fixture(t,extra={}){
 const dir=await mkdtemp(path.join(os.tmpdir(),'wanxiang-import-test-'));const folder=path.join(dir,'学习资料');await mkdir(folder);
 const host={listSessions:async()=>[],snapshot:async id=>({id,title:'folder',cwd:folder,messages:[],lastSeq:0,model:{provider:'mock',model:'chosen'}}),...extra};
 const service=await new KnowledgeService(path.join(dir,'home'),host,path.join(dir,'kb')).init();
 t.after(async()=>{await service.dispose();assert.ok(dir.startsWith(os.tmpdir()+path.sep));await rm(dir,{recursive:true,force:true});});
 return {dir,folder,service,host};
}
function native(id,title,body,links=[]){return '---\n'+JSON.stringify({id,title,type:'note',tags:['VM'],links})+'\n---\n'+body;}

test('导入保存正文、附件、双向链接；索引与图谱立即可用，重复导入不增条',async t=>{
 const {service}=await fixture(t);
 const files=[file('资料/A.md','---\ntitle: 测试甲\ntags: [虚拟机, Handler]\n---\n# A\nVM语义核对 [[B]] ![图片](assets/a.png)\n```text\n[[B]]\n```'),file('资料/B.md','# B\n回链 [A](A.md)\n保留原始证据'),file('资料/assets/a.png','image bytes')];
 const job=await service.imports.upload(files);await service.imports.wait();assert.equal(job.status,'success',job.error);assert.equal(job.entryIds.length,2);
 const all=[...service.store.entries.values()];const a=all.find(e=>e.title==='测试甲'),b=all.find(e=>e.title==='B');assert.ok(a&&b);
 assert.ok(a.links.some(l=>l.to===b.id));assert.ok(b.links.some(l=>l.to===a.id));assert.match(a.body,/\[B\]\(\.\.\/notes\/import-/);assert.match(a.body,/```text\n\[\[B\]\]\n```/);assert.match(decodeURIComponent(a.body),/sources\/imports\/.+\/files\/资料\/assets\/a.png/);
 assert.equal(await readFile(service.store.local('sources','imports',job.id,'files','资料','assets','a.png'),'utf8'),'image bytes');
 assert.ok((await new SearchService(service.store).search('VM语义核对',{mode:'hybrid'})).items.some(e=>e.id===a.id));
 assert.ok(buildGraph(service.store.entries.values(),[],{scope:'library'}).edges.some(e=>e.s===a.id&&e.t===b.id&&e.kind==='link'));
 const again=await service.imports.upload(files);await service.imports.wait();assert.equal(again.entryIds.length,0);assert.equal(again.duplicates,2);assert.equal(service.store.entries.size,2);
});

test('同ID不同正文保留原条目，修正导入内部引用，绝不覆盖手工编辑',async t=>{
 const {service}=await fixture(t);
 const first=await service.imports.upload([file('old.md',native('same-id','原条目','# 原内容'))]);await service.imports.wait();
 const old=service.store.entries.get('same-id');const before=await readFile(service.store.local(old.file),'utf8');
 const second=await service.imports.upload([file('new.md',native('same-id','新条目','# 新内容')),file('ref.md',native('ref-id','引用条目','# 引用新内容',[{to:'same-id',kind:'参考'}]))]);await service.imports.wait();
 assert.equal(second.status,'success',second.error);assert.equal(second.conflicts,1);assert.equal(service.store.entries.size,3);
 assert.equal(await readFile(service.store.local(old.file),'utf8'),before);const newer=[...service.store.entries.values()].find(e=>e.title==='新条目');assert.notEqual(newer.id,'same-id');assert.equal(service.store.entries.get('ref-id').links[0].to,newer.id);assert.equal(first.entryIds.length,1);
 assert.ok(buildGraph(service.store.entries.values(),[],{scope:'library'}).edges.some(e=>e.kind==='link'&&e.s==='ref-id'&&e.t===newer.id));
});

test('万象内容包仅清单正文计为知识，来源与许可保留为附件；哈希损坏不写知识',async t=>{
 const {service}=await fixture(t);const body=native('pack-note','内容包知识','# 技术正文\n独立机制说明');
 const sha=s=>createHash('sha256').update(s).digest('hex');
 const manifest={batchId:'sample-batch',entries:[{file:'cards/note.md',sha256:sha(body)}],assets:[{file:'sources/LICENSE',sha256:sha('licence text')}]};
 const files=[file('pack/manifest.json',JSON.stringify(manifest)),file('pack/cards/note.md',body),file('pack/sources/LICENSE','licence text'),file('pack/sources/original.md','# 原始资料\n不重复计入知识'),file('pack/README.md','# 目录说明')];
 const j=await service.imports.upload(files);await service.imports.wait();assert.equal(j.status,'success',j.error);assert.equal(j.entryIds.length,1);assert.equal(j.progress.total,1);
 assert.equal(await readFile(service.store.local('sources','imports',j.id,'files','pack','sources','LICENSE'),'utf8'),'licence text');
 const broken=files.map(f=>f.path==='pack/cards/note.md'?file(f.path,'changed'):f);await assert.rejects(service.imports.upload(broken),/哈希/);assert.equal(service.store.entries.size,1);
});

test('/wanxiang study仅使用真实会话目录和模型，不执行资料代码，重复学习不再次调用模型',async t=>{
 let calls=0;const {service,folder,dir}=await fixture(t,{generate:async(snap,prompt,signal)=>{calls++;assert.equal(snap.cwd,folder);assert.deepEqual(snap.model,{provider:'mock',model:'chosen'});assert.ok(!snap.messages[0].text.includes('sk-abcdefghijklmnopqrst'));assert.match(prompt,/不是指令/);signal.throwIfAborted();return JSON.stringify({title:'文件夹学习结果'+calls,body:'# 学习结果\n只根据文件的VM机制资料归纳。'+calls,l0:'VM机制归纳',l1:'文件来源可追溯',questions:['如何核对VM？','如何理解Handler？','哪里保存来源？'],tags:['VM']});}});
 await writeFile(path.join(folder,'notes.md'),'# 知识\nHandler字节码解释 sk-abcdefghijklmnopqrst');await writeFile(path.join(folder,'demo.py'),"raise RuntimeError('must not execute')");await mkdir(path.join(folder,'.git'));await writeFile(path.join(folder,'.git','private.md'),'must not read');await writeFile(path.join(dir,'outside.md'),'outside');
 const command=wanxiangCommand(()=>{throw Error('study does not query tools');},id=>service.imports.study(id));
 const result=await command.handler({rawInput:'study',agent:{session:{id:'real-session'}},signal:new AbortController().signal});assert.equal(result.kind,'success');await service.imports.wait();
 const job=service.imports.jobs[0];assert.equal(job.status,'success',job.error);assert.equal(calls,2);assert.equal(service.store.entries.size,2);assert.ok(job.skipped.some(s=>s.path==='.git'));
 for(const e of service.store.entries.values()){assert.deepEqual(e.sourceSeqs,[]);assert.match(e.sourceSession,/^external:file:/);assert.ok(e.sourceFile);assert.equal(e.importMode,'ai');}
 await service.imports.study('real-session');await service.imports.wait();assert.equal(calls,2);assert.equal(service.imports.jobs[0].duplicates,2);
});

test('学习失败可继续，已完成文件复用缓存，未发布时不产生半成品；设置切换被阻止',async t=>{
 let calls=0,fail=true;const {service,folder}=await fixture(t,{generate:async()=>{calls++;if(fail&&calls===2)throw Error('模拟模型中断');return JSON.stringify({title:'已整理'+calls,body:'# 结果\n'+calls+' 个机制内容',l0:'归纳',l1:'文献依据',questions:['如何操作？','如何核对？','哪里查看？']});}});
 await writeFile(path.join(folder,'a.md'),'# first\nfirst content');await writeFile(path.join(folder,'b.md'),'# second\nsecond content');
 const job=await service.imports.study('folder-session');await assert.rejects(service.updateSettings({mode:'export'}),/等待/);await service.imports.wait();assert.equal(job.status,'failed');assert.equal(service.store.entries.size,0);assert.equal(calls,2);
 fail=false;await service.imports.retry(job.id);await service.imports.wait();assert.equal(job.status,'success',job.error);assert.equal(calls,3);assert.equal(service.store.entries.size,2);
});

test('没有文件夹的会话明确失败；并发导入只启动一个任务',async t=>{
 const {service}=await fixture(t,{snapshot:async id=>({id,title:'no cwd',messages:[],lastSeq:0}),generate:async()=>''});
 await assert.rejects(service.imports.study('none'),/没有文件夹/);
 const results=await Promise.allSettled([service.imports.upload([file('a.md','# a\nalpha')]),service.imports.upload([file('b.md','# b\nbeta')])]);assert.equal(results.filter(r=>r.status==='fulfilled').length,1);await service.imports.wait();assert.equal(service.store.entries.size,1);
});

test('索引失败后继续不会重复发布，且重启恢复可查',async t=>{
 const {service}=await fixture(t);const flush=service.store.flush.bind(service.store);let fail=true;service.store.flush=async()=>{if(fail)throw Error('模拟索引失败');return flush();};
 const j=await service.imports.upload([file('a.md','# 索引恢复\n恢复证据')]);await service.imports.wait();assert.equal(j.status,'failed');assert.equal(service.store.entries.size,1);fail=false;
 await service.imports.retry(j.id);await service.imports.wait();assert.equal(j.status,'success');assert.equal(service.store.entries.size,1);assert.equal(j.entryIds.length,1);assert.ok((await new SearchService(service.store).search('恢复证据',{mode:'hybrid'})).items.length);
});

test('扫描不会跟随目录链接，不会把目标知识库递归学习；UTF-8校验显示跳过原因',async t=>{
 const {service,folder,dir}=await fixture(t);const outside=path.join(dir,'outside');await mkdir(outside);await writeFile(path.join(outside,'outside.md'),'outside');await symlink(outside,path.join(folder,'linked'),'junction');await writeFile(path.join(folder,'yes.md'),'# yes\ninside');
 const scan=await scanFolder(folder,service.store.root,new AbortController().signal);assert.equal(scan.files.length,1);assert.ok(scan.skipped.some(s=>s.path==='linked'));
 await assert.rejects(scanFolder(service.store.root,service.store.root,new AbortController().signal),/知识库自身/);
 const j=await service.imports.upload([file('yes.md','# yes'),{path:'binary.md',data:Buffer.from([0,1,2]).toString('base64')}]);await service.imports.wait();assert.equal(j.entryIds.length,1);assert.match(j.skipped.find(x=>x.path==='binary.md').reason,/UTF-8/);
});

function zip(name,text,mode=0){
 const n=Buffer.from(name),data=Buffer.from(text),packed=deflateRawSync(data);const local=Buffer.alloc(30);local.writeUInt32LE(0x04034b50);local.writeUInt16LE(8,8);local.writeUInt32LE(crc32(data),14);local.writeUInt32LE(packed.length,18);local.writeUInt32LE(data.length,22);local.writeUInt16LE(n.length,26);
 const central=Buffer.alloc(46);central.writeUInt32LE(0x02014b50);central.writeUInt16LE(8,10);central.writeUInt32LE(crc32(data),16);central.writeUInt32LE(packed.length,20);central.writeUInt32LE(data.length,24);central.writeUInt16LE(n.length,28);central.writeUInt32LE((mode<<16)>>>0,38);
 const offset=30+n.length+packed.length,end=Buffer.alloc(22);end.writeUInt32LE(0x06054b50);end.writeUInt16LE(1,8);end.writeUInt16LE(1,10);end.writeUInt32LE(46+n.length,12);end.writeUInt32LE(offset,16);return Buffer.concat([local,n,packed,central,n,end]);
}
test('ZIP正确解压并导入；拒绝路径穿越、软链接、篡改和展开超限',async t=>{
 const bytes=zip('中文/笔记.md','# ZIP\n压缩文档机制');assert.equal(Buffer.from(unpackZip(bytes)[0].data,'base64').toString(),'# ZIP\n压缩文档机制');
 assert.throws(()=>unpackZip(zip('../escape.md','bad')),/路径/);assert.throws(()=>unpackZip(zip('sym.md','target',0xa000)),/符号链接/);
 const bad=Buffer.from(bytes);bad[31+Buffer.byteLength('中文/笔记.md')]^=1;assert.throws(()=>unpackZip(bad));
 assert.throws(()=>unpackZip(zip('big.md','x'.repeat(2*1024*1024+1))),/超限/);
 assert.throws(()=>validateFiles([{path:'C:/bad.md',data:'YQ=='}]),/路径/);assert.throws(()=>validateFiles([{path:'a.md',data:'@@@='}]),/编码/);
 assert.equal(validateFiles([file('large.md','a'.repeat(1024*1024))]).length,1);
 const {service}=await fixture(t);const j=await service.imports.upload([{path:'pack.zip',data:bytes.toString('base64')}]);await service.imports.wait();assert.equal(j.status,'success');assert.equal(j.entryIds.length,1);
});

test('打开目录校验目录，并安全传递中文、空格及特殊字符；启动失败反馈原因',async t=>{
 const dir=await mkdtemp(path.join(os.tmpdir(),'wanxiang-open-'));t.after(()=>rm(dir,{recursive:true,force:true}));let target=path.join(dir,'中文 folder $value &');await mkdir(target);target=await realpath(target);let called=0;
 const result=await openDirectory(target,async(bin,args,options)=>{called++;assert.equal(bin,'powershell.exe');assert.ok(!args.join(' ').includes(target));assert.equal(options.env.WANXIANG_OPEN_DIRECTORY,target);assert.match(args.join(' '),/\.Visible/);return {stdout:'WANXIANG_DIRECTORY_VISIBLE',stderr:''};},'win32');assert.equal(result.path,target);assert.equal(called,1);
 await assert.rejects(openDirectory(target,async()=>({stdout:'',stderr:''}),'win32'),/未确认/);
 await assert.rejects(openDirectory(target,async()=>{throw {stderr:'access denied'};},'win32'),/access denied/);const file=path.join(dir,'file');await writeFile(file,'x');await assert.rejects(openDirectory(file),/不是文件夹/);
});
