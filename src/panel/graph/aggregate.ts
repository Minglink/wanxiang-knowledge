import type { GraphData, GraphEdge, GraphNode } from '../../graph.js';

export function aggregateGraph(data: GraphData): GraphData {
  if (!data.truncated && data.nodes.length <= 1500) return data;
  const byNode = new Map(data.nodes.map(node => [node.id, node.cluster]));
  const nodes: GraphNode[] = data.clusters.map(cluster => ({
    id: 'cluster:' + cluster.id, kind: 'project', title: `${cluster.label} (${cluster.count})`,
    project: '', tags: [], updatedAt: '', degree: 0, status: '簇聚合', cluster: cluster.id,
  }));
  const edges = new Map<string, GraphEdge>();
  for (const edge of data.edges) {
    const s = byNode.get(edge.s), t = byNode.get(edge.t);
    if (!s || !t || s === t) continue;
    const key = JSON.stringify([s, t].sort());
    const previous = edges.get(key);
    if (previous) previous.w += edge.w;
    else edges.set(key, { s: 'cluster:' + s, t: 'cluster:' + t, kind: 'cluster', w: edge.w });
  }
  for (const node of nodes) node.degree = [...edges.values()].filter(e => e.s === node.id || e.t === node.id).length;
  return { ...data, nodes, edges: [...edges.values()] };
}
