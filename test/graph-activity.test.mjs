import test from 'node:test';
import assert from 'node:assert/strict';
import { build } from 'esbuild';
import { mkdtemp, rm } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { KnowledgeService, knowledgeTools } from '../lib/index.js';

const bundle = await build({ stdin: { contents: "export * from './src/graph-activity.ts'; export * from './src/panel/graph/activity-layer.ts';", resolveDir: process.cwd() }, bundle: true, write: false, platform: 'node', format: 'esm' });
const { GraphActivity, GoldActivityLayer } = await import('data:text/javascript;base64,' + Buffer.from(bundle.outputFiles[0].text).toString('base64'));

test('活动只保存短期ID元数据，去重、限量、过期、切库隔离', () => {
  const activity = new GraphActivity();
  activity.emit('a', 'read', [], 'empty', 1000);
  assert.equal(activity.page('a', 0, 1000).events.length, 0);
  activity.emit('a', 'inject', ['one', 'one'], 'recall', 1000);
  activity.emit('a', 'inject', ['one'], 'recall', 1001);
  const first = activity.page('a', 0, 1002);
  assert.equal(first.events.length, 1);
  assert.deepEqual(first.events[0].entryIds, ['one']);
  assert.deepEqual(activity.page('a', first.cursor, 1002).events, []);
  assert.deepEqual(activity.page('a', 0, 13000).events, []);
  const next = activity.page('b', 0, 1002);
  assert.notEqual(first.generation, next.generation);
  assert.deepEqual(next.events, []);
  for (let i = 0; i < 150; i++) activity.emit('b', 'read', ['id-' + i], '', 2000);
  assert.equal(activity.page('b', 0, 2000).events.length, 128);
});

test('活动映射只命中可见节点或真实聚合簇，不虚构邻居读取，超时清除', () => {
  const layer = new GoldActivityLayer();
  const raw = { nodes: [{ id: 'one', cluster: 'p' }], edges: [], clusters: [] };
  const data = { nodes: [{ id: 'cluster:p' }], edges: [] };
  layer.accept([{ kind: 'read', at: 1000, entryIds: ['one', 'missing'] }], data, raw, 1001);
  assert.deepEqual([...layer.marks.keys()], ['cluster:p']);
  layer.expire(13000);
  assert.equal(layer.marks.size, 0);
});

test('成功读取/搜索/落库产生事件，失败读取与仅候选召回不点亮，实际注入只点一次', async t => {
  const root = await mkdtemp(path.join(os.tmpdir(), 'wanxiang-gold-'));
  const snapshot = { id: 'synthetic', title: '合成活动', lastSeq: 1, messages: [{ role: 'user', seq: 1, text: '合成活动知识用于隔离测试' }] };
  const service = await new KnowledgeService(path.join(root, 'home'), { listSessions: async () => [], snapshot: async () => snapshot }, path.join(root, 'knowledge')).init();
  t.after(async () => { await service.dispose(); await rm(root, { recursive: true, force: true }); });
  const job = await service.generate(snapshot.id, 'export');
  await service.tail;
  assert.equal(job.status, 'success');
  const emitted = () => service.graphActivity.page(service.store.root).events;
  assert.equal(emitted().at(-1).kind, 'write');
  const tools = knowledgeTools(service);
  await tools.find(tool => tool.name === 'knowledge_read').execute({ id: job.entryIds[0] });
  assert.equal(emitted().at(-1).kind, 'read');
  const count = emitted().length;
  await assert.rejects(tools.find(tool => tool.name === 'knowledge_read').execute({ id: 'missing' }));
  assert.equal(emitted().length, count);
  service.recall.setProvider({ section: () => () => {} });
  service.settings.recall = { ...service.recall.options(), mode: 'inject', acknowledged: true, threshold: 0 };
  service.recall.search = async () => [{ id: job.entryIds[0], score: 1 }];
  service.recall.prepare({ sessionId: 'synthetic', messageId: 'm', seq: 1, query: '合成活动', cwd: '', recent: [] });
  await new Promise(resolve => setTimeout(resolve, 5));
  assert.equal(emitted().length, count);
  service.recall.active.set('synthetic', 'm');
  assert.ok(service.recall.section('synthetic'));
  assert.equal(emitted().at(-1).kind, 'inject');
  service.recall.section('synthetic');
  assert.equal(emitted().length, count + 1);
});
