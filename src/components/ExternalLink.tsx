import clsx from 'clsx'
import { ArrowUpRight } from 'lucide-react'
import type { ReactNode } from 'react'

interface ExternalLinkProps {
  href: string
  children: ReactNode
  className?: string
  /** Show the ↗ icon after the label. */
  icon?: boolean
}

/** Off-site link: opens in a new tab without leaking `window.opener` or the referrer path. */
export default function ExternalLink({ href, children, className, icon = true }: ExternalLinkProps) {
  return (
    <a className={clsx('external-link', className)} href={href} target="_blank" rel="noopener noreferrer">
      {children}
      {icon && <ArrowUpRight className="external-link__icon" size={14} strokeWidth={1.75} aria-hidden="true" />}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  )
}
