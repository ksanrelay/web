import { Link } from 'react-router-dom'
import PageShell from '../components/PageShell.tsx'
import { NOT_FOUND, ROUTES } from '../site.ts'

export default function NotFound() {
  return (
    <PageShell meta={NOT_FOUND} label="ERROR 404" notation="x ∉ S" title="Page not found" lead="This page does not exist or has moved.">
      <div className="hero__actions">
        <Link to="/" className="button button--primary">
          Home
        </Link>
        <Link to={ROUTES.research.path} className="button">
          Research
        </Link>
      </div>
    </PageShell>
  )
}
