import type { Host, Snapshot } from './types.js';
import { redacted } from './knowledge-prompts.js';

export interface ModelChoice { provider: string; model: string }
export interface ModelCatalog {
  models: (ModelChoice & { name: string })[];
  defaultModel?: ModelChoice;
  warning?: string;
}
export function modelChoice(value: unknown): ModelChoice | null {
  if (value == null) return null;
  if (typeof value !== 'object') throw new Error('无效整理模型');
  const input = value as ModelChoice;
  for (const key of ['provider', 'model'] as const) {
    if (typeof input[key] !== 'string' || !input[key].trim() || input[key].length > 200 || /[\u0000-\u001f]/.test(input[key])) throw new Error('无效整理模型');
  }
  return { provider: input.provider, model: input.model };
}

async function bounded<T>(work: Promise<T>, milliseconds = 3000): Promise<T> {
  let timer: ReturnType<typeof setTimeout>;
  try { return await Promise.race([work, new Promise<never>((_resolve, reject) => { timer = setTimeout(() => reject(new Error('模型目录读取超时')), milliseconds); })]); }
  finally { clearTimeout(timer!); }
}

/** Uses advertised metadata only. Never reads provider configuration or credentials. */
export async function hostModelCatalog(llm: any, defaults?: any): Promise<ModelCatalog> {
  if (typeof llm?.listProviders !== 'function' || typeof llm?.listModels !== 'function') {
    return { models: [], warning: '宿主未提供模型目录，仍可跟随宿主模型。' };
  }
  const models: ModelCatalog['models'] = [];
  let failed = false;
  try {
    const providers = await bounded(Promise.resolve(llm.listProviders()));
    await Promise.all((providers as any[]).map(async provider => {
      try {
        const rows = await bounded(Promise.resolve(llm.listModels(provider.id)));
        for (const row of rows as any[]) {
          const choice = modelChoice({ provider: row.provider, model: row.id });
          if (choice && !models.some(item => item.provider === choice.provider && item.model === choice.model)) {
            models.push({ ...choice, name: redacted(String(row.name || row.id)).slice(0, 200) });
          }
        }
      } catch { failed = true; }
    }));
  } catch { failed = true; }
  let defaultModel: ModelChoice | undefined;
  try { defaultModel = modelChoice(defaults?.currentSelection?.()) || undefined; } catch { /* Optional default metadata. */ }
  return { models: models.sort((a, b) => a.provider.localeCompare(b.provider) || a.name.localeCompare(b.name)),
    defaultModel, ...(failed ? { warning: '部分宿主模型目录暂不可读取；已指定模型不会自动回退。' } : {}) };
}

export async function organizeModel(host: Host, selected: unknown, fallback?: Snapshot['model']) {
  const choice = modelChoice(selected);
  if (!choice) return fallback;
  if (!host.listModels) throw new Error('无法核验指定整理模型，请重新选择或改为跟随宿主。');
  const catalog = await host.listModels();
  if (!catalog.models.some(item => item.provider === choice.provider && item.model === choice.model)) {
    throw new Error('指定整理模型已不可用，请重新选择或改为跟随宿主。');
  }
  return choice;
}
