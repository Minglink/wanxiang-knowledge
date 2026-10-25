import { promises as fs } from 'node:fs';
import { randomUUID } from 'node:crypto';
import type { MarkdownRepo } from './markdown-repo.js';
import { atomic } from './store.js';

export async function transactionalFiles(repo: MarkdownRepo, changes: Record<string, string | null>, reason: string) {
  const before: Record<string, string | null> = {};
  for (const file of Object.keys(changes)) {
    try { before[file] = await fs.readFile(repo.local(file), 'utf8'); }
    catch (error: any) { if (error.code !== 'ENOENT') throw error; before[file] = null; }
  }
  const backup = '.wanxiang/backups/' + Date.now() + '-' + randomUUID() + '.json';
  await atomic(repo.local(backup), JSON.stringify({ reason, before, after: changes }, null, 2));
  const changed: string[] = [];
  try {
    for (const [file, content] of Object.entries(changes)) {
      if (content === null) await fs.rm(repo.local(file), { force: true });
      else await atomic(repo.local(file), content);
      changed.push(file);
    }
  } catch (error) {
    for (const file of changed.reverse()) {
      if (before[file] === null) await fs.rm(repo.local(file), { force: true });
      else await atomic(repo.local(file), before[file]!);
    }
    throw error;
  }
  return backup;
}
