// Installed package verification in isolated synthetic storage, not the production Host.
import { readFile, mkdtemp, rm, mkdir, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { createServer } from 'node:http';
import { spawn } from 'node:child_process';
import { pathToFileURL } from 'node:url';
import os from 'node:os';
import path from 'node:path';
import assert from 'node:assert/strict';

const installed = path.join(process.env.DSH_HOME || path.join(os.homedir(), '.dsh'), 'profiles/desktop/node_modules/dsh-wanxiang-knowledge');
const manifest = JSON.parse(await readFile(path.join(installed, 'package.json'), 'utf8'));
assert.equal(manifest.version, JSON.parse(await readFile('package.json', 'utf8')).version);
for (const file of ['index.js', 'panel.js', 'client.js', 'panel.html', 'style.css', 'sql-wasm.wasm']) {
  const digest = async source => createHash('sha256').update(await readFile(source)).digest('hex');
  assert.equal(await digest(path.join(installed, 'lib', file)), await digest(path.resolve('lib', file)), 'installed mismatch: ' + file);
}
const { KnowledgeService, registerRoutes } = await import(pathToFileURL(path.join(installed, 'lib/index.js')).href);
const temporary = await mkdtemp(path.join(os.tmpdir(), 'wanxiang-installed-'));
const fixture = { id: 'wanxiang-installed-synthetic', title: '已安装插件合成会话', cwd: 'C:\\合成项目', lastSeq: 1,
  messages: [{ seq: 1, role: 'user', text: '合成中文检索与图谱验证，无个人数据。' }] };
const service = await new KnowledgeService(path.join(temporary, 'home'), {
  listSessions: async () => [{ id: fixture.id, title: fixture.title }], snapshot: async () => fixture,
}, path.join(temporary, '知识 库')).init();
await service.updateSettings({ mode: 'export' });
const routes = [];
registerRoutes({ effect: fn => fn(), webServer: { register: route => { routes.push(route); return () => {}; } } }, service);
const server = createServer((req, res) => {
  const pathname = new URL(req.url, 'http://local').pathname;
  const route = routes.find(r => r.kind === 'exact' && r.path === pathname) || routes.find(r => r.kind === 'prefix' && pathname.startsWith(r.path + '/'));
  if (route) void route.handler(req, res); else { res.writeHead(404); res.end(); }
});
try {
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const base = 'http://127.0.0.1:' + server.address().port;
  const code = await new Promise((resolve, reject) => {
    const child = spawn(process.env.WANXIANG_TEST_NODE || 'node', ['scripts/ui-check.mjs', base, fixture.id], { windowsHide: true, stdio: 'inherit', env: { ...process.env, ELECTRON_RUN_AS_NODE: '' } });
    child.once('error', reject); child.once('exit', resolve);
  });
  assert.equal(code, 0);
  await mkdir('dist/v02-installed', { recursive: true });
  await writeFile('dist/v02-installed/result.json', JSON.stringify({ version: manifest.version, runtime: process.version, installedFilesMatch: true, syntheticUI: true,
    engine: service.store.engine.name, fullText: service.store.engine.fullText, productionHostReload: false, nativeSidebar: 'unverified', nativeQuickButton: 'unverified' }, null, 2));
} finally {
  await new Promise(resolve => server.close(resolve));
  await service.dispose();
  await rm(temporary, { recursive: true, force: true });
}
