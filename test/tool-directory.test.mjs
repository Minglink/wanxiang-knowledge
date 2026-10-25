import test from 'node:test';
import assert from 'node:assert/strict';
import { build } from 'esbuild';
import { mkdtemp, rm, readFile } from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { KnowledgeService } from '../lib/index.js';

const bundle = await build({
  stdin: { contents: "export * from './src/tool-discovery.ts'; export * from './src/tool-directory.ts'; export * from './src/tool-categories.ts'; export * from './src/panel/tool-directory.ts';", resolveDir: process.cwd() },
  bundle: true, write: false, format: 'esm', platform: 'node',
});
const { discoverHostTools, readToolDirectory, classifyTool, directoryPage } = await import('data:text/javascript;base64,' + Buffer.from(bundle.outputFiles[0].text).toString('base64'));
const registered = { name: 'security_disassemble', description: 'Capstone反汇编指定范围', parameters: { type: 'object', properties: { file: { type: 'string' } } } };

test('工具发现只读真实schema，尊重会话范围并随卸载更新，不执行工具', () => {
  const agent = {};
  let enabled = true;
  const registry = { schemas: scope => enabled ? [scope === agent ? registered : { ...registered, name: 'global_tool' }] : [] };
  const ctx = { get: () => registry, agents: { get: id => id === 'live' ? agent : undefined } };
  const current = discoverHostTools(ctx, 'live');
  assert.equal(current.scope, 'session');
  assert.equal(current.tools[0].name, registered.name);
  assert.deepEqual(current.tools[0].parameters, ['file']);
  assert.equal('execute' in current.tools[0], false);
  const absent = discoverHostTools(ctx, 'not-loaded');
  assert.equal(absent.scope, 'global');
  assert.match(absent.warning, /未启动或恢复/);
  enabled = false;
  assert.deepEqual(discoverHostTools(ctx).tools, []);
  assert.equal(discoverHostTools({}).available, false);
  assert.equal(discoverHostTools({ get: () => ({ schemas: () => { throw Error('failure'); } }) }).available, false);
});

test('自动分类、手工覆盖及登记和已接入严格区分；绑定条目不重复', async () => {
  const host = { listTools: async () => ({ available: true, scope: 'global', tools: [{ name: registered.name, description: registered.description, parameters: ['file'] }] }) };
  const manual = [
    { id: 'bound', name: '我的反汇编器', category: '自定义研究', categoryMode: 'manual', hostToolName: registered.name, notes: '说明', status: '可用', version: '1', path: '', linkedIds: [] },
    { id: 'offline', name: 'Frida', category: '', categoryMode: 'auto', notes: '', status: '可用', version: '', path: '', linkedIds: [] },
    { id: 'removed', name: '已卸载能力', category: '历史分类', hostToolName: 'plugin_removed', notes: '', status: '可用', version: '', path: '', linkedIds: [] },
  ];
  const directory = await readToolDirectory(host, manual);
  assert.equal(directory.total, 3);
  assert.equal(directory.callable, 1);
  assert.equal(directory.groups.find(group => group.category === '自定义研究').items[0].name, '我的反汇编器');
  assert.equal(directory.groups.find(group => group.category === '动态分析').callable, 0);
  assert.equal(directory.groups.find(group => group.category === '历史分类').items[0].status, '当前范围未注册');
  assert.equal(classifyTool({ name: 'mitmproxy' }), '抓包代理');
  assert.equal(classifyTool({ name: 'TShark / dpkt' }), '流量分析');
  assert.equal(classifyTool({ name: registered.name, description: registered.description }), '逆向分析');
  assert.equal((await readToolDirectory({}, manual)).callable, 0);
  const broken = await readToolDirectory({ listTools: async () => { throw Error('gone'); } }, manual);
  assert.equal(broken.total, 3);
  assert.match(broken.discovery.warning, /暂不可读取/);
});

test('目录元数据非破坏持久化，旧分类保留，重复绑定拒绝且不写错数据', async t => {
  const home = await mkdtemp(path.join(os.tmpdir(), 'wanxiang-directory-'));
  const service = await new KnowledgeService(home, { listSessions: async () => [], snapshot: async () => { throw Error('unused'); } }, path.join(home, '知识 目录')).init();
  t.after(async () => { await service.dispose(); await rm(home, { recursive: true, force: true }); });
  const auto = await service.store.saveTool({ name: 'Frida 动态分析', categoryMode: 'auto' });
  assert.equal(auto.category, '动态分析');
  const bound = await service.store.saveTool({ name: 'Capstone', category: '自己的分类', hostToolName: registered.name });
  assert.equal(bound.categoryMode, 'manual');
  const before = await readFile(service.store.local('tools/catalog.json'), 'utf8');
  await assert.rejects(service.store.saveTool({ name: '重复绑定', hostToolName: registered.name }), /已登记/);
  await assert.rejects(service.store.saveTool({ name: '错误', categoryMode: 'invalid' }), /分类方式/);
  assert.equal(await readFile(service.store.local('tools/catalog.json'), 'utf8'), before);
  const restored = JSON.parse(before);
  assert.equal(restored.find(tool => tool.id === auto.id).categoryMode, 'auto');
  assert.equal(restored.find(tool => tool.id === bound.id).category, '自己的分类');
});

test('分类列表没有图谱，引用元数据转义且空目录不造工具', () => {
  const page = directoryPage({ discovery: { available: true, scope: 'global' }, groups: [{ category: '<分类>', callable: 1, items: [{ key: 'host:x', name: '<img onerror="x">', category: '<分类>', hostToolName: 'x', callable: true, status: '已注册', description: '<script>alert(1)</script>', version: '', path: '', parameters: [] }] }], callable: 1, total: 1 }, [], '');
  assert.ok(page.includes('1/1'));
  assert.ok(page.includes('&lt;img'));
  assert.ok(!page.includes('<script>'));
  assert.ok(!page.includes('<canvas'));
  const empty = directoryPage({ discovery: { available: true, scope: 'global' }, groups: [], callable: 0, total: 0 }, [], '');
  assert.ok(empty.includes('暂无工具条目'));
  assert.ok(!empty.includes('PE / ELF'));
});
