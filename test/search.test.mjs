import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { Store, SearchService, rewriteModel } from '../lib/index.js';

test('别名/问法参与召回，失效过滤、分页与深度层级', async t => {
  const root = await mkdtemp(path.join(os.tmpdir(), 'wanxiang-search-'));
  const store = await new Store(root).init();
  t.after(async () => { store.close(); await rm(root, { recursive: true, force: true }); });
  for (let i = 0; i < 30; i++) await store.save({ id: 'e-' + i, title: 'pnpm 安装', body: '深度秘密标识', l0: '合成说明', questions: ['装包卡住如何处理？'], type: 'method', tags: [], project: '', file: 'cards/e-' + i + '.md', updatedAt: '2026-01-01', archived: false, invalidAt: i === 0 ? '2026-01-01' : null });
  await writeFile(store.local('.wanxiang/aliases.json'), JSON.stringify({ pnpm: ['包管理器'] }));
  const search = new SearchService(store);
  const first = await search.search('包管理器', { limit: 10 });
  assert.equal(first.items.length, 10);
  assert.equal(first.total, 29);
  assert.ok(first.items.every(item => item.valid && item.body === '' && item.matchedBy.includes('keyword')));
  const next = await search.search('包管理器', { offset: 10, limit: 10 });
  assert.ok(next.items.every(item => !first.items.some(previous => previous.id === item.id)));
  assert.ok((await search.search('装包卡住')).items.length);
  assert.ok((await search.search('深度秘密标识', { mode: 'deep' })).items.every(item => item.tier === 'L2'));
});
test('模型改写超时/非法JSON回退，输入和输出经过脱敏', async () => {
  const never = { generate: async () => new Promise(() => {}) };
  const start = performance.now();
  assert.equal(await rewriteModel('x', never, 'rule', 10), 'rule');
  assert.ok(performance.now() - start < 300);
  assert.equal(await rewriteModel('x', { generate: async () => '{bad' }, 'rule'), 'rule');
  assert.equal(await rewriteModel('sk-abcdefghijklmnopqrst', { generate: async snapshot => {
    assert.ok(!snapshot.messages[0].text.includes('sk-abcdefghijklmnopqrst'));
    return '{"keywords":["sk-abcdefghijklmnopqrst"],"intent":"合成"}';
  } }, 'rule'), 'rule [已隐藏凭据]');
});
