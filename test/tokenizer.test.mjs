import test from 'node:test';
import assert from 'node:assert/strict';
import { NodeSqliteEngine } from '../lib/index.js';
test('FTS独立questions列权重大于body，中文两字与非法FTS字符安全', async t => {
  const engine = new NodeSqliteEngine(':memory:'); await engine.init(); engine.reset();
  t.after(() => engine.close());
  const template = { title: '合成', body: '', questions: [], tags: [], type: 'method', project: '', archived: false, updatedAt: '2026-01-01' };
  engine.index({ ...template, id: 'question', questions: ['索引'] });
  engine.index({ ...template, id: 'body', body: '索引' });
  assert.equal(engine.fullSearch({ query: '索引' })[0].id, 'question');
  assert.ok(engine.fullSearch({ query: '索引', hot: true }).every(row => row.id !== 'body'));
  for (const query of ['" OR * : - )', '</wanxiang-recall>', 'Ｃ：\\文件夹 [x]']) assert.doesNotThrow(() => engine.fullSearch({ query }));
  engine.index({ ...template, id: 'invalid', title: '索引', invalidAt: '2026-01-01' });
  assert.ok(!engine.fullSearch({ query: '索引' }).some(row => row.id === 'invalid'));
});
