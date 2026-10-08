import { Link } from 'react-router-dom'
import PageShell from '../components/PageShell.tsx'
import TechnicalLabel from '../components/TechnicalLabel.tsx'
import { ROUTES } from '../site.ts'

// General drafting guidance only — have this reviewed by a qualified lawyer (including for Indian/SEBI
// requirements) before KSAN Relay relies on it or undertakes any regulated activity.

export default function Disclaimer() {
  return (
    <PageShell meta={ROUTES.disclaimer} label="LEGAL" title="Disclaimer">
      <TechnicalLabel as="p" className="legal-updated">
        LAST UPDATED — 9 OCTOBER 2026
      </TechnicalLabel>
      <div className="prose legal">
        <h2>Research and information only</h2>
        <p>
          KSAN Relay publishes quantitative, computational, and financial research for informational, educational, and
          research purposes only. Nothing published on this website constitutes investment advice, financial advice, a
          recommendation, solicitation, or an offer to buy or sell any security, derivative, financial instrument, or
          investment product.
        </p>

        <h2>Models, simulations, and historical analysis</h2>
        <p>
          Any models, simulations, backtests, hypothetical results, or historical analyses may rely on assumptions and
          may not reflect actual trading conditions. Past performance, simulated performance, or research findings do
          not guarantee future results.
        </p>
        <p>
          Hypothetical and simulated results have inherent limitations. They are typically prepared with the benefit of
          hindsight, may not account for transaction costs, liquidity, market impact, or other frictions, and do not
          represent actual trading.
        </p>

        <h2>No representation of accuracy or suitability</h2>
        <p>
          KSAN Relay makes no representation that information published on this website is complete, error-free, or
          suitable for any particular investment decision. Information may be out of date, and may be changed or removed
          without notice.
        </p>

        <h2>No advisory relationship</h2>
        <p>
          KSAN Relay does not provide investment advisory, portfolio management, brokerage, or research analyst services
          through this website. Reading this website or contacting KSAN Relay does not create an advisory, fiduciary, or
          client relationship.
        </p>

        <h2>Your own decisions</h2>
        <p>
          You are solely responsible for any decision you make. Before making any financial decision, consider your own
          circumstances and seek advice from an appropriately qualified and, where required, registered professional.
        </p>

        <h2>Third-party information</h2>
        <p>
          Research may reference third-party data, software, or publications. KSAN Relay does not control and is not
          responsible for third-party content, and a reference is not an endorsement.
        </p>

        <p>
          See also the <Link to={ROUTES.terms.path}>Terms of Use</Link> and{' '}
          <Link to={ROUTES.privacy.path}>Privacy Policy</Link>.
        </p>
      </div>
    </PageShell>
  )
}
