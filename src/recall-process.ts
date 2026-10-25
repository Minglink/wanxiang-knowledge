const backend = { file: process.argv[2], engine: process.argv[3] };
import { readFile, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { matchQuery } from './tokenize.js';
import path from 'node:path';
import { rewriteRules, validateAliases } from './query-rewrite.js';
import { recallConfidence } from './recall-query.js';

let native: import('node:sqlite').DatabaseSync | undefined;
let fallback: import('sql.js').Database | undefined;
let fallbackModified = -1;
async function query(request: any) {
  let aliases = {};
  try { aliases = validateAliases(JSON.parse(await readFile(path.join(path.dirname(backend.file), 'aliases.json'), 'utf8'))); }
  catch (error: any) { if (error.code !== 'ENOENT') throw error; }
  const rewritten = rewriteRules(request.query, aliases);
  const score = (row: any) => ({ id: String(row.id), rank: Number(row.rank || 0), score: recallConfidence(request.currentQuery || request.query,
    { ...row, questions: JSON.parse(row.questions || '[]') }, aliases) });
  if (backend.engine === 'node:sqlite') {
    if (!native) {
      const { DatabaseSync } = await import('node:sqlite');
      native = new DatabaseSync(backend.file, { readOnly: true });
      native.exec('PRAGMA query_only=ON; PRAGMA busy_timeout=15; PRAGMA cache_size=-4096;');
    }
    const terms = matchQuery(rewritten);
    if (!terms) return [];
    const fields = request.limited ? '{title l0 questions}' : '{title l0 l1 questions tags}';
    const parameters: (string | number)[] = [fields + ':(' + terms + ')'];
    let where = 'fts MATCH ? AND e.archived=0 AND e.invalid_at IS NULL';
    if (request.project) { where += ' AND e.project=?'; parameters.push(request.project); }
    parameters.push(request.limit);
    return native.prepare(`SELECT e.id,e.title,e.l0,e.questions,-bm25(fts,10,6,4,8,1,3) AS rank FROM fts JOIN entries e ON e.rowid=fts.rowid WHERE ${where} ORDER BY rank DESC LIMIT ?`).all(...parameters).map(score).sort((a, b) => b.score - a.score || b.rank - a.rank);
  }
  // Compatible WASM engine, still outside the host event loop. Never scans body.
  const modified = (await stat(backend.file)).mtimeMs;
  if (!fallback || modified !== fallbackModified) {
    const { default: initSqlJs } = await import('sql.js');
    const SQL = await initSqlJs({ locateFile: () => fileURLToPath(new URL('./sql-wasm.wasm', import.meta.url)) });
    const data = await readFile(backend.file);
    fallback?.close();
    fallback = new SQL.Database(data);
    fallbackModified = modified;
  }
  const terms = rewritten.normalize('NFKC').toLowerCase().trim().split(/\s+/).filter(Boolean).slice(0, 12);
  let where = 'archived=0 AND invalid_at IS NULL';
  const parameters: (string | number)[] = [];
  if (request.project) { where += ' AND project=?'; parameters.push(request.project); }
  for (const term of terms) {
    where += " AND instr(lower(title||' '||l0||' '||questions||' '||tags),?)>0";
    parameters.push(term);
  }
  parameters.push(request.limit);
  const statement = fallback.prepare(`SELECT id,title,l0,questions FROM entries WHERE ${where} ORDER BY updated DESC LIMIT ?`);
  const rows: { id: string; rank: number; score: number }[] = [];
  try {
    statement.bind(parameters);
    while (statement.step()) rows.push(score(statement.getAsObject()));
  } finally { statement.free(); }
  return rows.sort((a, b) => b.score - a.score);
}
process.on('message', async (request: any) => {
  try { process.send?.({ id: request.id, rows: await query(request), memory: process.memoryUsage() }); }
  catch (error: any) { process.send?.({ id: request.id, error: String(error.message) }); }
});

process.on('disconnect', () => process.exit(0));
