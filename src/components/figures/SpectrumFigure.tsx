import FigureFrame, { type PlotCursor } from './FigureFrame.tsx'
import { mulberry32, normalSampler, toPath } from './random.ts'
import { once } from './util.ts'

// Signal recovery: two sinusoids buried in Gaussian noise (top) and the periodogram that recovers
// their frequencies (bottom). The periodogram is computed from the plotted series.
const N = 256
const F1 = 12
const F2 = 37
const A1 = 1
const A2 = 0.6
const NOISE = 0.9

const W = 480
const TOP_H = 96
const GAP = 34
const BOTTOM_Y = TOP_H + GAP
const BOTTOM_H = 132
const H = BOTTOM_Y + BOTTOM_H
const HALF = N / 2

const fx = (f: number) => (f / HALF) * W

const data = once(() => {
  const z = normalSampler(mulberry32(37))
  const series = Array.from(
    { length: N },
    (_, t) => A1 * Math.sin((2 * Math.PI * F1 * t) / N) + A2 * Math.sin((2 * Math.PI * F2 * t) / N + 0.8) + NOISE * z(),
  )

  // Periodogram S(f) = |Σ xₜ e^(−2πift/n)|² / n for f = 1 … n/2 (direct DFT; n is small).
  const mean = series.reduce((a, b) => a + b, 0) / N
  const spectrum = Array.from({ length: HALF }, (_, i) => {
    const f = i + 1
    let re = 0
    let im = 0
    for (let t = 0; t < N; t++) {
      const angle = (2 * Math.PI * f * t) / N
      re += (series[t] - mean) * Math.cos(angle)
      im -= (series[t] - mean) * Math.sin(angle)
    }
    return { f, power: (re * re + im * im) / N }
  })

  const peak = Math.max(...spectrum.map(s => s.power))
  const floor = spectrum.map(s => s.power).sort((a, b) => a - b)[Math.floor(HALF / 2)] // median
  const sy = (p: number) => BOTTOM_Y + BOTTOM_H - (p / peak) * (BOTTOM_H - 10)
  const amp = Math.max(...series.map(Math.abs))

  const cursor: PlotCursor = {
    xs: spectrum.map(s => fx(s.f)),
    ys: spectrum.map(s => sy(s.power)),
    top: BOTTOM_Y,
    bottom: BOTTOM_Y + BOTTOM_H,
    read: i => `f = ${spectrum[i].f}  S(f) ${spectrum[i].power.toFixed(2)}`,
  }
  return {
    spectrum,
    floor,
    sy,
    topTwo: [...spectrum].sort((a, b) => b.power - a.power).slice(0, 2),
    snrDb: 10 * Math.log10(peak / floor),
    signalPath: toPath(series.map((v, t) => [(t / (N - 1)) * W, TOP_H / 2 - (v / amp) * (TOP_H / 2 - 4)])),
    cursor,
  }
})

export default function SpectrumFigure() {
  const { spectrum, floor, sy, topTwo, snrDb, signalPath, cursor } = data()
  return (
    <FigureFrame
      index="Fig. 4"
      title="Signal / noise"
      viewBox={[-12, -12, W + 24, H + 40]}
      label={`A noisy time series in the top panel and its periodogram in the bottom panel, with two clear peaks at frequencies ${F1} and ${F2} rising above the noise floor`}
      notation={[
        ['Signal', 'xₜ = Σⱼ Aⱼ sin(2πfⱼt/n) + εₜ'],
        ['Power', 'S(f) = |Σₜ xₜ e^(−2πift/n)|² / n'],
        ['Peaks', `f = ${topTwo.map(p => p.f).sort((a, b) => a - b).join(', ')}; ${snrDb.toFixed(1)} dB above median`],
        ['Floor', `median S(f) = ${floor.toFixed(2)}`],
      ]}
      source={`Simulated, n = ${N}, two tones plus Gaussian noise (σ = ${NOISE}). Illustrative only.`}
      cursor={cursor}
    >
      <g className="plot__grid">
        {[0.25, 0.5, 0.75].map(f => (
          <line key={`t${f}`} x1={f * W} y1={0} x2={f * W} y2={TOP_H} />
        ))}
        {[32, 64, 96].map(f => (
          <line key={`f${f}`} x1={fx(f)} y1={BOTTOM_Y} x2={fx(f)} y2={BOTTOM_Y + BOTTOM_H} />
        ))}
      </g>
      <line className="plot__axis plot__axis--mean" x1={0} y1={TOP_H / 2} x2={W} y2={TOP_H / 2} />
      <path className="plot__path plot__path--thin" d={signalPath} pathLength={1} />

      <line className="plot__axis" x1={0} y1={BOTTOM_Y + BOTTOM_H} x2={W} y2={BOTTOM_Y + BOTTOM_H} />
      <line className="plot__envelope" x1={0} y1={sy(floor)} x2={W} y2={sy(floor)} />
      <g className="plot__stems">
        {spectrum.map(s => {
          const strong = topTwo.includes(s)
          return (
            <g key={s.f} className={strong ? 'plot__stem plot__stem--strong' : 'plot__stem'}>
              <line x1={fx(s.f)} y1={BOTTOM_Y + BOTTOM_H} x2={fx(s.f)} y2={sy(s.power)} />
              {strong && <circle cx={fx(s.f)} cy={sy(s.power)} r={3} />}
            </g>
          )
        })}
      </g>
      {topTwo.map(p => (
        <text key={p.f} className="plot__text plot__text--label" x={fx(p.f) + 8} y={sy(p.power) + 4}>
          f = {p.f}
        </text>
      ))}
      <text className="plot__text" x={0} y={TOP_H + 18}>
        time t
      </text>
      <text className="plot__text" x={0} y={H + 18}>
        frequency f
      </text>
      {[64, HALF].map(f => (
        <text key={f} className="plot__text" x={fx(f)} y={H + 18} textAnchor={f === HALF ? 'end' : 'middle'}>
          {f}
        </text>
      ))}
      <text className="plot__text" x={W} y={sy(floor) - 6} textAnchor="end">
        median
      </text>
    </FigureFrame>
  )
}
