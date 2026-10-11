// Per-route <head> tags written into the prerendered HTML at build time (see scripts/prerender.mjs).
// Kept free of JSX/DOM code so vite.config.ts can import it for the dev server.

import { CONTACT, ROUTES, SITE_NAME, type RouteMeta } from './site.ts'

function escapeAttr(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

/** Organization (and, once the domain is known, WebSite) structured data for the home page. */
function structuredData(siteUrl: string | undefined): string {
  const organization: Record<string, unknown> = {
    '@type': 'Organization',
    name: SITE_NAME,
    description: ROUTES.home.description,
    email: `mailto:${CONTACT.email}`,
    sameAs: [CONTACT.github, CONTACT.linkedin],
  }
  const graph: Record<string, unknown>[] = [organization]
  if (siteUrl) {
    organization['@id'] = `${siteUrl}/#organization`
    organization.url = `${siteUrl}/`
    organization.logo = `${siteUrl}/favicon.svg`
    graph.push({
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      name: SITE_NAME,
      url: `${siteUrl}/`,
      publisher: { '@id': `${siteUrl}/#organization` },
    })
  }
  // Escape "<" so the JSON can never close the surrounding <script> element.
  const json = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c')
  return `<script type="application/ld+json">${json}</script>`
}

/** Title, description, Open Graph, canonical and robots tags for one route. */
export function headTags(meta: RouteMeta, siteUrl: string | undefined): string {
  const title = escapeAttr(meta.title)
  const description = escapeAttr(meta.description)
  const tags = [
    `<title>${title}</title>`,
    `<meta name="description" content="${description}" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
  ]
  if (siteUrl && meta.path) {
    const url = escapeAttr(siteUrl + meta.path)
    tags.push(`<link rel="canonical" href="${url}" />`, `<meta property="og:url" content="${url}" />`)
  }
  tags.push(`<meta property="og:image" content="${siteUrl ? escapeAttr(siteUrl) : ''}/og-image.png" />`)
  if (meta.noindex) tags.push('<meta name="robots" content="noindex" />')
  if (meta.path === ROUTES.home.path) tags.push(structuredData(siteUrl))
  return tags.join('\n    ')
}
