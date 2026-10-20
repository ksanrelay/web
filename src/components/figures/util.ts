// Small helpers shared by the figures.

/** Run `fn` on first call and cache the result, so a figure's data is computed only on pages that render it. */
export function once<T>(fn: () => T): () => T {
  let value: { v: T } | undefined
  return () => (value ??= { v: fn() }).v
}

/** Format a number with a typographic minus sign, and a plus sign when `plus` is set. */
export function signed(value: number, digits: number, plus = false): string {
  const text = Math.abs(value).toFixed(digits)
  if (Number(text) === 0) return text
  return (value < 0 ? '−' : plus ? '+' : '') + text
}
