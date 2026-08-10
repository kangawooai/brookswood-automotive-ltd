## Proposed Changes

- **Add bfcache-friendly cache headers** — adjust the server response headers so the homepage and key pages don't send `Cache-Control: no-store`, allowing browsers to use the fast back/forward cache
- **Lazy-load the cookie consent & tracking scripts** — defer GTM and the cookie banner until after the page is interactive, reducing script evaluation on first load
- **Code-split the booking modal** — the booking form JS is currently loaded on every page even if the modal is never opened; load it only when the visitor clicks "Book Now"
- **Defer the Framer Motion animation library** — the FAQ accordion uses `motion/react` (Framer Motion) which adds to parse/compile time; switch to a CSS-only accordion or lazy-load it
- **Optimise the reviews client component** — move more of the reviews rendering server-side to cut the JS sent to the browser

**Estimated cost: £4.50 – £9.80**

---

It's worth noting that some of the main-thread time (the "Not actionable" bfcache items and some script evaluation) comes from **third-party scripts like GTM and Google Maps** — those are outside our control, but the changes above will meaningfully reduce what *we* control.

Since each update has a one-off setup cost, you'll get more value bundling these together — anything else you'd like sorted at the same time?