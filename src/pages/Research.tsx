import ExternalLink from '../components/ExternalLink.tsx'
import AutocorrelationFigure from '../components/figures/AutocorrelationFigure.tsx'
import PageShell from '../components/PageShell.tsx'
import TechnicalLabel from '../components/TechnicalLabel.tsx'
import { CONTACT, ROUTES } from '../site.ts'

const STATUS: [string, string][] = [
  ['STATUS', 'ACTIVE'],
  ['PUBLICATIONS', 'FORTHCOMING'],
  ['FOCUS', 'QUANTITATIVE METHODS'],
]

export default function Research() {
  return (
    <PageShell
      meta={ROUTES.research}
      label="RESEARCH"
      figure={<AutocorrelationFigure />}
      title="Research"
      lead="Research at KSAN Relay is currently ongoing. Selected work will be published when it reaches an appropriate level of methodological and technical maturity."
    >
      <div className="research-status">
        <dl className="card status-table">
          {STATUS.map(([key, value]) => (
            <div key={key} className="status-table__row">
              <dt>
                <TechnicalLabel>{key}</TechnicalLabel>
              </dt>
              <dd className="mono">{value}</dd>
            </div>
          ))}
        </dl>
        <div className="prose">
          <p>Some research may remain private during active development and validation.</p>
          <p>
            Where code, data handling, or methodology can be shared, it will be released with an explicit license and a
            statement of its assumptions and limitations. Anything published here is research, not investment advice.
          </p>
          <p>
            <ExternalLink href={CONTACT.github}>KSAN Relay on GitHub</ExternalLink>
          </p>
        </div>
      </div>
    </PageShell>
  )
}
