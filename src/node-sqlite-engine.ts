import type { DatabaseSync } from 'node:sqlite';
import type { Entry } from './types.js';
import type { IndexEngine, SearchFilter } from './index-engine.js';

export class NodeSqliteEngine implements IndexEngine {
  readonly name = 'node:sqlite';
  readonly fullText = true;
  db!: DatabaseSync;
  constructor(private filename: string) {}
  async init() {
    const { DatabaseSync } = await import('node:sqlite');
    this.db = new DatabaseSync(this.filename);
    try {
      this.db.exec('CREATE VIRTUAL TABLE IF NOT EXISTS capability_probe USING fts5(x); DROP TABLE capability_probe; PRAGMA journal_mode=WAL; PRAGMA synchronous=NORMAL;');
    } catch (error) { this.db.close(); throw error; }
  }
  reset() {
    this.db.exec(`DROP TABLE IF EXISTS fts; DROP TABLE IF EXISTS entries;
      CREATE TABLE entries(id TEXT PRIMARY KEY,title TEXT,kind TEXT,project TEXT,tags TEXT,search TEXT,archived INTEGER,updated TEXT);
      CREATE VIRTUAL TABLE fts USING fts5(search, content='entries', content_rowid='rowid');`);
  }
  index(entry: Entry) {
    const search = `${entry.id}\n${entry.title}\n${entry.tags.join(' ')}\n${entry.body}`.normalize('NFKC').toLowerCase();
    const previous = this.db.prepare('SELECT rowid,search FROM entries WHERE id=?').get(entry.id);
    if (previous) this.db.prepare("INSERT INTO fts(fts,rowid,search) VALUES('delete',?,?)").run(previous.rowid!, previous.search!);
    this.db.prepare('INSERT OR REPLACE INTO entries VALUES(?,?,?,?,?,?,?,?)').run(entry.id, entry.title, entry.type, entry.project, entry.tags.join(' '), search, entry.archived ? 1 : 0, entry.updatedAt);
    const row = this.db.prepare('SELECT rowid FROM entries WHERE id=?').get(entry.id)!;
    this.db.prepare('INSERT INTO fts(rowid,search) VALUES(?,?)').run(row.rowid!, search);
  }
  search(filter: SearchFilter) {
    let sql = 'SELECT id FROM entries WHERE archived=?';
    const args: (string | number)[] = [filter.archived ? 1 : 0];
    if (filter.type) { sql += ' AND kind=?'; args.push(filter.type); }
    if (filter.project) { sql += ' AND project=?'; args.push(filter.project); }
    for (const term of (filter.query || '').normalize('NFKC').toLowerCase().trim().split(/\s+/).filter(Boolean).slice(0, 12)) {
      sql += ' AND instr(search,?)>0'; args.push(term);
    }
    sql += ' ORDER BY updated DESC LIMIT ? OFFSET ?';
    args.push(Math.max(1, Math.min(1000, filter.limit || 200)), Math.max(0, filter.offset || 0));
    return this.db.prepare(sql).all(...args).map(row => String(row.id));
  }
  async flush() { this.db.exec('PRAGMA wal_checkpoint(PASSIVE)'); }
  close() { this.db?.close(); }
}
