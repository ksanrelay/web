// Site-wide configuration and per-route metadata.
// Kept free of JSX/DOM code so vite.config.ts and the prerender script can import it.

export const SITE_NAME = 'Ksan Relay'

export const CONTACT = {
  email: 'dev.parthpancholi@outlook.com',
  github: 'https://github.com/ksanrelay',
  linkedin: 'https://www.linkedin.com/company/ksan-relay',
} as const

export interface RouteMeta {
  path: string
  title: string
  description: string
  /** Ask search engines not to index the page. */
  noindex?: boolean
}

const DEFAULT_DESCRIPTION =
  'Independent quantitative finance firm. Ksan Relay builds data-driven models, publishes research and open-source tools, and trades its own capital.'

export const ROUTES = {
  home: {
    path: '/',
    title: 'Ksan Relay — Quantitative Finance Firm',
    description: DEFAULT_DESCRIPTION,
  },
  research: {
    path: '/research',
    title: 'Research — Ksan Relay',
    description:
      'Research papers, technical notes and market studies from Ksan Relay on quantitative finance, statistics, market behavior and algorithmic systems.',
  },
  openSource: {
    path: '/open-source',
    title: 'Open Source — Ksan Relay',
    description:
      'Models, datasets, libraries and research tools released by Ksan Relay, each under its own license.',
  },
  about: {
    path: '/about',
    title: 'About — Ksan Relay',
    description:
      'Ksan Relay is an independent quantitative finance firm. It trades only its own capital and does not manage external or client capital.',
  },
  contact: {
    path: '/contact',
    title: 'Contact — Ksan Relay',
    description: 'Contact Ksan Relay about research, publications and open-source releases.',
  },
  policy: {
    path: '/policy',
    title: 'Policy — Ksan Relay',
    description: 'Privacy policy, terms of use and disclaimers for the Ksan Relay website.',
  },
  privacy: {
    path: '/privacy',
    title: 'Privacy Policy — Ksan Relay',
    description: 'How the Ksan Relay website handles data. The site is static, sets no cookies and runs no analytics.',
  },
  terms: {
    path: '/terms',
    title: 'Terms of Use — Ksan Relay',
    description: 'Terms governing use of the Ksan Relay website, its research content and links to open-source releases.',
  },
  disclaimer: {
    path: '/disclaimer',
    title: 'Disclaimer — Ksan Relay',
    description:
      'Website content is for informational and research purposes only. It is not investment advice, and Ksan Relay does not accept or manage client capital.',
  },
} satisfies Record<string, RouteMeta>

export const NOT_FOUND: RouteMeta = {
  path: '',
  title: 'Page Not Found — Ksan Relay',
  description: DEFAULT_DESCRIPTION,
  noindex: true,
}

/** Normalise a configured site URL: trim whitespace and trailing slashes. Empty → undefined. */
export function normaliseSiteUrl(raw: string | undefined): string | undefined {
  const value = raw?.trim().replace(/\/+$/, '')
  return value ? value : undefined
}
