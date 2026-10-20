import clsx from 'clsx'
import type { ReactNode } from 'react'

interface SectionProps {
  /** Plain-text name, used for the heading id and as the heading when there is no `title`. */
  label: string
  title?: ReactNode
  children: ReactNode
  className?: string
}

/** Page section under a hairline rule, with one heading. */
export default function Section({ label, title, children, className }: SectionProps) {
  const headingId = `section-${label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
  return (
    <section className={clsx('section', className)} aria-labelledby={headingId}>
      <h2 id={headingId} className={clsx('section__title', !title && 'sr-only')}>
        {title ?? label}
      </h2>
      {children}
    </section>
  )
}
