import { useEffect } from 'react'
import { normaliseSiteUrl, type RouteMeta } from './site.ts'

const SITE_URL = normaliseSiteUrl(import.meta.env.VITE_SITE_URL)

function setMeta(selector: string, attr: 'content' | 'href', value: string) {
  document.head.querySelector(selector)?.setAttribute(attr, value)
}

/** Keeps <title>, description, Open Graph and canonical tags in sync with the current route. */
export function usePageMeta(meta: RouteMeta) {
  useEffect(() => {
    document.title = meta.title
    setMeta('meta[name="description"]', 'content', meta.description)
    setMeta('meta[property="og:title"]', 'content', meta.title)
    setMeta('meta[property="og:description"]', 'content', meta.description)
    if (SITE_URL && meta.path) {
      const url = SITE_URL + meta.path
      setMeta('link[rel="canonical"]', 'href', url)
      setMeta('meta[property="og:url"]', 'content', url)
    }
  }, [meta])
}
