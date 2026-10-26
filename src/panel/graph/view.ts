import { ActivityFeed } from './activity-feed.js';
import { activityNames } from './activity-layer.js';
import type { GraphActivityEvent } from '../../graph-activity.js';
import type { GraphData, GraphNode } from '../../graph.js';
import type { Layout } from './layouts.js';
import { CanvasGraph, graphColors } from './canvas.js';

const esc = (value: unknown) => String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));
const names: Record<string, string> = { note: '笔记', method: '方法', pitfall: '踩坑', project: '项目' };
export interface GraphViewState { layout: Layout; selected: string; text: string; kinds: Set<string>; networkRotation: number; activityEnabled?: boolean }
export const newGraphState = (): GraphViewState => ({ layout: 'sphere', networkRotation: 0, selected: '', text: '', kinds: new Set(Object.keys(names)) });
export function graphMarkup(title = '知识图谱') {
  return `<section class="wx-graph" aria-label="${esc(title)}"><div class="wx-graph-head"><h2>${esc(title)}</h2><span class="wx-graph-loading">正在读取本地关系…</span></div></section>`;
}

export class GraphView {
  private engine?: CanvasGraph;
  private feed?: ActivityFeed;
  private raw?: GraphData;
  private activityEvents: GraphActivityEvent[] = [];
  private reloading = false;
  private lifetime = new AbortController();
  private data?: GraphData;
  private cluster = '';
  private revision = 0;
  private listLimit = 200;

  constructor(private element: HTMLElement, private state: GraphViewState,
    private load: (cluster?: string, offset?: number, snapshot?: string) => Promise<GraphData>, private open: (id: string) => void,
    private expand?: () => void) {}

  async mount(cluster = '') {
    this.cluster = cluster;
    const revision = ++this.revision;
    let raw = await this.load(cluster);
    raw = { ...raw, nodes: [...raw.nodes], edges: [...raw.edges] };
    while (raw.nextOffset != null) {
      if (this.lifetime.signal.aborted || revision !== this.revision) return;
      const status = this.element.querySelector('.wx-graph-loading,.wx-graph-count');
      if (status) status.textContent = `正在加载真实节点：${raw.nodes.length} / ${raw.total}`;
      const offset = raw.nextOffset;
      const next = await this.load(cluster, offset, raw.snapshot);
      if (next.snapshot !== raw.snapshot || next.total !== raw.total || next.nextOffset != null && next.nextOffset <= offset) throw new Error('图谱数据已更新，请重新加载');
      raw.nodes.push(...next.nodes); for(const edge of next.edges) raw.edges.push(edge); raw.nextOffset = next.nextOffset;
      // Yield between responses so the loading status and the rest of the app remain usable.
      await new Promise(resolve => setTimeout(resolve, 0));
    }
    if (this.lifetime.signal.aborted || revision !== this.revision) return;
    this.engine?.destroy();
    this.engine = undefined;
    this.raw = raw;
    this.data = raw;
    const data = this.data;
    if (!this.feed) {
      this.feed = new ActivityFeed(this.element, (page, reset) => {
        if (reset) {
          this.activityEvents = [];
          this.engine?.activity.marks.clear();
        }
        this.activityEvents = [...this.activityEvents, ...page.events].filter(event => Date.now() - event.at < 12000).slice(-128);
        this.updateActivity();
        const writes = page.events.some(event => event.kind === 'write');
        if ((reset || writes) && !this.reloading) {
          this.reloading = true;
          void this.mount(this.cluster).catch(error => this.error(error)).finally(() => { this.reloading = false; });
        }
      });
      this.feed.start();
    }
    if (!data.nodes.length) {
      this.element.innerHTML = '<h2>知识图谱</h2><div class="empty"><strong>暂无关系图谱</strong><p>保存知识后，这里显示真实知识条目与关系。</p></div>';
      return;
    }
    this.element.innerHTML = `<h2>${esc(this.element.getAttribute('aria-label') || '知识图谱')}</h2><div class="wx-graph-toolbar">
      <div class="wx-graph-layout"><button type="button" data-graph-action="sphere">球体</button><button type="button" data-graph-action="network">网络</button></div>
      <input class="wx-graph-search" aria-label="搜索图谱节点" placeholder="高亮标题或标签…" value="${esc(this.state.text)}">
      <label class="wx-graph-activity-toggle wx-lemon-activity-toggle" title="柠檬黄表示实际注入、AI读取或落库；两端均活跃的已有连线同步变黄"><input type="checkbox" data-graph-activity ${this.activityEnabled() ? 'checked' : ''}>金色活动</label>
      <button type="button" data-graph-action="reset">重置视角</button><button type="button" data-graph-action="export">导出 PNG</button>
      ${this.expand ? '<button type="button" data-graph-action="expand">展开</button>' : ''}
      ${cluster ? '<button type="button" data-graph-action="back">返回全部簇</button>' : ''}
      </div><div class="wx-graph-rotation" hidden>
      <label>网络旋转 <input type="range" min="-180" max="180" step="1" value="0" aria-label="网络旋转角度"><output>0°</output></label>
      <span>Shift＋拖拽旋转 · 普通拖拽平移 · 滚轮缩放</span>
      </div><div class="wx-graph-legend">${Object.entries(names).map(([kind, name]) => `<button type="button" data-graph-kind="${kind}" aria-pressed="${this.state.kinds.has(kind)}"><i style="background:${graphColors[kind]}"></i>${name} ${data.nodes.filter(n=>n.kind===kind).length}</button>`).join('')}</div>
      <p class="wx-graph-activity-status" aria-live="polite">等待知识使用事件</p><p class="wx-graph-count">${raw.total} 个条目 · 已加载 ${data.nodes.length} 个真实节点 · ${data.edges.length} 条关系 · ${raw.clusters.length} 个分组</p>
      <div class="wx-graph-body"><canvas class="wx-graph-canvas" aria-label="知识关系图；下方节点列表提供等价键盘操作"></canvas>
      <aside class="wx-graph-info" aria-live="polite">点击节点查看关联信息</aside></div>
      <details class="wx-graph-list"><summary>节点列表（可用键盘打开）</summary><div data-graph-list></div><button type="button" data-graph-action="more-list">继续显示节点</button></details>`;
    this.engine = new CanvasGraph(this.element.querySelector('canvas')!, data, id => this.select(id), this.open);
    this.engine.setLayout(this.state.layout);
    this.engine.setNetworkRotation(this.state.networkRotation);
    this.applyFilter();
    this.updateLayout();
    this.updateActivity();
    if (this.state.selected && data.nodes.some(node => node.id === this.state.selected)) this.engine.focus(this.state.selected);
    // Listeners are installed once on the stable container, even after cluster drill-down.
    if (!this.element.dataset.wxBound) {
      this.element.dataset.wxBound = '1';
      this.element.addEventListener('click', this.click, { signal: this.lifetime.signal });
      this.element.addEventListener('wx-graph-rotate', event => {
        this.state.networkRotation = (event as CustomEvent<number>).detail;
        this.updateRotation();
      }, { signal: this.lifetime.signal });
      this.element.addEventListener('change', event => {
        const target = event.target as HTMLInputElement;
        if (!target.matches('[data-graph-activity]')) return;
        this.state.activityEnabled = target.checked;
        try { localStorage.setItem('wanxiang.graph.activity', String(target.checked)); } catch { /* Optional local preference. */ }
        this.updateActivity();
      }, { signal: this.lifetime.signal });
      this.element.addEventListener('input', event => {
        if ((event.target as HTMLElement).matches('.wx-graph-rotation input')) {
          this.engine?.setNetworkRotation(Number((event.target as HTMLInputElement).value));
        }
        if ((event.target as HTMLElement).matches('.wx-graph-search')) {
          this.state.text = (event.target as HTMLInputElement).value; this.applyFilter();
        }
      }, { signal: this.lifetime.signal });
    }
  }

  private activityEnabled() {
    if (this.state.activityEnabled !== undefined) return this.state.activityEnabled;
    try { return localStorage.getItem('wanxiang.graph.activity') !== 'false'; } catch { return true; }
  }
  private updateActivity() {
    if (!this.raw) return;
    this.engine?.setActivity(this.activityEvents, this.raw, this.activityEnabled());
    const status = this.element.querySelector('.wx-graph-activity-status');
    if (!status) return;
    const latest = this.activityEvents.at(-1);
    status.textContent = !this.activityEnabled() ? '金色活动已关闭' : latest
      ? `${activityNames[latest.kind]} · ${latest.entryIds.length} 条 · ${new Date(latest.at).toLocaleTimeString()}` : '等待知识使用事件';
  }
  focus(id: string) { this.engine?.focus(id); }
  destroy() { this.feed?.stop(); this.revision++; this.lifetime.abort(); this.engine?.destroy(); delete this.element.dataset.wxBound; }
  private applyFilter() {
    this.engine?.setFilter(this.state.text, this.state.kinds);
    const rows = this.data?.nodes.filter(node => this.state.kinds.has(node.kind) && (!this.state.text || (node.title + ' ' + node.tags.join(' ')).toLocaleLowerCase().includes(this.state.text.toLocaleLowerCase()))) || [];
    const list = this.element.querySelector('[data-graph-list]');
    if (list) list.innerHTML = rows.slice(0,this.listLimit).map(node=>`<button type="button" data-graph-node="${esc(node.id)}">${esc(node.title)}<small>${names[node.kind]} · ${esc(node.status)}</small></button>`).join('');
    const more = this.element.querySelector<HTMLButtonElement>('[data-graph-action="more-list"]');
    if (more) { more.hidden = rows.length <= this.listLimit; more.textContent = `继续显示节点（${Math.min(rows.length,this.listLimit)} / ${rows.length}）`; }
  }
  private updateRotation() {
    const control = this.element.querySelector<HTMLInputElement>('.wx-graph-rotation input');
    const output = this.element.querySelector<HTMLOutputElement>('.wx-graph-rotation output');
    const degrees = Math.round(this.state.networkRotation);
    if (control) control.value = String(degrees);
    if (output) output.value = degrees + '°';
  }
  private updateLayout() {
    const controls = this.element.querySelector<HTMLElement>('.wx-graph-rotation');
    if (controls) controls.hidden = this.state.layout !== 'network';
    this.updateRotation();
    for (const button of this.element.querySelectorAll<HTMLButtonElement>('[data-graph-action="sphere"],[data-graph-action="network"]')) button.setAttribute('aria-pressed', String(button.dataset.graphAction === this.state.layout));
  }
  private select(id: string) {
    this.state.selected = id;
    const node = this.data!.nodes.find(item => item.id === id)!;
    const cluster = id.startsWith('cluster:');
    this.element.querySelector('.wx-graph-info')!.innerHTML = `<strong>${esc(node.title)}</strong><p>${cluster ? '聚合簇' : names[node.kind]} · ${esc(node.status)}</p><p>${esc(node.project || '未分配项目')}</p><small>更新：${esc(node.updatedAt || '未记录')}<br>关联数量：${node.degree}</small>
      ${this.activityDetail(id)}<button type="button" data-graph-open="${esc(id)}">${cluster ? '展开成员' : '打开详情'}</button>`;
  }
  private activityDetail(id: string) {
    const mark = this.engine?.activity.marks.get(id);
    return mark ? `<p class="wx-graph-activity-detail">${activityNames[mark.kind]} · ${esc(new Date(mark.at).toLocaleTimeString())}</p>` : '';
  }
  private click = (event: Event) => {
    const button = (event.target as HTMLElement).closest<HTMLButtonElement>('button');
    if (!button) return;
    const action = button.dataset.graphAction;
    if (action === 'more-list') { this.listLimit += 200; this.applyFilter(); }
    if (action === 'sphere' || action === 'network') { this.state.layout = action; this.engine?.setLayout(action); this.updateLayout(); if (this.state.selected) this.engine?.focus(this.state.selected); }
    if (action === 'reset') this.engine?.reset();
    if (action === 'export') this.engine?.exportPNG();
    if (action === 'expand') this.expand?.();
    if (action === 'back') void this.mount().catch(error => this.error(error));
    if (button.dataset.graphKind) {
      const kind = button.dataset.graphKind;
      if (this.state.kinds.has(kind)) this.state.kinds.delete(kind); else this.state.kinds.add(kind);
      button.setAttribute('aria-pressed', String(this.state.kinds.has(kind))); this.applyFilter();
    }
    if (button.dataset.graphNode) this.engine?.focus(button.dataset.graphNode);
    if (button.dataset.graphOpen) {
      const id = button.dataset.graphOpen;
      if (id.startsWith('cluster:')) {
        const cluster = id.slice('cluster:'.length);
        if (cluster === this.cluster) { this.element.querySelector('.wx-graph-info')!.append(' 此簇仍过大，请用项目/类型筛选缩小范围。'); return; }
        void this.mount(cluster).catch(error => this.error(error));
      } else this.open(id);
    }
  };
  private error(error: unknown) { const target = this.element.querySelector('.wx-graph-info'); if (target) target.textContent = String(error); }
}
