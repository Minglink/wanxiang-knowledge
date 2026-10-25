import type { Tool } from './types.js';
import { classifyTool } from './tool-categories.js';

export function toolRecordFields(input: Partial<Tool>, old: Tool | undefined, tools: Tool[], id: string) {
  const categoryMode = input.categoryMode || old?.categoryMode || (input.category ? 'manual' : 'auto');
  if (!['auto', 'manual'].includes(categoryMode)) throw new Error('分类方式无效');
  const hostToolName = input.hostToolName ?? old?.hostToolName ?? '';
  if (typeof hostToolName !== 'string' || hostToolName.length > 200 || /[\u0000-\u001f]/.test(hostToolName)) {
    throw new Error('宿主调用名无效');
  }
  if (hostToolName && tools.some(tool => tool.id !== id && tool.hostToolName === hostToolName)) {
    throw new Error('此宿主工具已登记，请编辑已有条目');
  }
  return {
    categoryMode, hostToolName,
    category: (categoryMode === 'auto' ? classifyTool(input) : String(input.category || '自定义')).slice(0, 60),
  };
}
