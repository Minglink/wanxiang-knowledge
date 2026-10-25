// Explicit temporary production probe package, separate from the product package.
import { build } from 'esbuild';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
if (!process.argv.includes('--run')) {
  console.log('Disabled. Pass --run to build the synthetic-session-only probe.');
} else {
  const directory = path.resolve('dist/phase3-probe-package');
  await mkdir(directory, { recursive: true });
  await build({ stdin: { contents: "export {name,inject} from './scripts/probes/production-injection.mjs'; import {apply as probe} from './scripts/probes/production-injection.mjs'; export const apply=ctx=>probe(ctx,{enabled:true});", resolveDir: process.cwd() }, outfile: path.join(directory, 'index.js'), bundle: true, platform: 'node', format: 'esm', target: 'node22' });
  await writeFile(path.join(directory, 'package.json'), JSON.stringify({ name: 'dsh-wanxiang-injection-probe', version: '0.0.1', type: 'module', main: './index.js', files: ['index.js', 'cordis.patch.yml'], dsh: { id: 'dsh-wanxiang-injection-probe', name: '万象第3期临时探针', version: '0.0.1', bundle: { patch: './cordis.patch.yml' } } }, null, 2));
  await writeFile(path.join(directory, 'cordis.patch.yml'), '- insert:\n    - id: dsh-wanxiang-injection-probe\n      name: dsh-wanxiang-injection-probe\n');
  console.log(directory);
}
