import path from 'node:path';import {pathToFileURL} from 'node:url';import {writeFile} from 'node:fs/promises';import assert from 'node:assert/strict';
const root=path.join(process.env.LOCALAPPDATA,'Programs/DeepSeek Harness/resources/app.asar/dsh/node_modules/@deepseek-ai');
const load=name=>import(pathToFileURL(path.join(root,name,'lib/index.js')).href);
const {wanxiangCommand}=await import('../../dist/commands-models/command.js');
const {Context}=await load('cordis');const {CommandRuntime}=await load('dsh-commands');const {LlmRuntime,LlmAdapter,createUserMessage}=await load('dsh-llm');const {Session,SESSION_FORMAT_VERSION}=await load('dsh-session');
const ctx=new Context();const commands=new CommandRuntime(ctx);const session=Session.create('synthetic-command',undefined,{id:'synthetic-command',version:SESSION_FORMAT_VERSION,createdAt:Date.now(),cwd:process.cwd(),isSeeded:false});
const queue=[];const agent={session,followup:message=>queue.push(message)};
const dispose=commands.register(wanxiangCommand(()=>({schemas:()=>[{name:'knowledge_search'},{name:'knowledge_read'}]})));
assert.ok(commands.list(agent).some(item=>item.name==='wanxiang'));
await commands.execute(agent,'/wanxiang test',[],new AbortController().signal);
assert.equal(queue.length,1);assert.ok(queue[0].content[0].text.includes('knowledge_search'));
assert.ok(session.snapshotEvents().some(event=>event.type==='command/done'));
assert.equal(session.snapshotEvents().find(event=>event.type==='command/run').data.args,undefined);
dispose();assert.equal(commands.find(agent,'wanxiang'),undefined);
const llm=new LlmRuntime(ctx);class Adapter extends LlmAdapter{listModels(provider){return Promise.resolve([{provider,id:'synthetic-model',name:'Synthetic model'}]);}}
const unreg=llm.registerAdapter(['synthetic-provider'],new Adapter());assert.equal(llm.listProviders()[0].id,'synthetic-provider');assert.equal((await llm.listModels('synthetic-provider'))[0].id,'synthetic-model');unreg();
const result={runtime:process.version,commandRegister:true,commandDiscovery:true,commandExecute:true,lifecycle:true,commandDispose:true,followupMessageShape:true,modelProviderList:true,modelCatalog:true,onlineRequests:0};await writeFile('dist/commands-models/runtime-probe.json',JSON.stringify(result,null,2));console.log(result);process.exit(0);
