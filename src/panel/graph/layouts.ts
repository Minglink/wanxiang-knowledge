import type { GraphNode, GraphEdge } from '../../graph.js';
import { communities, cloudOffset } from './distribution.js';

export interface Particle { id: string; x: number; y: number; z: number; vx: number; vy: number; cluster: string }
export type Layout = 'sphere' | 'network';
const golden = Math.PI * (3 - Math.sqrt(5));
function fibonacci(index: number, count: number) {
  const y = 1 - 2 * (index + 0.5) / count;
  const radius = Math.sqrt(1 - y * y);
  return { x: radius * Math.cos(index * golden), y, z: radius * Math.sin(index * golden) };
}

export function sphereLayout(nodes: GraphNode[]): Particle[] {
  const groups = communities(nodes);
  const seeds = groups.map((_, index) => fibonacci(index, groups.length));
  const forward = seeds.reduce((sum, seed, index) => ({
    x: sum.x + seed.x * groups[index].length,
    y: sum.y + seed.y * groups[index].length,
    z: sum.z + seed.z * groups[index].length,
  }), { x: 0, y: 0, z: 0 });
  const normalize = (point: typeof forward) => {
    const length = Math.hypot(point.x, point.y, point.z) || 1;
    return { x: point.x / length, y: point.y / length, z: point.z / length };
  };
  const front = normalize(forward);
  const right = Math.hypot(front.x, front.z) > 0.001
    ? normalize({ x: front.z, y: 0, z: -front.x }) : { x: 1, y: 0, z: 0 };
  const up = { x: front.y * right.z, y: front.z * right.x - front.x * right.z, z: -front.y * right.x };
  const dot = (a: typeof front, b: typeof front) => a.x * b.x + a.y * b.y + a.z * b.z;
  const assigned = new Map<string, Particle>();
  const order = new Map(nodes.map((node, index) => [node.id, index]));
  groups.forEach((members, index) => {
    const center = seeds[index];
    const tangent = normalize({ x: -center.z, y: 0, z: center.x });
    const bitangent = {
      x: center.y * tangent.z,
      y: center.z * tangent.x - center.x * tangent.z,
      z: -center.y * tangent.x,
    };
    // Population controls the cloud's footprint, without filling every empty gap.
    const spread = Math.min(0.95, 0.22 + 0.76 * Math.sqrt(members.length / nodes.length));
    members.forEach((node, local) => {
      const offset = cloudOffset(local, members.length, node.id);
      const radius = Math.hypot(offset.x, offset.y);
      const angle = spread * radius;
      const factor = radius > 0 ? Math.sin(angle) / radius : 0;
      const point = groups.length === 1 ? fibonacci(local, members.length) : {
        x: center.x * Math.cos(angle) + (tangent.x * offset.x + bitangent.x * offset.y) * factor,
        y: center.y * Math.cos(angle) + (tangent.y * offset.x + bitangent.y * offset.y) * factor,
        z: center.z * Math.cos(angle) + (tangent.z * offset.x + bitangent.z * offset.y) * factor,
      };
      const ordinal = order.get(node.id)!;
      const position = node.kind === 'tool'
        ? normalize({ x: Math.cos(ordinal * golden), y: 0.1 * Math.sin(ordinal), z: Math.sin(ordinal * golden) })
        : groups.length === 1 ? point : { x: dot(point, right), y: dot(point, up), z: dot(point, front) };
      assigned.set(node.id, { id: node.id, ...position, vx: 0, vy: 0, cluster: node.cluster });
    });
  });
  return nodes.map(node => assigned.get(node.id)!);
}

export class NetworkLayout {
  particles: Particle[];
  alpha = 1;
  private byId: Map<string, Particle>;
  private links: [Particle, Particle, number][];
  private anchors = new Map<string, { x: number; y: number }>();

  constructor(nodes: GraphNode[], edges: GraphEdge[]) {
    const groups = communities(nodes);
    const extent = Math.max(180, Math.sqrt(nodes.length) * 18);
    const assigned = new Map<string, Particle>();
    groups.forEach((members, index) => {
      const angle = index * golden + Math.PI;
      const anchor = groups.length === 1 ? { x: 0, y: 0 } : {
        x: Math.cos(angle) * extent * 0.58,
        y: Math.sin(angle) * extent * 0.38,
      };
      this.anchors.set(members[0].cluster, anchor);
      const radius = Math.max(35, Math.sqrt(members.length) * 11);
      members.forEach((node, local) => {
        const offset = cloudOffset(local, members.length, node.id);
        assigned.set(node.id, {
          id: node.id, cluster: node.cluster,
          x: anchor.x + offset.x * radius,
          y: anchor.y + offset.y * radius * 0.88,
          z: 0, vx: 0, vy: 0,
        });
      });
    });
    this.particles = nodes.map(node => assigned.get(node.id)!);
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
    const cellSize = Math.max(70, Math.sqrt(this.particles.length) * 3);
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
      p.vx += ((anchor.x - p.x) * 0.016 - p.x * 0.0003) * this.alpha;
      p.vy += ((anchor.y - p.y) * 0.016 - p.y * 0.0003) * this.alpha;
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
