import { hostModelCatalog } from './model-selection.js';
import { registerWanxiangCommand } from './wanxiang-command.js';
import { discoverHostTools } from './tool-discovery.js';
import { manualToolDirectory } from './tool-directory.js';
import { knowledgeTools } from './knowledge-tools.js';
export { knowledgeTools } from './knowledge-tools.js';
import { recallApi } from './recall-api.js';
export { RecallLog } from './recall-log.js';
export { recallApi } from './recall-api.js';
export { RecallProcessPool, RecallTimeout } from './recall-process-pool.js';
export { skipRecall, recallConfidence } from './recall-query.js';
export { RecallSearch } from './recall-search.js';
export { RecallService } from './recall-service.js';
export { recallOptions } from './recall-options.js';
export { recallTemplate } from './recall-template.js';
import { reorganize, rollbackReorganize } from './storage-reorganize.js';
export { reorganize, rollbackReorganize } from './storage-reorganize.js';
import { SearchService } from './search-service.js';
import { validateAliases } from './query-rewrite.js';
import { atomic } from './store.js';
export { SearchService } from './search-service.js';
export { rewriteRules, rewriteModel } from './query-rewrite.js';
export { parseGenerated } from './service.js';
export { metadataFields, redacted } from './knowledge-prompts.js';
export { MarkdownRepo } from './markdown-repo.js';
export { NodeSqliteEngine } from './node-sqlite-engine.js';
export { createEngine } from './engine-factory.js';
export { SqlJsEngine } from './sqljs-engine.js';
import { promises as fs } from 'node:fs';
import { spawn } from 'node:child_process';
import path from 'node:path';
import os from 'node:os';
import { randomBytes } from 'node:crypto';
import { KnowledgeService } from './service.js';
import { harnessHost } from './harness.js';
import { buildGraph, relatedGraph } from './graph.js';
import { jobPage } from './workspace-data.js';
export { buildGraph, relatedGraph } from './graph.js';
export { KnowledgeService } from './service.js';
export { Store } from './store.js';
export { snapshotEvents, harnessHost } from './harness.js';
export const name='dsh-wanxiang-knowledge';
export const inject=['webServer','sessions','sessionPersistence','agents','llm','agentDefaultModel'];
export async function apply(ctx:any){
 const home=path.resolve(process.env.DSH_HOME||path.join(os.homedir(),'.dsh'));
 let catalog:any;ctx.inject(['sessionController'],(child:any)=>{child.effect(()=>{catalog=child.sessionController;return()=>{catalog=undefined;};});});
 const service=await new KnowledgeService(home,harnessHost(ctx,()=>catalog)).init();
 service.host.listModels=async()=>hostModelCatalog(ctx.llm,ctx.agentDefaultModel);
 service.host.listTools=async(sessionId='')=>discoverHostTools(ctx,sessionId);
 registerRoutes(ctx,service);
 registerWanxiangCommand(ctx);
 ctx.inject(['systemPrompt'],(child:any)=>child.effect(()=>service.recall.setProvider(child.systemPrompt)));
 ctx.on('session/event',(session:any,event:any)=>{if(event.type==='session/title')service.pendingTitles.forget(session.id);try{service.recall.event(session,event);}catch{ctx.logger?.warn('自动召回事件处理失败，本轮跳过');}if(event.type==='turn/end'){void service.markPending(session.id,session.header.title||session.id).catch((e:any)=>ctx.logger?.warn(e.message));}});
 ctx.inject(['tools'],(toolCtx:any)=>{
   const defs=knowledgeTools(service);
   for(const def of defs)toolCtx.effect(()=>toolCtx.tools.register(def));
 });
 ctx.effect(()=>()=>{void service.dispose();});
 ctx.logger?.info('万象知识库已启用：'+service.settings.root);
}
export function registerRoutes(ctx:any,service:KnowledgeService){
 const token=randomBytes(32).toString('hex');
 const send=(res:any,code:number,data:any)=>{res.writeHead(code,{'content-type':'application/json; charset=utf-8','cache-control':'no-store','x-content-type-options':'nosniff'});res.end(JSON.stringify(data));};
 async function body(req:any){let buf='';for await(const chunk of req){buf+=chunk;if(Buffer.byteLength(buf)>1024*1024)throw new Error('请求内容超过 1MB');}try{return JSON.parse(buf||'{}');}catch{throw new Error('请求 JSON 无效');}}
 const routes=[{kind:'exact',path:'/wanxiang',handler:async(req:any,res:any)=>{if(!['GET','HEAD'].includes(req.method)){send(res,405,{error:'不支持的方法'});return;}try{const html=(await fs.readFile(new URL('./panel.html',import.meta.url),'utf8')).replace('__WANXIANG_TOKEN__',token);res.writeHead(200,{'content-type':'text/html; charset=utf-8','cache-control':'no-store','x-content-type-options':'nosniff','referrer-policy':'same-origin','content-security-policy':"default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self'; object-src 'none'; base-uri 'none'"});res.end(req.method==='HEAD'?'':html);}catch(e:any){send(res,500,{error:e.message});}}},
 {kind:'prefix',path:'/wanxiang/assets',handler:async(req:any,res:any)=>{const name=new URL(req.url,'http://local').pathname.split('/').at(-1);if(req.method!=='GET'||!['panel.js','style.css'].includes(name!)){send(res,404,{error:'资源不存在'});return;}try{const data=await fs.readFile(new URL('./'+name,import.meta.url));res.writeHead(200,{'content-type':name==='style.css'?'text/css; charset=utf-8':'text/javascript; charset=utf-8','cache-control':'no-store','x-content-type-options':'nosniff'});res.end(data);}catch(e:any){send(res,500,{error:e.message});}}},
 {kind:'prefix',path:'/api/wanxiang',handler:async(req:any,res:any)=>{try{if(req.headers['x-wanxiang-token']!==token){send(res,403,{error:'请从万象知识库页面访问'});return;}const url=new URL(req.url,'http://local');const action=url.pathname.slice('/api/wanxiang/'.length);const data=req.method==='POST'?await body(req):{};if(!['GET','POST'].includes(req.method)){send(res,405,{error:'不支持的方法'});return;}let result:any;
 if(action==='recall'||action.startsWith('recall/')){send(res,200,await recallApi(service,req.method,action,data,url.searchParams));return;}
 if(req.method==='GET')switch(action){case 'models':result=service.host.listModels?await service.host.listModels():{models:[],warning:'宿主未提供模型目录'};break;case 'graph-activity':result=service.graphActivity.page(service.store.root,Number(url.searchParams.get('after'))||0);break;case 'tool-catalog':result=await manualToolDirectory(service.store.tools);break;case 'jobs':result=jobPage(service.jobs,Number(url.searchParams.get('offset')),Number(url.searchParams.get('limit')||50));break;case 'related':result=relatedGraph(service.store.entries.values(),service.store.tools,url.searchParams.get('id')||'');break;case 'graph':result=buildGraph(service.store.entries.values(),service.store.tools,{scope:url.searchParams.get('scope')||'all',project:url.searchParams.get('project')||'',type:url.searchParams.get('type')||'',archived:url.searchParams.get('archived')==='1',limit:Number(url.searchParams.get('limit')||1500),cluster:url.searchParams.get('cluster')||'',focus:url.searchParams.get('focus')||''});break;case 'state':result=await service.state();break;case 'sessions':result=await service.host.listSessions();break;case 'session':{const s=await service.host.snapshot(url.searchParams.get('id')||'');result={id:s.id,title:s.title,cwd:s.cwd,messageCount:s.messages.length,lastSeq:s.lastSeq,model:s.model};break;}case 'aliases':result=new SearchService(service.store).aliases();break;case 'search':if(url.searchParams.has('mode')){result=await new SearchService(service.store,service.host).search(url.searchParams.get('q')||'',{mode:url.searchParams.get('mode')||'hybrid',type:url.searchParams.get('type')||'',project:url.searchParams.get('project')||'',archived:url.searchParams.get('archived')==='1',validOnly:url.searchParams.get('validOnly')!=='0',offset:Number(url.searchParams.get('offset')),limit:Number(url.searchParams.get('limit')||20),smartRewrite:url.searchParams.get('rewrite')==='1',updatedAfter:url.searchParams.get('updatedAfter')||undefined,updatedBefore:url.searchParams.get('updatedBefore')||undefined});break;}result=service.store.search(url.searchParams.get('q')||'',url.searchParams.get('type')||'',url.searchParams.get('archived')==='1',url.searchParams.get('project')||'').map(e=>({...e,body:e.body.slice(0,1200)}));break;case 'entry':result=service.store.read(url.searchParams.get('id')||'');break;default:send(res,404,{error:'接口不存在'});return;}
 else switch(action){case 'storage/reorganize':case 'storage/rollback':result=await service.mutations.run(async()=>{if(service.jobs.some(j=>['running','queued'].includes(j.status))||service.metadataJobs.status==='running')throw new Error('请等待后台任务结束');return action==='storage/rollback'?rollbackReorganize(service.store):reorganize(service.store,data.preview!==false);});break;case 'aliases/save':await service.mutations.run(()=>atomic(service.store.local('.wanxiang/aliases.json'),JSON.stringify(validateAliases(data),null,2)));result={ok:true};break;case 'metadata/start':service.metadataJobs.start();result={ok:true};break;case 'metadata/cancel':service.metadataJobs.cancel();result={ok:true};break;case 'generate':result=await service.generate(String(data.sessionId||''),data.mode);break;case 'cancel':result=service.cancel(data.id);break;case 'edit':{if(typeof data.body!=='string'||typeof data.title!=='string')throw new Error('笔记内容无效');result=await service.mutations.run(()=>service.store.edit(data.id,data.body,data.title,data.expected,data.archived));break;}case 'rebuild':if(service.jobs.some(j=>['running','queued'].includes(j.status)))throw new Error('请等待落库完成后重建索引');result=await service.mutations.run(()=>service.store.rebuild());break;case 'settings':result=await service.updateSettings(data);break;case 'tool/save':result=await service.mutations.run(()=>service.store.saveTool(data));break;case 'tool/remove':await service.mutations.run(()=>service.store.removeTool(data.id));result={ok:true};break;case 'tool/detect':result=await service.mutations.run(()=>service.detect(data.id));break;case 'pending/dismiss':await service.mutations.run(async()=>{delete service.pending[data.id];await service.persistPending();});result={ok:true};break;case 'open':{let file=service.settings.root;if(data.id){const e=service.store.entries.get(data.id);if(!e)throw new Error('知识不存在');file=path.dirname(service.store.local(e.file));}const bin=process.platform==='win32'?'explorer.exe':process.platform==='darwin'?'open':'xdg-open';await new Promise<void>((resolve,reject)=>{const p=spawn(bin,[file],{windowsHide:true,stdio:'ignore',detached:true});p.once('error',reject);p.once('spawn',()=>{p.unref();resolve();});});result={ok:true};break;}default:send(res,404,{error:'接口不存在'});return;}
 send(res,200,result);
 }catch(e:any){send(res,400,{error:String(e.message||e)});}}}];
 for(const route of routes)ctx.effect(()=>ctx.webServer.register(route));
}
