import type { Metadata } from 'next'
import { SITE } from '@/lib/site'
import { LegalPage, LegalSection } from '@/components/legal-page'
import { JsonLd } from '@/components/json-ld'
import { graph, webPageSchema, breadcrumbSchema } from '@/lib/schema'

const PATH = '/privacy-policy'
const DESCRIPTION =
  'How Brookswood Automotive collects, uses and protects your personal data in line with UK GDPR and the Data Protection Act 2018.'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: DESCRIPTION,
  alternates: { canonical: PATH, languages: { 'en-GB': PATH } },
  openGraph: { title: 'Privacy Policy | Brookswood Automotive', description: DESCRIPTION, url: PATH },
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({ path: PATH, name: 'Privacy Policy', description: DESCRIPTION }),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Privacy Policy', path: PATH },
          ]),
        )}
      />
      <LegalPage
        title="Privacy Policy"
        intro="Your privacy matters to us. This policy explains how we handle your personal information."
        lastUpdated="23 July 2026"
      >
        <p>
          This Privacy Policy explains how {SITE.name} (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;),
          trading as {SITE.tradingName}, collects and uses your personal data when you use our website or
          contact us about our services. We are the data controller for the information you provide and are
          committed to protecting it in line with UK GDPR and the Data Protection Act 2018.
        </p>

        <LegalSection heading="Information we collect">
          <p>We may collect the following information when you contact us or use our website:</p>
          <ul className="list-disc space-y-1 pl-6">
            <li>Your name, email address, telephone number and postcode</li>
            <li>Details of your vehicle and the service or enquiry you are making</li>
            <li>Any message or information you choose to send us</li>
            <li>Technical data such as your IP address, browser type and pages visited (via cookies)</li>
          </ul>
        </LegalSection>

        <LegalSection heading="How we use your information">
          <p>We use your personal data to:</p>
          <ul className="list-disc space-y-1 pl-6">
            <li>Respond to your enquiry and provide the services you request</li>
            <li>Arrange bookings, MOTs, servicing and repairs</li>
            <li>Contact you about your vehicle or enquiry</li>
            <li>Improve our website and understand how it is used</li>
            <li>Meet our legal and regulatory obligations</li>
          </ul>
          <p>
            Our lawful bases for processing are your consent, the performance of a contract, and our legitimate
            interests in running our business and responding to enquiries.
          </p>
        </LegalSection>

        <LegalSection heading="Sharing your information">
          <p>
            We do not sell your personal data. We may share it with trusted service providers who help us run
            our business — for example, IT and hosting providers, or analytics and advertising platforms where
            you have consented — and with authorities where we are required to do so by law.
          </p>
        </LegalSection>

        <LegalSection heading="How long we keep it">
          <p>
            We keep your personal data only for as long as necessary to fulfil the purposes we collected it for,
            including to satisfy any legal, accounting or reporting requirements.
          </p>
        </LegalSection>

        <LegalSection heading="Your rights">
          <p>Under UK data protection law you have the right to:</p>
          <ul className="list-disc space-y-1 pl-6">
            <li>Access the personal data we hold about you</li>
            <li>Request correction of inaccurate data</li>
            <li>Request erasure of your data in certain circumstances</li>
            <li>Object to or restrict our processing of your data</li>
            <li>Withdraw consent at any time where we rely on it</li>
          </ul>
          <p>
            To exercise any of these rights, please contact us at <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
            You also have the right to lodge a complaint with the Information Commissioner&rsquo;s Office (ICO) at
            ico.org.uk.
          </p>
        </LegalSection>

        <LegalSection heading="Cookies">
          <p>
            Our website uses cookies to help it function and to understand how it is used. You can manage your
            preferences at any time. For more detail, please see our cookie policy.
          </p>
        </LegalSection>

        <LegalSection heading="Contact us">
          <p>
            If you have any questions about this policy or how we handle your data, contact us at{' '}
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a> or call{' '}
            <a href={`tel:${SITE.phoneHref}`}>{SITE.phoneDisplay}</a>. Our address is {SITE.address.full}.
          </p>
        </LegalSection>
      </LegalPage>
    </>
  )
}
