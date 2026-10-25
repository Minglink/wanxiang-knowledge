// Execute the installed adapters without opening/rebuilding the production knowledge database.
import { promises as fs } from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { pathToFileURL } from 'node:url';
import assert from 'node:assert/strict';
const home=path.resolve(process.env.DSH_HOME||path.join(os.homedir(),'.dsh'));
const {root}=JSON.parse(await fs.readFile(path.join(home,'wanxiang/settings.json'),'utf8'));
const installed=path.join(home,'profiles/desktop/node_modules/dsh-wanxiang-knowledge/lib/index.js');
const {securityTools}=await import(pathToFileURL(installed).href);
const service={home,store:{local:(...parts)=>path.join(root,...parts)}};
const tools=securityTools(service);
const dir=path.join(root,'tools','samples');await fs.mkdir(dir,{recursive:true});
const file=path.join(dir,'wanxiang-synthetic.bin');
await fs.writeFile(file,Buffer.concat([Buffer.from([0x90,0xc3,0]),Buffer.from('WANXIANG SYNTHETIC SAMPLE\0'),Buffer.from('WIDE STRING','utf16le')]));
const calls=[['security_environment',{}],['security_disassemble',{file,arch:'x64',size:2}],['security_strings',{file}]];
if(process.platform==='win32')calls.push(['security_binary_inspect',{file:path.join(process.env.SystemRoot,'System32/notepad.exe')}]);
const results=[];
for(const [name,args] of calls){const response=JSON.parse(await tools.find(t=>t.name===name).execute(args));assert.ok(response.result);results.push({tool:name,report:path.join(root,'tools','runs',response.id+'.json'),ok:true});}
await fs.writeFile(path.join(root,'tools','verification.json'),JSON.stringify({checkedAt:new Date().toISOString(),scope:'已安装插件适配器；合成样本和系统notepad.exe；未调用模型或执行样本',results},null,2));
console.log(JSON.stringify({verified:results.length,report:path.join(root,'tools','verification.json')},null,2));
