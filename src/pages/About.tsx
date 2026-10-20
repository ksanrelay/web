import { Link } from 'react-router-dom'
import DistributionFigure from '../components/figures/DistributionFigure.tsx'
import PageShell from '../components/PageShell.tsx'
import Section from '../components/Section.tsx'
import { ROUTES } from '../site.ts'

const PROFILE: [term: string, value: string][] = [
  ['Firm', 'Independent quantitative finance firm'],
  ['Research', 'Quantitative finance, statistics, market behavior, algorithmic systems'],
  ['Publishes', 'Research papers, models, datasets, libraries and research tools'],
  ['Capital', 'Own capital only. No external or client capital'],
]

export default function About() {
  return (
    <PageShell
      meta={ROUTES.about}
      title="About Ksan Relay"
      lead="Ksan Relay is an independent quantitative finance firm. We develop statistical, computational and algorithmic methods for financial markets, publish selected research and open-source work, and apply selected research to trading our own capital."
      figure={<DistributionFigure />}
      intro={
        <dl className="kv-table">
          {PROFILE.map(([term, value]) => (
            <div key={term} className="kv-table__row">
              <dt>{term}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      }
    >
      <div className="section-pair">
        <Section label="Approach" title="Approach">
          <div className="prose">
            <p>
              We treat markets as a measurement problem. Questions are framed as testable hypotheses, studied with
              explicit models, and checked against data the model did not see while it was being built.
            </p>
            <p>
              Methods come from statistics, applied mathematics and computer science: stochastic processes and
              inference, numerical methods and optimization, and the engineering needed to make results reproducible.
            </p>
          </div>
        </Section>

        <Section label="Operating model" title="Operating model">
          <div className="prose">
            <p>
              Ksan Relay trades only its own capital. It does not manage external capital and does not provide
              brokerage, investment advisory, portfolio-management, insurance or financial consultancy services.
            </p>
            <p>
              See the <Link to={ROUTES.disclaimer.path}>disclaimer</Link> for how published research and open-source
              work should be used.
            </p>
          </div>
        </Section>
      </div>
    </PageShell>
  )
}
