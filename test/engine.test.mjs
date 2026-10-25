import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, rm } from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { SqlJsEngine, NodeSqliteEngine, createEngine } from '../lib/index.js';

for (const name of ['sql.js', 'node:sqlite']) test(name + ' 同一引擎契约：索引、归一化、过滤、分页、更新、重建', async t => {
  const dir = await mkdtemp(path.join(os.tmpdir(), 'wanxiang-engine-'));
  const engine = name === 'sql.js' ? new SqlJsEngine(async () => {}) : new NodeSqliteEngine(path.join(dir, 'index.db'));
  await engine.init();
  t.after(async () => { engine.close(); await rm(dir, { recursive: true, force: true }); });
  engine.reset();
  const entry = { id: 's', title: '合成 SQLite', body: '中文 索引 ERR_TEST [x] C:\\合成 空格', tags: ['测试'], type: 'method', project: 'p', archived: false, updatedAt: '2026-01-01' };
  engine.index(entry);
  engine.index({ ...entry, id: 'b', archived: true });
  assert.deepEqual(engine.search({ query: 'ＳＱＬｉｔｅ 索引' }), ['s']);
  assert.deepEqual(engine.search({ query: '[x]' }), ['s']);
  assert.deepEqual(engine.search({ project: 'none' }), []);
  assert.deepEqual(engine.search({ archived: true }), ['b']);
  assert.deepEqual(engine.search({ offset: 1 }), []);
  engine.index({ ...entry, body: '替换正文' });
  assert.deepEqual(engine.search({ query: 'ERR_TEST' }), []);
  assert.deepEqual(engine.search({ query: '替换' }), ['s']);
  await engine.flush();
  engine.reset();
  assert.deepEqual(engine.search({}), []);
});
test('禁用或原生打开失败自动降级，提示大规模限制', async t => {
  const root = await mkdtemp(path.join(os.tmpdir(), 'wanxiang-fallback-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  // Parent .wanxiang absent makes native file open fail; WASM persistence is not invoked.
  for (const enabled of [true, false]) {
    const result = await createEngine(root, async () => {}, enabled);
    assert.equal(result.engine.name, 'sql.js');
    assert.match(result.warning, /大规模场景受限/);
    result.engine.close();
  }
});
