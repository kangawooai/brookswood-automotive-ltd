import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ArrowRight, Phone, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SITE, SERVICES, getService } from '@/lib/site'
import { PageHero, HeroButtons, SectionHeading, CtaBand, CheckList } from '@/components/blocks'
import { JsonLd } from '@/components/json-ld'
import { graph, webPageSchema, breadcrumbSchema, serviceSchema } from '@/lib/schema'

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

      {/* Intro + included */}
      <section className="bg-background py-20 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <SectionHeading eyebrow="Overview" title={`${service.nav} at Brookswood Automotive`} />
            <p className="mt-6 text-lg text-muted-foreground">{service.intro}</p>
            <div className="mt-8 border-l-4 border-primary bg-muted p-6">
              <p className="font-bold uppercase tracking-tight text-foreground">Why choose us for this?</p>
              <p className="mt-2 text-muted-foreground">
                Over {SITE.yearsExperience} years of experience, honest advice and transparent pricing — we
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
              <Link href="/contact">Book {service.nav}</Link>
            </Button>
          </div>
        </div>
      </section>

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

      {/* Related services */}
      <section className="bg-background py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Related Services" title="You Might Also Need" />
          <div className="mt-12 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-3">
            {related.map((s) => {
              const Icon = s.icon
              return (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="group flex flex-col bg-card p-7 transition-colors hover:bg-muted"
                >
                  <span className="flex size-12 items-center justify-center bg-primary text-primary-foreground">
                    <Icon className="size-6" />
                  </span>
                  <h3 className="mt-5 text-lg font-bold uppercase tracking-tight text-foreground">{s.nav}</h3>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground">{s.short}</p>
                  <span className="mt-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-primary">
                    Learn more<span className="sr-only"> about {s.nav}</span>
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              )
            })}
          </div>
          <div className="mt-10">
            <CheckList
              items={[
                'DVSA-approved MOT testing',
                'Quality parts and workmanship',
                'Free, honest advice',
                'Serving Fareham and Hampshire',
              ]}
            />
          </div>
        </div>
      </section>

      <CtaBand title={`Book your ${service.nav.toLowerCase()} today`} />
    </>
  )
}
