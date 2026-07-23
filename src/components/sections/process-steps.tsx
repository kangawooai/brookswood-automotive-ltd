'use client'

import { CalendarCheck, Car, Search, CircleCheck, type LucideIcon } from 'lucide-react'
import { motion } from 'motion/react'
import { SITE } from '@/lib/site'
import { SectionHeading } from '@/components/blocks'

type Step = {
  icon: LucideIcon
  title: string
  description: string
}

const STEPS: Step[] = [
  {
    icon: CalendarCheck,
    title: 'Book online or call',
    description: `Pick a time that suits you online or on ${SITE.phoneDisplay}.`,
  },
  {
    icon: Car,
    title: 'Drop your car off',
    description: 'Bring it to 4-6 Hackett Way, Fareham — free, easy parking.',
  },
  {
    icon: Search,
    title: 'We inspect & quote',
    description: 'We assess the work and give you a clear, upfront quote before starting.',
  },
  {
    icon: CircleCheck,
    title: 'Approve & collect',
    description: "You approve the work, we carry it out, and your car's ready to collect.",
  },
]

export function ProcessSteps() {
  return (
    <section className="bg-secondary py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          eyebrow="How It Works"
          title="Booking Your Car In Is Simple"
          center
        />

        <div className="relative mt-14">
          {/* Connecting line — horizontal on desktop, vertical on mobile */}
          <div
            className="absolute left-[27px] top-6 bottom-6 w-px bg-border md:left-6 md:right-6 md:top-[27px] md:bottom-auto md:h-px md:w-auto"
            aria-hidden="true"
          />

          <ol className="relative grid gap-8 md:grid-cols-4 md:gap-6">
            {STEPS.map((step, index) => {
              const Icon = step.icon
              return (
                <motion.li
                  key={step.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.5, delay: index * 0.12, ease: 'easeOut' }}
                  className="relative flex items-start gap-4 md:flex-col md:items-center md:text-center"
                >
                  {/* Numbered marker */}
                  <div className="relative z-10 shrink-0">
                    <div className="flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm ring-8 ring-secondary">
                      <Icon className="size-6" aria-hidden="true" />
                    </div>
                    <span className="absolute -right-1 -top-1 flex size-6 items-center justify-center rounded-full bg-card text-xs font-bold tabular-nums text-primary ring-1 ring-border">
                      {index + 1}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="min-w-0 flex-1 pt-1 md:pt-0">
                    <h3 className="text-lg font-bold text-foreground">{step.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </motion.li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
