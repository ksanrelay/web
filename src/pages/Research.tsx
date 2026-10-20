import type { ReactNode } from 'react'
import ExternalLink from '../components/ExternalLink.tsx'
import AutocorrelationFigure from '../components/figures/AutocorrelationFigure.tsx'
import PageShell from '../components/PageShell.tsx'
import PublicationList from '../components/PublicationList.tsx'
import Section from '../components/Section.tsx'
import { sortedPublications } from '../content/publications.ts'
import { CONTACT, ROUTES } from '../site.ts'

const AREAS: [area: string, scope: string][] = [
  ['Statistical modeling', 'Time-series methods, inference and model validation'],
  ['Market structure', 'Liquidity, execution, price formation and market behavior'],
  ['Algorithmic systems', 'Rule-based and data-driven methods for trading decisions'],
  ['Computational methods', 'Simulation, numerical methods and optimization'],
  ['Research infrastructure', 'Data pipelines, reproducible workflows and tooling'],
]

const FORMATS = ['Papers', 'Preprints', 'Technical reports', 'Research notes', 'Experiments', 'Methodology', 'Market studies']

const PRINCIPLES: { key: string; title: ReactNode; body: string }[] = [
  {
    key: 'testable',
    title: 'Testable claims',
    body: 'A hypothesis is only as good as the test that could have rejected it.',
  },
  {
    key: 'assumptions',
    title: 'Explicit assumptions',
    body: 'Each model states what it assumes about data, costs and the process that generated them.',
  },
  {
    key: 'reproducible',
    title: 'Reproducible results',
    body: 'Results are tied to versioned code, fixed data snapshots and recorded parameters.',
  },
  {
    key: 'out-of-sample',
    // Keep the compound together: narrow columns otherwise break it as "Out-of- / sample".
    title: (
      <>
        <span className="nowrap">Out-of-sample</span> validation
      </>
    ),
    body: 'Conclusions follow out-of-sample tests, multiple-comparison control and honest error bars.',
  },
]

export default function Research() {
  const publications = sortedPublications()
  return (
    <PageShell
      meta={ROUTES.research}
      title="Research"
      lead="We study financial markets with quantitative, statistical and computational methods, and publish selected work with the code and data needed to check it."
      figure={<AutocorrelationFigure />}
      intro={
        <dl className="kv-table">
          {AREAS.map(([area, scope]) => (
            <div key={area} className="kv-table__row">
              <dt>{area}</dt>
              <dd>{scope}</dd>
            </div>
          ))}
        </dl>
      }
    >
      <Section label="Publications" title="Publications">
        <PublicationList
          items={publications}
          empty="No publications yet. New work will be listed here with its date, authors, abstract and links, and code will be released on GitHub."
          emptyAction={
            <ExternalLink href={CONTACT.github} className="button">
              GitHub
            </ExternalLink>
          }
        />
        <div className="formats">
          <span className="tech-label">Formats</span>
          <ul className="dot-list" aria-label="Formats">
            {FORMATS.map(format => (
              <li key={format}>{format}</li>
            ))}
          </ul>
        </div>
      </Section>

      <Section label="Method" title="How the research is done">
        <ul className="principles">
          {PRINCIPLES.map(p => (
            <li key={p.key} className="principles__item">
              <h3 className="principles__title">{p.title}</h3>
              <p className="principles__body">{p.body}</p>
            </li>
          ))}
        </ul>
        <p className="note">
          Some research stays private while it is developed and validated, and some is used in Ksan Relay’s own
          trading. Published research is not investment advice.
        </p>
      </Section>
    </PageShell>
  )
}
