import type { Metadata } from 'next'
import { SITE } from '@/lib/site'
import { LegalPage, LegalSection } from '@/components/legal-page'
import { JsonLd } from '@/components/json-ld'
import { graph, webPageSchema, breadcrumbSchema } from '@/lib/schema'

const PATH = '/cookie-policy'
const DESCRIPTION =
  'How Brookswood Automotive uses cookies and similar technologies on its website, and how you can manage your cookie preferences.'

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: DESCRIPTION,
  alternates: { canonical: PATH, languages: { 'en-GB': PATH } },
  openGraph: { title: 'Cookie Policy | Brookswood Automotive', description: DESCRIPTION, url: PATH },
}

export default function CookiePolicyPage() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({ path: PATH, name: 'Cookie Policy', description: DESCRIPTION }),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Cookie Policy', path: PATH },
          ]),
        )}
      />
      <LegalPage
        title="Cookie Policy"
        intro="This policy explains what cookies are, how we use them, and how you can control them."
        lastUpdated="23 July 2026"
      >
        <p>
          This Cookie Policy explains how {SITE.name} uses cookies and similar
          technologies on our website. It should be read alongside our privacy policy.
        </p>

        <LegalSection heading="What are cookies?">
          <p>
            Cookies are small text files placed on your device when you visit a website. They help the site work
            properly, remember your preferences, and provide information to the site owner about how the site is
            used.
          </p>
        </LegalSection>

        <LegalSection heading="How we use cookies">
          <p>We use cookies for the following purposes:</p>
          <ul className="list-disc space-y-1 pl-6">
            <li>
              <strong className="text-foreground">Necessary cookies</strong> — required for the website to
              function and to remember your cookie choices.
            </li>
            <li>
              <strong className="text-foreground">Analytics cookies</strong> — help us understand how visitors
              use our site so we can improve it.
            </li>
            <li>
              <strong className="text-foreground">Advertising cookies</strong> — used to measure the
              effectiveness of our marketing and, where you consent, to personalise it.
            </li>
          </ul>
        </LegalSection>

        <LegalSection heading="Consent Mode">
          <p>
            When you first visit our site, we show a cookie banner. Until you accept, non-essential cookies and
            tracking are set to a denied state using Google Consent Mode. Only when you choose &ldquo;Accept
            All&rdquo; or grant a category in &ldquo;Manage Preferences&rdquo; do we enable those cookies.
          </p>
        </LegalSection>

        <LegalSection heading="Managing your preferences">
          <p>
            You can change your choices at any time using the cookie preferences on our website. You can also
            control cookies through your browser settings, including deleting or blocking them, though this may
            affect how the site works.
          </p>
        </LegalSection>

        <LegalSection heading="Contact us">
          <p>
            If you have any questions about our use of cookies, contact us at{' '}
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a> or call{' '}
            <a href={`tel:${SITE.phoneHref}`}>{SITE.phoneDisplay}</a>.
          </p>
        </LegalSection>
      </LegalPage>
    </>
  )
}
