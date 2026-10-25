// Installs isolated Python tools, records exact resolved versions, and merges the catalog.
import { spawn } from 'node:child_process';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';
const home = path.resolve(process.env.DSH_HOME || path.join(os.homedir(), '.dsh'));
const base = path.join(home, 'wanxiang', 'tool-runtime');
const python = path.join(base, 'python', process.platform === 'win32' ? 'Scripts/python.exe' : 'bin/python');
function exec(bin, args, inherit = false) {
  return new Promise((resolve, reject) => {
    const p = spawn(bin, args, { windowsHide: true, shell: false, stdio: inherit ? 'inherit' : ['ignore','pipe','pipe'] });
    let out = '', err = '';
    if (!inherit) { p.stdout.on('data', c => out += c); p.stderr.on('data', c => err += c); }
    p.on('error', reject); p.on('close', code => code === 0 ? resolve(out) : reject(new Error(err || `退出码 ${code}`)));
  });
}
await fs.mkdir(base, { recursive: true });
if (!process.argv.includes('--register-only')) {
  try { await fs.access(python); } catch { await exec(process.env.WANXIANG_PYTHON || 'python', ['-m','venv',path.join(base,'python')], true); }
  await exec(python, ['-m','pip','install','--disable-pip-version-check','--index-url','https://pypi.org/simple','pefile','pyelftools','capstone','dpkt','frida-tools','mitmproxy'], true);
}
const versions = JSON.parse(await exec(python, ['-I','-c',"import json,importlib.metadata as m;print(json.dumps({p:m.version(p) for p in ['pefile','pyelftools','capstone','dpkt','frida-tools','frida','mitmproxy']}))"]));
await fs.writeFile(path.join(base,'requirements.lock.txt'), await exec(python, ['-m','pip','freeze']));
let tshark;
for (const candidate of [process.env.WANXIANG_TSHARK, path.join(process.env.ProgramFiles || 'C:/Program Files','Wireshark','tshark.exe')].filter(Boolean)) {
  try { versions.tshark = (await exec(candidate, ['--version'])).split('\n')[0].trim(); tshark = candidate; break; } catch {}
}
let previous={};try{previous=JSON.parse(await fs.readFile(path.join(base,'runtime.json'),'utf8'));}catch(e){if(e.code!=='ENOENT')throw e;}
const runtime = { ...previous, python, tshark, versions:{...previous.versions,...versions}, installedAt: new Date().toISOString() };
await fs.writeFile(path.join(base,'runtime.json'), JSON.stringify(runtime,null,2));
const settings = JSON.parse(await fs.readFile(path.join(home,'wanxiang','settings.json'),'utf8'));
const dir = path.join(settings.root,'tools'); await fs.mkdir(dir,{recursive:true});
const catalogFile = path.join(dir,'catalog.json');
let tools = []; try { tools = JSON.parse(await fs.readFile(catalogFile,'utf8')); } catch(e) { if(e.code !== 'ENOENT') throw e; }
if (!Array.isArray(tools)) throw new Error('工具目录不是数组，停止合并');
const recipes = [
  ['pefile','PE静态分析','逆向分析','security_binary_inspect','https://github.com/erocarrera/pefile'],
  ['pyelftools','ELF静态分析','逆向分析','security_binary_inspect','https://github.com/eliben/pyelftools'],
  ['capstone','Capstone反汇编','逆向分析','security_disassemble','https://www.capstone-engine.org/'],
  ['dpkt','dpkt抓包解析','流量分析','security_pcap_summary','https://github.com/kbandla/dpkt'],
  ['frida-tools','Frida动态分析工具','动态分析','security_frida_devices','https://frida.re/docs/installation/'],
  ['mitmproxy','mitmproxy / mitmdump','抓包代理','security_http_flows','https://docs.mitmproxy.org/stable/'],
  ...(tshark ? [['tshark','Wireshark / TShark','流量分析','security_pcap_summary','https://www.wireshark.org/docs/']] : []),
];
if (tools.length) await fs.copyFile(catalogFile,path.join(dir,`catalog.backup-${Date.now()}.json`));
for (const [key,name,category,recipe,url] of recipes) {
  const id = 'wanxiang-security-' + key;
  const old = tools.find(t => t.id === id);
  const executable = key==='tshark'?tshark:key==='frida-tools'?path.join(path.dirname(python),process.platform==='win32'?'frida.exe':'frida'):key==='mitmproxy'?path.join(path.dirname(python),process.platform==='win32'?'mitmdump.exe':'mitmdump'):python;
  const record = { id,name,category,type:'CLI',path:executable,notes:`万象专用环境；Harness调用 ${recipe}。官方：${url}。` + (key==='frida-tools'?'已安装完整CLI；模型适配器当前提供设备枚举。':key==='mitmproxy'?'已安装代理CLI；模型适配器当前读取已保存的HTTP流。':key==='tshark'?'适配器读取离线pcap/pcapng；实时抓包依赖Npcap和明确目标。':''),version:versions[key],status:'可用',checkedAt:runtime.installedAt,detector:'security-'+key,linkedIds:old?.linkedIds || [] };
  if (old) Object.assign(old,record); else tools.push(record);
}
const temp = catalogFile + '.tmp-' + process.pid;
await fs.writeFile(temp,JSON.stringify(tools,null,2)); await fs.rename(temp,catalogFile);
console.log(JSON.stringify({runtime:path.join(base,'runtime.json'), catalog:catalogFile,tools:recipes.length,versions},null,2));
