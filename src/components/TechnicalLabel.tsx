import clsx from 'clsx'
import type { ReactNode } from 'react'

interface TechnicalLabelProps {
  children: ReactNode
  className?: string
  as?: 'span' | 'p' | 'div'
}

/** Small monospaced uppercase label for metadata, indices and notation captions. */
export default function TechnicalLabel({ children, className, as: Tag = 'span' }: TechnicalLabelProps) {
  return <Tag className={clsx('tech-label', className)}>{children}</Tag>
}
