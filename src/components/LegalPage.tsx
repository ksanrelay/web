import { useEffect, useState, type ReactNode } from 'react'
import { formatDate } from '../content/publications.ts'
import { ROUTES, type RouteMeta } from '../site.ts'
import PageShell from './PageShell.tsx'

export interface LegalSection {
  /** Anchor id, e.g. "cookies" for /privacy#cookies. */
  id: string
  title: string
  body: ReactNode
}

interface LegalPageProps {
  meta: RouteMeta
  title: string
  /** ISO date of the latest revision. */
  updated: string
  intro?: ReactNode
  sections: LegalSection[]
  outro?: ReactNode
}

/**
 * Id of the section currently being read: the first one crossing a band 20–30% down the viewport.
 * Between sections the last match stays active. One IntersectionObserver, no scroll listener.
 */
function useActiveSection(ids: string[]): string | null {
  const [active, setActive] = useState<string | null>(null)
  const key = ids.join(' ')
  useEffect(() => {
    const order = key.split(' ')
    const visible = new Set<string>()
    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id)
          else visible.delete(entry.target.id)
        }
        const current = order.find(id => visible.has(id))
        if (current) setActive(current)
      },
      { rootMargin: '-20% 0px -70% 0px' },
    )
    for (const id of order) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [key])
  return active
}

function Contents({ sections, active }: { sections: LegalSection[]; active?: string | null }) {
  return (
    <ol className="legal-toc__list">
      {sections.map(s => (
        <li key={s.id}>
          <a href={`#${s.id}`} className="legal-toc__link" aria-current={s.id === active ? 'true' : undefined}>
            {s.title}
          </a>
        </li>
      ))}
    </ol>
  )
}

/** Policy document: breadcrumb, revision date, contents (sticky rail on wide screens, foldout on narrow). */
export default function LegalPage({ meta, title, updated, intro, sections, outro }: LegalPageProps) {
  const active = useActiveSection(sections.map(s => s.id))
  return (
    <PageShell
      meta={meta}
      crumb={{ to: ROUTES.policy.path, label: 'Policy' }}
      title={title}
      byline={
        <>
          Last updated <time dateTime={updated}>{formatDate(updated, 'long')}</time>
        </>
      }
    >
      <div className="legal-layout">
        <details className="legal-toc-compact">
          <summary className="legal-toc-compact__summary">
            <span className="tech-label">On this page</span>
          </summary>
          <nav aria-label="On this page">
            <Contents sections={sections} />
          </nav>
        </details>

        <nav className="legal-toc" aria-label="On this page">
          <p className="legal-toc__heading tech-label">On this page</p>
          <Contents sections={sections} active={active} />
        </nav>

        <div className="prose legal">
          {intro}
          {sections.map(s => (
            <section key={s.id} id={s.id} aria-labelledby={`${s.id}-title`}>
              <h2 id={`${s.id}-title`}>{s.title}</h2>
              {s.body}
            </section>
          ))}
          {outro}
        </div>
      </div>
    </PageShell>
  )
}
