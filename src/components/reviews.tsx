'use client'

import { Star } from 'lucide-react'
import { motion } from 'motion/react'
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
]

function initials(name: string) {
  const parts = name.trim().split(/\s+/)
  const first = parts[0]?.[0] ?? ''
  const last = parts.length > 1 ? parts[parts.length - 1][0] : ''
  return (first + last).toUpperCase()
}

/** Avatar background colours drawn from the Google review palette. */
const AVATAR_COLOURS = ['#4285F4', '#EA4335', '#34A853', '#FBBC05', '#9334E6', '#00897B']

function avatarColour(name: string) {
  let sum = 0
  for (let i = 0; i < name.length; i++) sum += name.charCodeAt(i)
  return AVATAR_COLOURS[sum % AVATAR_COLOURS.length]
}

/** The multi-colour Google "G" logo. */
function GoogleG({ className = 'size-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden focusable="false">
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
      />
      <path
        fill="#FBBC05"
        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
      />
    </svg>
  )
}

function Stars({ className = 'size-4' }: { className?: string }) {
  return (
    <div className="flex items-center gap-0.5" role="img" aria-label="Rated 5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} aria-hidden className={`${className} fill-[#fbbc05] text-[#fbbc05]`} />
      ))}
    </div>
  )
}

/** Footer branding shown on each review card — the Google "G" + "Posted on Google". */
function GoogleFooter() {
  return (
    <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
      <GoogleG className="size-3.5 shrink-0" />
      Posted on Google
    </span>
  )
}

function Avatar({ name, className = 'size-10' }: { name: string; className?: string }) {
  return (
    <span
      aria-hidden
      className={`flex ${className} shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white`}
      style={{ backgroundColor: avatarColour(name) }}
    >
      {initials(name)}
    </span>
  )
}

/** Featured highlight card — spans the full grid row on desktop, normal snap card on mobile. */
function FeaturedCard({ review }: { review: Review }) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="flex h-full w-[85%] shrink-0 snap-center flex-col rounded-2xl border border-border bg-card p-6 shadow-sm sm:w-[70%] sm:p-8 md:w-auto md:shrink md:col-span-2 lg:col-span-3"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <Avatar name={review.name} className="size-12" />
          <div className="min-w-0">
            <span className="block text-sm font-bold capitalize text-foreground">{review.name}</span>
            <Stars className="mt-1 size-4" />
          </div>
        </div>
        <GoogleG className="size-7 shrink-0" />
      </div>
      <blockquote className="mt-5 text-lg font-medium leading-relaxed text-foreground sm:text-xl">
        {review.text}
      </blockquote>
      <figcaption className="mt-6 border-t border-border pt-4">
        <GoogleFooter />
      </figcaption>
    </motion.figure>
  )
}

function ReviewCard({ review, index }: { review: Review; index: number }) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.35, delay: 0.05 + (index % 3) * 0.06, ease: 'easeOut' }}
      className="group flex h-full w-[85%] shrink-0 snap-center flex-col rounded-2xl border border-border bg-card p-5 shadow-sm transition-shadow duration-300 hover:shadow-md sm:w-[47%] md:w-auto md:shrink"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <Avatar name={review.name} />
          <span className="min-w-0">
            <span className="block text-sm font-bold capitalize text-foreground">{review.name}</span>
            <Stars className="mt-1 size-4" />
          </span>
        </div>
        <GoogleG className="size-5 shrink-0" />
      </div>
      <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
        {review.text}
      </blockquote>
      <figcaption className="mt-5 border-t border-border pt-4">
        <GoogleFooter />
      </figcaption>
    </motion.figure>
  )
}

export function Reviews() {
  const [featured, ...rest] = REVIEWS

  return (
    <section className="relative overflow-hidden bg-background py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="max-w-2xl"
          >
            <Eyebrow>Reviews</Eyebrow>
            <h2 className="mt-4 text-3xl font-black uppercase tracking-tight text-foreground md:text-4xl">
              Trusted by Fareham Drivers
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Don’t just take our word for it — here’s what our customers say about the service they
              received at Brookswood Automotive.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
            className="flex items-center gap-4 rounded-2xl border border-primary/20 bg-primary/5 px-6 py-4 shadow-sm"
          >
            <span className="text-5xl font-black leading-none text-primary">{SITE.rating.value}</span>
            <span>
              <Stars className="size-5" />
              <span className="mt-1 block text-sm font-semibold text-foreground">
                {SITE.rating.count} Google reviews
              </span>
            </span>
          </motion.div>
        </div>

        {/* Grid on desktop (featured card spans the top row), swipeable snap carousel on mobile */}
        <div className="mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] md:grid md:grid-cols-2 md:overflow-visible md:pb-0 lg:grid-cols-3 [&::-webkit-scrollbar]:hidden">
          <FeaturedCard review={featured} />
          {rest.map((review, i) => (
            <ReviewCard key={review.name} review={review} index={i} />
          ))}
        </div>

        <p className="mt-4 text-center text-xs uppercase tracking-wide text-muted-foreground md:hidden">
          Swipe to see more reviews
        </p>
      </div>
    </section>
  )
}
