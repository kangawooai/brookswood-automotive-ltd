import { Star, Quote } from 'lucide-react'
import { SITE } from '@/lib/site'
import { Eyebrow } from '@/components/blocks'

type Review = { name: string; text: string }

const REVIEWS: Review[] = [
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
  {
    name: 'Samuel Clarke',
    text: 'Went in for air-conditioning and the staff were amazing — had my car being worked on within minutes and did a great job.',
  },
]

function Stars({ className = 'size-4' }: { className?: string }) {
  return (
    <div className="flex" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`${className} fill-[#f0a500] text-[#f0a500]`} />
      ))}
    </div>
  )
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <figure className="flex h-full snap-center shrink-0 basis-[85%] flex-col border border-border bg-card p-7 sm:basis-[47%] md:basis-auto md:shrink">
      <Quote className="size-8 text-primary" aria-hidden />
      <div className="mt-4">
        <Stars />
      </div>
      <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
        “{review.text}”
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-4">
        <span className="flex size-10 shrink-0 items-center justify-center bg-secondary text-sm font-black uppercase text-secondary-foreground">
          {review.name.trim().charAt(0)}
        </span>
        <span>
          <span className="block text-sm font-bold capitalize text-foreground">{review.name}</span>
          <span className="block text-xs uppercase tracking-wide text-muted-foreground">
            Google review
          </span>
        </span>
      </figcaption>
    </figure>
  )
}

export function Reviews() {
  return (
    <section className="bg-background py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <Eyebrow>Reviews</Eyebrow>
            <h2 className="mt-4 text-3xl font-black uppercase tracking-tight text-foreground md:text-4xl">
              Trusted by Fareham Drivers
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Don’t just take our word for it — here’s what our customers say about the service they
              received at Brookswood Automotive.
            </p>
          </div>
          <div className="flex items-center gap-4 border-l-4 border-primary bg-muted px-6 py-4">
            <span className="text-5xl font-black leading-none text-primary">{SITE.rating.value}</span>
            <span>
              <Stars className="size-5" />
              <span className="mt-1 block text-sm font-semibold text-foreground">
                {SITE.rating.count} Google reviews
              </span>
            </span>
          </div>
        </div>

        {/* Grid on desktop, swipeable carousel on mobile */}
        <div className="mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] md:grid md:grid-cols-2 md:overflow-visible md:pb-0 lg:grid-cols-4 [&::-webkit-scrollbar]:hidden">
          {REVIEWS.map((review) => (
            <ReviewCard key={review.name} review={review} />
          ))}
        </div>

        <p className="mt-4 text-center text-xs uppercase tracking-wide text-muted-foreground md:hidden">
          Swipe to see more reviews
        </p>
      </div>
    </section>
  )
}
