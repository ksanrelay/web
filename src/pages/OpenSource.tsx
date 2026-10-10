import { Link } from 'react-router-dom'
import ExternalLink from '../components/ExternalLink.tsx'
import PageShell from '../components/PageShell.tsx'
import ReleaseList from '../components/ReleaseList.tsx'
import Section from '../components/Section.tsx'
import { sortedReleases } from '../content/publications.ts'
import { CONTACT, ROUTES } from '../site.ts'

const TYPES: [type: string, scope: string][] = [
  ['Models', 'Trained or specified models with their assumptions and evaluation'],
  ['Datasets', 'Curated or derived data with documentation of sources and limitations'],
  ['Libraries', 'Reusable code for statistics, simulation and market data'],
  ['Tools', 'Utilities for running, testing and inspecting research'],
  ['Infrastructure', 'Components for reproducible research pipelines'],
]

export default function OpenSource() {
  const releases = sortedReleases()
  return (
    <PageShell
      meta={ROUTES.openSource}
      label="OPEN SOURCE"
      title="Open Source"
      lead="Selected models, datasets, libraries and research tools, released publicly. Each release states its own license."
    >
      <Section index="01" label="RELEASES" title="Releases">
        <ReleaseList
          items={releases}
          empty={
            <>
              No releases yet. Public repositories will appear here and on{' '}
              <ExternalLink href={CONTACT.github}>GitHub</ExternalLink>.
            </>
          }
        />
      </Section>

      <Section index="02" label="SCOPE" title="What we release">
        <dl className="kv-table kv-table--wide">
          {TYPES.map(([type, scope]) => (
            <div key={type} className="kv-table__row">
              <dt>{type}</dt>
              <dd>{scope}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section index="03" label="LICENSING" title="Licenses and use">
        <div className="prose">
          <p>
            Each repository or dataset states its license. That license governs reuse of the material it covers.
            Open-source releases may be experimental, and datasets may contain errors or have limitations that their
            documentation describes.
          </p>
          <p>
            Releases are provided for research use and without warranty. See the{' '}
            <Link to={ROUTES.disclaimer.path}>disclaimer</Link> and <Link to={ROUTES.terms.path}>terms of use</Link>.
          </p>
        </div>
      </Section>
    </PageShell>
  )
}
