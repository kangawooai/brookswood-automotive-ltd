import { SectionHeading } from '@/components/blocks'
import { BookingForm } from '@/components/booking-form'

// Multi-step "Book Now" booking form section, shown on service pages above the
// "Our Process" section. Pre-fills the current service so visitors book in a
// few quick taps.
export function BookingSection({ defaultService }: { defaultService?: string }) {
  return (
    <section className="bg-background py-20 md:py-24">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Book Online"
          title="Book Now"
          intro="Book your car in online in under a minute — quick, easy and no obligation. We'll confirm your appointment with honest advice and a clear price."
          center
        />
        <div className="mt-10 rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
          <BookingForm defaultService={defaultService} />
        </div>
      </div>
    </section>
  )
}
