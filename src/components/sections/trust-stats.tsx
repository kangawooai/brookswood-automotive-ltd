'use client'

// Adapted from shadcn.io PRO block "stats-kpi-icon-tile-grid" (Archetype A — KPI Tile Grid):
// muted-square lucide icon badges + tabular-nums metric values. Deltas/placeholder numbers
// dropped; wired to real trust stats from SITE.
import { Star, Users, Wrench, BadgeCheck, type LucideIcon } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { SITE } from '@/lib/site'

interface TrustStat {
  id: string
  value: string
  label: string
  icon: LucideIcon
  starFill?: boolean
}

const stats: TrustStat[] = [
  {
    id: 'rating',
    value: `${SITE.rating.value}★`,
    label: 'Google rating',
    icon: Star,
    starFill: true,
  },
  {
    id: 'reviews',
    value: `${SITE.rating.count}+`,
    label: '5-star reviews',
    icon: Users,
  },
  {
    id: 'experience',
    value: SITE.yearsExperience,
    label: 'Years experience',
    icon: Wrench,
  },
  {
    id: 'dvsa',
    value: 'DVSA',
    label: 'Approved MOT testers',
    icon: BadgeCheck,
  },
]

export function TrustStats() {
  const reduceMotion = useReducedMotion()

  return (
    <section className="bg-background">
      <div className="mx-auto w-full max-w-5xl px-4 py-16 sm:py-20">
        <motion.p
          className="mb-8 text-center text-sm font-medium uppercase tracking-widest text-muted-foreground"
          initial={reduceMotion ? undefined : { opacity: 0, y: 8 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          Trusted by Fareham drivers
        </motion.p>

        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon

            return (
              <motion.div
                key={stat.id}
                className="rounded-lg border border-border bg-card px-4 py-5"
                initial={reduceMotion ? undefined : { opacity: 0, y: 6 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{
                  duration: 0.35,
                  ease: 'easeOut',
                  delay: 0.1 + index * 0.05,
                }}
              >
                <span
                  aria-hidden="true"
                  className="flex size-9 items-center justify-center rounded-md bg-secondary"
                >
                  <Icon
                    className="size-4 text-primary"
                    fill={stat.starFill ? '#f0a500' : 'none'}
                    stroke={stat.starFill ? '#f0a500' : 'currentColor'}
                  />
                </span>

                <div className="mt-4">
                  <dd className="text-3xl font-semibold tabular-nums text-foreground">
                    {stat.value}
                  </dd>
                  <dt className="mt-1 text-sm font-medium text-muted-foreground">
                    {stat.label}
                  </dt>
                </div>
              </motion.div>
            )
          })}
        </dl>
      </div>
    </section>
  )
}
