// Task 2.0: execute the import from the physically installed package directory.
import { readFile, realpath, writeFile, rm, mkdir } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { randomUUID } from 'node:crypto';
import path from 'node:path';
import os from 'node:os';
import assert from 'node:assert/strict';

const installed = await realpath(path.join(process.env.DSH_HOME || path.join(os.homedir(), '.dsh'), 'profiles/desktop/node_modules/dsh-wanxiang-knowledge'));
const manifest = JSON.parse(await readFile(path.join(installed, 'package.json'), 'utf8'));
const probe = path.join(installed, 'lib', '.sqlite-probe-' + randomUUID() + '.mjs');
const executable = path.join(process.env.LOCALAPPDATA, 'Programs/DeepSeek Harness/DeepSeek Harness.exe');
const script = `import {fileURLToPath} from 'node:url';
import {writeFile} from 'node:fs/promises';
const {DatabaseSync}=await import('node:sqlite');
const db=new DatabaseSync(':memory:');
try {
  db.exec('CREATE VIRTUAL TABLE t USING fts5(x)');
  db.prepare('INSERT INTO t(x) VALUES (?)').run('synthetic 索引');
  const result={module:fileURLToPath(import.meta.url),node:process.version,electron:process.versions.electron,fts5:db.prepare("SELECT count(*) AS n FROM t WHERE t MATCH '索引'").get().n===1};
  await writeFile(process.argv[2],JSON.stringify(result,null,2));
} finally { db.close(); }
`;
await mkdir('dist/v02-probes', { recursive: true });
const output = path.resolve('dist/v02-probes/installed-sqlite.json');
try {
  await writeFile(probe, script, { flag: 'wx' });
  const result = spawnSync(executable, ['--expose-internals', probe, output], {
    cwd: installed, env: { ...process.env, ELECTRON_RUN_AS_NODE: '1' }, windowsHide: true, encoding: 'utf8', timeout: 15000,
  });
  assert.equal(result.status, 0, result.stderr || result.error?.message);
  const evidence = JSON.parse(await readFile(output, 'utf8'));
  assert.equal(evidence.fts5, true);
  assert.ok(evidence.module.startsWith(installed + path.sep));
  console.log(JSON.stringify({ ...evidence, installedVersion: manifest.version, temporaryModuleRemoved: true }, null, 2));
} finally { await rm(probe, { force: true }); }
