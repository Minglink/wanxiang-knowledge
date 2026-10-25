import type { ToolDirectory, DirectoryEntry } from '../tool-directory.js';
import { toolCategories } from '../tool-categories.js';

const esc = (value: unknown) => String(value ?? '').replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]!));

export function toolAvailability(entry: DirectoryEntry) {
  if (entry.environmentStatus === '可用') return { tone: 'ready', label: '环境检测可用' };
  if (['不可用', '检测失败'].includes(entry.environmentStatus || '')) {
    return { tone: 'failed', label: '环境' + entry.environmentStatus };
  }
  return { tone: 'unknown', label: entry.environmentStatus || '环境未检测' };
}

function toolLabel(entry: DirectoryEntry) {
  const availability = toolAvailability(entry);
  return `<li data-tool-entry="${esc(entry.key)}"><button type="button" class="wx-tool-status-label wx-tool-status-${availability.tone}"
    data-tool-key="${esc(entry.key)}" title="${esc(availability.label + (entry.description ? ' · ' + entry.description : ''))}">
    <i aria-hidden="true"></i>${esc(entry.name)}</button></li>`;
}

export function directoryPage(directory: ToolDirectory, sessions: { id: string; title: string }[], scope: string) {
  const available = directory.groups.flatMap(group => group.items).filter(entry => entry.environmentStatus === '可用').length;
  return `<div class="section-head"><div><h2>工具库</h2><p class="muted">${available} / ${directory.total} 项检测可用 · 支持添加工具和自动分类</p></div>
    <div class="actions"><button class="btn" data-tool-refresh>刷新工具</button><button class="btn primary" data-action="tool-new">添加工具</button></div></div>
    ${directory.groups.length ? `<div class="wx-tool-status-list">${directory.groups.map(group => `<section class="wx-tool-status-row">
      <h3>${esc(group.category)}</h3><ul class="wx-tool-status-items">${group.items.map(toolLabel).join('')}</ul>
      <span class="wx-tool-status-count" title="上次检测可用 / 全部条目">${group.items.filter(entry => entry.environmentStatus === '可用').length}/${group.items.length}</span>
    </section>`).join('')}</div>`
      : '<div class="empty"><strong>暂无工具条目</strong><p>刷新宿主工具，或添加自己的工具记录。</p></div>'}`;

}

export function directoryDraft(entry: DirectoryEntry, saved: any[]) {
  const existing = saved.find(tool => tool.id === entry.toolId);
  if (existing) return existing;
  return {
    name: entry.name, category: entry.category, categoryMode: 'auto', type: '宿主工具',
    hostToolName: entry.hostToolName, notes: entry.description, linkedIds: [],
  };
}

export function directoryFormFields(tool: any, directory?: ToolDirectory) {
  const mode = tool ? tool.categoryMode || 'manual' : 'auto';
  return `<div class="wx-tool-detail-state"><p>${esc(tool?.status ? '环境：' + tool.status : '环境未检测')}${tool?.version ? ` · ${esc(tool.version)}` : ''}</p>
    ${tool?.id && tool?.detector ? `<button type="button" class="text-btn" data-action="tool-detect" data-id="${esc(tool.id)}">检测版本</button>` : ''}</div>
    <label>分类方式<select name="categoryMode"><option value="auto" ${mode === 'auto' ? 'selected' : ''}>自动分类</option><option value="manual" ${mode === 'manual' ? 'selected' : ''}>自定义分类</option></select></label>`;
}

export function syncDirectoryForm(form: HTMLFormElement) {
  const mode = form.querySelector<HTMLSelectElement>('[name="categoryMode"]');
  const category = form.querySelector<HTMLInputElement>('[name="category"]');
  if (!mode || !category) return;
  category.readOnly = mode.value === 'auto';
  category.placeholder = mode.value === 'auto' ? '保存时根据名称与用途自动分类' : '输入自己的分类';
}

export const categoryOptions = () => [...toolCategories, '开发工具', '调试分析', '数据处理', '文档工具', 'AI/MCP', '自定义'].map(category => `<option>${category}</option>`).join('');
