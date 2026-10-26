import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { KnowledgeService } from '../lib/index.js';

test('长会话可以拆分为超过 100 段并完成落库', async t => {
  const base = await mkdtemp(path.join(tmpdir(), 'wanxiang-long-session-'));
  const messages = Array.from({ length: 101 }, (_, index) => ({
    seq: index + 1,
    role: 'user',
    text: 'x'.repeat(15_500),
  }));
  const snapshot = {
    id: 'long-session',
    title: '超长会话',
    lastSeq: messages.at(-1).seq,
    messages,
  };
  let modelCalls = 0;
  const service = await new KnowledgeService(path.join(base, 'home'), {
    listSessions: async () => [{ id: snapshot.id, title: snapshot.title }],
    snapshot: async () => structuredClone(snapshot),
    generate: async () => {
      modelCalls++;
      return JSON.stringify({ title: '长会话整理', summary: '分段摘要', cards: [] });
    },
  }, path.join(base, '知识库')).init();
  t.after(async () => {
    await service.dispose();
    await rm(base, { recursive: true, force: true });
  });

  const job = await service.generate(snapshot.id, 'ai');
  await service.tail;

  assert.equal(job.status, 'success');
  assert.equal(job.progress.total, 101);
  assert.equal(job.progress.done, 101);
  assert.equal(job.messageCount, 101);
  assert.equal(modelCalls, 101);
});
