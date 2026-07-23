import Link from 'next/link'
import Image from 'next/image'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import { SITE, SERVICES } from '@/lib/site'

const companyLinks = [
  { label: 'Our Services', href: '/our-services' },
  { label: 'About Us', href: '/about-us' },
  { label: 'Contact', href: '/contact' },
  { label: 'Terms & Conditions', href: '/terms-and-conditions' },
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Cookie Policy', href: '/cookie-policy' },
]

const legalLinks = [
  { label: 'Cookie Policy', href: '/cookie-policy' },
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms', href: '/terms-and-conditions' },
]

export function SiteFooter() {
  return (
    <footer className="border-t-4 border-primary bg-secondary text-secondary-foreground">
      <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.02]">
          {/* Main grid: brand, services, company, contact */}
          <div className="grid grid-cols-1 gap-10 border-b border-white/10 p-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8 lg:p-8">
            {/* Brand */}
            <div className="space-y-4">
              <Image
                src="/images/logo.webp"
                alt={`${SITE.name} logo`}
                width={180}
                height={48}
                className="h-11 w-auto brightness-0 invert"
              />
              <p className="text-sm leading-relaxed text-white/70">
                Trading as {SITE.tradingName}. Trusted MOT, servicing and repairs in Fareham with over{' '}
                {SITE.yearsExperience} years of experience.
              </p>
            </div>

            {/* Services */}
            <div>
              <h2 className="mb-4 text-xs font-semibold uppercase tracking-wider text-white">Services</h2>
              <ul className="space-y-2.5 text-sm">
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
              <h2 className="mb-4 text-xs font-semibold uppercase tracking-wider text-white">Company</h2>
              <ul className="space-y-2.5 text-sm">
                {companyLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-white/70 transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h2 className="mb-4 text-xs font-semibold uppercase tracking-wider text-white">Get in Touch</h2>
              <ul className="space-y-3 text-sm text-white/70">
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
                  <span>{SITE.address.full}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="size-4 shrink-0 text-primary" />
                  <a href={`tel:${SITE.phoneHref}`} className="transition-colors hover:text-primary">
                    {SITE.phoneDisplay}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="size-4 shrink-0 text-primary" />
                  <a href={`mailto:${SITE.email}`} className="break-all transition-colors hover:text-primary">
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

          {/* Bottom bar: copyright + legal nav */}
          <div className="flex flex-col gap-2 px-6 py-5 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between lg:px-8">
            <p>
              © {new Date().getFullYear()} {SITE.name}. All rights reserved. Company Reg No. {SITE.companyReg}.
            </p>
            <nav className="flex flex-wrap items-center gap-x-4 gap-y-1">
              {legalLinks.map((link) => (
                <Link key={link.href} href={link.href} className="transition-colors hover:text-primary">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  )
}
