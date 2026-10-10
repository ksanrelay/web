import { Link } from 'react-router-dom'
import PageShell from '../components/PageShell.tsx'
import TechnicalLabel from '../components/TechnicalLabel.tsx'
import { CONTACT, ROUTES } from '../site.ts'

export default function Privacy() {
  return (
    <PageShell meta={ROUTES.privacy} label="POLICY" title="Privacy Policy">
      <TechnicalLabel as="p" className="legal-updated">
        LAST UPDATED — 11 OCTOBER 2026
      </TechnicalLabel>
      <div className="prose legal">
        <p>
          This website is a static site with no accounts, forms or analytics. This policy explains the limited data
          that is still processed and why.
        </p>

        <h2>What this website does not do</h2>
        <ul>
          <li>No user accounts, logins, or newsletter sign-up.</li>
          <li>No contact forms. Contact is by email only.</li>
          <li>No advertising pixels, behavioural tracking, or third-party marketing trackers.</li>
          <li>No analytics scripts.</li>
          <li>No payment collection and no user database.</li>
          <li>Fonts and scripts are served from the same origin as the website; no third-party resources are loaded.</li>
        </ul>

        <h2>What may be processed</h2>
        <h3>Hosting and security logs</h3>
        <p>
          The website is hosted by a third-party hosting provider (currently Vercel). Like most web infrastructure, the
          hosting provider automatically processes technical data when you request a page, such as your IP address,
          browser and device information (user agent), the page requested, the referring page, and the date and time of
          the request. This data is used to deliver the website, keep it secure, and diagnose faults. It is retained
          according to the hosting provider’s own policies.
        </p>
        <h3>Email</h3>
        <p>
          If you email KSAN RELAY, the information you choose to send — your email address, name, and message — is
          used only to read and respond to your message, and is kept only as long as needed for that purpose or as
          required by law.
        </p>

        <h2 id="cookies">Cookies and local storage</h2>
        <p>
          The website does not set cookies and does not use local storage, session storage or similar browser storage.
          No cookie banner is needed because there is nothing to consent to.
        </p>

        <h2>External links</h2>
        <p>
          Links to GitHub, LinkedIn, and other sites take you to services with their own privacy policies. Their
          practices are not covered by this policy.
        </p>

        <h2>Your rights</h2>
        <p>
          Depending on where you live, you may have rights to access, correct, or delete personal data held about you,
          or to object to its processing. To make a request, email{' '}
          <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>.
        </p>

        <h2>Changes</h2>
        <p>
          If the website starts processing additional data, this policy will be updated before that change takes
          effect. The date at the top of this page shows the latest revision.
        </p>

        <p>
          See also the <Link to={ROUTES.terms.path}>Terms of Use</Link> and{' '}
          <Link to={ROUTES.disclaimer.path}>Disclaimer</Link>.
        </p>
      </div>
    </PageShell>
  )
}
