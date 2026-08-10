import type { Metadata } from 'next'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import { SITE } from '@/lib/site'
import { PHOTOS, PHOTO_ALT } from '@/lib/photos'
import { PageHero, SectionHeading } from '@/components/blocks'
import { ContactForm } from '@/components/contact-form'
import { Reviews } from '@/components/reviews'
import { FaqSection } from '@/components/sections/faq-section'
import { JsonLd } from '@/components/json-ld'
import { graph, webPageSchema, breadcrumbSchema } from '@/lib/schema'

const PATH = '/contact'
const DESCRIPTION =
  'Contact Brookswood Automotive in Fareham for MOTs, servicing and repairs. Call 01329 640528, email us or request a callback online. 4-6 Hackett Way, Fareham PO14 1AJ.'

export const metadata: Metadata = {
  title: 'Contact Us | Book Your Car In Fareham',
  description: DESCRIPTION,
  alternates: { canonical: PATH, languages: { 'en-GB': PATH } },
  openGraph: {
    title: 'Contact Brookswood Automotive | Fareham Garage',
    description: DESCRIPTION,
    url: PATH,
    images: [
      {
        url: PHOTOS.reception,
        width: 1536,
        height: 1024,
        alt: 'Brookswood Automotive garage reception and workshop in Fareham',
      },
    ],
  },
}

const HOURS = [
  { day: 'Monday – Friday', time: '08:30 – 17:30' },
  { day: 'Saturday', time: '09:00 – 13:00' },
  { day: 'Sunday', time: 'Closed' },
]

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({
            path: PATH,
            name: 'Contact Us | Book Your Car In Fareham',
            description: DESCRIPTION,
            type: 'ContactPage',
          }),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Contact', path: PATH },
          ]),
        )}
      />

      <PageHero
        image={PHOTOS.reception}
        imageAlt={PHOTO_ALT.reception}
        eyebrow="Get in Touch"
        title="Book Your Car In"
        subtitle="Call us, email us or request a callback below. We will get back to you quickly with honest advice and a clear price."
        compact
      />

      <section className="bg-background py-20 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          {/* Details */}
          <div>
            <SectionHeading
              eyebrow="Contact Details"
              title="We'd Love to Help"
              intro="Whether you need an MOT, a service or a repair sorting, get in touch and we will look after you."
            />

            <div className="mt-8 space-y-5">
              <a
                href={`tel:${SITE.phoneHref}`}
                className="flex items-start gap-4 border border-border bg-card p-5 transition-colors hover:border-primary"
              >
                <span className="flex size-11 shrink-0 items-center justify-center bg-primary text-primary-foreground">
                  <Phone className="size-5" />
                </span>
                <span>
                  <span className="block text-sm font-bold uppercase tracking-wide text-foreground">Call us</span>
                  <span className="mt-1 block text-muted-foreground">{SITE.phoneDisplay}</span>
                </span>
              </a>

              <a
                href={`mailto:${SITE.email}`}
                className="flex items-start gap-4 border border-border bg-card p-5 transition-colors hover:border-primary"
              >
                <span className="flex size-11 shrink-0 items-center justify-center bg-primary text-primary-foreground">
                  <Mail className="size-5" />
                </span>
                <span>
                  <span className="block text-sm font-bold uppercase tracking-wide text-foreground">Email us</span>
                  <span className="mt-1 block break-all text-muted-foreground">{SITE.email}</span>
                </span>
              </a>

              <div className="flex items-start gap-4 border border-border bg-card p-5">
                <span className="flex size-11 shrink-0 items-center justify-center bg-primary text-primary-foreground">
                  <MapPin className="size-5" />
                </span>
                <span>
                  <span className="block text-sm font-bold uppercase tracking-wide text-foreground">Visit us</span>
                  <span className="mt-1 block text-muted-foreground">{SITE.address.full}</span>
                </span>
              </div>

              <div className="flex items-start gap-4 border border-border bg-card p-5">
                <span className="flex size-11 shrink-0 items-center justify-center bg-primary text-primary-foreground">
                  <Clock className="size-5" />
                </span>
                <span className="w-full">
                  <span className="block text-sm font-bold uppercase tracking-wide text-foreground">
                    Opening hours
                  </span>
                  <span className="mt-2 block space-y-1">
                    {HOURS.map((h) => (
                      <span key={h.day} className="flex justify-between text-sm text-muted-foreground">
                        <span>{h.day}</span>
                        <span className="font-medium text-foreground">{h.time}</span>
                      </span>
                    ))}
                  </span>
                </span>
              </div>
            </div>
          </div>

          {/* Form */}
          <div>
            <div className="border border-border bg-card p-6 sm:p-8">
              <h2 className="text-2xl font-black uppercase tracking-tight text-foreground">Request a Callback</h2>
              <p className="mt-2 text-muted-foreground">
                Fill in your details and we will get back to you as soon as we can.
              </p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Reviews />

      <FaqSection />

      {/* Map */}
      <section className="bg-muted">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="overflow-hidden border-4 border-primary">
            <iframe
              title={`Map showing ${SITE.name} in Fareham`}
              src="https://www.google.com/maps?q=4-6%20Hackett%20Way%2C%20Fareham%20PO14%201AJ&output=embed"
              width="100%"
              height="420"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block w-full"
            />
          </div>
        </div>
      </section>
    </>
  )
}
