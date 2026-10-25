import test from 'node:test';
import assert from 'node:assert/strict';
import { build } from 'esbuild';
const bundle = await build({ stdin: { contents: "export * from './src/wanxiang-command.ts';", resolveDir: process.cwd() }, bundle: true, write: false, platform: 'node', format: 'esm' });
const { wanxiangCommand } = await import('data:text/javascript;base64,' + Buffer.from(bundle.outputFiles[0].text).toString('base64'));

test('/wanxiang 把脱敏查询交给当前AI，保留当前模型，权限不足及取消不绕过', () => {
  const messages = [];
  const agent = { followup: message => messages.push(message), model: 'unchanged' };
  const invocation = { agent, rawInput: '怎么修复索引 sk-abcdefghijklmnopqrst', signal: new AbortController().signal };
  const command = wanxiangCommand(() => ({ schemas: scoped => {
    assert.equal(scoped, agent);
    return [{ name: 'knowledge_search' }, { name: 'knowledge_read' }];
  } }));
  assert.equal(command.name, 'wanxiang');
  assert.equal(command.recordInput, false);
  assert.equal(command.handler(invocation).kind, 'success');
  assert.match(messages[0].content[0].text, /knowledge_search/);
  assert.ok(!messages[0].content[0].text.includes('sk-abcdefghijklmnopqrst'));
  assert.equal(agent.model, 'unchanged');
  assert.equal(command.handler({ ...invocation, rawInput: '' }).kind, 'success');
  assert.match(messages[1].content[0].text, /当前会话/);
  assert.equal(wanxiangCommand(() => ({ schemas: () => [] })).handler(invocation).kind, 'error');
  const stopped = new AbortController(); stopped.abort();
  assert.throws(() => command.handler({ ...invocation, signal: stopped.signal }));
  assert.equal(messages.length, 2);
});
