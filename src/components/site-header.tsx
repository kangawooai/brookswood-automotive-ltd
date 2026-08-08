'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, Phone, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { BookingModal } from '@/components/booking-modal'
import { SITE, SERVICES } from '@/lib/site'
import { getLinesOpen } from '@/lib/lines-open'

export function SiteHeader({ linesOpen: initialLinesOpen = false }: { linesOpen?: boolean }) {
  const [open, setOpen] = useState(false)
  const [bookingOpen, setBookingOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  // The open/closed status is re-evaluated on the client against the visitor's
  // own clock (in Europe/London time) so it's always correct — including across
  // the BST/GMT switch — regardless of the server's timezone or edge caching.
  // The server-computed value seeds the first paint to avoid any flicker.
  const [linesOpen, setLinesOpen] = useState(initialLinesOpen)
  useEffect(() => {
    const update = () => setLinesOpen(getLinesOpen())
    update()
    const id = setInterval(update, 60_000)
    return () => clearInterval(id)
  }, [])
  const pathname = usePathname()
  const isHome = pathname === '/'
  // On the home page, mobile logo/icon hovers use the cyan accent instead of the
  // default (which tints towards the dark accent-foreground green).
  const cyanHover = isHome ? 'group transition-colors hover:bg-accent/10 hover:text-accent' : ''
  const cyanIcon = isHome ? 'transition-colors group-hover:text-accent' : ''

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className={`flex shrink-0 items-center ${isHome ? 'transition-opacity hover:opacity-80' : ''}`}
          aria-label={`${SITE.name} home`}
        >
          <Image
            src="/images/logo.webp"
            alt={`${SITE.name} logo`}
            width={180}
            height={48}
            className="h-10 w-auto"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          <Link
            href="/"
            className="px-3 py-2 text-sm font-semibold uppercase tracking-wide text-foreground transition-colors hover:text-primary"
          >
            Home
          </Link>

          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <Link
              href="/our-services"
              className="flex items-center gap-1 px-3 py-2 text-sm font-semibold uppercase tracking-wide text-foreground transition-colors hover:text-primary"
            >
              Our Services
              <ChevronDown className="size-4" />
            </Link>
            {servicesOpen && (
              <div className="absolute left-0 top-full w-64 border border-border bg-card p-2 shadow-lg">
                {SERVICES.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/services/${s.slug}`}
                    className="block border-l-2 border-transparent px-3 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary hover:bg-muted hover:text-primary"
                  >
                    {s.nav}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/about-us"
            className="px-3 py-2 text-sm font-semibold uppercase tracking-wide text-foreground transition-colors hover:text-primary"
          >
            About Us
          </Link>
          <Link
            href="/contact"
            className="px-3 py-2 text-sm font-semibold uppercase tracking-wide text-foreground transition-colors hover:text-primary"
          >
            Contact
          </Link>
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={`tel:${SITE.phoneHref}`}
            className="flex items-center gap-2 text-sm font-bold text-foreground transition-colors hover:text-primary"
          >
            <Phone className="size-4 text-primary" />
            {SITE.phoneDisplay}
          </a>
          <Button
            onClick={() => setBookingOpen(true)}
            className="font-bold uppercase tracking-wide"
          >
            Book Now
          </Button>
        </div>

        {/* Mobile */}
        <div className="flex items-center gap-2 lg:hidden">
          <Button asChild size="icon" variant="ghost" aria-label="Call us" className={cyanHover}>
            <a href={`tel:${SITE.phoneHref}`}>
              <Phone className={`size-5 text-primary ${cyanIcon}`} />
            </a>
          </Button>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" aria-label="Open menu" className={cyanHover}>
                <Menu className={`size-5 ${cyanIcon}`} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-sm px-6 pt-6">
              <SheetTitle className="sr-only">Navigation menu</SheetTitle>
              <div className="mb-6 flex items-center">
                <Image
                  src="/images/logo.webp"
                  alt={`${SITE.name} logo`}
                  width={160}
                  height={42}
                  className="h-9 w-auto"
                />
              </div>
              <nav className="flex flex-col gap-1">
                <Link
                  href="/"
                  onClick={() => setOpen(false)}
                  className="py-3 text-base font-semibold uppercase tracking-wide"
                >
                  Home
                </Link>
                <Accordion type="single" collapsible>
                  <AccordionItem value="services" className="border-none">
                    <AccordionTrigger className="py-3 text-base font-semibold uppercase tracking-wide hover:no-underline">
                      Our Services
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-col">
                        <Link
                          href="/our-services"
                          onClick={() => setOpen(false)}
                          className="border-l-2 border-primary py-2 pl-4 text-sm font-semibold text-primary"
                        >
                          All Services
                        </Link>
                        {SERVICES.map((s) => (
                          <Link
                            key={s.slug}
                            href={`/services/${s.slug}`}
                            onClick={() => setOpen(false)}
                            className="border-l-2 border-border py-2 pl-4 text-sm text-muted-foreground hover:text-primary"
                          >
                            {s.nav}
                          </Link>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                <Link
                  href="/about-us"
                  onClick={() => setOpen(false)}
                  className="py-3 text-base font-semibold uppercase tracking-wide"
                >
                  About Us
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="py-3 text-base font-semibold uppercase tracking-wide"
                >
                  Contact
                </Link>
              </nav>
              <div className="mt-6 space-y-3 border-t border-border pt-6">
                <Button
                  className="w-full font-bold uppercase tracking-wide"
                  onClick={() => {
                    setOpen(false)
                    setBookingOpen(true)
                  }}
                >
                  Book Now
                </Button>
                <a
                  href={`tel:${SITE.phoneHref}`}
                  className="flex items-center justify-center gap-2 text-sm font-bold text-foreground"
                >
                  <Phone className="size-4 text-primary" />
                  {SITE.phoneDisplay}
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Phone-line status banner — home page only. Open/closed state is
          re-evaluated on the client against the visitor's clock (UK time), so it
          stays accurate live; the server value seeds the first paint. */}
      {isHome &&
        (linesOpen ? (
          <div className="w-full bg-primary text-primary-foreground">
            <div className="mx-auto flex h-9 max-w-7xl items-center justify-center gap-2 px-4 text-xs font-bold uppercase tracking-wide sm:text-sm">
              <span className="relative flex size-2.5 shrink-0">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex size-2.5 rounded-full bg-green-400" />
              </span>
              Lines now open — call now
            </div>
          </div>
        ) : (
          <a
            href="#callback"
            className="block w-full bg-neutral-900 text-white transition-colors hover:bg-neutral-800"
          >
            <div className="mx-auto flex h-9 max-w-7xl items-center justify-center gap-2 px-4 text-xs font-bold uppercase tracking-wide sm:text-sm">
              <span className="inline-flex size-2.5 shrink-0 rounded-full bg-primary" />
              Lines closed — please enquire below
            </div>
          </a>
        ))}

      <BookingModal open={bookingOpen} onOpenChange={setBookingOpen} />
    </header>
  )
}
