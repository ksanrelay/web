import { Link } from 'react-router-dom'
import { CONTACT, ROUTES } from '../site.ts'
import ExternalLink from './ExternalLink.tsx'
import LogoMark from './LogoMark.tsx'
import TechnicalLabel from './TechnicalLabel.tsx'

const YEAR = 2026

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <LogoMark className="footer__mark" />
          <div>
            <p className="footer__name">KSAN RELAY</p>
            <TechnicalLabel as="p">MODEL / VALIDATE / ITERATE</TechnicalLabel>
          </div>
        </div>

        <nav className="footer__nav" aria-label="Footer">
          <div>
            <TechnicalLabel as="p" className="footer__heading">
              Site
            </TechnicalLabel>
            <ul>
              <li><Link to={ROUTES.research.path}>Research</Link></li>
              <li><Link to={ROUTES.about.path}>About</Link></li>
              <li><Link to={ROUTES.contact.path}>Contact</Link></li>
            </ul>
          </div>
          <div>
            <TechnicalLabel as="p" className="footer__heading">
              Legal
            </TechnicalLabel>
            <ul>
              <li><Link to={ROUTES.disclaimer.path}>Disclaimer</Link></li>
              <li><Link to={ROUTES.terms.path}>Terms of Use</Link></li>
              <li><Link to={ROUTES.privacy.path}>Privacy</Link></li>
            </ul>
          </div>
          <div>
            <TechnicalLabel as="p" className="footer__heading">
              Elsewhere
            </TechnicalLabel>
            <ul>
              <li><ExternalLink href={CONTACT.github}>GitHub</ExternalLink></li>
              <li><ExternalLink href={CONTACT.linkedin}>LinkedIn</ExternalLink></li>
              <li><a href={`mailto:${CONTACT.email}`}>Email</a></li>
            </ul>
          </div>
        </nav>
      </div>

      <div className="container footer__base">
        <p>© {YEAR} KSAN Relay. All rights reserved.</p>
        <p className="footer__notice">
          Research and informational content only. Not investment advice.{' '}
          <Link to={ROUTES.disclaimer.path}>Read the disclaimer</Link>.
        </p>
      </div>
    </footer>
  )
}
