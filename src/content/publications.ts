// Published research and open-source releases. Add an entry here and it appears on the
// Research or Open Source page.

export type PublicationCategory = 'Paper' | 'Preprint' | 'Technical report' | 'Research note' | 'Experiment' | 'Market study'

export interface Publication {
  title: string
  /** ISO date, e.g. "2026-11-02". */
  date: string
  category: PublicationCategory
  authors: string[]
  abstract: string
  /** Paper, preprint or PDF. */
  url?: string
  /** Code or data needed to reproduce the work. */
  repository?: string
}

export type ReleaseType = 'Model' | 'Dataset' | 'Library' | 'Tool' | 'Infrastructure'

export interface Release {
  name: string
  /** One line. */
  description: string
  type: ReleaseType
  /** Version tag or ISO release date. */
  version?: string
  /** ISO date of the latest release, used for ordering. */
  date: string
  repository: string
  docs?: string
  license?: string
}

export const PUBLICATIONS: Publication[] = []

export const RELEASES: Release[] = []

const byDateDesc = <T extends { date: string }>(a: T, b: T) => b.date.localeCompare(a.date)

export const sortedPublications = () => [...PUBLICATIONS].sort(byDateDesc)
export const sortedReleases = () => [...RELEASES].sort(byDateDesc)

export function formatDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00Z`)
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' })
}
