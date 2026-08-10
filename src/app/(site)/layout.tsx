import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { getLinesOpen } from '@/lib/lines-open'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  // These pages are statically rendered (fast TTFB, edge-cacheable, and no
  // `no-store` document header that would block the back/forward cache).
  // `linesOpen` here is only a first-paint seed computed at build/revalidation
  // time — SiteHeader re-evaluates it on the client against the visitor's own
  // clock on mount (and every minute), so the displayed status is always live.
  const linesOpen = getLinesOpen()

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:uppercase focus:tracking-wide focus:text-primary-foreground"
      >
        Skip to main content
      </a>
      <SiteHeader linesOpen={linesOpen} />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <SiteFooter />
    </div>
  )
}
