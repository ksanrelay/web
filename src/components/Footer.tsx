import { Link } from 'react-router-dom'
import { CONTACT, ROUTES } from '../site.ts'
import ExternalLink from './ExternalLink.tsx'
import LogoMark from './LogoMark.tsx'

const YEAR = 2026

type FooterLink = { label: string; to: string } | { label: string; href: string; external?: boolean }

const COLUMNS: { heading: string; links: FooterLink[] }[] = [
  {
    heading: 'Firm',
    links: [
      { label: 'About', to: ROUTES.about.path },
      { label: 'Contact', to: ROUTES.contact.path },
    ],
  },
  {
    heading: 'Work',
    links: [
      { label: 'Research', to: ROUTES.research.path },
      { label: 'Open Source', to: ROUTES.openSource.path },
    ],
  },
  {
    heading: 'Connect',
    links: [
      { label: 'Email', href: `mailto:${CONTACT.email}` },
      { label: 'GitHub', href: CONTACT.github, external: true },
      { label: 'LinkedIn', href: CONTACT.linkedin, external: true },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Policy', to: ROUTES.policy.path },
      { label: 'Privacy', to: ROUTES.privacy.path },
      { label: 'Terms of Use', to: ROUTES.terms.path },
      { label: 'Disclaimer', to: ROUTES.disclaimer.path },
    ],
  },
]

function FooterAnchor({ link }: { link: FooterLink }) {
  if ('to' in link) return <Link to={link.to}>{link.label}</Link>
  if (link.external) return <ExternalLink href={link.href}>{link.label}</ExternalLink>
  return <a href={link.href}>{link.label}</a>
}

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <Link to="/" className="footer__home" aria-label="KSAN RELAY — home">
              <LogoMark className="footer__mark" />
              <span className="footer__name">KSAN RELAY</span>
            </Link>
            <p className="footer__descriptor">
              Independent quantitative research and proprietary trading firm.
            </p>
          </div>

          <nav className="footer__nav" aria-label="Footer">
            {COLUMNS.map(col => (
              <div key={col.heading} className="footer__col">
                <h2 className="footer__heading tech-label">{col.heading}</h2>
                <ul>
                  {col.links.map(link => (
                    <li key={link.label}>
                      <FooterAnchor link={link} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="footer__legal">
          <p className="footer__fineprint">
            KSAN RELAY trades only its own capital. It does not accept, manage or advise on external or client
            capital, and does not provide brokerage, investment advisory, portfolio-management or fund-management
            services. Content on this website is published for informational and research purposes and is not
            investment advice or an offer to buy or sell any security.{' '}
            <Link to={ROUTES.disclaimer.path}>Read the full disclaimer</Link>.
          </p>
        </div>

        <div className="footer__base">
          <p>© {YEAR} KSAN RELAY. All rights reserved.</p>
          <ul className="dot-list tech-label" aria-label="Activities">
            <li>Research</li>
            <li>Open Source</li>
            <li>Proprietary Trading</li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
