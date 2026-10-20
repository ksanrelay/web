import { Check, Copy } from 'lucide-react'
import { useEffect, useRef, useState, useSyncExternalStore } from 'react'

interface CopyButtonProps {
  text: string
  /** What is copied, for screen readers, e.g. "email address". */
  what: string
}

const noSubscribe = () => () => {}
const hasClipboard = () => typeof navigator.clipboard?.writeText === 'function'
// The server cannot know, so prerendered HTML keeps the button hidden until hydration confirms support.
const serverHasClipboard = () => false

/** Copies `text` to the clipboard and confirms with a short "Copied" state. */
export default function CopyButton({ text, what }: CopyButtonProps) {
  const supported = useSyncExternalStore(noSubscribe, hasClipboard, serverHasClipboard)
  const [copied, setCopied] = useState(false)
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      return // Permission denied: the text stays on screen to copy by hand.
    }
    setCopied(true)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setCopied(false), 1600)
  }

  return (
    <>
      <button type="button" className="copy-button" hidden={!supported} onClick={copy} data-copied={copied || undefined}>
        {copied ? <Check size={14} strokeWidth={1.75} aria-hidden="true" /> : <Copy size={14} strokeWidth={1.75} aria-hidden="true" />}
        {copied ? 'Copied' : 'Copy'}
        <span className="sr-only"> {what}</span>
      </button>
      <span className="sr-only" role="status">
        {copied ? `Copied ${what}` : ''}
      </span>
    </>
  )
}
