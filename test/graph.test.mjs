import test from 'node:test';
import assert from 'node:assert/strict';
import { buildGraph, relatedGraph } from '../lib/index.js';

function entry(id, extra = {}) {
  return { id, title: id, type: 'method', tags: [], project: '', body: '', archived: false,
    verification: '待核验', sourceSession: '', updatedAt: '2026-01-01', ...extra };
}
test('空图无假数据；关系来自会话、标签、弱项目、正文及工具', () => {
  assert.deepEqual(buildGraph([], []), { nodes: [], edges: [], clusters: [], truncated: false, total: 0 });
  const rows = [entry('entry-a', { sourceSession: 's', tags: ['x', 'y'], project: 'p', body: '[[entry-b]]' }), entry('entry-b', { sourceSession: 's', tags: ['x', 'y'], project: 'p' })];
  const tools = [{ id: 'entry-a', name: '真实工具', category: 'CLI', status: '未检测', linkedIds: ['entry-a', 'missing'] }];
  const graph = buildGraph(rows, tools);
  assert.equal(graph.nodes.length, 3);
  assert.ok(graph.nodes.some(n => n.id === 'tool:entry-a'));
  assert.deepEqual(new Set(graph.edges.map(e => e.kind)), new Set(['same_session', 'shared_tag', 'same_project', 'link', 'tool_link']));
  assert.equal(graph.edges.find(e => e.kind === 'shared_tag').w, 1.4);
  assert.equal(graph.nodes.find(n => n.kind === 'tool').status, '未检测');
  assert.equal(buildGraph(rows, tools, { scope: 'library' }).nodes.length, 2);
  assert.equal(buildGraph(rows, tools, { scope: 'tools' }).nodes.length, 2);
});

test('相关知识与工具双向关系及截断以外节点定位', () => {
  const rows = Array.from({ length: 1600 }, (_, i) => entry('entry-' + i, { updatedAt: new Date(2026, 0, 1, 0, i).toISOString() }));
  rows[0].body = '引用 [[entry-1]]';
  const tools = [{ id: 't', name: '关联工具', category: 'CLI', linkedIds: ['entry-0'], status: '未检测' }];
  const graph = buildGraph(rows, tools, { focus: 'entry-0' });
  assert.equal(graph.nodes[0].id, 'entry-0');
  const related = relatedGraph(rows, tools, 'entry-0');
  assert.ok(related.knowledge.some(node => node.id === 'entry-1'));
  assert.equal(related.tools[0].title, '关联工具');
  assert.equal(relatedGraph(rows, tools, 'tool:t').knowledge[0].title, 'entry-0');
  assert.throws(() => relatedGraph(rows, tools, 'missing'), /不存在/);
});
test('图谱筛选归档/项目/类型，3000条截断并且边不悬空', () => {
  const rows = Array.from({ length: 3000 }, (_, i) => entry('node-' + i, { project: 'p', sourceSession: 's', tags: ['same'] }));
  rows.push(entry('archived', { archived: true, project: 'other' }));
  const graph = buildGraph(rows, []);
  assert.equal(graph.nodes.length, 1500);
  assert.equal(graph.total, 3000);
  assert.equal(graph.truncated, true);
  assert.equal(graph.clusters[0].count, 3000);
  const ids = new Set(graph.nodes.map(n => n.id));
  assert.ok(graph.edges.every(e => ids.has(e.s) && ids.has(e.t)));
  assert.ok(graph.edges.length < 3000 * 10);
  assert.deepEqual(buildGraph(rows, [], { archived: true }).nodes.map(n => n.id), ['archived']);
  assert.equal(buildGraph(rows, [], { project: 'other' }).nodes.length, 0);
  assert.equal(buildGraph(rows, [], { type: 'pitfall' }).nodes.length, 0);
  assert.throws(() => buildGraph([], [], { scope: 'invalid' }), /范围/);
});
