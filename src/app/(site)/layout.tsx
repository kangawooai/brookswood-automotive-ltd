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
      <SiteHeader linesOpen={linesOpen} />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  )
}
