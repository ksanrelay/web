import { Link } from 'react-router-dom'
import PageShell from '../components/PageShell.tsx'
import TechnicalLabel from '../components/TechnicalLabel.tsx'
import { ROUTES } from '../site.ts'

export default function Disclaimer() {
  return (
    <PageShell meta={ROUTES.disclaimer} label="POLICY" title="Disclaimer">
      <TechnicalLabel as="p" className="legal-updated">
        LAST UPDATED — 11 OCTOBER 2026
      </TechnicalLabel>
      <div className="prose legal">
        <h2 id="financial">Financial and investment disclaimer</h2>
        <p>
          Content on this website is published for informational and research purposes only. Nothing on this website
          constitutes:
        </p>
        <ul>
          <li>investment, financial, legal or tax advice;</li>
          <li>a recommendation, solicitation or offer to buy or sell any security, derivative or other financial instrument;</li>
          <li>brokerage, portfolio-management or fund-management services.</li>
        </ul>

        <h2>Proprietary trading</h2>
        <p>
          KSAN RELAY is a proprietary trading firm. It trades only its own capital and does not accept, manage or
          invest external or client capital. KSAN RELAY may hold, or may have held, positions in instruments or markets
          discussed in its research, and is not obliged to disclose them.
        </p>

        <h2>No advisory or client relationship</h2>
        <p>
          KSAN RELAY does not provide brokerage, investment advisory, portfolio-management, insurance or financial
          consultancy services. Reading this website, using its content or contacting KSAN RELAY does not create an
          advisory, fiduciary or client relationship.
        </p>

        <h2>Research, models and results</h2>
        <p>
          Research may be incomplete, experimental or subject to revision. Models, simulations, backtests and
          historical analyses rely on assumptions and may not reflect actual trading conditions, including transaction
          costs, liquidity and market impact. Historical or simulated results, if published, do not guarantee future
          results.
        </p>

        <h2>Your own decisions</h2>
        <p>
          You are responsible for your own decisions. Make them independently and, where required, seek advice from an
          appropriately qualified and registered professional.
        </p>

        <h2 id="open-source">Open-source software, datasets and research outputs</h2>
        <ul>
          <li>Open-source software released by KSAN RELAY may be experimental and may contain defects.</li>
          <li>Datasets may contain errors, omissions or limitations.</li>
          <li>Research outputs may change as work is revised.</li>
          <li>
            Individual repositories and datasets may have separate licenses. Where a license is specified, that license
            controls reuse of the material it covers.
          </li>
        </ul>

        <h2>Accuracy and third-party information</h2>
        <p>
          KSAN RELAY does not represent that content on this website is complete, current or error-free. Content may
          be changed or removed without notice. Research may reference third-party data, software or publications;
          KSAN RELAY does not control third-party content, and a reference is not an endorsement.
        </p>

        <p>
          See also the <Link to={ROUTES.terms.path}>Terms of Use</Link> and{' '}
          <Link to={ROUTES.privacy.path}>Privacy Policy</Link>.
        </p>
      </div>
    </PageShell>
  )
}
