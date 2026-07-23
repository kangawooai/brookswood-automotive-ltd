import { SectionHeading } from '@/components/blocks'
import { ContactForm } from '@/components/contact-form'

// Shared "Request a Callback" form section, matching the card style used on
// the contact page. Reused on every main page so a lead-capture form is
// always available.
export function CallbackSection({
  eyebrow = 'Get in Touch',
  title = 'Book Your Car In',
  intro = "Request a callback and we'll get back to you quickly with honest advice and a clear price.",
  defaultService,
}: {
  eyebrow?: string
  title?: string
  intro?: string
  defaultService?: string
} = {}) {
  return (
    <section className="bg-background py-20 md:py-24">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow={eyebrow} title={title} intro={intro} center />
        <div className="mt-10 rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
          <h3 className="text-2xl font-black uppercase tracking-tight text-foreground">Request a Callback</h3>
          <p className="mt-2 text-muted-foreground">
            Fill in your details and we&apos;ll get back to you as soon as we can.
          </p>
          <div className="mt-6">
            <ContactForm defaultService={defaultService} />
          </div>
        </div>
      </div>
    </section>
  )
}
