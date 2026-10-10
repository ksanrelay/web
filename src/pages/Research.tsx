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

const PRINCIPLES = [
  ['Testable claims', 'A hypothesis is only as good as the test that could have rejected it.'],
  ['Explicit assumptions', 'Each model states what it assumes about data, costs and the process that generated them.'],
  ['Reproducible results', 'Results are tied to versioned code, fixed data snapshots and recorded parameters.'],
  ['Out-of-sample validation', 'Conclusions follow out-of-sample tests, multiple-comparison control and honest error bars.'],
]

export default function Research() {
  const publications = sortedPublications()
  return (
    <PageShell
      meta={ROUTES.research}
      label="RESEARCH"
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
      <Section index="01" label="PUBLICATIONS" title="Publications">
        <PublicationList
          items={publications}
          empty={
            <>
              No publications yet. New work will be listed here with its date, authors, abstract and links, and code
              will be released on <ExternalLink href={CONTACT.github}>GitHub</ExternalLink>.
            </>
          }
        />
        <p className="formats">
          <span className="tech-label">Formats</span>
          <span>{FORMATS.join(' · ')}</span>
        </p>
      </Section>

      <Section index="02" label="METHOD" title="How the research is done">
        <ul className="principles">
          {PRINCIPLES.map(([title, body]) => (
            <li key={title} className="principles__item">
              <h3 className="principles__title">{title}</h3>
              <p className="principles__body">{body}</p>
            </li>
          ))}
        </ul>
        <p className="note">
          Some research stays private while it is developed and validated, and some is used in KSAN RELAY’s own
          trading. Published research is not investment advice.
        </p>
      </Section>
    </PageShell>
  )
}
