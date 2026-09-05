import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Phone, Check, Tag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SITE, SERVICES, getService } from '@/lib/site'
import { PageHero, HeroButtons, SectionHeading, CtaBand, CheckList } from '@/components/blocks'
import { ServicesGrid } from '@/components/sections/services-grid'
import { WhyChooseSection } from '@/components/sections/why-choose-section'
import { FaqSection } from '@/components/sections/faq-section'
import { FindUsSection } from '@/components/sections/find-us-section'
import { CallbackSection } from '@/components/sections/callback-section'
import { BookingSection } from '@/components/sections/booking-section'
import { JsonLd } from '@/components/json-ld'
import { getServiceFaqs } from '@/lib/faqs'
import { graph, webPageSchema, breadcrumbSchema, serviceSchema, faqSchema } from '@/lib/schema'

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const service = getService(slug)
  if (!service) return {}
  const path = `/services/${service.slug}`
  return {
    title: service.metaTitle,
    description: service.metaDescription,
    keywords: service.keywords,
    alternates: { canonical: path, languages: { 'en-GB': path } },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: path,
      images: [{ url: service.image, width: 1536, height: 1024, alt: service.title }],
    },
  }
}

function Breadcrumb({ title }: { title: string }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-white/70">
      <ol className="flex flex-wrap items-center gap-2">
        <li>
          <Link href="/" className="hover:text-white">
            Home
          </Link>
        </li>
        <li aria-hidden>/</li>
        <li>
          <Link href="/our-services" className="hover:text-white">
            Services
          </Link>
        </li>
        <li aria-hidden>/</li>
        <li className="text-white">{title}</li>
      </ol>
    </nav>
  )
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = getService(slug)
  if (!service) notFound()

  const path = `/services/${service.slug}`
  const related = SERVICES.filter((s) => s.slug !== service.slug).slice(0, 3)
  const faqs = getServiceFaqs(service.slug)

  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({ path, name: service.metaTitle, description: service.metaDescription }),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Services', path: '/our-services' },
            { name: service.nav, path },
          ]),
          serviceSchema({
            name: service.title,
            description: service.metaDescription,
            path,
            serviceType: service.nav,
          }),
          faqSchema(faqs.map((f) => ({ q: f.q, a: f.a }))),
        )}
      />

      <PageHero
        image={service.image}
        imageAlt={`${service.title} at Brookswood Automotive in Fareham`}
        eyebrow="Fareham Garage"
        title={service.title}
        subtitle={service.short}
        breadcrumb={<Breadcrumb title={service.nav} />}
      >
        <HeroButtons />
      </PageHero>

      {/* Limited-time clutch offer band (clutch page only) */}
      {service.slug === 'clutches' && (
        <section className="bg-primary text-primary-foreground">
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 md:py-12 lg:px-8">
            <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
              <div className="flex items-start gap-4">
                <span className="flex size-12 shrink-0 items-center justify-center bg-white/15">
                  <Tag className="size-6" strokeWidth={2.5} />
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-primary-foreground/80">
                    Limited-Time Offer
                  </p>
                  <p className="mt-1 text-3xl font-black uppercase leading-none tracking-tight sm:text-4xl md:text-5xl">
                    20% Off Clutch Labour
                  </p>
                </div>
              </div>
              <Button
                asChild
                size="lg"
                className="bg-white font-bold uppercase tracking-wide text-primary hover:bg-white/90"
              >
                <a href={`tel:${SITE.phoneHref}`}>
                  <Phone /> {SITE.phoneDisplay}
                </a>
              </Button>
            </div>
            <p className="mt-6 max-w-4xl border-t border-white/20 pt-4 text-sm leading-relaxed text-primary-foreground/85">
              Offer valid on clutch replacement labour only; parts and consumables are charged
              separately. The 20% discount applies to labour costs and cannot be used in conjunction
              with any other offer, promotion or discount. Subject to workshop availability and prior
              booking — please quote this offer when booking. The final price is confirmed following
              diagnosis and inspection of your vehicle. Brookswood Automotive LTD reserves the right
              to amend or withdraw this offer at any time without notice.
            </p>
          </div>
        </section>
      )}

      {/* Intro + included */}
      <section className="bg-background py-20 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <SectionHeading eyebrow="Overview" title={`${service.nav} at Brookswood Automotive`} />
            <p className="mt-6 text-lg text-muted-foreground">{service.intro}</p>
            <div className="mt-8 border-l-4 border-primary bg-muted p-6">
              <p className="font-bold uppercase tracking-tight text-foreground">Why choose us for this?</p>
              <p className="mt-2 text-muted-foreground">
                Over {SITE.yearsExperience} years of experience, honest advice and transparent pricing, we
                explain what your car needs before any work begins.
              </p>
            </div>
          </div>
          <div className="border border-border bg-card p-8">
            <h2 className="text-xl font-bold uppercase tracking-tight text-foreground">What&apos;s included</h2>
            <ul className="mt-6 space-y-4">
              {service.included.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center bg-primary text-primary-foreground">
                    <Check className="size-3.5" strokeWidth={3} />
                  </span>
                  <span className="text-foreground">{item}</span>
                </li>
              ))}
            </ul>
            <Button asChild className="mt-8 w-full font-bold uppercase tracking-wide" size="lg">
              <Link href="#book">Book {service.nav}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why choose us, trust points, team photo and Google rating (replaces
          the full reviews carousel on service pages to keep things tight) */}
      <WhyChooseSection />

      {/* Prominent quote callout, drives visitors to contact us before the form */}
      <section className="bg-background pt-20 md:pt-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="bg-primary px-6 py-10 sm:px-10 md:py-12">
            <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
              <div className="max-w-2xl">
                <h2 className="text-3xl font-black uppercase tracking-tight text-primary-foreground md:text-4xl">
                  Contact Us for a Fast, Free Quote
                </h2>
                <p className="mt-4 text-lg text-primary-foreground/90">
                  Need a price on your {service.nav.toLowerCase()}? Get in touch today for honest advice
                  and a no-obligation quote, with no surprises.
                </p>
              </div>
              <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
                <Button
                  asChild
                  size="lg"
                  className="bg-white font-bold uppercase tracking-wide text-primary hover:bg-white/90"
                >
                  <Link href="/contact">Contact Us</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white/60 bg-transparent font-bold uppercase tracking-wide text-white hover:bg-white/10 hover:text-white"
                >
                  <a href={`tel:${SITE.phoneHref}`}>
                    <Phone /> {SITE.phoneDisplay}
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Multi-step booking form, sits above the process section */}
      <BookingSection defaultService={service.nav} />

      {/* Process */}
      <section className="bg-secondary py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Our Process" title="How We Handle It" light />
          <div className="mt-12 grid gap-8 md:grid-cols-4">
            {service.process.map((item, i) => (
              <div key={item.step}>
                <span className="text-5xl font-black text-primary">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-3 text-lg font-bold uppercase tracking-tight text-white">{item.step}</h3>
                <p className="mt-2 text-sm text-white/70">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related services, shadcn-space features shadow-lift card grid */}
      <ServicesGrid
        slugs={related.map((s) => s.slug)}
        eyebrow="Related Services"
        title="You Might Also Need"
        intro=""
      />

      <section className="bg-background pb-20 md:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <CheckList
            items={[
              'DVSA-approved MOT testing',
              'Quality parts and workmanship',
              'Free, honest advice',
              'Serving Fareham and Hampshire',
            ]}
          />
        </div>
      </section>

      <FindUsSection />

      <FaqSection faqs={faqs} />

      <CallbackSection defaultService={service.nav} />

      <CtaBand title={`Book your ${service.nav.toLowerCase()} today`} />
    </>
  )
}
