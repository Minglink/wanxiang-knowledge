import { readFile, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';

const base = process.argv[2];
const step = process.argv[3];
if (!base || !step) throw new Error('Usage: <local Host URL> create|turn|seed|compact|read [marker]');
if (!['127.0.0.1', 'localhost'].includes(new URL(base).hostname)) throw new Error('Local Host only');
const directory = path.resolve('dist/phase3-probes');
await mkdir(directory, { recursive: true });
const access = JSON.parse(await readFile(path.join(process.env.DSH_HOME || path.join(os.homedir(), '.dsh'), 'wanxiang/probe3-access.json'), 'utf8'));
const call = async data => {
  const response = await fetch(new URL('/__wanxiang-phase3-probe', base), { method: 'POST', headers: { 'content-type': 'application/json', 'x-wanxiang-probe': access.token }, body: JSON.stringify(data), signal: AbortSignal.timeout(15000) });
  const result = await response.json();
  if (!response.ok) throw new Error(result.error);
  return result;
};
if (step === 'create') {
  const result = await call({ action: 'create' });
  await writeFile(path.join(directory, 'session.json'), JSON.stringify(result, null, 2));
  console.log(result);
} else {
  const { id } = JSON.parse(await readFile(path.join(directory, 'session.json'), 'utf8'));
  if (step === 'seed') console.log(await call({ action: 'seed', id }));
  else {
    const before = await call({ action: 'read', id });
    if (step === 'turn') console.log(await call({ action: 'prompt', id, marker: process.argv[4] || '',
      text: process.argv.includes('--long') ? 'Synthetic archive context: retain source files and verify backups before rebuilding local indexes. '.repeat(10) : '' }));
    if (['compact', 'quality'].includes(step)) console.log(await call({ action: step, id }));
    let result;
    const start = performance.now();
    do {
      result = await call({ action: 'read', id });
      const ended = result.records.filter(row => row.type === 'turn/end').length > before.records.filter(row => row.type === 'turn/end').length;
      const compacted = result.jobs.length > before.jobs.length && result.jobs.at(-1).status !== 'running';
      if (step === 'read' || step === 'turn' && ended && result.status !== 'running' || ['compact', 'quality'].includes(step) && compacted) break;
      if (performance.now() - start > 150000) throw new Error('Probe timed out; do not retry blindly');
      await new Promise(resolve => setTimeout(resolve, 1000));
    } while (true);
    const stamp = new Date().toISOString().replace(/[:.]/g, '-');
    await writeFile(path.join(directory, stamp + '-' + step + '.json'), JSON.stringify(result, null, 2));
    console.log(JSON.stringify({ status: result.status, jobs: result.jobs, records: result.records.slice(before.records.length).filter(row => ['prompt-admission', 'section', 'pre-step', 'user/message', 'agent/inbox/spliced'].includes(row.type)),
      responses: result.events.filter(event => event.type === 'assistant/message').slice(-1).map(event => ({ text: event.data.message.content.filter(block => block.type === 'text').map(block => block.text).join(''), usage: event.data.usage })),
      summaries: result.events.filter(event => event.type.startsWith('compaction/')).map(event => ({ type: event.type, seq: event.seq })) }, null, 2));
  }
}
