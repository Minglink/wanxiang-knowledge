import { promises as fs } from 'node:fs';
import path from 'node:path';
import { atomic } from './store.js';
import { redacted } from './knowledge-prompts.js';
import type { RecallRecord } from './recall-service.js';

export interface StoredRecall extends RecallRecord {
  feedback?: Record<string, 'useful' | 'useless'>;
  citedIds?: string[];
}
const safeId = /^recall-\d{13}-[A-Za-z0-9-]+$/;
export class RecallLog {
  private pending = new Map<string, { root: string; record: StoredRecall }>();
  private scheduled?: ReturnType<typeof setTimeout>;
  private writing: Promise<void> = Promise.resolve();
  constructor(private warn: (message: string) => void = () => {}, private index?: (root: string, record: StoredRecall) => void) {}
  private filename(root: string, id: string) {
    if (!safeId.test(id)) throw new Error('无效召回记录ID');
    return path.join(root, '.wanxiang/recall-log', id + '.json');
  }
  schedule(root: string, record: StoredRecall) {
    // Called from the synchronous section boundary: queue only, never do I/O here.
    const clean = JSON.parse(redacted(JSON.stringify(record))) as StoredRecall;
    this.pending.set(root + '\0' + record.id, { root, record: clean });
    if (!this.scheduled) this.scheduled = setTimeout(() => { this.scheduled = undefined; void this.flush(); }, 0);
  }
  async flush() {
    if (this.scheduled) clearTimeout(this.scheduled);
    this.scheduled = undefined;
    const batch = [...this.pending.values()];
    this.pending.clear();
    this.writing = this.writing.then(async () => {
      for (const { root, record } of batch) {
        try {
          const filename = this.filename(root, record.id);
          // A later in-memory state must not erase explicit user feedback.
          let previous: StoredRecall | undefined;
          try { previous = JSON.parse(await fs.readFile(filename, 'utf8')); }
          catch (error: any) { if (error.code !== 'ENOENT') throw error; }
          await atomic(filename, JSON.stringify({ ...record, feedback: previous?.feedback || record.feedback }, null, 2));
          this.index?.(root, { ...record, feedback: previous?.feedback || record.feedback });
        } catch (error: any) { this.warn('召回日志写入失败：' + redacted(String(error.message))); }
      }
    });
    await this.writing;
  }
  async page(root: string, offset = 0, limit = 20, sessionId = '') {
    await this.flush();
    const directory = path.join(root, '.wanxiang/recall-log');
    let files: string[];
    try { files = (await fs.readdir(directory)).filter(file => file.endsWith('.json') && safeId.test(file.slice(0, -5))).sort().reverse(); }
    catch (error: any) { if (error.code !== 'ENOENT') throw error; files = []; }
    const items: StoredRecall[] = [];
    let total = 0;
    offset = Math.max(0, Math.floor(offset) || 0);
    limit = Math.max(1, Math.min(100, Math.floor(limit) || 20));
    for (const file of files) {
      try {
        const row: StoredRecall = JSON.parse(await fs.readFile(path.join(directory, file), 'utf8'));
        if (row.id !== file.slice(0, -5) || sessionId && row.sessionId !== sessionId) continue;
        if (total >= offset && items.length < limit) items.push(row);
        total++;
      } catch (error: any) { this.warn('召回日志需要检查：' + path.basename(file)); }
    }
    return { items, total, offset, limit };
  }
  async feedback(root: string, id: string, entryId: string, value: string) {
    if (!['useful', 'useless', 'none'].includes(value)) throw new Error('无效召回反馈');
    await this.flush();
    const operation = this.writing.then(async () => {
      const filename = this.filename(root, id);
      const record: StoredRecall = JSON.parse(await fs.readFile(filename, 'utf8'));
      if (!record.entryIds.includes(entryId)) throw new Error('条目不属于本次召回');
      record.feedback ||= {};
      if (value === 'none') delete record.feedback[entryId];
      else record.feedback[entryId] = value as 'useful' | 'useless';
      await atomic(filename, JSON.stringify(record, null, 2));
      this.index?.(root, record);
      return record;
    });
    this.writing = operation.then(() => {}, () => {});
    return operation;
  }
  async read(root: string, id: string): Promise<StoredRecall> {
    await this.flush();
    return JSON.parse(await fs.readFile(this.filename(root, id), 'utf8'));
  }
}
export async function restoreRecallIndex(root: string, engine: import('./index-engine.js').IndexEngine) {
  const warnings: string[] = [];
  if (!engine.recordRecall) return warnings;
  const directory = path.join(root, '.wanxiang/recall-log');
  let files: string[];
  try { files = await fs.readdir(directory); }
  catch (error: any) { if (error.code === 'ENOENT') return warnings; throw error; }
  for (const file of files.filter(value => value.endsWith('.json') && safeId.test(value.slice(0, -5)))) {
    try { engine.recordRecall(JSON.parse(await fs.readFile(path.join(directory, file), 'utf8'))); }
    catch { warnings.push('召回记录需要检查：' + file); }
  }
  return warnings;
}
