import type { GraphNode, GraphEdge } from '../../graph.js';

export interface Particle { id: string; x: number; y: number; z: number; vx: number; vy: number; cluster: string }
export type Layout = 'sphere' | 'network';
const golden = Math.PI * (3 - Math.sqrt(5));
function fibonacci(index: number, count: number) {
  const y = 1 - 2 * (index + 0.5) / count;
  const radius = Math.sqrt(1 - y * y);
  return { x: radius * Math.cos(index * golden), y, z: radius * Math.sin(index * golden) };
}

export function sphereLayout(nodes: GraphNode[]): Particle[] {
  const clusters = [...new Set(nodes.map(node => node.cluster))];
  const counts = new Map<string, number>();
  const totals = new Map<string, number>();
  for (const node of nodes) totals.set(node.cluster, (totals.get(node.cluster) || 0) + 1);
  return nodes.map((node, index) => {
    const local = counts.get(node.cluster) || 0;
    counts.set(node.cluster, local + 1);
    const center = fibonacci(clusters.indexOf(node.cluster), clusters.length);
    const spread = fibonacci(local, totals.get(node.cluster)!);
    const factor = clusters.length === 1 ? 1 : 0.32;
    let x = clusters.length === 1 ? spread.x : center.x + spread.x * factor;
    let y = clusters.length === 1 ? spread.y : center.y + spread.y * factor;
    let z = clusters.length === 1 ? spread.z : center.z + spread.z * factor;
    if (node.kind === 'tool') {
      x = Math.cos(index * golden); y = 0.1 * Math.sin(index); z = Math.sin(index * golden);
    }
    const length = Math.hypot(x, y, z) || 1;
    return { id: node.id, x: x / length, y: y / length, z: z / length, vx: 0, vy: 0, cluster: node.cluster };
  });
}

export class NetworkLayout {
  particles: Particle[];
  alpha = 1;
  private byId: Map<string, Particle>;
  private links: [Particle, Particle, number][];
  private anchors = new Map<string, { x: number; y: number }>();

  constructor(nodes: GraphNode[], edges: GraphEdge[]) {
    const clusters = [...new Set(nodes.map(node => node.cluster))];
    const extent = Math.max(180, Math.sqrt(nodes.length) * 16);
    clusters.forEach((cluster, i) => this.anchors.set(cluster, {
      x: Math.cos(i * golden) * extent * 0.5, y: Math.sin(i * golden) * extent * 0.5,
    }));
    this.particles = nodes.map((node, i) => ({
      id: node.id, cluster: node.cluster, x: Math.cos(i * golden) * Math.sqrt(i + 1) * 15,
      y: Math.sin(i * golden) * Math.sqrt(i + 1) * 15, z: 0, vx: 0, vy: 0,
    }));
    this.byId = new Map(this.particles.map(p => [p.id, p]));
    this.links = edges.flatMap(edge => {
      const a = this.byId.get(edge.s), b = this.byId.get(edge.t);
      return a && b ? [[a, b, edge.w] as [Particle, Particle, number]] : [];
    });
  }

  tick(fixed?: string) {
    if (this.alpha < 0.005) return;
    // Aggregate repulsion on a spatial grid: O(nodes × occupied cells), bounded local extent.
    const cells = new Map<string, { x: number; y: number; count: number }>();
    const cellSize = Math.max(70, Math.sqrt(this.particles.length) * 12);
    for (const p of this.particles) {
      const key = `${Math.floor(p.x / cellSize)},${Math.floor(p.y / cellSize)}`;
      const cell = cells.get(key) || { x: 0, y: 0, count: 0 };
      cell.x += p.x; cell.y += p.y; cell.count++;
      cells.set(key, cell);
    }
    for (const p of this.particles) {
      for (const cell of cells.values()) {
        const dx = p.x - cell.x / cell.count, dy = p.y - cell.y / cell.count;
        const distance = dx * dx + dy * dy + 100;
        const force = Math.min(2, cell.count * 30 / distance) * this.alpha;
        p.vx += dx * force; p.vy += dy * force;
      }
      const anchor = this.anchors.get(p.cluster)!;
      p.vx += ((anchor.x - p.x) * 0.004 - p.x * 0.001) * this.alpha;
      p.vy += ((anchor.y - p.y) * 0.004 - p.y * 0.001) * this.alpha;
    }
    for (const [a, b, weight] of this.links) {
      const dx = b.x - a.x, dy = b.y - a.y;
      const distance = Math.hypot(dx, dy) || 1;
      const force = (distance - 65) / distance * 0.012 * Math.min(weight, 2) * this.alpha;
      a.vx += dx * force; a.vy += dy * force;
      b.vx -= dx * force; b.vy -= dy * force;
    }
    for (const p of this.particles) {
      if (p.id === fixed) { p.vx = 0; p.vy = 0; continue; }
      p.x += Math.max(-15, Math.min(15, p.vx *= 0.55));
      p.y += Math.max(-15, Math.min(15, p.vy *= 0.55));
    }
    this.alpha *= 0.94;
  }
}

export function arc(a: Particle, b: Particle, t: number) {
  const dot = Math.max(-1, Math.min(1, a.x * b.x + a.y * b.y + a.z * b.z));
  const angle = Math.acos(dot);
  if (angle < 0.001 || Math.sin(angle) < 0.001) return { x: a.x * (1 - t) + b.x * t, y: a.y * (1 - t) + b.y * t, z: a.z * (1 - t) + b.z * t };
  const u = Math.sin((1 - t) * angle) / Math.sin(angle), v = Math.sin(t * angle) / Math.sin(angle);
  return { x: a.x * u + b.x * v, y: a.y * u + b.y * v, z: a.z * u + b.z * v };
}
