import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { mkdtemp, mkdir, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import assert from 'node:assert/strict';
const { KnowledgeService, registerRoutes, knowledgeTools } = await import(process.env.WANXIANG_TEST_PACKAGE || '../lib/index.js');

const temporary = await mkdtemp(path.join(os.tmpdir(), 'wanxiang-gold-ui-'));
const fixture = { id: 'gold-synthetic', title: '合成金色活动', lastSeq: 1, messages: [{ seq: 1, role: 'user', text: '合成落库事件测试' }] };
const service = await new KnowledgeService(temporary, { listSessions: async () => [], snapshot: async () => fixture }, path.join(temporary, 'knowledge')).init();
for (let index = 0; index < 4; index++) {
  await service.store.save({ id: 'gold-' + index, title: '合成知识 ' + index, l0: '合成活动摘要', l1: '', questions: [], type: 'note', body: '只用于合成测试',
    project: '合成项目', tags: ['合成关系'], file: 'notes/gold-' + index + '.md', sourceSession: 'fixture', sourceSeqs: [1],
    updatedAt: new Date().toISOString(), createdAt: new Date().toISOString(), archived: false });
}
await service.store.flush();
const routes = [];
registerRoutes({ effect: fn => fn(), webServer: { register: route => { routes.push(route); return () => {}; } } }, service);
const server = createServer((request, response) => {
  const pathname = new URL(request.url, 'http://local').pathname;
  const route = routes.find(item => item.kind === 'exact' && item.path === pathname) || routes.find(item => item.kind === 'prefix' && pathname.startsWith(item.path + '/'));
  if (route) void route.handler(request, response); else { response.writeHead(404); response.end(); }
});
const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
const checks = [];
const pass = value => { checks.push(value); console.log('PASS: ' + value); };
try {
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const base = 'http://127.0.0.1:' + server.address().port;
  assert.equal((await fetch(base + '/api/wanxiang/graph-activity')).status, 403);
  const page = await browser.newPage({ viewport: { width: 1280, height: 1000 }, reducedMotion: 'reduce' });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(base + '/wanxiang');
  const canvas = page.locator('main canvas');
  await canvas.waitFor();
  await page.waitForFunction(() => document.querySelector('main canvas').dataset.activityNodes === '0');
  const idle = await canvas.evaluate(node => node.toDataURL());
  await knowledgeTools(service).find(tool => tool.name === 'knowledge_read').execute({ id: 'gold-0' });
  await page.waitForFunction(() => document.querySelector('main canvas').dataset.activityNodes === '1');
  assert.notEqual(await canvas.evaluate(node => node.toDataURL()), idle);
  await page.getByText('AI 已读取', { exact: false }).waitFor();
  const frames = Number(await canvas.getAttribute('data-frames'));
  await page.waitForTimeout(200);
  assert.equal(Number(await canvas.getAttribute('data-frames')), frames, 'reduced motion must not animate continuously');
  pass('真实知识工具成功调用通过受保护活动接口点亮，减少动画模式静态显示');
  await page.getByRole('checkbox', { name: '金色活动' }).uncheck();
  await page.waitForFunction(() => document.querySelector('main canvas').dataset.activityNodes === '0');
  assert.equal(await canvas.evaluate(node => node.toDataURL()), idle, 'overlay disabled restores original node colors and pixels');
  await page.getByRole('checkbox', { name: '金色活动' }).check();
  await page.locator('[data-graph-action="network"]').click();
  await page.waitForFunction(() => document.querySelector('main canvas').dataset.activityNodes === '1');
  pass('开关恢复原始配色像素，球体和网络切换保留真实活动');
  await mkdir('dist/graph-activity', { recursive: true });
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await knowledgeTools(service).find(tool => tool.name === 'knowledge_read').execute({ id: 'gold-0' });
  await page.waitForTimeout(1200);
  await page.screenshot({ path: 'dist/graph-activity/synthetic-network-gold.png', fullPage: true });
  await page.locator('[data-graph-action="sphere"]').click();
  await page.screenshot({ path: 'dist/graph-activity/synthetic-sphere-gold.png', fullPage: true });
  const job = await service.generate(fixture.id, 'export');
  await service.tail;
  assert.equal(job.status, 'success');
  await page.waitForFunction(() => document.querySelectorAll('main [data-graph-node]').length === 5);
  await page.getByText('新知识落库', { exact: false }).waitFor();
  assert.ok(Number(await canvas.getAttribute('data-activity-nodes')) >= 1);
  pass('落库成功实时刷新图谱，新知识进入图谱并发出活动');
  await page.locator('nav [data-tab="tools"]').click();
  const count = service.graphActivity.page(service.store.root).cursor;
  await page.waitForTimeout(1200);
  assert.equal(service.graphActivity.page(service.store.root).cursor, count);
  await page.locator('nav [data-tab="overview"]').click();
  await canvas.waitFor();
  assert.equal(await page.getByRole('checkbox', { name: '金色活动' }).isChecked(), true);
  await service.updateSettings({ root: path.join(temporary, 'empty-knowledge') });
  await page.getByText('暂无关系图谱', { exact: true }).waitFor();
  const emptyJob = await service.generate(fixture.id, 'export');
  await service.tail;
  assert.equal(emptyJob.status, 'success');
  await page.locator('main canvas').waitFor();
  await page.waitForFunction(() => document.querySelector('main canvas').dataset.activityNodes === '1');
  assert.deepEqual(errors, []);
  pass('切库清除旧活动，空库成功落库后自动出现真实新节点');
  pass('切换标签销毁活动订阅，返回后偏好保留，无运行异常');
  await writeFile('dist/graph-activity/ui-check.json', JSON.stringify({ syntheticOnly: true, checks, realModelRequests: 0 }, null, 2));
} finally {
  await browser.close();
  await new Promise(resolve => server.close(resolve));
  await service.dispose();
  await rm(temporary, { recursive: true, force: true });
}
