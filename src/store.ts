import { relations } from './relations.js';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { createHash, randomUUID } from 'node:crypto';
import { MarkdownRepo } from './markdown-repo.js';
import { createEngine } from './engine-factory.js';
import type { IndexEngine } from './index-engine.js';
import type { Entry, Tool } from './types.js';
export const hash=(s:string)=>createHash('sha256').update(s).digest('hex');
export const now=()=>new Date().toISOString();
export async function atomic(file:string,data:string|Uint8Array) { await fs.mkdir(path.dirname(file),{recursive:true});const tmp=file+'.'+randomUUID()+'.tmp';try{await fs.writeFile(tmp,data);await fs.rename(tmp,file);}finally{await fs.rm(tmp,{force:true}).catch(()=>{});} }
export async function json<T>(file:string,fallback:T):Promise<T>{try{return JSON.parse(await fs.readFile(file,'utf8'));}catch(e:any){if(e.code==='ENOENT')return fallback;throw new Error(`无法读取 ${path.basename(file)}：${e.message}`);}}
export class Store {
  engine!:IndexEngine; get db(){return this.engine;} entries=new Map<string,Entry>(); tools:Tool[]=[]; warnings:string[]=[]; private engineWarning='';
  repo:MarkdownRepo;
  constructor(public root:string){this.repo=new MarkdownRepo(root);}
  read(id:string){const entry=this.entries.get(id);if(!entry)throw new Error('知识不存在');return this.repo.read(entry.file);}
  local(...parts:string[]) {const p=path.resolve(this.root,...parts);if(p!==this.root&&!p.startsWith(this.root+path.sep))throw new Error('路径超出知识目录');return p;}
  async init(){for(const d of ['notes','cards','tools','sources','.wanxiang/jobs','.wanxiang/revisions','.wanxiang/staging'])await fs.mkdir(this.local(d),{recursive:true});const selected=await createEngine(this.root,data=>atomic(this.local('.wanxiang','index.sqlite'),data));this.engine=selected.engine;this.engineWarning=selected.warning||'';this.tools=await json(this.local('tools','catalog.json'),[]);await this.rebuild();return this;}
  async rebuild(){this.entries.clear();this.warnings=this.engineWarning?[this.engineWarning]:[];this.engine.reset();for(const file of await this.repo.files()){try{await this.repo.synchronize(file);const e=this.repo.read(file);if(this.entries.has(e.id))throw new Error('重复 ID');this.entries.set(e.id,this.repo.metadata(e));this.index(e);}catch(e:any){this.warnings.push(`${file}：${e.message}`);}}await this.flush();return {count:this.entries.size,warnings:this.warnings};}
  index(e:Entry){this.engine.index(e);}
  async flush(){if(this.engine.replaceRelations)this.engine.replaceRelations(relations(this.entries,this.tools));await this.engine.flush();}
  search(q='',type='',archived=false,project=''){return this.engine.search({query:q,type,archived,project}).map(id=>this.entries.get(id)!); }
  async save(e:Entry){await this.repo.write(e);this.entries.set(e.id,this.repo.metadata(e));this.index(e);}
  async edit(id:string,body:string,title:string,expected:string,archived?:boolean){const e=this.entries.get(id);if(!e)throw new Error('知识不存在');if(e.updatedAt!==expected)throw new Error('内容已更新，请刷新后再保存');const disk=await fs.readFile(this.local(e.file),'utf8');const match=disk.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);if(!match||(e._bodyHash?hash(match[2])!==e._bodyHash:match[2]!==e.body)||JSON.parse(match[1]).updatedAt!==e.updatedAt||JSON.parse(match[1]).title!==e.title)throw new Error('文件已在外部修改，请重建索引后重试');await atomic(this.local('.wanxiang','revisions',`${id}-${Date.now()}.json`),JSON.stringify({...e,body:e.body}));const next={...e,body,title:title.trim()||e.title,archived:archived??e.archived,updatedAt:new Date(Math.max(Date.now(),Date.parse(e.updatedAt)+1)).toISOString()};await this.save(next);await this.flush();return next;}
  async saveTool(input:Partial<Tool>){const id=input.id||randomUUID();if(typeof input.name!=='string'||!input.name.trim())throw new Error('请输入工具名称');if(input.linkedIds!==undefined&&(!Array.isArray(input.linkedIds)||input.linkedIds.some(x=>typeof x!=='string')))throw new Error('关联知识 ID 无效');for(const key of ['category','type','path','notes','detector'] as const)if(input[key]!==undefined&&typeof input[key]!=='string')throw new Error('工具字段无效');const old=this.tools.find(t=>t.id===id);const t:Tool={id,name:input.name.trim().slice(0,120),category:String(input.category||'自定义').slice(0,60),type:input.type||'CLI',path:input.path||'',notes:input.notes||'',version:old?.version||'',status:old?.status||'未检测',detector:input.detector||'',linkedIds:input.linkedIds||[],checkedAt:old?.checkedAt};if(t.path!==old?.path||t.detector!==old?.detector){t.status='未检测';t.version='';t.checkedAt=undefined;}const next=[...this.tools.filter(x=>x.id!==id),t];await atomic(this.local('tools','catalog.json'),JSON.stringify(next,null,2));this.tools=next;return t;}
  async removeTool(id:string){const next=this.tools.filter(t=>t.id!==id);await atomic(this.local('tools','catalog.json'),JSON.stringify(next,null,2));this.tools=next;}
  close(){this.engine.close();}
}
