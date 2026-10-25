import { build } from 'esbuild';
import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';

await mkdir('dist/graph-activity-bench', { recursive: true });
const bundle = await build({
  stdin: { contents: "export {CanvasGraph} from './src/panel/graph/canvas.ts'; export {aggregateGraph} from './src/panel/graph/aggregate.ts';", resolveDir: process.cwd() },
  bundle: true, write: false, format: 'iife', globalName: 'GraphBench', platform: 'browser', target: 'es2022',
});
const browser = await chromium.launch({ executablePath: process.env.WANXIANG_CHROME || 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', headless: true });
const page = await browser.newPage({ viewport: { width: 1200, height: 800 }, deviceScaleFactor: 1 });
const reports = [];
try {
  await page.setContent('<canvas style="width:1000px;height:600px" aria-label="合成性能测试图"></canvas>');
  await page.addScriptTag({ content: bundle.outputFiles[0].text });
  for (const count of [200, 1000, 3000]) for (const layout of ['sphere', 'network']) {
    const result = await page.evaluate(async ({ count, layout }) => {
      window.engine?.destroy();
      const nodes = Array.from({ length: count }, (_, i) => ({ id: 'synthetic-' + i, kind: ['note', 'method', 'pitfall', 'project', 'tool'][i % 5],
        title: '合成节点 ' + i, project: '合成项目', tags: [], degree: 3, cluster: '簇' + (i % 20), updatedAt: '', status: '未检测' }));
      const edges = nodes.flatMap((n, i) => i ? [{ s: n.id, t: nodes[i - 1].id, kind: 'same_session', w: 1 }] : []);
      const original = { nodes, edges, clusters: Array.from({ length: 20 }, (_, i) => ({ id: '簇' + i, label: '簇' + i, count: count / 20 })), total: count, truncated: false };
      const data = GraphBench.aggregateGraph(original);
      window.engine = new GraphBench.CanvasGraph(document.querySelector('canvas'), data, id => { window.lastSelected = id; }, () => {});
      window.engine.setLayout(layout);
      if (layout === 'network') window.engine.setNetworkRotation(45);
      window.engine.setActivity([{seq:1,kind:'read',at:Date.now(),entryIds:nodes.slice(0,16).map(node=>node.id)}], original, true);
      const frames = [];
      let previous;
      const started = performance.now();
      // Keep the actual network simulator active to measure interaction load, not an idle canvas.
      while (performance.now() - started < 2200) {
        if (layout === 'network') { window.engine.network.alpha = 0.2; window.engine.wake(); }
        await new Promise(resolve => requestAnimationFrame(resolve));
        const now = performance.now();
        if (previous !== undefined) frames.push(now - previous);
        previous = now;
      }
      const sorted = [...frames].sort((a, b) => a - b);
      return { inputNodes: count, visibleNodes: data.nodes.length, layout, rotationDegrees: layout === 'network' ? 45 : 0,
        fps: 1000 / (frames.reduce((a, b) => a + b, 0) / frames.length),
        frameP95Ms: sorted[Math.ceil(sorted.length * 0.95) - 1],
        drawLastMs: window.engine.drawMs, drawnFrames: window.engine.frames,
        aggregation: data.nodes.length < count };
    }, { count, layout });
    reports.push(result);
    await page.screenshot({ path: `dist/graph-activity-bench/${layout}-${count}.png` });
    console.log(JSON.stringify(result));
    assert.ok(result.drawnFrames > 50);
    if (count === 1000) assert.ok(result.fps >= 50, '1000 nodes require >=50fps');
    if (count === 3000) assert.equal(result.aggregation, true);
  }
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.evaluate(() => { window.engine.setLayout('sphere'); window.engine.reset(); });
  await page.waitForTimeout(100);
  const before = await page.evaluate(() => window.engine.frames);
  await page.waitForTimeout(300);
  assert.equal(await page.evaluate(() => window.engine.frames), before, 'reduced motion must stop continuous animation');
  await page.evaluate(() => { window.engine.focus('cluster:簇0'); window.engine.setLayout('network'); });
  assert.equal(await page.evaluate(() => window.engine.selected), 'cluster:簇0');
  await writeFile('dist/graph-activity-bench/results.json', JSON.stringify({ environment: 'Headless installed Chrome; 1000x600 CSS canvas, DPR 1; synthetic edges; hot network simulation held active', reports, reducedMotion: true, selectionAcrossLayouts: true }, null, 2));
} finally { await browser.close(); }
