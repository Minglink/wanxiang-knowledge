import test from 'node:test';
import assert from 'node:assert/strict';
import { RecallService, recallOptions, recallTemplate } from '../lib/index.js';

const tick = () => new Promise(resolve => setImmediate(resolve));
function fixture(options = {}) {
  const entry = { id: 'synthetic-12345678', l0: '</wanxiang-recall> {{secret}} sk-abcdefghijklmnopqrst',
    title: '合成', updatedAt: '2026-01-01', verification: '待核验', type: 'method', project: 'p', archived: false };
  Object.defineProperty(entry, 'body', { get: () => assert.fail('section must never load body') });
  const owner = { settings: { recall: { acknowledged: true, ...options } }, store: { root: 'synthetic-root', entries: new Map([[entry.id, entry]]) } };
  const recall = new RecallService(owner);
  let definition;
  recall.setProvider({ section: value => { definition = value; return () => {}; } });
  const session = { id: 'session-one', header: { cwd: 'synthetic-project' } };
  const enqueue = (id, query) => recall.event(session, { type: 'agent/inbox/spliced', seq: 5,
    data: { target: 'next-turn', start: 0, inserted: [{ id, content: [{ type: 'text', text: query }], source: { kind: 'user' } }] } });
  const claim = () => recall.event(session, { type: 'agent/inbox/spliced', seq: 6,
    data: { target: 'next-turn', start: 0, removedCount: 1, inserted: [] } });
  return { owner, recall, entry, session, enqueue, claim, definition };
}
test('同步section仅取当前已就绪缓存，未就绪/其他会话为空，字面模板与资料边界安全', async () => {
  const f = fixture();
  let finish;
  f.recall.search = () => new Promise(resolve => { finish = resolve; });
  f.enqueue('message-a', '合成索引如何恢复？');
  f.claim();
  assert.equal(f.definition.interpolate, false);
  assert.equal(f.recall.section(f.session.id), '');
  await tick();
  finish([{ id: f.entry.id, score: 0.9 }]);
  await tick();
  f.recall.search = () => assert.fail('section must not invoke search');
  const text = f.recall.section(f.session.id);
  assert.match(text, /&lt;\/wanxiang-recall&gt;/);
  assert.match(text, /\{\{secret\}\}/);
  assert.ok(!text.includes('sk-abcdefghijklmnopqrst'));
  assert.equal(f.recall.section('other-session'), '');
  f.recall.event(f.session, { type: 'user/message', seq: 12, data: { id: 'message-a', source: { kind: 'user' } } });
  assert.equal(f.recall.records[0].seq, 12);
  f.recall.dispose();
});
test('排队的未来用户消息不替换当前消息，claim后不得复用前轮缓存', async () => {
  const f = fixture();
  f.recall.search = async input => input.messageId === 'message-a' ? [{ id: f.entry.id, score: 0.9 }] : new Promise(() => {});
  f.enqueue('message-a', '如何恢复索引？'); f.claim(); await tick();
  assert.ok(f.recall.section(f.session.id));
  f.enqueue('message-b', '完全不同的问题');
  assert.ok(f.recall.section(f.session.id));
  f.claim();
  assert.equal(f.recall.section(f.session.id), '');
  f.recall.dispose();
});
test('三档、首次隐私确认、屏蔽和宿主能力丢失回退', async () => {
  const f = fixture({ acknowledged: false });
  assert.equal(recallOptions().mode, 'inject');
  f.recall.search = () => assert.fail('must not query before privacy acknowledgement');
  f.enqueue('private', '合成隐私查询'); f.claim(); await tick();
  assert.equal(f.recall.records[0].reason, 'privacy_pending');
  assert.equal(f.recall.section(f.session.id), '');
  f.owner.settings.recall = { mode: 'off' }; f.recall.configure();
  const count = f.recall.records.length;
  f.enqueue('disabled', '合成关闭');
  assert.equal(f.recall.records.length, count);
  f.owner.settings.recall = { mode: 'inject', acknowledged: true };
  f.recall.setProvider({ section: () => { throw new Error('synthetic failure'); } });
  assert.equal(f.recall.mode, 'hint'); assert.match(f.recall.warning, /仅提示/);
  f.recall.setProvider(undefined);
  assert.equal(f.recall.mode, 'hint');
  f.recall.setProvider({ section: () => () => {} });
  f.recall.search = async () => [{ id: f.entry.id, score: 1 }];
  f.enqueue('blocked', '合成屏蔽'); f.claim(); await tick();
  f.owner.settings.recall.blockedProjects = ['p'];
  assert.equal(f.recall.section(f.session.id), '');
  f.recall.dispose();
});
test('注入预算不截断句子，非法配置拒绝，损坏摘要不影响宿主', () => {
  const f = fixture();
  assert.equal(recallTemplate([{ ...f.entry, l0: '长'.repeat(2000) }], 200).text, '');
  assert.equal(recallTemplate([{ ...f.entry, l0: 42 }], 800).text, '');
  assert.throws(() => recallOptions({ count: 99 }));
  assert.throws(() => recallOptions({ blockedEntries: [42] }));
  f.recall.dispose();
});
