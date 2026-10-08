import clsx from 'clsx'
import type { ReactNode } from 'react'
import TechnicalLabel from './TechnicalLabel.tsx'

interface SectionProps {
  /** Two-digit index, e.g. "01". */
  index?: string
  label: string
  title?: ReactNode
  aside?: ReactNode
  children: ReactNode
  className?: string
}

/** Numbered page section with a Swiss-style header rule: `01 / LABEL`. */
export default function Section({ index, label, title, aside, children, className }: SectionProps) {
  const headingId = `section-${label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
  return (
    <section className={clsx('section', className)} aria-labelledby={headingId}>
      <header className="section__header">
        <TechnicalLabel>
          {index && <span className="section__index">{index} / </span>}
          {label}
        </TechnicalLabel>
        {aside && <TechnicalLabel className="section__aside">{aside}</TechnicalLabel>}
      </header>
      <h2 id={headingId} className={clsx('section__title', !title && 'sr-only')}>
        {title ?? label}
      </h2>
      {children}
    </section>
  )
}
