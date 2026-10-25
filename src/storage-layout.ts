import path from 'node:path';
import type { Entry } from './types.js';
export function slug(value: string) { return value.replace(/[<>:"/\\|?*\x00-\x1f]/g, '_').slice(0, 55).replace(/[. ]+$/, '') || '未分组'; }
export function shardedPath(entry: Pick<Entry, 'id' | 'title' | 'type' | 'createdAt' | 'project'>) {
  const filename = slug(entry.title) + '-' + entry.id.slice(0, 8) + '.md';
  const date = /^\d{4}-\d{2}/.test(entry.createdAt) ? entry.createdAt : new Date().toISOString();
  return entry.type === 'note' ? path.join('notes', date.slice(0, 4), date.slice(5, 7), filename) : path.join('cards', slug(entry.project), filename);
}
