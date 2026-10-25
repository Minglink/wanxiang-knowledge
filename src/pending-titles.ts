import type { Host } from './types.js';

type Pending = Record<string, { title: string; updatedAt: string }>;
export function readableSessionTitle(value: unknown, id: string) {
  if (typeof value !== 'string' || !value.trim()) return '';
  const title = value.trim();
  return title === id || /^session-[a-f0-9-]{20,}$/i.test(title) ? '' : title.slice(0, 300);
}

/** Refresh display metadata without rewriting old pending files or session content. */
export class PendingTitles {
  private cache = new Map<string, { title: string; at: number }>();
  forget(id: string) { this.cache.delete(id); }
  async one(host: Host, id: string, fallback = '') {
    const cached = this.cache.get(id);
    if (cached && Date.now() - cached.at < 15000) return cached.title;
    let title = '';
    try { title = readableSessionTitle((await host.snapshot(id)).title, id); } catch { /* Missing sessions remain visible for dismissal. */ }
    title ||= readableSessionTitle(fallback, id) || '会话标题暂不可用';
    this.cache.set(id, { title, at: Date.now() });
    return title;
  }
  async resolve(host: Host, pending: Pending): Promise<Pending> {
    const ids = Object.keys(pending);
    if (!ids.length) return {};
    const rows = await host.listSessions().catch(() => []);
    const titles = new Map(rows.map(row => [row.id, readableSessionTitle(row.title, row.id)]));
    const result: Pending = {};
    let index = 0;
    await Promise.all(Array.from({ length: Math.min(4, ids.length) }, async () => {
      while (index < ids.length) {
        const id = ids[index++];
        const title = titles.get(id) || await this.one(host, id, pending[id].title);
        result[id] = { ...pending[id], title };
      }
    }));
    for (const id of this.cache.keys()) if (!(id in pending)) this.cache.delete(id);
    return Object.fromEntries(ids.map(id => [id, result[id]]));
  }
}
