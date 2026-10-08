import { CONTACT, ROUTES } from '../site.ts'

export type NavItem = { label: string; to: string; external?: false } | { label: string; href: string; external: true }

export const NAV_ITEMS: NavItem[] = [
  { label: 'Research', to: ROUTES.research.path },
  { label: 'About', to: ROUTES.about.path },
  { label: 'GitHub', href: CONTACT.github, external: true },
  { label: 'Contact', to: ROUTES.contact.path },
]
