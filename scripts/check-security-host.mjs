import assert from 'node:assert/strict';
import { promises as fs } from 'node:fs';
import path from 'node:path';
const base = new URL(process.argv[2]);
if(base.protocol!=='http:'||!['127.0.0.1','localhost','[::1]'].includes(base.hostname))throw new Error('只允许本机Harness');
const html=await(await fetch(new URL('/wanxiang',base))).text();
const token=html.match(/name="wanxiang-token" content="([^"]+)"/)?.[1];
if(!token)throw new Error('无法获取万象页面访问令牌');
const api=async(action,data)=>{
  const r=await fetch(new URL('/api/wanxiang/'+action,base),{method:data?'POST':'GET',headers:{'x-wanxiang-token':token,...(data?{'content-type':'application/json'}:{})},body:data?JSON.stringify(data):undefined,signal:AbortSignal.timeout(45000)});
  if(!r.ok)throw new Error(`接口 ${action}: ${r.status}`);return r.json();
};
const state=await api('state');
const registered=state.security?.registered||[];
assert.equal(registered.length,23,'当前宿主尚未加载23个安全工具接口');
const tools=state.tools.filter(t=>t.id.startsWith('wanxiang-security-'));
assert.equal(tools.length,25,'当前宿主工具目录不完整');
const detections=[];
for(const tool of tools){const result=await api('tool/detect',{id:tool.id});assert.equal(result.status,'可用',tool.name);detections.push({name:result.name,version:result.version,status:result.status});}
const report={checkedAt:new Date().toISOString(),host:base.origin,registered,tools:detections,knowledge:state.stats};
if(process.argv.includes('--report'))await fs.writeFile(path.join(state.settings.root,'tools','host-verification.json'),JSON.stringify(report,null,2));
console.log(JSON.stringify(report,null,2));
