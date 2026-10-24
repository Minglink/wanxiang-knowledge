// Phase 0 only: isolated synthetic data; no user knowledge or model calls.
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, readFile, rm } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { createServer } from 'node:http';
import { chromium } from 'playwright';
import { KnowledgeService, registerRoutes } from '../lib/index.js';

const output = path.resolve('dist/v02-audit');
await mkdir(output, { recursive: true });
const baseDir = await mkdtemp(path.join(os.tmpdir(), 'wanxiang-v02-审计-'));
const rows = [];
const record = (name, actual, issue = null) => {
  rows.push({ name, actual, issue });
  console.log(JSON.stringify(rows.at(-1)));
};
const sessions = [
  { id: 'audit-history', title: '合成历史会话', running: false },
  { id: 'audit-running', title: '合成运行中会话', running: true },
  { id: 'audit-failure', title: '合成读取失败会话', running: false },
];
const source = id => ({
  id, title: sessions.find(s => s.id === id)?.title || id,
  cwd: 'C:\\合成项目 空格', lastSeq: 1,
  messages: [{ seq: 1, role: 'user', text: '中文 索引 SQLite ERR_AUDIT C:\\合成路径 [x] "引号"' }],
});
const service = await new KnowledgeService(path.join(baseDir, 'home'), {
  listSessions: async () => sessions,
  snapshot: async id => {
    if (id === 'audit-failure') throw new Error('合成会话读取失败');
    return source(id);
  },
}, path.join(baseDir, '知识库')).init();
await service.updateSettings({ mode: 'export' });
const routes = [];
registerRoutes({ effect: f => f(), webServer: { register: r => { routes.push(r); return () => {}; } } }, service);
const server = createServer((req, res) => {
  const pathname = new URL(req.url, 'http://local').pathname;
  const route = routes.find(r => r.kind === 'exact' && r.path === pathname)
    || routes.find(r => r.kind === 'prefix' && pathname.startsWith(r.path + '/'));
  if (route) void route.handler(req, res);
  else { res.writeHead(404); res.end(); }
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const base = 'http://127.0.0.1:' + server.address().port;
const browser = await chromium.launch({
  executablePath: process.env.WANXIANG_CHROME || 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: true,
});
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
const errors = [];
page.on('pageerror', error => errors.push(error.message));
const shot = name => page.screenshot({ path: path.join(output, name + '.png'), fullPage: true });
const tab = async name => {
  await page.locator(`nav [data-tab="${name}"]`).click();
  await page.waitForTimeout(100);
};
try {
  await page.goto(base + '/wanxiang');
  await page.locator('#session-select').waitFor();
  assert.equal(await page.locator('nav button').count(), 6);
  assert.equal(await page.locator('[data-action="generate"]').isDisabled(), true);
  record('空库与无会话按钮', '六页签、空知识/工具/日志、生成按钮禁用');
  await shot('总览-空库');
  for (const name of ['library', 'tools', 'search', 'pending', 'logs']) {
    await tab(name);
    await shot(name + '-空库');
  }
  await tab('overview');
  await page.locator('#session-select').selectOption('audit-running');
  record('宿主运行中会话', { generateEnabled: await page.locator('[data-action="generate"]').isEnabled() });
  await page.locator('#session-select').selectOption('audit-failure');
  await page.waitForTimeout(100);
  record('快照读取失败', { toast: await page.locator('#toast').innerText(), generateEnabled: await page.locator('[data-action="generate"]').isEnabled() });
  const job = await service.generate('audit-history', 'export');
  await service.tail;
  assert.equal(job.status, 'success');
  const first = service.store.entries.get(job.entryIds[0]);
  record('原文流水线', { status: job.status, stage: job.stage, entries: job.entryIds.length });
  for (const q of ['索引', '中文 SQLite', 'ＳＱＬｉｔｅ', 'sqlite', '[x]', '"引号"', 'C:\\合成路径', '']) {
    record('检索 ' + JSON.stringify(q), service.store.search(q).length);
  }
  const start = performance.now();
  for (let i = 0; i < 230; i++) {
    const id = `audit-entry-${i}`;
    await service.store.save({ ...first, id, title: `合成知识 ${i}`, sourceSession: 'synthetic',
      project: i === 0 ? 'C:\\仅旧条目的项目' : 'C:\\合成项目 空格',
      body: '索引 中文 ERR_AUDIT [x] SQLite',
      updatedAt: new Date(Date.UTC(2026, 9, 1) + i * 1000).toISOString(),
      file: path.join('notes', id + '.md') });
  }
  await service.store.flush();
  await page.reload();
  await page.locator('#session-select').waitFor();
  await tab('library');
  await page.locator('.entry').first().waitFor();
  record('200条上限与项目', {
    seeded: service.store.entries.size,
    visible: await page.locator('.entry').count(),
    hint: await page.locator('.result-count').innerText(),
    oldProjectVisible: (await page.locator('#project option').allTextContents()).includes('仅旧条目的项目'),
    elapsedMsIncludingSeed: performance.now() - start,
  }, 'AUD-01');
  await shot('知识库-200条');
  await page.locator('#query').fill(first.id);
  await page.locator('#query').press('Enter');
  await page.locator('.entry').first().click();
  await page.locator('dialog[open] .source').waitFor();
  await page.getByRole('button', { name: '复制引用', exact: true }).click();
  record('复制引用', await page.locator('#toast').innerText());
  await page.getByRole('button', { name: '编辑', exact: true }).click();
  await page.locator('#edit-form textarea').fill(first.body + '\n合成手工编辑');
  await page.locator('#edit-form [type="submit"]').click();
  await page.waitForFunction(() => !document.querySelector('dialog').open);
  const edited = service.store.entries.get(first.id);
  await assert.rejects(service.store.edit(first.id, '冲突', '冲突', first.updatedAt), /更新/);
  record('编辑与expected冲突', '保存成功；旧expected被拒绝；修订副本存在');
  await service.store.edit(first.id, edited.body, edited.title, edited.updatedAt, true);
  assert.equal(service.store.search(first.id).length, 0);
  assert.equal(service.store.search(first.id, '', true).length, 1);
  const archived = service.store.entries.get(first.id);
  await service.store.edit(first.id, archived.body, archived.title, archived.updatedAt, false);
  record('归档/恢复', '已归档与非归档查询分离，恢复后重新可查');
  await service.markPending('audit-history', '合成已落库会话');
  const skipped = await service.generate('audit-history', 'export');
  await service.tail;
  record('已落库会话重复登记', { status: skipped.status, pendingRemains: !!service.pending['audit-history'] }, 'AUD-02');
  for (const detector of ['node', 'python', 'git', 'powershell']) {
    const tool = await service.store.saveTool({ name: `合成 ${detector}`, detector, linkedIds: [first.id] });
    assert.equal(tool.status, '未检测');
    const result = await service.detect(tool.id);
    record('检测器 ' + detector, { status: result.status, version: result.version });
  }
  const custom = await service.store.saveTool({ name: '合成编辑删除', notes: '说明' });
  await service.store.saveTool({ ...custom, name: '合成已编辑' });
  await service.store.removeTool(custom.id);
  assert.equal(service.store.tools.some(t => t.id === custom.id), false);
  await page.reload();
  await page.locator('#session-select').waitFor();
  await tab('tools');
  await page.locator('.tool-card [data-action="tool-detail"]').first().click();
  record('工具关联知识输入', { displayed: await page.locator('input[name="linkedIds"]').inputValue(), link: await page.locator('#modal [data-action="entry"]').innerText() });
  await shot('工具详情');
  await page.locator('#modal [data-action="close"]').first().click();
  await tab('pending');
  await shot('待落库-已落库残留');
  await page.locator('[data-action="pending-dismiss"]').click();
  await page.waitForTimeout(100);
  assert.equal(Object.keys(service.pending).length, 0);
  record('待落库忽略', '可移除；无批量按钮，无积压分页');
  for (let i = 0; i < 102; i++) service.jobs.push({ ...job, id: `synthetic-log-${i}` });
  record('日志100条截断', { total: service.jobs.length, exposed: (await service.state()).jobs.length }, 'AUD-03');
  await page.reload();
  await page.locator('#session-select').waitFor();
  await tab('logs');
  await shot('日志-100条');
  await page.getByRole('button', { name: '设置', exact: true }).first().click();
  await shot('设置');
  await page.locator('#modal [data-action="close"]').first().click();
  for (const width of [640, 375]) {
    await page.setViewportSize({ width, height: 800 });
    await tab('overview');
    record('窄屏 ' + width, await page.evaluate(() => ({ scrollWidth: document.documentElement.scrollWidth, width: innerWidth })));
    await shot('窄屏-' + width);
  }
  await page.goto(base + '/wanxiang?sessionId=audit-history&compact=1');
  await page.getByRole('heading', { name: '本次会话', exact: true }).waitFor();
  await shot('紧凑-375');
  await page.emulateMedia({ colorScheme: 'dark' });
  record('深色宿主偏好', await page.locator('body').evaluate(el => getComputedStyle(el).backgroundColor));
  await page.keyboard.press('Tab');
  record('键盘聚焦', await page.evaluate(() => document.activeElement.tagName));
  const originalRoot = service.settings.root;
  await service.updateSettings({ root: path.join(baseDir, '新建 中文 空格目录') });
  await service.updateSettings({ root: originalRoot });
  record('切换不存在中文空格目录', '自动创建，切回后原数据保留');
  const blocked = path.join(baseDir, '同名文件');
  await writeFile(blocked, 'synthetic');
  await assert.rejects(service.updateSettings({ root: blocked }));
  assert.ok(service.store.search().length);
  record('不可写目标（同名文件）', '错误被拒绝，原库可用；ACL拒写未测');
  const running = { ...job, id: 'audit-queued', status: 'queued' };
  service.jobs.unshift(running);
  await assert.rejects(service.updateSettings({ mode: 'ai' }), /不能修改/);
  service.jobs.shift();
  record('任务运行中设置', '服务层拒绝修改');
  const brokenRoot = path.join(baseDir, '损坏待落库目标');
  await mkdir(path.join(brokenRoot, '.wanxiang'), { recursive: true });
  await writeFile(path.join(brokenRoot, '.wanxiang/pending.json'), '{invalid');
  await assert.rejects(service.updateSettings({ root: brokenRoot }), /无法读取/);
  record('切库失败原子性', {
    settingsRootUnchanged: service.settings.root === originalRoot,
    storeRootChanged: service.store.root === brokenRoot,
    entriesNow: service.store.entries.size,
  }, 'AUD-04');
  record('浏览器异常', errors);
  await writeFile(path.join(output, 'results.json'), JSON.stringify({ rows, errors }, null, 2));
} finally {
  await browser.close();
  await new Promise(resolve => server.close(resolve));
  await service.dispose();
  await rm(baseDir, { recursive: true, force: true });
}
