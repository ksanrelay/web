import { useId } from 'react'
import FigureFrame from './figures/FigureFrame.tsx'
import { mulberry32 } from './figures/random.ts'

// A fan of simulated diffusion paths inside their ±2σ√t envelope — the same image as the brand banner.
// Generated from fixed seeds so the figure is identical on every load.
const STEPS = 72
const W = 480
const H = 260
const MID = H / 2
const SCALE = 5.2 // px per unit of X
const STEP_SD = 1.9 * 0.5 // sd of one increment (sum of three uniforms − 1.5, × 1.9)
const FAINT_PATHS = 26
const HIGHLIGHT_SEED = 43

function samplePath(seed: number): string {
  const rand = mulberry32(seed)
  let x = 0
  let d = `M0,${MID}`
  for (let i = 1; i <= STEPS; i++) {
    x += (rand() + rand() + rand() - 1.5) * 1.9
    d += ` L${((i / STEPS) * W).toFixed(1)},${(MID - x * SCALE).toFixed(1)}`
  }
  return d
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

const FAINT = Array.from({ length: FAINT_PATHS }, (_, i) => samplePath(i + 100))
const HIGHLIGHT = samplePath(HIGHLIGHT_SEED)
const EDGE = 2 * STEP_SD * Math.sqrt(STEPS) * SCALE // ±2σ at t = T
const UPPER = envelope(1)
const LOWER = envelope(-1)

/** Home hero figure: simulated diffusion paths in a small coordinate system. */
export default function EquationAccent() {
  const clipId = useId()
  return (
    <FigureFrame
      index="Fig. 1"
      title="Diffusion paths"
      viewBox={[-6, -14, W + 52, H + 28]}
      label="Simulated diffusion paths fanning out from a common start, inside a plus-or-minus two sigma envelope, with one path highlighted"
      notation={[
        ['State', 'dXₜ = μ dt + σ dWₜ'],
        ['Infer', 'E[Xₜ₊₁ | 𝓕ₜ]'],
        ['Optimize', 'θ* = argmin L(θ)'],
        ['Cost', 'O(n log n)'],
      ]}
      source={`Simulated random walks, ${FAINT_PATHS + 1} paths × ${STEPS} steps. Illustrative only.`}
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
        +2σ
      </text>
      <text className="plot__text" x={W + 16} y={MID + EDGE + 4}>
        −2σ
      </text>
    </FigureFrame>
  )
}
