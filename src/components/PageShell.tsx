import clsx from 'clsx'
import type { ReactNode } from 'react'
import type { RouteMeta } from '../site.ts'
import { usePageMeta } from '../usePageMeta.ts'
import TechnicalLabel from './TechnicalLabel.tsx'

interface PageShellProps {
  meta: RouteMeta
  /** Monospaced eyebrow above the page title. */
  label?: string
  title?: ReactNode
  lead?: ReactNode
  /** Right-hand notation in the page header, e.g. "E[X | F]". */
  notation?: string
  children?: ReactNode
  className?: string
}

/** Standard page frame: sets document metadata and renders the page header. */
export default function PageShell({ meta, label, title, lead, notation, children, className }: PageShellProps) {
  usePageMeta(meta)
  return (
    <div className={clsx('container page', className)}>
      {title && (
        <header className="page__header">
          <div className="page__header-row">
            {label && <TechnicalLabel>{label}</TechnicalLabel>}
            {notation && (
              <TechnicalLabel className="page__notation" aria-hidden="true">
                {notation}
              </TechnicalLabel>
            )}
          </div>
          <h1 className="page__title">{title}</h1>
          {lead && <p className="page__lead">{lead}</p>}
        </header>
      )}
      {children}
    </div>
  )
}
