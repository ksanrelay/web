import { Link } from 'react-router-dom'
import LegalPage, { type LegalSection } from '../components/LegalPage.tsx'
import { CONTACT, ROUTES } from '../site.ts'

const SECTIONS: LegalSection[] = [
  {
    id: 'informational-use',
    title: '1. Informational use',
    body: (
      <p>
        The website and its content are provided for informational and research purposes. You may view and read the
        content for your own non-commercial use.
      </p>
    ),
  },
  {
    id: 'no-advice',
    title: '2. No investment advice and no client services',
    body: (
      <p>
        Content published by Ksan Relay is research. It is not investment advice, a recommendation, a solicitation, or
        an offer to buy or sell any security or financial product. Ksan Relay trades only its own capital and does
        not offer brokerage, advisory, portfolio-management or fund-management services. Read the{' '}
        <Link to={ROUTES.disclaimer.path}>Disclaimer</Link>, which forms part of these terms.
      </p>
    ),
  },
  {
    id: 'no-warranty',
    title: '3. No warranty of accuracy',
    body: (
      <p>
        Content is provided “as is” and “as available”. Ksan Relay does not warrant that the content is accurate,
        complete, current, or free of errors, and does not warrant that research, models, datasets, code, or
        analyses are fit for any particular purpose. You should not rely on them without your own independent
        verification.
      </p>
    ),
  },
  {
    id: 'availability',
    title: '4. No guarantee of availability',
    body: (
      <p>
        The website may be changed, suspended, or withdrawn at any time without notice. Ksan Relay does not guarantee
        that the website will be available, uninterrupted, or free of defects.
      </p>
    ),
  },
  {
    id: 'financial-performance',
    title: '5. No guarantee of financial performance',
    body: (
      <p>
        Nothing on the website is a promise or guarantee of any financial outcome. Historical, simulated, or
        hypothetical results do not guarantee future results.
      </p>
    ),
  },
  {
    id: 'intellectual-property',
    title: '6. Intellectual property',
    body: (
      <>
        <p>
          Unless stated otherwise, the website and its content, including text, graphics, the Ksan Relay name and mark,
          and site design, are © Ksan Relay. All rights reserved.
        </p>
        <p>
          Research publications, open-source software, models, and datasets may be released under their own licenses.
          Where a license is stated for a specific publication, repository, or dataset, that license governs that
          material and takes precedence over these terms for it. No license is granted for anything else by
          implication.
        </p>
      </>
    ),
  },
  {
    id: 'acceptable-use',
    title: '7. Acceptable use',
    body: (
      <>
        <p>You agree not to:</p>
        <ul>
          <li>use the website in a way that breaks any applicable law;</li>
          <li>attempt to gain unauthorised access to, disrupt, or overload the website or its hosting infrastructure;</li>
          <li>introduce malicious code or carry out automated scraping that degrades the service;</li>
          <li>present Ksan Relay content as your own, or misrepresent your relationship with Ksan Relay.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'external-links',
    title: '8. External links',
    body: (
      <p>
        The website links to third-party sites such as GitHub and LinkedIn. Ksan Relay does not control those sites
        and is not responsible for their content, availability, or privacy practices.
      </p>
    ),
  },
  {
    id: 'changes',
    title: '9. Changes to the website and these terms',
    body: (
      <p>
        Ksan Relay may update the website, its content, or these terms at any time. The date at the top of this page
        shows when the terms were last changed. Continued use after a change means you accept the updated terms.
      </p>
    ),
  },
  {
    id: 'liability',
    title: '10. Limitation of liability',
    body: (
      <p>
        To the extent permitted by applicable law, Ksan Relay is not liable for any loss or damage arising from your
        use of, or reliance on, the website or its content, including any trading or investment loss, loss of profit,
        or indirect or consequential loss. Nothing in these terms excludes or limits liability that cannot be excluded
        or limited under applicable law.
      </p>
    ),
  },
  {
    id: 'contact',
    title: '11. Contact',
    body: (
      <p>
        Questions about these terms: <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>.
      </p>
    ),
  },
]

export default function Terms() {
  return (
    <LegalPage
      meta={ROUTES.terms}
      title="Terms of Use"
      updated="2026-10-11"
      intro={
        <p>
          These terms govern your use of this website. By using the website you agree to them. If you do not agree,
          please do not use the website.
        </p>
      }
      sections={SECTIONS}
    />
  )
}
