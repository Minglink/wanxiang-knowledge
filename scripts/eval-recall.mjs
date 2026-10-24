import assert from 'node:assert/strict';
import { readFile, mkdtemp, rm, mkdir, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { Store } from '../lib/index.js';

const fixturePath = path.resolve(process.argv[2] || 'test/fixtures/recall-eval.json');
const fixture = JSON.parse(await readFile(fixturePath, 'utf8'));
assert.ok(fixture.queries.length >= 50, 'at least 50 labeled queries required');
const ids = new Set(fixture.entries.map(e => e.id));
assert.equal(ids.size, fixture.entries.length, 'duplicate entry IDs');
for (const item of fixture.queries) {
  assert.ok(typeof item.query === 'string' && item.query.trim());
  assert.ok(item.expected.length && new Set(item.expected).size === item.expected.length);
  assert.ok(item.expected.every(id => ids.has(id)), 'unknown expected ID');
}
const root = await mkdtemp(path.join(os.tmpdir(), 'wanxiang-recall-eval-'));
let store;
try {
  store = await new Store(root).init();
  for (const [index, entry] of fixture.entries.entries()) {
    const timestamp = new Date(Date.UTC(2026, 0, 1) + index * 1000).toISOString();
    await store.save({
      ...entry, type: 'method', project: 'synthetic', createdAt: timestamp, updatedAt: timestamp,
      sourceSession: 'synthetic-' + entry.id, sourceTitle: '合成评测', sourceSeqs: [1],
      snapshotHash: '', generatedHash: '', archived: false, verification: '待核验',
      file: path.join('cards', entry.id + '.md'),
    });
  }
  // Rebuild from the actual Markdown files, not a reimplementation of search.
  await store.rebuild();
  const results = [];
  for (const item of fixture.queries) {
    const started = performance.now();
    const found = store.search(item.query).map(e => e.id);
    const latencyMs = performance.now() - started;
    const top5 = found.slice(0, 5);
    const rank = found.findIndex(id => item.expected.includes(id));
    results.push({ ...item, top5, recallAt5: item.expected.filter(id => top5.includes(id)).length / item.expected.length,
      reciprocalRank: rank < 0 ? 0 : 1 / (rank + 1), latencyMs });
  }
  const mean = key => results.reduce((sum, item) => sum + item[key], 0) / results.length;
  const times = results.map(r => r.latencyMs).sort((a, b) => a - b);
  const groups = Object.fromEntries([...new Set(results.map(r => r.category))].map(category => {
    const subset = results.filter(r => r.category === category);
    return [category, { count: subset.length, recallAt5: subset.reduce((s, r) => s + r.recallAt5, 0) / subset.length }];
  }));
  const report = {
    engine: 'v0.1 Store.search (NFKC instr intersection, updated DESC, LIMIT 200)',
    corpus: ids.size, queries: results.length,
    recallAt5: mean('recallAt5'), MRR: mean('reciprocalRank'),
    meanMs: mean('latencyMs'), p50Ms: times[Math.floor(times.length * 0.5)],
    p95Ms: times[Math.ceil(times.length * 0.95) - 1], groups, results,
    definitions: { recallAt5: 'macro mean of relevant IDs in top5 / all expected IDs',
      MRR: 'first relevant rank within actual returned results (up to 200); missing=0',
      timing: 'per query only, excludes corpus/file creation; tiny synthetic corpus, not a scale benchmark' },
  };
  await mkdir('dist/v02-probes', { recursive: true });
  await writeFile('dist/v02-probes/recall-baseline.json', JSON.stringify(report, null, 2));
  const { results: _results, ...summary } = report;
  console.log(JSON.stringify(summary, null, 2));
} finally {
  store?.close();
  await rm(root, { recursive: true, force: true });
}
