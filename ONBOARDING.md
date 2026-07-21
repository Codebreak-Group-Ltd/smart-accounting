# Onboarding — Smart Accounting Solutions website

Read this before every edit session.

## Before you start
1. `git fetch && git pull` the latest `main` — the team may have merged while you were away.
2. `nvm use` (Node 22) and `npm install` if `package.json` changed.
3. Skim `LAUNCH.md` for open items and client-input flags.

## Workflow (from go-live)
- **Branch → PR → Netlify Deploy Preview → merge → live.** No direct pushes to `main`.
- Independent changes go on independent branches off latest `main` so PRs merge in any order.
- Site-wide changes (shared components: header, footer, tokens, Base layout) get their **own** PR — never bundled into a page-specific change.
- Update `LAUNCH.md` as you go.

## Guardrails
- **Copy is client-approved — do not rewrite** page copy. SEO titles/meta are build-owned.
- UK English. No em/en dashes, no contractions in formal copy, no emoji, no exclamation marks.
- Email is `hello@smartaccountingsolutions.co.uk` everywhere (via `src/data/site.ts`).
- Use the real brand logos (see the brand-assets note); the design-handoff logos were AI approximations.
- Every image: descriptive alt, sized to slot, WebP. Fonts self-hosted only.
- Keep the preview gate ON (`PREVIEW_PASSWORD` set) and `PUBLIC_INDEXABLE` off until launch.

## Outstanding client inputs (see LAUNCH.md)
Real testimonials, real photography (Craig + office), legal/privacy/cookie copy,
tracking IDs, confirmed domain, booking-calendar link, and the geography/association
copy points flagged in LAUNCH.md.
