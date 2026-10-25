import test from 'node:test';
import assert from 'node:assert/strict';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { execFileSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';
import { Store, reorganize, rollbackReorganize } from '../lib/index.js';

const sample = { id: 'knowledge-0001', title: '合成知识', type: 'method', body: '手工内容必须保留', tags: ['合成'], project: '中文 项目', sourceSession: 'session', sourceTitle: '合成', sourceSeqs: [1], createdAt: '2026-01-01', updatedAt: '2026-01-01', generatedHash: 'original', snapshotHash: 'synthetic', archived: false, verification: '待核验', schemaVersion: 2, questions: ['这件事如何处理？', '报错出现怎么排查？', '我想解决问题该怎么做？'] };

test('实际0.1.0程序读取v2分片的兼容副本、编辑后新版本同步且双改拒绝覆盖', async t => {
  await fs.mkdir('dist/compat', { recursive: true });
  const extracted = await fs.mkdtemp(path.resolve('dist/compat/old-'));
  const root = await fs.mkdtemp(path.join(os.tmpdir(), 'wanxiang-compat-'));
  execFileSync('tar', ['-xf', path.resolve('artifacts/dsh-wanxiang-knowledge-0.1.0.tgz'), '-C', extracted], { windowsHide: true });
  const { Store: OldStore } = await import(pathToFileURL(path.join(extracted, 'package/lib/index.js')).href);
  let current = await new Store(root).init();
  t.after(async () => { current.close(); await fs.rm(root, { recursive: true, force: true }); await fs.rm(extracted, { recursive: true, force: true }); });
  const primary = path.join('cards', '中文 项目', '合成-knowledge.md');
  await current.save({ ...sample, file: primary }); await current.flush();
  const mirror = path.join('cards', '合成-knowledge.md');
  assert.equal(await fs.readFile(current.local(primary), 'utf8'), await fs.readFile(current.local(mirror), 'utf8'));
  const old = await new OldStore(root).init();
  assert.equal(old.entries.size, 1);
  const legacy = old.entries.get(sample.id);
  assert.equal(legacy.body, sample.body);
  await old.edit(legacy.id, legacy.body + '\n旧版本批注', legacy.title, legacy.updatedAt);
  old.close();
  await current.rebuild();
  assert.ok(current.read(sample.id).body.endsWith('旧版本批注'));
  assert.equal(await fs.readFile(current.local(primary), 'utf8'), await fs.readFile(current.local(mirror), 'utf8'));
  const stable = await fs.readFile(current.local(primary), 'utf8');
  await fs.writeFile(current.local(primary), stable + '\n分片修改');
  await fs.writeFile(current.local(mirror), stable + '\n平铺修改');
  await current.rebuild();
  assert.ok(current.warnings.some(warning => warning.includes('均被修改')));
  assert.ok((await fs.readFile(current.local(primary), 'utf8')).endsWith('分片修改'));
  assert.ok((await fs.readFile(current.local(mirror), 'utf8')).endsWith('平铺修改'));
});

test('整理预检不写文件，备份后整理可撤销；原文变化拒绝撤销', async t => {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), 'wanxiang-reorganize-'));
  const store = await new Store(root).init();
  t.after(async () => { store.close(); await fs.rm(root, { recursive: true, force: true }); });
  await store.save({ ...sample, file: 'cards/flat.md' });
  const raw = await fs.readFile(store.local('cards/flat.md'), 'utf8');
  const preview = await reorganize(store);
  assert.equal(preview.moved.length, 1);
  await assert.rejects(fs.access(store.local(preview.moved[0].to)));
  const applied = await reorganize(store, false);
  assert.ok(applied.backup);
  assert.equal(store.entries.size, 1);
  await rollbackReorganize(store);
  assert.equal(await fs.readFile(store.local('cards/flat.md'), 'utf8'), raw);
  assert.equal(store.entries.size, 1);
  const again = await reorganize(store, false);
  await fs.appendFile(store.local(again.moved[0].to), '\n外部修改');
  await assert.rejects(rollbackReorganize(store), /停止撤销/);
});

test('索引删除与重建从Markdown/工具完整恢复entries、fts与relations', async t => {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), 'wanxiang-rebuild-'));
  let store = await new Store(root).init();
  t.after(async () => { store.close(); await fs.rm(root, { recursive: true, force: true }); });
  await store.save({ ...sample, file: 'cards/a.md' });
  await store.save({ ...sample, id: 'knowledge-0002', file: 'cards/b.md', body: '引用 knowledge-0001' });
  await store.saveTool({ name: '合成工具', linkedIds: [sample.id] }); await store.flush();
  const before = store.engine.db.prepare('SELECT * FROM relations ORDER BY src,dst,kind').all();
  store.close();
  await fs.rm(path.join(root, '.wanxiang/index.db'));
  store = await new Store(root).init();
  assert.equal(store.entries.size, 2);
  assert.ok(store.engine.fullSearch({ query: '如何处理' }).length);
  assert.deepEqual(store.engine.db.prepare('SELECT * FROM relations ORDER BY src,dst,kind').all(), before);
});

test('兼容副本写入中途失败恢复原文件和清单', async t => {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), 'wanxiang-copy-rollback-'));
  const store = await new Store(root).init();
  t.after(async () => { store.close(); await fs.rm(root, { recursive: true, force: true }); });
  const file = 'cards/project/item.md';
  await store.save({ ...sample, file });
  const original = await fs.readFile(store.local(file), 'utf8');
  const rename = fs.rename;
  let once = true;
  fs.rename = async (from, to) => {
    if (once && String(to) === store.local('cards/item.md')) { once = false; throw new Error('模拟镜像提交失败'); }
    return rename(from, to);
  };
  try { await assert.rejects(store.save({ ...sample, file, body: '不能只改一边' }), /模拟/); }
  finally { fs.rename = rename; }
  assert.equal(await fs.readFile(store.local(file), 'utf8'), original);
  assert.equal(await fs.readFile(store.local('cards/item.md'), 'utf8'), original);
});
