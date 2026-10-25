type UI={api:(action:string,data?:any)=>Promise<any>;openModal:(html:string,wide?:boolean)=>void;head:(title:string)=>string;esc:(value:any)=>string;toast:(text:string,error?:boolean)=>void;refresh:()=>Promise<any>};
export function importPage(jobs:any[],esc:UI['esc']){
 return `<p class="muted">拖入Markdown、文本、源代码、文件夹或ZIP即可导入。保留来源，自动去重并更新索引和图谱。PDF/Word目前仅保留为附件。</p><p><button class="btn primary" data-action="import-files">选择文件 / ZIP</button> <button class="btn" data-action="import-folder">选择文件夹</button></p><p class="small muted">自动学习当前对话文件夹：在文件夹会话中输入 <code>/wanxiang study</code>。学习使用设置中选定的整理模型。</p><div id="wx-import-drop" tabindex="0" style="padding:24px;border:2px dashed #9fb4eb;border-radius:10px;text-align:center">将知识库文件或文件夹拖到这里</div><div aria-live="polite">${jobs.length?jobs.map(j=>`<article class="panel" style="margin-top:12px;padding:12px"><strong>${esc(j.title)}</strong><p>${esc(j.stage)} · ${esc(j.progress.done)}/${esc(j.progress.total)} · 新增 ${j.entryIds.length} · 重复 ${j.duplicates} · 冲突保留 ${j.conflicts} · 跳过 ${j.skipped.length}</p>${j.error?`<p class="error">${esc(j.error)}</p>`:''}${j.skipped.length?`<details><summary>查看跳过项</summary><ul>${j.skipped.slice(0,100).map((x:any)=>`<li>${esc(x.path)}：${esc(x.reason)}</li>`).join('')}</ul>${j.skipped.length>100?'其余项保存在本地任务记录中':''}</details>`:''}${['queued','running'].includes(j.status)?`<button class="btn" data-action="import-cancel" data-id="${esc(j.id)}">取消</button>`:['failed','cancelled'].includes(j.status)?`<button class="btn" data-action="import-retry" data-id="${esc(j.id)}">继续</button>`:''}</article>`).join(''):'<p class="muted">暂无导入记录</p>'}</div>`;
}
export function setupImports(ui:UI){
 let uploading=false;
 const render=async()=>ui.openModal(ui.head('导入知识库')+importPage(await ui.api('imports'),ui.esc),true);
 async function upload(files:File[]){
  if(uploading)return;uploading=true;
  try{
   if(!files.length)throw new Error('没有选择文件');if(files.length>2000)throw new Error('单批最多2000个文件');
   let bytes=0;const input=[];
   for(const f of files){
    bytes+=f.size;if(f.size>(/\.zip$/i.test(f.name)?64:2)*1024*1024||bytes>64*1024*1024)throw new Error('单文档最多2MiB，ZIP和单批最多64MiB');
    const data=await new Promise<string>((resolve,reject)=>{const r=new FileReader();r.onload=()=>resolve(String(r.result).split(',')[1]);r.onerror=()=>reject(new Error('文件读取失败：'+f.name));r.readAsDataURL(f);});
    input.push({path:(f as any).wxRelativePath||f.webkitRelativePath||f.name,data});
   }
   await ui.api('import/start',{files:input,title:files.length===1?files[0].name:'导入 '+files.length+' 个文件'});await ui.refresh();await render();ui.toast('已开始导入，完成后自动更新检索和图谱');
  }catch(e:any){ui.toast(e.message,true);}finally{uploading=false;}
 }
 function pick(folder:boolean){const input=document.createElement('input');input.type='file';input.multiple=true;if(folder)input.setAttribute('webkitdirectory','');input.addEventListener('change',()=>void upload(Array.from(input.files||[])));input.click();}
 async function dropped(data:DataTransfer){
  const files:File[]=[];let visited=0;
  async function visit(entry:any,prefix=''){
   if(++visited>20000)throw new Error('目录条目过多，请缩小导入范围');
   if(entry.isFile){const file:File=await new Promise((resolve,reject)=>entry.file(resolve,reject));(file as any).wxRelativePath=prefix+file.name;files.push(file);if(files.length>2000)throw new Error('单批最多2000文件');}
   else if(entry.isDirectory){
    if(['.git','node_modules','.wanxiang','.venv','dist','build','__pycache__'].includes(entry.name))return;
    const reader=entry.createReader();while(true){const entries:any[]=await new Promise((resolve,reject)=>reader.readEntries(resolve,reject));if(!entries.length)break;for(const child of entries)await visit(child,prefix+entry.name+'/');}
   }
  }
  const items=Array.from(data.items).filter(i=>i.kind==='file');
  if(items.length&&items.every(i=>(i as any).webkitGetAsEntry?.()))for(const item of items)await visit((item as any).webkitGetAsEntry());
  else files.push(...Array.from(data.files));
  await upload(files);
 }
 document.addEventListener('dragover',e=>{if(Array.from(e.dataTransfer?.types||[]).includes('Files')){e.preventDefault();if(e.dataTransfer)e.dataTransfer.dropEffect='copy';}});
 document.addEventListener('drop',e=>{if(!e.dataTransfer||!Array.from(e.dataTransfer.types).includes('Files'))return;e.preventDefault();void dropped(e.dataTransfer).catch(error=>ui.toast(error.message,true));});
 return {show:render,files:()=>pick(false),folder:()=>pick(true)};
}
