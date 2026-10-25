import type { GraphActivityPage } from '../../graph-activity.js';

/** Polls metadata only while a graph is visible; one request at a time. */
export class ActivityFeed {
  private cursor = 0;
  private generation = '';
  private stopped = false;
  private timer?: ReturnType<typeof setTimeout>;
  private controller?: AbortController;
  constructor(private element: HTMLElement, private receive: (page: GraphActivityPage, reset: boolean) => void) {}
  start() { void this.poll(); }
  stop() {
    this.stopped = true;
    clearTimeout(this.timer);
    this.controller?.abort();
  }
  private async poll() {
    if (this.stopped) return;
    try {
      const token = document.querySelector<HTMLMetaElement>('meta[name="wanxiang-token"]')?.content;
      if (token && !document.hidden && this.element.isConnected && this.element.getClientRects().length) {
        this.controller = new AbortController();
        const timeout = setTimeout(() => this.controller?.abort(), 2000);
        try {
          const response = await fetch('/api/wanxiang/graph-activity?after=' + this.cursor,
            { headers: { 'x-wanxiang-token': token }, signal: this.controller.signal });
          if (!response.ok) throw new Error('Activity unavailable');
          const page: GraphActivityPage = await response.json();
          if (this.stopped || !Array.isArray(page.events)) return;
          const reset = !!this.generation && this.generation !== page.generation;
          this.generation = page.generation;
          this.cursor = page.cursor;
          this.receive(page, reset);
        } finally { clearTimeout(timeout); }
      }
    } catch { /* A disconnected Host never breaks graph interaction. */ }
    if (!this.stopped) this.timer = setTimeout(() => void this.poll(), 1000);
  }
}
