'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

// The cookie banner isn't needed for the first paint, so its code is loaded
// lazily once the browser is idle. This keeps the banner's JavaScript out of the
// critical path without changing anything the visitor sees.
const CookieConsent = dynamic(
  () => import('@/components/cookie-consent').then((m) => m.CookieConsent),
  { ssr: false },
)

export function CookieConsentLoader() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const win = window as Window & {
      requestIdleCallback?: (cb: () => void) => number
      cancelIdleCallback?: (id: number) => void
    }
    if (typeof win.requestIdleCallback === 'function') {
      const id = win.requestIdleCallback(() => setReady(true))
      return () => win.cancelIdleCallback?.(id)
    }
    const id = window.setTimeout(() => setReady(true), 1500)
    return () => window.clearTimeout(id)
  }, [])

  return ready ? <CookieConsent /> : null
}
