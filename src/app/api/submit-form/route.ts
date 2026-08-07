import { NextRequest, NextResponse } from 'next/server'
import { sendEvent, hashUserData, generateEventId } from '@/lib/meta-capi'
import nodemailer from 'nodemailer'

// Node runtime — access to full request context. Forwards to Zapier + Meta CAPI
// and sends an email notification via Brevo SMTP (from kangawoo).
export const runtime = 'nodejs'

const escapeHtml = (s: string) =>
  s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c] as string))

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

  // 3. Email the enquiry via Brevo SMTP (from kangawoo). Awaited so the
  //    serverless function doesn't freeze before the mail is sent; wrapped so a
  //    mail failure never fails the customer's submission.
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env
  if (SMTP_HOST && SMTP_USER && SMTP_PASS) {
    try {
      const transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: Number(SMTP_PORT) || 587,
        secure: Number(SMTP_PORT) === 465,
        auth: { user: SMTP_USER, pass: SMTP_PASS },
      })
      const to = process.env.CONTACT_TO_EMAIL || 'info@brookswoodautomotive.co.uk'
      const fromEmail = process.env.SMTP_FROM || 'noreply@kangawoo.ai'
      const fromName = process.env.SMTP_FROM_NAME || 'Brookswood Automotive'
      const rows = allFields
        .split('\n')
        .map(line => {
          const i = line.indexOf(':')
          const k = i >= 0 ? line.slice(0, i) : line
          const v = i >= 0 ? line.slice(i + 1).trim() : ''
          return `<tr><td style="padding:6px 14px 6px 0;color:#888;white-space:nowrap;vertical-align:top;">${escapeHtml(k)}</td><td style="padding:6px 0;">${escapeHtml(v)}</td></tr>`
        })
        .join('')
      await transporter.sendMail({
        from: `${fromName} <${fromEmail}>`,
        to,
        ...(email ? { replyTo: `${name || 'Website enquiry'} <${email}>` } : {}),
        subject: `${isPartial ? 'Partial enquiry' : 'New enquiry'} — Brookswood Automotive website`,
        text: `New ${isPartial ? 'PARTIAL ' : ''}enquiry from the website:\n\n${allFields}`,
        html: `<div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#222;line-height:1.5;">
  <h2 style="margin:0 0 12px;font-size:18px;">New ${isPartial ? 'partial ' : ''}enquiry</h2>
  <table style="border-collapse:collapse;">${rows}</table>
  <p style="color:#aaa;font-size:12px;margin-top:18px;">Sent automatically from the Brookswood Automotive website.</p>
</div>`,
      })
    } catch (e) {
      // Never fail the customer's submission because email is down.
      console.error('Email send failed:', e)
    }
  }

  return NextResponse.json({ ok: true })
}
