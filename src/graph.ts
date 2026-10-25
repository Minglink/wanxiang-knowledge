import type { Entry, Tool, Kind } from './types.js';

export interface GraphNode {
  id: string;
  kind: Kind | 'tool';
  title: string;
  project: string;
  tags: string[];
  updatedAt: string;
  degree: number;
  status: string;
  cluster: string;
  recallCount?: number;
}
export interface GraphEdge { s: string; t: string; kind: string; w: number }
export interface GraphData {
  nodes: GraphNode[];
  edges: GraphEdge[];
  clusters: { id: string; label: string; count: number }[];
  truncated: boolean;
  total: number;
}
export interface GraphOptions {
  scope?: string;
  project?: string;
  type?: string;
  archived?: boolean;
  limit?: number;
  cluster?: string;
  focus?: string;
}

export function buildGraph(entries: Iterable<Entry>, tools: Tool[], options: GraphOptions = {}): GraphData {
  const scope = options.scope || 'all';
  if (!['all', 'library', 'tools'].includes(scope)) throw new Error('无效图谱范围');
  const limit = Math.max(1, Math.min(5000, Math.floor(Number(options.limit) || 1500)));
  const selected = [...entries].filter(entry => entry.archived === !!options.archived
    && (!options.project || entry.project === options.project)
    && (!options.type || entry.type === options.type));
  const linked = new Set(tools.flatMap(tool => tool.linkedIds));
  const knowledge = scope === 'tools' ? selected.filter(entry => linked.has(entry.id)) : selected;
  const nodeMap = new Map<string, GraphNode>();
  for (const entry of knowledge) {
    const extra = entry as Entry & { invalidAt?: string; recallCount?: number };
    nodeMap.set(entry.id, {
      id: entry.id, kind: entry.type, title: entry.title, project: entry.project,
      tags: entry.tags, updatedAt: entry.updatedAt, degree: 0,
      status: extra.invalidAt ? '已失效' : entry.verification,
      cluster: entry.project ? 'project:' + entry.project : entry.tags[0] ? 'tag:' + entry.tags[0] : 'ungrouped',
      recallCount: extra.recallCount || 0,
    });
  }
  // Tools are namespaced to avoid collisions with stable knowledge IDs.
  if (scope !== 'library' && !options.type) for (const tool of tools) {
    if (options.project && !tool.linkedIds.some(id => nodeMap.has(id))) continue;
    nodeMap.set('tool:' + tool.id, {
      id: 'tool:' + tool.id, kind: 'tool', title: tool.name, project: '', tags: [tool.category],
      updatedAt: tool.checkedAt || '', degree: 0, status: tool.status, cluster: 'tools:' + tool.category,
    });
  }
  const edges = new Map<string, GraphEdge>();
  function edge(s: string, t: string, kind: string, w = 1) {
    if (s === t || !nodeMap.has(s) || !nodeMap.has(t)) return;
    const pair = [s, t].sort();
    const key = JSON.stringify([kind, ...pair]);
    if (edges.has(key)) {
      if (kind === 'shared_tag') edges.get(key)!.w += w;
      return;
    }
    edges.set(key, { s, t, kind, w });
    nodeMap.get(s)!.degree++;
    nodeMap.get(t)!.degree++;
  }
  function grouped(key: (entry: Entry) => string[], kind: string, weight = 1) {
    const groups = new Map<string, string[]>();
    for (const entry of knowledge) for (const value of new Set(key(entry).filter(Boolean))) {
      const members = groups.get(value) || [];
      members.push(entry.id);
      groups.set(value, members);
    }
    for (const members of groups.values()) {
      members.sort();
      // Sparse neighborhood for large groups; every displayed edge remains a true relation.
      // same_project is deliberately a weak chain, never a project-wide clique.
      const span = kind === 'same_project' ? 1 : members.length <= 32 ? 32 : 4;
      for (let i = 0; i < members.length; i++) {
        for (let j = i + 1; j < Math.min(members.length, i + span + 1); j++) edge(members[i], members[j], kind, weight);
      }
    }
  }
  grouped(entry => [entry.sourceSession], 'same_session');
  grouped(entry => entry.tags, 'shared_tag', 0.7);
  grouped(entry => [entry.project], 'same_project', 0.2);
  for (const entry of knowledge) {
    const references = new Set(entry._references || entry.body.match(/[\p{L}\p{N}_][\p{L}\p{N}_:.-]{2,}/gu) || []);
    for (const id of references) if (nodeMap.has(id)) edge(entry.id, id, 'link');
  }
  if (scope !== 'library') for (const tool of tools) for (const id of tool.linkedIds) edge('tool:' + tool.id, id, 'tool_link', 1.5);
  let candidates = [...nodeMap.values()];
  if (options.cluster) candidates = candidates.filter(node => node.cluster === options.cluster);
  const counts = new Map<string, number>();
  for (const node of candidates) counts.set(node.cluster, (counts.get(node.cluster) || 0) + 1);
  const rank = (node: GraphNode) => (Date.parse(node.updatedAt) || 0) / 86400000 + Math.log2(1 + node.degree) + Math.log2(1 + (node.recallCount || 0));
  const nearby = new Set<string>();
  if (options.focus) for (const item of edges.values()) {
    if (item.s === options.focus) nearby.add(item.t);
    if (item.t === options.focus) nearby.add(item.s);
  }
  const priority = (node: GraphNode) => node.id === options.focus ? 2 : nearby.has(node.id) ? 1 : 0;
  candidates.sort((a, b) => priority(b) - priority(a) || rank(b) - rank(a) || a.id.localeCompare(b.id));
  const nodes = candidates.slice(0, limit);
  const visible = new Set(nodes.map(node => node.id));
  return {
    nodes, edges: [...edges.values()].filter(item => visible.has(item.s) && visible.has(item.t)),
    clusters: [...counts].map(([id, count]) => ({ id, label: id === 'ungrouped' ? '未分组' : id.slice(id.indexOf(':') + 1), count })),
    truncated: candidates.length > limit, total: candidates.length,
  };
}

export function relatedGraph(entries: Iterable<Entry>, tools: Tool[], id: string) {
  const rows = [...entries];
  const entry = rows.find(item => item.id === id);
  const tool = tools.find(item => 'tool:' + item.id === id);
  if (!entry && !tool) throw new Error('节点不存在');
  if (tool) {
    const ids = new Set(tool.linkedIds);
    const knowledge: GraphNode[] = rows.filter(item => ids.has(item.id)).map(item => ({
      id: item.id, title: item.title, kind: item.type, project: item.project, tags: item.tags,
      updatedAt: item.updatedAt, degree: 1, status: item.archived ? '已归档' : item.verification,
      cluster: item.project ? 'project:' + item.project : 'ungrouped',
    }));
    return { knowledge, tools: [], edges: knowledge.map(item => ({ s: id, t: item.id, kind: 'tool_link', w: 1.5 })) };
  }
  const graph = buildGraph(rows, tools, { archived: entry?.archived, focus: id, limit: 5000 });
  const edges = graph.edges.filter(edge => edge.s === id || edge.t === id);
  const ids = new Set(edges.map(edge => edge.s === id ? edge.t : edge.s));
  const nodes = graph.nodes.filter(node => ids.has(node.id));
  return { knowledge: nodes.filter(node => node.kind !== 'tool'), tools: nodes.filter(node => node.kind === 'tool'), edges };
}
