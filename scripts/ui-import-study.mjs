import { chromium } from 'playwright';
import {createServer} from 'node:http';
import {mkdtemp,mkdir,writeFile,rm} from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import assert from 'node:assert/strict';
import {KnowledgeService,registerRoutes} from '../lib/index.js';

const temporary=await mkdtemp(path.join(os.tmpdir(),'wanxiang-import-ui-'));
const service=await new KnowledgeService(path.join(temporary,'home'),{listSessions:async()=>[]},path.join(temporary,'kb')).init();
const routes=[];registerRoutes({effect:f=>f(),webServer:{register:r=>{routes.push(r);return()=>{};}}},service);
const server=createServer((req,res)=>{const pathname=new URL(req.url,'http://local').pathname;const route=routes.find(r=>r.kind==='exact'&&r.path===pathname)||routes.find(r=>r.kind==='prefix'&&pathname.startsWith(r.path+'/'));if(route)void route.handler(req,res);else{res.statusCode=404;res.end();}});
const browser=await chromium.launch({headless:true,channel:'msedge'});const checks=[];
try{
 await new Promise(r=>server.listen(0,'127.0.0.1',r));const base='http://127.0.0.1:'+server.address().port;
 const page=await browser.newPage({viewport:{width:1280,height:1000}});const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto(base+'/wanxiang');
 await page.getByRole('button',{name:'导入知识库',exact:true}).click();await page.locator('#wx-import-drop').waitFor();checks.push('顶部入口与导入进度弹窗');
 const chooser=page.waitForEvent('filechooser');await page.getByRole('button',{name:'选择文件 / ZIP',exact:true}).click();await(await chooser).setFiles({name:'第一条.md',mimeType:'text/markdown',buffer:Buffer.from('# 首次导入\n可直接检索的第一条知识')});
 await page.waitForFunction(()=>document.querySelector('dialog')?.innerText.includes('新增 1'));await service.imports.wait();assert.equal(service.store.entries.size,1);checks.push('文件选择经真实HTTP落库并显示完成进度');
 await page.locator('dialog [data-action="close"]').click();await page.waitForFunction(()=>document.querySelector('.stats')?.textContent.includes('1')||document.querySelector('main')?.textContent.includes('首次导入'));assert.equal(service.store.search('第一条知识').length,1);
 const dropped=await page.evaluateHandle(()=>{const d=new DataTransfer();d.items.add(new File(['# 第二条\n拖入自动刷新图谱的知识'],'第二条.md',{type:'text/markdown'}));return d;});
 await page.dispatchEvent('body','drop',{dataTransfer:dropped});await page.waitForFunction(()=>document.querySelector('dialog')?.innerText.includes('第二条.md'));await service.imports.wait();assert.equal(service.store.entries.size,2);checks.push('页面拖拽导入与搜索即时可用');
 await page.waitForFunction(()=>document.querySelector('dialog')?.innerText.includes('新增 1'));
 await page.locator('dialog [data-action="close"]').click();await page.waitForFunction(()=>document.querySelector('main')?.textContent.includes('第二条'));await page.waitForTimeout(1700);
 const nodeCount=await page.locator('.wx-graph-count').innerText();assert.match(nodeCount,/2 个条目.*2 个节点/);checks.push('短任务完成后总览和图谱自动刷新');
 await page.getByRole('button',{name:'导入知识库',exact:true}).click();const repeat=page.waitForEvent('filechooser');await page.getByRole('button',{name:'选择文件 / ZIP',exact:true}).click();await(await repeat).setFiles({name:'再次.md',mimeType:'text/markdown',buffer:Buffer.from('# 首次导入\n可直接检索的第一条知识')});await page.waitForFunction(()=>document.querySelector('dialog')?.innerText.includes('全部已存在'));assert.equal(service.store.entries.size,2);checks.push('UI重复导入跳过，不增知识条数');
 await mkdir('dist/import-study',{recursive:true});await page.screenshot({path:'dist/import-study/import-ui.png',fullPage:true});assert.deepEqual(errors,[]);
 await writeFile('dist/import-study/ui-check.json',JSON.stringify({syntheticOnly:true,knowledgeEntries:2,checks,browserErrors:errors,onlineModelRequests:0},null,2));console.log(JSON.stringify({checks,browserErrors:errors}));
}finally{await browser.close();await new Promise(r=>server.close(r));await service.dispose();assert.ok(temporary.startsWith(os.tmpdir()+path.sep));await rm(temporary,{recursive:true,force:true});}
