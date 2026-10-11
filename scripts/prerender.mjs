// Runs after `vite build`. Renders every route to static HTML so crawlers and link previews get the
// page's content and its own title, description and canonical without running JavaScript.
// Writes dist/index.html, dist/<route>.html (served at /<route> by Vercel's cleanUrls) and dist/404.html.

import { readFile, rm, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { build, loadEnv } from 'vite'

const root = fileURLToPath(new URL('..', import.meta.url))
const dist = new URL('../dist/', import.meta.url)
const ssrOutDir = 'dist-ssr'

await build({
  root,
  mode: 'production',
  logLevel: 'warn',
  build: { ssr: 'src/entry-server.tsx', outDir: ssrOutDir, emptyOutDir: true, copyPublicDir: false },
})

try {
  const { render, headTags, ROUTES, NOT_FOUND, normaliseSiteUrl } = await import(
    new URL(`../${ssrOutDir}/entry-server.js`, import.meta.url).href
  )
  const siteUrl = normaliseSiteUrl(loadEnv('production', root, 'VITE_').VITE_SITE_URL)
  const template = await readFile(new URL('index.html', dist), 'utf8')
  if (!template.includes('<!--head-->') || !template.includes('<div id="root"></div>')) {
    throw new Error('dist/index.html is missing the <!--head--> or <div id="root"></div> placeholder')
  }

  const pages = [
    ...Object.values(ROUTES).map(meta => ({
      meta,
      url: meta.path,
      file: meta.path === '/' ? 'index.html' : `${meta.path.slice(1)}.html`,
    })),
    { meta: NOT_FOUND, url: '/404', file: '404.html' },
  ]

  for (const { meta, url, file } of pages) {
    const html = template
      .replace('<!--head-->', () => headTags(meta, siteUrl))
      .replace('<div id="root"></div>', () => `<div id="root">${render(url)}</div>`)
    await writeFile(new URL(file, dist), html)
  }
  console.log(`prerendered ${pages.length} pages`)
} finally {
  await rm(new URL(`../${ssrOutDir}/`, import.meta.url), { recursive: true, force: true })
}
