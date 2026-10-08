import clsx from 'clsx'
import { NavLink } from 'react-router-dom'
import ExternalLink from './ExternalLink.tsx'
import { NAV_ITEMS } from './nav-items.ts'

interface MobileNavProps {
  id: string
  open: boolean
  onNavigate: () => void
}

/** Dropdown panel shown under the pill on small screens. Hidden from the accessibility tree when closed. */
export default function MobileNav({ id, open, onNavigate }: MobileNavProps) {
  return (
    <div id={id} className={clsx('mobile-nav', open && 'mobile-nav--open')} hidden={!open}>
      <ul className="mobile-nav__list">
        {NAV_ITEMS.map(item => (
          <li key={item.label}>
            {item.external ? (
              <ExternalLink href={item.href} className="mobile-nav__link">
                {item.label}
              </ExternalLink>
            ) : (
              <NavLink to={item.to} className="mobile-nav__link" onClick={onNavigate}>
                {item.label}
              </NavLink>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
