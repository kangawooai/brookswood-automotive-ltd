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
        lastUpdated="8 August 2026"
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
              <strong className="text-foreground">Necessary cookies</strong>, required for the website to
              function and to remember your cookie choices.
            </li>
            <li>
              <strong className="text-foreground">Analytics cookies</strong>, help us understand how visitors
              use our site so we can improve it.
            </li>
            <li>
              <strong className="text-foreground">Advertising cookies</strong>, used to measure the
              effectiveness of our marketing and, where you consent, to personalise it.
            </li>
          </ul>
        </LegalSection>

        <LegalSection heading="Cookies we use">
          <p>
            The main cookies and similar identifiers used on our website are listed below. Analytics and
            advertising cookies are only set once you consent to them.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-border text-foreground">
                  <th className="py-2 pr-4 font-bold">Cookie</th>
                  <th className="py-2 pr-4 font-bold">Type</th>
                  <th className="py-2 pr-4 font-bold">Purpose</th>
                  <th className="py-2 font-bold">Duration</th>
                </tr>
              </thead>
              <tbody className="align-top">
                <tr className="border-b border-border">
                  <td className="py-2 pr-4 font-medium text-foreground">cookie_consent</td>
                  <td className="py-2 pr-4">Necessary</td>
                  <td className="py-2 pr-4">Remembers your cookie preferences so we don&rsquo;t ask again.</td>
                  <td className="py-2">6 months</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 pr-4 font-medium text-foreground">_ga, _ga_&lt;id&gt;</td>
                  <td className="py-2 pr-4">Analytics</td>
                  <td className="py-2 pr-4">
                    Set by Google Analytics (via Google Tag Manager) to measure how visitors use the site.
                  </td>
                  <td className="py-2">Up to 2 years</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 pr-4 font-medium text-foreground">_gcl_au</td>
                  <td className="py-2 pr-4">Advertising</td>
                  <td className="py-2 pr-4">
                    Set by Google Tag Manager to measure ad conversions and campaign performance.
                  </td>
                  <td className="py-2">90 days</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 pr-4 font-medium text-foreground">_fbp</td>
                  <td className="py-2 pr-4">Advertising</td>
                  <td className="py-2 pr-4">
                    Set for the Meta (Facebook/Instagram) pixel and Conversions API to measure our advertising.
                  </td>
                  <td className="py-2">90 days</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 font-medium text-foreground">_fbc</td>
                  <td className="py-2 pr-4">Advertising</td>
                  <td className="py-2 pr-4">
                    Stores a Meta ad click identifier so an enquiry can be attributed to the ad you clicked.
                  </td>
                  <td className="py-2">90 days</td>
                </tr>
              </tbody>
            </table>
          </div>
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
