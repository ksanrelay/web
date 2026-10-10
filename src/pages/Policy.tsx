import { Link } from 'react-router-dom'
import PageShell from '../components/PageShell.tsx'
import { ROUTES } from '../site.ts'

const POLICIES: { to: string; title: string; summary: string }[] = [
  {
    to: ROUTES.disclaimer.path,
    title: 'Disclaimer',
    summary: 'Financial and investment disclaimer, and limits of research, datasets and open-source software.',
  },
  {
    to: ROUTES.terms.path,
    title: 'Terms of Use',
    summary: 'Use of this website, intellectual property, open-source licenses and liability.',
  },
  {
    to: ROUTES.privacy.path,
    title: 'Privacy Policy',
    summary: 'What data this website processes. No analytics, no tracking, no forms.',
  },
  {
    to: `${ROUTES.privacy.path}#cookies`,
    title: 'Cookies',
    summary: 'This website sets no cookies and uses no browser storage.',
  },
]

export default function Policy() {
  return (
    <PageShell
      meta={ROUTES.policy}
      label="POLICY"
      title="Policy"
      lead="The terms, disclaimers and privacy practices that apply to this website."
    >
      <ul className="policy-list">
        {POLICIES.map(p => (
          <li key={p.title}>
            <Link to={p.to} className="policy-list__link">
              <span className="policy-list__title">{p.title}</span>
              <span className="policy-list__summary">{p.summary}</span>
            </Link>
          </li>
        ))}
      </ul>
    </PageShell>
  )
}
