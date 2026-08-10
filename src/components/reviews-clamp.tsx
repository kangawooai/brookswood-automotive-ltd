'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Review body text clamped to three lines with a "Read more" / "Read less"
 * toggle. The toggle only appears when the text actually overflows three lines,
 * so short reviews stay clean and no single card dominates the layout.
 *
 * This is the only interactive part of a review card, so it lives in its own
 * small client island, the rest of the reviews section is server-rendered.
 */
export function ClampedText({
  text,
  className = '',
  textClassName = '',
}: {
  text: string
  className?: string
  textClassName?: string
}) {
  const ref = useRef<HTMLQuoteElement>(null)
  const [expanded, setExpanded] = useState(false)
  const [clampable, setClampable] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || expanded) return
    const check = () => setClampable(el.scrollHeight - el.clientHeight > 1)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [text, expanded])

  return (
    <div className={className}>
      <blockquote ref={ref} className={`${textClassName} ${expanded ? '' : 'line-clamp-3'}`}>
        {text}
      </blockquote>
      {clampable && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          className="mt-2 text-xs font-bold uppercase tracking-wide text-primary transition-colors hover:text-primary/80"
        >
          {expanded ? 'Read less' : 'Read more'}
        </button>
      )}
    </div>
  )
}
