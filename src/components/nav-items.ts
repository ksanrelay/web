import { ROUTES } from '../site.ts'

export interface NavItem {
  label: string
  to: string
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Research', to: ROUTES.research.path },
  { label: 'Open Source', to: ROUTES.openSource.path },
  { label: 'About', to: ROUTES.about.path },
  { label: 'Contact', to: ROUTES.contact.path },
]
