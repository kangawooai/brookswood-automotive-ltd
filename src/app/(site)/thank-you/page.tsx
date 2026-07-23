import Link from 'next/link'
import type { Metadata } from 'next'
import { CheckCircle2, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SITE } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Thank You | Brookswood Automotive',
  description: 'Thank you for contacting Brookswood Automotive in Fareham. We have received your enquiry and will be in touch shortly.',
  alternates: { canonical: '/thank-you', languages: { 'en-GB': '/thank-you' } },
  robots: { index: false, follow: true },
}

export default function ThankYouPage() {
  return (
    <section className="bg-background">
      <div className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-4 py-24 text-center sm:px-6 lg:px-8">
        <span className="flex size-16 items-center justify-center bg-primary text-primary-foreground">
          <CheckCircle2 className="size-9" />
        </span>
        <h1 className="mt-8 text-4xl font-black uppercase tracking-tight text-foreground sm:text-5xl">
          Thank You
        </h1>
        <p className="mt-5 text-lg text-muted-foreground">
          We have received your enquiry and a member of the Brookswood Automotive team will be in touch as soon
          as possible. If your enquiry is urgent, please give us a call and we will help straight away.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg" className="font-bold uppercase tracking-wide">
            <a href={`tel:${SITE.phoneHref}`}>
              <Phone /> {SITE.phoneDisplay}
            </a>
          </Button>
          <Button asChild size="lg" variant="outline" className="font-bold uppercase tracking-wide">
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
