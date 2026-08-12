import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { Tracking } from '@/components/tracking'
import { UtmProvider } from '@/components/utm-provider'
import { ConsentInit } from '@/components/consent-init'
import { CookieConsentLoader } from '@/components/cookie-consent-loader'
import { JsonLd } from '@/components/json-ld'
import { graph, localBusinessSchema, websiteSchema } from '@/lib/schema'
import { getPlaceData } from '@/lib/google-reviews'
import { SITE } from '@/lib/site'
import { PHOTOS } from '@/lib/photos'
import './globals.css'
import { StructuredData } from '@/components/structured-data'

// UniNeue, the single self-hosted font family for the whole site.
// All 10 weights/styles live in public/fonts and are exposed through the
// --font-uni-neue CSS variable (see globals.css for the role mapping).
const uniNeue = localFont({
  src: [
    { path: '../../public/fonts/UniNeue-Light.woff2', weight: '300', style: 'normal' },
    { path: '../../public/fonts/UniNeue-LightItalic.woff2', weight: '300', style: 'italic' },
    { path: '../../public/fonts/UniNeue-Regular.woff2', weight: '400', style: 'normal' },
    { path: '../../public/fonts/UniNeue-RegularItalic.woff2', weight: '400', style: 'italic' },
    { path: '../../public/fonts/UniNeue-Bold.woff2', weight: '700', style: 'normal' },
    { path: '../../public/fonts/UniNeue-BoldItalic.woff2', weight: '700', style: 'italic' },
    { path: '../../public/fonts/UniNeue-Heavy.woff2', weight: '800', style: 'normal' },
    { path: '../../public/fonts/UniNeue-HeavyItalic.woff2', weight: '800', style: 'italic' },
    { path: '../../public/fonts/UniNeue-Black.woff2', weight: '900', style: 'normal' },
    { path: '../../public/fonts/UniNeue-BlackItalic.woff2', weight: '900', style: 'italic' },
  ],
  variable: '--font-uni-neue',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: 'Brookswood Automotive | MOT, Servicing & Repairs in Fareham',
    template: '%s | Brookswood Automotive',
  },
  description:
    'Trusted Fareham garage for MOT tests, car servicing and repairs. Over 20 years of experience, honest pricing and a 5-star rating. Call 01329 640528.',
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

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Use the live Google rating in the structured data so search engines show
  // the same real rating that appears across the site.
  const { rating } = await getPlaceData()
  return (
    <html lang="en-GB" className={uniNeue.variable}>
      <head>
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <JsonLd data={graph(localBusinessSchema(rating), websiteSchema())} />
      </head>
      <body>
        <StructuredData />
        <ConsentInit />
        <Tracking />
        <UtmProvider />
        {children}
        <CookieConsentLoader />
      </body>
    </html>
  )
}
