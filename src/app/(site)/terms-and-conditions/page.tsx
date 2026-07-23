import type { Metadata } from 'next'
import { SITE } from '@/lib/site'
import { LegalPage, LegalSection } from '@/components/legal-page'
import { JsonLd } from '@/components/json-ld'
import { graph, webPageSchema, breadcrumbSchema } from '@/lib/schema'

const PATH = '/terms-and-conditions'
const DESCRIPTION =
  'The terms and conditions governing the use of the Brookswood Automotive website and the services we provide.'

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: DESCRIPTION,
  alternates: { canonical: PATH, languages: { 'en-GB': PATH } },
  openGraph: { title: 'Terms & Conditions | Brookswood Automotive', description: DESCRIPTION, url: PATH },
}

export default function TermsPage() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({ path: PATH, name: 'Terms & Conditions', description: DESCRIPTION }),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Terms & Conditions', path: PATH },
          ]),
        )}
      />
      <LegalPage
        title="Terms & Conditions"
        intro="Please read these terms carefully. They govern your use of our website and services."
        lastUpdated="23 July 2026"
      >
        <p>
          These terms and conditions apply to the use of the {SITE.name} website and to the services we provide.
          By using our website or engaging our services, you agree to these terms. {SITE.name} trades as{' '}
          {SITE.tradingName} and is registered in England and Wales, company number {SITE.companyReg}.
        </p>

        <LegalSection heading="Our services">
          <p>
            We provide vehicle MOT testing, servicing, repairs and related garage services. Any quotation we
            give is based on the information available at the time and may be revised if additional work is
            identified. We will always seek your approval before carrying out work beyond what has been agreed.
          </p>
        </LegalSection>

        <LegalSection heading="Quotes and pricing">
          <p>
            Prices for work are confirmed before we begin. Where a fault requires further investigation, we will
            explain this and agree any diagnostic charges with you in advance. Payment is due on completion of the
            work unless otherwise agreed in writing.
          </p>
        </LegalSection>

        <LegalSection heading="Bookings">
          <p>
            Bookings can be made by phone or through our website. Requesting a callback or submitting an enquiry
            does not constitute a confirmed booking until we have contacted you to agree a date and time. Please
            let us know as early as possible if you need to change or cancel an appointment.
          </p>
        </LegalSection>

        <LegalSection heading="Website use">
          <p>
            The content on this website is provided for general information only and may change without notice.
            While we take care to keep it accurate, we make no warranties as to its completeness or accuracy.
            The website and its content remain our property or that of our licensors and may not be reproduced
            without permission.
          </p>
        </LegalSection>

        <LegalSection heading="Liability">
          <p>
            Nothing in these terms limits our liability for death or personal injury caused by our negligence,
            or for any other liability that cannot be excluded under law. Subject to that, we are not liable for
            any indirect or consequential loss arising from the use of our website.
          </p>
        </LegalSection>

        <LegalSection heading="Governing law">
          <p>
            These terms are governed by the laws of England and Wales, and any disputes will be subject to the
            exclusive jurisdiction of the courts of England and Wales.
          </p>
        </LegalSection>

        <LegalSection heading="Contact us">
          <p>
            If you have any questions about these terms, contact us at{' '}
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a> or call{' '}
            <a href={`tel:${SITE.phoneHref}`}>{SITE.phoneDisplay}</a>.
          </p>
        </LegalSection>
      </LegalPage>
    </>
  )
}
