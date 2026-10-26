import { readFileSync } from 'node:fs';
import type { Store } from './store.js';
import type { Host } from './types.js';
import { rewriteRules, rewriteModel, validateAliases, type Aliases } from './query-rewrite.js';

export interface SearchOptions { updatedAfter?: string; updatedBefore?: string; mode?: string; type?: string; project?: string; archived?: boolean; validOnly?: boolean; offset?: number; limit?: number; smartRewrite?: boolean }
export class SearchService {
  constructor(private store: Store, private host?: Host) {}
  aliases(): Aliases {
    try { return validateAliases(JSON.parse(readFileSync(this.store.local('.wanxiang/aliases.json'), 'utf8'))); }
    catch (error: any) { if (error.code === 'ENOENT') return {}; throw error; }
  }
  async search(query: string, options: SearchOptions = {}) {
    const mode = options.mode || 'hybrid';
    if (!['exact', 'hybrid', 'deep'].includes(mode)) throw new Error('无效检索模式');
    const offset = Math.max(0, Math.floor(Number(options.offset) || 0));
    const limit = Math.max(1, Math.min(100, Math.floor(Number(options.limit) || 20)));
    let rewritten = rewriteRules(query, this.aliases());
    if (options.smartRewrite && this.host) rewritten = await rewriteModel(query, this.host, rewritten);
    for (const value of [options.updatedAfter, options.updatedBefore]) {
      if (value && !/^\d{4}-\d{2}-\d{2}(?:T.*)?$/.test(value)) throw new Error('无效时间过滤');
      if (value && !Number.isFinite(Date.parse(value))) throw new Error('无效时间过滤');
    }
    const filter = { validOnly: options.validOnly !== false, updatedAfter: options.updatedAfter && new Date(options.updatedAfter).toISOString(), updatedBefore: options.updatedBefore && new Date(options.updatedBefore.length === 10 ? options.updatedBefore + 'T23:59:59.999Z' : options.updatedBefore).toISOString(), query, type: options.type, archived: options.archived, project: options.project, limit: 1000 };
    const exact = this.store.engine.search(filter);
    const full = mode !== 'exact' && this.store.engine.fullSearch ? this.store.engine.fullSearch({ ...filter, query: rewritten, hot: mode !== 'deep', validOnly: options.validOnly }) : [];
    const candidates = new Map<string, number>();
    exact.forEach((id, rank) => candidates.set(id, 2 / (60 + rank)));
    full.forEach((row, rank) => candidates.set(row.id, (candidates.get(row.id) || 0) + 1 / (60 + rank) + Math.min(row.score, 10) * 0.0001));
    const normalizedTitle = (value: string) => value.normalize('NFKC').toLowerCase().replace(/\s+/g, '').trim();
    const titleQuery = normalizedTitle(query);
    const rows = [...candidates].flatMap(([id, score]) => {
      const entry = this.store.entries.get(id);
      if (!entry || options.validOnly !== false && entry.invalidAt) return [];
      const age = Math.max(0, Date.now() - Date.parse(entry.updatedAt)) / 86400000;
      const title = normalizedTitle(entry.title);
      const titleBoost = titleQuery && title === titleQuery ? 1 : titleQuery.length >= 3 && title.includes(titleQuery) ? 0.06 : 0;
      const ranked = score + titleBoost + (options.project === entry.project ? 0.0001 : 0) + 0.00001 / (1 + age) - (entry.verification === '待核验' ? 0.000001 : 0);
      return [{ ...entry, l0: entry.l0 || '', l1: entry.l1 || '', score: ranked, matchedBy: ['keyword'], tier: mode === 'deep' ? 'L2' : 'L0', valid: !entry.invalidAt,
        source: { session: entry.sourceSession, seqs: entry.sourceSeqs }, body: mode === 'deep' ? entry.body.slice(0, 1200) : '', excerpt: entry.l0 || entry.l1 || '' }];
    }).sort((a, b) => b.score - a.score || b.updatedAt.localeCompare(a.updatedAt));
    // Keep independent sources visible without discarding the remaining chunks or changing totals.
    const groups = new Map<string, number>(), deferred: typeof rows = [];
    const diverse = rows.filter(row => {
      const origin = row.sourceTitle?.match(/^(\d+)_/)?.[1] || row.links?.find(l => l.kind === '原文总览')?.to || row.id;
      const key = row.project + ':' + origin;
      const count = (groups.get(key) || 0) + 1; groups.set(key, count);
      if (count <= 3) return true;
      deferred.push(row); return false;
    }).concat(deferred);
    return { items: diverse.slice(offset, offset + limit), total: rows.length, offset, limit, mode, rewritten,
      candidateLimit: 1000, truncated: exact.length >= 1000 || full.length >= 1000, engine: this.store.engine.name, vector: 'Off' };
  }
}
