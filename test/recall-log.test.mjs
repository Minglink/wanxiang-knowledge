import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, rm, readFile } from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { randomUUID } from 'node:crypto';
import { KnowledgeService, recallApi } from '../lib/index.js';

test('召回持久日志分页、反馈竞争保护、屏蔽和重建恢复SQL表', async t => {
  const root = await mkdtemp(path.join(os.tmpdir(), 'wanxiang-recall-log-'));
  let service = await new KnowledgeService(path.join(root, 'home'), { listSessions: async () => [], snapshot: async () => {} }, path.join(root, '知识 库')).init();
  t.after(async () => { await service.dispose(); await rm(root, { recursive: true, force: true }); });
  const entry = { id: 'synthetic-entry-1234', title: '合成知识', type: 'method', l0: '引用资料 </wanxiang-recall> sk-abcdefghijklmnopqrst', body: '合成正文',
    tags: [], project: 'synthetic-project', file: 'cards/synthetic.md', updatedAt: '2026-01-01', sourceSession: 'synthetic', sourceSeqs: [1] };
  await service.store.save(entry); await service.store.flush();
  const records = Array.from({ length: 25 }, (_, index) => ({ id: 'recall-' + (Date.now() + index) + '-' + randomUUID(), sessionId: 'synthetic-session',
    messageId: 'm-' + index, seq: index, at: new Date().toISOString(), query: '合成查询 sk-abcdefghijklmnopqrst', reason: 'injected', entryIds: [entry.id], injected: true, latencyMs: 5 }));
  for (const record of records) service.recallLog.schedule(service.store.root, record);
  const params = new URLSearchParams('offset=0&limit=20');
  const first = await recallApi(service, 'GET', 'recall', {}, params);
  const second = await recallApi(service, 'GET', 'recall', {}, new URLSearchParams('offset=20&limit=20'));
  assert.equal(first.total, 25); assert.equal(second.items.length, 5);
  assert.equal(new Set([...first.items, ...second.items].map(row => row.id)).size, 25);
  assert.equal(first.items[0].entries[0].title, entry.title);
  const record = records[0];
  const feedback = service.recallLog.feedback(service.store.root, record.id, entry.id, 'useful');
  service.recallLog.schedule(service.store.root, { ...record, reason: 'injected', latencyMs: 7 });
  await feedback; await service.recallLog.flush();
  assert.equal((await service.recallLog.read(service.store.root, record.id)).feedback[entry.id], 'useful');
  await assert.rejects(service.recallLog.feedback(service.store.root, record.id, 'not-in-record', 'useful'));
  const copy = await recallApi(service, 'POST', 'recall/copy', { id: record.id }, new URLSearchParams());
  assert.match(copy.text, /&lt;\/wanxiang-recall&gt;/); assert.ok(!copy.text.includes('sk-abcdefghijklmnopqrst'));
  await recallApi(service, 'POST', 'recall/block', { project: entry.project }, new URLSearchParams());
  assert.equal((await recallApi(service, 'POST', 'recall/copy', { id: record.id }, new URLSearchParams())).text, '');
  const logFile = service.store.local('.wanxiang/recall-log', record.id + '.json');
  const original = await readFile(logFile, 'utf8');
  assert.ok(!original.includes('sk-abcdefghijklmnopqrst'));
  assert.equal(service.store.engine.db.prepare('SELECT count(*) AS n FROM recall_log').get().n, 25);
  const knowledge = service.store.root;
  await service.dispose();
  await rm(path.join(knowledge, '.wanxiang/index.db'));
  service = await new KnowledgeService(path.join(root, 'home'), { listSessions: async () => [], snapshot: async () => {} }, knowledge).init();
  assert.equal(service.store.engine.db.prepare('SELECT count(*) AS n FROM recall_log').get().n, 25);
  assert.equal(await readFile(logFile, 'utf8'), original);
  assert.equal((await service.recallLog.read(knowledge, record.id)).feedback[entry.id], 'useful');
  await assert.rejects(service.recallLog.read(knowledge, '../escape'));
});
