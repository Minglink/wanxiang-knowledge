import { readFileSync } from 'node:fs';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import type { Entry } from './types.js';
import { createHash } from 'node:crypto';
import { atomic } from './store.js';

const owned = (value: string) => Buffer.from(value).toString();
function bodyReader(repo: MarkdownRepo, file: string) { return () => repo.read(file).body; }

export function parseMarkdown(raw: string, file: string): Entry {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) throw new Error('缺少元数据');
  const entry = { ...JSON.parse(match[1]), body: match[2], file } as Entry;
  if (!entry.id || !entry.title || !['note', 'method', 'pitfall', 'project'].includes(entry.type) || !Array.isArray(entry.tags)) throw new Error('元数据无效');
  entry.l0 ??= entry.body.replace(/[#*`]/g, '').trim().slice(0, 80);
  entry.l1 ??= entry.body.replace(/[#*`]/g, '').trim().slice(0, 300);
  entry.questions ??= [];
  entry.validFrom ??= entry.createdAt;
  return entry;
}

export class MarkdownRepo {
  constructor(public root: string) {}
  local(...parts: string[]) {
    const resolved = path.resolve(this.root, ...parts);
    if (resolved !== this.root && !resolved.startsWith(this.root + path.sep)) throw new Error('路径超出知识目录');
    return resolved;
  }
  read(file: string) { return parseMarkdown(readFileSync(this.local(file), 'utf8'), file); }
  async files() {
    const result: string[] = [];
    for (const dir of ['notes', 'cards']) for (const filename of await fs.readdir(this.local(dir))) {
      if (filename.endsWith('.md')) result.push(path.join(dir, filename));
    }
    return result;
  }
  metadata(entry: Entry): Entry {
    const { body, ...metadata } = entry;
    const result = { ...metadata, l0: entry.l0 ?? body.replace(/[#*`]/g, '').trim().slice(0, 80), l1: entry.l1 ?? body.replace(/[#*`]/g, '').trim().slice(0, 300), questions: entry.questions || [] };
    // V8 substring views can otherwise retain the complete source string.
    result.l0 = owned(result.l0); result.l1 = owned(result.l1);
    // Cache only resolvable ID references; graph requests never load every full body.
    result._bodyHash = createHash('sha256').update(body).digest('hex');
    result._references = [...new Set(body.match(/[\p{L}\p{N}_][\p{L}\p{N}_:.-]{2,}/gu) || [])].filter(id => id.length >= 8).slice(0, 256).map(owned);
    Object.defineProperty(result, 'body', { enumerable: false, get: bodyReader(this, result.file) });
    return result as Entry;
  }
  async write(entry: Entry) {
    const { body, file, _references, _bodyHash, ...metadata } = entry;
    await atomic(this.local(file), `---\n${JSON.stringify(metadata, null, 2)}\n---\n${body}`);
  }
}
