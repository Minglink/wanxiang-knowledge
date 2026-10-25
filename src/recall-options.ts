export type RecallMode = 'off' | 'hint' | 'inject';
export interface RecallOptions {
  mode: RecallMode;
  characters: number;
  count: number;
  threshold: number;
  acknowledged: boolean;
  smartRewrite: boolean;
  blockedEntries: string[];
  blockedProjects: string[];
}
export function recallOptions(input: Partial<RecallOptions> = {}): RecallOptions {
  const options = { mode: 'inject', characters: 800, count: 5, threshold: 0.65,
    acknowledged: false, smartRewrite: false, blockedEntries: [], blockedProjects: [], ...input } as RecallOptions;
  if (!['off', 'hint', 'inject'].includes(options.mode)) throw new Error('无效自动召回档位');
  for (const [value, min, max] of [[options.characters, 200, 2000], [options.count, 1, 8], [options.threshold, 0, 1]]) {
    if (!Number.isFinite(value) || value < min || value > max) throw new Error('无效自动召回预算或阈值');
  }
  if (!Number.isInteger(options.characters) || !Number.isInteger(options.count)) throw new Error('召回预算和条数必须为整数');
  if (typeof options.acknowledged !== 'boolean' || typeof options.smartRewrite !== 'boolean') throw new Error('无效召回开关');
  for (const values of [options.blockedEntries, options.blockedProjects]) {
    if (!Array.isArray(values) || values.length > 10000 || values.some(value => typeof value !== 'string' || value.length > 500)) throw new Error('无效召回屏蔽列表');
  }
  return options;
}
