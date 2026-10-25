import { readFile, readdir, mkdtemp, writeFile, lstat } from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { Store, SearchService, MarkdownRepo } from '../lib/index.js';

// Uses only a new temporary database. Never opens the user's live index.
const workspace=fileURLToPath(new URL('../',import.meta.url));
const roots=['knowledge/reverse-engineering','knowledge/security-research'].map(p=>path.join(workspace,p));
const temp=await mkdtemp(path.join(os.tmpdir(),'wanxiang-research-'));
const hashes=new Set(),ids=new Set(),titles=new Set();
const bodyWarnings=[];const counts={};
for(const source of roots){
 const manifest=JSON.parse(await readFile(path.join(source,'manifest.json'),'utf8'));
 const repo=new MarkdownRepo(source);const files=await repo.files();
 assert.equal(files.length,manifest.entries.length,'Unmanifested or missing cards');
 for(const row of manifest.entries){
  const raw=await readFile(path.join(source,row.file));
  assert.equal(createHash('sha256').update(raw).digest('hex'),row.sha256);
  const entry=repo.read(row.file);assert.equal(entry.id,row.id);
  assert.ok(!ids.has(entry.id),'Duplicate ID '+entry.id);ids.add(entry.id);
  assert.ok(!titles.has(entry.title),'Duplicate title '+entry.title);titles.add(entry.title);
  assert.deepEqual(entry.sourceSeqs,[]);assert.ok(entry.sourceSession.startsWith('external:'));
  assert.ok(entry.l0?.trim(),'Missing useful summary '+entry.id);
  assert.ok(entry.questions?.length>=2);assert.ok(entry.externalSources?.length);
  assert.ok(entry.body.length>=250);
  const normalized=entry.body.replace(/## 来源[\s\S]*/,'').replace(/\s+/g,' ').trim();
  const hash=createHash('sha256').update(normalized).digest('hex');
  assert.ok(!hashes.has(hash),'Duplicate body '+entry.id);hashes.add(hash);
  counts[entry.project]=(counts[entry.project]||0)+1;
  if(entry.body.includes('.. list-table::')||entry.body.includes('.. kernel-doc::'))bodyWarnings.push({id:entry.id,note:'contains unexpanded RST; original source retained'});
 }
 const run=()=>spawnSync(process.execPath,['scripts/import-reverse-knowledge.mjs','--root',temp,'--source',source],{cwd:workspace,encoding:'utf8'});
 const first=run();assert.equal(first.status,0,first.stderr);
 const again=run();assert.equal(again.status,0,again.stderr);assert.equal(JSON.parse(again.stdout).created,0);
}
assert.ok(ids.size>=500,'Target is 500+ substantive entries');
const store=await new Store(temp).init();
assert.deepEqual(store.warnings,[]);assert.equal(store.entries.size,ids.size);
const service=new SearchService(store);
const queries=[
 ['RVA','wx-re-pe-address'],['第五个参数','wx-re-x64-abi'],['RegisterNatives','wx-re-jni-registration'],
 ['PDB','wx-re-forum-pdb-rsds-identity'],['NextEntryOffset','wx-re-forum-native-process-buffer'],
 ['Session 0','wx-re-forum-session-owner-token'],['PID','wx-re-forum-process-parent-temporal'],
 ['CWE-415','wx-re-cwe-415'],['CWE-416','wx-re-cwe-416'],['CWE-190','wx-re-cwe-190'],
 ['CWE-362','wx-re-cwe-362'],['CWE-787','wx-re-cwe-787'],
 ['引用计数','wx-re-kernel-core-api-kref'],['Seccomp','wx-re-kernel-userspace-api-seccomp-filter']
];
const results=[];
for(const [query,id] of queries){
 assert.ok(ids.has(id),'Expected ID missing '+id);
 const result=await service.search(query,{mode:'hybrid',limit:100});
 assert.ok(result.items.some(item=>item.id===id),'Missing search result: '+query);
 results.push({query,expected:id,total:result.total});
}
for(const entry of store.entries.values())for(const link of entry.links||[])assert.ok(ids.has(link.to),'Dangling relationship '+link.to);
store.close();
const source=roots[1];const manifest=JSON.parse(await readFile(path.join(source,'manifest.json'),'utf8'));
const edited=path.join(temp,manifest.entries[0].file);await writeFile(edited,'manual revision');
const collision=spawnSync(process.execPath,['scripts/import-reverse-knowledge.mjs','--root',temp,'--source',source],{cwd:workspace,encoding:'utf8'});
assert.notEqual(collision.status,0);assert.equal(await readFile(edited,'utf8'),'manual revision');
const result={checkedAt:'2026-10-25',entries:ids.size,counts,metadataAndHashes:'pass',exactIdTitleBodyDedup:'pass',idempotentImport:'pass',manualEditPreservation:'pass',relationships:'pass',searchChecks:results,renderLimitations:bodyWarnings,scope:'临时隔离库；检查结构与检索，不等于逐条文献事实核对、代码实测或宿主页面刷新'};
await writeFile(path.join(source,'validation.json'),JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify({entries:ids.size,counts,searchChecks:results.length,temporaryRoot:temp}));
