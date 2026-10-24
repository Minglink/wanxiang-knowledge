export interface HitPoint { id: string; x: number; y: number; radius: number; depth: number }

export class HitGrid {
  private cells = new Map<string, HitPoint[]>();
  constructor(private size = 32) {}

  rebuild(points: HitPoint[]) {
    this.cells.clear();
    for (const point of points) {
      const key = this.key(point.x, point.y);
      const cell = this.cells.get(key) || [];
      cell.push(point);
      this.cells.set(key, cell);
    }
  }

  hit(x: number, y: number) {
    let result: HitPoint | undefined;
    const cx = Math.floor(x / this.size);
    const cy = Math.floor(y / this.size);
    for (let dx = -1; dx <= 1; dx++) for (let dy = -1; dy <= 1; dy++) {
      for (const point of this.cells.get(`${cx + dx},${cy + dy}`) || []) {
        if (Math.hypot(point.x - x, point.y - y) <= point.radius + 5 && (!result || point.depth >= result.depth)) result = point;
      }
    }
    return result?.id;
  }

  private key(x: number, y: number) { return `${Math.floor(x / this.size)},${Math.floor(y / this.size)}`; }
}
