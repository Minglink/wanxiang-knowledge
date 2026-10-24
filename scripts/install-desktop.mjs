import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { mkdir, copyFile, readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { installPreflight } from './install-preflight.mjs';
const root=path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const appDir=process.env.WANXIANG_HARNESS_DIR||path.join(process.env.LOCALAPPDATA||'', 'Programs','DeepSeek Harness');
if(process.versions.electron){
  const runtime=path.join(appDir,'resources','app.asar','dsh');
  const {runCli}=await import(pathToFileURL(path.join(runtime,'node_modules','@deepseek-ai','dsh','lib','bin.js')).href);
  const tarball=process.argv[2];const nodeExe=process.argv[3];
  process.argv=[process.execPath,'dsh','plugin','--profile','desktop','add',tarball,'--ignore-scripts'];
  await runCli({manageDesktopProfile:true,packageManager:{command:nodeExe,args:[path.join(appDir,'resources','runtime','pnpm','bin','pnpm.mjs')]}});
}else{
  const manifest=JSON.parse(await readFile(path.join(root,'package.json'),'utf8'));
  const tarball=path.resolve(process.argv[2]||path.join(root,'dist',`dsh-wanxiang-knowledge-${manifest.version}.tgz`));
  const exe=path.join(appDir,'DeepSeek Harness.exe');
  if(!existsSync(exe)||!existsSync(tarball))throw new Error('找不到 Harness 或插件包，请先 npm run pack:plugin，并检查 WANXIANG_HARNESS_DIR');
  const home=process.env.DSH_HOME||path.join(os.homedir(),'.dsh');const profile=path.join(home,'profiles','desktop');
  const backup=path.join(root,'dist','install-backup',new Date().toISOString().replace(/[:.]/g,'-'));await mkdir(backup,{recursive:true});
  if(!process.env.WANXIANG_HOST_URL)throw new Error('安装前请设置 WANXIANG_HOST_URL 为当前本机Harness地址，以确认全部会话空闲并备份知识目录');
  console.log('安装预检：'+JSON.stringify(await installPreflight(process.env.WANXIANG_HOST_URL,backup,home)));
  for(const f of ['package.json','pnpm-lock.yaml','cordis.patch.yml'])if(existsSync(path.join(profile,f)))await copyFile(path.join(profile,f),path.join(backup,f));
  console.log('备份目录：'+backup);
  const digest=createHash('sha256').update(await readFile(tarball)).digest('hex').slice(0,16);
  const pinned=path.join(root,'dist',`dsh-wanxiang-knowledge-${digest}.tgz`);
  if(tarball!==pinned)await copyFile(tarball,pinned);
  const child=spawn(exe,['--expose-internals',fileURLToPath(import.meta.url),pinned,process.execPath],{env:{...process.env,ELECTRON_RUN_AS_NODE:'1',WANXIANG_HARNESS_DIR:appDir},windowsHide:true,stdio:'inherit'});
  child.on('error',e=>{console.error(e);process.exitCode=1;});child.on('exit',code=>{process.exitCode=code??1;});
}
