import type { GraphActivityEvent } from '../../graph-activity.js';
import type { GraphData } from '../../graph.js';

export const activityNames = { inject: '已注入模型', read: 'AI 已读取', write: '新知识落库' };
export const activityDuration = 12000;
export const activityLemon = '#edda00';
export interface ActivityMark { at: number; kind: GraphActivityEvent['kind'] }

/** Temporary node/edge colors; positions and graph topology never change. */
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
  strength(id: string, now = Date.now()) {
    if (!this.enabled) return 0;
    const mark = this.marks.get(id);
    if (!mark) return 0;
    return Math.max(0, Math.min(1, (activityDuration - (now - mark.at)) / 4000));
  }
  edgeStrength(s: string, t: string, now = Date.now()) {
    return Math.min(this.strength(s, now), this.strength(t, now));
  }
  color(original: string, strength: number) {
    if (strength <= 0) return original;
    const channels = (color: string) => [1, 3, 5].map(offset => parseInt(color.slice(offset, offset + 2), 16));
    const from = channels(original), to = channels(activityLemon);
    return '#' + from.map((value, index) => Math.round(value + (to[index] - value) * strength).toString(16).padStart(2, '0')).join('');
  }
}
