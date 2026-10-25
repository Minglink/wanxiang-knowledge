import test from 'node:test';
import assert from 'node:assert/strict';
import { build } from 'esbuild';

async function moduleFrom(path) {
  const result = await build({ entryPoints: [path], bundle: true, write: false, format: 'esm', platform: 'node' });
  return import('data:text/javascript;base64,' + Buffer.from(result.outputFiles[0].text).toString('base64'));
}

test('两个不均衡大簇也铺满球面；节点不丢失、不重合', async () => {
  const { sphereLayout } = await moduleFrom('src/panel/graph/layouts.ts');
  for (const count of [200, 1000]) {
    const nodes = Array.from({ length: count }, (_, i) => ({
      id: String(i), cluster: i < count * 0.9 ? 'large' : 'small', kind: 'note',
    }));
    const points = sphereLayout(nodes);
    assert.deepEqual(points.map(p => p.id), nodes.map(n => n.id));
    assert.equal(new Set(points.map(p => [p.x, p.y, p.z].join(','))).size, count);
    const octants = new Set(points.map(p => [p.x > 0, p.y > 0, p.z > 0].join(',')));
    assert.equal(octants.size, 8, '不能仍挤在两个球冠里');
    for (const point of points) assert.ok(Math.abs(Math.hypot(point.x, point.y, point.z) - 1) < 1e-9);
  }
  assert.deepEqual(sphereLayout([]), []);
});

test('密集标题避让、边界约束与数量上限', async () => {
  const { LabelPlacer, overlaps } = await moduleFrom('src/panel/graph/labels.ts');
  const placer = new LabelPlacer(400, 200, 8);
  assert.ok(placer.place(200, 100, 5, 120), '优先项首先取得位置');
  for (let i = 0; i < 100; i++) placer.place(20 + i % 10 * 38, 15 + Math.floor(i / 10) * 18, 5, 100);
  assert.ok(placer.boxes.length <= 8);
  for (const box of placer.boxes) {
    assert.ok(box.x >= 8 && box.y >= 8 && box.x + box.width <= 392 && box.y + box.height <= 192);
    for (const other of placer.boxes) if (other !== box) assert.equal(overlaps(box, other), false);
  }
  assert.equal(new LabelPlacer(20, 20, 1).place(10, 10, 5, 100), undefined);
});
