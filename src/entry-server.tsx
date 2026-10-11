/* oxlint-disable react/only-export-components -- build-only module, never hot-reloaded */
// Build-time render entry used by scripts/prerender.mjs to write static HTML for every route.

import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import App from './App.tsx'

export { headTags } from './seo.ts'
export { NOT_FOUND, ROUTES, normaliseSiteUrl } from './site.ts'

export function render(url: string): string {
  return renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>,
  )
}
