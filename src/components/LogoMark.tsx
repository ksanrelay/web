import clsx from 'clsx'

interface LogoMarkProps {
  className?: string
  title?: string
}

/** KSAN Relay relay/pulse mark. Monochrome; inherits colour from `currentColor`. */
export default function LogoMark({ className, title }: LogoMarkProps) {
  return (
    <svg
      className={clsx('logo-mark', className)}
      viewBox="-256 -256 512 512"
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      focusable="false"
    >
      <g fill="none" stroke="currentColor" strokeWidth="22">
        <path d="M-206.9 -62 A216 216 0 0 1 206.9 -62" />
        <path d="M-206.9 62 A216 216 0 0 0 -48 210.6" />
        <path d="M48 210.6 A216 216 0 0 0 206.9 62" />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M-200 0 H-143 C-108 0 -82 -78 -54 -78 C-26 -78 -16 -34 0 0 C16 34 26 78 54 78 C82 78 108 0 143 0 H200"
        />
      </g>
      <g fill="currentColor">
        <circle cx="-216" cy="0" r="34" />
        <circle cx="216" cy="0" r="34" />
      </g>
    </svg>
  )
}
