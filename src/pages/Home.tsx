import { Link } from 'react-router-dom'
import EquationAccent from '../components/EquationAccent.tsx'
import ExternalLink from '../components/ExternalLink.tsx'
import LogoMark from '../components/LogoMark.tsx'
import PageShell from '../components/PageShell.tsx'
import ResearchCard from '../components/ResearchCard.tsx'
import Section from '../components/Section.tsx'
import { CONTACT, ROUTES } from '../site.ts'

const AREAS = [
  {
    title: 'Statistical Modeling',
    description: 'Time-series methods, probability, inference, and model validation.',
    notation: 'P(Xₜ₊₁ | Xₜ)',
  },
  {
    title: 'Systematic Methods',
    description: 'Rule-based and data-driven approaches to studying financial markets.',
    notation: 'sₜ = f(𝓕ₜ)',
  },
  {
    title: 'Computational Finance',
    description: 'Simulation, numerical methods, optimization, and quantitative modeling.',
    notation: '∂V/∂t',
  },
  {
    title: 'Market Microstructure',
    description: 'Research into execution, liquidity, price formation, and market behavior.',
    notation: 'Δp = λq',
  },
  {
    title: 'Optimization',
    description: 'Convex optimization, parameter search, model selection, and numerical methods.',
    notation: '∇f(x) = 0',
  },
  {
    title: 'Scientific Computing',
    description: 'High-performance numerical workflows, reproducibility, and research tooling.',
    notation: 'O(n log n)',
  },
]

const PRINCIPLES = [
  {
    title: 'Evidence over narrative.',
    body: 'A hypothesis is only as good as the test that could have rejected it.',
  },
  {
    title: 'Explicit assumptions.',
    body: 'Every model states what it assumes about data, costs, and the process that generated them.',
  },
  {
    title: 'Reproducible methods.',
    body: 'Results are tied to versioned code, fixed data snapshots, and recorded parameters.',
  },
  {
    title: 'Statistical validation.',
    body: 'Out-of-sample testing, multiple-comparison control, and honest error bars before conclusions.',
  },
]

const OPEN_RESEARCH = ['Selected tooling', 'Reproducible experiments', 'Research code', 'Technical notes']

export default function Home() {
  return (
    <PageShell meta={ROUTES.home} className="home">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero__text">
          <h1 id="hero-title" className="hero__title">
            <span className="hero__eyebrow">
              <LogoMark className="hero__mark" />
              KSAN RELAY
            </span>
            <span className="hero__headline">
              Quantitative Research &amp; Computational Finance
            </span>
          </h1>
          <p className="hero__lead">
            KSAN Relay is an independent quantitative research firm studying systematic methods in financial markets
            through mathematics, statistics, computation, and scientific modeling.
          </p>
          <div className="hero__actions">
            <Link to={ROUTES.research.path} className="button button--primary">
              Research
            </Link>
            <Link to={ROUTES.about.path} className="button">
              About
            </Link>
          </div>
          <div className="hero__secondary">
            <ExternalLink href={CONTACT.github}>GitHub</ExternalLink>
            <ExternalLink href={CONTACT.linkedin}>LinkedIn</ExternalLink>
          </div>
        </div>
        <EquationAccent />
      </section>

      <Section index="01" label="RESEARCH AREAS" title="Areas of study" aside="MODEL / VALIDATE / ITERATE">
        <div className="grid grid--3">
          {AREAS.map(area => (
            <ResearchCard key={area.title} {...area} />
          ))}
        </div>
      </Section>

      <Section index="02" label="PRINCIPLES" title="How the research is done" aside="OBSERVE / INFER">
        <blockquote className="pull-quote">
          Research should be falsifiable, reproducible, and explicit about its assumptions.
        </blockquote>
        <ul className="principles">
          {PRINCIPLES.map(p => (
            <li key={p.title} className="principles__item">
              <h3 className="principles__title">{p.title}</h3>
              <p className="principles__body">{p.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section index="03" label="OPEN RESEARCH" title="Code and notes" aside="STATE / TRANSITION">
        <div className="card open-research">
          <div className="open-research__text">
            <p className="open-research__lead">
              Selected implementations, experimental tooling, and reproducible research infrastructure may be published
              through the KSAN Relay GitHub organization.
            </p>
            <ul className="tag-list" aria-label="Published material may include">
              {OPEN_RESEARCH.map(item => (
                <li key={item} className="tag">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <ExternalLink href={CONTACT.github} className="button button--primary open-research__cta">
            GitHub
          </ExternalLink>
        </div>
      </Section>
    </PageShell>
  )
}
