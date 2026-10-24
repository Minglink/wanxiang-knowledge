import { spawn } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
const base=process.argv[2];
const fixture=JSON.parse(await readFile('dist/live-fixture.json','utf8'));
const h=await(await fetch(base+'/wanxiang')).text();const token=h.match(/name="wanxiang-token" content="([^"]+)"/)[1];
const api=async(action,data)=>{const r=await fetch(base+'/api/wanxiang/'+action,{method:data?'POST':'GET',headers:{'x-wanxiang-token':token,...data?{'content-type':'application/json'}:{}},body:data?JSON.stringify(data):undefined});const j=await r.json();if(!r.ok)throw new Error(j.error);return j;};
const settings=(await api('state')).settings;
try{await api('settings',{root:path.resolve('实机测试产物'),mode:'export'});const code=await new Promise((resolve,reject)=>{const p=spawn(process.execPath,['scripts/ui-check.mjs',base,fixture.id],{stdio:'inherit',windowsHide:true});p.on('error',reject);p.on('exit',resolve);});if(code!==0)throw new Error('真实宿主界面测试失败');}finally{await api('settings',settings);}
