import { readFileSync } from 'node:fs';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import type { Entry } from './types.js';
import { createHash } from 'node:crypto';
import { atomic } from './store.js';
import { transactionalFiles } from './storage-transaction.js';

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
  private mirrors: Record<string, { primary: string; mirror: string; hash: string }> = {};
  constructor(public root: string) {}
  local(...parts: string[]) {
    const resolved = path.resolve(this.root, ...parts);
    if (resolved !== this.root && !resolved.startsWith(this.root + path.sep)) throw new Error('路径超出知识目录');
    return resolved;
  }
  private mirrorFile = '.wanxiang/mirrors.json';
  private digest(raw: string) { return createHash('sha256').update(raw).digest('hex'); }
  async loadMirrors() {
    try { this.mirrors = JSON.parse(await fs.readFile(this.local(this.mirrorFile), 'utf8')); }
    catch (error: any) { if (error.code !== 'ENOENT') throw error; this.mirrors = {}; }
    if (!this.mirrors || Array.isArray(this.mirrors) || typeof this.mirrors !== 'object') throw new Error('兼容副本清单无效');
    for (const item of Object.values(this.mirrors)) {
      if (!item || typeof item.primary !== 'string' || typeof item.mirror !== 'string' || typeof item.hash !== 'string') throw new Error('兼容副本清单无效');
      this.local(item.primary); this.local(item.mirror);
    }
  }
  private current(file: string) {
    const record = Object.values(this.mirrors).find(item => item.primary === file || item.mirror === file);
    if (!record) return { raw: readFileSync(this.local(file), 'utf8'), file };
    const primary = readFileSync(this.local(record.primary), 'utf8');
    const mirror = readFileSync(this.local(record.mirror), 'utf8');
    if(parseMarkdown(primary,record.primary).id!==parseMarkdown(mirror,record.mirror).id)throw new Error('兼容副本ID冲突，需人工处理');
    if (primary === mirror) return { raw: primary, file: record.primary };
    const primaryChanged = this.digest(primary) !== record.hash, mirrorChanged = this.digest(mirror) !== record.hash;
    if (primaryChanged && mirrorChanged) throw new Error('分片与平铺兼容副本均被修改，需人工处理；未覆盖任何一份');
    return { raw: primaryChanged ? primary : mirror, file: record.primary };
  }
  read(file: string) { const current = this.current(file); return parseMarkdown(current.raw, current.file); }
  async files() {
    await this.loadMirrors();
    const result: string[] = [];
    const walk = async (dir: string) => {
      for (const item of await fs.readdir(this.local(dir), { withFileTypes: true })) {
        const file = path.join(dir, item.name);
        if (item.isSymbolicLink()) throw new Error('知识目录含符号链接，需人工检查');
        if (item.isDirectory()) await walk(file);
        else if (file.endsWith('.md')) result.push(file);
      }
    };
    for (const dir of ['notes', 'cards']) await walk(dir);
    const mirrors = new Set(Object.values(this.mirrors).map(item => item.mirror));
    return result.filter(file => !mirrors.has(file)).sort();
  }
  async synchronize(file: string) {
    const record = Object.values(this.mirrors).find(item => item.primary === file);
    if (!record) return;
    const current = this.current(file);
    const digest = this.digest(current.raw);
    if (digest === record.hash) return;
    const next = { ...this.mirrors, [parseMarkdown(current.raw, file).id]: { ...record, hash: digest } };
    await transactionalFiles(this, { [record.primary]: current.raw, [record.mirror]: current.raw, [this.mirrorFile]: JSON.stringify(next) }, '同步单侧编辑，原编辑副本保留在备份');
    this.mirrors = next;
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
    const raw = `---\n${JSON.stringify(metadata, null, 2)}\n---\n${body}`;
    if (file.split(/[\\/]/).length <= 2) { await atomic(this.local(file), raw); return; }
    const mirror = path.join(file.split(/[\\/]/)[0], path.basename(file));
    try {
      const existing = parseMarkdown(await fs.readFile(this.local(mirror), 'utf8'), mirror);
      if (existing.id !== entry.id) throw new Error('平铺兼容文件名冲突');
    } catch (error: any) { if (error.code !== 'ENOENT') throw error; }
    const record = this.mirrors[entry.id];
    if (record) this.current(record.primary); // Refuse diverged manual edits.
    const next = { ...this.mirrors, [entry.id]: { primary: file, mirror, hash: this.digest(raw) } };
    const changes:Record<string,string>={ [file]: raw, [mirror]: raw, [this.mirrorFile]: JSON.stringify(next) };
    try{await fs.access(this.local('wanxiang.json'));}catch(error:any){if(error.code!=='ENOENT')throw error;changes['wanxiang.json']=JSON.stringify({schemaVersion:2,createdAt:new Date().toISOString(),app:'dsh-wanxiang-knowledge'});}
    await transactionalFiles(this, changes, '写入分片与平铺兼容副本');
    this.mirrors = next;
  }
}
