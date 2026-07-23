'use client'

import { useEffect } from 'react'
import { captureTrackingParams } from '@/lib/tracking-params'

/**
 * Captures ad-campaign tracking params on load, persists them for later form
 * submissions and pushes a `utm_captured` event to the GTM dataLayer.
 */
export function UtmProvider() {
  useEffect(() => {
    const params = captureTrackingParams()
    const w = window as unknown as { dataLayer?: Record<string, unknown>[] }
    w.dataLayer = w.dataLayer || []
    w.dataLayer.push({ event: 'utm_captured', ...params })
  }, [])

  return null
}
