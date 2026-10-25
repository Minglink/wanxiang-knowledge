export interface Point2 { x: number; y: number }

/** A view transform only: particle coordinates and knowledge relations stay intact. */
export function rotatePoint(point: Point2, angle: number): Point2 {
  const cosine = Math.cos(angle);
  const sine = Math.sin(angle);
  return { x: point.x * cosine - point.y * sine, y: point.x * sine + point.y * cosine };
}

export function rotationRadians(degrees: number) {
  if (!Number.isFinite(degrees)) return 0;
  const wrapped = ((degrees + 180) % 360 + 360) % 360 - 180;
  return (wrapped === -180 && degrees > 0 ? 180 : wrapped) * Math.PI / 180;
}

export function rotatedExtent(extent: Point2, angle: number): Point2 {
  const cosine = Math.abs(Math.cos(angle));
  const sine = Math.abs(Math.sin(angle));
  return { x: extent.x * cosine + extent.y * sine, y: extent.x * sine + extent.y * cosine };
}
