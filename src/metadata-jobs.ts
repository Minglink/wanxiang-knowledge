import { atomic, json, hash } from './store.js';
import type { KnowledgeService } from './service.js';
import { metadataPrompt, metadataFields, redacted, TEMPLATE } from './knowledge-prompts.js';

export class MetadataJobs {
  status: 'idle' | 'running' | 'paused' | 'complete' | 'failed' = 'idle';
  error = '';
  private controller?: AbortController;
  private pending?: Promise<void>;
  constructor(private owner: KnowledgeService) {}
  start() {
    if (this.status === 'running') return;
    this.controller = new AbortController();
    this.status = 'running'; this.error = '';
    this.pending = this.run(this.controller.signal).catch(error => { this.status = this.controller?.signal.aborted ? 'paused' : 'failed'; this.error = redacted(String(error.message)); });
  }
  cancel() { this.controller?.abort(); }
  async stop() { this.cancel(); await this.pending; }
  async run(signal: AbortSignal) {
    const store = this.owner.store;
    const progressFile = store.local('.wanxiang', 'metadata-progress.json');
    const checkpoint = await json<Record<string, string>>(progressFile, {});
    let processed = 0;
    for (const metadata of store.entries.values()) {
      signal.throwIfAborted();
      if ((await this.owner.host.listSessions()).some(session => session.running)) { this.status = 'paused'; return; }
      if (this.owner.store !== store) throw new Error('知识目录已切换，补全已停止');
      const entry = store.read(metadata.id);
      const key = hash(JSON.stringify([TEMPLATE, entry.generatedHash, entry.body]));
      if (checkpoint[entry.id] === key || entry.l0 && entry.l1 && (entry.questions?.length || 0) >= 3 && !entry.metadataPending) continue;
      if (!this.owner.host.generate) throw new Error('宿主模型不可用');
      const raw = await this.owner.host.generate({ id: 'metadata-' + entry.id, title: redacted(entry.title), lastSeq: 1,
        messages: [{ seq: 1, role: 'user', text: redacted(JSON.stringify({ title: entry.title, type: entry.type, body: entry.body })) }] }, metadataPrompt, signal, () => {});
      signal.throwIfAborted();
      let value;
      try { value = JSON.parse(raw.trim().replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '')); }
      catch { throw new Error('补全模型格式无效，可重试'); }
      const fields = metadataFields(value, entry.body);
      if (fields.metadataPending) throw new Error('补全缺少摘要或3到5条问法，可重试');
      await this.owner.mutations.run(async () => {
        signal.throwIfAborted();
        if (this.owner.store !== store) throw new Error('知识目录已切换');
        const current = store.read(entry.id);
        if (hash(JSON.stringify(current)) !== hash(JSON.stringify(entry))) throw new Error('条目在补全期间已修改，请重试');
        await atomic(store.local('.wanxiang', 'revisions', entry.id + '-metadata-' + Date.now() + '.json'), JSON.stringify(current));
        await store.save({ ...current, ...fields });
        await store.flush();
        checkpoint[entry.id] = key;
        await atomic(progressFile, JSON.stringify(checkpoint));
      });
      if (++processed >= 20) { this.status = 'paused'; return; }
    }
    this.status = 'complete';
  }
}
