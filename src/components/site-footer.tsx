import Link from 'next/link'
import Image from 'next/image'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import { SITE, SERVICES } from '@/lib/site'

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
              className="h-11 w-auto"
            />
            <p className="text-sm text-white/70">
              Trading as {SITE.tradingName}. Trusted MOT, servicing and repairs in Fareham with over{' '}
              {SITE.yearsExperience} years of experience.
            </p>
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
          <nav className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <Link href="/cookie-policy" className="hover:text-primary">
              Cookie Policy
            </Link>
            <Link href="/privacy-policy" className="hover:text-primary">
              Privacy Policy
            </Link>
            <Link href="/terms-and-conditions" className="hover:text-primary">
              Terms
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}
