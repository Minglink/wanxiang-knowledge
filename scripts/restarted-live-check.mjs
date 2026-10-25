// Tests the running production Host against a fresh synthetic knowledge root,
// then restores original settings. No provider call, no personal-session export.
import { mkdtemp, readFile, mkdir, writeFile, cp } from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { installPreflight, inventory } from './install-preflight.mjs';

const base = process.argv[2];
if (!base) throw new Error('请提供重启后的本机Harness地址');
const output = path.resolve(process.argv[3] || 'dist/v02-restarted');
await mkdir(output, { recursive: true });
const preflight = await installPreflight(base, path.join(output, 'pretest-backup-' + Date.now()), process.env.DSH_HOME || path.join(os.homedir(), '.dsh'));
const html = await (await fetch(base + '/wanxiang')).text();
const token = html.match(/name="wanxiang-token" content="([^"]+)"/)[1];
const api = async (action, data) => {
  const response = await fetch(base + '/api/wanxiang/' + action, { method: data ? 'POST' : 'GET', headers: { 'x-wanxiang-token': token, ...(data ? { 'content-type': 'application/json' } : {}) }, body: data ? JSON.stringify(data) : undefined });
  const result = await response.json();
  if (!response.ok) throw new Error(result.error);
  return result;
};
const original = (await api('state')).settings;
const before = await inventory(original.root);
const fixture = JSON.parse(await readFile('dist/live-fixture.json', 'utf8'));
assert.ok(fixture.id.startsWith('wanxiang-smoke-'));
const root = await mkdtemp(path.join(os.tmpdir(), 'wanxiang-fresh-live-'));
try {
  await api('settings', { root, mode: 'export' });
  assert.equal((await api('graph')).nodes.length, 0);
  const code = await new Promise((resolve, reject) => {
    const child = spawn(process.execPath, ['scripts/ui-check.mjs', base, fixture.id], { windowsHide: true, stdio: 'inherit' });
    child.once('error', reject); child.once('exit', resolve);
  });
  assert.equal(code, 0);
  const graph = await api('graph');
  assert.ok(graph.nodes.some(node => node.kind === 'tool'));
  assert.ok(graph.edges.some(edge => edge.kind === 'tool_link'));
  assert.ok((await api('jobs?offset=0')).total > 0);
  await cp('dist/screenshots', path.join(output, 'screenshots'), { recursive: true });
  await writeFile(path.join(output, 'live-result.json'), JSON.stringify({ time: new Date().toISOString(), freshRoot: root, preflight, UI: '15 checks passed', engine: (await api('search?mode=hybrid&q=')).engine, graphNodes: graph.nodes.length, graphEdges: graph.edges.length, providerCalls: 0 }, null, 2));
} finally {
  await api('settings', original);
  assert.deepEqual((await api('state')).settings, original);
  // Store.init rebuilds only the derived index on returning to original root.
  const after = await inventory(original.root);
  const contentOnly = records => records.filter(item => !/^\.wanxiang[\\/](?:index\.sqlite|index\.db(?:-wal|-shm)?)$/.test(item.file));
  assert.deepEqual(contentOnly(after), contentOnly(before), '原库正文、工具、任务及来源必须不变');
  console.log('PASS: restored original settings; original content hashes unchanged');
}
