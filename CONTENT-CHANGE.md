## Proposed Changes

**1.4 – Fix schema geo coordinates**
- Update the structured data to use the correct PO14 1AJ centroid coordinates (50.840335, -1.184461) to accurately represent your location

**1.2 – Fix opening hours banner timezone**
- Move the "Lines open/closed" calculation to the client side so it uses the visitor's own clock (Europe/London time), fixing the BST hour-out error during your busiest call window

**1.5 – Resolve MOT page SEO clash**
- Add `noindex, follow` to `/mot-fareham` (it has a stripped nav so it's clearly the paid landing page) and remove it from the sitemap — keeping `/services/mot-testing` as the organic page

**1.6 – Fix review count mismatch**
- Remove the hardcoded `count: 71` from the config object and rely solely on the live Google Places API figure, so the count shown in the badge, schema and everywhere else always matches reality (currently shows 73 in two places, 71 in another)
- Note: the attribution errors (Steven Smith / Kevin Mackenzie, Rick B, Bonnie Heard) need you to verify against your actual Google Business Profile — once you confirm the correct names/text, we can update the fallback reviews array to match verbatim

**2.2 – Strengthen privacy & cookie policies**
- Privacy policy: add retention periods, name third-party processors (Meta, Google, Vercel), add Meta pixel/CAPI mention, add US international transfer disclosure, expand rights section
- Cookie policy: add a named cookie table listing `_fbp`, `cookie_consent`, GTM cookies — with purpose and duration for each

**2.3 – Convert duplicate pages to 301 redirects**
- `/services` → 301 redirect to `/our-services`
- `/about` → 301 redirect to `/about-us`

**2.4 – Accessibility fixes**
- Add a "Skip to main content" link (WCAG 2.4.1 Level A)
- Add `autocomplete` attributes to all form fields: `name`, `tel`, `email`, `postal-code` (note: the booking form already has these on some fields — we'll audit and complete all forms)

**2.5 – Meta tag cleanup**
- Trim title tags over ~60 characters, prioritising `/services/air-conditioning-regas` (currently 76 chars)
- Trim homepage meta description from 176 to ~155 characters
- Fix the doubled brand suffix on `/thank-you` (`"Thank You | Brookswood Automotive | Brookswood Automotive"`)

---

A couple of things to flag before we go ahead:

- **Review attributions (1.6):** Please check your Google Business Profile and confirm the correct customer name for the headlight condensation review (currently showing as "Steven Smith" on site), and whether "Rick B" and "Bonnie Heard" reviews are verbatim. Once you confirm, we can correct the fallback data in the same build.
- **Geo coordinates (1.4):** For maximum accuracy, you can drop a pin on your exact unit at 4-6 Hackett Way in Google Maps and share the coordinates from the URL — otherwise we'll use the PO14 1AJ centroid (50.840335, -1.184461) which is already much better than what's there now.

**Estimated cost: £3.50 – £7.50**