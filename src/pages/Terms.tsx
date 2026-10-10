import { Link } from 'react-router-dom'
import PageShell from '../components/PageShell.tsx'
import TechnicalLabel from '../components/TechnicalLabel.tsx'
import { CONTACT, ROUTES } from '../site.ts'

export default function Terms() {
  return (
    <PageShell meta={ROUTES.terms} label="POLICY" title="Terms of Use">
      <TechnicalLabel as="p" className="legal-updated">
        LAST UPDATED — 11 OCTOBER 2026
      </TechnicalLabel>
      <div className="prose legal">
        <p>
          These terms govern your use of this website. By using the website you agree to them. If you do not agree,
          please do not use the website.
        </p>

        <h2>1. Informational use</h2>
        <p>
          The website and its content are provided for informational and research purposes. You may view and read the
          content for your own non-commercial use.
        </p>

        <h2>2. No investment advice and no client services</h2>
        <p>
          Content published by KSAN RELAY is research. It is not investment advice, a recommendation, a solicitation, or
          an offer to buy or sell any security or financial product. KSAN RELAY trades only its own capital and does
          not offer brokerage, advisory, portfolio-management or fund-management services. Read the{' '}
          <Link to={ROUTES.disclaimer.path}>Disclaimer</Link>, which forms part of these terms.
        </p>

        <h2>3. No warranty of accuracy</h2>
        <p>
          Content is provided “as is” and “as available”. KSAN RELAY does not warrant that the content is accurate,
          complete, current, or free of errors, and does not warrant that research, models, datasets, code, or
          analyses are fit for any particular purpose. You should not rely on them without your own independent
          verification.
        </p>

        <h2>4. No guarantee of availability</h2>
        <p>
          The website may be changed, suspended, or withdrawn at any time without notice. KSAN RELAY does not guarantee
          that the website will be available, uninterrupted, or free of defects.
        </p>

        <h2>5. No guarantee of financial performance</h2>
        <p>
          Nothing on the website is a promise or guarantee of any financial outcome. Historical, simulated, or
          hypothetical results do not guarantee future results.
        </p>

        <h2>6. Intellectual property</h2>
        <p>
          Unless stated otherwise, the website and its content, including text, graphics, the KSAN RELAY name and mark,
          and site design, are © KSAN RELAY. All rights reserved.
        </p>
        <p>
          Research publications, open-source software, models, and datasets may be released under their own licenses.
          Where a license is stated for a specific publication, repository, or dataset, that license governs that
          material and takes precedence over these terms for it. No license is granted for anything else by
          implication.
        </p>

        <h2>7. Acceptable use</h2>
        <p>You agree not to:</p>
        <ul>
          <li>use the website in a way that breaks any applicable law;</li>
          <li>attempt to gain unauthorised access to, disrupt, or overload the website or its hosting infrastructure;</li>
          <li>introduce malicious code or carry out automated scraping that degrades the service;</li>
          <li>present KSAN RELAY content as your own, or misrepresent your relationship with KSAN RELAY.</li>
        </ul>

        <h2>8. External links</h2>
        <p>
          The website links to third-party sites such as GitHub and LinkedIn. KSAN RELAY does not control those sites
          and is not responsible for their content, availability, or privacy practices.
        </p>

        <h2>9. Changes to the website and these terms</h2>
        <p>
          KSAN RELAY may update the website, its content, or these terms at any time. The date at the top of this page
          shows when the terms were last changed. Continued use after a change means you accept the updated terms.
        </p>

        <h2>10. Limitation of liability</h2>
        <p>
          To the extent permitted by applicable law, KSAN RELAY is not liable for any loss or damage arising from your
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
