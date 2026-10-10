import FigureFrame from './FigureFrame.tsx'
import { mulberry32, normalSampler, toPath } from './random.ts'

// Sample autocorrelation of a simulated AR(1) process against its theoretical decay φᵏ,
// with the ±1.96/√n band used to judge which lags are distinguishable from zero.
const PHI = 0.6
const N = 400
const BURN_IN = 100
const MAX_LAG = 30

const W = 480
const H = 240
const Y_MAX = 1.05
const Y_MIN = -0.3
const y = (v: number) => (H * (Y_MAX - v)) / (Y_MAX - Y_MIN)
const x = (k: number) => 8 + (k * (W - 16)) / MAX_LAG

function simulate(): number[] {
  const z = normalSampler(mulberry32(131))
  const series: number[] = []
  let prev = 0
  for (let t = 0; t < N + BURN_IN; t++) {
    prev = PHI * prev + z()
    if (t >= BURN_IN) series.push(prev)
  }
  return series
}

function sampleAcf(series: number[], maxLag: number): number[] {
  const mean = series.reduce((a, b) => a + b, 0) / series.length
  const dev = series.map(v => v - mean)
  const denom = dev.reduce((a, d) => a + d * d, 0)
  return Array.from({ length: maxLag + 1 }, (_, k) => {
    let num = 0
    for (let t = k; t < dev.length; t++) num += dev[t] * dev[t - k]
    return num / denom
  })
}

const ACF = sampleAcf(simulate(), MAX_LAG)
const BAND = 1.96 / Math.sqrt(N)
const THEORY = toPath(Array.from({ length: 121 }, (_, i) => i / 4).map(k => [x(k), y(PHI ** k)]))
const SIGNIFICANT = ACF.slice(1).filter(r => Math.abs(r) > BAND).length

export default function AutocorrelationFigure() {
  return (
    <FigureFrame
      index="Fig. 2"
      title="Autocorrelation"
      viewBox={[-30, -12, W + 44, H + 40]}
      label={`Sample autocorrelation of a simulated AR(1) series for lags 0 to ${MAX_LAG}, decaying with the theoretical curve phi to the k, with a 95 percent band around zero`}
      notation={[
        ['Model', `Xₜ = ${PHI} Xₜ₋₁ + εₜ`],
        ['Theory', 'ρ(k) = φᵏ'],
        ['Band', `±1.96/√n = ±${BAND.toFixed(3)}`],
        ['Result', `${SIGNIFICANT} of ${MAX_LAG} lags outside band`],
      ]}
      source={`Simulated AR(1), n = ${N}, Gaussian innovations. Illustrative only.`}
    >
      <g className="plot__grid">
        {[0.25, 0.5, 0.75, 1].map(v => (
          <line key={v} x1={0} y1={y(v)} x2={W} y2={y(v)} />
        ))}
        {[10, 20].map(k => (
          <line key={k} x1={x(k)} y1={0} x2={x(k)} y2={H} />
        ))}
      </g>
      <line className="plot__axis" x1={0} y1={0} x2={0} y2={H} />
      <line className="plot__axis" x1={0} y1={y(0)} x2={W} y2={y(0)} />
      <rect className="plot__band" x={0} y={y(BAND)} width={W} height={y(-BAND) - y(BAND)} />
      <line className="plot__envelope" x1={0} y1={y(BAND)} x2={W} y2={y(BAND)} />
      <line className="plot__envelope" x1={0} y1={y(-BAND)} x2={W} y2={y(-BAND)} />
      <g className="plot__stems">
        {ACF.map((r, k) => {
          const strong = Math.abs(r) > BAND
          return (
            <g key={k} className={strong ? 'plot__stem plot__stem--strong' : 'plot__stem'}>
              <line x1={x(k)} y1={y(0)} x2={x(k)} y2={y(r)} />
              <circle cx={x(k)} cy={y(r)} r={2.6} />
            </g>
          )
        })}
      </g>
      <path className="plot__path" d={THEORY} pathLength={1} />
      <text className="plot__text" x={-8} y={y(1) + 4} textAnchor="end">
        1
      </text>
      <text className="plot__text" x={-8} y={y(0.5) + 4} textAnchor="end">
        .5
      </text>
      <text className="plot__text" x={-8} y={y(0) + 4} textAnchor="end">
        0
      </text>
      {[0, 10, 20, 30].map(k => (
        <text key={k} className="plot__text" x={x(k)} y={H + 18} textAnchor="middle">
          {k}
        </text>
      ))}
      <text className="plot__text plot__text--label" x={x(2) + 12} y={y(PHI ** 2) - 8}>
        φᵏ
      </text>
      <text className="plot__text plot__text--label" x={x(25)} y={H + 18} textAnchor="middle">
        lag k
      </text>
    </FigureFrame>
  )
}
