import { readFile, writeFile, mkdir, mkdtemp } from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import assert from 'node:assert/strict';
import { installPreflight, inventory } from '../install-preflight.mjs';

const [base, action] = process.argv.slice(2);
const directory = path.resolve('dist/phase3-probes');
await mkdir(directory, { recursive: true });
const html = await (await fetch(base + '/wanxiang')).text();
const token = html.match(/name="wanxiang-token" content="([^"]+)"/)[1];
const api = async (action, data) => {
  const response = await fetch(base + '/api/wanxiang/' + action, { method: data ? 'POST' : 'GET',
    headers: { 'x-wanxiang-token': token, 'content-type': 'application/json' }, body: data ? JSON.stringify(data) : undefined });
  const result = await response.json();
  if (!response.ok) throw new Error(result.error);
  return result;
};
const restore = path.join(directory, 'restore.json');
if (action === 'prepare') {
  // Never replace an existing recovery record, even after an interrupted run.
  await installPreflight(base, path.join(directory, 'original-backup-' + Date.now()), path.join(os.homedir(), '.dsh'));
  const original = (await api('state')).settings;
  const hashes = await inventory(original.root);
  const root = await mkdtemp(path.join(os.tmpdir(), 'wanxiang-probe3-knowledge-'));
  await writeFile(restore, JSON.stringify({ original, hashes, root }), { flag: 'wx' });
  await api('settings', { root, mode: 'export' });
  console.log('Selected synthetic knowledge root; original backup verified.');
} else if (action === 'restore') {
  const saved = JSON.parse(await readFile(restore, 'utf8'));
  await api('settings', saved.original);
  assert.deepEqual((await api('state')).settings, saved.original);
  const contentOnly = rows => rows.filter(row => !/^\.wanxiang[\\/](?:index\.sqlite|index\.db(?:-wal|-shm)?)$/.test(row.file));
  assert.deepEqual(contentOnly(await inventory(saved.original.root)), contentOnly(saved.hashes));
  console.log('Restored settings; original source hashes unchanged.');
} else throw new Error('Expected prepare or restore');
