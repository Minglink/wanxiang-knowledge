import type { Entry, Tool } from './types.js';
export interface Relation { s: string; t: string; kind: string; w: number }
export function* relations(entries: Map<string, Entry>, tools: Tool[]): Generator<Relation> {
  const groups = new Map<string, string>();
  for (const entry of entries.values()) {
    const memberships = [['same_session', entry.sourceSession], ['same_project', entry.project], ...entry.tags.map(tag => ['shared_tag', tag])];
    for (const [kind, value] of memberships) {
      if (!value) continue;
      const key = JSON.stringify([kind, value]), previous = groups.get(key);
      if (previous) yield { s: previous, t: entry.id, kind, w: kind === 'same_project' ? 0.2 : 1 };
      groups.set(key, entry.id);
    }
    for (const target of entry._references || []) if (entries.has(target) && target !== entry.id) yield { s: entry.id, t: target, kind: 'link', w: 1 };
    for (const link of entry.links || []) if (entries.has(link.to)) yield { s: entry.id, t: link.to, kind: 'link', w: 1 };
    for (const target of entry.supersedes || []) if (entries.has(target)) yield { s: entry.id, t: target, kind: 'supersedes', w: 1 };
  }
  for (const tool of tools) for (const target of tool.linkedIds) if (entries.has(target)) yield { s: 'tool:' + tool.id, t: target, kind: 'tool_link', w: 1.5 };
}
