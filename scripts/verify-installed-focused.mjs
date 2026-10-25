import assert from 'node:assert/strict';
import {readFile,writeFile,readdir} from 'node:fs/promises';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';

const workspace=fileURLToPath(new URL('../',import.meta.url));
const pack=path.join(workspace,'knowledge/vm-shell-crypto');
const root='C:\\Users\\Administrator\\Documents\\万象知识库';
const base='http://127.0.0.1:62345';
const sha=raw=>createHash('sha256').update(raw).digest('hex');
const manifest=JSON.parse(await readFile(path.join(pack,'manifest.json'),'utf8'));
const baseline=JSON.parse(await readFile(path.join(pack,'pre-import-baseline.json'),'utf8'));
const validation=JSON.parse(await readFile(path.join(pack,'validation.json'),'utf8'));
const oldFiles=Object.entries(baseline.files);
for(const [file,expected] of oldFiles)assert.equal(sha(await readFile(path.join(root,file))),expected,'Old knowledge changed '+file);
for(const item of [...manifest.entries,...manifest.assets])assert.equal(sha(await readFile(path.join(root,item.file))),item.sha256,'Installed hash mismatch '+item.file);

const preserved=new Map();
async function snapshot(dir){
 for(const e of await readdir(path.join(root,dir),{withFileTypes:true})){
  const file=path.join(dir,e.name);assert.ok(!e.isSymbolicLink());
  if(e.isDirectory())await snapshot(file);else preserved.set(file,sha(await readFile(path.join(root,file))));
 }
}
for(const dir of ['cards','notes','sources','tools'])await snapshot(dir);
for(const file of ['.wanxiang/mirrors.json','.wanxiang/aliases.json']){
 try{preserved.set(file,sha(await readFile(path.join(root,file))));}catch(e){if(e.code!=='ENOENT')throw e;}
}
const html=await(await fetch(base+'/wanxiang',{signal:AbortSignal.timeout(5000)})).text();
const token=html.match(/name="wanxiang-token" content="([^"]+)"/)?.[1];assert.ok(token);
async function api(action,data){
 const r=await fetch(base+'/api/wanxiang/'+action,{method:data?'POST':'GET',headers:{'x-wanxiang-token':token,...data?{'content-type':'application/json'}:{}},body:data?JSON.stringify(data):undefined,signal:AbortSignal.timeout(60000)});
 const result=await r.json();if(!r.ok)throw Error(action+': '+(result.error||r.status));return result;
}
const before=await api('state');assert.equal(path.resolve(before.settings.root),path.resolve(root));
assert.ok(!before.jobs.some(j=>['queued','running'].includes(j.status)),'Knowledge job active');
assert.notEqual(before.metadataJob?.status,'running','Metadata task active');
const sessions=await api('sessions');assert.ok(!sessions.some(s=>s.running),'Host session active');
// Rebuild only through the running plugin's own guarded route; never open its live SQLite separately.
const count=state=>state.stats.cards+state.stats.notes;
const rebuilt=count(before)===1182?{count:count(before),warnings:before.warnings,action:'缓存已刷新，无需重复重建'}:await api('rebuild',{});
assert.equal(rebuilt.count,1182);assert.deepEqual(rebuilt.warnings,[]);
const after=await api('state');assert.equal(count(after),1182);assert.deepEqual(after.warnings,[]);
// The installed state endpoint returns only its first 200 entries. Check all new IDs via entry below.
const results=[];
const searches=await Promise.allSettled(validation.searchChecks.map(async check=>{
 const response=await api('search?q='+encodeURIComponent(check.query)+'&mode=hybrid&limit=100');
 assert.ok(response.items.some(e=>e.id===check.expected),'Host recall failed '+check.query);
 return {query:check.query,expected:check.expected,total:response.total};
}));
for(const result of searches){if(result.status==='rejected')throw result.reason;results.push(result.value);}
// Verify actual host loading of every new document, without emitting its body to the log.
for(let start=0;start<manifest.entries.length;start+=12){
 const loaded=await Promise.allSettled(manifest.entries.slice(start,start+12).map(async entry=>{
  const actual=await api('entry?id='+encodeURIComponent(entry.id));
  const raw=await readFile(path.join(pack,entry.file),'utf8');const body=raw.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n([\s\S]*)$/)?.[1];assert.ok(body);
  assert.equal(actual.id,entry.id);assert.equal(actual.title,entry.title);assert.equal(sha(actual.body),sha(body),'Host body differs '+entry.id);
 }));
 for(const r of loaded)if(r.status==='rejected')throw r.reason;
}
for(const [file,expected] of preserved)assert.equal(sha(await readFile(path.join(root,file))),expected,'Source content changed during rebuild '+file);
const report={checkedAt:new Date().toISOString(),automationDeleted:'持续扩充万象知识库',root,host:base,
 beforeHostEntries:count(before),afterHostEntries:count(after),newEntriesPresent:manifest.entries.length,
 everyNewEntryReadableAndBodyMatches:'pass',installedCardAndAssetHashes:'pass',oldKnowledgeFilesUnchanged:oldFiles.length,
 nonIndexFilesPreserved:preserved.size,indexRebuild:rebuilt,hostSearchChecks:results,
 limitations:['520篇许可文献保留英文正文，未逐篇人工翻译或实验复现','37篇含未展开的RST工程指令，保留原始文件与上游链接','结构与检索检查不构成逐条技术结论正确性的证明']};
await writeFile(path.join(pack,'installed-validation.json'),JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({automationDeleted:true,before:count(before),after:count(after),newEntries:manifest.entries.length,readableBodies:manifest.entries.length,hostSearches:results.length,oldFilesPreserved:oldFiles.length,nonIndexFilesPreserved:preserved.size,warnings:rebuilt.warnings}));
