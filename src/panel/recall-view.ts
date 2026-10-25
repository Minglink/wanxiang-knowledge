const escape = (value: unknown) => String(value ?? '').replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]!));
const reasons: Record<string, string> = {
  privacy_pending: '首次隐私说明待确认', pending: '检索中', not_ready: '缓存未就绪，该步未注入',
  ready: '已就绪，等待后续模型步骤', injected: '已供给本轮上下文', below_threshold: '相关度未达阈值',
  no_match: '没有命中', short: '请求过短', confirmation: '纯确认', command: '纯命令', timeout: '超过召回预算，已放弃',
  worker_busy: '检索槽忙，本次放弃', cancelled: '已取消', error: '检索失败',
};
const localDate = (value: string) => new Date(value).toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai', hour12: false });
export function recallRows(rows: any[], compact = false) {
  if (!rows.length) return '<div class="idle">暂无召回记录</div>';
  return rows.map(row => `<article class="wx-recall-row"><div class="section-head"><strong>${escape(row.injected ? '本轮引用了 ' + row.entryIds.length + ' 条知识' : row.entryIds.length ? '发现 ' + row.entryIds.length + ' 条相关知识' : '本轮未引用知识')}</strong><small>${escape(reasons[row.reason] || row.reason)} · ${Number(row.latencyMs).toFixed(1)}ms</small></div>
    <p class="muted">${escape(localDate(row.at))} · 用户seq ${escape(row.seq)}${row.citedIds?.length ? ' · 回答中引用 ' + row.citedIds.length + ' 条' : ''}${row.missedSteps ? ' · 未就绪跳过 ' + Number(row.missedSteps) + ' 步' : ''}</p>
    ${!compact ? '<p>' + escape(row.query) + '</p>' : ''}
    ${(row.entries || row.entryIds.map((id: string) => ({ id }))).map((entry: any) => `<div class="wx-recall-item"><button class="text-btn" data-action="entry" data-id="${escape(entry.id)}">${escape(entry.title || entry.id)}</button>
      <button class="btn" data-action="recall-feedback" data-recall="${escape(row.id)}" data-entry="${escape(entry.id)}" data-value="${row.feedback?.[entry.id] === 'useful' ? 'none' : 'useful'}">${row.feedback?.[entry.id] === 'useful' ? '✓ ' : ''}有用</button>
      <button class="btn" data-action="recall-feedback" data-recall="${escape(row.id)}" data-entry="${escape(entry.id)}" data-value="${row.feedback?.[entry.id] === 'useless' ? 'none' : 'useless'}">${row.feedback?.[entry.id] === 'useless' ? '✓ ' : ''}无用</button>
      <button class="btn" data-action="recall-block" data-entry="${escape(entry.id)}">屏蔽条目</button>
      ${entry.project ? '<button class="btn" data-action="recall-block-project" data-project="' + escape(entry.project) + '">屏蔽项目</button>' : ''}</div>`).join('')}
    ${row.entryIds.length ? '<button class="btn" data-action="recall-copy" data-recall="' + escape(row.id) + '">复制引用，自行粘贴后采用</button>' : ''}</article>`).join('');
}
export function recallPage(page: any, compact = false) {
  return `<section class="wx-recall-panel"><h3>${compact ? '本轮知识引用' : '召回记录'}</h3>${recallRows(page.items, compact)}${!compact ? `<div class="wx-log-pages"><button class="btn" data-action="recall-prev" ${page.offset === 0 ? 'disabled' : ''}>上一页</button><span>${page.offset + (page.items.length ? 1 : 0)}–${page.offset + page.items.length} / ${page.total}</span><button class="btn" data-action="recall-next" ${page.offset + page.items.length >= page.total ? 'disabled' : ''}>下一页</button></div>` : ''}</section>`;
}
