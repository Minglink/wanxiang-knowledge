import test from 'node:test';
import assert from 'node:assert/strict';
import { build } from 'esbuild';

const bundle = await build({ entryPoints: ['src/panel/graph/network-transform.ts'], bundle: true, write: false, format: 'esm' });
const { rotatePoint, rotatedExtent, rotationRadians } = await import('data:text/javascript;base64,' + Buffer.from(bundle.outputFiles[0].text).toString('base64'));
const close = (a, b) => assert.ok(Math.abs(a - b) < 1e-8);

test('网络旋转保持距离，反向变换让拖拽沿屏幕方向移动', () => {
  for (const degrees of [-180, -135, -90, 0, 45, 90, 180]) {
    const angle = rotationRadians(degrees);
    const a = { x: -40, y: 70 }, b = { x: 250, y: -90 };
    const ra = rotatePoint(a, angle), rb = rotatePoint(b, angle);
    close(Math.hypot(ra.x - rb.x, ra.y - rb.y), Math.hypot(a.x - b.x, a.y - b.y));
    const screenMove = { x: 40, y: 12 };
    const localMove = rotatePoint(screenMove, -angle);
    const moved = rotatePoint({ x: a.x + localMove.x, y: a.y + localMove.y }, angle);
    close(moved.x - ra.x, screenMove.x);
    close(moved.y - ra.y, screenMove.y);
    assert.deepEqual(a, { x: -40, y: 70 });
  }
});

test('旋转包围盒包含四角，角度越界归一且端点滑杆不跳变', () => {
  for (const degrees of [-180, -80, 0, 45, 90, 180, 540]) {
    const angle = rotationRadians(degrees);
    const extent = rotatedExtent({ x: 200, y: 70 }, angle);
    for (const x of [-200, 200]) for (const y of [-70, 70]) {
      const corner = rotatePoint({ x, y }, angle);
      assert.ok(Math.abs(corner.x) <= extent.x + 1e-8);
      assert.ok(Math.abs(corner.y) <= extent.y + 1e-8);
    }
  }
  close(rotationRadians(180), Math.PI);
  close(rotationRadians(-180), -Math.PI);
  close(rotationRadians(450), Math.PI / 2);
  assert.equal(rotationRadians(NaN), 0);
});
