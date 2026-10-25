import { DatabaseSync } from 'node:sqlite';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { build } from 'esbuild';

await mkdir('dist/bench', { recursive: true });
await build({ entryPoints: ['src/tokenize.ts'], outfile: 'dist/bench/tokenize.mjs', format: 'esm', platform: 'node', bundle: true });
const { indexText, matchQuery } = await import('../dist/bench/tokenize.mjs');
const fixture = JSON.parse(await readFile('test/fixtures/recall-eval.json', 'utf8'));
const reports = [];
for (const tokenizer of ['segmented-unicode61-2gram', 'trigram-with-short-substring']) {
  const db = new DatabaseSync(':memory:');
  db.exec(`CREATE VIRTUAL TABLE fts USING fts5(id UNINDEXED,text,tokenize='${tokenizer.startsWith('segmented') ? 'unicode61' : 'trigram'}')`);
  const insert = db.prepare('INSERT INTO fts VALUES(?,?)');
  for (const e of fixture.entries) {
    const text = [e.title, e.body, ...e.tags].join(' ');
    insert.run(e.id, tokenizer.startsWith('segmented') ? indexText(text) : text.normalize('NFKC').toLowerCase());
  }
  const results = [];
  for (const query of fixture.queries) {
    const start = performance.now();
    let ids;
    if (tokenizer.startsWith('trigram') && query.query.length < 3) {
      ids = fixture.entries.filter(e => [e.title, e.body, ...e.tags].join(' ').includes(query.query)).slice(0, 5).map(e => e.id);
    } else {
      const match = tokenizer.startsWith('segmented') ? matchQuery(query.query) : '"' + query.query.normalize('NFKC').toLowerCase().replaceAll('"', '""') + '"';
      ids = match ? db.prepare('SELECT id FROM fts WHERE fts MATCH ? ORDER BY bm25(fts) LIMIT 5').all(match).map(row => row.id) : [];
    }
    results.push({ category: query.category, recall: query.expected.filter(id => ids.includes(id)).length / query.expected.length, latencyMs: performance.now() - start });
  }
  const mean = rows => rows.reduce((s, r) => s + r.recall, 0) / rows.length;
  reports.push({ tokenizer, overallRecallAt5: mean(results), keywordRecallAt5: mean(results.filter(r => r.category !== 'paraphrase')), paraphraseRecallAt5: mean(results.filter(r => r.category === 'paraphrase')), meanMs: results.reduce((s, r) => s + r.latencyMs, 0) / results.length });
  db.close();
}
await writeFile('dist/bench/tokenizers.json', JSON.stringify(reports, null, 2));
console.log(JSON.stringify(reports, null, 2));
