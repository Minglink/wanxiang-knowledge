// 独立调试载体；产品仍通过 Harness 加载。默认不读取个人会话或调用模型。
import { createServer } from 'node:http';
import path from 'node:path';
import { KnowledgeService, registerRoutes } from '../lib/index.js';
const fixture={id:'wanxiang-development-session',title:'本地知识库功能验证',cwd:process.cwd(),lastSeq:4,messages:[{seq:1,role:'user',text:'请记录本地知识库的测试方案，需要支持中文搜索、来源追溯和重复生成去重。'},{seq:3,role:'assistant',text:'建议使用 Markdown 保存知识正文、SQLite 保存索引。验证步骤：生成一份笔记，检索“中文搜索”，重复生成确认没有重复条目。此处是开发测试会话，尚未验证性能。'}]};
const service=await new KnowledgeService(path.resolve('.dev-data/home'),{listSessions:async()=>[{id:fixture.id,title:fixture.title}],snapshot:async id=>{if(id!==fixture.id)throw new Error('测试会话不存在');return fixture;}},path.resolve('.dev-data/knowledge')).init();
await service.updateSettings({mode:'export'});
const routes=[];registerRoutes({effect:f=>f(),webServer:{register:r=>{routes.push(r);return()=>{};}}},service);
const server=createServer((req,res)=>{const pathname=new URL(req.url,'http://local').pathname;const route=routes.find(r=>r.kind==='exact'&&r.path===pathname)||routes.find(r=>r.kind==='prefix'&&pathname.startsWith(r.path+'/'));if(route)void route.handler(req,res);else{res.writeHead(404);res.end();}});
server.listen(Number(process.env.WANXIANG_DEV_PORT||3098),'127.0.0.1',()=>console.log(`Development carrier: http://127.0.0.1:${server.address().port}/wanxiang?sessionId=${fixture.id}`));
process.on('SIGINT',async()=>{await service.dispose();server.close();process.exit();});
