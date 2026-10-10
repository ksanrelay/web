import { Link } from 'react-router-dom'
import DistributionFigure from '../components/figures/DistributionFigure.tsx'
import PageShell from '../components/PageShell.tsx'
import Section from '../components/Section.tsx'
import { ROUTES } from '../site.ts'

const PROFILE: [term: string, value: string][] = [
  ['Firm', 'Independent quantitative research and proprietary trading firm'],
  ['Research', 'Quantitative finance, statistics, market behavior, algorithmic systems'],
  ['Publishes', 'Research papers, models, datasets, libraries and research tools'],
  ['Capital', 'Own capital only. No external or client capital'],
]

export default function About() {
  return (
    <PageShell
      meta={ROUTES.about}
      label="ABOUT"
      title="About KSAN RELAY"
      lead="KSAN RELAY is an independent quantitative research and proprietary trading firm. We develop statistical, computational and algorithmic methods for financial markets, publish selected research and open-source work, and apply selected research to trading our own capital."
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
        <Section index="01" label="APPROACH" title="Approach">
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

        <Section index="02" label="OPERATING MODEL" title="Operating model">
          <div className="prose">
            <p>
              KSAN RELAY trades only its own capital. It does not manage external capital and does not provide
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
