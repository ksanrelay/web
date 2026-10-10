import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
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

/** Scroll to the top on navigation, or to the target element when the URL has a hash. */
function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    const target = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null
    if (target) target.scrollIntoView()
    else window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

export default function App() {
  return (
    <>
      <div className="backdrop" aria-hidden="true" />
      <ScrollToTop />
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Navbar />
      <main id="main" className="main" tabIndex={-1}>
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
      </main>
      <Footer />
    </>
  )
}
