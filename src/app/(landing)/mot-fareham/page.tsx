import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { Phone, Check, Award, ShieldCheck, Wallet, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SITE, getService } from '@/lib/site'
import { PHOTOS, PHOTO_ALT } from '@/lib/photos'
import { MOT_FAQS } from '@/lib/faqs'
import { RatingBadge, SectionHeading } from '@/components/blocks'
import { ContactForm } from '@/components/contact-form'
import { FaqList } from '@/components/faq'
import { Reviews } from '@/components/reviews'
import { getPlaceData } from '@/lib/google-reviews'
import { LandingHeader } from '@/components/landing-header'
import { JsonLd } from '@/components/json-ld'
import { graph, webPageSchema, breadcrumbSchema, serviceSchema, faqSchema } from '@/lib/schema'

const PATH = '/mot-fareham'
const DESCRIPTION =
  'Book your MOT in Fareham at Brookswood Automotive. DVSA-approved Class 4 testing, honest advice and free retests on qualifying repairs. Call 01329 640528 for a slot.'

export const metadata: Metadata = {
  title: 'MOT Fareham | DVSA-Approved MOT Testing',
  description: DESCRIPTION,
  alternates: { canonical: PATH, languages: { 'en-GB': PATH } },
  // Paid landing page (stripped nav) — keep it out of the organic index so it
  // doesn't compete with /services/mot-testing. Still allow link following.
  robots: { index: false, follow: true },
  openGraph: {
    title: 'MOT Fareham | Brookswood Automotive',
    description: DESCRIPTION,
    url: PATH,
    images: [
      {
        url: PHOTOS.fordOnLift,
        width: 1536,
        height: 1024,
        alt: 'Car undergoing an MOT test on a ramp at a Fareham garage',
      },
    ],
  },
}

const WHY_US = [
  { icon: Award, title: 'DVSA-approved testers', text: 'Class 4 MOTs carried out by fully approved testers to the latest standards.' },
  { icon: Wallet, title: 'Honest, fair pricing', text: 'Competitive MOT rates with no pressure and no unnecessary work.' },
  { icon: ShieldCheck, title: 'Free retest', text: 'Qualifying repairs carried out with us come with a free retest.' },
  { icon: Clock, title: 'Quick turnaround', text: 'A standard MOT takes around 45–60 minutes — waiting slots available.' },
]

const PROCESS = [
  { step: 'Book your slot', detail: 'Call us or request a callback with your registration and preferred date.' },
  { step: 'Full inspection', detail: 'Our approved tester works through the DVSA checklist thoroughly.' },
  { step: 'Honest results', detail: 'We explain the outcome in plain English and quote for any repairs first.' },
  { step: 'Back on the road', detail: 'Pass and you are done; any approved repairs come with a free retest.' },
]

export default async function MotFarehamLanding() {
  const mot = getService('mot-testing')!
  const { rating } = await getPlaceData()

  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({ path: PATH, name: 'MOT Fareham | DVSA-Approved MOT Testing', description: DESCRIPTION }),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'MOT Fareham', path: PATH },
          ]),
          serviceSchema({
            name: 'MOT Testing in Fareham',
            description: DESCRIPTION,
            path: PATH,
            serviceType: 'MOT Testing',
            areaServed: 'Fareham, Hampshire',
          }),
          faqSchema(MOT_FAQS.map((f) => ({ q: f.q, a: f.a }))),
        )}
      />

      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:uppercase focus:tracking-wide focus:text-primary-foreground"
      >
        Skip to main content
      </a>

      <LandingHeader />

      <main id="main-content" className="flex-1">
        {/* Hero + quote form */}
        <section id="top" className="relative isolate overflow-hidden">
          <Image
            src={PHOTOS.fordOnLift}
            alt={PHOTO_ALT.fordOnLift}
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/55" />
          <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-2 lg:px-8">
            <div className="max-w-xl">
              <span className="inline-block bg-white/15 px-3 py-1 text-xs font-bold uppercase tracking-widest text-white">
                Brookswood Automotive
              </span>
              <h1 className="mt-5 text-4xl font-black uppercase leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl">
                Your MOT in Fareham, Done Properly
              </h1>
              <p className="mt-6 text-lg text-white/85 md:text-xl">
                DVSA-approved Class 4 MOT testing with honest advice, fair pricing and a free retest on
                qualifying repairs. Book your slot today.
              </p>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {['DVSA-approved testers', 'Free retest included', 'Advice you can actually trust', 'Repairs sorted under one roof'].map(
                  (item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center bg-primary text-primary-foreground">
                        <Check className="size-3.5" strokeWidth={3} />
                      </span>
                      <span className="text-white/85">{item}</span>
                    </li>
                  ),
                )}
              </ul>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="font-bold uppercase tracking-wide">
                  <a href={`tel:${SITE.phoneHref}`}>
                    <Phone /> {SITE.phoneDisplay}
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white/40 bg-transparent font-bold uppercase tracking-wide text-white hover:bg-white/10 hover:text-white"
                >
                  <a href="#quote">Get a Free Quote</a>
                </Button>
              </div>
              <div className="mt-8">
                <RatingBadge light value={rating.value} count={rating.count} />
              </div>
            </div>

            {/* Quote form */}
            <div id="quote" className="border border-border bg-card p-6 shadow-xl sm:p-8">
              <h2 className="text-2xl font-black uppercase tracking-tight text-foreground">Book Your MOT</h2>
              <p className="mt-2 text-muted-foreground">
                Send us your details and we will call you back to arrange a convenient slot.
              </p>
              <div className="mt-6">
                <ContactForm defaultService="MOT Testing" />
              </div>
            </div>
          </div>
        </section>

        {/* Trust bar */}
        <section className="border-y-4 border-primary bg-secondary">
          <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-white/10 md:grid-cols-4">
            {[
              { value: `${SITE.yearsExperience}`, label: 'Years Experience' },
              { value: `${rating.value}★`, label: 'Google Rating' },
              ...(rating.count != null
                ? [{ value: `${rating.count}`, label: 'Happy Reviews' }]
                : []),
              { value: 'Free', label: 'Retest Included' },
            ].map((item) => (
              <div key={item.label} className="px-4 py-8 text-center">
                <p className="text-4xl font-black text-primary md:text-5xl">{item.value}</p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-white/70 md:text-sm">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* What's included */}
        <section id="services" className="bg-background py-20 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="What We Check"
              title="What's Covered in Your MOT"
              intro="Our approved testers work through every legal safety and emissions requirement, then explain any advisories clearly."
            />
            <div className="mt-12 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
              {mot.included.map((item) => (
                <div key={item} className="flex items-start gap-3 bg-card p-6">
                  <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center bg-primary text-primary-foreground">
                    <Check className="size-4" strokeWidth={3} />
                  </span>
                  <span className="font-medium text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why us */}
        <section id="why" className="bg-muted py-20 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Why Brookswood"
              title="A Fareham MOT You Can Trust"
              intro="Over 20 years of experience, a 5-star reputation and a straight-talking approach to your car."
            />
            <div className="mt-12 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
              {WHY_US.map((item) => {
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

        {/* Process */}
        <section className="bg-secondary py-20 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading eyebrow="How It Works" title="Booking Your MOT Is Simple" light />
            <div className="mt-12 grid gap-8 md:grid-cols-4">
              {PROCESS.map((item, i) => (
                <div key={item.step}>
                  <span className="text-5xl font-black text-primary">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="mt-3 text-lg font-bold uppercase tracking-tight text-white">{item.step}</h3>
                  <p className="mt-2 text-sm text-white/70">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Reviews */}
        <div id="reviews" className="scroll-mt-16">
          <Reviews />
        </div>

        {/* FAQ */}
        <section id="faq" className="bg-muted py-20 md:py-24">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <SectionHeading eyebrow="MOT FAQs" title="Your MOT Questions, Answered" center />
            <div className="mt-10">
              <FaqList faqs={MOT_FAQS} />
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section id="contact" className="bg-primary">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
            <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
              <div className="max-w-2xl">
                <h2 className="text-3xl font-black uppercase tracking-tight text-primary-foreground md:text-4xl">
                  Ready to book your MOT?
                </h2>
                <p className="mt-4 text-lg text-primary-foreground/85">
                  Call our Fareham team now or request a callback and we will get you a convenient slot with
                  honest advice and no surprises.
                </p>
              </div>
              <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
                <Button
                  asChild
                  size="lg"
                  className="bg-white font-bold uppercase tracking-wide text-primary hover:bg-white/90"
                >
                  <a href={`tel:${SITE.phoneHref}`}>
                    <Phone /> {SITE.phoneDisplay}
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white/60 bg-transparent font-bold uppercase tracking-wide text-white hover:bg-white/10 hover:text-white"
                >
                  <a href="#quote">Request a Callback</a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Minimal footer */}
      <footer className="border-t-4 border-primary bg-secondary text-secondary-foreground">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p className="text-sm text-white/70">
            © {new Date().getFullYear()} {SITE.name}. Company Reg No. {SITE.companyReg}.
          </p>
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <Link href="/privacy-policy" className="text-white/70 hover:text-primary">
              Privacy Policy
            </Link>
            <Link href="/cookie-policy" className="text-white/70 hover:text-primary">
              Cookie Policy
            </Link>
            <Link href="/terms-and-conditions" className="text-white/70 hover:text-primary">
              Terms &amp; Conditions
            </Link>
          </nav>
        </div>
      </footer>
    </>
  )
}
