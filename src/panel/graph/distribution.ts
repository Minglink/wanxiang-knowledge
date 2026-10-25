import type { GraphNode } from '../../graph.js';

export function communities(nodes: GraphNode[]) {
  const groups = new Map<string, GraphNode[]>();
  for (const node of nodes) {
    const members = groups.get(node.cluster) || [];
    members.push(node);
    groups.set(node.cluster, members);
  }
  return [...groups.values()]
    .sort((a, b) => b.length - a.length || a[0].cluster.localeCompare(b[0].cluster))
    .map(members => [...members].sort((a, b) => b.degree - a.degree || a.id.localeCompare(b.id)));
}

function variation(id: string) {
  let hash = 2166136261;
  for (const character of id) hash = Math.imul(hash ^ character.charCodeAt(0), 16777619);
  return (hash >>> 0) / 4294967296;
}

/** Stable, slightly irregular clouds: dense cores, loose edges, no random reshuffle. */
export function cloudOffset(index: number, count: number, id: string) {
  const angle = index * Math.PI * (3 - Math.sqrt(5)) + (variation(id) - 0.5) * 0.65;
  const contour = 1 + 0.12 * Math.sin(angle * 3 + 0.7) + 0.07 * Math.cos(angle * 5);
  const radius = Math.pow((index + 0.5) / count, 0.66) * contour;
  return { x: Math.cos(angle) * radius, y: Math.sin(angle) * radius };
}
