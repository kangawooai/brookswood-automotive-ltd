import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowRight } from 'lucide-react'
import { SITE, SERVICES } from '@/lib/site'
import { PageHero, HeroButtons, SectionHeading, CtaBand, CheckList } from '@/components/blocks'
import { JsonLd } from '@/components/json-ld'
import { graph, webPageSchema, breadcrumbSchema } from '@/lib/schema'

const PATH = '/our-services'
const DESCRIPTION =
  'Explore the full range of garage services at Brookswood Automotive in Fareham — MOT testing, servicing, brakes, tyres, diagnostics, bodywork and more. Call 01329 756796.'

export const metadata: Metadata = {
  title: 'Our Services | Garage Services in Fareham',
  description: DESCRIPTION,
  alternates: { canonical: PATH, languages: { 'en-GB': PATH } },
  openGraph: {
    title: 'Our Services | Brookswood Automotive Fareham',
    description: DESCRIPTION,
    url: PATH,
    images: [
      {
        url: '/images/generated/services-hero.webp',
        width: 1536,
        height: 1024,
        alt: 'Technician working on a car in the Brookswood Automotive workshop in Fareham',
      },
    ],
  },
}

export default function OurServicesPage() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({
            path: PATH,
            name: 'Our Services | Garage Services in Fareham',
            description: DESCRIPTION,
          }),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Our Services', path: PATH },
          ]),
        )}
      />

      <PageHero
        image="/images/generated/services-hero.webp"
        imageAlt="Technician working on a car in the Brookswood Automotive workshop in Fareham"
        eyebrow="Fareham Garage"
        title="Complete Car Care Under One Roof"
        subtitle="From MOTs and servicing to brakes, tyres, diagnostics and bodywork — our Fareham workshop handles it all with honest advice and quality workmanship."
      >
        <HeroButtons />
      </PageHero>

      <section className="bg-background py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="What We Do"
            title="Our Garage Services"
            intro={`With over ${SITE.yearsExperience} years of experience, we look after every part of your car — safely, reliably and at a fair price.`}
          />
          <div className="mt-12 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service) => {
              const Icon = service.icon
              return (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="group flex flex-col bg-card p-7 transition-colors hover:bg-muted"
                >
                  <span className="flex size-12 items-center justify-center bg-primary text-primary-foreground">
                    <Icon className="size-6" />
                  </span>
                  <h2 className="mt-5 text-lg font-bold uppercase tracking-tight text-foreground">
                    {service.nav}
                  </h2>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground">{service.short}</p>
                  <span className="mt-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-primary">
                    Learn more<span className="sr-only"> about {service.nav}</span>
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-muted py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Why Brookswood"
            title="One Trusted Garage for Everything"
            intro="Bringing your car to a single garage you trust keeps its history consistent and takes the hassle out of car care."
          />
          <div className="mt-10 max-w-3xl">
            <CheckList
              items={[
                'DVSA-approved MOT testing',
                'Interim and full servicing',
                'Quality parts and modern equipment',
                'Honest, plain-English advice',
                'Transparent quotes before any work',
                'Serving Fareham and Hampshire',
              ]}
            />
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
