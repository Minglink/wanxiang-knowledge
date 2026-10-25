import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { Readable } from 'node:stream';
import { apply } from '../scripts/probes/production-injection.mjs';

test('注入探针默认零注册，宿主section消失或注册失败时回退提示且不崩溃', async () => {
  await apply({ inject: () => assert.fail('disabled probe must not register') });
  const savedHome = process.env.DSH_HOME;
  const root = await mkdtemp(path.join(os.tmpdir(), 'wanxiang-probe-capability-'));
  process.env.DSH_HOME = root;
  try {
    for (const systemPrompt of [undefined, {}, { section: () => { throw new Error('synthetic failure'); } }]) {
      let route;
      const ctx = { on() {}, effect: fn => fn(), inject: (names, fn) => fn({ effect: callback => callback(), systemPrompt }),
        webServer: { register: value => { route = value; return () => {}; } }, sessionController: { create: async () => {} } };
      await apply(ctx, { enabled: true });
      const { token } = JSON.parse(await readFile(path.join(root, 'wanxiang/probe3-access.json'), 'utf8'));
      const req = Readable.from([JSON.stringify({ action: 'create' })]);
      req.method = 'POST';
      req.headers = { 'x-wanxiang-probe': token };
      let result;
      await route.handler(req, { writeHead: status => assert.equal(status, 200), end: text => { result = JSON.parse(text); } });
      assert.equal(result.sectionAvailable, false);
      assert.equal(result.effectiveMode, 'hint');
      assert.match(result.warning, /仅提示/);
    }
  } finally {
    if (savedHome === undefined) delete process.env.DSH_HOME;
    else process.env.DSH_HOME = savedHome;
    await rm(root, { recursive: true, force: true });
  }
});
