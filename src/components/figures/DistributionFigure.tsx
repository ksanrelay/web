import FigureFrame from './FigureFrame.tsx'
import { mulberry32, normalSampler, toPath } from './random.ts'

// Heavy tails: a histogram of standardized Student-t samples (ν = 6) against the Gaussian density.
// The kurtosis and tail frequency quoted beside the figure are computed from this exact sample.
const NU = 6
const N = 5000
const SCALE = Math.sqrt(NU / (NU - 2)) // sd of t_ν; dividing by it gives unit variance
const X_MAX = 5
const BIN = 0.25

const W = 480
const H = 240
const Y_MAX = 0.56
const px = (v: number) => ((v + X_MAX) / (2 * X_MAX)) * W
const py = (d: number) => H - (d / Y_MAX) * H

function sample(): number[] {
  const z = normalSampler(mulberry32(7))
  return Array.from({ length: N }, () => {
    let chi2 = 0
    for (let i = 0; i < NU; i++) chi2 += z() ** 2
    return z() / Math.sqrt(chi2 / NU) / SCALE
  })
}

const SAMPLE = sample()

const BINS = (() => {
  const count = Math.round((2 * X_MAX) / BIN)
  const counts = new Array<number>(count).fill(0)
  for (const v of SAMPLE) {
    const i = Math.floor((v + X_MAX) / BIN)
    if (i >= 0 && i < count) counts[i]++
  }
  return counts.map((c, i) => ({ x0: -X_MAX + i * BIN, density: c / (N * BIN) }))
})()

const STATS = (() => {
  const mean = SAMPLE.reduce((a, b) => a + b, 0) / N
  let m2 = 0
  let m4 = 0
  let tail = 0
  for (const v of SAMPLE) {
    const d = v - mean
    m2 += d * d
    m4 += d ** 4
    if (Math.abs(v) > 3) tail++
  }
  m2 /= N
  m4 /= N
  return { kurtosis: m4 / (m2 * m2), tail: tail / N }
})()

const gaussian = (v: number) => Math.exp((-v * v) / 2) / Math.sqrt(2 * Math.PI)
// Student-t density for ν = 6: Γ(7/2) / (√(6π) Γ(3)) = 15 / (16√6), rescaled to unit variance.
const studentT = (v: number) => {
  const u = v * SCALE
  return SCALE * (15 / (16 * Math.sqrt(6))) * (1 + (u * u) / NU) ** (-(NU + 1) / 2)
}

const grid = Array.from({ length: 161 }, (_, i) => -X_MAX + (i * 2 * X_MAX) / 160)
const GAUSS_PATH = toPath(grid.map(v => [px(v), py(gaussian(v))]))
const T_PATH = toPath(grid.map(v => [px(v), py(studentT(v))]))

export default function DistributionFigure() {
  return (
    <FigureFrame
      index="Fig. 3"
      title="Heavy tails"
      viewBox={[-12, -12, W + 24, H + 40]}
      label="Histogram of standardized Student-t samples with the Student-t density drawn over it and a dashed Gaussian density for comparison; the sample has a taller peak and more mass beyond three standard deviations"
      notation={[
        ['Sample', 'Xᵢ ~ t₆ / √1.5'],
        ['Kurtosis', `m₄/m₂² = ${STATS.kurtosis.toFixed(2)} (Gaussian 3)`],
        ['Tail', `P(|X| > 3) = ${(STATS.tail * 100).toFixed(2)}% (Gaussian 0.27%)`],
        ['Lesson', 'σ alone understates tail risk'],
      ]}
      source={`Simulated, n = ${N.toLocaleString('en')} draws, unit variance. Illustrative only.`}
    >
      <g className="plot__grid">
        {[-4, -2, 0, 2, 4].map(v => (
          <line key={v} x1={px(v)} y1={0} x2={px(v)} y2={H} />
        ))}
        {[0.2, 0.4].map(d => (
          <line key={d} x1={0} y1={py(d)} x2={W} y2={py(d)} />
        ))}
      </g>
      <g className="plot__bars">
        {BINS.map(b => (
          <rect key={b.x0} x={px(b.x0) + 0.5} y={py(b.density)} width={px(b.x0 + BIN) - px(b.x0) - 1} height={H - py(b.density)} />
        ))}
      </g>
      <line className="plot__axis" x1={0} y1={H} x2={W} y2={H} />
      {[-3, 3].map(v => (
        <line key={v} className="plot__marker" x1={px(v)} y1={py(0.3)} x2={px(v)} y2={H} />
      ))}
      <path className="plot__envelope" d={GAUSS_PATH} />
      <path className="plot__path" d={T_PATH} pathLength={1} />
      {[-4, -2, 0, 2, 4].map(v => (
        <text key={v} className="plot__text" x={px(v)} y={H + 18} textAnchor="middle">
          {v === 0 ? '0' : `${v > 0 ? '' : '−'}${Math.abs(v)}σ`}
        </text>
      ))}
      <text className="plot__text plot__text--label" x={px(3) + 6} y={py(0.3) + 10}>
        3σ
      </text>
      <text className="plot__text plot__text--label" x={px(0.95)} y={py(0.42)}>
        t₆
      </text>
      <text className="plot__text" x={px(-1.45)} y={py(0.3)} textAnchor="end">
        N(0,1)
      </text>
    </FigureFrame>
  )
}
