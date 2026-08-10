'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { motion } from 'motion/react'
import { SERVICES } from '@/lib/site'
import { Eyebrow } from '@/components/blocks'

export function ServicesGrid({
  slugs,
  eyebrow = 'Our Services',
  title = 'Everything Your Car Needs, Under One Roof',
  intro = 'From MOTs and servicing to brakes, tyres and diagnostics, our Fareham team handles it all, with honest advice and no surprises.',
}: {
  // Optional subset, pass service slugs (not Service objects) so the icon
  // components are resolved inside this client component, never serialised
  // across the server→client boundary.
  slugs?: string[]
  eyebrow?: string
  title?: string
  intro?: string
} = {}) {
  const services = slugs ? SERVICES.filter((s) => slugs.includes(s.slug)) : SERVICES
  return (
    <section className="relative overflow-hidden bg-background py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="max-w-2xl"
        >
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mt-4 text-3xl font-black uppercase tracking-tight text-foreground md:text-4xl">
            {title}
          </h2>
          {intro ? <p className="mt-4 text-lg text-muted-foreground">{intro}</p> : null}
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {services.map((service, index) => (
            <motion.div
              key={service.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: (index % 4) * 0.08, ease: 'easeOut' }}
            >
              <Link
                href={`/services/${service.slug}`}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <div className="flex size-12 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-colors duration-300">
                  <service.icon className="size-6" />
                </div>
                <h3 className="mt-5 text-lg font-bold text-foreground">{service.nav}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {service.short}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold uppercase tracking-wide text-primary">
                  Learn more
                  <ArrowRight
                    aria-hidden
                    className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                  />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
