import test from 'node:test';
import assert from 'node:assert/strict';
import { build } from 'esbuild';
import { mkdtemp, rm, readFile } from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { KnowledgeService } from '../lib/index.js';
const bundle = await build({ stdin: { contents: "export * from './src/model-selection.ts'; export * from './src/panel/recall-settings.ts';", resolveDir: process.cwd() }, bundle: true, write: false, platform: 'node', format: 'esm' });
const { hostModelCatalog, recallForm } = await import('data:text/javascript;base64,' + Buffer.from(bundle.outputFiles[0].text).toString('base64'));

test('模型目录只投影公开元数据，坏provider隔离，无凭据进入面板', async () => {
  const catalog = await hostModelCatalog({ listProviders: () => [{ id: 'p' }, { id: 'broken' }], listModels: async provider => {
    if (provider === 'broken') throw new Error('secret error');
    return [{ provider, id: 'm', name: '模型', apiKey: 'private-credential' }];
  } }, { currentSelection: () => ({ provider: 'p', model: 'm' }) });
  assert.deepEqual(catalog.models, [{ provider: 'p', model: 'm', name: '模型' }]);
  assert.ok(catalog.warning);
  assert.ok(!JSON.stringify(catalog).includes('private-credential'));
});

test('整理模型默认跟随、明确覆盖、持久化/恢复；不可用不回退且原文导出不调用模型', async t => {
  const root = await mkdtemp(path.join(os.tmpdir(), 'wanxiang-model-'));
  let available = true;
  const used = [];
  const snapshot = { id: 'synthetic', title: '合成模型选择', lastSeq: 1, model: { provider: 'host', model: 'default' }, messages: [{ seq: 1, role: 'user', text: '合成资料 sk-abcdefghijklmnopqrst' }] };
  const host = { listSessions: async () => [], snapshot: async () => snapshot,
    listModels: async () => ({ models: available ? [{ provider: 'p', model: 'chosen', name: '选定模型' }] : [] }),
    generate: async input => { used.push(input); return JSON.stringify({ title: '合成知识', summary: '合成摘要', cards: [] }); } };
  const service = await new KnowledgeService(root, host, path.join(root, 'knowledge')).init();
  t.after(async () => { await service.dispose(); await rm(root, { recursive: true, force: true }); });
  await service.generate(snapshot.id); await service.tail;
  assert.deepEqual(used[0].model, snapshot.model);
  await service.updateSettings({ organizeModel: { provider: 'p', model: 'chosen' } });
  const chosen = await service.generate(snapshot.id); await service.tail;
  assert.equal(chosen.status, 'success');
  assert.deepEqual(used[1].model, { provider: 'p', model: 'chosen' });
  assert.ok(!JSON.stringify(used[1]).includes('sk-abcdefghijklmnopqrst'));
  assert.equal(snapshot.model.model, 'default');
  assert.deepEqual(JSON.parse(await readFile(service.configFile, 'utf8')).organizeModel, { provider: 'p', model: 'chosen' });
  available = false;
  const failed = await service.generate(snapshot.id); await service.tail;
  assert.equal(failed.status, 'failed'); assert.match(failed.error, /不可用/);
  assert.equal(used.length, 2);
  const exported = await service.generate(snapshot.id, 'export'); await service.tail;
  assert.equal(exported.status, 'success'); assert.equal(used.length, 2);
  await service.updateSettings({ organizeModel: null });
  assert.equal(service.settings.organizeModel, null);
});


test('保存模型设置不强迫确认注入隐私，但从关闭启用注入仍必须确认', () => {
  const data = { recallMode: 'inject', recallCharacters: '800', recallCount: '4', recallThreshold: '0.7', recallBlockedEntries: '', recallBlockedProjects: '' };
  assert.equal(recallForm(data, { mode: 'inject', acknowledged: false }).acknowledged, false);
  assert.throws(() => recallForm(data, { mode: 'off', acknowledged: false }), /确认/);
});
