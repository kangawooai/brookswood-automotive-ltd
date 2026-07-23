# Brookswood Automotive LTD — AI Build Project Brief

> This file contains all business data and content strategy from Bonza Builder.
> Use it to build out the website pages with accurate, on-brand content.

## Business Information

| Field | Value |
|-------|-------|
| **Company Name** | Brookswood Automotive LTD |
| **Domain** | mot-fareham.co.uk |
| **Phone** | 01329 756796 |
| **Email** | info@brookswoodautomotive.co.uk |
| **Contact Name** | Thomas Cullen |
| **Address** | 4-6 Hackett Way, Fareham PO14 1AJ, UK |
| **Address Line 1** | 4-6 Hackett Way |
| **City** | Fareham |
| **County** | Hampshire |
| **Post Code** | PO14 1AJ |
| **Country** | United Kingdom |
| **Business Type** | Auto Repair |
| **Opening Hours** | Monday: 08:30–17:30 · Tuesday: 08:30–17:30 · Wednesday: 08:30–17:30 · Thursday: 08:30–17:30 · Friday: 08:30–17:30 · Saturday: 09:00–13:00 · Sunday: Closed |
| **Price Range** | ££ |
| **Company Reg No** | 14569886 |


## Brand & Style

| Field | Value |
|-------|-------|
| **Brand Colour** | `#CC0100` |
| **Neutral Colour** | `#1C2024` |
| **Primary Colour** | `#CC0100` |
| **Secondary Colour** | `#00cbcc` |
| **Tertiary Colour** | `#140000` |
| **Theme Mode** | light |
| **Logo (Default)** | `public/images/logo.webp` |
| **Site Icon / Favicon** | `public/images/favicon.png` |
| **Tone of Voice** | professional |
| **Target Audience** | vehicle owners in Fareham |
| **Content Style** | Not specified |
| **Heading Font** | Rubik |
| **Body Font** | Inter |
| **Border Radius** | none |
| **Font Size** | m |
| **Line Height** | m |
| **Section Spacing** | m |



## Business Summary

Brookswood Automotive trading as Fareham MOT Centre is a trusted local garage in Fareham with over 20 years of experience in car servicing, repairs, and MOTs. They focus on providing quality workmanship, transparent pricing, and exceptional customer service. The garage is known for its honesty and commitment to customer satisfaction, reflected in its 5-star Google rating. Services include routine servicing, brakes, suspension and steering, exhausts, clutches, diagnostics, tyres, and MOTs. Brookswood Automotive offers easy booking options online or by phone, making car care convenient and accessible.



## Sitemap & Pages

### 1. MOT Fareham
- **Slug:** `/mot-fareham`
- **Type:** landing_page ⚡ LANDING PAGE

### 2. About
- **Slug:** `/about`
- **Type:** page

### 3. About Us
- **Slug:** `/about-us`
- **Type:** page

### 4. Contact
- **Slug:** `/contact`
- **Type:** page

### 5. Cookie Policy
- **Slug:** `/cookie-policy`
- **Type:** page

### 6. Home
- **Slug:** `/home`
- **Type:** page

### 7. Home
- **Slug:** `/null`
- **Type:** page

### 8. Imprint
- **Slug:** `/imprint`
- **Type:** page

### 9. Our Services
- **Slug:** `/our-services`
- **Type:** page

### 10. Privacy Policy
- **Slug:** `/privacy-policy`
- **Type:** page

### 11. Services
- **Slug:** `/services`
- **Type:** page

### 12. Terms and Conditions
- **Slug:** `/terms-and-conditions`
- **Type:** page

### 13. Thank You
- **Slug:** `/thank-you`
- **Type:** page

## Navigation

### Main (header)
  - [Home](/)
  - [About Us](/about-us)
  - [Our Services](/our-services)
  - [Contact](/contact)

### Policies (footer)
  - [Terms and Conditions](/terms-and-conditions)
  - [Cookie Policy](/cookie-policy)
  - [Privacy Policy](/privacy-policy)





## Language & Spelling

**Use British English** throughout all content — UK spelling (e.g. "colour", "optimise", "centre", "labour"), UK date formats (DD/MM/YYYY), and UK conventions (postcode, county).

## Content Generation Rules

No specific content rules defined.





## ⚠️ Image Generation Rules — IMPORTANT

AI-generated images must **NEVER** contain any text whatsoever. This includes:
- Company names, logos, or branding
- Phone numbers, email addresses, URLs, or contact details
- Text on vehicles, vans, signage, workwear, uniforms, or clothing
- Watermarks, labels, captions, or overlays
- Letters, words, or numbers of any kind

All generated images must be **completely text-free**. Any text belongs in the HTML/CSS, never baked into images.



## Technical Stack

This project uses:
- **Next.js 15** with App Router
- **React 19**
- **TypeScript**
- **Tailwind CSS 4**
- **shadcn/ui** components

## Development Notes

- All pages should be server-rendered where possible
- Use semantic HTML and accessible components
- Follow the brand colour scheme defined above
- Images should use `next/image` with proper alt text
- Each page should include appropriate meta tags for SEO

## ⚠️ Theme Rules — IMPORTANT

**NEVER hardcode hex colour values in component classes.** Use Tailwind theme tokens so the site works in both light and dark mode:

- Backgrounds: use `bg-background`, `bg-muted`, `bg-card` — NOT `bg-[#0D0D0D]` or `bg-[#03100a]`
- Text: use `text-foreground`, `text-muted-foreground` — NOT `text-white` or `text-[#fafafa]`
- Borders: use `border-border` — NOT `border-[#262626]`
- Accents: use `bg-primary`, `text-primary`, `bg-secondary` — NOT `bg-[#1BA368]`
- Hero overlays: ALWAYS use a **dark overlay** (`bg-gradient-to-r from-black/80 via-black/65 to-black/40`) with **white text** (`text-white`, `text-white/80`) — never use `bg-background` or theme tokens on hero overlays since the background image must show through
- Section gradient overlays (non-hero): use `from-primary/10`, `to-secondary/5` on top of `bg-muted`
- The **only** place hex values belong is in CSS custom properties inside `globals.css` (`:root` / `.dark` blocks)
- All generated images MUST be saved as **WebP** format (use `sharp` to convert from PNG)

The theme mode (light/dark) is set via the `className` on `<html>` in the root layout. All colours must respond to this automatically via the CSS custom properties.
