import type { GraphData, GraphNode } from '../../graph.js';
import type { Layout } from './layouts.js';
import { CanvasGraph, graphColors } from './canvas.js';
import { aggregateGraph } from './aggregate.js';

const esc = (value: unknown) => String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));
const names: Record<string, string> = { note: '笔记', method: '方法', pitfall: '踩坑', project: '项目' };
export interface GraphViewState { layout: Layout; selected: string; text: string; kinds: Set<string>; networkRotation: number }
export const newGraphState = (): GraphViewState => ({ layout: 'sphere', networkRotation: 0, selected: '', text: '', kinds: new Set(Object.keys(names)) });
export function graphMarkup(title = '知识图谱') {
  return `<section class="wx-graph" aria-label="${esc(title)}"><div class="wx-graph-head"><h2>${esc(title)}</h2><span class="wx-graph-loading">正在读取本地关系…</span></div></section>`;
}

export class GraphView {
  private engine?: CanvasGraph;
  private lifetime = new AbortController();
  private data?: GraphData;
  private cluster = '';
  private revision = 0;

  constructor(private element: HTMLElement, private state: GraphViewState,
    private load: (cluster?: string) => Promise<GraphData>, private open: (id: string) => void,
    private expand?: () => void) {}

  async mount(cluster = '') {
    this.cluster = cluster;
    const revision = ++this.revision;
    const raw = await this.load(cluster);
    if (this.lifetime.signal.aborted || revision !== this.revision) return;
    this.engine?.destroy();
    const located = raw.truncated && !this.state.selected.startsWith('cluster:') && raw.nodes.some(node => node.id === this.state.selected);
    if (located) {
      // Explicit locate is a semantic zoom into a bounded neighborhood, not the whole graph.
      const nodes = raw.nodes.slice(0, 300);
      const ids = new Set(nodes.map(node => node.id));
      this.data = { ...raw, nodes, edges: raw.edges.filter(edge => ids.has(edge.s) && ids.has(edge.t)), truncated: false };
    } else this.data = aggregateGraph(raw);
    const data = this.data;
    if (!data.nodes.length) {
      this.element.innerHTML = '<h2>知识图谱</h2><div class="empty"><strong>暂无关系图谱</strong><p>保存知识后，这里显示真实知识条目与关系。</p></div>';
      return;
    }
    if (data.nodes.length > 1500) {
      this.element.innerHTML = '<h2>知识图谱</h2><div class="empty"><strong>簇数量过多</strong><p>请先按项目或类型缩小范围。</p></div>';
      return;
    }
    this.element.innerHTML = `<h2>${esc(this.element.getAttribute('aria-label') || '知识图谱')}</h2><div class="wx-graph-toolbar">
      <div class="wx-graph-layout"><button type="button" data-graph-action="sphere">球体</button><button type="button" data-graph-action="network">网络</button></div>
      <input class="wx-graph-search" aria-label="搜索图谱节点" placeholder="高亮标题或标签…" value="${esc(this.state.text)}">
      <button type="button" data-graph-action="reset">重置视角</button><button type="button" data-graph-action="export">导出 PNG</button>
      ${this.expand ? '<button type="button" data-graph-action="expand">展开</button>' : ''}
      ${cluster ? '<button type="button" data-graph-action="back">返回全部簇</button>' : ''}
      </div><div class="wx-graph-rotation" hidden>
      <label>网络旋转 <input type="range" min="-180" max="180" step="1" value="0" aria-label="网络旋转角度"><output>0°</output></label>
      <span>Shift＋拖拽旋转 · 普通拖拽平移 · 滚轮缩放</span>
      </div><div class="wx-graph-legend">${Object.entries(names).map(([kind, name]) => `<button type="button" data-graph-kind="${kind}" aria-pressed="${this.state.kinds.has(kind)}"><i style="background:${graphColors[kind]}"></i>${name}</button>`).join('')}</div>
      <p class="wx-graph-count">${raw.total} 个条目 · 当前 ${data.nodes.length} 个${!located && (raw.truncated || raw.nodes.length > 1500) ? '簇节点（点击展开成员）' : '节点'} · ${data.edges.length} 条可见关系 · ${raw.clusters.length} 个簇${located ? ' · 定位视图（邻域样本）' : ''}${raw.truncated ? ' · 已截断；关系为返回样本，按项目/类型筛选可缩小范围' : ''}</p>
      <div class="wx-graph-body"><canvas class="wx-graph-canvas" aria-label="知识关系图；下方节点列表提供等价键盘操作"></canvas>
      <aside class="wx-graph-info" aria-live="polite">点击节点查看关联信息</aside></div>
      <details class="wx-graph-list"><summary>节点列表（可用键盘打开）</summary><div>${data.nodes.map(node => `<button type="button" data-graph-node="${esc(node.id)}">${esc(node.title)}<small>${names[node.kind]} · ${esc(node.status)}</small></button>`).join('')}</div></details>`;
    this.engine = new CanvasGraph(this.element.querySelector('canvas')!, data, id => this.select(id), this.open);
    this.engine.setLayout(this.state.layout);
    this.engine.setNetworkRotation(this.state.networkRotation);
    this.applyFilter();
    this.updateLayout();
    if (this.state.selected && data.nodes.some(node => node.id === this.state.selected)) this.engine.focus(this.state.selected);
    // Listeners are installed once on the stable container, even after cluster drill-down.
    if (!this.element.dataset.wxBound) {
      this.element.dataset.wxBound = '1';
      this.element.addEventListener('click', this.click, { signal: this.lifetime.signal });
      this.element.addEventListener('wx-graph-rotate', event => {
        this.state.networkRotation = (event as CustomEvent<number>).detail;
        this.updateRotation();
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

  focus(id: string) { this.engine?.focus(id); }
  destroy() { this.revision++; this.lifetime.abort(); this.engine?.destroy(); delete this.element.dataset.wxBound; }
  private applyFilter() {
    this.engine?.setFilter(this.state.text, this.state.kinds);
    for (const button of this.element.querySelectorAll<HTMLButtonElement>('[data-graph-node]')) {
      const node = this.data?.nodes.find(item => item.id === button.dataset.graphNode);
      button.hidden = !!node && (!this.state.kinds.has(node.kind) || !!this.state.text && !(node.title + ' ' + node.tags.join(' ')).toLocaleLowerCase().includes(this.state.text.toLocaleLowerCase()));
    }
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
      <button type="button" data-graph-open="${esc(id)}">${cluster ? '展开成员' : '打开详情'}</button>`;
  }
  private click = (event: Event) => {
    const button = (event.target as HTMLElement).closest<HTMLButtonElement>('button');
    if (!button) return;
    const action = button.dataset.graphAction;
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
  private error(error: unknown) { this.element.querySelector('.wx-graph-info')!.textContent = String(error); }
}
