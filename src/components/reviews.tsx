'use client'

import { Star, Quote, BadgeCheck } from 'lucide-react'
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
  {
    name: 'Samuel Clarke',
    text: 'Went in for air-conditioning and the staff were amazing — had my car being worked on within minutes and did a great job.',
  },
]

const AVATAR_GRADIENTS = [
  'from-amber-500 to-orange-600',
  'from-sky-500 to-blue-600',
  'from-emerald-500 to-teal-600',
  'from-rose-500 to-pink-600',
  'from-violet-500 to-purple-600',
  'from-cyan-500 to-sky-600',
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

function ReviewCard({ review, index }: { review: Review; index: number }) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.08, ease: 'easeOut' }}
      className="group relative flex h-full snap-center shrink-0 basis-[85%] flex-col overflow-hidden rounded-2xl border border-border bg-card p-7 shadow-sm ring-1 ring-transparent transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:ring-primary/30 sm:basis-[47%] md:basis-auto md:shrink"
    >
      <div
        className="pointer-events-none absolute -right-8 -top-8 size-28 rounded-full bg-primary/10 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
        aria-hidden
      />
      <Quote className="size-9 shrink-0 text-primary/80" aria-hidden />
      <div className="mt-4">
        <Stars />
      </div>
      <blockquote className="mt-4 flex-1 text-[0.95rem] leading-relaxed text-muted-foreground">
        “{review.text}”
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-5">
        <span
          className={`flex size-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${AVATAR_GRADIENTS[index % AVATAR_GRADIENTS.length]} text-base font-black uppercase text-white shadow-inner`}
        >
          {review.name.trim().charAt(0)}
        </span>
        <span className="min-w-0">
          <span className="flex items-center gap-1.5 text-sm font-bold capitalize text-foreground">
            {review.name}
            <BadgeCheck className="size-4 shrink-0 text-primary" aria-label="Verified customer" />
          </span>
          <span className="block text-xs uppercase tracking-wide text-muted-foreground">
            Google review
          </span>
        </span>
      </figcaption>
    </motion.figure>
  )
}

export function Reviews() {
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

        {/* Grid on desktop, swipeable carousel on mobile */}
        <div className="mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] md:grid md:grid-cols-2 md:overflow-visible md:pb-0 lg:grid-cols-4 [&::-webkit-scrollbar]:hidden">
          {REVIEWS.map((review, i) => (
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
