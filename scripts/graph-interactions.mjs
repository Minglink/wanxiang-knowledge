import { build } from 'esbuild';
import { chromium } from 'playwright';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';

const output = 'dist/network-rotation';
await mkdir(output, { recursive: true });
const bundle = await build({
  stdin: { contents: "export {GraphView,newGraphState} from './src/panel/graph/view.ts';", resolveDir: process.cwd() },
  bundle: true, write: false, format: 'iife', globalName: 'GraphTest', platform: 'browser', target: 'es2022',
});
const browser = await chromium.launch({ executablePath: process.env.WANXIANG_CHROME || 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
const checks = [];
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 1000 }, reducedMotion: 'reduce' });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.setContent('<section class="wx-graph"></section>');
  await page.addStyleTag({ content: await readFile('src/style.css', 'utf8') });
  await page.addScriptTag({ content: bundle.outputFiles[0].text });
  await page.evaluate(async () => {
    const nodes = Array.from({ length: 200 }, (_, index) => ({
      id: 'synthetic-' + index, title: '合成旋转节点 ' + index, kind: 'note', degree: 3,
      cluster: index < 100 ? 'a' : 'b', project: '', tags: [], updatedAt: '', status: '待核验',
    }));
    const edges = nodes.slice(1).map((node, index) => ({ s: nodes[index].id, t: node.id, kind: 'link', w: 1 }));
    const data = { nodes, edges, total: nodes.length, truncated: false, clusters: [{ id: 'a', label: 'a', count: 100 }, { id: 'b', label: 'b', count: 100 }] };
    window.graphView = new GraphTest.GraphView(document.querySelector('section'), GraphTest.newGraphState(), async () => data, () => {});
    await window.graphView.mount();
  });
  const canvas = page.locator('canvas');
  const slider = page.getByRole('slider', { name: '网络旋转角度' });
  await page.waitForTimeout(150);
  const sphere = await canvas.evaluate(c => c.toDataURL());
  assert.equal(await slider.isVisible(), false);
  await page.locator('[data-graph-action="network"]').click();
  await slider.focus();
  await slider.press('ArrowRight');
  await page.waitForTimeout(60);
  assert.equal(await slider.inputValue(), '1');
  assert.equal(await page.locator('.wx-graph-rotation output').innerText(), '1°');
  const particlesBefore = await page.evaluate(() => JSON.stringify(window.graphView.engine.network.particles));
  await slider.evaluate(input => { input.value = '90'; input.dispatchEvent(new Event('input', { bubbles: true })); });
  await page.waitForTimeout(60);
  assert.equal(await page.locator('.wx-graph-rotation output').innerText(), '90°');
  assert.equal(await page.evaluate(() => JSON.stringify(window.graphView.engine.network.particles)), particlesBefore);
  checks.push('slider keyboard and input rotate only the view');

  let rect = await canvas.boundingBox();
  await page.keyboard.down('Shift');
  await page.mouse.move(rect.x + 20, rect.y + 20);
  await page.mouse.down();
  await page.mouse.move(rect.x + 70, rect.y + 20, { steps: 5 });
  await page.mouse.up();
  await page.keyboard.up('Shift');
  await page.waitForTimeout(60);
  assert.equal(Number(await slider.inputValue()), 120);
  assert.equal(await page.evaluate(() => JSON.stringify(window.graphView.engine.network.particles)), particlesBefore);
  checks.push('Shift drag rotates whole network and synchronizes slider');

  const point = await page.evaluate(() => {
    const engine = window.graphView.engine;
    return [...engine.positions.values()].find(p => engine.grid.hit(p.x, p.y) === p.id && p.x > 50 && p.y > 50);
  });
  await page.mouse.move(rect.x + point.x, rect.y + point.y);
  await page.mouse.down();
  await page.mouse.move(rect.x + point.x + 30, rect.y + point.y + 8, { steps: 4 });
  await page.waitForTimeout(60);
  const moved = await page.evaluate(id => window.graphView.engine.positions.get(id), point.id);
  assert.ok(Math.abs(moved.x - point.x - 30) < 1);
  assert.ok(Math.abs(moved.y - point.y - 8) < 1);
  await page.mouse.up();
  checks.push('rotated node dragging follows screen movement');

  await page.waitForTimeout(100);
  const clickable = await page.evaluate(() => {
    const engine = window.graphView.engine;
    return [...engine.positions.values()].find(p => engine.grid.hit(p.x, p.y) === p.id && p.x > 50 && p.y > 50);
  });
  await page.mouse.click(rect.x + clickable.x, rect.y + clickable.y);
  assert.equal(await page.evaluate(() => window.graphView.engine.selected), clickable.id);
  checks.push('rotated node click selects the displayed node');
  await page.locator('.wx-graph-list summary').click();
  await page.locator('[data-graph-node]').first().click();
  await page.waitForTimeout(60);
  const centered = await page.evaluate(() => {
    const engine = window.graphView.engine;
    const point = engine.positions.get(engine.selected);
    return { x: point.x - engine.width / 2, y: point.y - engine.height / 2 };
  });
  assert.ok(Math.abs(centered.x) < 1 && Math.abs(centered.y) < 1);
  checks.push('focus centers selected node after rotation');
  await page.locator('[data-graph-action="reset"]').click();
  assert.equal(await slider.inputValue(), '0');
  const reset = await page.evaluate(() => {
    const engine = window.graphView.engine;
    return { angle: engine.networkAngle, pan: engine.pan, zoom: engine.zoom };
  });
  assert.deepEqual(reset, { angle: 0, pan: { x: 0, y: 0 }, zoom: 1 });
  checks.push('reset clears angle, pan and zoom');

  // Compare the sphere with the same selection state and transform on both visits.
  await page.evaluate(() => { window.graphView.engine.selected = ''; window.graphView.state.selected = ''; });
  await page.locator('[data-graph-action="sphere"]').click();
  await page.waitForTimeout(100);
  assert.equal(await canvas.evaluate(c => c.toDataURL()), sphere);
  assert.equal(await slider.isVisible(), false);
  checks.push('sphere pixels unchanged; rotation controls hidden in sphere mode');
  await page.locator('[data-graph-action="network"]').click();
  await slider.evaluate(input => { input.value = '45'; input.dispatchEvent(new Event('input', { bubbles: true })); });
  await page.waitForTimeout(100);
  await page.locator('[data-graph-action="sphere"]').click();
  await page.locator('[data-graph-action="network"]').click();
  assert.equal(await slider.inputValue(), '45');
  checks.push('switching layouts preserves network angle');
  await page.locator('section').screenshot({ path: output + '/synthetic-rotation.png' });
  assert.deepEqual(errors, []);
  await writeFile(output + '/interaction-check.json', JSON.stringify({ synthetic: true, checks }, null, 2));
  console.log(checks);
} finally {
  await browser.close();
}
