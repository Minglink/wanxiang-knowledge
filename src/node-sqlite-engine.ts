import type { DatabaseSync } from 'node:sqlite';
import type { Entry } from './types.js';
import type { IndexEngine, SearchFilter } from './index-engine.js';
import { indexText, matchQuery } from './tokenize.js';

export class NodeSqliteEngine implements IndexEngine {
  readonly name = 'node:sqlite';
  readonly fullText = true;
  db!: DatabaseSync;
  constructor(private filename: string) {}
  async init() {
    const { DatabaseSync } = await import('node:sqlite');
    this.db = new DatabaseSync(this.filename);
    try {
      this.db.exec('CREATE VIRTUAL TABLE IF NOT EXISTS capability_probe USING fts5(x); DROP TABLE capability_probe; PRAGMA journal_mode=WAL; PRAGMA synchronous=NORMAL; PRAGMA cache_size=-8192;');
    } catch (error) { this.db.close(); throw error; }
  }
  reset() {
    this.db.exec(`DROP TABLE IF EXISTS fts; DROP TABLE IF EXISTS entries;
      CREATE TABLE entries(id TEXT PRIMARY KEY,title TEXT,kind TEXT,project TEXT,tags TEXT,search TEXT,archived INTEGER,updated TEXT,invalid_at TEXT);
      CREATE INDEX project_filter ON entries(project,archived,invalid_at);
      CREATE VIRTUAL TABLE fts USING fts5(title,l0,l1,questions,body,tags,content='',contentless_delete=1,tokenize='unicode61');`);
  }
  index(entry: Entry) {
    const search = `${entry.id}\n${entry.title}\n${entry.tags.join(' ')}\n${entry.body}`.normalize('NFKC').toLowerCase();
    const previous = this.db.prepare('SELECT rowid FROM entries WHERE id=?').get(entry.id);
    if (previous) this.db.prepare('DELETE FROM fts WHERE rowid=?').run(previous.rowid!);
    this.db.prepare('INSERT OR REPLACE INTO entries VALUES(?,?,?,?,?,?,?,?,?)').run(entry.id, entry.title, entry.type, entry.project, entry.tags.join(' '), search, entry.archived ? 1 : 0, entry.updatedAt, entry.invalidAt || null);
    const row = this.db.prepare('SELECT rowid FROM entries WHERE id=?').get(entry.id)!;
    this.db.prepare('INSERT INTO fts(rowid,title,l0,l1,questions,body,tags) VALUES(?,?,?,?,?,?,?)').run(row.rowid!, indexText(entry.title), indexText(entry.l0 || ''), indexText(entry.l1 || ''), indexText((entry.questions || []).join('\n')), indexText(entry.body), indexText(entry.tags.join(' ')));
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
  begin() { this.db.exec('BEGIN'); }
  end() { this.db.exec('COMMIT'); }
  fullSearch(filter: SearchFilter & { hot?: boolean; validOnly?: boolean }) {
    let query = matchQuery(filter.query || '');
    if (!query) return this.search(filter).map(id => ({ id, score: 0 }));
    if (filter.hot) query = '{title l0 l1 questions tags}:(' + query + ')';
    let where = 'fts MATCH ? AND e.archived=?';
    const args: (string | number)[] = [query, filter.archived ? 1 : 0];
    if (filter.validOnly !== false) where += ' AND e.invalid_at IS NULL';
    if (filter.project) { where += ' AND e.project=?'; args.push(filter.project); }
    if (filter.type) { where += ' AND e.kind=?'; args.push(filter.type); }
    args.push(filter.limit || 100, filter.offset || 0);
    return this.db.prepare(`SELECT e.id,bm25(fts,10,6,4,8,1,3) AS rank FROM fts JOIN entries e ON e.rowid=fts.rowid WHERE ${where} ORDER BY rank LIMIT ? OFFSET ?`).all(...args).map(row => ({ id: String(row.id), score: -Number(row.rank) }));
  }
  close() { this.db?.close(); }
}
