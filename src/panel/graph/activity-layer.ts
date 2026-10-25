import type { GraphActivityEvent } from '../../graph-activity.js';
import type { GraphData } from '../../graph.js';

export const activityNames = { inject: '已注入模型', read: 'AI 已读取', write: '新知识落库' };
export const activityDuration = 12000;
export interface ActivityMark { at: number; kind: GraphActivityEvent['kind'] }
interface Point { x: number; y: number; radius: number; depth: number }

/** An overlay: original node fills, positions and graph topology never change. */
export class GoldActivityLayer {
  marks = new Map<string, ActivityMark>();
  enabled = true;
  accept(events: GraphActivityEvent[], data: GraphData, raw: GraphData, now = Date.now()) {
    const visible = new Set(data.nodes.map(node => node.id));
    const clusters = new Map(raw.nodes.map(node => [node.id, node.cluster]));
    for (const event of events) {
      if (now - event.at >= activityDuration || event.at > now + 2000) continue;
      for (const id of event.entryIds) {
        const target = visible.has(id) ? id : clusters.has(id) ? 'cluster:' + clusters.get(id) : '';
        if (!visible.has(target)) continue;
        const previous = this.marks.get(target);
        if (!previous || event.at >= previous.at) this.marks.set(target, { at: event.at, kind: event.kind });
      }
    }
    this.expire(now);
    while (this.marks.size > 32) this.marks.delete(this.marks.keys().next().value!);
  }
  expire(now: number) {
    for (const [id, mark] of this.marks) if (now - mark.at >= activityDuration) this.marks.delete(id);
  }
  paint(ctx: CanvasRenderingContext2D, data: GraphData, points: Map<string, Point>,
    active: (id: string) => boolean, motion: boolean, now = Date.now(),
    edgePoint?: (s: string, t: string, progress: number) => { x: number; y: number }) {
    this.expire(now);
    if (!this.enabled || !this.marks.size) return false;
    ctx.save();
    const shown = [...this.marks].filter(([id]) => points.has(id) && active(id)).slice(-16);
    let signals = 0;
    for (const [id, mark] of shown) {
      const age = Math.max(0, now - mark.at);
      const fade = Math.max(0, 1 - age / activityDuration);
      const origin = points.get(id)!;
      ctx.strokeStyle = '#c69a3a';
      ctx.lineWidth = 1.5;
      ctx.globalAlpha = fade * (origin.depth < -0.2 ? 0.25 : 0.85);
      ctx.beginPath();
      const pulse = motion && age < 3600 ? (age % 1800) / 1800 * 5 : 1;
      ctx.arc(origin.x, origin.y, origin.radius + 4 + pulse, 0, Math.PI * 2);
      ctx.stroke();
      if (!motion || age >= 3600) continue;
      // Bounded one-hop signals follow existing edges only; neighbors are not marked as read.
      for (const edge of data.edges) {
        if (signals >= 32) break;
        if (edge.s !== id && edge.t !== id) continue;
        const target = edge.s === id ? edge.t : edge.s;
        const end = points.get(target);
        if (!end || !active(target)) continue;
        const progress = (age % 1800) / 1800;
        const point = edgePoint ? edgePoint(id, target, progress)
          : { x: origin.x + (end.x - origin.x) * progress, y: origin.y + (end.y - origin.y) * progress };
        ctx.globalAlpha = fade * 0.85;
        ctx.fillStyle = '#d9b45d';
        ctx.shadowColor = '#e8cc89';
        ctx.shadowBlur = 5;
        ctx.beginPath(); ctx.arc(point.x, point.y, 2, 0, Math.PI * 2); ctx.fill();
        signals++;
      }
    }
    ctx.restore();
    return shown.length > 0;
  }
}
