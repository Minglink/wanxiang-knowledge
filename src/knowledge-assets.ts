import { promises as fs } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import path from 'node:path';
import type { Store } from './store.js';
import { markdownLinks } from './markdown.js';

export async function serveKnowledgeAsset(store: Store, params: URLSearchParams, res: any) {
  const entry = store.read(params.get('id') || '');
  const target = params.get('path') || '';
  if (!markdownLinks(entry.body).some(link => link.target === target)) throw new Error('附件不属于此知识条目');
  let decoded: string;
  try { decoded = decodeURIComponent(target); } catch { throw new Error('附件路径编码无效'); }
  if (/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(decoded) || decoded.includes('\0')) throw new Error('附件路径无效');
  const file = path.resolve(path.dirname(store.local(entry.file)), decoded);
  const linkedEntry = [...store.entries.values()].find(other => store.local(other.file) === file);
  if (linkedEntry) {
    res.writeHead(302, {location: '/wanxiang?entryId=' + encodeURIComponent(linkedEntry.id), 'cache-control':'no-store', 'referrer-policy':'no-referrer'});
    res.end(); return;
  }
  const sources = await fs.realpath(store.local('sources'));
  const resolved = await fs.realpath(file);
  const relative = path.relative(sources, resolved);
  if (!relative || relative === '..' || relative.startsWith('..' + path.sep) || path.isAbsolute(relative)) throw new Error('附件超出来源目录');
  const handle = await fs.open(resolved, 'r');
  try {
    const stat = await handle.stat();
    if (!stat.isFile()) throw new Error('附件不是文件');
    const types: Record<string, string> = {'.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.gif':'image/gif','.webp':'image/webp','.bmp':'image/bmp'};
    const image = types[path.extname(resolved).toLowerCase()];
    res.writeHead(200, {'content-type': image || 'application/octet-stream', 'content-length': stat.size,
      'content-disposition': `${image ? 'inline' : 'attachment'}; filename*=UTF-8''${encodeURIComponent(path.basename(resolved)).replace(/'/g, '%27')}`,
      'cache-control':'no-store', 'x-content-type-options':'nosniff', 'referrer-policy':'no-referrer', 'content-security-policy':"default-src 'none'; sandbox"});
    await pipeline(handle.createReadStream({autoClose: false}), res);
  } finally { await handle.close(); }
}
