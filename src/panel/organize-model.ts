import type { ModelCatalog, ModelChoice } from '../model-selection.js';
const esc = (value: unknown) => String(value ?? '').replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]!));
export function organizeModelField(catalog: ModelCatalog, selected?: ModelChoice | null) {
  const value = selected ? JSON.stringify([selected.provider, selected.model]) : '';
  const available = catalog.models.some(item => selected?.provider === item.provider && selected?.model === item.model);
  return `<label>AI 整理模型<select name="organizeModel" aria-label="AI 整理模型"><option value="">跟随宿主模型（来源会话优先）</option>
    ${selected && !available ? `<option selected value="${esc(value)}">${esc(selected.provider + ' / ' + selected.model)} · 当前不可用</option>` : ''}
    ${catalog.models.map(item => { const key = JSON.stringify([item.provider, item.model]); return `<option value="${esc(key)}" ${key === value ? 'selected' : ''}>${esc(item.name + ' · ' + item.provider)}</option>`; }).join('')}</select>
    <small>仅用于 AI 落库整理，不改变当前对话模型。跟随时沿用来源会话模型，无记录则用宿主默认；指定模型不可用会报错，不会静默替换。</small>
    ${catalog.warning ? `<small>${esc(catalog.warning)}</small>` : ''}</label>`;
}
export function parseOrganizeModel(value: string) {
  if (!value) return null;
  const [provider, model] = JSON.parse(value);
  return { provider, model };
}
