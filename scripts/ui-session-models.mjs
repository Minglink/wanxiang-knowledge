import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { mkdtemp, mkdir, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import assert from 'node:assert/strict';
import { KnowledgeService, registerRoutes } from '../lib/index.js';

const temporary = await mkdtemp(path.join(os.tmpdir(), 'wanxiang-model-ui-'));
const id = 'session-0486700b-4a9a-4dcb-98b3-c522193b571f';
let title = '合成项目的真实标题';
let available = true;
const used = [];
const fixture = () => ({ id, title, lastSeq: 1, model: { provider: 'host', model: 'default' }, messages: [{ seq: 1, role: 'user', text: '合成资料，仅用于整理模型验证。' }] });
const host = { listSessions: async () => [{ id, title, running: false }], snapshot: async () => fixture(),
  listModels: async () => ({ models: available ? [{ provider: 'p', model: 'chosen', name: '合成可选模型' }] : [] }),
  generate: async snap => { used.push(snap.model); return JSON.stringify({ title: '模型选择产物', summary: '合成验证摘要', cards: [] }); } };
const service = await new KnowledgeService(temporary, host, path.join(temporary, 'knowledge')).init();
service.pending[id] = { title: id, updatedAt: new Date().toISOString() };
await service.persistPending();
const routes = [];
registerRoutes({ effect: fn => fn(), webServer: { register: route => { routes.push(route); return () => {}; } } }, service);
const server = createServer((request, response) => {
  const pathname = new URL(request.url, 'http://local').pathname;
  const route = routes.find(item => item.kind === 'exact' && item.path === pathname) || routes.find(item => item.kind === 'prefix' && pathname.startsWith(item.path + '/'));
  if (route) void route.handler(request, response); else { response.writeHead(404); response.end(); }
});
const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
const checks = [];
const pass = text => { checks.push(text); console.log('PASS: ' + text); };
try {
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const page = await browser.newPage({ viewport: { width: 1280, height: 1000 } });
  const errors = [];page.on('pageerror', error => errors.push(error.message));
  await page.goto('http://127.0.0.1:' + server.address().port + '/wanxiang');
  await page.locator('nav [data-tab="pending"]').click();
  await page.locator('.pending-item strong').getByText(title, { exact: true }).waitFor();
  assert.equal(await page.locator('.pending-item strong').innerText(), title);
  pass('旧session-ID待落库记录主标题显示真实会话标题');
  await page.getByRole('button', { name: '设置', exact: true }).click();
  const select = () => page.getByRole('combobox', { name: 'AI 整理模型', exact: true });
  await select().waitFor();assert.equal(await select().inputValue(), '');
  await select().selectOption(JSON.stringify(['p', 'chosen']));
  await page.locator('#settings-form button[type="submit"]').click();
  await page.waitForFunction(() => !document.querySelector('dialog').open);
  assert.deepEqual(service.settings.organizeModel, { provider: 'p', model: 'chosen' });
  const response = page.waitForResponse(value => value.url().endsWith('/api/wanxiang/generate'));
  await page.locator('.pending-item [data-action="pending-generate"]').click();
  await response;
  await service.tail;
  assert.deepEqual(used, [{ provider: 'p', model: 'chosen' }]);
  pass('设置选择并保存整理模型，界面落库确实使用指定模型');
  available = false;
  await page.getByRole('button', { name: '设置', exact: true }).first().click();
  await select().waitFor();assert.equal(await select().inputValue(), JSON.stringify(['p', 'chosen']));
  assert.match(await select().locator('option:checked').innerText(), /当前不可用/);
  await mkdir('dist/session-models', { recursive: true });
  await page.screenshot({ path: 'dist/session-models/synthetic-settings.png', fullPage: true });
  await select().selectOption('');
  await page.locator('#settings-form button[type="submit"]').click();
  await page.waitForFunction(() => !document.querySelector('dialog').open);
  assert.equal(service.settings.organizeModel, null);
  assert.deepEqual(errors, []);
  pass('已选模型消失明确显示不可用，可主动恢复跟随宿主，不静默换模型');
  await writeFile('dist/session-models/ui-check.json', JSON.stringify({ syntheticOnly: true, checks, onlineModelRequests: 0 }, null, 2));
} finally {
  await browser.close();await new Promise(resolve => server.close(resolve));await service.dispose();await rm(temporary, { recursive: true, force: true });
}
