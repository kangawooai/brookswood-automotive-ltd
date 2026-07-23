import type { Metadata } from 'next'
import { Inter, Rubik } from 'next/font/google'
import { Tracking } from '@/components/tracking'
import { UtmProvider } from '@/components/utm-provider'
import { ConsentInit } from '@/components/consent-init'
import { CookieConsent } from '@/components/cookie-consent'
import { JsonLd } from '@/components/json-ld'
import { graph, localBusinessSchema, websiteSchema } from '@/lib/schema'
import { SITE } from '@/lib/site'
import { PHOTOS } from '@/lib/photos'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const rubik = Rubik({ subsets: ['latin'], variable: '--font-rubik', display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: 'Brookswood Automotive | MOT, Servicing & Repairs in Fareham',
    template: '%s | Brookswood Automotive',
  },
  description:
    'Trusted Fareham garage for MOT tests, car servicing and repairs. Over 20 years of experience, honest pricing and a 5-star rating. Call 01329 756796.',
  applicationName: SITE.name,
  authors: [{ name: SITE.name }],
  keywords: ['MOT Fareham', 'car servicing Fareham', 'garage Fareham', 'car repairs Fareham'],
  alternates: {
    canonical: '/',
    languages: { 'en-GB': '/' },
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: SITE.url,
    siteName: SITE.name,
    title: 'Brookswood Automotive | MOT, Servicing & Repairs in Fareham',
    description:
      'Trusted Fareham garage for MOT tests, car servicing and repairs. Over 20 years of experience and honest pricing.',
    images: [
      {
        url: PHOTOS.workshop,
        width: 1536,
        height: 1024,
        alt: 'Brookswood Automotive car repair workshop in Fareham',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Brookswood Automotive | MOT, Servicing & Repairs in Fareham',
    description: 'Trusted Fareham garage for MOT tests, car servicing and repairs.',
    images: [PHOTOS.workshop],
  },
  icons: {
    icon: '/icon.png',
    apple: '/apple-icon.png',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${inter.variable} ${rubik.variable}`}>
      <head>
        <JsonLd data={graph(localBusinessSchema(), websiteSchema())} />
      </head>
      <body className={inter.className}>
        <ConsentInit />
        <Tracking />
        <UtmProvider />
        {children}
        <CookieConsent />
      </body>
    </html>
  )
}
