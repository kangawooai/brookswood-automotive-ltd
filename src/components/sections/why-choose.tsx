'use client'

import Image from 'next/image'
import {
  BadgeCheck,
  HandCoins,
  RefreshCw,
  Car,
  Clock,
  Wrench,
  type LucideIcon,
} from 'lucide-react'
import { motion } from 'motion/react'
import { PHOTOS, PHOTO_ALT } from '@/lib/photos'
import { SITE } from '@/lib/site'

type Benefit = { icon: LucideIcon; title: string; text: string }

const BENEFITS: Benefit[] = [
  {
    icon: BadgeCheck,
    title: 'DVSA-approved testers',
    text: 'Class 4 MOTs by qualified, government-approved testers.',
  },
  {
    icon: HandCoins,
    title: 'Honest, upfront pricing',
    text: 'Clear quotes before any work — you only pay for what you approve.',
  },
  {
    icon: RefreshCw,
    title: 'Free retests',
    text: 'Qualifying repairs get a free MOT retest within the retest period.',
  },
  {
    icon: Car,
    title: 'All makes & models',
    text: 'From family hatchbacks to prestige cars, we service them all.',
  },
  {
    icon: Clock,
    title: 'Quick turnaround',
    text: 'Most MOTs and services completed same day.',
  },
  {
    icon: Wrench,
    title: `${SITE.yearsExperience} years experience`,
    text: "Two decades keeping Fareham's cars safe and reliable.",
  },
]

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

export function WhyChoose() {
  return (
    <section className="relative overflow-hidden bg-secondary py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border shadow-sm">
              <Image
                src={PHOTOS.reception}
                alt={PHOTO_ALT.reception}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
            {/* Floating experience badge */}
            <div className="absolute -bottom-5 -right-2 flex items-center gap-3 rounded-2xl border border-border bg-card px-5 py-4 shadow-lg sm:right-6">
              <span className="text-4xl font-black leading-none text-primary">
                {SITE.yearsExperience}
              </span>
              <span className="text-sm font-semibold leading-tight text-foreground">
                Years serving
                <br />
                Fareham drivers
              </span>
            </div>
          </motion.div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="max-w-xl"
            >
              <span className="inline-flex items-center rounded-full border border-border bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
                Why Brookswood
              </span>
              <h2 className="mt-4 text-3xl font-black uppercase tracking-tight text-foreground md:text-4xl">
                The Garage Fareham Drivers Trust
              </h2>
            </motion.div>

            <motion.ul
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="mt-10 grid gap-x-8 gap-y-7 sm:grid-cols-2"
            >
              {BENEFITS.map((benefit) => (
                <motion.li key={benefit.title} variants={fadeUp} className="flex items-start gap-4">
                  <span
                    aria-hidden
                    className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary"
                  >
                    <benefit.icon className="size-5" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-base font-bold text-foreground">{benefit.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {benefit.text}
                    </p>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      </div>
    </section>
  )
}
