import { randomUUID } from 'node:crypto';
import { buildGraph, type GraphData, type GraphOptions, type GraphEdge } from './graph.js';
import type { Store } from './store.js';

/** Bounded responses over a stable, complete metadata snapshot. No library-size cutoff. */
export class GraphPages {
  private current?: { key: string; token: string; data: GraphData; edges: GraphEdge[][] };
  private snapshots = new Map<string, NonNullable<GraphPages['current']>>();
  page(store: Store, options: GraphOptions, offset = 0, token = '', query = ''): GraphData {
    if (!Number.isSafeInteger(offset) || offset < 0) throw new Error('图谱偏移无效');
    const key = JSON.stringify([store.root, store.revision, options, query, store.tools]);
    this.current = this.snapshots.get(key);
    if (token && (this.current?.key !== key || this.current.token !== token)) throw new Error('图谱数据已更新，请重新加载');
    if (!this.current || this.current.key !== key) {
      const normalized = query.toLocaleLowerCase().trim();
      const entries = normalized ? [...store.entries.values()].filter(e => (e.title + ' ' + e.tags.join(' ')).toLocaleLowerCase().includes(normalized)) : store.entries.values();
      const data = buildGraph(entries, store.tools, { ...options, limit: Number.MAX_SAFE_INTEGER });
      // Interleave types and projects so a large recent import cannot bury rare green/orange nodes.
      const groups = new Map<string, typeof data.nodes>();
      const focus = data.nodes.filter(n => n.id === options.focus);
      for (const n of data.nodes) { if (n.id === options.focus) continue; const k = n.kind + ':' + n.cluster; const g = groups.get(k) || []; g.push(n); groups.set(k, g); }
      const ordered = [...focus], lists = [...groups.values()];
      for (let i = 0, remaining = data.nodes.length - focus.length; remaining > 0; i++) for (const list of lists) if (i < list.length) { ordered.push(list[i]); remaining--; }
      data.nodes = ordered;
      const ordinal = new Map(ordered.map((n, i) => [n.id, i]));
      const edges: GraphEdge[][] = Array.from({length: ordered.length}, () => []);
      for (const edge of data.edges) edges[Math.max(ordinal.get(edge.s)!, ordinal.get(edge.t)!)].push(edge);
      this.current = { key, token: randomUUID(), data, edges };
      this.snapshots.set(key,this.current);
      while(this.snapshots.size>4)this.snapshots.delete(this.snapshots.keys().next().value!);
    }
    const { data, edges } = this.current, size = 1000, end = Math.min(data.nodes.length, offset + size);
    return {nodes: data.nodes.slice(offset, end), edges: edges.slice(offset, end).flat(), clusters: data.clusters,
      total: data.total, truncated: false, snapshot: this.current.token, nextOffset: end < data.total ? end : null};
  }
}
