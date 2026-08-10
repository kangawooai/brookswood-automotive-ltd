'use client'

// Client-side capture of ad-campaign tracking parameters. Values are read from
// the URL on first load, merged with anything already saved, and persisted in
// sessionStorage so they survive in-site navigation before a form is submitted.

export type TrackingParams = {
  utm_source: string
  utm_medium: string
  utm_campaign: string
  utm_term: string
  utm_content: string
  identifier: string
  sq: string
  loc: string
  querystring: string
}

const STORAGE_KEY = 'tracking_params'

export const EMPTY_TRACKING: TrackingParams = {
  utm_source: '',
  utm_medium: '',
  utm_campaign: '',
  utm_term: '',
  utm_content: '',
  identifier: '',
  sq: '',
  loc: '',
  querystring: '',
}

export function getStoredTrackingParams(): TrackingParams {
  if (typeof window === 'undefined') return { ...EMPTY_TRACKING }
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY)
    if (raw) return { ...EMPTY_TRACKING, ...JSON.parse(raw) }
  } catch {
    // sessionStorage may be unavailable (private mode), fall through.
  }
  return { ...EMPTY_TRACKING }
}

/**
 * Read tracking params from the current URL, merge over any previously stored
 * values (a new landing URL wins; navigation without params keeps the original),
 * persist the result and return it.
 */
export function captureTrackingParams(): TrackingParams {
  if (typeof window === 'undefined') return { ...EMPTY_TRACKING }

  const sp = new URLSearchParams(window.location.search)
  const pick = (...keys: string[]) => {
    for (const k of keys) {
      const v = sp.get(k)
      if (v) return v
    }
    return ''
  }

  const fromUrl: TrackingParams = {
    utm_source: pick('utm_source'),
    utm_medium: pick('utm_medium'),
    utm_campaign: pick('utm_campaign'),
    utm_term: pick('utm_term'),
    utm_content: pick('utm_content'),
    // Identifier comes from the ad tracking URL and defaults to an empty string.
    identifier: pick('identifier'),
    sq: pick('sq', 'q'),
    loc: pick('loc', 'gl'),
    querystring: window.location.search.replace(/^\?/, ''),
  }

  const merged = { ...getStoredTrackingParams() }
  ;(Object.keys(fromUrl) as (keyof TrackingParams)[]).forEach((k) => {
    if (fromUrl[k]) merged[k] = fromUrl[k]
  })

  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(merged))
  } catch {
    // Ignore persistence failures.
  }

  return merged
}
