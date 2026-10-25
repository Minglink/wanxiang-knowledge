import { promises as fs } from 'node:fs';
import path from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const execute=promisify(execFile);
export async function openDirectory(directory:string, run:typeof execute=execute, platform=process.platform){
 if(!path.isAbsolute(directory))throw new Error('目录必须是绝对路径');
 const target=await fs.realpath(directory);
 if(!(await fs.stat(target)).isDirectory())throw new Error('知识目录不存在或不是文件夹');
 try{
  if(platform==='win32'){
   // Explorer must receive an explicit visible launch; the host is a hidden child process.
   // A successful ShellExecute alone does not mean a folder window was actually opened.
   const script=`$ErrorActionPreference='Stop'
[Console]::OutputEncoding=New-Object System.Text.UTF8Encoding($false)
$OutputEncoding=[Console]::OutputEncoding
$target=$env:WANXIANG_OPEN_DIRECTORY
$shell=New-Object -ComObject Shell.Application
Start-Process -FilePath (Join-Path $env:WINDIR 'explorer.exe') -ArgumentList ('/n,/e,"'+$target+'"') -WindowStyle Normal -ErrorAction Stop
$deadline=[DateTime]::UtcNow.AddSeconds(10)
do {
 foreach($window in @($shell.Windows())) {
  try {
   if($window.Visible -and $window.HWND -and [string]::Equals($window.Document.Folder.Self.Path.TrimEnd('\\'),$target.TrimEnd('\\'),[StringComparison]::OrdinalIgnoreCase)) {
    $window.Visible=$true
    Write-Output 'WANXIANG_DIRECTORY_VISIBLE'
    exit 0
   }
  } catch {}
 }
 Start-Sleep -Milliseconds 200
} while([DateTime]::UtcNow -lt $deadline)
throw '资源管理器未显示目标目录，请检查桌面会话状态'
`;
   const result=await run('powershell.exe',['-NoLogo','-NoProfile','-NonInteractive','-Command',script],{env:{...process.env,WANXIANG_OPEN_DIRECTORY:target},windowsHide:true,timeout:15000,maxBuffer:8192});
   if(!result.stdout.includes('WANXIANG_DIRECTORY_VISIBLE'))throw new Error('未确认资源管理器已显示目标目录');
  }else await run(platform==='darwin'?'open':'xdg-open',[target],{timeout:15000,maxBuffer:8192});
 }catch(error:any){throw new Error('无法打开目录：'+String(error.stderr||error.message||error).trim().slice(0,300));}
 return {ok:true,path:target};
}
