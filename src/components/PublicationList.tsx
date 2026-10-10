import type { ReactNode } from 'react'
import { formatDate, type Publication } from '../content/publications.ts'
import ExternalLink from './ExternalLink.tsx'
import TechnicalLabel from './TechnicalLabel.tsx'

interface PublicationListProps {
  items: Publication[]
  /** Shown instead of the list when there are no items. */
  empty: ReactNode
  /** Hide abstracts for a compact listing. */
  compact?: boolean
}

export default function PublicationList({ items, empty, compact }: PublicationListProps) {
  if (items.length === 0) return <p className="entry-empty">{empty}</p>
  return (
    <ol className="entry-list">
      {items.map(p => (
        <li key={p.title} className="entry">
          <div className="entry__meta">
            <TechnicalLabel>
              <time dateTime={p.date}>{formatDate(p.date)}</time>
            </TechnicalLabel>
            <TechnicalLabel>{p.category}</TechnicalLabel>
          </div>
          <div className="entry__body">
            <h3 className="entry__title">{p.title}</h3>
            <p className="entry__byline">{p.authors.join(', ')}</p>
            {!compact && <p className="entry__text">{p.abstract}</p>}
            {(p.url || p.repository) && (
              <p className="entry__links">
                {p.url && <ExternalLink href={p.url}>Read<span className="sr-only"> {p.title}</span></ExternalLink>}
                {p.repository && (
                  <ExternalLink href={p.repository}>Code<span className="sr-only"> for {p.title}</span></ExternalLink>
                )}
              </p>
            )}
          </div>
        </li>
      ))}
    </ol>
  )
}
