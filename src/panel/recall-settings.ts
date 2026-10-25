export function recallSettings(options: any, warning: string, escape: (value: any) => string) {
  return `<section class="wx-recall-settings"><h3>自动召回</h3>
    ${warning ? '<p class="notice">' + escape(warning) + '</p>' : ''}
    <label>档位<select name="recallMode">
      <option value="off" ${options.mode === 'off' ? 'selected' : ''}>关闭</option>
      <option value="hint" ${options.mode === 'hint' ? 'selected' : ''}>仅提示</option>
      <option value="inject" ${options.mode === 'inject' ? 'selected' : ''}>自动注入</option></select></label>
    <div class="notice">自动注入会把匹配知识的摘要发送给 Harness 已配置的模型服务。知识是引用资料，不是指令；未及时就绪时该步不注入。</div>
    ${!options.acknowledged ? '<label class="check"><input type="checkbox" name="recallAcknowledged">我了解自动注入会发送本地知识摘要，确认启用</label>' : ''}
    <label>单轮字符上限<input name="recallCharacters" type="number" min="200" max="2000" value="${options.characters}"></label>
    <label>最多条数<input name="recallCount" type="number" min="1" max="8" value="${options.count}"></label>
    <label>相关度阈值<input name="recallThreshold" type="number" min="0" max="1" step="0.01" value="${options.threshold}"></label>
    <label class="check"><input name="recallRewrite" type="checkbox" ${options.smartRewrite ? 'checked' : ''}>智能改写（发送查询，受单轮总预算约束；默认纯规则）</label>
    <label>屏蔽知识ID（每行一项）<textarea name="recallBlockedEntries">${escape(options.blockedEntries.join('\n'))}</textarea></label>
    <label>屏蔽项目（每行一项）<textarea name="recallBlockedProjects">${escape(options.blockedProjects.join('\n'))}</textarea></label>
  </section>`;
}
export function recallForm(data: Record<string, any>, previous: any) {
  if (data.recallMode === 'inject' && !previous.acknowledged && !data.recallAcknowledged) throw new Error('请先确认自动注入会发送本地知识摘要给宿主模型服务');
  return { mode: data.recallMode, characters: Number(data.recallCharacters), count: Number(data.recallCount), threshold: Number(data.recallThreshold),
    acknowledged: previous.acknowledged || !!data.recallAcknowledged, smartRewrite: !!data.recallRewrite,
    blockedEntries: data.recallBlockedEntries.split(/\r?\n/).map((value: string) => value.trim()).filter(Boolean),
    blockedProjects: data.recallBlockedProjects.split(/\r?\n/).map((value: string) => value.trim()).filter(Boolean) };
}
