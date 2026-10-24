// Independent Cordis probe plugin. Default off; only in-memory databases.
import { mkdir, writeFile } from 'node:fs/promises';
import initSqlJs from 'sql.js';

export const name = 'wanxiang-engine-probe';
export async function apply(ctx, config = {}) {
  if (config.enabled !== true) return;
  const result = {
    node: process.version,
    electron: process.versions.electron || null,
    nodeSqlite: false,
    nodeFts5: false,
    sqlJsFts5: false,
  };
  let native;
  try {
    const { DatabaseSync } = await import('node:sqlite');
    native = new DatabaseSync(':memory:');
    result.nodeSqlite = true;
    native.exec('CREATE VIRTUAL TABLE t USING fts5(x)');
    native.prepare('INSERT INTO t(x) VALUES (?)').run('synthetic 索引');
    result.nodeFts5 = native.prepare("SELECT count(*) AS n FROM t WHERE t MATCH 'synthetic'").get().n === 1;
  } catch (error) {
    result.nodeError = error.message;
  } finally {
    native?.close();
  }
  const SQL = await initSqlJs();
  const wasm = new SQL.Database();
  try {
    wasm.run('CREATE VIRTUAL TABLE t USING fts5(x)');
    result.sqlJsFts5 = true;
  } catch (error) {
    result.sqlJsError = error.message;
  } finally {
    wasm.close();
  }
  ctx.logger.info(JSON.stringify(result));
  await mkdir('dist/v02-probes', { recursive: true });
  const suffix = process.versions.electron ? 'electron' : 'node';
  await writeFile(`dist/v02-probes/engine-${suffix}.json`, JSON.stringify(result, null, 2));
  return result;
}

if (process.argv.includes('--run')) {
  // This is a plugin process using the actual installed Cordis in Electron mode.
  if (process.versions.electron) {
    const { pathToFileURL } = await import('node:url');
    const path = await import('node:path');
    const app = process.env.WANXIANG_HARNESS_DIR || path.join(process.env.LOCALAPPDATA, 'Programs', 'DeepSeek Harness');
    const url = pathToFileURL(path.join(app, 'resources/app.asar/dsh/node_modules/@deepseek-ai/cordis/lib/index.js'));
    const { Context } = await import(url.href);
    const ctx = new Context();
    await apply(ctx, { enabled: true });
  } else {
    await apply({ logger: { info: console.log } }, { enabled: true });
  }
}
