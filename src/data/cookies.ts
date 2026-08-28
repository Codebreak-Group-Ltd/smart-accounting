/* ============================================================================
   Consent registry — single source of truth for tracking (playbook §6).
   Drives (a) the cookie banner categories, (b) gated script loading, and must
   stay in lockstep with the approved Cookie Policy page (/cookies/). When a
   service is added or dropped, this file AND the policy prose change together
   (playbook §7 — a policy that drifts from reality is a compliance failure).

   Current live services:
   - GA4 (analytics): DORMANT until PUBLIC_GA4_ID is set in Netlify. The policy
     already discloses GA4 under "Analytics / Performance Cookies", so the
     moment the ID lands, gated loading + this registry are already correct.
   - Attribution capture (analytics): first-party localStorage of gclid/utm on
     landing. The policy covers local storage explicitly ("similar technologies
     ... are covered by this policy too"), and it is not strictly necessary, so
     it only runs after analytics consent (PECR reg 6).
   - No advertising/marketing services — the policy states none are in use.
     When Google Ads / Meta Pixel go live, add them here under 'advertising',
     add the category below, and update the policy prose in the same PR.
   ========================================================================== */

export type ConsentCategory = 'necessary' | 'analytics' | 'functional';

export interface ConsentState {
  necessary: true;
  analytics: boolean;
  functional: boolean;
}

/** Cookie that stores the visitor's choice (named in the approved policy). */
export const CONSENT_COOKIE = 'cookie_consent';
/** 12 months, per the policy's stated duration ("Session – 12 months"). */
export const CONSENT_MAX_AGE = 60 * 60 * 24 * 365;

export const categories: {
  key: Exclude<ConsentCategory, 'necessary'>;
  label: string;
  description: string;
}[] = [
  {
    key: 'analytics',
    label: 'Analytics',
    description:
      'Helps us understand how visitors use our website, for example which pages are most popular, so we can improve it.',
  },
  {
    key: 'functional',
    label: 'Functional',
    description:
      'Remembers choices you have made, such as display preferences, to give you a more personalised experience.',
  },
];

/** GA4 measurement ID — set PUBLIC_GA4_ID in Netlify to activate analytics.
    Empty string = GA4 never loads, consented or not. */
export const GA4_ID: string = import.meta.env.PUBLIC_GA4_ID || '';
