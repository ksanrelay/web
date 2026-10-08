import { Link } from 'react-router-dom'
import PageShell from '../components/PageShell.tsx'
import TechnicalLabel from '../components/TechnicalLabel.tsx'
import { CONTACT, ROUTES } from '../site.ts'

// NOTE: These terms are a general template written for this site. They are not legal advice and should be
// reviewed by a qualified lawyer (including for the governing-law clause) before being relied on commercially.

export default function Terms() {
  return (
    <PageShell meta={ROUTES.terms} label="LEGAL" title="Terms of Use">
      <TechnicalLabel as="p" className="legal-updated">
        LAST UPDATED — 9 OCTOBER 2026
      </TechnicalLabel>
      <div className="prose legal">
        <p>
          These terms govern your use of this website. By using the website you agree to them. If you do not agree,
          please do not use the website.
        </p>

        <h2>1. Informational use</h2>
        <p>
          The website and its content are provided for general informational, educational, and research purposes. You
          may view and read the content for your own non-commercial use.
        </p>

        <h2>2. Research only — no investment advice</h2>
        <p>
          Content published by KSAN Relay is research. It is not investment advice, financial advice, a recommendation,
          a solicitation, or an offer to buy or sell any security or financial product. Read the{' '}
          <Link to={ROUTES.disclaimer.path}>Disclaimer</Link>, which forms part of these terms.
        </p>

        <h2>3. No warranty of accuracy</h2>
        <p>
          Content is provided “as is” and “as available”. KSAN Relay does not warrant that the content is accurate,
          complete, current, or free of errors, and does not warrant that models, code, or analyses are fit for any
          particular purpose.
        </p>

        <h2>4. No guarantee of availability</h2>
        <p>
          The website may be changed, suspended, or withdrawn at any time without notice. KSAN Relay does not guarantee
          that the website will be available, uninterrupted, or free of defects.
        </p>

        <h2>5. No guarantee of financial performance</h2>
        <p>
          Nothing on the website is a promise or guarantee of any financial outcome. Historical, simulated, or
          hypothetical results do not guarantee future results.
        </p>

        <h2>6. Intellectual property</h2>
        <p>
          Unless stated otherwise, the website and its content, including text, graphics, the KSAN Relay name and mark,
          and site design, are © KSAN Relay. All rights reserved.
        </p>
        <p>
          Research publications, source code, and datasets may be released under their own licenses. Where a license is
          stated for a specific publication or repository, that license governs that material. No license is granted
          for anything else by implication.
        </p>

        <h2>7. Acceptable use</h2>
        <p>You agree not to:</p>
        <ul>
          <li>use the website in a way that breaks any applicable law;</li>
          <li>attempt to gain unauthorised access to, disrupt, or overload the website or its hosting infrastructure;</li>
          <li>introduce malicious code or carry out automated scraping that degrades the service;</li>
          <li>present KSAN Relay content as your own, or misrepresent your relationship with KSAN Relay.</li>
        </ul>

        <h2>8. External links</h2>
        <p>
          The website links to third-party sites such as GitHub and LinkedIn. KSAN Relay does not control those sites
          and is not responsible for their content, availability, or privacy practices.
        </p>

        <h2>9. Changes to the website and these terms</h2>
        <p>
          KSAN Relay may update the website, its content, or these terms at any time. The date at the top of this page
          shows when the terms were last changed. Continued use after a change means you accept the updated terms.
        </p>

        <h2>10. Limitation of liability</h2>
        <p>
          To the extent permitted by applicable law, KSAN Relay is not liable for any loss or damage arising from your
          use of, or reliance on, the website or its content, including any trading or investment loss, loss of profit,
          or indirect or consequential loss. Nothing in these terms excludes or limits liability that cannot be excluded
          or limited under applicable law.
        </p>

        <h2>11. Contact</h2>
        <p>
          Questions about these terms: <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>.
        </p>
      </div>
    </PageShell>
  )
}
