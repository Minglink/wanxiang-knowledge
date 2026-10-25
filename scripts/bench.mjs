import { NodeSqliteEngine } from '../lib/index.js';
import { mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import os from 'node:os';
import path from 'node:path';

if (!process.argv.includes('--run')) {
  console.log('No writes. Pass --run; optional --size=10000; defaults 10000/100000/1000000.');
} else if (!process.argv.includes('--child')) {
  await mkdir('dist/bench', { recursive: true });
  const selected = process.argv.find(arg => arg.startsWith('--size='));
  for (const size of selected ? [Number(selected.split('=')[1])] : [10000, 100000, 1000000]) {
    if (![10000, 100000, 1000000].includes(size)) throw new Error('Unsupported corpus size');
    await new Promise((resolve, reject) => {
      const child = spawn(process.execPath, ['scripts/bench.mjs', '--run', '--child', '--size=' + size], { windowsHide: true, stdio: 'inherit' });
      child.once('error', reject); child.once('exit', code => code === 0 ? resolve() : reject(new Error('benchmark child failed: ' + code)));
    });
  }
} else {
  const size = Number(process.argv.find(arg => arg.startsWith('--size=')).split('=')[1]);
  const root = await mkdtemp(path.join(os.tmpdir(), 'wanxiang-index-bench-'));
  const engine = new NodeSqliteEngine(path.join(root, 'index.db'));
  await engine.init(); engine.reset();
  try {
    const start = performance.now();
    engine.begin();
    for (let i = 0; i < size; i++) {
      engine.index({ id: 'bench-' + i, title: '合成索引 ' + i, l0: 'ERR_BENCH_' + i, l1: '本地恢复方法',
        questions: ['东西坏了怎么办？', '出现报错怎样修复？', '想恢复文件怎么操作？'],
        body: '合成正文：数据库索引与文件恢复，编号' + i, tags: ['合成'], type: 'method', project: 'project-' + (i % 100), archived: false, updatedAt: '2026-01-01' });
      if (i % 5000 === 4999) { engine.end(); engine.begin(); }
      if (i % 100000 === 99999) console.log(JSON.stringify({ progress: i + 1, size, seconds: (performance.now() - start) / 1000 }));
    }
    engine.end(); await engine.flush();
    const indexMs = performance.now() - start;
    const times = [], selective = [], broad = [];
    for (let i = 0; i < 40; i++) {
      const begun = performance.now();
      const result = engine.fullSearch(i % 2 ? { query: '索引 文件恢复', hot: true, limit: 100 } : { query: 'ERR_BENCH_' + (i * 123 % size), project: 'project-' + (i * 123 % 100), hot: true, limit: 100 });
      const elapsed = performance.now() - begun;
      times.push(elapsed); (i % 2 ? broad : selective).push(elapsed);
      if (!result.length) throw new Error('benchmark query unexpectedly empty');
    }
    const percentile = (rows, p) => [...rows].sort((a, b) => a - b)[Math.ceil(rows.length * p) - 1];
    const memory = process.memoryUsage();
    const result = { size, indexMs, queryP50Ms: percentile(times, 0.5), queryP95Ms: percentile(times, 0.95), selectiveP95Ms: percentile(selective, 0.95), broadP95Ms: percentile(broad, 0.95), rssMiB: memory.rss / 1048576, heapMiB: memory.heapUsed / 1048576, runtime: process.version,
      scope: 'Native disk FTS: tokenization+insertion; excludes Markdown files/metadata Map. Queries exclude model/full SearchService exact scan.' };
    await mkdir('dist/bench', { recursive: true });
    await writeFile(`dist/bench/index-${size}.json`, JSON.stringify(result, null, 2));
    console.log(JSON.stringify(result));
  } finally { engine.close(); await rm(root, { recursive: true, force: true }); }
}
