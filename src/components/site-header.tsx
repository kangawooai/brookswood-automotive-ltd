'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, Phone, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { SITE, SERVICES } from '@/lib/site'

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center" aria-label={`${SITE.name} home`}>
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
          <Button asChild className="font-bold uppercase tracking-wide">
            <Link href="/contact">Book Now</Link>
          </Button>
        </div>

        {/* Mobile */}
        <div className="flex items-center gap-2 lg:hidden">
          <Button asChild size="icon" variant="ghost" aria-label="Call us">
            <a href={`tel:${SITE.phoneHref}`}>
              <Phone className="size-5 text-primary" />
            </a>
          </Button>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" aria-label="Open menu">
                <Menu className="size-5" />
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
                <Button asChild className="w-full font-bold uppercase tracking-wide">
                  <Link href="/contact" onClick={() => setOpen(false)}>
                    Book Now
                  </Link>
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
    </header>
  )
}
