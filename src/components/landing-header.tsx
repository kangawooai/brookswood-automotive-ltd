'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Menu, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { SITE } from '@/lib/site'

const ANCHORS = [
  { label: 'Services', href: '#services' },
  { label: 'Why Us', href: '#why' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'FAQs', href: '#faq' },
  { label: 'Contact', href: '#contact' },
]

export function LandingHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Logo, not linked on a landing page */}
        <span className="flex shrink-0 items-center">
          <Image
            src="/images/logo.webp"
            alt={`${SITE.name} logo`}
            width={180}
            height={48}
            className="h-10 w-auto"
            priority
          />
        </span>

        {/* Desktop anchor nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {ANCHORS.map((a) => (
            <a
              key={a.href}
              href={a.href}
              className="px-3 py-2 text-sm font-semibold uppercase tracking-wide text-foreground transition-colors hover:text-primary"
            >
              {a.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA, call only */}
        <div className="hidden lg:flex">
          <Button asChild className="font-bold uppercase tracking-wide">
            <a href={`tel:${SITE.phoneHref}`}>
              <Phone /> {SITE.phoneDisplay}
            </a>
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
                {ANCHORS.map((a) => (
                  <a
                    key={a.href}
                    href={a.href}
                    onClick={() => setOpen(false)}
                    className="py-3 text-base font-semibold uppercase tracking-wide"
                  >
                    {a.label}
                  </a>
                ))}
              </nav>
              <div className="mt-6 border-t border-border pt-6">
                <Button asChild className="w-full font-bold uppercase tracking-wide">
                  <a href={`tel:${SITE.phoneHref}`}>
                    <Phone /> {SITE.phoneDisplay}
                  </a>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
