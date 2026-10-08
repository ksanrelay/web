import type { ReactNode } from 'react'
import TechnicalLabel from '../TechnicalLabel.tsx'

export interface FigureFrameProps {
  /** e.g. "Fig. 2" */
  index: string
  title: string
  /** SVG coordinate box: [minX, minY, width, height]. */
  viewBox: [number, number, number, number]
  /** Accessible description of what the plot shows. */
  label: string
  notation: [term: string, expression: string][]
  /** Visible note on where the data comes from. */
  source: string
  children: ReactNode
}

/** Shared card for the site's illustrative quant figures: header, plot, notation table, source note. */
export default function FigureFrame({ index, title, viewBox, label, notation, source, children }: FigureFrameProps) {
  return (
    <figure className="figure">
      <div className="figure__head">
        <TechnicalLabel>{index}</TechnicalLabel>
        <TechnicalLabel>{title}</TechnicalLabel>
      </div>
      <svg className="figure__plot" viewBox={viewBox.join(' ')} role="img" aria-label={label}>
        {children}
      </svg>
      <dl className="figure__notation">
        {notation.map(([term, expr]) => (
          <div key={term} className="figure__row">
            <dt>
              <TechnicalLabel>{term}</TechnicalLabel>
            </dt>
            <dd className="mono">{expr}</dd>
          </div>
        ))}
      </dl>
      <figcaption className="figure__source">{source}</figcaption>
    </figure>
  )
}
