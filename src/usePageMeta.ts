import { useEffect } from 'react'
import { normaliseSiteUrl, type RouteMeta } from './site.ts'

const SITE_URL = normaliseSiteUrl(import.meta.env.VITE_SITE_URL)

/** Set an attribute on a head tag, creating the tag if absent; a null value removes the tag. */
function setHeadTag(tag: 'meta' | 'link', key: [string, string], attr: 'content' | 'href', value: string | null) {
  const [keyAttr, keyValue] = key
  let el = document.head.querySelector(`${tag}[${keyAttr}="${keyValue}"]`)
  if (value === null) {
    el?.remove()
    return
  }
  if (!el) {
    el = document.createElement(tag)
    el.setAttribute(keyAttr, keyValue)
    document.head.appendChild(el)
  }
  el.setAttribute(attr, value)
}

/**
 * Keeps <title>, description, Open Graph, canonical and robots tags in sync with the current route
 * during client-side navigation. The first load already has them from the prerendered HTML.
 */
export function usePageMeta(meta: RouteMeta) {
  useEffect(() => {
    document.title = meta.title
    setHeadTag('meta', ['name', 'description'], 'content', meta.description)
    setHeadTag('meta', ['property', 'og:title'], 'content', meta.title)
    setHeadTag('meta', ['property', 'og:description'], 'content', meta.description)
    const url = SITE_URL && meta.path ? SITE_URL + meta.path : null
    setHeadTag('link', ['rel', 'canonical'], 'href', url)
    setHeadTag('meta', ['property', 'og:url'], 'content', url)
    setHeadTag('meta', ['name', 'robots'], 'content', meta.noindex ? 'noindex' : null)
  }, [meta])
}
