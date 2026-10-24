import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, readFile, rm } from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { backupKnowledge, hostIdle } from '../scripts/install-preflight.mjs';
import { createServer } from 'node:http';

test('安装备份完整复制中文空格目录并校验哈希，不更改来源', async t => {
  const dir = await mkdtemp(path.join(os.tmpdir(), 'wanxiang-backup-'));
  t.after(() => rm(dir, { recursive: true, force: true }));
  const root = path.join(dir, '知识 库');
  await mkdir(path.join(root, '.wanxiang/revisions'), { recursive: true });
  await writeFile(path.join(root, '合成.md'), 'synthetic');
  await writeFile(path.join(root, '.wanxiang/revisions/旧.json'), '{}');
  const records = await backupKnowledge(root, path.join(dir, '备份'));
  assert.equal(records.length, 2);
  assert.equal(await readFile(path.join(root, '合成.md'), 'utf8'), 'synthetic');
  await assert.rejects(backupKnowledge(root, path.join(root, 'nested')), /内部/);
});
test('安装前检查拒绝运行中会话及不明确状态', async t => {
  let sessions = [{ running: true }];
  const server = createServer((req, res) => {
    res.setHeader('content-type', 'application/json');
    if (req.url === '/wanxiang') return res.end('<meta name="wanxiang-token" content="synthetic">');
    res.end(JSON.stringify(req.url.endsWith('/sessions') ? sessions : { jobs: [], settings: { root: 'synthetic' } }));
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  t.after(() => new Promise(resolve => server.close(resolve)));
  const base = 'http://127.0.0.1:' + server.address().port;
  await assert.rejects(hostIdle(base), /正在执行/);
  sessions = [{}];
  await assert.rejects(hostIdle(base), /未明确/);
  sessions = [{ running: false }];
  assert.equal((await hostIdle(base)).sessions, 1);
});
