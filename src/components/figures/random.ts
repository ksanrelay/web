// Deterministic random numbers for the illustrative figures. Fixed seeds mean every visitor sees the
// same picture, and the numbers quoted beside each figure are computed from exactly that sample.

/** mulberry32: small, well-distributed PRNG; neighbouring seeds give independent streams. */
export function mulberry32(seed: number) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** Standard normal sampler (Box–Muller) driven by a uniform generator. */
export function normalSampler(uniform: () => number) {
  let spare: number | undefined
  return () => {
    if (spare !== undefined) {
      const s = spare
      spare = undefined
      return s
    }
    const u = 1 - uniform() // (0, 1]
    const v = uniform()
    const r = Math.sqrt(-2 * Math.log(u))
    spare = r * Math.sin(2 * Math.PI * v)
    return r * Math.cos(2 * Math.PI * v)
  }
}

/** Build an SVG polyline path from points. */
export function toPath(points: [number, number][]): string {
  return points.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ')
}
