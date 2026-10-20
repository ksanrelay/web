import { useEffect, useRef, type ReactNode } from 'react'
import TechnicalLabel from '../TechnicalLabel.tsx'

/** Pointer readout for a figure: a crosshair that snaps to the nearest sample. */
export interface PlotCursor {
  /** Sample positions along the x axis, in SVG units, ascending. */
  xs: number[]
  /** Marker position of each sample on the y axis, in SVG units. */
  ys: number[]
  /** Vertical extent of the crosshair line, in SVG units. */
  top: number
  bottom: number
  /** Readout text for sample `i`. */
  read: (i: number) => string
}

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
  cursor?: PlotCursor
  /** Control shown beside the source note, e.g. a resimulate button. */
  action?: ReactNode
  /** Announce notation changes to screen readers, for figures whose numbers can change. */
  live?: boolean
  children: ReactNode
}

/** Index of the value in ascending `xs` closest to `x`. */
function nearest(xs: number[], x: number): number {
  let lo = 0
  let hi = xs.length - 1
  while (hi - lo > 1) {
    const mid = (lo + hi) >> 1
    if (xs[mid] < x) lo = mid
    else hi = mid
  }
  return x - xs[lo] <= xs[hi] - x ? lo : hi
}

/**
 * Moves the crosshair with the pointer. Positions and readout text are written straight to the DOM once per
 * animation frame, so hovering never re-renders React or triggers layout. Mouse and pen only: on touch
 * screens the plot keeps scrolling the page.
 */
function usePlotCursor(cursor: PlotCursor | undefined, minX: number, width: number) {
  const figureRef = useRef<HTMLElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const lineRef = useRef<SVGLineElement>(null)
  const dotRef = useRef<SVGCircleElement>(null)
  const readoutRef = useRef<HTMLSpanElement>(null)
  const cursorRef = useRef(cursor)
  const enabled = cursor !== undefined

  useEffect(() => {
    cursorRef.current = cursor
  }, [cursor])

  useEffect(() => {
    const figure = figureRef.current
    const svg = svgRef.current
    if (!enabled || !figure || !svg) return

    let left = 0
    let scale = 1
    let clientX = 0
    let frame = 0
    let last = -1

    const draw = () => {
      frame = 0
      const c = cursorRef.current
      if (!c) return
      const i = nearest(c.xs, minX + (clientX - left) * scale)
      if (i === last) return
      last = i
      lineRef.current?.setAttribute('transform', `translate(${c.xs[i]} 0)`)
      dotRef.current?.setAttribute('transform', `translate(${c.xs[i]} ${c.ys[i]})`)
      if (readoutRef.current) readoutRef.current.textContent = c.read(i)
    }
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return
      clientX = e.clientX
      if (!frame) frame = requestAnimationFrame(draw)
    }
    const onEnter = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return
      // One layout read per hover; vertical scrolling does not move the plot sideways.
      const rect = svg.getBoundingClientRect()
      left = rect.left
      scale = width / rect.width
      last = -1
      figure.toggleAttribute('data-cursor', true)
      onMove(e)
    }
    const onLeave = () => {
      cancelAnimationFrame(frame)
      frame = 0
      figure.toggleAttribute('data-cursor', false)
    }

    svg.addEventListener('pointerenter', onEnter)
    svg.addEventListener('pointermove', onMove)
    svg.addEventListener('pointerleave', onLeave)
    return () => {
      cancelAnimationFrame(frame)
      svg.removeEventListener('pointerenter', onEnter)
      svg.removeEventListener('pointermove', onMove)
      svg.removeEventListener('pointerleave', onLeave)
    }
  }, [enabled, minX, width])

  return { figureRef, svgRef, lineRef, dotRef, readoutRef }
}

/** Shared card for the site's illustrative quant figures: header, plot, notation table, source note. */
export default function FigureFrame({ index, title, viewBox, label, notation, source, cursor, action, live, children }: FigureFrameProps) {
  const [minX, , width] = viewBox
  const { figureRef, svgRef, lineRef, dotRef, readoutRef } = usePlotCursor(cursor, minX, width)

  const table = (
    <dl className="figure__notation" aria-live={live ? 'polite' : undefined}>
      {notation.map(([term, expr]) => (
        <div key={term} className="figure__row">
          <dt>
            <TechnicalLabel>{term}</TechnicalLabel>
          </dt>
          <dd className="mono">{expr}</dd>
        </div>
      ))}
    </dl>
  )

  return (
    <figure className="figure" ref={figureRef}>
      <div className="figure__head">
        <TechnicalLabel>{index}</TechnicalLabel>
        <span className="figure__head-end">
          <TechnicalLabel className="figure__title">{title}</TechnicalLabel>
          {cursor && <span className="figure__readout mono" ref={readoutRef} aria-hidden="true" />}
        </span>
      </div>
      <svg className="figure__plot" ref={svgRef} viewBox={viewBox.join(' ')} role="img" aria-label={label}>
        {children}
        {cursor && (
          <g className="plot__cursor" aria-hidden="true">
            <line ref={lineRef} x1={0} y1={cursor.top} x2={0} y2={cursor.bottom} />
            <circle ref={dotRef} r={3.5} />
          </g>
        )}
      </svg>
      {/* Wide screens show the notation table; phones fold it away so the page content comes sooner. */}
      <div className="figure__notation-wide">{table}</div>
      <details className="figure__notation-narrow">
        <summary className="figure__summary">
          <TechnicalLabel>Notation</TechnicalLabel>
        </summary>
        {table}
      </details>
      <figcaption className="figure__source">
        <span>{source}</span>
        {action}
      </figcaption>
    </figure>
  )
}
