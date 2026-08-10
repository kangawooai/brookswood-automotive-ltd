import Image from 'next/image'
import { Award, BadgePoundSterling, ShieldCheck, Star } from 'lucide-react'
import { SectionHeading } from '@/components/blocks'
import { SITE } from '@/lib/site'
import { getPlaceData } from '@/lib/google-reviews'

/** The multi-colour Google "G" logo (server-renderable). */
function GoogleG({ className = 'size-6' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden focusable="false">
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
      />
      <path
        fill="#FBBC05"
        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
      />
    </svg>
  )
}

const POINTS = [
  {
    icon: Award,
    title: `${SITE.yearsExperience} Years' Experience`,
    text: 'Two decades keeping Fareham and Hampshire drivers safely on the road.',
  },
  {
    icon: ShieldCheck,
    title: 'Honest Advice',
    text: 'We explain what your car needs, and what it doesn’t, before any work begins.',
  },
  {
    icon: BadgePoundSterling,
    title: 'Transparent Pricing',
    text: 'Clear, upfront quotes with no hidden extras and no surprise bills.',
  },
  {
    icon: Star,
    title: '5-Star Rated',
    text: 'Consistently rated five stars by local drivers on Google.',
  },
]

/**
 * "Why Choose Us" section for service pages, four key trust points and the
 * team photo, with a compact Google-branded star rating badge as the social
 * proof (in place of a full reviews carousel).
 */
export async function WhyChooseSection() {
  const { rating } = await getPlaceData()

  return (
    <section className="bg-muted py-20 md:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        {/* Team photo */}
        <div className="relative aspect-[4/3] overflow-hidden border border-border shadow-sm lg:aspect-square">
          <Image
            src="/images/team-jay-thom.webp"
            alt="The Brookswood Automotive team at their Fareham garage"
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover"
          />
        </div>

        {/* Trust points + Google rating */}
        <div>
          <SectionHeading
            eyebrow="Why Choose Us"
            title="The Trusted Choice in Fareham"
          />
          <p className="mt-6 text-lg text-muted-foreground">
            When you book with Brookswood Automotive you get quality workmanship, a fair price
            and a team that treats your car as if it were their own.
          </p>

          <ul className="mt-8 grid gap-6 sm:grid-cols-2">
            {POINTS.map((point) => (
              <li key={point.title} className="flex items-start gap-4">
                <span className="mt-0.5 flex size-11 shrink-0 items-center justify-center bg-primary text-primary-foreground">
                  <point.icon className="size-5" strokeWidth={2.25} />
                </span>
                <span>
                  <span className="block font-bold uppercase tracking-tight text-foreground">
                    {point.title}
                  </span>
                  <span className="mt-1 block text-sm text-muted-foreground">{point.text}</span>
                </span>
              </li>
            ))}
          </ul>

          {/* Compact Google rating badge */}
          <div className="mt-8 inline-flex items-center gap-4 rounded-2xl border border-border bg-card px-5 py-4 shadow-sm">
            <GoogleG className="size-8 shrink-0" />
            <span className="flex flex-col">
              <span className="flex items-center gap-2">
                <span className="text-2xl font-black leading-none text-foreground">
                  {rating.value}
                </span>
                <span className="flex items-center gap-0.5" role="img" aria-label={`Rated ${rating.value} out of 5`}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} aria-hidden className="size-4 fill-[#fbbc05] text-[#fbbc05]" />
                  ))}
                </span>
              </span>
              <span className="mt-1 text-sm font-semibold text-muted-foreground">
                {rating.count != null ? `${rating.count} Google reviews` : 'Rated on Google'}
              </span>
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
