## Proposed Changes

- **Convert the "Book Now" header button** to open a **modal overlay** (rather than navigating to `/contact`) — so the visitor never leaves the page they're on
- **Build a new 5-step modal booking form** inside that modal, matching the visual style of your existing service-page multi-step form, with these steps:
  - **Step 1 — Your Details:** Name + phone (partial lead captured here if they leave)
  - **Step 2 — Your Vehicle:** Registration plate + primary service selection
  - **Step 3 — Additional Services:** A clear "Would you like to add any other services?" multi-select (e.g. checkboxes for Brakes, Tyres, Diagnostics etc.) — skippable
  - **Step 4 — When:** Preferred date, morning/afternoon toggle, and optional message
  - **Step 5 — Almost done:** Email + postcode, then submit
- **Partial lead capture** — same `pagehide`/`visibilitychange` beacon logic as the service-page form: if a visitor completes Step 1 (name + phone) and then closes the modal or navigates away, their details are sent silently to `/api/submit-form` as a `partial` lead
- **On success**, redirect to `/thank-you` (same as the rest of the site)
- **Progress bar + step indicators** matching the existing booking form style
- **Modal closes** with an × button or by clicking the backdrop, and reopens cleanly with progress reset

**Estimated cost: £2.20 – £5.40**

Since each update has a one-off setup cost, you'll get more value by bundling a few more tweaks into this same build — anything else you'd like sorted at the same time?