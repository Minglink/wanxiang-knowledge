import test from 'node:test';
import assert from 'node:assert/strict';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { spawnSync } from 'node:child_process';
import { createServer } from 'node:http';
import { securityTools } from '../lib/index.js';
const home=process.env.DSH_HOME||path.join(os.homedir(),'.dsh');
let runtime;try{runtime=JSON.parse(await fs.readFile(path.join(home,'wanxiang/tool-runtime/runtime.json'),'utf8'));}catch{}
test('扩展分析：YARA真实匹配、禁用include、汇编、ZIP风险、固件、LIEF/.NET、FLOSS/capa及JADX', {skip:!runtime?.analysisPython},async t=>{
 const root=await fs.mkdtemp(path.join(os.tmpdir(),'wanxiang-extra-'));
 t.after(()=>fs.rm(root,{recursive:true,force:true}));
 const service={home,store:{local:(...p)=>path.join(root,...p)}};
 const defs=securityTools(service),call=async(name,args={})=>JSON.parse(await defs.find(d=>d.name===name).execute(args));
 const file=path.join(root,'中文样本.bin'),rules=path.join(root,'demo.yar');await fs.writeFile(file,Buffer.from('hello WANXIANG\0\x7fELF'));await fs.writeFile(rules,'rule demo { strings: $a="WANXIANG" condition: $a }');
 assert.equal((await call('security_yara_scan',{file,rules})).result.matches[0].rule,'demo');
 await fs.writeFile(rules,'include "other.yar"');await assert.rejects(call('security_yara_scan',{file,rules}));
 assert.equal((await call('security_assemble',{arch:'x64',assembly:'nop; ret'})).result.hex,'90c3');
 await assert.rejects(call('security_assemble',{arch:'bad',assembly:'nop'}));
 assert.ok((await call('security_firmware_inspect',{file})).result.signatures.some(s=>s.signature==='ELF'));
 const zip=path.join(root,'archive.zip');const py=spawnSync(runtime.analysisPython,['-I','-c',"import zipfile,sys;z=zipfile.ZipFile(sys.argv[1],'w');z.writestr('../traversal.txt','synthetic');z.writestr('ok.txt','demo');z.close()",zip],{windowsHide:true,encoding:'utf8'});assert.equal(py.status,0,py.stderr);
 assert.equal((await call('security_archive_inventory',{file:zip})).result.items[0].pathRisk,true);
 assert.ok((await call('security_identify',{file:zip})).result.matches.length);
 const macro=path.join(root,'demo.bas');await fs.writeFile(macro,'Sub Hello()\nMsgBox "synthetic VBA"\nEnd Sub\n');
 assert.equal((await call('security_office_macros',{file:macro})).result.hasVba,true);
 const fixture=path.join(home,'wanxiang/tool-runtime/test-fixtures');
 try {await fs.access(path.join(fixture,'hello-world.apk'));
   const apk=await call('security_apk_inspect',{file:path.join(fixture,'hello-world.apk')});assert.ok(apk.result.package);
   const dex=await call('security_dex_inspect',{file:path.join(fixture,'classes.dex'),limit:2});assert.ok(dex.result.classes.length);
 }catch(e){if(e.code!=='ENOENT')throw e;}
 const exe=path.join(process.env.SystemRoot,'System32/whoami.exe');
 assert.ok((await call('security_lief_inspect',{file:exe})).result.sections.length);
 assert.equal((await call('security_dotnet_inspect',{file:exe})).result.managed,false);
 const managed=path.join(process.env.SystemRoot,'Microsoft.NET/Framework64/v4.0.30319/mscorlib.dll');
 assert.equal((await call('security_dotnet_inspect',{file:managed,limit:3})).result.managed,true);
 const floss=await call('security_floss',{file:exe});assert.ok(floss.result.strings);
 const raw=path.join(root,'code.bin');await fs.writeFile(raw,Buffer.from([0x90,0x90,0xc3]));
 const capa=await call('security_capa',{file:raw,format:'sc64'});assert.ok('totalRulesMatched' in capa.result);
 const java=path.join(root,'Hello.java');await fs.writeFile(java,'public class Hello { public static int answer() { return 42; } }');
 const javac=path.join(path.dirname(runtime.java),'javac.exe');const compile=spawnSync(javac,['--release','11',java],{windowsHide:true,encoding:'utf8'});assert.equal(compile.status,0,compile.stderr);
 const decompile=await call('security_jadx_decompile',{file:path.join(root,'Hello.class'),className:'Hello'});assert.match(decompile.result.source,/42/);
 await assert.rejects(call('security_jadx_decompile',{file,className:'../escape'}));
 const interfaces=await call('security_capture_interfaces');assert.match(interfaces.result.interfaces,/NPF_Loopback/);
 await assert.rejects(call('security_capture_bounded',{interface:'invalid',filter:'tcp'}));
 await assert.rejects(call('security_capture_bounded',{interface:'\\Device\\NPF_Loopback',filter:''}));
});
test('实时抓包：只抓取测试程序自己的回环HTTP端口，自动停止并写出PCAPNG', {skip:!runtime?.versions.npcap},async t=>{
 const root=await fs.mkdtemp(path.join(os.tmpdir(),'wanxiang-capture-'));const server=createServer((_req,res)=>res.end('wanxiang synthetic capture'));
 await new Promise(r=>server.listen(0,'127.0.0.1',r));
 t.after(async()=>{server.closeAllConnections();await new Promise(r=>server.close(r));await fs.rm(root,{recursive:true,force:true});});
 const service={home,store:{local:(...p)=>path.join(root,...p)}},defs=securityTools(service);
 const capture=defs.find(d=>d.name==='security_capture_bounded').execute({interface:'\\Device\\NPF_Loopback',filter:'tcp port '+server.address().port,seconds:3});
 const timer=setInterval(()=>{fetch('http://127.0.0.1:'+server.address().port).then(r=>r.text()).catch(()=>{});},250);
 let result;try{result=JSON.parse(await capture);}finally{clearInterval(timer);}
 assert.ok(result.result.bytes>100);
 const summary=JSON.parse(await defs.find(d=>d.name==='security_pcap_summary').execute({file:result.result.file}));assert.match(summary.result.table,/127\.0\.0\.1/);
});
