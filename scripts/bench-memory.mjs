import { spawnSync } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
import { MarkdownRepo } from '../lib/index.js';

if (!process.argv.includes('--child')) {
  const reports = [];
  for (const mode of ['full', 'metadata']) {
    const run = spawnSync(process.execPath, ['--expose-gc', 'scripts/bench-memory.mjs', '--child', mode], { encoding: 'utf8', windowsHide: true });
    if (run.status !== 0) throw new Error(run.stderr);
    reports.push(JSON.parse(run.stdout));
  }
  await mkdir('dist/bench', { recursive: true });
  await writeFile('dist/bench/memory-100k.json', JSON.stringify(reports, null, 2));
  console.log(JSON.stringify(reports, null, 2));
} else {
  const mode = process.argv.at(-1);
  const repo = new MarkdownRepo(process.cwd());
  const entries = new Map();
  global.gc();
  const baseline = process.memoryUsage();
  for (let i = 0; i < 100000; i++) {
    // Materialize unique strings, rather than measuring shared V8 ropes.
    const body = Buffer.from(('合成独立正文' + i + '方法步骤限制。').repeat(200)).toString();
    const entry = { id: 'synthetic-' + i, title: '合成 ' + i, body, tags: [], file: 'unused-' + i + '.md' };
    entries.set(entry.id, mode === 'full' ? entry : repo.metadata(entry));
  }
  global.gc();
  const used = process.memoryUsage();
  console.log(JSON.stringify({ mode, count: entries.size, heapMiB: used.heapUsed / 1048576, rssMiB: used.rss / 1048576, heapDeltaMiB: (used.heapUsed - baseline.heapUsed) / 1048576, scope: 'Map retention only; excludes disk index, corpus files and application jobs' }));
}
