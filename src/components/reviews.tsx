import { getPlaceData } from '@/lib/google-reviews'
import { ReviewsView } from '@/components/reviews-view'

/**
 * Reviews section, server component. Pulls the live Google rating and reviews
 * (with a curated fallback) and hands them to the presentational client view.
 */
export async function Reviews({ redBadge = false }: { redBadge?: boolean }) {
  const { reviews, rating } = await getPlaceData()
  return <ReviewsView reviews={reviews} rating={rating} redBadge={redBadge} />
}
