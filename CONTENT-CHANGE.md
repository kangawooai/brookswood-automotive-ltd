## Proposed Changes

- **Email all form submissions** to `info@brookswoodautomotive.co.uk` via Brevo SMTP, covering the contact form, multi-step booking form, and MOT landing page quote form
- **Post all form submissions** to your Zapier webhook (securely stored 🔒)
- **Include the GCLID** in every form payload, passed through to both the email and Zapier webhook
- **Loud error logging** if the webhook fails, email always sends regardless
- All forms covered via the shared `/api/submit-form` route in a single build

**Estimated cost: £1.40 – £3.60**

Click **Accept Plan** to get started, or **Amend Plan** to make changes.