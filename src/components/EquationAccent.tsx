import TechnicalLabel from './TechnicalLabel.tsx'

// A fan of simulated diffusion paths inside their ±2σ√t envelope — the same image as the brand banner.
// Generated from fixed seeds so the figure is identical on every load (and costs nothing at runtime beyond SVG).
const STEPS = 72
const W = 480
const H = 260
const MID = H / 2
const SCALE = 5.2 // px per unit of X
const STEP_SD = 1.9 * 0.5 // sd of one increment (sum of three uniforms − 1.5, × 1.9)
const FAINT_PATHS = 26
const HIGHLIGHT_SEED = 43

// mulberry32: small, well-distributed PRNG; neighbouring seeds give independent streams.
function mulberry32(seed: number) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

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

const NOTATION: [string, string][] = [
  ['State', 'dXₜ = μ dt + σ dWₜ'],
  ['Infer', 'E[Xₜ₊₁ | 𝓕ₜ]'],
  ['Optimize', 'θ* = argmin L(θ)'],
  ['Cost', 'O(n log n)'],
]

/** Hero figure: simulated paths in a small coordinate system, plus the notation it stands for. */
export default function EquationAccent() {
  return (
    <figure className="figure">
      <div className="figure__head">
        <TechnicalLabel>Fig. 1</TechnicalLabel>
        <TechnicalLabel>Signal / noise</TechnicalLabel>
      </div>
      <svg
        className="figure__plot"
        viewBox={`-6 -14 ${W + 52} ${H + 28}`}
        role="img"
        aria-label="Simulated diffusion paths fanning out from a common start, inside a plus-or-minus two sigma envelope, with one path highlighted"
      >
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
        <defs>
          <clipPath id="plot-area">
            <rect x={0} y={0} width={W} height={H} />
          </clipPath>
        </defs>
        <g className="plot__fan" clipPath="url(#plot-area)">
          {FAINT.map((d, i) => (
            <path key={i} d={d} />
          ))}
        </g>
        <path className="plot__envelope" d={UPPER} />
        <path className="plot__envelope" d={LOWER} />
        <path className="plot__path" d={HIGHLIGHT} pathLength={1} clipPath="url(#plot-area)" />
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
      </svg>
      <dl className="figure__notation">
        {NOTATION.map(([term, expr]) => (
          <div key={term} className="figure__row">
            <dt>
              <TechnicalLabel>{term}</TechnicalLabel>
            </dt>
            <dd className="mono">{expr}</dd>
          </div>
        ))}
      </dl>
      <figcaption className="sr-only">
        Notation used across KSAN Relay research: stochastic state dynamics, conditional expectation, parameter
        optimization, and computational cost.
      </figcaption>
    </figure>
  )
}
