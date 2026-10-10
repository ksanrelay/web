import type { ReactNode } from 'react'
import type { Release } from '../content/publications.ts'
import ExternalLink from './ExternalLink.tsx'
import TechnicalLabel from './TechnicalLabel.tsx'

interface ReleaseListProps {
  items: Release[]
  /** Shown instead of the list when there are no items. */
  empty: ReactNode
}

export default function ReleaseList({ items, empty }: ReleaseListProps) {
  if (items.length === 0) return <p className="entry-empty">{empty}</p>
  return (
    <ol className="entry-list">
      {items.map(r => (
        <li key={r.name} className="entry">
          <div className="entry__meta">
            <TechnicalLabel>{r.type}</TechnicalLabel>
            {r.version && <TechnicalLabel>{r.version}</TechnicalLabel>}
            {r.license && <TechnicalLabel>{r.license}</TechnicalLabel>}
          </div>
          <div className="entry__body">
            <h3 className="entry__title mono">{r.name}</h3>
            <p className="entry__text">{r.description}</p>
            <p className="entry__links">
              <ExternalLink href={r.repository}>Repository<span className="sr-only"> for {r.name}</span></ExternalLink>
              {r.docs && <ExternalLink href={r.docs}>Documentation<span className="sr-only"> for {r.name}</span></ExternalLink>}
            </p>
          </div>
        </li>
      ))}
    </ol>
  )
}
