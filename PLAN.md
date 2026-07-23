# Build Plan — Brookswood Automotive LTD

**Design style:** Bold Industrial (automotive services). Strength, high-contrast colour blocks,
heavy headings, chunky squared buttons, dark secondary CTA sections, red `#CC0100` primary +
cyan `#00cbcc` accent on a light base.

## Business facts (source of truth)
- Trading as **Fareham MOT Centre**; 20+ years experience. 5.0★ from 71 Google reviews (aggregate only — no
  individual review text, so NO fabricated testimonial cards).
- Phone 01329 756796 → tel `+441329756796`, display `01329 756796`.
- Email info@brookswoodautomotive.co.uk · 4-6 Hackett Way, Fareham PO14 1AJ · Reg 14569886.
- Hours Mon–Fri 08:30–17:30, Sat 09:00–13:00, Sun closed.

## Page structure & hierarchy

### Top-level nav
- **Home** `/`
- **Our Services** `/our-services` (dropdown → all service children below)
- **About Us** `/about-us`
- **Contact** `/contact`
- CTA button: "Book Now" (→ /contact) + phone. (No duplicate Quote link in nav.)

### Services index `/our-services` → child service pages (dropdown entries)
Each child: hero (service image bg), intro, what's included, process, why-us, related, CTA + form link.
1. MOT Testing — `/services/mot-testing`
2. Car Servicing — `/services/car-servicing`
3. Brakes — `/services/brakes`
4. Suspension & Steering — `/services/suspension-steering`
5. Exhausts — `/services/exhausts`
6. Clutches — `/services/clutches`
7. Diagnostics — `/services/diagnostics`
8. Tyres — `/services/tyres`
9. Wheel Alignment — `/services/wheel-alignment` (SEO: vol 20)
10. Alloy Wheel Repair — `/services/alloy-wheel-repair` (SEO: vol 90)
11. Car Body Repair — `/services/car-body-repair` (SEO: vol 70)

### Landing page (standalone, own layout, NO site header/footer)
- **MOT Fareham** `/mot-fareham` — anchor-nav header, call + form CTAs only, no email shown, FAQ, own minimal footer.

### Legal / utility
- `/privacy-policy`, `/cookie-policy`, `/terms-and-conditions`, `/imprint`, `/thank-you`

### Sitemap duplicates → redirects (keeps the route, avoids duplicate content)
- `/home` → `/`  ·  `/about` → `/about-us`  ·  `/services` → `/our-services`
- `/null` — junk slug, not built.

## UX patterns (from Mobbin — structure only, not visuals)
- **Home order:** hero (headline + trust stat + dual CTA call/book) → trust/stat bar → services grid (icon tiles,
  Care.com/Airtasker pattern) → why-choose split → process steps → about teaser → FAQ → contact/CTA band.
- **Quote/booking form** sits beside hero content on contact & landing (Deel/Expedia/Fresha split pattern);
  fields Name, Email, Phone, Postcode + Service select + message; consent line (Selfridges).
- **Service pages:** hero → included checklist → numbered process → related services → CTA band.
- **CTA placement:** sticky-ish header CTA, hero primary CTA, end-of-section band, mobile tap-to-call.
- Form posts to `/api/submit-form` → Zapier + Meta CAPI Lead → redirect `/thank-you`.

## Tech checklist
- Security headers in next.config.ts; Image LCP hero via next/image OR bg-image per rules (heroes use bg-image
  with dark overlay per CLAUDE.md image rules).
- Meta CAPI server-side (meta-capi.ts, middleware.ts edge-safe Web Crypto, /api/submit-form).
- JSON-LD: LocalBusiness+WebSite (root), WebPage+Breadcrumb (all), Service (services), FAQPage (FAQ),
  AggregateRating (5.0/71), ContactPage, AboutPage.
- sitemap.ts, robots.txt, llms.txt, canonicals, hreflang en-GB, OG images, favicon, cookie consent (Consent Mode v2).
