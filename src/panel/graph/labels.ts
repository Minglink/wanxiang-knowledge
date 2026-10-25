export interface LabelBox { x: number; y: number; width: number; height: number }

export function overlaps(a: LabelBox, b: LabelBox) {
  return a.x < b.x + b.width && a.x + a.width > b.x
    && a.y < b.y + b.height && a.y + a.height > b.y;
}

/** Place readable labels inside the viewport; the focused label gets first choice. */
export class LabelPlacer {
  readonly boxes: LabelBox[] = [];

  constructor(private width: number, private height: number, private limit: number) {}

  place(x: number, y: number, radius: number, width: number): LabelBox | undefined {
    if (this.boxes.length >= this.limit) return;
    const height = 20;
    const candidates = [
      { x: x + radius + 5, y: y - height / 2 },
      { x: x - radius - 5 - width, y: y - height / 2 },
      { x: x - width / 2, y: y - radius - height - 5 },
      { x: x - width / 2, y: y + radius + 5 },
    ];
    for (const candidate of candidates) {
      const box = { ...candidate, width, height };
      if (box.x < 8 || box.y < 8 || box.x + width > this.width - 8 || box.y + height > this.height - 8) continue;
      if (this.boxes.some(other => overlaps(box, other))) continue;
      this.boxes.push(box);
      return box;
    }
  }
}
