import test from 'node:test';
import assert from 'node:assert/strict';
import {promises as fs} from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {build} from 'esbuild';
await build({stdin:{contents:"export {atomic} from './src/store.ts'",resolveDir:process.cwd()},bundle:true,outfile:'dist/test-atomic.mjs',platform:'node',format:'esm',external:['sql.js']});
const {atomic}=await import('../dist/test-atomic.mjs');
test('Windows短暂占用重试原子替换，持久拒绝时原文保留且清理临时文件',async()=>{
 const root=await fs.mkdtemp(path.join(os.tmpdir(),'wx-atomic-'));const file=path.join(root,'任务.json');const rename=fs.rename;let attempts=0;
 try{
  await fs.writeFile(file,'original');
  fs.rename=async(...args)=>{if(++attempts<=2)throw Object.assign(new Error('busy'),{code:'EPERM'});return rename(...args);};
  await atomic(file,'updated');assert.equal(attempts,3);assert.equal(await fs.readFile(file,'utf8'),'updated');
  fs.rename=async()=>{throw Object.assign(new Error('denied'),{code:'EACCES'});};
  await assert.rejects(atomic(file,'must not replace'),/denied/);assert.equal(await fs.readFile(file,'utf8'),'updated');assert.deepEqual(await fs.readdir(root),['任务.json']);
 }finally{fs.rename=rename;await fs.rm(root,{recursive:true,force:true});}
});
