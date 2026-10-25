import test from 'node:test';
import assert from 'node:assert/strict';
import { build } from 'esbuild';

async function moduleFrom(path) {
  const result = await build({ entryPoints: [path], bundle: true, write: false, format: 'esm', platform: 'node' });
  return import('data:text/javascript;base64,' + Buffer.from(result.outputFiles[0].text).toString('base64'));
}

test('不均衡双簇保留聚集与间隔，稳定、完整且始终在球面上', async () => {
  const { sphereLayout } = await moduleFrom('src/panel/graph/layouts.ts');
  for (const count of [200, 1000]) {
    const nodes = Array.from({ length: count }, (_, i) => ({
      id: String(i), cluster: i < count * 0.9 ? 'large' : 'small', kind: 'note', degree: i % 15,
    }));
    const points = sphereLayout(nodes);
    assert.deepEqual(points.map(p => p.id), nodes.map(n => n.id));
    assert.deepEqual(sphereLayout(nodes), points, '重新打开不得随机洗牌');
    assert.equal(new Set(points.map(p => [p.x, p.y, p.z].join(','))).size, count);
    const centers = ['large', 'small'].map(cluster => {
      const members = points.filter(p => p.cluster === cluster);
      const mean = key => members.reduce((sum, p) => sum + p[key], 0) / members.length;
      return { x: mean('x'), y: mean('y'), z: mean('z') };
    });
    for (const center of centers) assert.ok(Math.hypot(center.x, center.y, center.z) > 0.75, '不能再平均铺满球面');
    assert.ok(Math.hypot(centers[0].x - centers[1].x, centers[0].y - centers[1].y, centers[0].z - centers[1].z) > 1);
    for (const point of points) assert.ok(Math.abs(Math.hypot(point.x, point.y, point.z) - 1) < 1e-9);
  }
  assert.deepEqual(sphereLayout([]), []);
});

test('网络共享空间力导向支持固定拖拽节点、降温停算且不改关系数据', async () => {
  const { NetworkLayout } = await moduleFrom('src/panel/graph/layouts.ts');
  const nodes = Array.from({ length: 200 }, (_, i) => ({
    id: String(i), cluster: i < 100 ? 'left' : 'right', degree: 3,
  }));
  const edges = nodes.flatMap((node, i) => i % 100 ? [{ s: node.id, t: String(i - 1), w: 1 }] : []);
  edges.push({ s: '50', t: '150', w: 1 });
  const original = structuredClone({ nodes, edges });
  const layout = new NetworkLayout(nodes, edges);
  for (let i = 0; i < 100; i++) layout.tick();
  const settled = structuredClone(layout.particles);
  layout.tick();
  assert.deepEqual(layout.particles, settled, '降温后不再持续改变布局');
  const moving = new NetworkLayout(nodes, edges);
  const fixed = { ...moving.particles[0] };
  moving.tick(fixed.id);
  assert.equal(moving.particles[0].x, fixed.x);
  assert.equal(moving.particles[0].y, fixed.y);
  assert.ok(moving.particles.some((point, index) => index > 0 && Math.hypot(point.x - settled[index].x, point.y - settled[index].y) > 0));
  assert.deepEqual({ nodes, edges }, original, '布局不能改变关系数据');
  assert.equal(layout.particles.length, nodes.length);
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
