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
    data-tool-key="${esc(entry.key)}" title="${esc(availability.label + ' · ' + entry.status + (entry.description ? ' · ' + entry.description : ''))}">
    <i aria-hidden="true"></i>${esc(entry.name)}</button></li>`;
}

export function directoryPage(directory: ToolDirectory, sessions: { id: string; title: string }[], scope: string) {
  return `<div class="section-head"><div><h2>工具库</h2><p class="muted">按用途自动分类，支持手动调整。分类数字：当前范围已注册 / 全部条目。</p></div>
    <div class="actions"><button class="btn" data-tool-refresh>刷新工具</button><button class="btn primary" data-action="tool-new">添加工具</button></div></div>
    <div class="wx-tool-scope"><label>工具可见范围 <select aria-label="工具可见范围" id="wx-tool-scope"><option value="">宿主全局</option>
    ${sessions.map(session => `<option value="${esc(session.id)}" ${scope === session.id ? 'selected' : ''}>${esc(session.title)}</option>`).join('')}</select></label>
    <span>${directory.callable} 个已注册 · ${directory.total} 个条目</span></div>
    <p class="muted small">包含插件和 MCP 提供的工具能力。绿色表示上次环境检测可用，灰色表示未确认，警示色表示检测异常；数量为已注册 / 全部。实际调用仍受会话权限限制。</p>
    ${directory.discovery.warning ? `<p class="warning">${esc(directory.discovery.warning)}</p>` : ''}
    ${directory.groups.length ? `<div class="wx-tool-status-list">${directory.groups.map(group => `<section class="wx-tool-status-row">
      <h3>${esc(group.category)}</h3><ul class="wx-tool-status-items">${group.items.map(toolLabel).join('')}</ul>
      <span class="wx-tool-status-count" title="当前范围已注册 / 全部条目">${group.callable}/${group.items.length}</span>
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
  const entry = directory?.groups.flatMap(group => group.items).find(item => tool?.id ? item.toolId === tool.id : item.hostToolName === tool?.hostToolName);
  return `<div class="wx-tool-detail-state"><p>${esc(entry?.status || '手动登记')}${tool?.status ? ` · 环境：${esc(tool.status)}` : ''}${tool?.version ? ` · ${esc(tool.version)}` : ''}</p>
    ${tool?.id && tool?.detector ? `<button type="button" class="text-btn" data-action="tool-detect" data-id="${esc(tool.id)}">检测版本</button>` : ''}</div>
    <label>分类方式<select name="categoryMode"><option value="auto" ${mode === 'auto' ? 'selected' : ''}>自动分类</option><option value="manual" ${mode === 'manual' ? 'selected' : ''}>自定义分类</option></select></label>
    <label>宿主调用名（可选）<input name="hostToolName" value="${esc(tool?.hostToolName)}" list="wx-host-tool-names" maxlength="200" placeholder="绑定已注册工具，或只登记本机软件">
    <datalist id="wx-host-tool-names">${directory?.groups.flatMap(group => group.items).filter(entry => entry.callable).map(entry => `<option value="${esc(entry.hostToolName)}">${esc(entry.name)}</option>`).join('') || ''}</datalist>
    <small>只绑定当前真实注册的能力；填写名字不会安装软件或创建调用接口。</small></label>`;
}

export function syncDirectoryForm(form: HTMLFormElement) {
  const mode = form.querySelector<HTMLSelectElement>('[name="categoryMode"]');
  const category = form.querySelector<HTMLInputElement>('[name="category"]');
  if (!mode || !category) return;
  category.readOnly = mode.value === 'auto';
  category.placeholder = mode.value === 'auto' ? '保存时根据名称与用途自动分类' : '输入自己的分类';
}

export const categoryOptions = () => [...toolCategories, '开发工具', '调试分析', '数据处理', '文档工具', 'AI/MCP', '自定义'].map(category => `<option>${category}</option>`).join('');
