import TechnicalLabel from './TechnicalLabel.tsx'

// Deterministic sample path (seeded LCG) so the figure is identical on every load.
const STEPS = 64
const W = 320
const H = 160
const MID = H / 2
const SCALE = 4.5 // px per unit of X
const STEP_SD = 1.9 * 0.5 // sd of one increment

function samplePath(): string {
  let seed = 7
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296
    return seed / 4294967296
  }
  let x = 0
  const points: string[] = []
  for (let i = 0; i <= STEPS; i++) {
    // Sum of uniforms ≈ normal increment.
    if (i > 0) x += (rand() + rand() + rand() - 1.5) * 1.9
    points.push(`${((i / STEPS) * W).toFixed(1)},${(MID - x * SCALE).toFixed(1)}`)
  }
  return 'M' + points.join(' L')
}

// ±2σ√t envelope for the same process.
function envelope(sign: 1 | -1): string {
  const points: string[] = []
  for (let i = 0; i <= 32; i++) {
    const t = i / 32
    const spread = 2 * STEP_SD * Math.sqrt(t * STEPS) * SCALE
    points.push(`${(t * W).toFixed(1)},${(MID - sign * spread).toFixed(1)}`)
  }
  return 'M' + points.join(' L')
}

const PATH = samplePath()
const UPPER = envelope(1)
const LOWER = envelope(-1)

const NOTATION: [string, string][] = [
  ['STATE', 'dXₜ = μ dt + σ dWₜ'],
  ['INFER', 'E[Xₜ₊₁ | 𝓕ₜ]'],
  ['OPTIMIZE', 'θ* = argmin L(θ)'],
  ['SIGNAL', 'X(ω) = Σ xₙ e⁻ⁱʷⁿ'],
  ['COST', 'O(n log n)'],
]

/** Hero figure: a small coordinate system with one diffusion path, plus the notation it stands for. */
export default function EquationAccent() {
  return (
    <figure className="card equation-accent">
      <div className="equation-accent__head">
        <TechnicalLabel>FIG. 1</TechnicalLabel>
        <TechnicalLabel>SIGNAL / NOISE</TechnicalLabel>
      </div>
      <svg
        className="equation-accent__plot"
        viewBox={`-12 -8 ${W + 24} ${H + 16}`}
        role="img"
        aria-label="A single simulated diffusion path inside its plus-or-minus two sigma envelope"
      >
        <g className="plot__grid">
          {[0.25, 0.5, 0.75].map(f => (
            <line key={f} x1={f * W} y1={0} x2={f * W} y2={H} />
          ))}
          {[0.25, 0.75].map(f => (
            <line key={f} x1={0} y1={f * H} x2={W} y2={f * H} />
          ))}
        </g>
        <line className="plot__axis" x1={0} y1={MID} x2={W} y2={MID} />
        <line className="plot__axis" x1={0} y1={0} x2={0} y2={H} />
        <path className="plot__envelope" d={UPPER} />
        <path className="plot__envelope" d={LOWER} />
        <path className="plot__path" d={PATH} />
        <circle className="plot__dot" cx={0} cy={MID} r={3} />
        <text className="plot__text" x={W - 2} y={10} textAnchor="end">
          +2σ√t
        </text>
        <text className="plot__text" x={W - 2} y={H - 2} textAnchor="end">
          −2σ√t
        </text>
      </svg>
      <dl className="equation-accent__list">
        {NOTATION.map(([term, expr]) => (
          <div key={term} className="equation-accent__row">
            <dt>
              <TechnicalLabel>{term}</TechnicalLabel>
            </dt>
            <dd className="mono">{expr}</dd>
          </div>
        ))}
      </dl>
      <figcaption className="sr-only">
        Notation used across KSAN Relay research: stochastic state dynamics, conditional expectation, parameter
        optimization, spectral analysis, and computational cost.
      </figcaption>
    </figure>
  )
}
