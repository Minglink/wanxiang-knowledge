import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { mkdtemp, mkdir, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import assert from 'node:assert/strict';
import { KnowledgeService, registerRoutes } from '../lib/index.js';

const temporary = await mkdtemp(path.join(os.tmpdir(), 'wanxiang-tool-ui-'));
const fixture = { id: 'synthetic-tool-session', title: '合成工具目录会话', lastSeq: 1, messages: [{ seq: 1, role: 'user', text: '合成知识，用于检查总览与知识库图谱仍保留。' }] };
let enabled = true;
const names = ['security_disassemble', 'security_pcap_summary', 'security_frida_devices', 'security_http_flows'];
const host = {
  listSessions: async () => [{ id: fixture.id, title: fixture.title, running: false }],
  snapshot: async () => fixture,
  listTools: async sessionId => ({ available: true, scope: sessionId ? 'session' : 'global', sessionId,
    tools: enabled ? names.filter(name => !sessionId || name !== 'security_disassemble').map(name => ({ name, description: '合成工具目录说明', parameters: ['file'] })) : [] }),
};
const service = await new KnowledgeService(temporary, host, path.join(temporary, '知识 目录')).init();
await service.generate(fixture.id, 'export');
await service.tail;
const routes = [];
registerRoutes({ effect: effect => effect(), webServer: { register: route => { routes.push(route); return () => {}; } } }, service);
const server = createServer((request, response) => {
  const pathname = new URL(request.url, 'http://local').pathname;
  const route = routes.find(item => item.kind === 'exact' && item.path === pathname)
    || routes.find(item => item.kind === 'prefix' && pathname.startsWith(item.path + '/'));
  if (route) void route.handler(request, response);
  else { response.writeHead(404); response.end(); }
});
const browser = await chromium.launch({ executablePath: process.env.WANXIANG_CHROME || 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
const checks = [];
const pass = text => { checks.push(text); console.log('PASS: ' + text); };
try {
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const base = 'http://127.0.0.1:' + server.address().port;
  assert.equal((await fetch(base + '/api/wanxiang/tool-catalog')).status, 403);
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(base + '/wanxiang');
  await page.locator('main .wx-graph-canvas').waitFor();
  await page.locator('nav [data-tab="tools"]').click();
  await page.getByText('暂无工具条目', { exact: true }).waitFor();
  assert.equal(await page.locator('[data-tool-entry], #wx-tool-scope, canvas').count(), 0);
  pass('空目录不混入宿主/插件/MCP工具，无图谱及会话范围控件');
  await page.getByRole('button', { name: '添加工具', exact: true }).click();
  await page.locator('#tool-form input[name="name"]').fill('Frida 合成工具');
  assert.equal(await page.locator('#tool-form input[name="category"]').getAttribute('readonly'), '');
  assert.equal(await page.locator('#tool-form [name="hostToolName"]').count(), 0);
  await page.locator('#tool-form select[name="detector"]').selectOption('node');
  await page.locator('#tool-form button[type="submit"]').click();
  await page.waitForFunction(() => !document.querySelector('dialog').open);
  const manual = () => page.locator('[data-tool-entry]').filter({ hasText: 'Frida 合成工具' });
  await manual().waitFor();
  assert.equal(await manual().locator('.wx-tool-status-unknown').count(), 1);
  assert.ok((await page.locator('.wx-tool-status-row').innerText()).includes('动态分析'));
  assert.ok((await page.locator('.wx-tool-status-row').innerText()).includes('0/1'));
  await manual().getByRole('button').focus();
  await page.keyboard.press('Enter');
  await page.locator('#tool-form').getByRole('button', { name: '检测版本', exact: true }).click();
  await page.getByText('检测完成', { exact: true }).waitFor();
  await page.getByRole('button', { name: '取消', exact: true }).click();
  assert.equal(await manual().locator('.wx-tool-status-ready').count(), 1);
  assert.ok((await page.locator('.wx-tool-status-row').innerText()).includes('1/1'));
  pass('添加工具自动分类、键盘打开详情、检测后转绿且可用计数正确');
  await manual().getByRole('button').click();
  await page.locator('#tool-form select[name="categoryMode"]').selectOption('manual');
  await page.locator('#tool-form input[name="category"]').fill('我的研究分类');
  await page.locator('#tool-form button[type="submit"]').click();
  await page.waitForFunction(() => !document.querySelector('dialog').open);
  await page.locator('.wx-tool-status-row').filter({ hasText: '我的研究分类' }).waitFor();
  enabled = false;
  await page.getByRole('button', { name: '刷新工具', exact: true }).click();
  await manual().waitFor();
  assert.equal(await page.locator('[data-tool-entry]').count(), 1);
  pass('自定义分类保留，注册工具变化不影响用户工具列表');
  await mkdir('dist/tool-directory', { recursive: true });
  await page.screenshot({ path: 'dist/tool-directory/synthetic-1440.png', fullPage: true });
  await page.setViewportSize({ width: 720, height: 900 });
  await page.screenshot({ path: 'dist/tool-directory/synthetic-720.png', fullPage: true });
  assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
  const graphRequests = [];
  page.on('request', request => {
    if (new URL(request.url()).pathname === '/api/wanxiang/graph') graphRequests.push(request.url());
  });
  await page.locator('nav [data-tab="overview"]').click();
  await page.locator('main .wx-graph-canvas').waitFor();
  for (const layout of ['sphere', 'network']) {
    await page.locator(`[data-graph-action="${layout}"]`).click();
    assert.equal(await page.locator('[data-graph-kind="tool"], [data-graph-node^="tool:"]').count(), 0);
  }
  await page.locator('[data-graph-action="expand"]').click();
  await page.locator('dialog .wx-graph-canvas').waitFor();
  assert.equal(await page.locator('dialog [data-graph-node^="tool:"], dialog [data-graph-kind="tool"]').count(), 0);
  await page.getByRole('button', { name: '关闭', exact: true }).click();
  await page.locator('nav [data-tab="library"]').click();
  await page.getByRole('button', { name: '图谱', exact: true }).click();
  await page.locator('main .wx-graph-canvas').waitFor();
  assert.ok(graphRequests.length >= 3);
  assert.ok(graphRequests.every(url => new URL(url).searchParams.get('scope') === 'library'));
  await page.getByRole('button', { name: '设置', exact: true }).click();
  await page.locator('#settings-form').waitFor();
  assert.deepEqual(errors, []);
  pass('总览/知识库图谱保留、设置正常、小屏不溢出且无运行异常');
  await writeFile('dist/tool-directory/ui-check.json', JSON.stringify({ syntheticOnly: true, checks, toolsExecuted: 0, versionDetection: 'Node --version only' }, null, 2));
} finally {
  await browser.close();
  await new Promise(resolve => server.close(resolve));
  await service.dispose();
  await rm(temporary, { recursive: true, force: true });
}
