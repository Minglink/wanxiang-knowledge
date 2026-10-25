import type { KnowledgeService } from './service.js';
import type { RecallInput } from './recall-service.js';
import { RecallTimeout, RecallProcessPool } from './recall-process-pool.js';
import { rewriteModel } from './query-rewrite.js';
import { skipRecall } from './recall-query.js';

export class RecallSearch {
  private pool?: RecallProcessPool;
  private root = '';
  private failures = new Map<string, number>();
  private degraded = new Set<string>();
  private reusable = new Map<string, { key: string; until: number; rows: { id: string; score: number }[] }>();
  lastPolicy = { limited: false, limit: 100, mode: 'rules', reused: false };
  constructor(private owner: KnowledgeService) {}
  async run(input: RecallInput, signal: AbortSignal) {
    const skipped = skipRecall(input.query);
    if (skipped) throw Object.assign(new Error(skipped), { name: 'RecallSkip' });
    const start = performance.now();
    const deadline = 190; // Leave host bookkeeping headroom below the 200ms total budget.
    const controller = new AbortController();
    const combined = AbortSignal.any([signal, controller.signal]);
    const timer = setTimeout(() => controller.abort(), deadline);
    try {
      const store = this.owner.store;
      if (!this.pool || this.root !== store.root) {
        this.pool?.dispose();
        this.pool = new RecallProcessPool(store.local('.wanxiang', store.engine.fullText ? 'index.db' : 'index.sqlite'), store.engine.name);
        this.root = store.root;
      }
      const degraded = this.degraded.delete(input.sessionId);
      const limited = degraded || store.entries.size > 500000 || !store.engine.fullText;
      const limit = degraded ? 10 : limited ? 20 : 100;
      this.lastPolicy = { limited, limit, mode: degraded ? 'keyword' : 'rules', reused: false };
      const recent = input.recent.slice(-2).filter(value => value.trim() !== input.query.trim());
      const cacheKey = JSON.stringify([store.root, store.revision, input.query.trim(), input.cwd, recent, limited, limit]);
      const previous = this.reusable.get(input.sessionId);
      if (previous?.key === cacheKey && previous.until > Date.now()) {
        this.lastPolicy.reused = true;
        return previous.rows;
      }
      let query = input.query;
      if (this.owner.recall.options().smartRewrite && !degraded) {
        query = await rewriteModel(input.query, this.owner.host, query, Math.min(60, deadline - (performance.now() - start)));
      }
      combined.throwIfAborted();
      const rows = await this.pool.query({ query: query + '\n' + input.cwd + '\n' + recent.join('\n'), currentQuery: input.query, limited, limit }, combined, Math.min(150, deadline - (performance.now() - start)));
      if (performance.now() - start >= deadline || combined.aborted) throw new RecallTimeout();
      this.failures.delete(input.sessionId);
      const result = rows.map(row => ({ id: row.id, score: row.score }));
      this.reusable.set(input.sessionId, { key: cacheKey, until: Date.now() + 5000, rows: result });
      if (this.reusable.size > 100) this.reusable.delete(this.reusable.keys().next().value!);
      return result;
    } catch (error: any) {
      if (!signal.aborted && (error.name === 'RecallTimeout' || controller.signal.aborted)) {
        const failures = (this.failures.get(input.sessionId) || 0) + 1;
        this.failures.set(input.sessionId, failures);
        if (failures >= 2) this.degraded.add(input.sessionId);
        throw Object.assign(new RecallTimeout(controller.signal.aborted ? 'timeout' : error.reason || 'timeout'), { policy: { ...this.lastPolicy, mode: failures >= 2 ? 'keyword' : this.lastPolicy.mode } });
      }
      throw error;
    } finally { clearTimeout(timer); }
  }
  async dispose() {
    const stopped = this.pool?.dispose();
    this.pool = undefined;
    this.failures.clear(); this.degraded.clear(); this.reusable.clear();
    await stopped;
  }
}
