import type { Entry } from './types.js';
import type { KnowledgeService } from './service.js';
import { recallOptions } from './recall-options.js';
import { recallTemplate } from './recall-template.js';
import { redacted } from './knowledge-prompts.js';

export interface RecallCandidate { id: string; score: number }
export interface RecallInput { sessionId: string; messageId: string; seq: number; query: string; cwd: string; recent: string[] }
export type RecallSearch = (input: RecallInput, signal: AbortSignal) => Promise<RecallCandidate[]>;
export interface RecallRecord {
  id: string; sessionId: string; messageId: string; seq: number; at: string; query: string;
  reason: string; entryIds: string[]; injected: boolean; latencyMs: number;
}
interface Cached {
  input: RecallInput; root: string; revision: number; controller: AbortController; ready: boolean;
  rows: RecallCandidate[]; started: number; record: RecallRecord; timer?: ReturnType<typeof setTimeout>;
}

export class RecallService {
  search: RecallSearch = async () => [];
  records: RecallRecord[] = [];
  private cache = new Map<string, Cached>();
  private active = new Map<string, string>();
  private queues = new Map<string, Record<string, any[]>>();
  private recent = new Map<string, string[]>();
  private provider: any;
  private unregister?: () => void;
  private available = false;
  private counter = 0;
  constructor(private owner: KnowledgeService) {}
  options() { return recallOptions(this.owner.settings?.recall); }
  get mode() {
    const requested = this.options().mode;
    return requested === 'inject' && !this.available ? 'hint' : requested;
  }
  get warning() { return this.options().mode === 'inject' && !this.available ? '宿主注入能力不可用，已降级为仅提示' : ''; }
  setProvider(provider: any) {
    this.provider = provider;
    this.configure();
    return () => { if (this.provider === provider) { this.provider = undefined; this.configure(); } };
  }
  configure() {
    try { this.unregister?.(); } catch { /* A disappearing host must not break settings. */ }
    this.unregister = undefined;
    this.available = typeof this.provider?.section === 'function';
    this.clear();
    if (!this.available || this.options().mode === 'off') return;
    try {
      this.unregister = this.provider.section({ name: 'wanxiang:recall', order: 10300, interpolate: false,
        text: (context: any) => {
          try { return this.section(context.agent?.session?.id || ''); }
          catch { return ''; }
        } });
    } catch { this.available = false; }
  }
  clear() {
    for (const value of this.cache.values()) value.controller.abort();
    this.cache.clear(); this.active.clear(); this.queues.clear(); this.recent.clear();
  }
  dispose() {
    this.clear();
    try { this.unregister?.(); } catch { /* Host teardown can remove the provider first. */ }
    this.unregister = undefined;
  }
  private key(sessionId: string, messageId: string) { return sessionId + '\0' + messageId; }
  event(session: any, event: any) {
    if (this.options().mode === 'off') return;
    const id = session.id;
    if (event.type === 'agent/inbox/spliced') {
      const splice = event.data;
      const queues = this.queues.get(id) || { 'next-turn': [], 'next-step': [] };
      this.queues.set(id, queues);
      const queue = queues[splice.target];
      if (!queue || !Array.isArray(splice.inserted)) return;
      const removed = queue.splice(splice.start, splice.removedCount || 0, ...splice.inserted);
      if (splice.outcome === 'canceled') {
        for (const message of removed) this.cache.get(this.key(id, message.id))?.controller.abort();
      } else if (removed.length) {
        const claimed = removed.filter(message => message.source?.kind === 'user').at(-1);
        if (claimed) this.active.set(id, claimed.id);
      }
      for (const message of splice.inserted) {
        if (message.source?.kind !== 'user') continue;
        const query = typeof message.content === 'string' ? message.content : (message.content || []).filter((block: any) => block.type === 'text').map((block: any) => block.text).join('\n');
        this.prepare({ sessionId: id, messageId: message.id, seq: event.seq, query, cwd: session.header?.cwd || '', recent: this.recent.get(id) || [] });
      }
    } else if (event.type === 'user/message' && event.data.source?.kind === 'user') {
      const cached = this.cache.get(this.key(id, event.data.id));
      if (cached) {
        cached.input.seq = event.seq;
        cached.record.seq = event.seq;
        this.active.set(id, event.data.id);
        this.recent.set(id, [...(this.recent.get(id) || []), cached.input.query.slice(0, 600)].slice(-2));
      }
    }
  }
  prepare(input: RecallInput) {
    const options = this.options();
    if (options.mode === 'off') return;
    const key = this.key(input.sessionId, input.messageId);
    this.cache.get(key)?.controller.abort();
    const record: RecallRecord = { id: 'recall-' + Date.now() + '-' + ++this.counter, sessionId: input.sessionId,
      messageId: input.messageId, seq: input.seq, at: new Date().toISOString(), query: redacted(input.query.slice(0, 2000)),
      reason: options.mode === 'inject' && !options.acknowledged ? 'privacy_pending' : 'pending', entryIds: [], injected: false, latencyMs: 0 };
    const cached: Cached = { input: { ...input, query: redacted(input.query.slice(0, 4000)) }, root: this.owner.store.root, revision: this.owner.store.revision,
      controller: new AbortController(), ready: false, rows: [], started: performance.now(), record };
    this.cache.set(key, cached);
    this.records.unshift(record);
    this.records.length = Math.min(500, this.records.length);
    if (this.cache.size > 100) {
      const oldest = this.cache.keys().next().value!;
      this.cache.get(oldest)?.controller.abort(); this.cache.delete(oldest);
    }
    if (record.reason === 'privacy_pending') return;
    cached.timer = setTimeout(() => {
      if (!cached.ready && !cached.controller.signal.aborted) {
        record.reason = 'timeout'; record.latencyMs = performance.now() - cached.started;
        cached.controller.abort();
      }
    }, 200);
    cached.controller.signal.addEventListener('abort', () => clearTimeout(cached.timer), { once: true });
    void Promise.resolve().then(() => this.search(cached.input, cached.controller.signal)).then(rows => {
      clearTimeout(cached.timer);
      if (cached.controller.signal.aborted || this.cache.get(key) !== cached || cached.root !== this.owner.store.root || cached.revision !== this.owner.store.revision) return;
      if (performance.now() - cached.started > 200) {
        record.reason = 'timeout'; record.latencyMs = performance.now() - cached.started; cached.controller.abort(); return;
      }
      cached.rows = rows;
      cached.ready = true;
      record.reason = rows.length ? 'ready' : 'no_match';
      record.latencyMs = performance.now() - cached.started;
      record.entryIds = this.allowed(cached).map(entry => entry.id);
    }).catch(error => {
      clearTimeout(cached.timer);
      if (!cached.controller.signal.aborted) {
        record.reason = error.name === 'RecallTimeout' ? error.reason || 'timeout' : error.name === 'RecallSkip' ? error.message : 'error';
        record.latencyMs = performance.now() - cached.started;
      }
    });
  }
  private allowed(cached: Cached): Entry[] {
    const options = this.options();
    return cached.rows.filter(row => row.score >= options.threshold).flatMap(row => {
      const entry = this.owner.store.entries.get(row.id);
      return entry && !entry.archived && !entry.invalidAt && !options.blockedEntries.includes(entry.id) && !options.blockedProjects.includes(entry.project) ? [entry] : [];
    }).slice(0, options.count);
  }
  section(sessionId: string) {
    // Synchronous host boundary: no I/O, waiting, model call, or search is allowed here.
    if (this.mode !== 'inject' || !this.options().acknowledged) return '';
    const cached = this.cache.get(this.key(sessionId, this.active.get(sessionId) || ''));
    if (!cached || cached.root !== this.owner.store.root || cached.revision !== this.owner.store.revision || cached.controller.signal.aborted) return '';
    if (!cached.ready) {
      if (['pending', 'not_ready'].includes(cached.record.reason)) cached.record.reason = 'not_ready';
      return '';
    }
    const result = recallTemplate(this.allowed(cached), this.options().characters);
    cached.record.entryIds = result.ids;
    cached.record.injected = !!result.text;
    cached.record.reason = result.text ? 'injected' : cached.rows.length ? 'below_threshold' : 'no_match';
    return result.text;
  }
}
