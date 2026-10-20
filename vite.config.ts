import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv, type Plugin } from 'vite'
import { headTags } from './src/seo.ts'
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
 * - set:   canonical + og:url + absolute og:image on every page, robots.txt with Sitemap, sitemap.xml
 * - unset: relative og:image, robots.txt without Sitemap, no sitemap.xml
 * The dev server gets the home page's head tags; production builds leave <!--head--> for
 * scripts/prerender.mjs, which writes per-route tags into each prerendered page, and get a font preload.
 */
function seo(siteUrl: string | undefined): Plugin {
  return {
    name: 'ksan-seo',
    // Only the client build emits robots.txt and sitemap.xml, not the prerender (SSR) build.
    applyToEnvironment: environment => environment.name === 'client',
    transformIndexHtml: {
      order: 'post',
      handler(html, ctx) {
        if (ctx.server) return html.replace('<!--head-->', headTags(ROUTES.home, siteUrl))
        // Preload the Latin Geist file: it sets the hero headline (the LCP element), so fetch it before the CSS
        // that references it has been parsed. `crossorigin` is required for font preloads, even same-origin.
        const fonts = Object.keys(ctx.bundle ?? {}).filter(file => /\/geist-latin-wght-normal-[\w-]+\.woff2$/.test(file))
        return {
          html,
          tags: fonts.map(file => ({
            tag: 'link',
            attrs: { rel: 'preload', href: `/${file}`, as: 'font', type: 'font/woff2', crossorigin: '' },
            injectTo: 'head' as const,
          })),
        }
      },
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
