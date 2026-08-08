import { Phone, Mail, MapPin, Clock, Navigation } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SITE } from '@/lib/site'
import { SectionHeading } from '@/components/blocks'

// Grouped opening hours for a compact display.
const HOURS = [
  { day: 'Monday – Friday', time: '08:30 – 17:30' },
  { day: 'Saturday', time: '09:00 – 13:00' },
  { day: 'Sunday', time: 'Closed' },
]

const MAP_QUERY = encodeURIComponent(SITE.address.full)
const DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${MAP_QUERY}`

/**
 * Shared "How to Find Us" section. Shows the address, phone, email and opening
 * hours alongside an embedded Google Map and a Get Directions button. Reused on
 * the home page, the About Us page and every individual service page so the
 * location details stay consistent site-wide.
 */
export function FindUsSection({ className = 'bg-background' }: { className?: string } = {}) {
  return (
    <section className={`py-20 md:py-24 ${className}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Visit the Garage"
          title="How to Find Us"
          intro="You will find us on Hackett Way in Fareham, with easy parking right outside. Pop in, call ahead or get directions below."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-2 lg:items-stretch">
          {/* Details */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-start gap-4 border border-border bg-card p-5 sm:col-span-2">
              <span className="flex size-11 shrink-0 items-center justify-center bg-primary text-primary-foreground">
                <MapPin className="size-5" />
              </span>
              <span>
                <span className="block text-sm font-bold uppercase tracking-wide text-foreground">Address</span>
                <span className="mt-1 block text-muted-foreground">{SITE.address.full}</span>
              </span>
            </div>

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

            <div className="flex items-start gap-4 border border-border bg-card p-5 sm:col-span-2">
              <span className="flex size-11 shrink-0 items-center justify-center bg-primary text-primary-foreground">
                <Clock className="size-5" />
              </span>
              <span className="w-full">
                <span className="block text-sm font-bold uppercase tracking-wide text-foreground">
                  Opening hours
                </span>
                <span className="mt-2 block space-y-1">
                  {HOURS.map((h) => (
                    <span key={h.day} className="flex justify-between gap-4 text-sm text-muted-foreground">
                      <span>{h.day}</span>
                      <span className="font-medium text-foreground">{h.time}</span>
                    </span>
                  ))}
                </span>
              </span>
            </div>

            <div className="sm:col-span-2">
              <Button asChild size="lg" className="w-full font-bold uppercase tracking-wide sm:w-auto">
                <a href={DIRECTIONS_URL} target="_blank" rel="noopener noreferrer">
                  <Navigation /> Get Directions
                </a>
              </Button>
            </div>
          </div>

          {/* Map */}
          <div className="min-h-[320px] overflow-hidden border-4 border-primary lg:min-h-full">
            <iframe
              title={`Map showing ${SITE.name} in Fareham`}
              src={`https://www.google.com/maps?q=${MAP_QUERY}&output=embed`}
              width="100%"
              height="100%"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block size-full min-h-[320px]"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
