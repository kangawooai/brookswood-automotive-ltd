import Link from 'next/link'
import Image from 'next/image'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import { SITE, SERVICES } from '@/lib/site'

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
}

export function SiteFooter() {
  return (
    <footer className="border-t-4 border-primary bg-secondary text-secondary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Image
              src="/images/logo.webp"
              alt={`${SITE.name} logo`}
              width={180}
              height={48}
              className="h-11 w-auto brightness-0 invert"
            />
            <p className="text-sm text-white/70">
              Trading as {SITE.tradingName}. Trusted MOT, servicing and repairs in Fareham with over{' '}
              {SITE.yearsExperience} years of experience.
            </p>
            <div className="flex gap-3">
              <a
                href={SITE.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex size-9 items-center justify-center border border-white/20 text-white transition-colors hover:border-primary hover:bg-primary"
              >
                <FacebookIcon className="size-4" />
              </a>
              <a
                href={SITE.social.x}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
                className="flex size-9 items-center justify-center border border-white/20 text-white transition-colors hover:border-primary hover:bg-primary"
              >
                <XIcon className="size-4" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-white">Services</h2>
            <ul className="space-y-2 text-sm">
              {SERVICES.slice(0, 8).map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="text-white/70 transition-colors hover:text-primary"
                  >
                    {s.nav}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-white">Company</h2>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/our-services" className="text-white/70 transition-colors hover:text-primary">
                  Our Services
                </Link>
              </li>
              <li>
                <Link href="/about-us" className="text-white/70 transition-colors hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/70 transition-colors hover:text-primary">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/terms-and-conditions" className="text-white/70 transition-colors hover:text-primary">
                  Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-white/70 transition-colors hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/cookie-policy" className="text-white/70 transition-colors hover:text-primary">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-white">Get in Touch</h2>
            <ul className="space-y-3 text-sm text-white/70">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
                <span>{SITE.address.full}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="size-4 shrink-0 text-primary" />
                <a href={`tel:${SITE.phoneHref}`} className="hover:text-primary">
                  {SITE.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="size-4 shrink-0 text-primary" />
                <a href={`mailto:${SITE.email}`} className="break-all hover:text-primary">
                  {SITE.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 size-4 shrink-0 text-primary" />
                <span>
                  Mon–Fri: 08:30–17:30
                  <br />
                  Sat: 09:00–13:00 · Sun: Closed
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {SITE.name}. All rights reserved. Company Reg No. {SITE.companyReg}.
          </p>
          <Link href="/imprint" className="hover:text-primary">
            Imprint
          </Link>
        </div>
      </div>
    </footer>
  )
}
