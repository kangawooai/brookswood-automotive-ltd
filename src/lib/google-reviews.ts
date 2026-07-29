import 'server-only'
import { SITE } from './site'

/**
 * Live Google rating + reviews for Brookswood Automotive.
 *
 * Data is pulled from the Google Places API (New) — Place Details — when a
 * `GOOGLE_PLACES_API_KEY` and `GOOGLE_PLACES_ID` are configured in the
 * environment. Results are cached and refreshed periodically (see `revalidate`
 * below) so the rating, review count and reviews stay current without any
 * manual updates.
 *
 * Google caps the API to 5 reviews, so when the API returns fewer than we would
 * like to show (or is unavailable), we fall back to our hand-picked curated
 * reviews. The rating value/count always prefer the live figures when present.
 *
 * The API key is read from the environment only and is NEVER exposed to the
 * client — this module is server-only.
 */

export type Review = {
  name: string
  text: string
  /** Star rating for this individual review (1–5). Defaults to 5. */
  rating?: number
}

export type PlaceData = {
  rating: { value: string; count: number }
  reviews: Review[]
  /** True when the figures came live from Google, false when using fallbacks. */
  live: boolean
}

/** Hand-picked reviews used as a fallback when the live API is unavailable. */
export const CURATED_REVIEWS: Review[] = [
  {
    name: 'Rick B',
    text: 'I cannot recommend Brookswood Automotive highly enough. The day before my holiday my panoramic sunroof jammed almost fully open — they sorted it quickly and saved my trip.',
  },
  {
    name: 'Bonnie Heard',
    text: 'Professional, friendly and genuinely cared about doing everything to the highest standard. As a woman I felt completely respected and never talked down to.',
  },
  {
    name: 'Roshni Kahol',
    text: 'These guys are amazing! Other mechanics refused to look at my gearbox issue — Brookswood fixed it in a day. Thank you!',
  },
  {
    name: 'Ben West',
    text: 'Had a clutch issue and even though the part arrived late they still finished it by closing. Great customer service, will be coming back.',
  },
  {
    name: 'Amanda Gill',
    text: 'Took my 3 Series in for a service and a few small issues. Booked in quickly and kept me updated throughout. First time using Brookswood and really impressed.',
  },
  {
    name: 'Paul Winter',
    text: 'After a clutch failure my car was towed in — Jay repaired it promptly and Tom even dropped me home while it was done. Excellent all-round service.',
  },
  {
    name: 'gary murray',
    text: "Highly recommend to anyone who needs a garage. Honest, reliable and well priced. I'd 100% use them again.",
  },
]

const FALLBACK: PlaceData = {
  rating: { value: SITE.rating.value, count: SITE.rating.count },
  reviews: CURATED_REVIEWS,
  live: false,
}

/** Below this many live reviews we keep showing the curated set instead. */
const MIN_LIVE_REVIEWS = 3

/** How often (in seconds) to refresh the data from Google. */
const REVALIDATE_SECONDS = 60 * 60 * 12 // twice a day

type GooglePlaceResponse = {
  rating?: number
  userRatingCount?: number
  reviews?: {
    rating?: number
    text?: { text?: string }
    originalText?: { text?: string }
    authorAttribution?: { displayName?: string }
  }[]
}

export async function getPlaceData(): Promise<PlaceData> {
  const key = process.env.GOOGLE_PLACES_API_KEY
  const placeId = process.env.GOOGLE_PLACES_ID

  if (!key || !placeId) return FALLBACK

  try {
    const res = await fetch(
      `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}?languageCode=en-GB`,
      {
        headers: {
          'X-Goog-Api-Key': key,
          'X-Goog-FieldMask': 'rating,userRatingCount,reviews',
        },
        next: { revalidate: REVALIDATE_SECONDS },
      },
    )

    if (!res.ok) return FALLBACK

    const data = (await res.json()) as GooglePlaceResponse

    const value =
      typeof data.rating === 'number' ? data.rating.toFixed(1) : SITE.rating.value
    const count =
      typeof data.userRatingCount === 'number' ? data.userRatingCount : SITE.rating.count

    const liveReviews: Review[] = (data.reviews ?? [])
      .map((r) => ({
        name: r.authorAttribution?.displayName?.trim() || 'Google reviewer',
        text: (r.originalText?.text || r.text?.text || '').trim(),
        rating: typeof r.rating === 'number' ? r.rating : undefined,
      }))
      .filter((r) => r.text.length > 0)

    // Google caps reviews at 5; if it returns fewer than we want to show, keep
    // the curated reviews so the section never looks sparse.
    const reviews = liveReviews.length >= MIN_LIVE_REVIEWS ? liveReviews : CURATED_REVIEWS

    return { rating: { value, count }, reviews, live: true }
  } catch {
    return FALLBACK
  }
}
