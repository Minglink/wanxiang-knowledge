import { randomUUID } from 'node:crypto';

export type ActivityKind = 'inject' | 'read' | 'write';
export interface GraphActivityEvent {
  seq: number;
  at: number;
  kind: ActivityKind;
  entryIds: string[];
}
export interface GraphActivityPage {
  generation: string;
  cursor: number;
  events: GraphActivityEvent[];
}

/** Short-lived metadata only; never stores queries, knowledge text or credentials. */
export class GraphActivity {
  private root = '';
  private generation = randomUUID();
  private sequence = 0;
  private events: GraphActivityEvent[] = [];
  private seen = new Map<string, number>();

  private use(root: string) {
    if (this.root === root) return;
    this.root = root;
    this.generation = randomUUID();
    this.events = [];
    this.seen.clear();
  }

  emit(root: string, kind: ActivityKind, entryIds: string[], key = '', at = Date.now()) {
    this.use(root);
    for (const [id, time] of this.seen) if (at - time > 60000) this.seen.delete(id);
    if (key && this.seen.has(key)) return;
    const ids = [...new Set(entryIds)].filter(id => typeof id === 'string' && id.length <= 200).slice(0, 32);
    if (!ids.length) return;
    if (key) this.seen.set(key, at);
    while (this.seen.size > 256) this.seen.delete(this.seen.keys().next().value!);
    this.events.push({ seq: ++this.sequence, at, kind, entryIds: ids });
    this.events = this.events.filter(event => at - event.at < 20000).slice(-128);
  }

  page(root: string, after = 0, at = Date.now()): GraphActivityPage {
    this.use(root);
    return { generation: this.generation, cursor: this.sequence,
      events: this.events.filter(event => event.seq > after && at - event.at < 12000) };
  }
}
