import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import { PHOTOS, PHOTO_ALT } from '@/lib/photos'
import { HOME_FAQS } from '@/lib/faqs'
import { SectionHeading, CheckList } from '@/components/blocks'
import { FaqList } from '@/components/faq'
import { Reviews } from '@/components/reviews'
import { SiteHero } from '@/components/sections/site-hero'
import { TrustStats } from '@/components/sections/trust-stats'
import { ServicesGrid } from '@/components/sections/services-grid'
import { WhyChoose } from '@/components/sections/why-choose'
import { ProcessSteps } from '@/components/sections/process-steps'
import { GallerySection } from '@/components/sections/gallery'
import { CtaSection } from '@/components/sections/cta'
import { JsonLd } from '@/components/json-ld'
import { graph, webPageSchema, breadcrumbSchema, faqSchema } from '@/lib/schema'

export const metadata: Metadata = {
  description:
    'Brookswood Automotive is a trusted Fareham garage offering MOT tests, car servicing and repairs. 20+ years of experience, honest pricing and a 5-star rating. Call 01329 756796.',
  alternates: { canonical: '/', languages: { 'en-GB': '/' } },
  openGraph: {
    title: 'Brookswood Automotive | MOT, Servicing & Repairs in Fareham',
    description: 'Trusted Fareham garage for MOT tests, car servicing and repairs.',
    url: '/',
    images: [{ url: PHOTOS.workshop, width: 1536, height: 1024, alt: 'Brookswood Automotive workshop in Fareham' }],
  },
}

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({
            path: '/',
            name: 'Brookswood Automotive | MOT, Servicing & Repairs in Fareham',
            description:
              'Trusted Fareham garage for MOT tests, car servicing and repairs. Over 20 years of experience and a 5-star rating.',
          }),
          breadcrumbSchema([{ name: 'Home', path: '/' }]),
          faqSchema(HOME_FAQS.map((f) => ({ q: f.q, a: f.a }))),
        )}
      />

      {/* Hero — shadcn-space hero-split-image, real workshop photo + rating */}
      <SiteHero />

      {/* Trust stats — shadcn-space stats KPI tile grid */}
      <TrustStats />

      {/* Services — shadcn-space features shadow-lift card grid */}
      <ServicesGrid />

      {/* Why choose us — shadcn-space features split + checklist */}
      <WhyChoose />

      {/* Process — shadcn-space timeline numbered steps */}
      <ProcessSteps />

      {/* Google reviews — shadcn-space reviews block */}
      <Reviews />

      {/* About teaser */}
      <section className="bg-background py-20 md:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <SectionHeading
              eyebrow="About Us"
              title="Over 20 Years Keeping Fareham Moving"
              intro="Brookswood Automotive, trading as Fareham MOT Centre, is a family-minded local garage built on honesty, skill and genuine care for our customers' vehicles."
            />
            <p className="mt-4 text-muted-foreground">
              Whether it's a routine MOT, a full service or a repair that needs sorting fast, our experienced
              technicians treat every car with the same attention to detail — and always tell you the truth about
              what it needs.
            </p>
            <div className="mt-8">
              <CheckList
                items={[
                  'Experienced, skilled technicians',
                  'Quality parts and modern equipment',
                  'Transparent, competitive pricing',
                  'Friendly, no-pressure service',
                ]}
              />
            </div>
            <Button asChild size="lg" className="mt-8 font-bold uppercase tracking-wide">
              <Link href="/about-us">More About Us</Link>
            </Button>
          </div>
          <div className="relative order-first aspect-[4/3] overflow-hidden border-4 border-primary lg:order-last">
            <Image
              src={PHOTOS.exterior}
              alt={PHOTO_ALT.exterior}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Gallery — shadcn-space gallery masonry hover, real GMB photos */}
      <GallerySection />

      {/* FAQ — shadcn-space faq-numbered (via FaqList) */}
      <section className="bg-muted py-20 md:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="FAQs" title="Your Questions, Answered" center />
          <div className="mt-10">
            <FaqList faqs={HOME_FAQS} />
          </div>
        </div>
      </section>

      {/* CTA — shadcn-space cta band */}
      <CtaSection />
    </>
  )
}
