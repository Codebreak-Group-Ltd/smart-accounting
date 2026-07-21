# LAUNCH.md — Smart Accounting Solutions

Living runbook (playbook §1). Dated tick-list of everything done and still open.

## Build decisions (confirmed 2026-07-21)
- Stack: Astro static + Netlify + GitHub org. Full build → password-gated preview → launch.
- Lead capture: CRM undecided — form uses a single swappable submit module.
- Paid ads: yes — full consent registry (GA4 + Google Ads + Meta Pixel), Consent Mode v2, attribution capture.
- Legal pages: client supplies prose; we build pages + wire cookie table to registry.
- Copy: client-approved, verbatim, immutable. House style: no em/en dashes, no contractions in formal copy, no emoji, no exclamation marks.

## Done
- [x] 2026-07-21 Astro scaffold (static, trailingSlash: always, compressHTML, inlineStylesheets auto, sitemap integration).
- [x] Design tokens ported to `src/styles/tokens.css` (pure :root, zero selectors).
- [x] Fonts self-hosted: Gotham-Bold.woff + Inter via @fontsource. No Google Fonts link (verified 0 leaks in dist).
- [x] `src/data/site.ts` single source of truth for NAP / legals / swappable CTAs.
- [x] Base layout: SEO head (title/desc/canonical slashed/OG/Twitter), lang=en-GB, og:locale en_GB, site-wide AccountingService + WebSite schema, skip link.
- [x] SiteHeader: fixed, scroll-shrink logo, services dropdown (hover+click, Esc, outside-click, ARIA), mobile hamburger panel.
- [x] SiteFooter: NAP from config, outlined SVG reverse logo, legal links to /privacy/ & /legal/.
- [x] Real brand logos in use throughout (header/footer/favicon) from Dropbox Final/SVG (Gotham_SAS_*). Footer = Gotham_SAS_Reverse.svg. Handoff logos were AI approximations — retired.
- [x] All 6 routes build clean; hero backdrop optimised 2435kB → 144kB WebP (< 150KB budget).
- [x] Heroes built on all 4 pages with verbatim approved copy.
- [x] Privacy/Legal shells (noindex until copy supplied).
- [x] SEO titles/descriptions rewritten to §4 (design meta was NOT client-approved). All titles ≤60, descriptions ≤155, keyword-led + local, benefit-led + hook. NB: visible H1/H2 are locked approved copy and are brand-voice (not keyword-led), so on-page keyword/intent signals are carried by the title + meta description.

## Done — pages
- [x] 2026-07-21 **Home** — full build: hero (+ keyword strip), software strip, pain points, "It is not your fault" band, service intro + pull-quote, Meet Craig (+ stats), What you get (3 rows), MTD timeline card, Who this is for (6 checks), testimonial (behind showTestimonials flag), CTA band, FAQ (7, + FAQPage schema). Copy verbatim. All photography self-hosted + Astro-optimised (2MB PNG → 9-96KB WebP responsive). Software logos self-hosted + resized to 2× slot. DOM-verified: 1 H1, full schema, no console errors, no main/footer overflow.
- [x] Shared components: Hero (+ band slot), SoftwareStrip, CurveSeam (wave), Faq (+ optional seam), scroll-reveal script in Base.
- [x] Mobile header fix: landscape logo capped (40px ≤560, 34px ≤380) so header fits a real 375px phone (was 298px logo → overflow).

- [x] 2026-07-21 **About** — full build: hero, Craig's story (sticky photo), What drives this, "The job" quote band, How Craig works, Meet the team, CTA band, FAQ (5). BreadcrumbList + FAQPage schema.
- [x] 2026-07-21 **Services** — full build: hero, software strip, intro + 9-chip anchor nav, MTD feature, 8 anchored service rows (scroll-margin-top 97px verified), in-house cost comparison (cost card + benefits card), transparent pricing, CTA band (custom area line), grouped FAQ (5 groups / 25 Qs). Service + OfferCatalog(9) + BreadcrumbList + FAQPage schema.
- [x] 2026-07-21 **Contact** — full build: hero, details card (NAP + what3words + self-hosted map), swappable lead form (validation mirrors design, attribution merge, keepalive POST, always reaches thank-you), What to expect, FAQ (5). Form tested via fetch-intercept: payload carries fields + source/page/tags/timestamp + merged gclid/utm attribution. BreadcrumbList + FAQPage schema.
- [x] Attribution capture script added site-wide in Base (gclid/gbraid/wbraid/utm_* → localStorage on landing).
- [x] Extracted components: CtaBand; SoftwareStrip + Faq gained optional seam; CtaBand custom areaLine.

## Open — build (remaining)
- [ ] About body: Craig's story, What drives this, "The job" quote band, How Craig works, Meet the team placeholder, CTA band, FAQ.
- [ ] Services body: software strip, anchor-chip nav, MTD for ITSA feature, 9 anchored service rows, in-house bookkeeper cost comparison, transparent pricing, CTA band, FAQ.
- [ ] Consent registry (`src/data/cookies.ts`) + CookieConsent banner (accept/reject equal prominence + granular) + Consent Mode v2. Attribution capture already done; banner dormant until IDs supplied. Wire cookie policy table to registry.
- [ ] Per-page OG images (1200×630 JPEG) + wire `ogImage` prop per page.
- [x] robots.txt (env-driven: Disallow-all in preview, allow + sitemap at launch via PUBLIC_INDEXABLE).
- [x] Deploy config: netlify.toml (build + security headers), preview Basic-Auth gate (netlify/edge-functions/preview-gate.ts via PREVIEW_PASSWORD), site-wide noindex until PUBLIC_INDEXABLE=true, .env.example, README.md, ONBOARDING.md. Initial git commit made.
- [ ] llms.txt (allow AI crawlers) — add at launch alongside the robots flip.
- [ ] tools/seo-audit.mjs pre-deploy script.
- [ ] CONTRIBUTING.md.
- [ ] Create GitHub repo in Codebreak org + connect Netlify + set env vars (PREVIEW_PASSWORD, PUBLIC_INDEXABLE=false). Needs Joel's accounts — CLI not available in build env.

All 4 marketing pages + shared components + self-hosted assets + scroll-reveal/reduced-motion are DONE (see above).

## World-class polish pass (2026-07-21, from /impeccable review)
- [x] **SAS triangle signature motif** — new `BrandMark.astro` (real symbol, single path, recolourable) used as a large faint watermark on all dark surfaces: closing CTA bands (via CtaBand), footer, home "It is not your fault" + "Ready to start", About "The job".
- [x] **Depth** — subtle gold radial glow on dark bands; metallic-sheen gradient on primary gold CTAs (material treatment, not decoration).
- [x] **Motion, de-uniformed + robust** — reveal now gated behind `html.anim` (visible by default; no JS / reduced-motion = no hidden state; 2.5s failsafe so nothing ships blank). Bespoke motions added: gold rule wipes in, MTD timeline draws (line grows, dots pop in sequence), Services rules wipe. Fixes the earlier "reveal gates visibility" defect.
- [x] **Contrast** — map attribution moved off `--sas-gray-40` (2.55:1, failed AA) to gray-70 (7.4:1).
- Client-provided later: real testimonials (§showTestimonials flag ready), real photography (Craig + office), per the review.

## Feedback applied (2026-07-21, Joel)
- [x] Homepage H1 now max 3 lines (desktop 2, mobile 3 — floor lowered to clamp(23px,6vw,72px), removed the ch-cap).
- [x] Craig headshot is a circle-on-transparent-square asset → new `.img-circle` utility (object-fit contain, radius 50%) so it shows whole, not cover-cropped. Applied on Home + About.
- [x] Email normalised to **hello@smartaccountingsolutions.co.uk** everywhere (was info@/hello@/craig@). RESOLVED.
- [x] Footer: added "Website by Codebreak" → https://www.codebreak.co.uk/.
- [x] Contact map removed — handoff asset had OLD magenta SAS branding. Needs replacement (below).

- [x] **Contact map rebuilt** (2026-07-21): clean static map generated from OSM tiles (tools/build-map.mjs) centred on S36 6FQ (53.522053,-1.621787), on-brand purple wash + purple/gold pin, rounded-rect, links to Google Maps, "© OpenStreetMap contributors" attribution shown. No third-party runtime request (baked static image) so no consent concern.
- [x] Header: mobile white gap fixed (--header-h tracks logo per breakpoint); whole header shrinks on scroll (77→57px), not just the logo.

## Open — client inputs (flagged)
- [ ] **Perf pass**: hero backdrop is a CSS background-image (no fetchpriority). Consider preloading it for LCP (playbook §5) during the Lighthouse pass.
- [ ] **Geography (multiple variants)**: Penistone is South Yorkshire, but approved copy variously says "West and North Yorkshire" (footer/most pages), "Penistone and surrounding areas" (Services CTA), and the About FAQ says SAS is "based in **Sheffield**". Also About FAQ names an association with "Buckle Barton Bookkeeping and Accountancy Services Ltd". All verbatim; client to confirm the canonical service-area wording + whether Sheffield/Buckle Barton are correct before launch (feeds LocalBusiness schema areaServed).
- [ ] Live domain + whether same-domain replatform of current WP (sas-codebreak.flywheelsites.com) → redirect inventory if so.
- [ ] Tracking IDs (GA4 `G-`, Ads `AW-`, Meta Pixel) — collect one at a time.
- [ ] Legal/Privacy/Cookie prose.
- [ ] Booking calendar link for "Book a free chat" (currently → /contact/).
- [ ] Real photography + Craig's headshot (AI placeholders in use).
- [ ] Real testimonials (section behind `showTestimonials` flag).

## Open — launch (playbook §11)
- [ ] Netlify + GitHub org repo, branch protection, password-gate env var.
- [ ] Redirect inventory + verification (if replatform).
- [ ] Pre-launch: SEO audit, schema validation, Lighthouse (target 100), security headers, page-weight, a11y, §7 compliance checklist.
- [ ] Tracking activation + all consent paths verified on live domain.
- [ ] CRM webhook wired + test-fired.
- [ ] DNS cutover, delete preview password gate, OG re-scrape, GSC + Bing submission.
