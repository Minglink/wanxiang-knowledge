import { GoldActivityLayer } from './activity-layer.js';
import type { GraphActivityEvent } from '../../graph-activity.js';
import type { GraphData, GraphNode, GraphEdge } from '../../graph.js';
import { rotatePoint, rotatedExtent, rotationRadians } from './network-transform.js';
import { LabelPlacer } from './labels.js';
import { HitGrid, type HitPoint } from './spatial.js';
import { NetworkLayout, sphereLayout, arc, type Layout, type Particle } from './layouts.js';

export const graphColors: Record<string, string> = { note: '#3563ff', method: '#168881', pitfall: '#dc8b25', project: '#9258c5', tool: '#3d779d' };
export class CanvasGraph {
  readonly activity = new GoldActivityLayer();
  private activityTimer?: ReturnType<typeof setTimeout>;
  layout: Layout = 'sphere';
  selected = '';
  hover = '';
  frames = 0;
  drawMs = 0;
  private ctx: CanvasRenderingContext2D;
  private network: NetworkLayout;
  private sphere: Particle[];
  private networkAngle = 0;
  private networkCenter = { x: 0, y: 0 };
  private networkExtent = { x: 200, y: 150 };
  private nodes: Map<string, GraphNode>;
  private neighbors = new Map<string, Set<string>>();
  private positions = new Map<string, HitPoint>();
  private grid = new HitGrid();
  private frame = 0;
  private lifetime = new AbortController();
  private resize: ResizeObserver;
  private motion = matchMedia('(prefers-reduced-motion: reduce)');
  private width = 600;
  private height = 360;
  private zoom = 1;
  private pan = { x: 0, y: 0 };
  private yaw = 0;
  private pitch = 0;
  private velocity = { x: 0, y: 0 };
  private target?: { yaw: number; pitch: number };
  private drag?: { x: number; y: number; startX: number; startY: number; node?: string; rotate: boolean; moved: boolean };
  private text = '';
  private secondRing = false;
  private kinds = new Set(Object.keys(graphColors));
  private edges: GraphEdge[];
  private bridges = new Set<GraphEdge>();
  private networkEdges: GraphEdge[];

  constructor(public canvas: HTMLCanvasElement, public data: GraphData, private select: (id: string) => void, private open: (id: string) => void) {
    this.ctx = canvas.getContext('2d')!;
    this.nodes = new Map(data.nodes.map(node => [node.id, node]));
    this.network = new NetworkLayout(data.nodes, data.edges);
    // Warm up before fitting, so the opening view includes the settled graph.
    for (let i = 0; i < 80; i++) this.network.tick();
    const particles = this.network.particles;
    if (particles.length) {
      const minX = Math.min(...particles.map(p => p.x));
      const maxX = Math.max(...particles.map(p => p.x));
      const minY = Math.min(...particles.map(p => p.y));
      const maxY = Math.max(...particles.map(p => p.y));
      this.networkCenter = { x: (minX + maxX) / 2, y: (minY + maxY) / 2 };
      this.networkExtent = { x: Math.max(100, (maxX - minX) * 0.6), y: Math.max(100, (maxY - minY) * 0.6) };
    }
    this.sphere = sphereLayout(data.nodes);
    for (const edge of data.edges) {
      for (const [s, t] of [[edge.s, edge.t], [edge.t, edge.s]]) {
        const values = this.neighbors.get(s) || new Set<string>();
        values.add(t); this.neighbors.set(s, values);
      }
    }
    // Weak edges are visually sampled at medium scale, selected edges are always restored.
    const rankedEdges = [...data.edges].sort((a, b) => b.w - a.w);
    const bridges = rankedEdges.filter(edge => this.nodes.get(edge.s)?.cluster !== this.nodes.get(edge.t)?.cluster).slice(0, 60);
    this.bridges = new Set(bridges);
    this.networkEdges = data.nodes.length > 300 ? rankedEdges.slice(0, data.nodes.length * 2) : data.edges;
    this.edges = data.nodes.length > 300
      ? [...new Set([...bridges, ...rankedEdges.slice(0, data.nodes.length * 2)])] : data.edges;
    const options = { signal: this.lifetime.signal };
    canvas.addEventListener('pointerdown', this.pointerDown, options);
    canvas.addEventListener('pointermove', this.pointerMove, options);
    canvas.addEventListener('pointerup', this.pointerUp, options);
    canvas.addEventListener('pointercancel', this.pointerUp, options);
    canvas.addEventListener('pointerleave', () => { if (!this.drag) { this.hover = ''; this.wake(); } }, options);
    canvas.addEventListener('dblclick', event => {
      const point = this.point(event), id = this.grid.hit(point.x, point.y);
      if (id) { this.focus(id); this.secondRing = true; this.zoom = Math.min(3, this.zoom * 1.2); this.wake(); }
    }, options);
    canvas.addEventListener('wheel', event => {
      event.preventDefault();
      const point = this.point(event), before = this.zoom;
      this.zoom = Math.max(0.2, Math.min(5, this.zoom * Math.exp(-event.deltaY * 0.001)));
      if (this.layout === 'network') {
        const ratio = this.zoom / before;
        this.pan.x = point.x - this.width / 2 - (point.x - this.width / 2 - this.pan.x) * ratio;
        this.pan.y = point.y - this.height / 2 - (point.y - this.height / 2 - this.pan.y) * ratio;
      }
      this.wake();
    }, { ...options, passive: false });
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) { cancelAnimationFrame(this.frame); this.frame = 0; }
      else this.wake();
    }, options);
    this.motion.addEventListener('change', () => { this.target = undefined; this.velocity = { x: 0, y: 0 }; this.wake(); }, options);
    this.resize = new ResizeObserver(() => this.measure());
    this.resize.observe(canvas);
    this.measure();
  }

  setActivity(events: GraphActivityEvent[], raw: GraphData, enabled: boolean) {
    this.activity.enabled = enabled;
    this.activity.accept(events, this.data, raw);
    clearTimeout(this.activityTimer);
    if (enabled && this.activity.marks.size) {
      const end = Math.min(...[...this.activity.marks.values()].map(mark => mark.at + 12000));
      this.activityTimer = setTimeout(() => this.wake(), Math.max(1, end - Date.now() + 10));
    }
    this.wake();
  }
  setLayout(layout: Layout) { this.layout = layout; this.wake(); }
  setFilter(text: string, kinds: Set<string>) { this.text = text.toLocaleLowerCase(); this.kinds = kinds; this.wake(); }
  setNetworkRotation(degrees: number) {
    this.networkAngle = rotationRadians(degrees);
    this.canvas.dispatchEvent(new CustomEvent('wx-graph-rotate', {
      bubbles: true, detail: this.networkAngle * 180 / Math.PI,
    }));
    this.wake();
  }
  reset() { this.setNetworkRotation(0); this.zoom = 1; this.pan = { x: 0, y: 0 }; this.yaw = 0; this.pitch = 0; this.target = undefined; this.velocity = { x: 0, y: 0 }; this.wake(); }
  focus(id: string) {
    if (!this.nodes.has(id)) return;
    this.selected = id;
    this.secondRing = false;
    const particle = this.sphere.find(p => p.id === id);
    if (particle && this.layout === 'sphere') {
      let yaw = -Math.atan2(particle.x, particle.z);
      while (yaw - this.yaw > Math.PI) yaw -= Math.PI * 2;
      while (yaw - this.yaw < -Math.PI) yaw += Math.PI * 2;
      this.target = { yaw, pitch: Math.atan2(particle.y, Math.hypot(particle.x, particle.z)) };
      if (this.motion.matches) { this.yaw = yaw; this.pitch = this.target.pitch; this.target = undefined; }
    } else if (this.layout === 'network') {
      const p = this.network.particles.find(point => point.id === id)!;
      const point = this.networkPoint(p);
      this.pan = { x: -point.x * this.networkScale(), y: -point.y * this.networkScale() };
    }
    this.select(id); this.wake();
  }
  exportPNG() { const link = document.createElement('a'); link.download = '万象知识图谱.png'; link.href = this.canvas.toDataURL('image/png'); link.click(); }
  destroy() { clearTimeout(this.activityTimer); cancelAnimationFrame(this.frame); this.lifetime.abort(); this.resize.disconnect(); }
  private point(event: MouseEvent) { const rect = this.canvas.getBoundingClientRect(); return { x: event.clientX - rect.left, y: event.clientY - rect.top }; }
  private measure() {
    const rect = this.canvas.getBoundingClientRect();
    this.width = Math.max(1, rect.width); this.height = Math.max(1, rect.height);
    const dpr = Math.min(devicePixelRatio || 1, 3);
    this.canvas.width = this.width * dpr; this.canvas.height = this.height * dpr;
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0); this.wake();
  }
  private wake() { if (!this.frame && !document.hidden) this.frame = requestAnimationFrame(this.draw); }
  private networkPoint(point: { x: number; y: number }) {
    return rotatePoint({ x: point.x - this.networkCenter.x, y: point.y - this.networkCenter.y }, this.networkAngle);
  }
  private networkScale() {
    const extent = rotatedExtent(this.networkExtent, this.networkAngle);
    return Math.min(Math.max(80, this.width - 100) / (extent.x * 2),
      Math.max(80, this.height - 60) / (extent.y * 2)) * this.zoom;
  }
  private spherePoint(p: { x: number; y: number; z: number }) {
    const x = p.x * Math.cos(this.yaw) + p.z * Math.sin(this.yaw);
    const z0 = p.z * Math.cos(this.yaw) - p.x * Math.sin(this.yaw);
    const y = p.y * Math.cos(this.pitch) - z0 * Math.sin(this.pitch);
    const z = p.y * Math.sin(this.pitch) + z0 * Math.cos(this.pitch);
    const radius = Math.min(this.width, this.height) * 0.35 * this.zoom;
    const scale = 2.8 / (2.8 - z);
    return { x: this.width / 2 + x * radius * scale, y: this.height / 2 + y * radius * scale, depth: z, scale };
  }
  private active(id: string) {
    const node = this.nodes.get(id)!;
    return this.kinds.has(node.kind) && (!this.text || (node.title + ' ' + node.tags.join(' ')).toLocaleLowerCase().includes(this.text));
  }
  private related(id: string) {
    const focus = this.hover || this.selected;
    if (!focus || id === focus || this.neighbors.get(focus)?.has(id)) return true;
    return this.secondRing && [...(this.neighbors.get(focus) || [])].some(neighbor => this.neighbors.get(neighbor)?.has(id));
  }
  private draw = (time: number) => {
    this.frame = 0;
    const started = performance.now(), ctx = this.ctx;
    if (!this.canvas.isConnected || document.hidden) return;
    if (this.layout === 'network') {
      const iterations = this.motion.matches ? 100 : 2;
      for (let i = 0; i < iterations; i++) this.network.tick(this.drag?.node);
    } else if (!this.motion.matches) {
      if (this.target) {
        this.yaw += (this.target.yaw - this.yaw) * 0.12;
        this.pitch += (this.target.pitch - this.pitch) * 0.12;
        if (Math.abs(this.target.yaw - this.yaw) + Math.abs(this.target.pitch - this.pitch) < 0.001) this.target = undefined;
      } else if (!this.drag) {
        this.yaw += this.velocity.x + (this.selected ? 0 : 0.0012);
        this.pitch += this.velocity.y;
        this.velocity.x *= 0.94; this.velocity.y *= 0.94;
      }
    }
    ctx.globalAlpha = 1;
    const background = ctx.createLinearGradient(0, 0, this.width, this.height);
    background.addColorStop(0, '#ffffff'); background.addColorStop(1, '#f4f8ff');
    ctx.fillStyle = background; ctx.fillRect(0, 0, this.width, this.height);
    if (this.layout === 'sphere') this.drawGlobe();
    const particles = this.layout === 'sphere' ? this.sphere : this.network.particles;
    const projected = particles.map(p => {
      const rotated = this.layout === 'network' ? this.networkPoint(p) : p;
      const point = this.layout === 'sphere' ? this.spherePoint(p) : {
        x: this.width / 2 + rotated.x * this.networkScale() + this.pan.x,
        y: this.height / 2 + rotated.y * this.networkScale() + this.pan.y, depth: 0, scale: 1,
      };
      const node = this.nodes.get(p.id)!;
      return { ...point, id: p.id, radius: (this.layout === 'network' ? Math.min(5.5, 2.5 + Math.log2(1 + node.degree) * 0.45)
        : Math.min(4.6, 2.3 + Math.log2(1 + node.degree) * 0.32)) * (this.layout === 'sphere' ? point.scale : 1) };
    }).sort((a, b) => a.depth - b.depth);
    this.positions = new Map(projected.map(p => [p.id, p]));
    this.grid.rebuild(projected);
    const activityNow = Date.now();
    this.activity.expire(activityNow);
    const visibleEdges = new Set(this.layout === 'network' ? this.networkEdges : this.edges);
    if (this.selected || this.hover) for (const edge of this.data.edges) {
      if ([edge.s, edge.t].includes(this.hover || this.selected)) visibleEdges.add(edge);
    }
    for (const edge of this.data.edges) {
      if (this.activity.edgeStrength(edge.s, edge.t, activityNow) > 0 && this.active(edge.s) && this.active(edge.t)) visibleEdges.add(edge);
    }
    const sphereMap = new Map(this.sphere.map(p => [p.id, p]));
    let activityEdges = 0;
    for (const edge of visibleEdges) {
      const a = this.positions.get(edge.s), b = this.positions.get(edge.t);
      if (!a || !b) continue;
      const gold = this.active(edge.s) && this.active(edge.t) ? this.activity.edgeStrength(edge.s, edge.t, activityNow) : 0;
      if (gold) activityEdges++;
      const highlighted = [edge.s, edge.t].includes(this.hover || this.selected);
      const bridge = this.nodes.get(edge.s)!.cluster !== this.nodes.get(edge.t)!.cluster;
      if (this.layout === 'sphere' && !highlighted && !gold && this.data.nodes.length > 300 && !this.bridges.has(edge)) continue;
      ctx.globalAlpha = gold ? 0.8 : highlighted ? 0.65 : this.related(edge.s) && this.active(edge.s) && this.active(edge.t) ? 0.075 : 0.015;
      ctx.strokeStyle = this.activity.color(highlighted ? '#3563ff' : '#7890b6', gold);
      ctx.lineWidth = gold ? 1.7 : highlighted ? 1.3 : 0.65;
      ctx.beginPath(); ctx.moveTo(a.x, a.y);
      if (this.layout === 'sphere' && (gold || highlighted || bridge)) {
        for (let i = 1; i <= 16; i++) {
          const point = this.spherePoint(arc(sphereMap.get(edge.s)!, sphereMap.get(edge.t)!, i / 16));
          ctx.lineTo(point.x, point.y);
        }
      } else ctx.lineTo(b.x, b.y);
      ctx.stroke();
      if (highlighted && !gold && this.layout === 'network' && this.data.nodes.length <= 300 && !this.motion.matches) {
        const t = (time / 1800) % 1;
        ctx.fillStyle = '#3563ff'; ctx.beginPath(); ctx.arc(a.x + (b.x - a.x) * t, a.y + (b.y - a.y) * t, 2, 0, Math.PI * 2); ctx.fill();
      }
      if (highlighted && this.data.nodes.length <= 300) {
        ctx.font = '10px sans-serif'; ctx.fillStyle = '#6b7e9d'; ctx.fillText(edge.kind, (a.x + b.x) / 2, (a.y + b.y) / 2);
      }
    }
    for (const point of projected) {
      const node = this.nodes.get(point.id)!;
      const active = this.active(point.id), related = this.related(point.id);
      ctx.globalAlpha = (this.layout === 'sphere' ? 0.3 + (point.depth + 1) * 0.35 : 1) * (active && related ? 1 : 0.15);
      const gold = active ? this.activity.strength(point.id, activityNow) : 0;
      const selected = point.id === this.selected || point.id === this.hover;
      const radius = point.radius * (!this.motion.matches && this.data.nodes.length <= 300 ? 1 + 0.025 * Math.sin(time / 900) : 1);
      if (selected || this.data.nodes.length <= 60 && Date.now() - Date.parse(node.updatedAt) < 7 * 86400000) {
        ctx.fillStyle = '#3563ff15'; ctx.beginPath(); ctx.arc(point.x, point.y, radius + 5, 0, Math.PI * 2); ctx.fill();
      }
      ctx.fillStyle = this.activity.color(node.status === '已失效' ? '#9ba7ba' : graphColors[node.kind], gold);
      ctx.strokeStyle = gold ? '#c5b600' : selected ? '#3563ff' : '#ffffff'; ctx.lineWidth = selected ? 2 : 1;
      ctx.setLineDash(node.status === '已失效' ? [2, 2] : []);
      ctx.beginPath();
      if (node.kind === 'tool') { ctx.moveTo(point.x, point.y - radius); ctx.lineTo(point.x + radius, point.y); ctx.lineTo(point.x, point.y + radius); ctx.lineTo(point.x - radius, point.y); ctx.closePath(); }
      else ctx.arc(point.x, point.y, radius, 0, Math.PI * 2);
      ctx.fill(); ctx.stroke(); ctx.setLineDash([]);
      if (node.kind === 'tool') {
        ctx.fillStyle = node.status === '可用' ? '#179466' : node.status === '不可用' ? '#cf4c56' : '#9ba7ba';
        ctx.beginPath(); ctx.arc(point.x + radius, point.y - radius, 2.5, 0, Math.PI * 2); ctx.fill();
      }
    }
    const activityVisible = this.activity.enabled && this.activity.marks.size > 0;
    this.canvas.dataset.activityEdges = String(activityEdges);
    this.canvas.dataset.activityNodes = String(this.activity.enabled ? this.activity.marks.size : 0);
    const labelLimit = Math.max(4, Math.min(12, Math.floor(this.width * this.height / 40000)));
    const placer = new LabelPlacer(this.width, this.height, labelLimit);
    const priority = (id: string) => id === this.hover ? 4 : id === this.selected ? 3 : this.text && this.active(id) ? 2 : 0;
    const candidates = projected.filter(point => this.active(point.id) && this.related(point.id)
      && (priority(point.id) > 0 || point.depth > -0.2 && (this.data.nodes.length <= 60 || this.nodes.get(point.id)!.degree >= 12)))
      .sort((a, b) => priority(b.id) - priority(a.id)
        || this.nodes.get(b.id)!.degree - this.nodes.get(a.id)!.degree || b.depth - a.depth);
    for (const point of candidates) {
      const focused = point.id === this.hover || point.id === this.selected;
      const title = this.nodes.get(point.id)!.title;
      const text = title.length > 15 ? title.slice(0, 15) + '…' : title;
      ctx.font = focused ? '600 12px sans-serif' : '11px sans-serif';
      const box = placer.place(point.x, point.y, point.radius, Math.ceil(ctx.measureText(text).width) + 12);
      if (!box) continue;
      ctx.globalAlpha = focused ? 1 : 0.88;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath(); ctx.roundRect(box.x, box.y, box.width, box.height, 4); ctx.fill();
      ctx.fillStyle = focused ? '#244dc0' : '#526681';
      ctx.fillText(text, box.x + 6, box.y + 14);
    }
    this.canvas.dataset.labels = String(placer.boxes.length);
    ctx.globalAlpha = 1;
    this.frames++; this.drawMs = performance.now() - started;
    this.canvas.dataset.frames = String(this.frames);
    this.canvas.dataset.drawMs = String(this.drawMs);
    this.canvas.dataset.layout = this.layout;
    if (!this.motion.matches && (activityVisible || this.layout === 'sphere' && (!this.selected || this.target || Math.abs(this.velocity.x) + Math.abs(this.velocity.y) > 0.0001) || this.layout === 'network' && (this.network.alpha >= 0.005 || this.data.nodes.length <= 300))) this.wake();
  };
  private drawGlobe() {
    const ctx = this.ctx;
    ctx.strokeStyle = '#dce7f5'; ctx.lineWidth = 0.6; ctx.globalAlpha = 0.7;
    for (let latitude = -2; latitude <= 2; latitude++) {
      ctx.beginPath();
      for (let i = 0; i <= 64; i++) {
        const a = i * Math.PI / 32, y = Math.sin(latitude * Math.PI / 6), r = Math.sqrt(1 - y * y);
        const p = this.spherePoint({ x: Math.cos(a) * r, y, z: Math.sin(a) * r });
        if (i === 0) ctx.moveTo(p.x, p.y); else ctx.lineTo(p.x, p.y);
      }
      ctx.stroke();
    }
    for (let longitude = 0; longitude < 6; longitude++) {
      ctx.beginPath();
      for (let i = 0; i <= 64; i++) {
        const a = i * Math.PI / 32, angle = longitude * Math.PI / 6;
        const p = this.spherePoint({ x: Math.sin(a) * Math.cos(angle), y: Math.cos(a), z: Math.sin(a) * Math.sin(angle) });
        if (i === 0) ctx.moveTo(p.x, p.y); else ctx.lineTo(p.x, p.y);
      }
      ctx.stroke();
    }
  }
  private pointerDown = (event: PointerEvent) => {
    const p = this.point(event);
    const rotate = this.layout === 'network' && event.shiftKey;
    this.drag = { ...p, startX: p.x, startY: p.y, node: rotate ? undefined : this.grid.hit(p.x, p.y), rotate, moved: false };
    this.target = undefined; this.velocity = { x: 0, y: 0 };
    this.canvas.setPointerCapture(event.pointerId);
  };
  private pointerMove = (event: PointerEvent) => {
    const p = this.point(event);
    if (this.drag) {
      const dx = p.x - this.drag.x, dy = p.y - this.drag.y;
      this.drag.moved ||= Math.hypot(p.x - this.drag.startX, p.y - this.drag.startY) > 4;
      if (this.layout === 'sphere') {
        this.yaw += dx * 0.006; this.pitch += dy * 0.006;
        this.velocity = this.motion.matches ? { x: 0, y: 0 } : { x: dx * 0.002, y: dy * 0.002 };
      } else if (this.drag.rotate) {
        this.setNetworkRotation(this.networkAngle * 180 / Math.PI + dx * 0.6);
      } else if (this.drag.node) {
        const particle = this.network.particles.find(node => node.id === this.drag!.node)!;
        const movement = rotatePoint({ x: dx / this.networkScale(), y: dy / this.networkScale() }, -this.networkAngle);
        particle.x += movement.x; particle.y += movement.y; this.network.alpha = 0.4;
      } else { this.pan.x += dx; this.pan.y += dy; }
      this.drag.x = p.x; this.drag.y = p.y;
    } else this.hover = this.grid.hit(p.x, p.y) || '';
    this.canvas.title = this.nodes.get(this.hover)?.title || (this.layout === 'network' ? '拖拽平移，Shift+拖拽旋转，滚轮缩放' : '拖拽旋转，滚轮缩放；节点列表可用键盘操作');
    this.wake();
  };
  private pointerUp = (event: PointerEvent) => {
    if (!this.drag) return;
    const drag = this.drag; this.drag = undefined;
    if (!drag.moved && drag.node) this.focus(drag.node);
    if (this.canvas.hasPointerCapture(event.pointerId)) this.canvas.releasePointerCapture(event.pointerId);
    this.wake();
  };
}
