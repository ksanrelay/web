// Site-wide configuration and per-route metadata.
// Kept free of JSX/DOM code so vite.config.ts can import it for robots.txt and sitemap.xml.

export const SITE_NAME = 'KSAN Relay'

export const CONTACT = {
  email: 'mail@ksanrelay.com',
  github: 'https://github.com/ksanrelay',
  linkedin: 'https://www.linkedin.com/company/ksan-relay',
} as const

export interface RouteMeta {
  path: string
  title: string
  description: string
}

const DEFAULT_DESCRIPTION =
  'KSAN Relay is an independent quantitative research firm focused on systematic methods, statistical modeling, computational finance, and scientific computing.'

export const ROUTES = {
  home: {
    path: '/',
    title: 'KSAN Relay — Quantitative Research & Computational Finance',
    description: DEFAULT_DESCRIPTION,
  },
  research: {
    path: '/research',
    title: 'KSAN Relay Research',
    description:
      'Research at KSAN Relay is ongoing. Selected work will be published when it reaches an appropriate level of methodological and technical maturity.',
  },
  about: {
    path: '/about',
    title: 'About KSAN Relay',
    description:
      'KSAN Relay is an independent quantitative research organization applying mathematics, statistics, physics-inspired modeling, and computer science to financial markets.',
  },
  contact: {
    path: '/contact',
    title: 'Contact — KSAN Relay',
    description: 'Contact KSAN Relay by email, or find KSAN Relay on GitHub and LinkedIn.',
  },
  privacy: {
    path: '/privacy',
    title: 'Privacy Policy — KSAN Relay',
    description: 'How the KSAN Relay website handles data. The site is static and collects as little data as possible.',
  },
  terms: {
    path: '/terms',
    title: 'Terms of Use — KSAN Relay',
    description: 'Terms governing use of the KSAN Relay website and its research content.',
  },
  disclaimer: {
    path: '/disclaimer',
    title: 'Disclaimer — KSAN Relay',
    description: 'KSAN Relay publishes research for informational, educational, and research purposes only. Nothing on this site is investment advice.',
  },
} satisfies Record<string, RouteMeta>

export const NOT_FOUND: RouteMeta = {
  path: '',
  title: 'Not Found — KSAN Relay',
  description: DEFAULT_DESCRIPTION,
}

/** Normalise a configured site URL: trim whitespace and trailing slashes. Empty → undefined. */
export function normaliseSiteUrl(raw: string | undefined): string | undefined {
  const value = raw?.trim().replace(/\/+$/, '')
  return value ? value : undefined
}
