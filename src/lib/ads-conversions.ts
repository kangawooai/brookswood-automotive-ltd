// Per-form Google Ads conversion firing (code-based gtag `send_to`).
//
// To see conversions split by form IN Google Ads you need a SEPARATE conversion action per
// form; each gives a `send_to` value ("AW-XXXXXXXXX/label"). Set those as env vars below and the
// matching form fires its own conversion. Until a form's send_to is set this is a NO-OP, so the
// code can ship ahead of the Prospr Ads account creating the actions — nothing fires, and there's
// no double-count with the existing GTM Google Ads tag. (When you go live with gtag, remove the
// Google Ads conversion tag from the GTM container so the conversion isn't counted twice.)
//
// NEXT_PUBLIC_* vars are inlined at build time, so setting them requires a redeploy to take effect.

const SEND_TO: Record<string, string | undefined> = {
  booking_form: process.env.NEXT_PUBLIC_GADS_SEND_TO_BOOKING,
  // Optional: give the abandoned-booking partial its own (ideally Secondary) conversion action.
  // Falls back to the booking action if this isn't set.
  booking_form_partial: process.env.NEXT_PUBLIC_GADS_SEND_TO_BOOKING_PARTIAL,
  contact_form: process.env.NEXT_PUBLIC_GADS_SEND_TO_CONTACT,
  callback_form: process.env.NEXT_PUBLIC_GADS_SEND_TO_CALLBACK,
  mot_landing_form: process.env.NEXT_PUBLIC_GADS_SEND_TO_MOT,
}

/**
 * Fire the Google Ads conversion for a given form. No-op when the form's send_to isn't configured
 * or gtag hasn't loaded (both true until NEXT_PUBLIC_GOOGLE_ADS_ID + the send_to vars are set).
 */
export function fireAdsConversion(
  formId: string,
  opts?: { value?: number; leadType?: 'full' | 'partial' },
): void {
  if (typeof window === 'undefined') return
  const key = opts?.leadType === 'partial' ? `${formId}_partial` : formId
  const sendTo = SEND_TO[key] ?? SEND_TO[formId]
  if (!sendTo) return // form's conversion action not wired yet → do nothing
  const w = window as unknown as { gtag?: (...args: unknown[]) => void }
  if (typeof w.gtag !== 'function') return
  w.gtag('event', 'conversion', {
    send_to: sendTo,
    value: opts?.value ?? 1.0,
    currency: 'GBP',
  })
}
