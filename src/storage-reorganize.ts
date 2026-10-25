import { promises as fs } from 'node:fs';
import path from 'node:path';
import type { Store } from './store.js';
import { hash, json, atomic } from './store.js';
import { shardedPath } from './storage-layout.js';
import { transactionalFiles } from './storage-transaction.js';

export async function reorganizePlan(store: Store) {
  const changes: Record<string, string> = {};
  const mirrors = await json<Record<string, { primary: string; mirror: string; hash: string }>>(store.local('.wanxiang/mirrors.json'), {});
  const moved = [];
  for (const metadata of store.entries.values()) {
    if (metadata.file.split(/[\\/]/).length > 2) continue;
    const entry = store.read(metadata.id);
    if (metadata._bodyHash && metadata._bodyHash !== hash(entry.body) || entry.updatedAt !== metadata.updatedAt) throw new Error('条目已在外部修改，请先重建索引');
    const target = path.join(path.dirname(shardedPath(entry)), path.basename(entry.file));
    try { await fs.access(store.local(target)); throw new Error('目标文件已存在，整理已停止'); }
    catch (error: any) { if (error.code !== 'ENOENT') throw error; }
    const { body, file, _references, _bodyHash, ...fields } = entry;
    const raw = `---\n${JSON.stringify({ ...fields, schemaVersion: 2 }, null, 2)}\n---\n${body}`;
    changes[target] = raw; changes[file] = raw;
    mirrors[entry.id] = { primary: target, mirror: file, hash: hash(raw) };
    moved.push({ id: entry.id, from: file, to: target });
  }
  if (moved.length) changes['.wanxiang/mirrors.json'] = JSON.stringify(mirrors, null, 2);
  return { changes, moved };
}
export async function reorganize(store: Store, preview = true) {
  const plan = await reorganizePlan(store);
  if (preview || !plan.moved.length) return { preview, moved: plan.moved };
  const backup = await transactionalFiles(store.repo, plan.changes, '整理目录：分片主文件和平铺兼容副本');
  await atomic(store.local('.wanxiang/storage-last.json'), JSON.stringify({ backup, at: new Date().toISOString() }));
  await store.rebuild();
  return { preview: false, moved: plan.moved, backup };
}
export async function rollbackReorganize(store: Store) {
  const last = await json<{ backup: string } | null>(store.local('.wanxiang/storage-last.json'), null);
  if (!last?.backup?.startsWith('.wanxiang/backups/')) throw new Error('没有可撤销的目录整理');
  const journal = await json<any>(store.local(last.backup), null);
  if (!journal?.before || !journal?.after || !String(journal.reason).startsWith('整理目录')) throw new Error('目录备份无效');
  for (const [file, expected] of Object.entries(journal.after)) {
    let actual = null;
    try { actual = await fs.readFile(store.local(file), 'utf8'); }
    catch (error: any) { if (error.code !== 'ENOENT') throw error; }
    if (actual !== expected) throw new Error('整理后文件已修改，停止撤销以保留修改');
  }
  const backup = await transactionalFiles(store.repo, journal.before, '撤销目录整理');
  await fs.rm(store.local('.wanxiang/storage-last.json'), { force: true });
  await store.rebuild();
  return { ok: true, backup };
}
