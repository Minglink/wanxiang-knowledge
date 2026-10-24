import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
const base=process.argv[2];if(!base)throw new Error('请指定本机 Harness 地址，例如 http://127.0.0.1:60913');
const html=await(await fetch(base+'/wanxiang')).text();const token=html.match(/name="wanxiang-token" content="([^"]+)"/)?.[1];if(!token)throw new Error('插件页面没有加载');
const api=async(action,data)=>{const r=await fetch(base+'/api/wanxiang/'+action,{method:data?'POST':'GET',headers:{'x-wanxiang-token':token,...data?{'content-type':'application/json'}:{}},body:data?JSON.stringify(data):undefined});const j=await r.json();if(!r.ok)throw new Error(j.error);return j;};
const fixture=JSON.parse(await readFile('dist/live-fixture.json','utf8'));const original=(await api('state')).settings;
const root=path.resolve('实机测试产物');const checks=[];const pass=(name,details)=>{checks.push({name,pass:true,...details});console.log('PASS: '+name);};
try{
 await api('settings',{root,mode:'export'});
 const sessions=await api('sessions');assert.ok(sessions.some(s=>s.id===fixture.id));pass('真实宿主列出专用测试会话',{sessions:sessions.length});
 const snapshot=await api('session?id='+fixture.id);assert.equal(snapshot.messageCount,1);assert.equal(snapshot.title,fixture.title);pass('真实会话正文与标题读取');
 async function run(mode){const j=await api('generate',{sessionId:fixture.id,mode});const until=Date.now()+150000;while(Date.now()<until){const state=await api('state');const current=state.jobs.find(x=>x.id===j.id);if(['success','failed','cancelled','skipped'].includes(current.status))return current;await new Promise(r=>setTimeout(r,1000));}throw new Error('模型整理等待超时，请检查宿主日志');}
 const exported=await run('export');assert.ok(['success','skipped'].includes(exported.status),exported.error);pass('一键原文落库',{entryIds:exported.entryIds});
 const again=await run('export');assert.equal(again.status,'skipped');pass('同一会话重复生成去重');
 let found=await api('search?q='+encodeURIComponent('中文检索'));assert.ok(found.length);pass('SQLite 中文搜索',{matches:found.length});
 const e=await api('entry?id='+found[0].id);await api('edit',{id:e.id,title:e.title,body:e.body+'\n\n实机编辑验证：记录已保存。',expected:e.updatedAt});found=await api('search?q='+encodeURIComponent('实机编辑验证'));assert.ok(found.length);pass('知识正文编辑与即时索引');
 const rebuild=await api('rebuild',{});assert.ok(rebuild.count);pass('索引重建',{count:rebuild.count});
 for(const [name,detector] of [['Node.js','node'],['Python','python'],['Git','git']]){const existing=(await api('state')).tools.find(t=>t.name===name&&t.detector===detector);const t=await api('tool/save',{id:existing?.id,name,detector,category:'运行环境',type:'CLI',path:detector,notes:'实机版本检测条目'});const detected=await api('tool/detect',{id:t.id});pass(name+' 实机版本检测',{status:detected.status,version:detected.version});}
 const ai=await run('ai');assert.ok(['success','skipped'].includes(ai.status),ai.error);pass('真实宿主模型整理并发布知识',{model:ai.model,entryIds:ai.entryIds,usage:ai.usage});
 const aiAgain=await run('ai');assert.equal(aiAgain.status,'skipped');pass('AI 结果去重，无重复模型调用');
 const final=await api('state');await mkdir('dist',{recursive:true});await writeFile('dist/实机测试结果.json',JSON.stringify({time:new Date().toISOString(),host:base,fixture:fixture.id,root,checks,stats:final.stats},null,2));
 console.log('产物：'+root);
}finally{await api('settings',original);}
