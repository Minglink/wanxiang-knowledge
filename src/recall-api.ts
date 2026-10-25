import type { KnowledgeService } from './service.js';
import { recallTemplate } from './recall-template.js';

export async function recallApi(service: KnowledgeService, method: string, action: string, data: any, parameters: URLSearchParams) {
  if (method === 'GET' && action === 'recall') {
    const page = await service.recallLog.page(service.store.root, Number(parameters.get('offset')), Number(parameters.get('limit') || 20), parameters.get('sessionId') || '');
    return { ...page, items: page.items.map(row => ({ ...row, entries: row.entryIds.map(id => {
      const entry = service.store.entries.get(id);
      return { id, title: entry?.title || id, project: entry?.project || '' };
    }) })) };
  }
  if (method !== 'POST') throw new Error('无效召回操作');
  if (action === 'recall/block') {
    const options = service.recall.options();
    const value = String(data.entryId || data.project || '');
    if (!value || value.length > 500) throw new Error('无效屏蔽对象');
    const key = data.entryId ? 'blockedEntries' : 'blockedProjects';
    return service.updateSettings({ recall: { ...options, [key]: [...new Set([...options[key], value])] } });
  }
  return service.mutations.run(async () => {
    if (action === 'recall/feedback') return service.recallLog.feedback(service.store.root, String(data.id), String(data.entryId), String(data.value));
    if (action === 'recall/copy') {
      const row = await service.recallLog.read(service.store.root, String(data.id));
      const options = service.recall.options();
      const entries = row.entryIds.flatMap(id => {
        const entry = service.store.entries.get(id);
        return entry && !entry.archived && !entry.invalidAt && !options.blockedEntries.includes(id) && !options.blockedProjects.includes(entry.project) ? [entry] : [];
      }).slice(0, options.count);
      return recallTemplate(entries, options.characters);
    }
    throw new Error('无效召回操作');
  });
}
