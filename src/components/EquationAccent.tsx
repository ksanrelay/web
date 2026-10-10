import { useId } from 'react'
import FigureFrame from './figures/FigureFrame.tsx'
import { mulberry32, normalSampler } from './figures/random.ts'

// Simulated driftless Brownian paths, Xₜ = σWₜ, sampled on a grid of STEPS points, inside their ±2σ√t envelope.
// Fixed seeds make the figure identical on every load; the coverage quoted beside it is computed from these paths.
const STEPS = 72
const W = 480
const H = 260
const MID = H / 2
const SCALE = 5.2 // px per unit of X
const STEP_SD = 0.95 // σ per step
const FAINT_PATHS = 26
const HIGHLIGHT_SEED = 30

function simulate(seed: number): number[] {
  const z = normalSampler(mulberry32(seed))
  const xs = [0]
  for (let i = 1; i <= STEPS; i++) xs.push(xs[i - 1] + STEP_SD * z())
  return xs
}

function toSvgPath(xs: number[]): string {
  return xs.map((x, i) => `${i === 0 ? 'M' : 'L'}${((i / STEPS) * W).toFixed(1)},${(MID - x * SCALE).toFixed(1)}`).join(' ')
}

function envelope(sign: 1 | -1): string {
  let d = `M0,${MID}`
  for (let i = 1; i <= 36; i++) {
    const t = i / 36
    const spread = 2 * STEP_SD * Math.sqrt(t * STEPS) * SCALE
    d += ` L${(t * W).toFixed(1)},${(MID - sign * spread).toFixed(1)}`
  }
  return d
}

const FAINT_SERIES = Array.from({ length: FAINT_PATHS }, (_, i) => simulate(i + 100))
const HIGHLIGHT_SERIES = simulate(HIGHLIGHT_SEED)
const FAINT = FAINT_SERIES.map(toSvgPath)
const HIGHLIGHT = toSvgPath(HIGHLIGHT_SERIES)
const EDGE_X = 2 * STEP_SD * Math.sqrt(STEPS) // ±2σ√T in units of X
const EDGE = EDGE_X * SCALE
const INSIDE = [...FAINT_SERIES, HIGHLIGHT_SERIES].filter(xs => Math.abs(xs[STEPS]) <= EDGE_X).length
const TOTAL = FAINT_PATHS + 1
const UPPER = envelope(1)
const LOWER = envelope(-1)

/** Home hero figure: simulated diffusion paths in a small coordinate system. */
export default function EquationAccent() {
  const clipId = useId()
  return (
    <FigureFrame
      index="Fig. 1"
      title="Diffusion paths"
      viewBox={[-6, -14, W + 62, H + 42]}
      label={`${TOTAL} simulated Brownian paths fanning out from a common start inside a plus-or-minus two sigma root t envelope, with one path highlighted; ${INSIDE} of ${TOTAL} end inside the envelope`}
      notation={[
        ['Model', 'dXₜ = σ dWₜ,  X₀ = 0'],
        ['Spread', 'sd(Xₜ) = σ√t'],
        ['Envelope', '±2σ√t  (≈ 95% of paths)'],
        ['Result', `${INSIDE} of ${TOTAL} paths end inside`],
      ]}
      source={`Simulated, ${TOTAL} paths × ${STEPS} Gaussian steps. Illustrative only.`}
    >
      <defs>
        <clipPath id={clipId}>
          <rect x={0} y={0} width={W} height={H} />
        </clipPath>
      </defs>
      <g className="plot__grid">
        {[1, 2, 3, 4, 5].map(i => (
          <line key={`v${i}`} x1={(i * W) / 6} y1={0} x2={(i * W) / 6} y2={H} />
        ))}
        {[1, 3].map(i => (
          <line key={`h${i}`} x1={0} y1={(i * H) / 4} x2={W} y2={(i * H) / 4} />
        ))}
      </g>
      <line className="plot__axis" x1={0} y1={0} x2={0} y2={H} />
      <line className="plot__axis plot__axis--mean" x1={0} y1={MID} x2={W} y2={MID} />
      <g className="plot__faint" clipPath={`url(#${clipId})`}>
        {FAINT.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>
      <path className="plot__envelope" d={UPPER} />
      <path className="plot__envelope" d={LOWER} />
      <path className="plot__path" d={HIGHLIGHT} pathLength={1} clipPath={`url(#${clipId})`} />
      <circle className="plot__dot" cx={0} cy={MID} r={4} />
      <g className="plot__ticks">
        <line x1={W + 6} y1={MID - EDGE} x2={W + 12} y2={MID - EDGE} />
        <line x1={W + 6} y1={MID + EDGE} x2={W + 12} y2={MID + EDGE} />
      </g>
      <text className="plot__text" x={W + 16} y={MID - EDGE + 4}>
        +2σ√t
      </text>
      <text className="plot__text" x={W + 16} y={MID + EDGE + 4}>
        −2σ√t
      </text>
      <text className="plot__text" x={0} y={H + 22}>
        time t
      </text>
      <text className="plot__text" x={W} y={H + 22} textAnchor="end">
        T
      </text>
    </FigureFrame>
  )
}
