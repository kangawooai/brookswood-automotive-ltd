import { SectionHeading } from '@/components/blocks'
import { FaqList, type Faq } from '@/components/faq'
import { HOME_FAQS } from '@/lib/faqs'

// Shared FAQ section matching the homepage, a centered heading over the
// shadcn-space faq-numbered accordion (FaqList). Reused on every main page.
export function FaqSection({
  faqs = HOME_FAQS,
  eyebrow = 'FAQs',
  title = 'Your Questions, Answered',
}: {
  faqs?: Faq[]
  eyebrow?: string
  title?: string
} = {}) {
  return (
    <section className="bg-muted py-20 md:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow={eyebrow} title={title} center />
        <div className="mt-10">
          <FaqList faqs={faqs} />
        </div>
      </div>
    </section>
  )
}
