import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv, type Plugin } from 'vite'
import { ROUTES, normaliseSiteUrl } from './src/site.ts'

// Keep in sync with the headers in vercel.json so `npm run preview` exercises the production CSP.
const SECURITY_HEADERS = {
  'Content-Security-Policy':
    "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; font-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'none'; frame-ancestors 'none'; upgrade-insecure-requests",
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
  'X-Frame-Options': 'DENY',
}

/**
 * Domain-dependent SEO output. Driven by VITE_SITE_URL (e.g. https://ksanrelay.com):
 * - set:   canonical + og:url + absolute og:image in index.html, robots.txt with Sitemap, sitemap.xml
 * - unset: relative og:image, robots.txt without Sitemap, no sitemap.xml
 */
function seo(siteUrl: string | undefined): Plugin {
  return {
    name: 'ksan-seo',
    transformIndexHtml(html) {
      const tags = siteUrl
        ? [
            `<link rel="canonical" href="${siteUrl}/" />`,
            `<meta property="og:url" content="${siteUrl}/" />`,
            `<meta property="og:image" content="${siteUrl}/og-image.png" />`,
          ]
        : [`<meta property="og:image" content="/og-image.png" />`]
      return html.replace('<!--seo-->', tags.join('\n    '))
    },
    generateBundle() {
      const robots = ['User-agent: *', 'Allow: /']
      if (siteUrl) robots.push('', `Sitemap: ${siteUrl}/sitemap.xml`)
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: robots.join('\n') + '\n' })

      if (!siteUrl) return
      const urls = Object.values(ROUTES)
        .map(r => `  <url><loc>${siteUrl}${r.path === '/' ? '/' : r.path}</loc></url>`)
        .join('\n')
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  return {
    plugins: [react(), seo(normaliseSiteUrl(env.VITE_SITE_URL))],
    build: {
      // Keep fonts and images as files so the CSP does not need data: for fonts.
      assetsInlineLimit: 0,
    },
    preview: {
      headers: SECURITY_HEADERS,
    },
  }
})
