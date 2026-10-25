const esc = (value: unknown) => String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));
export function searchControls(mode: string, rewrite: boolean, invalid: boolean, after = '', before = '') {
  return `<div class="wx-search-controls"><label class="wx-search-field">检索模式 <select id="wx-search-mode"><option value="exact" ${mode === 'exact' ? 'selected' : ''}>精确</option><option value="hybrid" ${mode === 'hybrid' ? 'selected' : ''}>混合关键词（无向量）</option><option value="deep" ${mode === 'deep' ? 'selected' : ''}>深度正文</option></select></label><label class="wx-search-field"><input id="wx-search-rewrite" type="checkbox" ${rewrite ? 'checked' : ''}>智能改写（发送查询给宿主模型，800ms超时回退）</label><label class="wx-search-field"><input id="wx-search-invalid" type="checkbox" ${invalid ? 'checked' : ''}>包含失效</label><label class="wx-search-field">更新自 <input id="wx-search-after" type="date" value="${esc(after)}"></label><label class="wx-search-field">更新至 <input id="wx-search-before" type="date" value="${esc(before)}"></label><button data-action="aliases-edit" class="btn">配置别名表</button></div>`;
}
export function highlighted(text: string, query: string) {
  const words = query.trim().split(/\s+/).filter(Boolean).sort((a, b) => b.length - a.length).slice(0, 12);
  if (!words.length) return esc(text);
  const pattern = new RegExp(words.map(word => word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|'), 'giu');
  let result = '', cursor = 0;
  for (const match of text.matchAll(pattern)) {
    result += esc(text.slice(cursor, match.index)) + '<mark>' + esc(match[0]) + '</mark>';
    cursor = match.index! + match[0].length;
  }
  return result + esc(text.slice(cursor));
}
export function searchResults(page: any, query: string) {
  const cards = page.items.map((entry: any) => `<button class="entry" data-action="entry" data-id="${esc(entry.id)}"><span class="entry-text"><strong>${highlighted(entry.title, query)}</strong><small>${highlighted(entry.excerpt || entry.body || '', query)}</small><small>关键词 · ${esc(entry.tier)} · ${entry.valid ? '有效' : '已失效'} · 分数 ${Number(entry.score).toFixed(4)}</small></span></button>`).join('');
  return `<div class="wx-search-result"><p>${page.total} 条候选 · ${esc(page.engine)}${page.truncated ? ' · 候选已截断，请缩小范围' : ''}</p><div class="entries">${cards || '<p>没有命中，尝试其他问法或补全条目问法。</p>'}</div><div class="wx-log-pages"><button class="btn" data-action="search-prev" ${page.offset === 0 ? 'disabled' : ''}>上一页</button><span>${page.offset + (page.items.length ? 1 : 0)}–${page.offset + page.items.length}</span><button class="btn" data-action="search-next" ${page.offset + page.items.length >= page.total ? 'disabled' : ''}>下一页</button></div></div>`;
}
