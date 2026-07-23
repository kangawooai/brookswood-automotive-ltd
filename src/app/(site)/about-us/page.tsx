import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { Award, HeartHandshake, ShieldCheck, Wallet } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SITE } from '@/lib/site'
import { PHOTOS, PHOTO_ALT } from '@/lib/photos'
import { Reviews } from '@/components/reviews'
import { FaqSection } from '@/components/sections/faq-section'
import { CallbackSection } from '@/components/sections/callback-section'
import {
  PageHero,
  HeroButtons,
  SectionHeading,
  TrustBar,
  CtaBand,
  RatingBadge,
} from '@/components/blocks'
import { JsonLd } from '@/components/json-ld'
import { graph, webPageSchema, breadcrumbSchema } from '@/lib/schema'

const PATH = '/about-us'
const DESCRIPTION =
  'Brookswood Automotive, trading as Fareham MOT Centre, is a trusted local garage with over 20 years of experience in MOTs, servicing and repairs. Honest advice, fair pricing. Call 01329 756796.'

export const metadata: Metadata = {
  title: 'About Us | Trusted Fareham Garage',
  description: DESCRIPTION,
  alternates: { canonical: PATH, languages: { 'en-GB': PATH } },
  openGraph: {
    title: 'About Brookswood Automotive | Fareham MOT Centre',
    description: DESCRIPTION,
    url: PATH,
    images: [
      {
        url: PHOTOS.exterior,
        width: 1536,
        height: 1024,
        alt: 'Exterior of the Brookswood Automotive garage in Fareham',
      },
    ],
  },
}

const VALUES = [
  {
    icon: HeartHandshake,
    title: 'Honesty first',
    text: 'We tell you the truth about your car — what needs doing now, what can wait, and what does not need doing at all.',
  },
  {
    icon: Award,
    title: 'Quality workmanship',
    text: 'Over two decades of hands-on experience means the job is done properly, using quality parts and the right equipment.',
  },
  {
    icon: Wallet,
    title: 'Fair, clear pricing',
    text: 'You get a transparent quote before any work begins. No hidden extras and no unnecessary jobs.',
  },
  {
    icon: ShieldCheck,
    title: 'Genuine care',
    text: 'We treat every car — and every customer — the way we would want to be treated. That is why drivers keep coming back.',
  },
]

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({
            path: PATH,
            name: 'About Us | Trusted Fareham Garage',
            description: DESCRIPTION,
            type: 'AboutPage',
          }),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'About Us', path: PATH },
          ]),
        )}
      />

      <PageHero
        image={PHOTOS.exterior}
        imageAlt={PHOTO_ALT.exterior}
        eyebrow="About Brookswood"
        title="Over 20 Years Keeping Fareham Moving"
        subtitle="Trading as Fareham MOT Centre, we are a local garage built on honesty, skill and genuine care for our customers' vehicles."
      >
        <HeroButtons />
      </PageHero>

      <TrustBar
        items={[
          { value: `${SITE.yearsExperience}`, label: 'Years Experience' },
          { value: '5.0★', label: 'Google Rating' },
          { value: `${SITE.rating.count}`, label: 'Happy Reviews' },
          { value: '11', label: 'Services Offered' },
        ]}
      />

      {/* Story */}
      <section className="bg-background py-20 md:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <SectionHeading eyebrow="Our Story" title="A Garage Fareham Drivers Trust" />
            <div className="mt-6 space-y-4 text-lg text-muted-foreground">
              <p>
                Brookswood Automotive, trading as Fareham MOT Centre, has spent more than{' '}
                {SITE.yearsExperience} years looking after cars for drivers across Fareham and the wider
                Hampshire area. From our workshop on Hackett Way, we handle everything from routine MOTs and
                servicing to brakes, clutches, diagnostics and bodywork.
              </p>
              <p>
                We built our reputation the hard way — one honest job at a time. Our customers stay with us
                because we explain things clearly, quote fairly and never carry out work they have not agreed
                to. That straightforward approach is reflected in our {SITE.rating.value}-star Google rating.
              </p>
              <p>
                Whether it is a quick MOT, a full service or a repair that needs sorting fast, you will get the
                same attention to detail and the same honest advice every time.
              </p>
            </div>
            <div className="mt-8">
              <RatingBadge />
            </div>
          </div>
          <div className="relative order-first aspect-[4/3] overflow-hidden border-4 border-primary lg:order-last">
            <Image
              src={PHOTOS.workshop}
              alt={PHOTO_ALT.workshop}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-muted py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="What We Stand For"
            title="The Values Behind Every Job"
            intro="These are the principles that guide how we look after your car and treat you as a customer."
          />
          <div className="mt-12 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.title} className="flex flex-col bg-card p-7">
                  <span className="flex size-12 items-center justify-center bg-primary text-primary-foreground">
                    <Icon className="size-6" />
                  </span>
                  <h3 className="mt-5 text-lg font-bold uppercase tracking-tight text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">{item.text}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Location teaser */}
      <section className="bg-background py-20 md:py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Find Us"
            title="Right Here in Fareham"
            intro={`You will find us at ${SITE.address.full}. Pop in, call us, or book online — whatever suits you best.`}
            center
          />
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="font-bold uppercase tracking-wide">
              <Link href="/contact">Get in Touch</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary font-bold uppercase tracking-wide text-primary hover:bg-primary hover:text-primary-foreground"
            >
              <Link href="/our-services">View Our Services</Link>
            </Button>
          </div>
        </div>
      </section>

      <Reviews />

      <FaqSection />

      <CallbackSection />

      <CtaBand />
    </>
  )
}
