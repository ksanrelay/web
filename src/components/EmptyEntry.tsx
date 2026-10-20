import type { ReactNode } from 'react'

interface EmptyEntryProps {
  children: ReactNode
  action?: ReactNode
}

/** Placeholder shown in place of an empty entry list. Uses the entry grid, with dashed rules, so the page
    keeps the shape it will have once entries exist. */
export default function EmptyEntry({ children, action }: EmptyEntryProps) {
  return (
    <div className="entry entry--placeholder">
      <div className="entry__meta tech-label" aria-hidden="true">
        —
      </div>
      <div className="entry__body">
        <p className="entry__text">{children}</p>
        {action && <div className="entry__actions">{action}</div>}
      </div>
    </div>
  )
}
