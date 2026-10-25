import { spawn } from 'node:child_process';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';
const home=path.resolve(process.env.DSH_HOME||path.join(os.homedir(),'.dsh'));
const base=path.join(home,'wanxiang/tool-runtime');
const configFile=path.join(base,'runtime.json');
const runtime=JSON.parse(await fs.readFile(configFile,'utf8'));
const python=path.join(base,'analysis-python',process.platform==='win32'?'Scripts/python.exe':'bin/python');
function exec(bin,args,input=''){return new Promise((resolve,reject)=>{const p=spawn(bin,args,{windowsHide:true,shell:false,stdio:['pipe','pipe','pipe']});let out='',err='';p.stdout.on('data',c=>out+=c);p.stderr.on('data',c=>err+=c);p.stdin.on('error',()=>{});p.stdin.end(input);p.on('error',reject);p.on('close',code=>code===0?resolve(out):reject(new Error((err||out).slice(0,2000))));});}
const worker=fileURLToPath(new URL('../src/security-extra-worker.py',import.meta.url));
const versions=JSON.parse(await exec(python,['-I',worker],JSON.stringify({action:'extra_versions'}))).result;
runtime.analysisPython=python;Object.assign(runtime.versions,Object.fromEntries(Object.entries(versions).filter(([,v])=>v)));
const javaDirs=await fs.readdir('C:/Program Files/Eclipse Adoptium',{withFileTypes:true});
runtime.java=path.join('C:/Program Files/Eclipse Adoptium',javaDirs.filter(d=>d.isDirectory()&&d.name.startsWith('jdk-21.')).sort((a,b)=>b.name.localeCompare(a.name,undefined,{numeric:true}))[0].name,'bin/java.exe');
runtime.jadx=path.join(base,'jadx');runtime.apktool=path.join(base,'apktool/apktool.jar');
const ruleDirs=await fs.readdir(path.join(base,'capa-rules'));runtime.capaRules=path.join(base,'capa-rules',ruleDirs.find(n=>n.startsWith('capa-rules-')));
runtime.versions.java=(await exec(runtime.java,['--version'])).split('\n')[0].trim();
runtime.versions.jadx=(await exec(runtime.java,['-cp',path.join(runtime.jadx,'lib','*'),'jadx.cli.JadxCLI','--version'])).trim();
runtime.versions.apktool=(await exec(runtime.java,['-jar',runtime.apktool,'--version'])).trim();
const interfaces=await exec(runtime.tshark,['-D']);
if(interfaces.includes('NPF_'))runtime.versions.npcap='1.90；TShark接口枚举通过';
try{const files=await fs.readdir(path.join(base,'floss'),{recursive:true});const found=files.find(f=>path.basename(f).toLowerCase()==='floss.exe');if(found){runtime.floss=path.join(base,'floss',found);runtime.versions.floss=(await exec(runtime.floss,['--version'])).trim();}}catch{}
await fs.writeFile(path.join(base,'analysis-requirements.lock.txt'),await exec(python,['-m','pip','freeze']));
await fs.writeFile(configFile,JSON.stringify(runtime,null,2));
const {root}=JSON.parse(await fs.readFile(path.join(home,'wanxiang/settings.json'),'utf8'));
const catalogFile=path.join(root,'tools/catalog.json');const tools=JSON.parse(await fs.readFile(catalogFile,'utf8'));
await fs.copyFile(catalogFile,path.join(root,'tools',`catalog.backup-${Date.now()}.json`));
const rows=[
 ['androguard','Androguard','Android逆向','security_apk_inspect / security_dex_inspect','https://github.com/androguard/androguard'],
 ['dnfile','dnfile','.NET逆向','security_dotnet_inspect','https://github.com/malwarefrank/dnfile'],
 ['dncil','dncil IL解析','.NET逆向','已安装库；暂无独立模型接口','https://github.com/mandiant/dncil'],
 ['lief','LIEF多格式分析','逆向分析','security_lief_inspect','https://lief.re/'],
 ['yara-python','YARA','样本分析','security_yara_scan','https://github.com/VirusTotal/yara-python'],
 ['oletools','oletools文档宏分析','文档分析','security_office_macros','https://github.com/decalage2/oletools'],
 ['puremagic','puremagic格式识别','文件分析','security_identify','https://github.com/cdgriffith/puremagic'],
 ['scapy','Scapy','流量分析','已安装完整CLI与库；暂无独立模型接口','https://scapy.net/'],
 ['keystone-engine','Keystone汇编','逆向分析','security_assemble','https://www.keystone-engine.org/'],
 ['unicorn','Unicorn CPU仿真','逆向分析','已安装库；暂无独立模型接口','https://www.unicorn-engine.org/'],
 ['ropper','Ropper','逆向分析','已安装完整CLI；暂无独立模型接口','https://github.com/sashs/Ropper'],
 ['ROPGadget','ROPGadget','逆向分析','已安装完整CLI；暂无独立模型接口','https://github.com/JonathanSalwan/ROPgadget'],
 ['flare-capa','Mandiant capa','样本分析','security_capa；使用发行包内置官方规则','https://github.com/mandiant/capa'],
 ['java','Temurin JDK 21','运行环境','JADX / Apktool依赖','https://adoptium.net/'],
 ['jadx','JADX反编译','Android逆向','security_jadx_decompile','https://github.com/skylot/jadx'],
 ['apktool','Apktool','Android逆向','已安装完整CLI；当前通过Java -jar调用','https://apktool.org/'],
 ['npcap','Npcap抓包驱动','抓包依赖','security_capture_interfaces / security_capture_bounded','https://npcap.com/'],
 ...(runtime.floss?[['floss','Mandiant FLOSS','样本分析','security_floss；静态/栈/解码字符串','https://github.com/mandiant/flare-floss']]:[]),
];
for(const [key,name,category,recipe,url] of rows){if(!runtime.versions[key])continue;const id='wanxiang-security-'+key,old=tools.find(t=>t.id===id);const executable=key==='java'?runtime.java:key==='jadx'?path.join(runtime.jadx,'bin/jadx.bat'):key==='apktool'?runtime.apktool:key==='npcap'?runtime.tshark:key==='floss'?runtime.floss:python;const row={id,name,category,type:'CLI',path:executable,notes:`万象扩展分析环境。${recipe}。官方：${url}`,version:runtime.versions[key],status:'可用',checkedAt:new Date().toISOString(),detector:'security-'+key,linkedIds:old?.linkedIds||[]};if(old)Object.assign(old,row);else tools.push(row);}
const temp=catalogFile+'.tmp-'+process.pid;await fs.writeFile(temp,JSON.stringify(tools,null,2));await fs.rename(temp,catalogFile);
console.log(JSON.stringify({catalog:catalogFile,totalTools:tools.length,versions:runtime.versions},null,2));
