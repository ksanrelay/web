import { Link } from 'react-router-dom'
import LegalPage, { type LegalSection } from '../components/LegalPage.tsx'
import { ROUTES } from '../site.ts'

const SECTIONS: LegalSection[] = [
  {
    id: 'financial',
    title: 'Financial and investment disclaimer',
    body: (
      <>
        <p>
          Content on this website is published for informational and research purposes only. Nothing on this website
          constitutes:
        </p>
        <ul>
          <li>investment, financial, legal or tax advice;</li>
          <li>a recommendation, solicitation or offer to buy or sell any security, derivative or other financial instrument;</li>
          <li>brokerage, portfolio-management or fund-management services.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'own-capital',
    title: 'Trading own capital',
    body: (
      <p>
        Ksan Relay is a quantitative finance firm. Its trading is proprietary: it trades only its own capital and does
        not accept, manage or invest external or client capital. Ksan Relay may hold, or may have held, positions in
        instruments or markets discussed in its research, and is not obliged to disclose them.
      </p>
    ),
  },
  {
    id: 'no-client-relationship',
    title: 'No advisory or client relationship',
    body: (
      <p>
        Ksan Relay does not provide brokerage, investment advisory, portfolio-management, insurance or financial
        consultancy services. Reading this website, using its content or contacting Ksan Relay does not create an
        advisory, fiduciary or client relationship.
      </p>
    ),
  },
  {
    id: 'research',
    title: 'Research, models and results',
    body: (
      <p>
        Research may be incomplete, experimental or subject to revision. Models, simulations, backtests and
        historical analyses rely on assumptions and may not reflect actual trading conditions, including transaction
        costs, liquidity and market impact. Historical or simulated results, if published, do not guarantee future
        results.
      </p>
    ),
  },
  {
    id: 'your-decisions',
    title: 'Your own decisions',
    body: (
      <p>
        You are responsible for your own decisions. Make them independently and, where required, seek advice from an
        appropriately qualified and registered professional.
      </p>
    ),
  },
  {
    id: 'open-source',
    title: 'Open-source software, datasets and research outputs',
    body: (
      <ul>
        <li>Open-source software released by Ksan Relay may be experimental and may contain defects.</li>
        <li>Datasets may contain errors, omissions or limitations.</li>
        <li>Research outputs may change as work is revised.</li>
        <li>
          Individual repositories and datasets may have separate licenses. Where a license is specified, that license
          controls reuse of the material it covers.
        </li>
      </ul>
    ),
  },
  {
    id: 'accuracy',
    title: 'Accuracy and third-party information',
    body: (
      <p>
        Ksan Relay does not represent that content on this website is complete, current or error-free. Content may
        be changed or removed without notice. Research may reference third-party data, software or publications;
        Ksan Relay does not control third-party content, and a reference is not an endorsement.
      </p>
    ),
  },
]

export default function Disclaimer() {
  return (
    <LegalPage
      meta={ROUTES.disclaimer}
      title="Disclaimer"
      updated="2026-10-14"
      sections={SECTIONS}
      outro={
        <p>
          See also the <Link to={ROUTES.terms.path}>Terms of Use</Link> and{' '}
          <Link to={ROUTES.privacy.path}>Privacy Policy</Link>.
        </p>
      }
    />
  )
}
