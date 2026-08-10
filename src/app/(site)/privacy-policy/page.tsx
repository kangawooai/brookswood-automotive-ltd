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
        lastUpdated="8 August 2026"
      >
        <p>
          This Privacy Policy explains how {SITE.name} (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;)
          collects and uses your personal data when you use our website or
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
            We do not sell your personal data. We share it only with the trusted service providers
            (&ldquo;processors&rdquo;) who help us run our business and website, and with authorities where we
            are required to do so by law. Our main processors are:
          </p>
          <ul className="list-disc space-y-1 pl-6">
            <li>
              <strong className="text-foreground">Vercel Inc.</strong>, website hosting and delivery, which
              processes technical data such as your IP address in order to serve the site securely.
            </li>
            <li>
              <strong className="text-foreground">Google (Google Ireland Ltd / Google LLC)</strong>, Google
              Analytics and Google Tag Manager, used with your consent to understand how our site is used and to
              measure our advertising.
            </li>
            <li>
              <strong className="text-foreground">Meta Platforms (Meta Platforms Ireland Ltd / Meta Platforms,
              Inc.)</strong>, the Meta pixel and the Meta Conversions API, used with your consent to measure and
              improve our Facebook and Instagram advertising (see &ldquo;Advertising and measurement&rdquo; below).
            </li>
          </ul>
        </LegalSection>

        <LegalSection heading="Advertising and measurement">
          <p>
            Where you consent to advertising cookies, we use the <strong className="text-foreground">Meta
            pixel</strong> on our website and the <strong className="text-foreground">Meta Conversions API</strong>{' '}
            (a server-side connection) to tell Meta which enquiries came from our ads, so we can measure their
            performance and reach relevant audiences. This may involve sharing limited data such as your hashed
            contact details, the pages you viewed and the action you took (for example, submitting an enquiry).
            You can withdraw consent at any time and this tracking will stop.
          </p>
        </LegalSection>

        <LegalSection heading="International transfers">
          <p>
            Some of our processors, including Google and Meta, are US-based or may process data outside the UK
            and European Economic Area. Where personal data is transferred internationally, it is protected by
            appropriate safeguards recognised under UK data protection law, such as the UK International Data
            Transfer Agreement or the UK Extension to the EU–US Data Privacy Framework, together with the
            providers&rsquo; own standard contractual clauses.
          </p>
        </LegalSection>

        <LegalSection heading="How long we keep it">
          <p>
            We keep your personal data only for as long as necessary for the purposes we collected it for:
          </p>
          <ul className="list-disc space-y-1 pl-6">
            <li>
              <strong className="text-foreground">Enquiry and booking details</strong>, up to 2 years after our
              last contact with you, so we can handle follow-up questions and repeat visits.
            </li>
            <li>
              <strong className="text-foreground">Job, invoice and accounting records</strong>, up to 6 years,
              to meet HMRC and other legal, accounting and reporting requirements.
            </li>
            <li>
              <strong className="text-foreground">Website analytics and advertising data</strong>, retained by
              our analytics and advertising providers for their standard periods (typically up to 26 months),
              after which it is deleted or aggregated.
            </li>
          </ul>
        </LegalSection>

        <LegalSection heading="Your rights">
          <p>Under UK GDPR and the Data Protection Act 2018 you have the right to:</p>
          <ul className="list-disc space-y-1 pl-6">
            <li>
              <strong className="text-foreground">Be informed</strong> about how we use your personal data (this
              policy)
            </li>
            <li>
              <strong className="text-foreground">Access</strong> the personal data we hold about you
            </li>
            <li>
              <strong className="text-foreground">Rectification</strong>, request correction of inaccurate or
              incomplete data
            </li>
            <li>
              <strong className="text-foreground">Erasure</strong>, request deletion of your data in certain
              circumstances
            </li>
            <li>
              <strong className="text-foreground">Restrict</strong> or <strong className="text-foreground">object
              to</strong> our processing of your data
            </li>
            <li>
              <strong className="text-foreground">Data portability</strong>, receive your data in a portable
              format
            </li>
            <li>
              <strong className="text-foreground">Withdraw consent</strong> at any time where we rely on it, and
              object to direct marketing
            </li>
          </ul>
          <p>
            To exercise any of these rights, please contact us at <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
            We will respond within one month. You also have the right to lodge a complaint with the Information
            Commissioner&rsquo;s Office (ICO) at ico.org.uk.
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
