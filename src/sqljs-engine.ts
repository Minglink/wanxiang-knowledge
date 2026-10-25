import initSqlJs, { type Database } from 'sql.js';
import { fileURLToPath } from 'node:url';
import type { Entry } from './types.js';
import type { IndexEngine, SearchFilter } from './index-engine.js';

export class SqlJsEngine implements IndexEngine {
  readonly name = 'sql.js';
  readonly fullText = false;
  db!: Database;
  constructor(private persist: (data: Uint8Array) => Promise<void>) {}

  async init() {
    const SQL = await initSqlJs({ locateFile: () => fileURLToPath(new URL('./sql-wasm.wasm', import.meta.url)) });
    this.db = new SQL.Database();
  }
  reset() {
    this.db.run('DROP TABLE IF EXISTS entries; CREATE TABLE entries(id TEXT PRIMARY KEY,title TEXT,kind TEXT,project TEXT,tags TEXT,search TEXT,archived INTEGER,updated TEXT,invalid_at TEXT,l0 TEXT,questions TEXT)');
  }
  index(entry: Entry) {
    const search = `${entry.id}\n${entry.title}\n${entry.tags.join(' ')}\n${entry.body}`.normalize('NFKC').toLowerCase();
    this.db.run('INSERT OR REPLACE INTO entries VALUES(?,?,?,?,?,?,?,?,?,?,?)', [entry.id, entry.title, entry.type, entry.project, entry.tags.join(' '), search, entry.archived ? 1 : 0, entry.updatedAt, entry.invalidAt || null, entry.l0 || '', JSON.stringify(entry.questions || [])]);
  }
  search(filter: SearchFilter) {
    const terms = (filter.query || '').normalize('NFKC').toLowerCase().trim().split(/\s+/).filter(Boolean).slice(0, 12);
    let sql = 'SELECT id FROM entries WHERE archived=?';
    const args: (string | number)[] = [filter.archived ? 1 : 0];
    if (filter.type) { sql += ' AND kind=?'; args.push(filter.type); }
    if (filter.project) { sql += ' AND project=?'; args.push(filter.project); }
    if (filter.validOnly) sql += ' AND invalid_at IS NULL';
    if (filter.updatedAfter) { sql += ' AND updated>=?'; args.push(filter.updatedAfter); }
    if (filter.updatedBefore) { sql += ' AND updated<=?'; args.push(filter.updatedBefore); }
    for (const term of terms) { sql += ' AND instr(search,?)>0'; args.push(term); }
    sql += ' ORDER BY updated DESC LIMIT ? OFFSET ?';
    args.push(Math.max(1, Math.min(1000, filter.limit || 200)), Math.max(0, filter.offset || 0));
    const statement = this.db.prepare(sql);
    statement.bind(args);
    const result: string[] = [];
    try { while (statement.step()) result.push(String(statement.get()[0])); }
    finally { statement.free(); }
    return result;
  }
  replaceRelations(rows: Iterable<import('./relations.js').Relation>) {
    this.db.run('CREATE TABLE IF NOT EXISTS relations(src TEXT,dst TEXT,kind TEXT,weight REAL,PRIMARY KEY(src,dst,kind));DELETE FROM relations');
    for(const row of rows)this.db.run('INSERT OR REPLACE INTO relations VALUES(?,?,?,?)',[row.s,row.t,row.kind,row.w]);
  }
  async flush() { await this.persist(this.db.export()); }
  close() { this.db?.close(); }
}
