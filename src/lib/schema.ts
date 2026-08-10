import { SITE, SERVICES } from '@/lib/site'
import { PHOTOS } from '@/lib/photos'

const ORG_ID = `${SITE.url}/#organization`
const WEBSITE_ID = `${SITE.url}/#website`

export function localBusinessSchema(
  rating: { value: string; count: number | null } = { value: SITE.rating.value, count: null },
) {
  return {
    '@type': ['AutoRepair', 'LocalBusiness'],
    '@id': ORG_ID,
    name: SITE.name,
    alternateName: SITE.shortName,
    url: SITE.url,
    telephone: SITE.phoneHref,
    email: SITE.email,
    image: PHOTOS.exterior,
    logo: `${SITE.url}/images/logo.webp`,
    priceRange: '££',
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.address.line1,
      addressLocality: SITE.address.city,
      addressRegion: SITE.address.county,
      postalCode: SITE.address.postcode,
      addressCountry: 'GB',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: SITE.geo.lat,
      longitude: SITE.geo.lng,
    },
    openingHoursSpecification: SITE.hoursSpec.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    })),
    // Only assert an aggregateRating when we have a real, live review count,
    // never publish a hardcoded or stale figure in structured data.
    ...(rating.count != null
      ? {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: rating.value,
            reviewCount: rating.count,
            bestRating: '5',
          },
        }
      : {}),
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: SITE.phoneHref,
      email: SITE.email,
      contactType: 'customer service',
      areaServed: 'GB',
      availableLanguage: 'English',
    },
  }
}

export function websiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: SITE.url,
    name: SITE.name,
    publisher: { '@id': ORG_ID },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE.url}/?s={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

export function webPageSchema({
  path,
  name,
  description,
  type = 'WebPage',
}: {
  path: string
  name: string
  description: string
  type?: string
}) {
  return {
    '@type': type,
    '@id': `${SITE.url}${path}#webpage`,
    url: `${SITE.url}${path}`,
    name,
    description,
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': ORG_ID },
    inLanguage: 'en-GB',
  }
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE.url}${item.path}`,
    })),
  }
}

export function serviceSchema({
  name,
  description,
  path,
  serviceType,
  areaServed = 'Fareham, Hampshire',
}: {
  name: string
  description: string
  path: string
  serviceType: string
  areaServed?: string
}) {
  return {
    '@type': 'Service',
    '@id': `${SITE.url}${path}#service`,
    name,
    description,
    serviceType,
    provider: { '@id': ORG_ID },
    areaServed: { '@type': 'City', name: areaServed },
    url: `${SITE.url}${path}`,
  }
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}

/** Wrap one or more schema nodes into a single @graph document. */
export function graph(...nodes: object[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': nodes,
  }
}

export { SERVICES }
