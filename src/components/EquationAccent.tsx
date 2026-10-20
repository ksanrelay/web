import { useId, useMemo, useState } from 'react'
import FigureFrame, { type PlotCursor } from './figures/FigureFrame.tsx'
import { mulberry32, normalSampler } from './figures/random.ts'
import { signed } from './figures/util.ts'

// Simulated driftless Brownian paths, Xₜ = σWₜ, sampled on a grid of STEPS points, inside their ±2σ√t envelope.
// The first run uses fixed seeds, so the prerendered figure is identical on every load; "Resimulate" shifts
// every seed. The coverage quoted beside the figure is computed from the paths on screen.
const STEPS = 72
const W = 480
const H = 260
const MID = H / 2
const SCALE = 5.2 // px per unit of X
const STEP_SD = 0.95 // σ per step
const FAINT_PATHS = 26
const HIGHLIGHT_SEED = 30
const FAINT_SEED = 100
const RUN_STRIDE = 1000 // seed shift per run; keeps every run's streams distinct from earlier runs
const EDGE_X = 2 * STEP_SD * Math.sqrt(STEPS) // ±2σ√T in units of X
const EDGE = EDGE_X * SCALE
const TOTAL = FAINT_PATHS + 1
const TIME_XS = Array.from({ length: STEPS + 1 }, (_, i) => (i / STEPS) * W)

function simulate(seed: number): number[] {
  const z = normalSampler(mulberry32(seed))
  const xs = [0]
  for (let i = 1; i <= STEPS; i++) xs.push(xs[i - 1] + STEP_SD * z())
  return xs
}

function toSvgPath(xs: number[]): string {
  return xs.map((x, i) => `${i === 0 ? 'M' : 'L'}${TIME_XS[i].toFixed(1)},${(MID - x * SCALE).toFixed(1)}`).join(' ')
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

const UPPER = envelope(1)
const LOWER = envelope(-1)

function runPaths(run: number) {
  const offset = run * RUN_STRIDE
  const faint = Array.from({ length: FAINT_PATHS }, (_, i) => simulate(FAINT_SEED + i + offset))
  const highlight = simulate(HIGHLIGHT_SEED + offset)
  const cursor: PlotCursor = {
    xs: TIME_XS,
    ys: highlight.map(x => Math.min(H, Math.max(0, MID - x * SCALE))),
    top: 0,
    bottom: H,
    read: i => `t = ${i}/${STEPS}  X = ${signed(highlight[i], 2, true)}`,
  }
  return {
    seed: HIGHLIGHT_SEED + offset,
    faint: faint.map(toSvgPath),
    highlight: toSvgPath(highlight),
    inside: [...faint, highlight].filter(xs => Math.abs(xs[STEPS]) <= EDGE_X).length,
    cursor,
  }
}

/** Home hero figure: simulated diffusion paths in a small coordinate system. */
export default function EquationAccent() {
  const clipId = useId()
  const [run, setRun] = useState(0)
  const paths = useMemo(() => runPaths(run), [run])
  return (
    <FigureFrame
      index="Fig. 1"
      title="Diffusion paths"
      viewBox={[-6, -14, W + 62, H + 42]}
      label={`${TOTAL} simulated Brownian paths fanning out from a common start inside a plus-or-minus two sigma root t envelope, with one path highlighted; ${paths.inside} of ${TOTAL} end inside the envelope`}
      notation={[
        ['Model', 'dXₜ = σ dWₜ,  X₀ = 0'],
        ['Spread', 'sd(Xₜ) = σ√t'],
        ['Envelope', '±2σ√t  (≈ 95% of paths)'],
        ['Result', `${paths.inside} of ${TOTAL} paths end inside`],
      ]}
      source={`Simulated, ${TOTAL} paths × ${STEPS} Gaussian steps, seed ${paths.seed}. Illustrative only.`}
      cursor={paths.cursor}
      live
      action={
        <button type="button" className="figure__action" onClick={() => setRun(r => r + 1)}>
          Resimulate
        </button>
      }
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
        {paths.faint.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>
      <path className="plot__envelope" d={UPPER} />
      <path className="plot__envelope" d={LOWER} />
      {/* Keyed by run so a new simulation replays the draw animation. */}
      <path key={run} className="plot__path" d={paths.highlight} pathLength={1} clipPath={`url(#${clipId})`} />
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
