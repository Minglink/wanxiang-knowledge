import { mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import path from 'node:path';
import os from 'node:os';
import { NodeSqliteEngine, RecallSearch } from '../lib/index.js';

if (!process.argv.includes('--run')) {
  console.log('Disabled. Pass --run for synthetic 10000/100000/1000000 indexes.');
} else if (!process.argv.includes('--child')) {
  await mkdir('dist/bench-recall', { recursive: true });
  for (const size of [10000, 100000, 1000000]) {
    await new Promise((resolve, reject) => {
      const child = spawn(process.execPath, ['scripts/bench-recall.mjs', '--run', '--child', String(size)], { windowsHide: true, stdio: 'inherit' });
      child.on('error', reject); child.on('exit', code => code === 0 ? resolve() : reject(new Error('recall benchmark failed: ' + code)));
    });
  }
} else {
  const size = Number(process.argv.at(-1));
  const root = await mkdtemp(path.join(os.tmpdir(), 'wanxiang-recall-bench-'));
  await mkdir(path.join(root, '.wanxiang'));
  const engine = new NodeSqliteEngine(path.join(root, '.wanxiang/index.db'));
  await engine.init(); engine.reset();
  const owner = { store: { root, engine, entries: { size }, local: (...parts) => path.join(root, ...parts) },
    host: {}, recall: { options: () => ({ smartRewrite: false }) } };
  const recall = new RecallSearch(owner);
  try {
    const begun = performance.now();
    engine.begin();
    for (let index = 0; index < size; index++) {
      engine.index({ id: 'bench-' + index, title: '合成索引 ' + index, l0: 'ERR_BENCH_' + index,
        l1: '本地恢复方法', questions: ['东西坏了怎么办？', '出现报错怎样修复？', '想恢复文件怎么操作？'],
        body: '合成正文：数据库索引与文件恢复，编号' + index, tags: ['合成'], type: 'method', project: 'project-' + (index % 100), archived: false, updatedAt: '2026-01-01' });
      if (index % 5000 === 4999) { engine.end(); engine.begin(); }
      if (index % 100000 === 99999) console.log(JSON.stringify({ progress: index + 1, size }));
    }
    engine.end(); await engine.flush();
    const indexMs = performance.now() - begun;
    const attempts = [];
    for (let index = 0; index < 40; index++) {
      const query = index % 2 ? '索引 文件恢复' : 'ERR_BENCH_' + (index * 123 % size);
      const start = performance.now();
      const request = recall.run({ sessionId: 'synthetic', messageId: 'm-' + index, seq: index,
        query, cwd: '', recent: [] }, new AbortController().signal).then(rows => ({ status: 'success', count: rows.length, ms: performance.now() - start }), error => ({ status: error.name, reason: error.reason || error.message, ms: performance.now() - start }));
      const result = await request;
      attempts.push({ index, kind: index % 2 ? 'broad' : 'selective', readyWithinWindow: result.ms <= 3, ...result });
    }
    const percentile = (rows, value) => rows.length ? [...rows].sort((a, b) => a - b)[Math.ceil(rows.length * value) - 1] : null;
    const times = attempts.map(row => row.ms);
    const report = { size, indexMs, attempts, p50: percentile(times, 0.5), p95: percentile(times, 0.95), p99: percentile(times, 0.99), max: Math.max(...times),
      success: attempts.filter(row => row.status === 'success').length,
      timeouts: attempts.filter(row => row.status === 'RecallTimeout').length,
      readyWithinWindow: attempts.filter(row => row.readyWithinWindow && row.status === 'success').length,
      childRssMiB: (recall.pool?.lastMemory?.rss || 0) / 1048576,
      scope: 'Actual RecallSearch + IPC + isolated FTS/rules/confidence with deadline; includes cold startup/timeouts. Excludes Markdown creation and resident metadata Map; 3ms window is simulation, not production first-step coverage.' };
    await mkdir('dist/bench-recall', { recursive: true });
    await writeFile(`dist/bench-recall/${size}.json`, JSON.stringify(report, null, 2));
    const { attempts: _attempts, ...summary } = report;
    console.log(JSON.stringify(summary));
  } finally { await recall.dispose(); engine.close(); await rm(root, { recursive: true, force: true }); }
}
