import Link from 'next/link'
import Image from 'next/image'
import { Phone, Star, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SITE } from '@/lib/site'

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block bg-primary px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary-foreground">
      {children}
    </span>
  )
}

/** Full-bleed hero with a background image, dark overlay and white text. */
export function PageHero({
  image,
  imageAlt = '',
  eyebrow,
  title,
  subtitle,
  breadcrumb,
  children,
  compact = false,
}: {
  image: string
  imageAlt?: string
  eyebrow?: string
  title: string
  subtitle?: string
  breadcrumb?: React.ReactNode
  children?: React.ReactNode
  compact?: boolean
}) {
  return (
    <section className="relative isolate overflow-hidden">
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/45" />
      <div
        className={`relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${
          compact ? 'py-16 md:py-20' : 'py-20 md:py-28'
        }`}
      >
        <div className="max-w-2xl">
          {breadcrumb && <div className="mb-4">{breadcrumb}</div>}
          {eyebrow && (
            <span className="mb-4 inline-block bg-primary px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary-foreground">
              {eyebrow}
            </span>
          )}
          <h1 className="text-4xl font-black uppercase leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
            {title}
          </h1>
          {subtitle && <p className="mt-5 text-lg text-white/80 md:text-xl">{subtitle}</p>}
          {children}
        </div>
      </div>
    </section>
  )
}

export function HeroButtons({ bookLabel = 'Book Now' }: { bookLabel?: string }) {
  return (
    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
      <Button asChild size="lg" className="font-bold uppercase tracking-wide">
        <Link href="/contact">{bookLabel}</Link>
      </Button>
      <Button
        asChild
        size="lg"
        variant="outline"
        className="border-white/40 bg-transparent font-bold uppercase tracking-wide text-white hover:bg-white/10 hover:text-white"
      >
        <a href={`tel:${SITE.phoneHref}`}>
          <Phone /> {SITE.phoneDisplay}
        </a>
      </Button>
    </div>
  )
}

export function RatingBadge({
  light = false,
  value = SITE.rating.value,
  count = SITE.rating.count,
}: {
  light?: boolean
  value?: string
  count?: number
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="size-5 fill-[#f0a500] text-[#f0a500]" />
        ))}
      </div>
      <span className={`text-sm font-semibold ${light ? 'text-white/90' : 'text-foreground'}`}>
        {value} from {count} Google reviews
      </span>
    </div>
  )
}

/** Horizontal stat strip — Bold Industrial. Labels are <p>, not headings. */
export function TrustBar({
  items,
}: {
  items: { value: string; label: string; prefix?: string }[]
}) {
  const mdCols = items.length === 3 ? 'md:grid-cols-3' : items.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-4'
  return (
    <section className="border-y-4 border-primary bg-secondary">
      <div className={`mx-auto grid max-w-7xl grid-cols-2 divide-x divide-white/10 ${mdCols}`}>
        {items.map((item) => (
          <div key={item.label} className="px-4 py-8 text-center">
            {item.prefix && (
              <p className="text-xs font-semibold uppercase tracking-wider text-white/70 md:text-sm">
                {item.prefix}
              </p>
            )}
            <p className="text-4xl font-black text-primary md:text-5xl">{item.value}</p>
            <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-white/70 md:text-sm">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  center = false,
  light = false,
}: {
  eyebrow?: string
  title: string
  intro?: string
  center?: boolean
  light?: boolean
}) {
  return (
    <div className={`max-w-3xl ${center ? 'mx-auto text-center' : ''}`}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2
        className={`mt-4 text-3xl font-black uppercase tracking-tight md:text-4xl ${
          light ? 'text-white' : 'text-foreground'
        }`}
      >
        {title}
      </h2>
      {intro && (
        <p className={`mt-4 text-lg ${light ? 'text-white/70' : 'text-muted-foreground'}`}>{intro}</p>
      )}
    </div>
  )
}

/** Dark call-to-action band used at the bottom of most pages. */
export function CtaBand({
  title = 'Ready to book your car in?',
  text = 'Call the team or request a callback and we will get you sorted quickly, with honest advice and no surprises.',
}: {
  title?: string
  text?: string
}) {
  return (
    <section className="bg-primary">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-black uppercase tracking-tight text-primary-foreground md:text-4xl">
              {title}
            </h2>
            <p className="mt-4 text-lg text-primary-foreground/85">{text}</p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="bg-white font-bold uppercase tracking-wide text-primary hover:bg-white/90"
            >
              <a href={`tel:${SITE.phoneHref}`}>
                <Phone /> {SITE.phoneDisplay}
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/60 bg-transparent font-bold uppercase tracking-wide text-white hover:bg-white/10 hover:text-white"
            >
              <Link href="/contact">Request a Callback</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export function CheckList({
  items,
  light = false,
}: {
  items: string[]
  light?: boolean
}) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center bg-primary text-primary-foreground">
            <Check className="size-3.5" strokeWidth={3} />
          </span>
          <span className={light ? 'text-white/80' : 'text-foreground'}>{item}</span>
        </li>
      ))}
    </ul>
  )
}
