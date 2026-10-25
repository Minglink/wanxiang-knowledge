// Run with the installed Harness executable in Node mode. Synthetic storage only.
import { mkdtemp, mkdir, rm } from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import assert from 'node:assert/strict';
import { NodeSqliteEngine, RecallProcessPool } from '../lib/index.js';

const root = await mkdtemp(path.join(os.tmpdir(), 'wanxiang-runtime-recall-'));
await mkdir(path.join(root, '.wanxiang'));
const file = path.join(root, '.wanxiang/index.db');
const engine = new NodeSqliteEngine(file);
await engine.init(); engine.reset();
const pool = new RecallProcessPool(file, 'node:sqlite');
try {
  engine.index({ id: 'synthetic-runtime', title: '合成恢复方法', l0: '索引损坏时可以重建。', questions: ['数据库坏了如何恢复？'],
    body: '合成正文', tags: [], type: 'method', project: 'synthetic', archived: false, updatedAt: '2026-01-01' });
  await engine.flush();
  const start = performance.now();
  const rows = await pool.query({ query: '数据库坏了如何恢复？', currentQuery: '数据库坏了如何恢复？', limited: true, limit: 10 }, new AbortController().signal, 2000);
  assert.equal(rows[0].id, 'synthetic-runtime'); assert.equal(rows[0].score, 1);
  console.log(JSON.stringify({ runtime: process.version, electron: process.versions.electron, childIPC: true, nativeFTS: true, coldMs: performance.now() - start, childRssMiB: pool.lastMemory.rss / 1048576 }));
} finally { await pool.dispose(); engine.close(); await rm(root, { recursive: true, force: true }); }
