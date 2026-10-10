// Site-wide configuration and per-route metadata.
// Kept free of JSX/DOM code so vite.config.ts can import it for robots.txt and sitemap.xml.

export const SITE_NAME = 'KSAN RELAY'

export const CONTACT = {
  email: 'dev.parthpancholi@outlook.com',
  github: 'https://github.com/ksanrelay',
  linkedin: 'https://www.linkedin.com/company/ksan-relay',
} as const

export interface RouteMeta {
  path: string
  title: string
  description: string
}

const DEFAULT_DESCRIPTION =
  'KSAN RELAY is an independent quantitative research and proprietary trading firm. It develops data-driven models, publishes research and open-source tools, and trades its own capital.'

export const ROUTES = {
  home: {
    path: '/',
    title: 'KSAN RELAY — Quantitative Research & Proprietary Trading',
    description: DEFAULT_DESCRIPTION,
  },
  research: {
    path: '/research',
    title: 'Research — KSAN RELAY',
    description:
      'Research papers, technical notes and market studies from KSAN RELAY on quantitative finance, statistics, market behavior and algorithmic systems.',
  },
  openSource: {
    path: '/open-source',
    title: 'Open Source — KSAN RELAY',
    description:
      'Models, datasets, libraries and research tools released by KSAN RELAY, each under its own license.',
  },
  about: {
    path: '/about',
    title: 'About — KSAN RELAY',
    description:
      'KSAN RELAY is an independent quantitative research and proprietary trading firm. It trades only its own capital and does not manage external or client capital.',
  },
  contact: {
    path: '/contact',
    title: 'Contact — KSAN RELAY',
    description: 'Contact KSAN RELAY about research, publications and open-source releases.',
  },
  policy: {
    path: '/policy',
    title: 'Policy — KSAN RELAY',
    description: 'Privacy policy, terms of use and disclaimers for the KSAN RELAY website.',
  },
  privacy: {
    path: '/privacy',
    title: 'Privacy Policy — KSAN RELAY',
    description: 'How the KSAN RELAY website handles data. The site is static, sets no cookies and runs no analytics.',
  },
  terms: {
    path: '/terms',
    title: 'Terms of Use — KSAN RELAY',
    description: 'Terms governing use of the KSAN RELAY website, its research content and links to open-source releases.',
  },
  disclaimer: {
    path: '/disclaimer',
    title: 'Disclaimer — KSAN RELAY',
    description:
      'Content on the KSAN RELAY website is for informational and research purposes. It is not investment advice, and KSAN RELAY does not accept or manage client capital.',
  },
} satisfies Record<string, RouteMeta>

export const NOT_FOUND: RouteMeta = {
  path: '',
  title: 'Page Not Found — KSAN RELAY',
  description: DEFAULT_DESCRIPTION,
}

/** Normalise a configured site URL: trim whitespace and trailing slashes. Empty → undefined. */
export function normaliseSiteUrl(raw: string | undefined): string | undefined {
  const value = raw?.trim().replace(/\/+$/, '')
  return value ? value : undefined
}
