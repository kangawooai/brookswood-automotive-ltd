import { NextRequest, NextResponse } from 'next/server'
import { sendEvent, generateFbp, extractFbc, generateEventId } from '@/lib/meta-capi'

export const config = {
  // Run on all pages except API routes, Next internals and static files.
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|images|robots.txt|llms.txt|sitemap.xml).*)'],
}

export function middleware(request: NextRequest) {
  const response = NextResponse.next()
  const now = Date.now()

  // First-party _fbp cookie.
  let fbp = request.cookies.get('_fbp')?.value
  if (!fbp) {
    fbp = generateFbp(now)
    response.cookies.set('_fbp', fbp, {
      maxAge: 60 * 60 * 24 * 90,
      path: '/',
      sameSite: 'lax',
    })
  }

  // Capture fbclid into a first-party _fbc cookie.
  let fbc = request.cookies.get('_fbc')?.value ?? null
  const fbclid = request.nextUrl.searchParams.get('fbclid')
  if (fbclid) {
    fbc = extractFbc(fbclid, now)
    response.cookies.set('_fbc', fbc, {
      maxAge: 60 * 60 * 24 * 90,
      path: '/',
      sameSite: 'lax',
    })
  }

  // Fire a server-side PageView (fire-and-forget — do not block the response).
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
  void sendEvent({
    eventName: 'PageView',
    eventId: generateEventId(),
    eventSourceUrl: request.nextUrl.href,
    clientIpAddress: ip,
    clientUserAgent: request.headers.get('user-agent') ?? undefined,
    fbc,
    fbp,
  })

  return response
}
