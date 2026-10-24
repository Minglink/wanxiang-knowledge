import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, rm, readFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { createServer } from 'node:http';
import { KnowledgeService, registerRoutes } from '../lib/index.js';

async function setup(t) {
  const dir = await mkdtemp(path.join(os.tmpdir(), 'wanxiang-workspace-'));
  const snapshot = { id: 's', title: '合成', lastSeq: 1, messages: [{ seq: 1, role: 'user', text: 'synthetic' }] };
  const s = await new KnowledgeService(path.join(dir, 'home'), { listSessions: async () => [], snapshot: async () => snapshot }, path.join(dir, 'knowledge')).init();
  t.after(async () => { await s.dispose(); await rm(dir, { recursive: true, force: true }); });
  return s;
}
test('项目筛选涵盖200条之外及归档独有项目', async t => {
  const s = await setup(t);
  await s.generate('s', 'export'); await s.tail;
  const template = [...s.store.entries.values()][0];
  for (let i = 0; i < 220; i++) {
    const entry = { ...template, id: 'e-' + i, project: i === 0 ? '旧项目' : i === 1 ? '归档项目' : '新项目', archived: i === 1,
      updatedAt: new Date(2026, 0, 1, 0, i).toISOString() };
    s.store.entries.set(entry.id, entry); s.store.index(entry);
  }
  const state = await s.state();
  assert.equal(state.entries.length, 200);
  assert.ok(state.projects.includes('旧项目'));
  assert.ok(state.projects.includes('归档项目'));
});
test('相同快照跳过与索引修复成功均清理并持久化待落库', async t => {
  const s = await setup(t);
  await s.generate('s', 'export'); await s.tail;
  await s.markPending('s', '合成');
  const skipped = await s.generate('s', 'export'); await s.tail;
  assert.equal(skipped.status, 'skipped');
  assert.equal(s.pending.s, undefined);
  const completed = s.jobs.find(job => job.status === 'success');
  completed.stage = '索引失败'; completed.status = 'failed';
  await s.markPending('s', '合成');
  const repaired = await s.generate('s', 'export');
  assert.equal(repaired.status, 'success');
  assert.equal(s.pending.s, undefined);
  assert.equal(JSON.parse(await readFile(s.store.local('.wanxiang/pending.json'), 'utf8')).s, undefined);
});
test('日志HTTP分页无遗漏或重复，沿用token校验', async t => {
  const s = await setup(t);
  s.jobs = Array.from({ length: 123 }, (_, i) => ({ id: 'job-' + i }));
  const routes = [];
  registerRoutes({ effect: fn => fn(), webServer: { register: route => { routes.push(route); return () => {}; } } }, s);
  const server = createServer((req, res) => {
    const url = new URL(req.url, 'http://local');
    const route = routes.find(r => r.kind === 'exact' && r.path === url.pathname) || routes.find(r => r.kind === 'prefix' && url.pathname.startsWith(r.path + '/'));
    void route.handler(req, res);
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  t.after(() => new Promise(resolve => server.close(resolve)));
  const base = 'http://127.0.0.1:' + server.address().port;
  const html = await (await fetch(base + '/wanxiang')).text();
  const token = html.match(/name="wanxiang-token" content="([^"]+)"/)[1];
  assert.equal((await fetch(base + '/api/wanxiang/jobs')).status, 403);
  const ids = [];
  for (const offset of [0, 50, 100]) {
    const response = await fetch(base + '/api/wanxiang/jobs?offset=' + offset, { headers: { 'x-wanxiang-token': token } });
    const page = await response.json();
    assert.equal(page.total, 123); ids.push(...page.items.map(job => job.id));
  }
  assert.equal(ids.length, 123); assert.equal(new Set(ids).size, 123);
});
