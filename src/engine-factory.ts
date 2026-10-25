import path from 'node:path';
import { NodeSqliteEngine } from './node-sqlite-engine.js';
import { SqlJsEngine } from './sqljs-engine.js';
import type { IndexEngine } from './index-engine.js';

export async function createEngine(root: string, persist: (data: Uint8Array) => Promise<void>, native = true): Promise<{ engine: IndexEngine; warning?: string }> {
  if (native) {
    try {
      const engine = new NodeSqliteEngine(path.join(root, '.wanxiang', 'index.db'));
      await engine.init();
      return { engine };
    } catch { /* Capability/import/open failure never prevents the compatible engine. */ }
  }
  const engine = new SqlJsEngine(persist);
  await engine.init();
  return { engine, warning: '当前宿主不支持全文检索，大规模场景受限' };
}
