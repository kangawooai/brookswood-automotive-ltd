import { NextRequest, NextResponse } from 'next/server'
import { sendEvent, hashUserData, generateEventId } from '@/lib/meta-capi'

// Node runtime — access to full request context. Forwards to Zapier + Meta CAPI.
export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  let payload: Record<string, string> = {}
  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid payload' }, { status: 400 })
  }

  const {
    name = '',
    email = '',
    phone = '',
    postcode = '',
    service = '',
    message = '',
    reg = '',
    preferredDate = '',
    timePreference = '',
    // 'partial' = booking form abandoned after step 1; 'full' = completed.
    submissionType = 'full',
    fbp = '',
    fbc = '',
    // Ad-campaign tracking params — sent as their own dedicated payload fields,
    // never mixed into `All Fields`.
    utm_source = '',
    utm_medium = '',
    utm_campaign = '',
    utm_term = '',
    utm_content = '',
    identifier = '',
    sq = '',
    loc = '',
    querystring = '',
  } = payload

  const [firstName, ...rest] = name.trim().split(/\s+/)
  const lastName = rest.join(' ')

  // Plain-text summary of ONLY user-visible form fields — no tracking data.
  const isPartial = submissionType === 'partial'
  const allFields = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone}`,
    `Postcode: ${postcode}`,
    reg ? `Registration: ${reg}` : null,
    service ? `Service: ${service}` : null,
    preferredDate ? `Preferred date: ${preferredDate}` : null,
    timePreference ? `Preferred time: ${timePreference}` : null,
    message ? `Message: ${message}` : null,
    isPartial ? 'Submission: PARTIAL (form abandoned mid-way)' : null,
  ]
    .filter(Boolean)
    .join('\n')

  // 1. Forward to the Zapier webhook (if configured).
  const webhook = process.env.ZAPIER_WEBHOOK_URL
  if (webhook) {
    try {
      await fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          Name: name,
          Email: email,
          Phone: phone,
          Postcode: postcode,
          Service: service,
          Registration: reg,
          'Preferred Date': preferredDate,
          'Preferred Time': timePreference,
          Message: message,
          'Submission Type': isPartial ? 'Partial' : 'Full',
          'Email To': 'info@brookswoodautomotive.co.uk',
          'Campaign Source': utm_source,
          'Campaign Medium': utm_medium,
          'Campaign ID': utm_campaign,
          'Campaign Term': utm_term,
          'Campaign Content': utm_content,
          Identifier: identifier,
          'Search Query': sq,
          Location: loc,
          'All Fields': allFields,
          querystring,
          submittedAt: new Date().toISOString(),
          source: 'Brookswood Automotive website',
        }),
      })
    } catch {
      // Do not fail the user's submission if the webhook is down.
    }
  }

  // 2. Fire a Lead event to Meta CAPI with hashed PII. Only full submissions
  //    count as a Lead — partials are captured via Zapier/email only.
  if (!isPartial) {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    const userData = await hashUserData({
      email,
      phone,
      firstName,
      lastName,
      postcode,
    })
    void sendEvent({
      eventName: 'Lead',
      eventId: generateEventId(),
      eventSourceUrl: request.headers.get('referer') ?? undefined,
      clientIpAddress: ip,
      clientUserAgent: request.headers.get('user-agent') ?? undefined,
      fbc: fbc || null,
      fbp: fbp || null,
      userData,
      customData: { content_name: service || 'General enquiry' },
    })
  }

  return NextResponse.json({ ok: true })
}
