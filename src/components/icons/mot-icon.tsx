import * as React from 'react'
import type { LucideProps } from 'lucide-react'

/**
 * Purpose-built MOT Testing icon: a front-view car paired with a
 * certification check badge — i.e. "vehicle passed its test". Replaces the
 * generic speedometer (Gauge) previously used on the MOT Testing service card.
 *
 * Authored to match Lucide's stroke conventions so it sits alongside the other
 * service icons. Uses `currentColor`, so the card's colour treatment applies
 * (primary by default, white on hover) with no hardcoded colours.
 */
export const MotIcon = React.forwardRef<SVGSVGElement, LucideProps>(
  (
    {
      color = 'currentColor',
      size = 24,
      strokeWidth = 2,
      absoluteStrokeWidth,
      className,
      ...props
    },
    ref,
  ) => (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      {/* Front-view car, scaled and shifted to the lower-left. Stroke width is
          pre-compensated for the 0.62 scale so it matches the badge. */}
      <g transform="translate(-0.36 6.9) scale(0.62)" strokeWidth={Number(strokeWidth) / 0.62}>
        <path d="m21 8-2 2-1.5-3.7A2 2 0 0 0 15.646 5H8.4a2 2 0 0 0-1.903 1.257L5 10 3 8" />
        <path d="M7 14h.01" />
        <path d="M17 14h.01" />
        <rect width="18" height="8" x="3" y="10" rx="2" />
        <path d="M5 18v2" />
        <path d="M19 18v2" />
      </g>
      {/* Certification check badge, upper-right. */}
      <circle cx="17.5" cy="6" r="4.5" />
      <path d="m15.4 6.1 1.4 1.4 3-3.2" />
    </svg>
  ),
)

MotIcon.displayName = 'MotIcon'
