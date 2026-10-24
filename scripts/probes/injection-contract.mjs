// Run using installed Electron in Node mode, never inside the extracted tree.
// No provider/network call; only synthetic in-memory host services.
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { apply as observe } from './injection-observer.mjs';

if (!process.argv.includes('--run')) {
  console.log('Injection probe disabled; pass --run in an isolated host runtime.');
} else {
  const app = process.env.WANXIANG_HARNESS_DIR || path.join(process.env.LOCALAPPDATA, 'Programs', 'DeepSeek Harness');
  const installed = path.join(app, 'resources/app.asar/dsh/node_modules/@deepseek-ai');
  const load = name => import(pathToFileURL(path.join(installed, name, 'lib/index.js')).href);
  const { Context } = await load('cordis');
  const { SystemPrompt, renderPrompt } = await load('dsh-system-prompt');
  const { Session, SESSION_FORMAT_VERSION } = await load('dsh-session');
  const { createUserMessage, createSystemMessage } = await load('dsh-llm');
  const ctx = new Context();
  const prompt = new SystemPrompt(ctx, { includeHarnessIdentity: false });
  let registrations = 0;
  observe({ on: () => registrations++ });
  assert.equal(registrations, 0);
  observe(ctx, { enabled: true });
  let text = 'synthetic marker A';
  const dispose = prompt.section({ name: 'wanxiang:probe', order: 10300, interpolate: false, text: () => text });
  const first = renderPrompt(await prompt.assemble());
  assert.equal(first, text);
  text = 'synthetic marker B {{not_a_variable}}';
  const second = renderPrompt(await prompt.assemble());
  assert.equal(second, text);
  const session = Session.create('wanxiang-probe', undefined, {
    version: SESSION_FORMAT_VERSION, id: 'wanxiang-probe', createdAt: 1, isSeeded: false,
  });
  session.append('system/message', { turn: 1, step: 1, message: createSystemMessage('synthetic stable system head') }, { surfaceOp: 'append' });
  const marker = session.append('system/message', { turn: 1, step: 2, message: createSystemMessage(second) }, { surfaceOp: 'append' });
  const user = session.append('user/message', createUserMessage({ content: [{ type: 'text', text: 'synthetic user' }], source: { kind: 'user' } }), { surfaceOp: 'append' });
  // Exercise exactly the host's positional replacement used by compaction,
  // without invoking a summarizer or claiming a real-model compact test.
  session.append('user/message', createUserMessage({ content: [{ type: 'text', text: 'synthetic checkpoint without marker' }], source: { kind: 'compact-checkpoint' } }), {
    surfaceOp: { op: 'replace', startSeq: marker.seq, endSeq: user.seq },
    sourceEventSeqs: [marker.seq, user.seq],
  });
  assert.equal(session.surface.nodes.includes(marker.seq), false);
  assert.ok(session.snapshotEvents().some(e => e.type === 'system/message'));
  assert.equal(renderPrompt(await prompt.assemble()), second);
  dispose();
  assert.equal(renderPrompt(await prompt.assemble()), '');
  const result = {
    runtime: process.version, electron: process.versions.electron,
    observerDefaultOff: true, dynamicSection: true, literalBracesPreserved: true,
    sessionEventVisible: true, replacedMarkerLeftSurface: true,
    replacedMarkerRetainedInLog: true, nextAssemblyRestoresSection: true,
    limits: ['No live provider call', 'No actual KV cache measurements', 'No production plugin reload', 'Host loop commit path inspected in source; not executed here'],
  };
  await mkdir('dist/v02-probes', { recursive: true });
  await writeFile('dist/v02-probes/injection.json', JSON.stringify(result, null, 2));
  console.log(JSON.stringify(result, null, 2));
  // The isolated process owns the root Context; the prompt contribution is disposed above.
}
