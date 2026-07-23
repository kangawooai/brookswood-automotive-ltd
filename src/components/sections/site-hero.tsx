'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Star } from 'lucide-react'
import { motion } from 'motion/react'

import { Button } from '@/components/ui/button'
import { SITE } from '@/lib/site'
import { PHOTOS, PHOTO_ALT } from '@/lib/photos'

export function SiteHero() {
  return (
    <section className="mx-auto w-full max-w-6xl p-4">
      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        <div className="grid md:grid-cols-2">
          {/* Left — text content */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col justify-center px-6 py-8 sm:px-10 md:py-10 lg:px-14 lg:py-12"
          >
            {/* Eyebrow / announcement pill */}
            <div className="mb-5">
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-3 py-1 text-xs">
                <span className="size-1.5 rounded-full bg-primary" />
                <span className="font-medium text-foreground">
                  MOT &middot; Servicing &middot; Repairs in Fareham
                </span>
                <ArrowUpRight className="size-3 text-muted-foreground" />
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl font-bold uppercase tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Fareham&apos;s Trusted MOT &amp; Car Service Centre
            </h1>

            {/* Subtitle */}
            <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
              DVSA-approved testers, honest advice and free retests on all makes and models —
              backed by {SITE.yearsExperience} years of trusted workmanship in {SITE.address.city}.
            </p>

            {/* Star rating row */}
            <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1">
              <div className="flex items-center gap-0.5" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4" fill="#f0a500" stroke="#f0a500" />
                ))}
              </div>
              <span className="text-sm font-semibold text-foreground">{SITE.rating.value}</span>
              <span className="text-sm text-muted-foreground">
                from {SITE.rating.count} Google reviews
              </span>
            </div>

            {/* CTAs */}
            <div className="mt-7 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
              <Button asChild size="lg">
                <Link href="/contact">Book Your Car In</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href={`tel:${SITE.phoneHref}`}>{SITE.phoneDisplay}</a>
              </Button>
            </div>
          </motion.div>

          {/* Right — real workshop photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="p-6 md:p-8"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-secondary">
              <Image
                src={PHOTOS.workshop}
                alt={PHOTO_ALT.workshop}
                fill
                priority
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
