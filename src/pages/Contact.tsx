import ExternalLink from '../components/ExternalLink.tsx'
import PageShell from '../components/PageShell.tsx'
import TechnicalLabel from '../components/TechnicalLabel.tsx'
import { CONTACT, ROUTES } from '../site.ts'

const display = (url: string) => url.replace(/^https:\/\/(www\.)?/, '')

export default function Contact() {
  return (
    <PageShell
      meta={ROUTES.contact}
      label="CONTACT"
      notation="P(A | B)"
      title="Contact"
      lead="For research correspondence, collaboration, or questions about published work."
    >
      <dl className="card contact-table">
        <div className="contact-table__row">
          <dt>
            <TechnicalLabel>EMAIL</TechnicalLabel>
          </dt>
          <dd>
            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
          </dd>
        </div>
        <div className="contact-table__row">
          <dt>
            <TechnicalLabel>GITHUB</TechnicalLabel>
          </dt>
          <dd>
            <ExternalLink href={CONTACT.github}>{display(CONTACT.github)}</ExternalLink>
          </dd>
        </div>
        <div className="contact-table__row">
          <dt>
            <TechnicalLabel>LINKEDIN</TechnicalLabel>
          </dt>
          <dd>
            <ExternalLink href={CONTACT.linkedin}>{display(CONTACT.linkedin)}</ExternalLink>
          </dd>
        </div>
      </dl>
      <p className="note">
        KSAN Relay does not provide investment advice and cannot respond to requests for it. Please do not send
        confidential or sensitive personal information by email.
      </p>
    </PageShell>
  )
}
