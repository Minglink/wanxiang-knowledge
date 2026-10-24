// Metadata-only observer; never sends text or discovers credentials/providers.
export const name = 'wanxiang-embedding-probe';
export function inspectEmbedding(llm) {
  const methods = new Set();
  for (let proto = llm; proto && proto !== Object.prototype; proto = Object.getPrototypeOf(proto)) {
    for (const key of Object.getOwnPropertyNames(proto)) {
      const descriptor = Object.getOwnPropertyDescriptor(proto, key);
      if (typeof descriptor?.value === 'function') methods.add(key);
    }
  }
  const embeddingMethods = [...methods].filter(key => /embed/i.test(key)).sort();
  return { servicePresent: !!llm, prepareCall: typeof llm?.prepareCall === 'function', embeddingMethods,
    supported: embeddingMethods.length > 0,
    enabled: embeddingMethods.length === 0 ? false : null };
}
export function apply(ctx, config = {}) {
  if (config.enabled !== true) return;
  const result = inspectEmbedding(ctx.llm);
  ctx.logger.info(JSON.stringify(result));
  return result;
}
if (process.argv.includes('--run')) {
  const path = await import('node:path');
  const { pathToFileURL } = await import('node:url');
  const { mkdir, writeFile } = await import('node:fs/promises');
  const app = process.env.WANXIANG_HARNESS_DIR || path.join(process.env.LOCALAPPDATA, 'Programs', 'DeepSeek Harness');
  const load = name => import(pathToFileURL(path.join(app, 'resources/app.asar/dsh/node_modules/@deepseek-ai', name, 'lib/index.js')).href);
  const { Context } = await load('cordis');
  const { LlmRuntime } = await load('dsh-llm');
  const ctx = new Context();
  new LlmRuntime(ctx);
  const result = apply(ctx, { enabled: true });
  await mkdir('dist/v02-probes', { recursive: true });
  await writeFile('dist/v02-probes/embedding.json', JSON.stringify(result, null, 2));
  console.log(JSON.stringify(result));
}
