/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Public site origin, e.g. https://ksanrelay.com. Optional; enables canonical URLs and sitemap.xml. Never put secrets in VITE_* variables. */
  readonly VITE_SITE_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
