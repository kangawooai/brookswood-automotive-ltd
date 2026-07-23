'use client'

import { Clock, MapPin, Phone } from 'lucide-react'
import { motion } from 'motion/react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { SITE } from '@/lib/site'

export function CtaSection() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:py-16">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="overflow-hidden rounded-2xl bg-primary px-6 py-14 text-center text-primary-foreground sm:px-12 sm:py-20"
      >
        {/* Announcement pill */}
        <span className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/5 px-3 py-1 text-xs font-medium text-primary-foreground">
          <span className="size-1.5 rounded-full bg-primary-foreground" />
          Free retests &middot; Fareham MOT Centre
        </span>

        {/* Headline */}
        <h2 className="mx-auto mt-5 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
          Book Your MOT or Service Today
        </h2>

        {/* Subtext */}
        <p className="mx-auto mt-4 max-w-2xl text-base text-primary-foreground/70 sm:text-lg">
          Honest advice, fair prices and free retests &mdash; right here in Fareham. Get your car
          booked in with the team you can trust.
        </p>

        {/* Detail row: address + hours */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-primary-foreground/70">
          <span className="inline-flex items-center gap-2">
            <MapPin className="size-4" aria-hidden="true" />
            {SITE.address.full}
          </span>
          <span className="inline-flex items-center gap-2">
            <Clock className="size-4" aria-hidden="true" />
            Mon&ndash;Fri 08:30&ndash;17:30 &middot; Sat 09:00&ndash;13:00
          </span>
        </div>

        {/* CTAs */}
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="w-full bg-background text-foreground hover:bg-background/90 sm:w-auto"
          >
            <Link href="/contact">Book Your Car In</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="w-full border-current bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground sm:w-auto"
          >
            <a href={`tel:${SITE.phoneHref}`}>
              <Phone className="size-4" aria-hidden="true" />
              Call {SITE.phoneDisplay}
            </a>
          </Button>
        </div>
      </motion.div>
    </section>
  )
}
