import test from 'node:test';
import assert from 'node:assert/strict';
import { promises as fs } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { KnowledgeService, securityTools } from '../lib/index.js';

const installedHome = process.env.DSH_HOME || path.join(os.homedir(), '.dsh');
let runtime;
try { runtime = JSON.parse(await fs.readFile(path.join(installedHome,'wanxiang/tool-runtime/runtime.json'),'utf8')); } catch {}
test('安全分析：真实PE/ELF、反汇编、双编码字符串、PCAP及HTTP流，边界与留档', { skip: !runtime && '需要先运行 setup-security-tools.mjs' }, async t => {
  const root = await fs.mkdtemp(path.join(os.tmpdir(),'wanxiang-security-'));
  const home = path.join(root,'home');
  await fs.mkdir(path.join(home,'wanxiang/tool-runtime'),{recursive:true});
  await fs.writeFile(path.join(home,'wanxiang/tool-runtime/runtime.json'),JSON.stringify(runtime));
  const service = await new KnowledgeService(home,{listSessions:async()=>[],snapshot:async()=>{}},path.join(root,'knowledge')).init();
  t.after(async()=>{await service.dispose();await fs.rm(root,{recursive:true,force:true});});
  const tools = securityTools(service);
  const call = async(name,args={})=>JSON.parse(await tools.find(t=>t.name===name).execute(args));
  const file=path.join(root,'中文 raw sample.bin');
  await fs.writeFile(file,Buffer.concat([Buffer.from([0x90,0xc3,0]),Buffer.from('HELLO WORLD\0'),Buffer.from('WIDE TEXT','utf16le')]));
  const versions=await call('security_environment');assert.equal(versions.result.capstone,runtime.versions.capstone);
  const strings=(await call('security_strings',{file})).result.strings;
  assert.ok(strings.some(s=>s.encoding==='ascii'&&s.text==='HELLO WORLD'));
  assert.ok(strings.some(s=>s.encoding==='utf16le'&&s.text.includes('WIDE TEXT')));
  const asm=(await call('security_disassemble',{file,arch:'x64',size:2,address:4096})).result.instructions;
  assert.deepEqual(asm.map(i=>i.mnemonic),['nop','ret']);assert.equal(asm[0].address,4096);
  const elf=path.join(root,'empty.elf'),pcap=path.join(root,'sample.pcap'),flows=path.join(root,'sample.mitm');
  const fixture=String.raw`import struct,sys
from mitmproxy import io,http
from mitmproxy.test import tflow
root=sys.argv[1]
open(root+'/empty.elf','wb').write(b'\x7fELF'+bytes([2,1,1])+bytes(9)+struct.pack('<HHIQQQIHHHHHH',2,62,1,4096,0,0,0,64,0,0,64,0,0))
packet=bytes.fromhex('ffffffffffff00112233445508004500001c00000000401100007f0000017f0000010035123400080000')
with open(root+'/sample.pcap','wb') as f:f.write(struct.pack('<IHHIIII',0xa1b2c3d4,2,4,0,0,65535,1)+struct.pack('<IIII',1,0,len(packet),len(packet))+packet)
flow=tflow.tflow(resp=True);flow.request=http.Request.make('GET','https://example.test/demo');flow.response=http.Response.make(204,b'')
with open(root+'/sample.mitm','wb') as f:io.FlowWriter(f).add(flow)
`;
  const p=spawnSync(runtime.python,['-I','-c',fixture,root],{encoding:'utf8',windowsHide:true});assert.equal(p.status,0,p.stderr);
  assert.equal((await call('security_binary_inspect',{file:elf})).result.format,'ELF');
  if(process.platform==='win32') {
    const result=await call('security_binary_inspect',{file:path.join(process.env.SystemRoot,'System32/notepad.exe')});
    assert.equal(result.result.format,'PE');
  }
  const packets=(await call('security_pcap_summary',{file:pcap})).result;
  if(runtime.tshark) { assert.equal(packets.engine,'tshark');assert.match(packets.table,/127\.0\.0\.1/); }
  else assert.equal(packets.packets[0].src,'127.0.0.1');
  // Exercise the fallback even on machines that have TShark.
  await fs.writeFile(path.join(home,'wanxiang/tool-runtime/runtime.json'),JSON.stringify({...runtime,tshark:undefined}));
  assert.equal((await call('security_pcap_summary',{file:pcap})).result.packets[0].src,'127.0.0.1');
  assert.equal((await call('security_http_flows',{file:flows})).result.flows[0].status,204);
  const devices=(await call('security_frida_devices')).result;assert.ok(Array.isArray(devices));
  for(const args of [{file:'relative.exe'},{file:'\\\\server\\share\\x'},{file:root},{file,limit:201}])
    await assert.rejects(call('security_strings',args));
  await assert.rejects(call('security_disassemble',{file,arch:'x64',size:4097}));
  await assert.rejects(call('security_disassemble',{file,arch:'bad'}));
  await assert.rejects(call('security_binary_inspect',{file:path.join(root,'missing.exe')}));
  const records=await fs.readdir(service.store.local('tools','runs'));assert.ok(records.length>=9);
  assert.ok(records.every(f=>f.endsWith('.json')));
  const row=JSON.parse(await fs.readFile(service.store.local('tools','runs',records[0]),'utf8'));assert.ok(row.id&&row.finished);
});
