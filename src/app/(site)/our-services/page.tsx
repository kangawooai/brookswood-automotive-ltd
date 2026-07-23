import type { Metadata } from 'next'
import { SITE } from '@/lib/site'
import { PHOTOS, PHOTO_ALT } from '@/lib/photos'
import { PageHero, HeroButtons, SectionHeading, CtaBand, CheckList } from '@/components/blocks'
import { ServicesGrid } from '@/components/sections/services-grid'
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
        url: PHOTOS.bmwService,
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
        image={PHOTOS.bmwService}
        imageAlt={PHOTO_ALT.bmwService}
        eyebrow="Fareham Garage"
        title="Complete Car Care Under One Roof"
        subtitle="From MOTs and servicing to brakes, tyres, diagnostics and bodywork — our Fareham workshop handles it all with honest advice and quality workmanship."
      >
        <HeroButtons />
      </PageHero>

      {/* Services — shadcn-space features shadow-lift card grid */}
      <ServicesGrid
        eyebrow="What We Do"
        title="Our Garage Services"
        intro={`With over ${SITE.yearsExperience} years of experience, we look after every part of your car — safely, reliably and at a fair price.`}
      />

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
