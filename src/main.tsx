import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import '@fontsource-variable/geist/wght.css'
import '@fontsource-variable/jetbrains-mono/wght.css'
import './styles/global.css'
import App from './App.tsx'

// The app restores scroll itself on Back/Forward (see ScrollManager in App.tsx).
history.scrollRestoration = 'manual'

const root = document.getElementById('root')!
const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)

// Production pages are prerendered at build time, so hydrate them; the dev server serves an empty root.
if (root.hasChildNodes()) hydrateRoot(root, app)
else createRoot(root).render(app)
