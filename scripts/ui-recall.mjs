// Isolated synthetic UI carrier; no production settings or provider calls.
import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { mkdtemp, mkdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import assert from 'node:assert/strict';
import { KnowledgeService, registerRoutes } from '../lib/index.js';

const root = await mkdtemp(path.join(os.tmpdir(), 'wanxiang-recall-ui-'));
const service = await new KnowledgeService(path.join(root, 'home'), {
  listSessions: async () => [{ id: 'synthetic-session', title: '合成会话' }],
  snapshot: async () => ({ id: 'synthetic-session', title: '合成会话', messages: [], lastSeq: 0 }),
}, path.join(root, 'knowledge')).init();
service.recall.setProvider({ section: () => () => {} });
const entry = { id: 'synthetic-recall-ui', title: '合成召回知识', type: 'method', l0: '合成摘要，仅用于界面测试。', body: '合成正文', tags: [], project: 'synthetic-project', file: 'cards/synthetic.md', updatedAt: '2026-01-01', sourceSession: 'synthetic', sourceSeqs: [1] };
await service.store.save(entry); await service.store.flush();
for (let index = 0; index < 25; index++) service.recallLog.schedule(service.store.root, { id: 'recall-' + (Date.now() + index) + '-synthetic', sessionId: 'synthetic-session', messageId: 'm-' + index, seq: index, at: new Date().toISOString(), query: '合成索引如何恢复？', entryIds: [entry.id], injected: true, reason: 'injected', latencyMs: 4.2 });
await service.recallLog.flush();
const routes = [];
registerRoutes({ effect: fn => fn(), webServer: { register: route => { routes.push(route); return () => {}; } } }, service);
const server = createServer((req, res) => {
  const pathname = new URL(req.url, 'http://local').pathname;
  const route = routes.find(item => item.kind === 'exact' && item.path === pathname) || routes.find(item => item.kind === 'prefix' && pathname.startsWith(item.path + '/'));
  if (route) void route.handler(req, res); else { res.writeHead(404); res.end(); }
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const browser = await chromium.launch({ executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 900 }, permissions: ['clipboard-read', 'clipboard-write'] });
const errors = [];
page.on('pageerror', error => errors.push(error.message));
const base = 'http://127.0.0.1:' + server.address().port;
await mkdir('dist/phase3-ui', { recursive: true });
try {
  await page.goto(base + '/wanxiang');
  await page.getByRole('heading', { name: '万象知识库', exact: true }).waitFor();
  await page.getByRole('button', { name: '设置', exact: true }).first().click();
  await page.locator('#settings-form button[type=submit]').click();
  await page.getByText('请先确认自动注入会发送本地知识摘要给宿主模型服务', { exact: true }).waitFor();
  assert.equal(await page.locator('dialog').evaluate(element => element.open), true);
  await page.locator('[name=recallAcknowledged]').check();
  await page.locator('#settings-form button[type=submit]').click();
  await page.waitForFunction(() => !document.querySelector('dialog').open);
  await page.locator('nav [data-tab=logs]').click();
  await page.locator('.wx-recall-row').first().waitFor();
  assert.equal(await page.locator('.wx-recall-row').count(), 20);
  await page.locator('[data-action=recall-next]').click();
  await page.waitForFunction(() => document.querySelectorAll('.wx-recall-row').length === 5);
  await page.locator('[data-action=recall-prev]').click();
  await page.waitForFunction(() => document.querySelectorAll('.wx-recall-row').length === 20);
  await page.locator('[data-action=recall-feedback][data-value=useful]').first().click();
  await page.getByRole('button', { name: '✓ 有用', exact: true }).waitFor();
  await page.locator('[data-action=recall-copy]').first().click();
  await page.getByText('已复制引用，可自行粘贴后采用', { exact: true }).waitFor();
  assert.match(await page.evaluate(() => navigator.clipboard.readText()), /wanxiang-recall/);
  await page.screenshot({ path: 'dist/phase3-ui/召回记录.png', fullPage: true });
  await page.locator('[data-action=recall-block-project]').first().click();
  await page.getByRole('button', { name: '设置', exact: true }).first().click();
  assert.equal(await page.locator('[name=recallBlockedProjects]').inputValue(), 'synthetic-project');
  await page.screenshot({ path: 'dist/phase3-ui/隐私与屏蔽设置.png', fullPage: true });
  await page.locator('#modal [data-action=close]').first().click();
  await page.goto(base + '/wanxiang?compact=1&sessionId=synthetic-session');
  await page.getByRole('heading', { name: '本轮知识引用', exact: true }).waitFor();
  assert.equal(await page.locator('.wx-recall-row').count(), 1);
  await page.screenshot({ path: 'dist/phase3-ui/会话本轮引用.png', fullPage: true });
  await page.setViewportSize({ width: 640, height: 800 });
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
  assert.deepEqual(errors, []);
  await writeFile('dist/phase3-ui/result.json', JSON.stringify({ privacyConsent: true, logPagination: true, feedback: true, copyQuoted: true, blockProject: true, compact: true, narrow: true, errors, providerCalls: 0 }, null, 2));
  console.log('PASS: synthetic recall UI privacy/log pagination/feedback/copy/block/compact/narrow; no browser errors');
} finally {
  await browser.close(); await new Promise(resolve => server.close(resolve));
  await service.dispose(); await rm(root, { recursive: true, force: true });
}

