import { promises as fs } from 'node:fs';
import path from 'node:path';
import { inflateRawSync, crc32 } from 'node:zlib';
import { createHash } from 'node:crypto';

export interface ImportFile {path:string;data:string;attachment?:boolean}
export const IMPORT_LIMITS={files:2000,fileBytes:2*1024*1024,totalBytes:64*1024*1024};
const textExtensions=new Set('.md .markdown .txt .rst .pod .json .csv .ts .tsx .js .jsx .mjs .cjs .py .c .cpp .cc .h .hpp .cs .java .go .rs .toml .yml .yaml .sql .html .css .xml .ini .sh .ps1'.split(' '));
const assetExtensions=new Set('.png .jpg .jpeg .gif .webp .svg .pdf .docx'.split(' '));
const excluded=new Set(['.git','.svn','.hg','node_modules','.wanxiang','.venv','venv','__pycache__','dist','build','coverage','.next']);
export const fingerprint=(s:string)=>createHash('sha256').update(s.replace(/\r\n/g,'\n').trim()).digest('hex');
export function safeImportPath(value:string){
 if(typeof value!=='string'||value.length>800)throw new Error('导入路径无效');
 const name=value.replace(/\\/g,'/');
 if(name.startsWith('/')||name.split('/').some(p=>!p||p==='.'||p==='..'||/[\x00-\x1f:<>"|?*]/.test(p)||/[. ]$/.test(p)||/^(?:CON|PRN|AUX|NUL|COM[1-9]|LPT[1-9])(?:\.|$)/i.test(p)))throw new Error('不安全的导入路径：'+value);
 return name;
}
export function fileKind(name:string):'text'|'asset'|'skip'{
 const parts=name.split('/');
 if(parts.some(p=>excluded.has(p))||parts.some(p=>/^\.env(?:\.|$)|^id_(?:rsa|ed25519)$|\.(?:pem|key|pfx|p12)$/i.test(p)))return 'skip';
 const ext=path.posix.extname(name).toLowerCase();
 return textExtensions.has(ext)?'text':assetExtensions.has(ext)?'asset':'skip';
}
export function decodeText(raw:Buffer){
 if(raw.includes(0))throw new Error('文件不是支持的UTF-8文本');
 try{return new TextDecoder('utf-8',{fatal:true}).decode(raw).replace(/^\uFEFF/,'');}catch{throw new Error('文本不是UTF-8编码，请转换编码后导入');}
}
export function unpackZip(raw:Buffer):ImportFile[]{
 let end=-1;
 for(let i=raw.length-22;i>=Math.max(0,raw.length-65557);i--)if(raw.readUInt32LE(i)===0x06054b50&&i+22+raw.readUInt16LE(i+20)===raw.length){end=i;break;}
 if(end<0)throw new Error('ZIP目录无效');
 if(raw.readUInt16LE(end+4)||raw.readUInt16LE(end+6))throw new Error('不支持分卷ZIP');
 const count=raw.readUInt16LE(end+10),size=raw.readUInt32LE(end+12),offset=raw.readUInt32LE(end+16);
 if(count===65535||offset===0xffffffff||size===0xffffffff)throw new Error('不支持ZIP64，请拆分导入');
 if(count>IMPORT_LIMITS.files||offset+size>end)throw new Error('ZIP目录数量或范围超限');
 let cursor=offset,total=0;const files:ImportFile[]=[];const names=new Set<string>();
 for(let i=0;i<count;i++){
  if(cursor+46>offset+size||raw.readUInt32LE(cursor)!==0x02014b50)throw new Error('ZIP条目损坏');
  const flags=raw.readUInt16LE(cursor+8),method=raw.readUInt16LE(cursor+10),expected=raw.readUInt32LE(cursor+16),packed=raw.readUInt32LE(cursor+20),bytes=raw.readUInt32LE(cursor+24);
  const len=raw.readUInt16LE(cursor+28),extra=raw.readUInt16LE(cursor+30),comment=raw.readUInt16LE(cursor+32),mode=raw.readUInt32LE(cursor+38)>>>16,local=raw.readUInt32LE(cursor+42);
  const next=cursor+46+len+extra+comment;if(next>offset+size)throw new Error('ZIP名称越界');
  const rawName=decodeText(raw.subarray(cursor+46,cursor+46+len));cursor=next;
  if((mode&0xf000)===0xa000)throw new Error('ZIP含符号链接');
  const directory=rawName.endsWith('/');const name=safeImportPath(directory?rawName.slice(0,-1):rawName);
  if(names.has(name.toLowerCase()))throw new Error('ZIP含重复路径');names.add(name.toLowerCase());if(directory)continue;
  if(flags&1||![0,8].includes(method))throw new Error('不支持加密ZIP或此压缩方法');
  total+=bytes;if(bytes>IMPORT_LIMITS.fileBytes||total>IMPORT_LIMITS.totalBytes)throw new Error('ZIP展开大小超限');
  if(local+30>offset||raw.readUInt32LE(local)!==0x04034b50)throw new Error('ZIP本地头无效');
  if(raw.readUInt16LE(local+6)!==flags||raw.readUInt16LE(local+8)!==method)throw new Error('ZIP头部不一致');
  const localLen=raw.readUInt16LE(local+26),localExtra=raw.readUInt16LE(local+28),start=local+30+localLen+localExtra;
  if(start+packed>offset||decodeText(raw.subarray(local+30,local+30+localLen))!==rawName)throw new Error('ZIP数据范围无效');
  const compressed=raw.subarray(start,start+packed);
  const data=method===0?compressed:inflateRawSync(compressed,{maxOutputLength:Math.max(1,bytes)});
  if(data.length!==bytes||crc32(data)!==expected)throw new Error('ZIP完整性校验失败');
  files.push({path:name,data:data.toString('base64')});
 }
 if(cursor!==offset+size)throw new Error('ZIP目录长度不一致');
 return files;
}
export function validateFiles(input:unknown,allowArchives=false){
 if(!Array.isArray(input)||!input.length||input.length>IMPORT_LIMITS.files)throw new Error('请选择1至2000个文件');
 const files:ImportFile[]=[];let total=0;const names=new Set<string>();
 for(const item of input){
  if(!item||typeof item.data!=='string'||item.data.length%4||!/^[A-Za-z0-9+/]*={0,2}$/.test(item.data))throw new Error('文件编码无效');
  const name=safeImportPath(item.path),raw=Buffer.from(item.data,'base64');
  if(names.has(name.toLowerCase()))throw new Error('导入路径重复');names.add(name.toLowerCase());
  if(raw.toString('base64')!==item.data)throw new Error('文件Base64编码无效');
  total+=raw.length;if(raw.length>(allowArchives&&/\.zip$/i.test(name)?IMPORT_LIMITS.totalBytes:IMPORT_LIMITS.fileBytes)||total>IMPORT_LIMITS.totalBytes)throw new Error('单文档最多2MiB，ZIP和单批最多64MiB');
  files.push({path:name,data:item.data});
 }
 return files;
}
export async function scanFolder(folder:string,knowledgeRoot:string,signal:AbortSignal){
 if(!path.isAbsolute(folder))throw new Error('当前对话没有有效的文件夹路径');
 const root=await fs.realpath(folder),target=await fs.realpath(knowledgeRoot);
 const within=(a:string,b:string)=>a===b||a.startsWith(b+path.sep);
 if(within(root,target))throw new Error('当前对话位于知识库内部，不能学习知识库自身');
 const files:ImportFile[]=[],skipped:{path:string;reason:string}[]=[];let bytes=0,visited=0;
 const walk=async(dir:string)=>{
  for(const e of (await fs.readdir(dir,{withFileTypes:true})).sort((a,b)=>a.name.localeCompare(b.name))){
   signal.throwIfAborted();if(++visited>20000)throw new Error('文件夹条目过多，请缩小学习目录');
   const full=path.join(dir,e.name),relative=path.relative(root,full).split(path.sep).join('/');
   if(e.isSymbolicLink()){skipped.push({path:relative,reason:'符号链接'});continue;}
   if(e.isDirectory()){
    if(excluded.has(e.name)||within(full,target)){skipped.push({path:relative,reason:'依赖/生成目录或目标知识库'});continue;}
    await walk(full);continue;
   }
   if(!e.isFile()||fileKind(relative)==='skip'){skipped.push({path:relative,reason:'不支持的类型或排除文件'});continue;}
   const handle=await fs.open(full,'r');let raw:Buffer;
   try{
    const st=await handle.stat();const current=await fs.lstat(full);
    if(current.isSymbolicLink()||!st.isFile()||st.ino!==current.ino||st.dev!==current.dev)throw new Error('扫描时文件已变化：'+relative);
    const resolved=await fs.realpath(full);if(!within(resolved,root))throw new Error('文件超出学习目录');
    if(st.size>IMPORT_LIMITS.fileBytes){skipped.push({path:relative,reason:'超过2MiB'});continue;}
    raw=await handle.readFile();
   }finally{await handle.close();}
   bytes+=raw.length;if(bytes>IMPORT_LIMITS.totalBytes||files.length>=IMPORT_LIMITS.files)throw new Error('目录超过单批2000文件/64MiB限制，请缩小学习目录');
   files.push({path:safeImportPath(relative),data:raw.toString('base64')});
  }
 };
 await walk(root);if(!files.some(f=>fileKind(f.path)==='text'))throw new Error('文件夹没有可学习的UTF-8文档或源代码');
 return {root,files,skipped};
}
