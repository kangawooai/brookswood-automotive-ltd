// Meta Conversions API (server-side). Edge-runtime safe — uses Web Crypto only.
// No Node.js `crypto` import here because this module is used by middleware (Edge Runtime).

const GRAPH_VERSION = 'v21.0'

function toHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

/** SHA-256 hash a normalised string. Returns lowercase hex. */
export async function sha256(value: string): Promise<string> {
  const data = new TextEncoder().encode(value)
  const digest = await crypto.subtle.digest('SHA-256', data)
  return toHex(digest)
}

type RawUserData = {
  email?: string | null
  phone?: string | null
  firstName?: string | null
  lastName?: string | null
  postcode?: string | null
  city?: string | null
}

export type HashedUserData = {
  em?: string[]
  ph?: string[]
  fn?: string[]
  ln?: string[]
  zp?: string[]
  ct?: string[]
}

/** Normalise + SHA-256 hash all PII fields per Meta's requirements. */
export async function hashUserData(raw: RawUserData): Promise<HashedUserData> {
  const out: HashedUserData = {}
  const norm = (s: string) => s.trim().toLowerCase()

  if (raw.email) out.em = [await sha256(norm(raw.email))]
  if (raw.phone) {
    // Strip everything but digits; keep leading country code if present.
    const digits = raw.phone.replace(/[^\d]/g, '')
    if (digits) out.ph = [await sha256(digits)]
  }
  if (raw.firstName) out.fn = [await sha256(norm(raw.firstName))]
  if (raw.lastName) out.ln = [await sha256(norm(raw.lastName))]
  if (raw.postcode) out.zp = [await sha256(norm(raw.postcode).replace(/\s/g, ''))]
  if (raw.city) out.ct = [await sha256(norm(raw.city).replace(/\s/g, ''))]
  return out
}

/** Random event id for deduplication. */
export function generateEventId(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(16))
  return toHex(bytes.buffer)
}

/** Generate a first-party _fbp cookie value: fb.1.{timestamp}.{random}. */
export function generateFbp(timestamp: number): string {
  const bytes = crypto.getRandomValues(new Uint8Array(8))
  const rand = Array.from(bytes)
    .map((b) => b % 10)
    .join('')
  return `fb.1.${timestamp}.${rand}`
}

/** Build an _fbc value from an fbclid query param. */
export function extractFbc(fbclid: string, timestamp: number): string {
  return `fb.1.${timestamp}.${fbclid}`
}

type SendEventArgs = {
  eventName: string
  eventId?: string
  eventSourceUrl?: string
  actionSource?: 'website' | 'system_generated'
  userData?: HashedUserData
  clientIpAddress?: string
  clientUserAgent?: string
  fbc?: string | null
  fbp?: string | null
  customData?: Record<string, unknown>
}

/** Send a single event to Meta's Conversions API. Fire-and-forget friendly. */
export async function sendEvent(args: SendEventArgs): Promise<void> {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID
  const token = process.env.META_CAPI_ACCESS_TOKEN
  if (!pixelId || !token) return // Not configured — silently skip.

  const userData: Record<string, unknown> = { ...(args.userData ?? {}) }
  if (args.clientIpAddress) userData.client_ip_address = args.clientIpAddress
  if (args.clientUserAgent) userData.client_user_agent = args.clientUserAgent
  if (args.fbc) userData.fbc = args.fbc
  if (args.fbp) userData.fbp = args.fbp

  const body = {
    data: [
      {
        event_name: args.eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_id: args.eventId ?? generateEventId(),
        event_source_url: args.eventSourceUrl,
        action_source: args.actionSource ?? 'website',
        user_data: userData,
        custom_data: args.customData,
      },
    ],
  }

  try {
    await fetch(`https://graph.facebook.com/${GRAPH_VERSION}/${pixelId}/events?access_token=${token}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
  } catch {
    // Never let tracking failures break the request.
  }
}
