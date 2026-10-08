import { Link } from 'react-router-dom'
import PageShell from '../components/PageShell.tsx'
import { NOT_FOUND } from '../site.ts'

export default function NotFound() {
  return (
    <PageShell meta={NOT_FOUND} label="ERROR 404" notation="x ∉ S" title="Page not found" lead="The requested page does not exist or has moved.">
      <Link to="/" className="button">
        Return home
      </Link>
    </PageShell>
  )
}
