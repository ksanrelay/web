import { Link } from 'react-router-dom'
import EquationAccent from '../components/EquationAccent.tsx'
import LogoMark from '../components/LogoMark.tsx'
import PageShell from '../components/PageShell.tsx'
import { ROUTES } from '../site.ts'

export default function Home() {
  return (
    <PageShell meta={ROUTES.home} className="home">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero__text">
          <p className="hero__eyebrow">
            <LogoMark className="hero__mark" />
            Ksan Relay
          </p>
          <h1 id="hero-title" className="hero__headline">
            Quantitative Finance Firm
          </h1>
          <p className="hero__lead">
            Ksan Relay develops data-driven models and computational methods for financial markets, publishes research
            and open-source tools, and applies selected research to trading its own capital.
          </p>
          <p className="hero__note">
            Own capital only. We do not manage or accept client capital.{' '}
            <Link to={ROUTES.disclaimer.path}>Disclaimer</Link>
          </p>
          <ul className="hero__meta dot-list tech-label" aria-label="Activities">
            <li>Research</li>
            <li>Open Source</li>
            <li>Markets</li>
          </ul>
          <div className="hero__actions">
            <Link to={ROUTES.research.path} className="button button--primary">
              Explore Research
            </Link>
            <Link to={ROUTES.openSource.path} className="button">
              View Open Source
            </Link>
          </div>
          <p className="hero__secondary">
            <Link to={ROUTES.about.path}>About Ksan Relay</Link>
          </p>
        </div>
        <EquationAccent />
      </section>
    </PageShell>
  )
}
