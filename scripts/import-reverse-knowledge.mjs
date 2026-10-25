import { readFile, mkdir, writeFile, lstat, realpath } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

// Additive content import: no model calls, tool execution, or live database writes.
const args=process.argv.slice(2);
const options={};
for(let i=0;i<args.length;i+=2){if(!['--root','--source'].includes(args[i])||!args[i+1]||options[args[i]])throw Error('用法：node scripts/import-reverse-knowledge.mjs --root <知识库绝对路径> [--source <内容包绝对路径>]');options[args[i]]=args[i+1];}
if(!options['--root']||!path.isAbsolute(options['--root'])||options['--source']&&!path.isAbsolute(options['--source']))throw Error('根目录和内容包目录必须使用绝对路径');
const target=path.resolve(options['--root']);
const source=options['--source']?path.resolve(options['--source']):fileURLToPath(new URL('../knowledge/reverse-engineering/',import.meta.url));
const manifest=JSON.parse(await readFile(path.join(source,'manifest.json'),'utf8'));
if(!/^[a-z0-9-]+$/.test(manifest.batchId)||!Array.isArray(manifest.entries))throw Error('批次清单无效');
const hash=value=>createHash('sha256').update(value).digest('hex');
async function safeDirectory(dir){
 const parsed=path.parse(dir);let cursor=parsed.root;
 for(const part of path.relative(parsed.root,dir).split(path.sep).filter(Boolean)){
  cursor=path.join(cursor,part);
  try{const st=await lstat(cursor);if(st.isSymbolicLink()||!st.isDirectory())throw Error('目录含链接或非目录：'+cursor);}
  catch(error){if(error.code!=='ENOENT')throw error;}
 }
}
await safeDirectory(target);
const files=[];
const ids=new Set();
for(const entry of manifest.entries){
 if(!/^wx-re-[a-z0-9-]+$/.test(entry.id)||ids.has(entry.id)||entry.file!==`cards/${entry.id}.md`)throw Error('清单 ID 或路径无效');
 ids.add(entry.id);
 const raw=await readFile(path.join(source,entry.file));
 if(hash(raw)!==entry.sha256)throw Error('内容哈希不匹配：'+entry.file);
 files.push({relative:entry.file,raw});
}
files.push({relative:`sources/${manifest.batchId}.json`,raw:await readFile(path.join(source,`sources/${manifest.batchId}.json`))});
files.push({relative:`sources/${manifest.batchId}-manifest.json`,raw:Buffer.from(JSON.stringify(manifest,null,2)+'\n')});
for(const asset of manifest.assets||[]){
 if(typeof asset.file!=='string'||!asset.file.startsWith('sources/')||asset.file.includes('\\')||asset.file.split('/').some(part=>!part||part==='.'||part==='..'))throw Error('来源附件路径无效');
 const raw=await readFile(path.join(source,asset.file));if(hash(raw)!==asset.sha256)throw Error('来源附件哈希不匹配：'+asset.file);
 files.push({relative:asset.file,raw});
}
if(new Set(files.map(file=>file.relative.toLowerCase())).size!==files.length)throw Error('清单包含重复文件路径');
let skipped=0;
const pending=[];
// Inspect every collision before writing anything; preserve manual edits.
for(const file of files){
 const dest=path.join(target,file.relative);
 if(!dest.startsWith(target+path.sep))throw Error('路径越界');
 await safeDirectory(path.dirname(dest));
 try{
  const st=await lstat(dest);if(st.isSymbolicLink()||!st.isFile())throw Error('目标不是普通文件：'+dest);
  if(!(await readFile(dest)).equals(file.raw))throw Error('已有文件内容不同，拒绝覆盖：'+dest);
  skipped++;
 }catch(error){if(error.code!=='ENOENT')throw error;pending.push({...file,dest});}
}
for(const dir of ['notes','cards','sources'])await mkdir(path.join(target,dir),{recursive:true});
for(const file of pending){
 await safeDirectory(path.dirname(file.dest));
 await mkdir(path.dirname(file.dest),{recursive:true});
 await safeDirectory(path.dirname(file.dest));
 // Exclusive create also rejects a file created concurrently after preflight.
 await writeFile(file.dest,file.raw,{flag:'wx'});
 if(hash(await readFile(file.dest))!==hash(file.raw))throw Error('写后校验失败：'+file.dest);
}
console.log(JSON.stringify({root:await realpath(target),batchId:manifest.batchId,knowledgeEntries:ids.size,created:pending.length,skipped,index:'未触碰宿主数据库；运行中的插件需在空闲时重建索引'},null,2));
