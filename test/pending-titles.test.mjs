import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, rm, readFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { KnowledgeService } from '../lib/index.js';

test('待落库使用真实标题，旧ID记录只修复展示、重命名实时读取、缺失会话不冒充标题', async t => {
  const root = await mkdtemp(path.join(os.tmpdir(), 'wanxiang-titles-'));
  const id = 'session-0486700b-4a9a-4dcb-98b3-c522193b571f';
  let title = '真实会话标题';
  const host = { listSessions: async () => [{ id, title }], snapshot: async key => {
    if (key !== id) throw new Error('Missing session');
    return { id, title, messages: [], lastSeq: 0 };
  } };
  const service = await new KnowledgeService(root, host, path.join(root, 'knowledge')).init();
  t.after(async () => { await service.dispose(); await rm(root, { recursive: true, force: true }); });
  await service.markPending(id, id);
  assert.equal(service.pending[id].title, title);
  service.pending[id].title = id;
  await service.persistPending();
  const file = service.store.local('.wanxiang', 'pending.json');
  const before = await readFile(file, 'utf8');
  assert.equal((await service.state()).pending[id].title, title);
  title = '重新命名后的标题';
  assert.equal((await service.state()).pending[id].title, title);
  assert.equal(await readFile(file, 'utf8'), before);
  service.pending.missing = { title: 'missing', updatedAt: new Date().toISOString() };
  assert.equal((await service.state()).pending.missing.title, '会话标题暂不可用');
});
