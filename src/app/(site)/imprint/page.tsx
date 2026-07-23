import type { Metadata } from 'next'
import { SITE } from '@/lib/site'
import { LegalPage, LegalSection } from '@/components/legal-page'
import { JsonLd } from '@/components/json-ld'
import { graph, webPageSchema, breadcrumbSchema } from '@/lib/schema'

const PATH = '/imprint'
const DESCRIPTION =
  'Company details and legal information for Brookswood Automotive LTD, trading as Fareham MOT Centre.'

export const metadata: Metadata = {
  title: 'Imprint',
  description: DESCRIPTION,
  alternates: { canonical: PATH, languages: { 'en-GB': PATH } },
  openGraph: { title: 'Imprint | Brookswood Automotive', description: DESCRIPTION, url: PATH },
}

export default function ImprintPage() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({ path: PATH, name: 'Imprint', description: DESCRIPTION }),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Imprint', path: PATH },
          ]),
        )}
      />
      <LegalPage
        title="Imprint"
        intro="Company and contact information for Brookswood Automotive LTD."
        lastUpdated="23 July 2026"
      >
        <LegalSection heading="Company details">
          <ul className="space-y-1">
            <li><strong className="text-foreground">Company name:</strong> {SITE.name}</li>
            <li><strong className="text-foreground">Trading as:</strong> {SITE.tradingName}</li>
            <li><strong className="text-foreground">Registered office:</strong> {SITE.address.full}</li>
            <li><strong className="text-foreground">Company registration number:</strong> {SITE.companyReg}</li>
            <li><strong className="text-foreground">Registered in:</strong> England and Wales</li>
          </ul>
        </LegalSection>

        <LegalSection heading="Contact">
          <ul className="space-y-1">
            <li>
              <strong className="text-foreground">Phone:</strong>{' '}
              <a href={`tel:${SITE.phoneHref}`}>{SITE.phoneDisplay}</a>
            </li>
            <li>
              <strong className="text-foreground">Email:</strong>{' '}
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </li>
            <li><strong className="text-foreground">Contact:</strong> {SITE.contactName}</li>
          </ul>
        </LegalSection>

        <LegalSection heading="Responsibility for content">
          <p>
            We take care to keep the content of this website accurate and up to date. However, we accept no
            liability for the accuracy, completeness or timeliness of the information provided. Where this
            website links to external sites, we are not responsible for their content.
          </p>
        </LegalSection>
      </LegalPage>
    </>
  )
}
