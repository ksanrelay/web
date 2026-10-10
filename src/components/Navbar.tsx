import { Menu, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import LogoMark from './LogoMark.tsx'
import MobileNav from './MobileNav.tsx'
import { NAV_ITEMS } from './nav-items.ts'

const PANEL_ID = 'mobile-nav-panel'

export default function Navbar() {
  const { pathname } = useLocation()
  // The menu is open only for the path it was opened on, so any navigation
  // (including browser back/forward) closes it without an effect.
  const [openOn, setOpenOn] = useState<string | null>(null)
  const open = openOn === pathname
  const close = () => setOpenOn(null)
  const headerRef = useRef<HTMLElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)

  // Close on Escape (returning focus to the toggle) or on a click outside the navbar.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenOn(null)
        toggleRef.current?.focus()
      }
    }
    const onPointer = (e: PointerEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) setOpenOn(null)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onPointer)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onPointer)
    }
  }, [open])

  return (
    <header className="navbar" ref={headerRef}>
      <nav className="navbar__pill" aria-label="Primary">
        <Link to="/" className="navbar__brand" aria-label="KSAN RELAY — home">
          <LogoMark className="navbar__mark" />
          <span className="navbar__wordmark">KSAN RELAY</span>
        </Link>

        <ul className="navbar__links">
          {NAV_ITEMS.map(item => (
            <li key={item.label}>
              <NavLink to={item.to} className="navbar__link">
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <button
          ref={toggleRef}
          type="button"
          className="navbar__toggle"
          aria-expanded={open}
          aria-controls={PANEL_ID}
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpenOn(open ? null : pathname)}
        >
          {open ? <X size={18} strokeWidth={1.75} aria-hidden="true" /> : <Menu size={18} strokeWidth={1.75} aria-hidden="true" />}
        </button>
      </nav>

      <MobileNav id={PANEL_ID} open={open} onNavigate={close} />
    </header>
  )
}
