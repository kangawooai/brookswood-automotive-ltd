import type { NextConfig } from 'next'

const securityHeaders = [
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
]

const nextConfig: NextConfig = {
  images: {
    // Allowed quality values for next/image (Next 15.3+ gates the `quality` prop).
    // 60 = hero images behind dark overlays, 75 = default.
    qualities: [60, 75],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hppgzamzudygkyyzkgdd.supabase.co',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
  async redirects() {
    return [
      { source: '/home', destination: '/', permanent: true },
      { source: '/about', destination: '/about-us', permanent: true },
      { source: '/services', destination: '/our-services', permanent: true },
      { source: '/privacy-statement', destination: '/privacy-policy', permanent: true },
      { source: '/services/servicing', destination: '/services/car-servicing', permanent: true },
      { source: '/services/mots', destination: '/services/mot-testing', permanent: true },
      { source: '/services/other-services', destination: '/our-services', permanent: true },
      { source: '/book-online', destination: '/contact', permanent: true },
    ]
  },
}

export default nextConfig
