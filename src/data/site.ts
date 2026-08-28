/* ============================================================================
   Site configuration — single source of truth.
   NAP, company legals, and swappable contact values live ONLY here so a change
   is one edit, not a site-wide hunt (playbook §4 local SEO / NAP consistency).

   ⚠ PLACEHOLDERS pending client confirmation (2026-07-21):
   - Domain not confirmed — SITE_URL falls back to smartaccountingsolutions.co.uk.
   - Email: normalised to hello@ everywhere per Joel (2026-07-21).
   - "Book a free chat" points to /contact/ until Craig supplies a calendar link.
   ========================================================================== */

export const site = {
  name: 'Smart Accounting Solutions',
  // Registered entity (client-confirmed 2026-08-27): SAS is a trading style of
  // The Intelligent Assembly Limited — this is what schema legalName must carry.
  legalName: 'The Intelligent Assembly Limited',
  companyNumber: '11203679',
  registeredIn: 'England & Wales',
  founder: 'Craig Normington',

  // Contact — swappable
  phoneOffice: '0114 349 3311',
  phoneOfficeHref: 'tel:+441143493311',
  whatsappHref: 'https://wa.me/441143493311', // WhatsApp uses the office number — client-confirmed 2026-08-28
  // Canonical email — Joel confirmed hello@ throughout (2026-07-21), resolving the
  // earlier info@/hello@/craig@ mismatch across the approved copy.
  emailPrimary: 'hello@smartaccountingsolutions.co.uk',
  emailFooter: 'hello@smartaccountingsolutions.co.uk',

  // Address (NAP) — swappable
  address: {
    street: 'Office 2, Queens Building, Green Road',
    locality: 'Penistone',
    region: 'South Yorkshire', // Penistone sits in South Yorkshire; visible copy standardised to "Yorkshire" (client-approved, 2026-07-27)
    postcode: 'S36 6FQ',
    country: 'GB',
    what3words: '///pods.trap.lease',
  },
  // Approximate geo for LocalBusiness schema (Penistone town centre — refine with GBP).
  geo: { latitude: 53.5257, longitude: -1.6293 },

  // Service area — single source for the footer, CTA bands and page area lines.
  serviceAreaCopy: 'Based in South Yorkshire. Serving businesses across Yorkshire.',

  // CTA destinations — swappable
  bookingUrl: '/contact/', // TODO: replace with Craig's calendar link when supplied

  // Lead capture (playbook §8). CRM not chosen yet — endpoint empty means the form
  // validates + shows the thank-you state but posts nowhere. Set this to the CRM
  // inbound webhook (e.g. GoHighLevel) when confirmed; the form needs no other change.
  leadWebhook: '', // e.g. 'https://services.leadconnectorhq.com/hooks/....'
  leadSource: 'Contact form',
  leadTags: 'website,contact-form',
} as const;

export const siteUrl = (
  import.meta.env.SITE_URL || 'https://www.smartaccountingsolutions.co.uk'
).replace(/\/$/, '');
