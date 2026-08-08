import { connection } from 'next/server'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { getLinesOpen } from '@/lib/lines-open'

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  // Opt into dynamic rendering so the phone-line status is evaluated fresh on
  // every request (no stale build-time value, no client-side flicker).
  await connection()
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
