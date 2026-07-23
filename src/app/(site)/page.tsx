import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { Phone, ShieldCheck, Wallet, MessageSquare, Award } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SITE } from '@/lib/site'
import { PHOTOS, PHOTO_ALT } from '@/lib/photos'
import { HOME_FAQS } from '@/lib/faqs'
import {
  TrustBar,
  SectionHeading,
  CtaBand,
  RatingBadge,
  CheckList,
} from '@/components/blocks'
import { ServicesGrid } from '@/components/sections/services-grid'
import { CallbackSection } from '@/components/sections/callback-section'
import { FaqList } from '@/components/faq'
import { Reviews } from '@/components/reviews'
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

const WHY_US = [
  {
    icon: Award,
    title: '20+ years of experience',
    text: 'Two decades keeping Fareham drivers safely on the road with skilled, dependable workmanship.',
  },
  {
    icon: MessageSquare,
    title: 'Honest, plain-English advice',
    text: 'We explain exactly what your car needs and why, so you can make an informed decision.',
  },
  {
    icon: Wallet,
    title: 'Transparent pricing',
    text: 'Clear quotes before any work begins. No hidden extras and no unnecessary jobs.',
  },
  {
    icon: ShieldCheck,
    title: '5-star rated service',
    text: `Rated ${SITE.rating.value}/5 by ${SITE.rating.count} Google reviewers for quality and trust.`,
  },
]

const PROCESS = [
  { step: 'Get in touch', detail: 'Call us or request a callback with your registration and what you need.' },
  { step: 'Book your slot', detail: 'We agree a convenient time to bring your car in to our Fareham workshop.' },
  { step: 'We inspect & quote', detail: 'Our technicians assess the work and give you a clear, honest price up front.' },
  { step: 'Back on the road', detail: 'We carry out the approved work and hand your car back running its best.' },
]

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

      {/* Hero — next/image LCP */}
      <section className="relative isolate overflow-hidden">
        <Image
          src={PHOTOS.workshop}
          alt={PHOTO_ALT.workshop}
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/45" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 md:py-32 lg:px-8">
          <div className="max-w-2xl">
            <span className="inline-block bg-primary px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary-foreground">
              Fareham MOT Centre · Est. 20+ years
            </span>
            <h1 className="mt-5 text-4xl font-black uppercase leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              MOT, Servicing &amp; Repairs You Can Trust
            </h1>
            <p className="mt-6 max-w-xl text-lg text-white/85 md:text-xl">
              Your local Fareham garage for honest, quality car care. MOTs, servicing, brakes, tyres and more —
              done properly, priced fairly.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="font-bold uppercase tracking-wide">
                <Link href="/contact">Book Your Car In</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/40 bg-transparent font-bold uppercase tracking-wide text-white hover:bg-white/10 hover:text-white"
              >
                <a href={`tel:${SITE.phoneHref}`}>
                  <Phone /> {SITE.phoneDisplay}
                </a>
              </Button>
            </div>
            <div className="mt-8">
              <RatingBadge light />
            </div>
          </div>
        </div>
      </section>

      <TrustBar
        items={[
          { value: '20+', label: 'Years Experience' },
          { value: '5.0★', label: 'Google Rating' },
          { value: `${SITE.rating.count}`, label: 'Happy Reviews' },
          { value: '12', label: 'Services Offered' },
        ]}
      />

      {/* Services — shadcn-space features shadow-lift card grid */}
      <ServicesGrid />

      {/* Why choose us — split */}
      <section className="bg-muted py-20 md:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="relative aspect-[4/3] overflow-hidden border-4 border-primary">
            <Image
              src={PHOTOS.bmwBay}
              alt={PHOTO_ALT.bmwBay}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div>
            <SectionHeading
              eyebrow="Why Brookswood"
              title="A Garage Fareham Drivers Actually Trust"
              intro="We built our reputation on doing things properly — quality workmanship, fair prices and treating every customer the way we would want to be treated."
            />
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {WHY_US.map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.title} className="border-l-4 border-primary pl-4">
                    <Icon className="size-6 text-primary" />
                    <h3 className="mt-3 text-base font-bold uppercase tracking-tight text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">{item.text}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-secondary py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="How It Works"
            title="Simple, Straightforward, No Surprises"
            intro="Getting your car looked after with us couldn't be easier."
            light
          />
          <div className="mt-12 grid gap-8 md:grid-cols-4">
            {PROCESS.map((item, i) => (
              <div key={item.step} className="relative">
                <span className="text-5xl font-black text-primary">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-3 text-lg font-bold uppercase tracking-tight text-white">{item.step}</h3>
                <p className="mt-2 text-sm text-white/70">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Google reviews */}
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

      {/* Gallery — real work from the Fareham workshop */}
      <section className="bg-secondary py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our Work"
            title="Cars We're Trusted to Look After"
            intro="From everyday runarounds and vans to prestige and performance cars, Fareham drivers rely on us to keep them running their best."
            light
          />
          <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden border border-border bg-border lg:grid-cols-3">
            {[
              { src: PHOTOS.lotus, alt: PHOTO_ALT.lotus },
              { src: PHOTOS.bmwI8, alt: PHOTO_ALT.bmwI8 },
              { src: PHOTOS.fordOnLift, alt: PHOTO_ALT.fordOnLift },
              { src: PHOTOS.luxuryLineup, alt: PHOTO_ALT.luxuryLineup },
              { src: PHOTOS.bmwService, alt: PHOTO_ALT.bmwService },
              { src: PHOTOS.vwVan, alt: PHOTO_ALT.vwVan },
            ].map((photo) => (
              <div key={photo.src} className="relative aspect-[4/3] overflow-hidden bg-card">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-muted py-20 md:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="FAQs" title="Your Questions, Answered" center />
          <div className="mt-10">
            <FaqList faqs={HOME_FAQS} />
          </div>
        </div>
      </section>

      {/* Callback form */}
      <CallbackSection />

      <CtaBand />
    </>
  )
}
