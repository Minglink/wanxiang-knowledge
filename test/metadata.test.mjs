import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, writeFile, rm } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { Store } from '../lib/index.js';

test('Map只持有元数据、正文按需读且外部修改仍拒绝覆盖', async t => {
  const root = await mkdtemp(path.join(os.tmpdir(), 'wanxiang-lazy-'));
  const store = await new Store(root).init();
  t.after(async () => { store.close(); await rm(root, { recursive: true, force: true }); });
  const entry = { id: 's', title: '合成', body: '原正文', type: 'note', tags: [], project: '', file: 'notes/s.md', archived: false, updatedAt: '2026-01-01', sourceSeqs: [1] };
  await store.save(entry);
  const metadata = store.entries.get('s');
  assert.equal(Object.getOwnPropertyDescriptor(metadata, 'body').enumerable, false);
  assert.equal(typeof Object.getOwnPropertyDescriptor(metadata, 'body').get, 'function');
  assert.equal(metadata.body, '原正文');
  const raw = await readFile(store.local(entry.file), 'utf8');
  await writeFile(store.local(entry.file), raw + '外部修改');
  assert.equal(metadata.body, '原正文外部修改');
  await assert.rejects(store.edit('s', '想覆盖', '合成', metadata.updatedAt), /外部修改/);
  assert.ok((await readFile(store.local(entry.file), 'utf8')).endsWith('外部修改'));
});
