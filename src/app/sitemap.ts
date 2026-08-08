import type { MetadataRoute } from 'next'
import { SITE, SERVICES } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url
  const now = new Date()

  const staticPaths = [
    { path: '/', priority: 1, changeFrequency: 'weekly' as const },
    { path: '/our-services', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/about-us', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/contact', priority: 0.8, changeFrequency: 'monthly' as const },
    // /mot-fareham is the paid landing page (noindex) — intentionally excluded
    // from the sitemap so /services/mot-testing is the organic MOT page.
    { path: '/privacy-policy', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/cookie-policy', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/terms-and-conditions', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/imprint', priority: 0.3, changeFrequency: 'yearly' as const },
  ]

  const servicePaths = SERVICES.map((s) => ({
    path: `/services/${s.slug}`,
    priority: 0.8,
    changeFrequency: 'monthly' as const,
  }))

  return [...staticPaths, ...servicePaths].map((p) => ({
    url: `${base}${p.path}`,
    lastModified: now,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }))
}
