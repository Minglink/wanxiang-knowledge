import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, readFile, rm } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { KnowledgeService } from '../lib/index.js';

async function setup(t) {
  const dir = await mkdtemp(path.join(os.tmpdir(), 'wanxiang-settings-'));
  const host = { listSessions: async () => [], snapshot: async () => ({ id: 's', title: '合成', messages: [{ seq: 1, role: 'user', text: 'synthetic' }], lastSeq: 1 }) };
  const service = await new KnowledgeService(path.join(dir, 'home'), host, path.join(dir, '旧 知识库')).init();
  await service.generate('s', 'export');
  await service.tail;
  t.after(async () => { await service.dispose(); await rm(dir, { recursive: true, force: true }); });
  return { dir, service };
}

test('切库预检失败保留旧store、设置、任务、pending和磁盘配置', async t => {
  const { dir, service: s } = await setup(t);
  await s.markPending('p', '合成待落库');
  const old = { store: s.store, settings: s.settings, jobs: s.jobs, pending: s.pending, config: await readFile(s.configFile, 'utf8') };
  for (const [relative, content] of [
    ['.wanxiang/pending.json', '{invalid'],
    ['.wanxiang/pending.json', '[]'],
    ['.wanxiang/jobs/broken.json', '{invalid'],
    ['tools/catalog.json', '{}'],
    ['notes/broken.md', 'invalid markdown'],
  ]) {
    const root = path.join(dir, '目标 ' + Math.random());
    await mkdir(path.dirname(path.join(root, relative)), { recursive: true });
    await writeFile(path.join(root, relative), content);
    await assert.rejects(s.updateSettings({ root }));
    for (const key of ['store', 'settings', 'jobs', 'pending']) assert.equal(s[key], old[key]);
    assert.equal(await readFile(s.configFile, 'utf8'), old.config);
    assert.equal(s.store.search('synthetic').length, 1);
  }
});

test('不可写目标与配置提交失败均保留完整旧状态', async t => {
  const { dir, service: s } = await setup(t);
  const old = { store: s.store, settings: s.settings, jobs: s.jobs, pending: s.pending };
  // Deterministic filesystem obstruction on Windows (administrator bypasses chmod).
  const blocked = path.join(dir, '不可写目标');
  await writeFile(blocked, 'a file cannot contain a knowledge directory');
  await assert.rejects(s.updateSettings({ root: blocked }));
  // Force the real atomic rename to fail, after staging an otherwise valid target.
  await rm(s.configFile);
  await mkdir(s.configFile);
  await assert.rejects(s.updateSettings({ root: path.join(dir, '有效目标 中文 空格') }));
  for (const key of ['store', 'settings', 'jobs', 'pending']) assert.equal(s[key], old[key]);
  assert.equal(s.store.search('synthetic').length, 1);
  await rm(s.configFile, { recursive: true });
  await writeFile(s.configFile, JSON.stringify(s.settings));
});

test('中文空格目录成功切换与并发设置按顺序提交且保留原文件', async t => {
  const { dir, service: s } = await setup(t);
  const original = s.settings.root;
  const a = path.join(dir, '第二个 中文 空格');
  const b = path.join(dir, '第三个 中文 空格');
  await Promise.all([s.updateSettings({ root: a }), s.updateSettings({ root: b })]);
  assert.equal(s.store.root, b);
  assert.equal(JSON.parse(await readFile(s.configFile, 'utf8')).root, b);
  await s.updateSettings({ root: original });
  assert.equal(s.store.search('synthetic').length, 1);
  await s.markPending('after', '切库后仍可写');
  assert.ok(JSON.parse(await readFile(s.store.local('.wanxiang/pending.json'), 'utf8')).after);
});
