import { modelChoice } from './model-selection.js';
import { recallOptions } from './recall-options.js';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { Store, atomic, json } from './store.js';
import type { Job, Settings } from './types.js';

type Pending = Record<string, { title: string; updatedAt: string }>;
interface SettingsOwner {
  settings: Settings;
  store: Store;
  jobs: Job[];
  pending: Pending;
  configFile: string;
}

// Stage every fallible operation before publishing the new in-memory state.
export async function switchSettings(owner: SettingsOwner, input: Partial<Settings>) {
  if (owner.jobs.some(job => ['running', 'queued'].includes(job.status))) {
    throw new Error('落库运行期间不能修改设置');
  }
  if (input.mode !== undefined && !['ai', 'export'].includes(input.mode)) {
    throw new Error('无效生成模式');
  }
  if (input.autoQueue !== undefined && typeof input.autoQueue !== 'boolean') {
    throw new Error('无效待落库设置');
  }
  if (input.root !== undefined && (typeof input.root !== 'string' || !path.isAbsolute(input.root))) {
    throw new Error('请输入绝对路径');
  }
  const settings: Settings = {
    root: path.resolve(input.root ?? owner.settings.root),
    mode: input.mode ?? owner.settings.mode,
    autoQueue: input.autoQueue ?? owner.settings.autoQueue,
    ...(input.organizeModel !== undefined || owner.settings.organizeModel !== undefined
      ? { organizeModel: modelChoice(input.organizeModel !== undefined ? input.organizeModel : owner.settings.organizeModel) } : {}),
    ...(input.recall || owner.settings.recall ? {recall: recallOptions({...owner.settings.recall,...input.recall})} : {}),
  };
  let staged: Store | undefined;
  let jobs = owner.jobs;
  let pending = owner.pending;
  try {
    if (settings.root !== owner.settings.root) {
      staged = new Store(settings.root);
      await staged.init();
      const fileWarnings = staged.warnings.filter(warning => !warning.includes('大规模场景受限'));
      if (fileWarnings.length) throw new Error('目标知识库文件损坏：' + fileWarnings.join('；'));
      if (!Array.isArray(staged.tools) || staged.tools.some(tool => !tool || typeof tool.id !== 'string' || typeof tool.name !== 'string' || !Array.isArray(tool.linkedIds))) {
        throw new Error('目标工具目录无效');
      }
      pending = await json<Pending>(staged.local('.wanxiang', 'pending.json'), {});
      if (!pending || Array.isArray(pending) || typeof pending !== 'object' || Object.values(pending).some(item => !item || typeof item.title !== 'string' || typeof item.updatedAt !== 'string')) {
        throw new Error('目标待落库数据无效');
      }
      jobs = [];
      for (const file of await fs.readdir(staged.local('.wanxiang', 'jobs'))) {
        if (!file.endsWith('.json')) continue;
        const job = await json<Job | null>(staged.local('.wanxiang', 'jobs', file), null);
        if (!job || typeof job.id !== 'string' || typeof job.createdAt !== 'string' || !Array.isArray(job.entryIds) || !['queued', 'running', 'failed', 'success', 'skipped', 'cancelled'].includes(job.status)) {
          throw new Error('目标任务记录无效');
        }
        if (['running', 'queued'].includes(job.status)) throw new Error('目标知识库存在未完成任务，请重启插件恢复后使用');
        jobs.push(job);
      }
      jobs.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    }
    // Atomic rename is the durable commit. Failure leaves both config and owner intact.
    await atomic(owner.configFile, JSON.stringify(settings, null, 2));
  } catch (error) {
    if (staged?.db) staged.close();
    throw error;
  }
  const previous = owner.store;
  owner.settings = settings;
  owner.store = staged ?? previous;
  owner.jobs = jobs;
  owner.pending = pending;
  // No await between publication fields. Closing a superseded connection cannot roll back a committed config.
  if (staged) {
    try { previous.close(); }
    catch { staged.warnings.push('旧索引连接关闭失败；新目录与设置已成功提交'); }
  }
  return settings;
}
