import { fork, type ChildProcess } from 'node:child_process';
import { fileURLToPath } from 'node:url';

export class RecallTimeout extends Error {
  readonly name = 'RecallTimeout';
  constructor(public reason = 'timeout') { super(reason); }
}
export interface ProcessQuery { query: string; currentQuery?: string; project?: string; limited: boolean; limit: number }
export class RecallProcessPool {
  private child?: ChildProcess;
  private pending?: { reject: (error: Error) => void; cleanup: () => void };
  private counter = 0;
  private stops: Promise<void>[] = [];
  readonly stats = { terminations: 0, completed: 0, started: 0, exited: 0, stoppedPids: [] as number[] };
  lastMemory?: { rss: number; heapUsed: number };
  constructor(private file: string, private engine: string,
    private script = new URL('./recall-process.js', import.meta.url)) {}
  private stop(error: Error) {
    const pending = this.pending;
    this.pending = undefined;
    pending?.cleanup();
    const child = this.child;
    this.child = undefined;
    if (child) {
      child.ref();
      this.stats.terminations++;
      this.stops.push(new Promise<void>(resolve => {
        child.once('exit', () => {
          this.stats.exited++;
          if (child.pid) this.stats.stoppedPids.push(child.pid);
          resolve();
        });
      }));
      // Windows uses TerminateProcess even while SQLite is inside native C.
      child.kill('SIGKILL');
    }
    pending?.reject(error);
  }
  query(request: ProcessQuery, signal: AbortSignal, budget: number): Promise<{ id: string; rank: number; score: number }[]> {
    if (signal.aborted) return Promise.reject(new RecallTimeout('cancelled'));
    if (budget <= 0) return Promise.reject(new RecallTimeout());
    if (this.pending) return Promise.reject(new RecallTimeout('worker_busy'));
    if (!this.child) {
      this.child = fork(fileURLToPath(this.script), [this.file, this.engine], {
        execPath: process.execPath, execArgv: [], windowsHide: true,
        env: { ...process.env, ELECTRON_RUN_AS_NODE: '1' }, stdio: ['ignore', 'ignore', 'ignore', 'ipc'],
      });
      const instance = this.child;
      instance.on('error', error => { if (this.child === instance) this.stop(error); });
      instance.on('exit', code => {
        if (this.child !== instance) return;
        this.child = undefined;
        this.pending?.cleanup(); this.pending?.reject(new Error('召回隔离进程退出：' + code));
        this.pending = undefined;
      });
      instance.unref(); instance.channel?.unref();
    }
    const instance = this.child;
    const id = ++this.counter;
    const start = performance.now();
    return new Promise((resolve, reject) => {
      const abort = () => this.stop(new RecallTimeout('cancelled'));
      const timer = setTimeout(() => this.stop(new RecallTimeout()), budget);
      const receive = (message: any) => {
        if (message.type === 'started') { this.stats.started++; return; }
        if (message.id !== id || this.child !== instance) return;
        if (performance.now() - start > budget) { this.stop(new RecallTimeout()); return; }
        this.pending?.cleanup(); this.pending = undefined;
        this.lastMemory = message.memory;
        if (message.error) reject(new Error(message.error));
        else { this.stats.completed++; resolve(message.rows); }
      };
      this.pending = { reject, cleanup: () => {
        clearTimeout(timer); signal.removeEventListener('abort', abort); instance.off('message', receive);
        instance.unref(); instance.channel?.unref();
      } };
      instance.ref(); instance.channel?.ref();
      instance.on('message', receive);
      signal.addEventListener('abort', abort, { once: true });
      instance.send({ ...request, id }, error => { if (error && this.child === instance) this.stop(error); });
    });
  }
  async waitForStops() { await Promise.all(this.stops); }
  dispose() { this.stop(new RecallTimeout('disposed')); return this.waitForStops(); }
}
