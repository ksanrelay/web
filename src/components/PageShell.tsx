import clsx from 'clsx'
import { ChevronLeft } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import type { RouteMeta } from '../site.ts'
import { usePageMeta } from '../usePageMeta.ts'
import TechnicalLabel from './TechnicalLabel.tsx'

interface PageShellProps {
  meta: RouteMeta
  /** Monospaced label above the page title. Use only when it adds information the title does not. */
  label?: string
  /** Link to the parent page, shown above the title. */
  crumb?: { to: string; label: string }
  title?: ReactNode
  /** Small metadata line under the title, e.g. the last-updated date. */
  byline?: ReactNode
  lead?: ReactNode
  /** Right-hand notation in the page header, e.g. "E[X | F]". */
  notation?: string
  /** Figure shown to the right of the title and lead (stacked below them on small screens). */
  figure?: ReactNode
  /** Extra content kept in the left column under the lead when a figure is shown. */
  intro?: ReactNode
  children?: ReactNode
  className?: string
}

/** Standard page frame: sets document metadata and renders the page header. */
export default function PageShell({
  meta,
  label,
  crumb,
  title,
  byline,
  lead,
  notation,
  figure,
  intro,
  children,
  className,
}: PageShellProps) {
  usePageMeta(meta)
  const heading = (
    <>
      <h1 className="page__title">{title}</h1>
      {byline && (
        <TechnicalLabel as="p" className="page__byline">
          {byline}
        </TechnicalLabel>
      )}
      {lead && <p className="page__lead">{lead}</p>}
    </>
  )
  return (
    <div className={clsx('container page', className)}>
      {title && (
        <header className="page__header">
          {(label || crumb || notation) && (
            <div className="page__header-row">
              {crumb && (
                <nav aria-label="Breadcrumb">
                  <Link to={crumb.to} className="page__crumb tech-label">
                    <ChevronLeft size={14} strokeWidth={1.75} aria-hidden="true" />
                    {crumb.label}
                  </Link>
                </nav>
              )}
              {label && <TechnicalLabel>{label}</TechnicalLabel>}
              {notation && (
                <TechnicalLabel className="page__notation" aria-hidden="true">
                  {notation}
                </TechnicalLabel>
              )}
            </div>
          )}
          {figure ? (
            <div className="page__intro">
              <div className="page__intro-text">
                {heading}
                {intro}
              </div>
              {figure}
            </div>
          ) : (
            heading
          )}
        </header>
      )}
      {children}
    </div>
  )
}
