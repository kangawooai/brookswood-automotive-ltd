## Proposed Changes

- **New multistep booking form** added to all service pages, sitting above the "Our Process" section
- **4-step flow** designed for maximum conversion:
  - **Step 1 – Your Details:** Name + Phone
  - **Step 2 – Your Vehicle:** Reg plate + Service (pre-filled with the current service)
  - **Step 3 – More Info:** Preferred date, morning/afternoon preference + optional message
  - **Step 4 – Almost done!:** Email + postcode, then submit
- **Session auto-save** after every step — progress is restored if they navigate away and come back
- **Partial submission trigger** — if a user drops off mid-form (completes at least step 1), their details are sent automatically when they leave the page
- **Partial leads fire as a 0.5 conversion event** via Google Tag Manager dataLayer push
- **Full submissions fire as a 1.0 conversion event**
- All submissions (full and partial) emailed to **info@brookswoodautomotive.co.uk** and posted to your Zapier webhook
- Form heading updated from "Request a Callback" to **"Book Now"** throughout the service pages
- The existing callback form at the bottom of service pages is kept as-is

**Estimated cost: £9.50 – £18.05**