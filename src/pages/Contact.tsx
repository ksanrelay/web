import { Fragment } from 'react'
import ExternalLink from '../components/ExternalLink.tsx'
import SpectrumFigure from '../components/figures/SpectrumFigure.tsx'
import PageShell from '../components/PageShell.tsx'
import TechnicalLabel from '../components/TechnicalLabel.tsx'
import { CONTACT, ROUTES } from '../site.ts'

/** Strip the scheme and allow line breaks after each "/" so long URLs wrap cleanly on narrow screens. */
function display(url: string) {
  const parts = url.replace(/^https:\/\/(www\.)?/, '').split('/')
  return parts.map((part, i) => (
    <Fragment key={i}>
      <span className="nowrap">
        {part}
        {i < parts.length - 1 && '/'}
      </span>
      {i < parts.length - 1 && <wbr />}
    </Fragment>
  ))
}

export default function Contact() {
  return (
    <PageShell
      meta={ROUTES.contact}
      label="CONTACT"
      title="Contact"
      lead="For research correspondence, collaboration, or questions about published work."
      figure={<SpectrumFigure />}
      intro={
        <>
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
          <div className="contact-actions">
            <a className="button button--primary" href={`mailto:${CONTACT.email}`}>
              Email KSAN Relay
            </a>
            <ExternalLink href={CONTACT.github} className="button">
              GitHub
            </ExternalLink>
          </div>
          <p className="note">
            KSAN Relay does not provide investment advice and cannot respond to requests for it. Please do not send
            confidential or sensitive personal information by email.
          </p>
        </>
      }
    />
  )
}
