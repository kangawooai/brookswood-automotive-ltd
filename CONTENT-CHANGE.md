## Proposed Changes

- Fix the status light on the opening hours banner so it sits **below** the services dropdown (correct the z-index layering)
- Update all forms (contact form, booking form, MOT landing page form) to fire a `generate_lead` dataLayer event with a **`form_id`** field (e.g. `"contact_form"`, `"booking_form"`, `"mot_landing_form"`) so you can distinguish them in GA4/GTM
- Replace the `/thank-you` page redirect with a clean **inline success message** shown on the same page after submission — so the form context is preserved and you don't lose the referral/UTM data on the redirect
- Keep the existing `/thank-you` page as a fallback for direct links

**Estimated cost: £2.65 – £5.50**

Since each update has a one-off setup cost, you'll get more for your money if we do a few tweaks together — anything else you'd like sorted while we're at it?