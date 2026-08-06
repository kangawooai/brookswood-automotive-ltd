import * as React from 'react'
import type { LucideProps } from 'lucide-react'

/**
 * MOT Testing icon — the official MOT test-station "three triangles" mark,
 * supplied by the customer. Rendered as a filled icon using `currentColor`, so
 * the service card's colour treatment applies (primary by default, white on
 * hover) with no hardcoded colours.
 */
export const MotIcon = React.forwardRef<SVGSVGElement, LucideProps>(
  (
    {
      color = 'currentColor',
      size = 24,
      // Accepted for API parity with Lucide icons; this is a filled mark, so
      // stroke-related props do not apply.
      strokeWidth: _strokeWidth,
      absoluteStrokeWidth: _absoluteStrokeWidth,
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
      viewBox="0 0 85.539 74.176"
      fill={color}
      stroke="none"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M42.68,48.609L32.234,66.793h21.07L42.68,48.609z M51.5,33.309h20.887L61.945,15.48L51.5,33.309z M23.586,16.742l-9.727,16.566h20.172l-9.902-16.93L23.586,16.742z M42.859,33.309L23.586,0L0,40.863h38.352L18.91,74.176h47.719L47.176,40.863h38.363L61.945,0L42.68,33.129L42.859,33.309z"
      />
    </svg>
  ),
)

MotIcon.displayName = 'MotIcon'
