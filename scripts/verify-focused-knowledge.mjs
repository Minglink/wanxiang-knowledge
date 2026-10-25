import {readFile,writeFile,mkdtemp,mkdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import path from 'node:path';
import os from 'node:os';
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {Store,SearchService,MarkdownRepo} from '../lib/index.js';

const workspace=fileURLToPath(new URL('../',import.meta.url));
const roots=['reverse-engineering','security-research','vm-shell-crypto'].map(p=>path.join(workspace,'knowledge',p));
const pack=roots[2];
await mkdir(path.join(pack,'notes'),{recursive:true});
const temp=await mkdtemp(path.join(os.tmpdir(),'wanxiang-focused-'));
const digest=b=>createHash('sha256').update(b).digest('hex');
const ids=new Set(),titles=new Set(),bodies=new Set(),sourceBodies=new Set();
const counts={},limitations=[],imports=[];
let before=0,newEntries=0;
const allEntries=[];
for(let n=0;n<roots.length;n++){
 const root=roots[n];const manifest=JSON.parse(await readFile(path.join(root,'manifest.json'),'utf8'));
 const repo=new MarkdownRepo(root);const files=await repo.files();
 assert.equal(files.length,manifest.entries.length,'Unexpected or missing knowledge files');
 const sourceRegistry=JSON.parse(await readFile(path.join(root,'sources',manifest.batchId+'.json'),'utf8'));
 const sources=new Map(sourceRegistry.sources.map(s=>[s.id,s]));
 for(const row of manifest.entries){
  const raw=await readFile(path.join(root,row.file));assert.equal(digest(raw),row.sha256);
  const e=repo.read(row.file);assert.equal(e.id,row.id);assert.equal(e.title,row.title);
  assert.ok(!ids.has(e.id),'Duplicate ID '+e.id);ids.add(e.id);
  assert.ok(!titles.has(e.title),'Duplicate title '+e.title);titles.add(e.title);
  assert.ok(e.body.length>=250,'Short body '+e.id);
  const normalized=e.body.replace(/## 来源[\s\S]*/,'').replace(/^# .*\n/,'').replace(/\s+/g,' ').trim();
  const bodyHash=digest(normalized);assert.ok(!bodies.has(bodyHash),'Duplicate body '+e.id);bodies.add(bodyHash);
  assert.deepEqual(e.sourceSeqs,[]);assert.ok(e.sourceSession.startsWith('external:'));
  assert.ok(e.l0?.trim());assert.ok(e.l1?.trim());assert.ok(e.questions?.length>=2);assert.ok(e.externalSources?.length);
  counts[e.project]=(counts[e.project]||0)+1;
  if(n===2){
   assert.equal(e.batchId,manifest.batchId);assert.ok(e.contentLicense);
   assert.equal(digest(e.body),e.generatedHash,'Body hash '+e.id);
   for(const source of e.externalSources){assert.ok(sources.has(source.id),'Unknown source '+source.id);assert.equal(sources.get(source.id).url,source.url);}
   if(e.id.startsWith('wx-re-doc-')){
    const source=sources.get(e.externalSources[0].id);const original=await readFile(path.join(root,source.asset));
    assert.equal(digest(original),source.sha256);assert.equal(e.snapshotHash,source.sha256);
    assert.ok(!sourceBodies.has(source.sha256),'Duplicate source document '+e.id);sourceBodies.add(source.sha256);
    assert.ok(original.length>=1500);assert.ok(e.body.includes('## 技术正文'));
   }else{
    for(const heading of ['## 机制','## 分析例与核对方法','## 判断边界'])assert.ok(e.body.includes(heading));
   }
   if(e.body.includes('原文 RST 指令'))limitations.push(e.id);
   newEntries++;
  }else before++;
  allEntries.push(e);
 }
 for(const asset of manifest.assets||[])assert.equal(digest(await readFile(path.join(root,asset.file))),asset.sha256);
 const run=()=>spawnSync(process.execPath,['scripts/import-reverse-knowledge.mjs','--root',temp,'--source',root],{cwd:workspace,encoding:'utf8'});
 const first=run();assert.equal(first.status,0,first.stderr);imports.push(JSON.parse(first.stdout));
 const again=run();assert.equal(again.status,0,again.stderr);assert.equal(JSON.parse(again.stdout).created,0);
}
assert.ok(newEntries>=501,'User requires 500+ NEW entries in this batch');
assert.equal(newEntries,574);assert.equal(before,608);assert.equal(ids.size,1182);
for(const e of allEntries)for(const link of e.links||[])assert.ok(ids.has(link.to),'Dangling relation '+link.to);
const store=await new Store(temp).init();assert.equal(store.entries.size,1182);assert.deepEqual(store.warnings,[]);
const search=new SearchService(store);
const checks=[
 ['RVA','wx-re-pe-address'],['CWE-416','wx-re-cwe-416'],['引用计数','wx-re-kernel-core-api-kref'],
 ['Handler融合','wx-re-focus-vm-superoperators'],['VPC','wx-re-focus-vm-state-model'],
 ['寄存器轮转','wx-re-focus-vm-context-rotation'],['不透明谓词','wx-re-focus-vm-opaque-predicate'],
 ['undef','wx-re-focus-vm-llvm-poison'],['Overlay','wx-re-focus-shell-upx-overlay'],
 ['Themida','wx-re-focus-shell-themida-scope'],['Code Virtualizer','wx-re-focus-shell-codevirtualizer'],
 ['WinLicense','wx-re-focus-shell-winlicense-layers'],['ConfuserEx','wx-re-focus-shell-confuser-features'],
 ['InMemoryDexClassLoader','wx-re-focus-shell-android-inmemory'],['XTEA','wx-re-focus-crypto-xtea-diff'],
 ['XXTEA','wx-re-focus-crypto-xxtea-length'],['GCM','wx-re-focus-crypto-gcm-auth'],
 ['HKDF','wx-re-focus-crypto-hkdf-context'],['Argon2id','wx-re-focus-crypto-argon2-memory'],
 ['X25519','wx-re-focus-crypto-x25519-kdf'],['Ed25519ph','wx-re-focus-crypto-ed25519-variants'],
 ['SM4','wx-re-focus-crypto-sm4-provider'],['CRYPTO_memcmp','wx-re-focus-crypto-constant-compare'],
 ['EVP_CIPHER-AES','wx-re-doc-openssl-doc-man7-evp-cipher-aes'],
 ['AddressSanitizer','wx-re-doc-clang-clang-docs-addresssanitizer'],
 ['TCG','wx-re-doc-qemu-docs-devel-tcg']
];
const results=[];
for(const [query,expected] of checks){
 assert.ok(ids.has(expected),'Missing expected ID '+expected);
 const result=await search.search(query,{mode:'hybrid',limit:100});
 assert.ok(result.items.some(e=>e.id===expected),'Missing recall for '+query+' → '+expected);
 results.push({query,expected,total:result.total});
}
store.close();
const manifest=JSON.parse(await readFile(path.join(pack,'manifest.json'),'utf8'));
const manual=path.join(temp,manifest.entries[0].file);await writeFile(manual,'manual revision must survive');
const conflict=spawnSync(process.execPath,['scripts/import-reverse-knowledge.mjs','--root',temp,'--source',pack],{cwd:workspace,encoding:'utf8'});
assert.notEqual(conflict.status,0);assert.equal(await readFile(manual,'utf8'),'manual revision must survive');
const result={checkedAt:'2026-10-25',before,newEntries,total:ids.size,originalChineseNotes:54,licensedEnglishDocuments:sourceBodies.size,counts,
 metadataAndHashes:'pass',exactIdTitleBodyDedup:'pass',originalDocumentDedup:'pass',relationships:'pass',
 idempotentImport:'pass',manualEditPreservation:'pass',searchChecks:results,
 unresolvedRstDocuments:limitations,scope:'临时隔离库；验证结构、导入及检索；不等于逐篇人工翻译、语义去重证明、代码实测或运行中宿主刷新'};
await writeFile(path.join(pack,'validation.json'),JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify({before,newEntries,total:ids.size,queries:results.length,unresolvedRstDocuments:limitations.length,temporaryRoot:temp}));
