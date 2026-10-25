import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { RecallProcessPool, RecallSearch, NodeSqliteEngine, SqlJsEngine, skipRecall } from '../lib/index.js';

test('真实慢SQL在隔离进程硬截止，宿主心跳继续，执行被终止而不是放任后台跑完', async () => {
  const pool = new RecallProcessPool('unused', 'node:sqlite', new URL('./fixtures/blocked-sql-process.mjs', import.meta.url));
  let beats = 0;
  const heartbeat = setInterval(() => beats++, 5);
  const start = performance.now();
  try {
    await assert.rejects(pool.query({ query: 'synthetic', limited: true, limit: 10 }, new AbortController().signal, 200), { name: 'RecallTimeout' });
    assert.ok(performance.now() - start < 600);
    assert.ok(beats > 5, 'main thread must remain responsive');
    assert.equal(pool.stats.terminations, 1);
    assert.equal(pool.stats.completed, 0);
    assert.equal(pool.stats.started, 1, 'actual SQL must have started');
    await pool.waitForStops();
    assert.equal(pool.stats.exited, 1);
    assert.throws(() => process.kill(pool.stats.stoppedPids[0], 0), 'SQL child PID must no longer exist');
  } finally { clearInterval(heartbeat); pool.dispose(); }
});
for (const name of ['node:sqlite', 'sql.js']) test('隔离召回热层、中文路径、别名和失效过滤：' + name, async t => {
  const root = await mkdtemp(path.join(os.tmpdir(), '万象 隔离召回-'));
  const file = path.join(root, '.wanxiang', name === 'sql.js' ? 'index.sqlite' : 'index.db');
  await mkdir(path.dirname(file));
  const engine = name === 'sql.js' ? new SqlJsEngine(data => writeFile(file, data)) : new NodeSqliteEngine(file);
  await engine.init(); engine.reset();
  const entry = { id: 'valid', title: 'pnpm 安装', l0: '安装脚本停顿', questions: ['装包卡住如何处理？'], body: 'ERR_BODY_ONLY', type: 'method', tags: [], project: 'p', archived: false, updatedAt: '2026-01-01' };
  engine.index(entry); engine.index({ ...entry, id: 'invalid', invalidAt: '2026-01-01' });
  await engine.flush();
  await writeFile(path.join(root, '.wanxiang/aliases.json'), JSON.stringify({ pnpm: ['包管理器'] }));
  const pool = new RecallProcessPool(file, name);
  t.after(async () => { await pool.dispose(); engine.close(); await rm(root, { recursive: true, force: true }); });
  const query = value => pool.query({ query: value, currentQuery: value, limited: true, limit: 10 }, new AbortController().signal, 1000);
  const found = await query('装包卡住如何处理？');
  assert.deepEqual(found.map(row => row.id), ['valid']);
  assert.equal(found[0].score, 1);
  assert.deepEqual(await query('ERR_BODY_ONLY'), []);
  if (name === 'node:sqlite') assert.equal((await query('包管理器'))[0].id, 'valid');
});
test('触发跳过有原因，连续超时不重试且下一轮降级窄列关键词', async () => {
  assert.equal(skipRecall('好'), 'confirmation');
  assert.equal(skipRecall('git status'), 'command');
  assert.equal(skipRecall('索引'), 'short');
  assert.equal(skipRecall('pnpm 安装卡住怎么办？'), '');
  const store = { root: 'synthetic', local: () => 'unused', entries: new Map(), engine: { fullText: true, name: 'node:sqlite' } };
  const owner = { store, recall: { options: () => ({ smartRewrite: false }) } };
  const search = new RecallSearch(owner);
  let calls = 0;
  search.root = store.root;
  search.pool = { query: async () => { calls++; throw Object.assign(new Error('timeout'), { name: 'RecallTimeout', reason: 'timeout' }); }, dispose() {} };
  const input = { sessionId: 'synthetic-session', messageId: 'm', seq: 1, query: '合成索引如何恢复？', cwd: '', recent: [] };
  for (let index = 0; index < 2; index++) await assert.rejects(search.run(input, new AbortController().signal), { name: 'RecallTimeout' });
  assert.equal(calls, 2, 'no retry within a turn');
  search.pool.query = async request => { assert.equal(request.limited, true); assert.equal(request.limit, 10); return []; };
  await search.run(input, new AbortController().signal);
  assert.equal(search.lastPolicy.mode, 'keyword');
  search.pool.query = async () => [];
  await search.run(input, new AbortController().signal);
  assert.equal(search.lastPolicy.mode, 'rules');
  search.dispose();
});
