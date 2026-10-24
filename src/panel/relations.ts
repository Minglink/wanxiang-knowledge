const escape = (value: unknown) => String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));
export function relatedMarkup(relations: any) {
  const links = (nodes: any[], tool: boolean) => nodes.map(node => `<button type="button" class="text-btn" data-action="${tool ? 'tool-detail' : 'entry'}" data-id="${escape(tool ? node.id.slice(5) : node.id)}">${escape(node.title)}</button>`).join(' ');
  return `<section class="wx-related"><h3>关联工具</h3><div>${relations.tools.length ? links(relations.tools, true) : '<span class="muted">暂无关联工具</span>'}</div><h3>相关知识</h3><div>${relations.knowledge.length ? links(relations.knowledge, false) : '<span class="muted">暂无相关知识</span>'}</div><button type="button" class="btn" data-action="graph-locate">在图谱中定位</button></section>`;
}
