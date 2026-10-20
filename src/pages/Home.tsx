import { Link } from 'react-router-dom'
import EquationAccent from '../components/EquationAccent.tsx'
import PageShell from '../components/PageShell.tsx'
import { ROUTES } from '../site.ts'

const INDEX: { to: string; title: string; text: string }[] = [
  {
    to: ROUTES.research.path,
    title: 'Research',
    text: 'Statistical modeling, market structure and algorithmic systems, published with the code and data needed to check it.',
  },
  {
    to: ROUTES.openSource.path,
    title: 'Open source',
    text: 'Models, datasets, libraries and research tools, each released under its own license.',
  },
  {
    to: ROUTES.about.path,
    title: 'About',
    text: 'An independent quantitative finance firm that trades only its own capital.',
  },
]

export default function Home() {
  return (
    <PageShell meta={ROUTES.home} className="home">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero__text">
          <h1 id="hero-title" className="hero__headline">
            Quantitative Finance Firm
          </h1>
          <p className="hero__lead">
            Ksan Relay develops data-driven models and computational methods for financial markets, publishes research
            and open-source tools, and applies selected research to trading its own capital.
          </p>
          <div className="hero__actions">
            <Link to={ROUTES.research.path} className="button button--primary">
              Explore research
            </Link>
            <Link to={ROUTES.openSource.path} className="button">
              View open source
            </Link>
          </div>
          <p className="hero__note">
            Own capital only. We do not manage or accept client capital.{' '}
            <Link to={ROUTES.disclaimer.path}>Disclaimer</Link>
          </p>
        </div>
        <EquationAccent />
      </section>

      <nav className="home-index" aria-label="Sections">
        <ul>
          {INDEX.map(item => (
            <li key={item.to}>
              <Link to={item.to} className="home-index__link">
                <span className="home-index__title">{item.title}</span>
                <span className="home-index__text">{item.text}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </PageShell>
  )
}
