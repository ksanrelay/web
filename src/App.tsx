import { ViewTransition, useLayoutEffect } from 'react'
import { Route, Routes, useLocation, useNavigationType } from 'react-router-dom'
import Footer from './components/Footer.tsx'
import Navbar from './components/Navbar.tsx'
import About from './pages/About.tsx'
import Contact from './pages/Contact.tsx'
import Disclaimer from './pages/Disclaimer.tsx'
import Home from './pages/Home.tsx'
import NotFound from './pages/NotFound.tsx'
import OpenSource from './pages/OpenSource.tsx'
import Policy from './pages/Policy.tsx'
import Privacy from './pages/Privacy.tsx'
import Research from './pages/Research.tsx'
import Terms from './pages/Terms.tsx'
import { ROUTES } from './site.ts'

// Scroll positions per history entry. Kept in memory only: the Privacy policy promises no browser storage.
const savedScroll = new Map<string, number>()

/**
 * New navigations start at the top (or at the URL's #target); Back and Forward return to where the reader was.
 * Runs as a layout effect so the scroll position is set before a page transition captures the new page.
 */
function ScrollManager() {
  const { key, pathname, hash } = useLocation()
  const navigationType = useNavigationType()

  useLayoutEffect(() => {
    const target = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null
    if (target) target.scrollIntoView()
    else window.scrollTo({ top: navigationType === 'POP' ? (savedScroll.get(key) ?? 0) : 0, behavior: 'instant' })

    let frame = 0
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => savedScroll.set(key, window.scrollY))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
    }
  }, [key, pathname, hash, navigationType])

  return null
}

export default function App() {
  const { pathname } = useLocation()
  return (
    <>
      <div className="backdrop" aria-hidden="true" />
      <ScrollManager />
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Navbar />
      <main id="main" className="main" tabIndex={-1}>
        {/* BrowserRouter commits navigations inside startTransition, so each page change runs as a native
            view transition: the old page fades out and the new one fades in. Browsers without the
            View Transitions API swap pages instantly. */}
        <ViewTransition key={pathname} enter="page-enter" exit="page-exit" default="none">
          <Routes>
            <Route path={ROUTES.home.path} element={<Home />} />
            <Route path={ROUTES.research.path} element={<Research />} />
            <Route path={ROUTES.openSource.path} element={<OpenSource />} />
            <Route path={ROUTES.about.path} element={<About />} />
            <Route path={ROUTES.contact.path} element={<Contact />} />
            <Route path={ROUTES.policy.path} element={<Policy />} />
            <Route path={ROUTES.privacy.path} element={<Privacy />} />
            <Route path={ROUTES.terms.path} element={<Terms />} />
            <Route path={ROUTES.disclaimer.path} element={<Disclaimer />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ViewTransition>
      </main>
      <Footer />
    </>
  )
}
