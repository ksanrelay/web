import { Link } from 'react-router-dom'
import DistributionFigure from '../components/figures/DistributionFigure.tsx'
import PageShell from '../components/PageShell.tsx'
import Section from '../components/Section.tsx'
import { ROUTES } from '../site.ts'

const INTERESTS = [
  'Quantitative finance',
  'Systematic methods',
  'Time-series analysis',
  'Statistical learning',
  'Optimization',
  'Market microstructure',
  'Computational methods',
  'Simulation',
  'Scientific computing',
]

export default function About() {
  return (
    <PageShell
      meta={ROUTES.about}
      label="ABOUT"
      figure={<DistributionFigure />}
      title="About KSAN Relay"
      lead="KSAN Relay is an independent quantitative research organization focused on the application of mathematics, statistics, physics-inspired modeling, and computer science to financial markets."
    >
      <Section index="01" label="RESEARCH INTERESTS" title="Research interests">
        <p className="section__intro">Research interests may include:</p>
        <ul className="interest-grid">
          {INTERESTS.map(item => (
            <li key={item} className="interest-grid__item">
              {item}
            </li>
          ))}
        </ul>
      </Section>

      <Section index="02" label="APPROACH" title="Approach">
        <div className="prose">
          <p>
            The work treats markets as a measurement problem. Questions are framed as testable hypotheses, studied with
            explicit models, and checked against data that the model did not see while it was being built.
          </p>
          <p>
            Methods are borrowed freely across disciplines: stochastic processes and inference from statistics,
            numerical methods and optimization from applied mathematics, and modeling habits from physics, implemented
            with the engineering discipline of computer science.
          </p>
        </div>
      </Section>

      <Section index="03" label="SCOPE" title="Scope">
        <div className="prose">
          <p>
            KSAN Relay is a research organization. It does not manage outside capital, accept client funds, offer
            investment products, or provide investment advice or recommendations.
          </p>
          <p>
            See the <Link to={ROUTES.disclaimer.path}>disclaimer</Link> for how published research should and should not
            be used.
          </p>
        </div>
      </Section>
    </PageShell>
  )
}
