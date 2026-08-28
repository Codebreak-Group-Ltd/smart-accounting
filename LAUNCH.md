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

## Pre-launch hardening (2026-08-28, launch audit — branch launch/pre-launch-hardening)
**GDPR/PECR — the approved Cookie Policy promised a consent mechanism that did not exist. Now built:**
- [x] Consent registry `src/data/cookies.ts` (single source of truth, playbook §6) + `CookieConsent.astro` banner: Accept all / Reject non-essential with IDENTICAL styling (equal prominence), granular Manage preferences panel (Analytics, Functional; Necessary always-on), compact mobile variant (158px, hero CTA unobscured), `cookie_consent` cookie 12 months SameSite=Lax Secure — all exactly as the policy describes.
- [x] Revocation: footer "Cookie settings" link reopens the banner with saved choices pre-filled (policy requirement).
- [x] GA4 loads ONLY after analytics consent AND only when PUBLIC_GA4_ID is set (Consent Mode v2 defaults denied before gtag, then updated). Zero third-party requests pre-consent — verified via performance entries on a fresh profile.
- [x] Attribution capture moved INSIDE the consent gate (PECR covers localStorage; not strictly necessary) — runs only after analytics consent; reject DELETES any stored attribution. Verified all paths in-browser: first-visit banner, reject, granular save, reopen, returning-visitor persistence.
- [x] Bug caught in verification: `.cc-prefs` display:grid overrode [hidden] — banner shipped 60% of a phone viewport. Fixed (`[hidden]{display:none}`), now 14–19%.

**SEO/AEO:**
- [x] Schema legalName fixed: was "Smart Accounting Solutions Limited" (nonexistent entity) → name "Smart Accounting Solutions" + legalName "The Intelligent Assembly Limited", matching footer/privacy/terms.
- [x] Removed stale noindex from /cookies/, /legal/, /privacy/, /complaints-procedure/ (real client-approved pages; were noindex-but-in-sitemap — contradictory signals).
- [x] Knowledge Base meta description 178 → 144 chars.
- [x] Branded default og:image (1200×630 JPEG from real brand SVGs) on every page + twitter summary_large_image; apple-touch-icon + favicon-32 PNG.
- [x] /llms.txt (AEO/GEO index; facts drawn from site.ts). robots.txt already allows AI crawlers when indexable.
- [x] tools/seo-audit.mjs pre-deploy script (playbook §4 tooling): titles/descriptions/H1/canonicals/OG/robots/JSON-LD/alt/dimensions/dead+unslashed links/sitemap-noindex consistency/page weights. 18 findings (8 high) → 0 high in both preview and live modes.

**Performance (GTmetrix/PSI):**
- [x] Cache-Control: /_astro/* 1y immutable; logos/software/icons/OG 1w + SWR (fixes "efficient cache policy").
- [x] Hero LCP: two renditions (840w/55q = 34KB mobile, 1800w/60q = 125KB desktop, both < 150KB budget — was a single 201KB 1920w) + `<link rel="preload" as="image" media=…>` for each (CSS backgrounds are invisible to the preload scanner).
- [x] Gotham-Bold.woff preloaded (carries the LCP H1); verified preload href matches the single hashed asset.

**Leads:**
- [x] Contact form was posting NOWHERE with no CRM chosen (launch-day enquiries would vanish). Added Netlify Forms fallback (static-detected, honeypot, hidden source/page fields) — submissions land in the Netlify dashboard; CRM webhook remains the primary path when configured, with Netlify as the backup log (playbook §8). Dual delivery verified via fetch-intercept.

**Post-merge actions for this work (Joel, in Netlify UI):** form detection enabled 2026-08-28 ✓. After merge: Forms → Notifications → email notification for form "contact" to **joel@codebreak.co.uk** (test phase). One real end-to-end test, confirm all fields + reply-to arrive, delete the test submission.
- [ ] **AT CUTOVER (hard gate): switch the form notification recipient from joel@codebreak.co.uk to hello@smartaccountingsolutions.co.uk** — client must not miss live leads because the notification still points at Codebreak.

## Open — client inputs (flagged)
- [ ] **Perf pass**: hero backdrop is a CSS background-image (no fetchpriority). Consider preloading it for LCP (playbook §5) during the Lighthouse pass.
- [ ] **Geography (multiple variants)**: Penistone is South Yorkshire, but approved copy variously says "West and North Yorkshire" (footer/most pages), "Penistone and surrounding areas" (Services CTA), and the About FAQ says SAS is "based in **Sheffield**". Also About FAQ names an association with "Buckle Barton Bookkeeping and Accountancy Services Ltd". All verbatim; client to confirm the canonical service-area wording + whether Sheffield/Buckle Barton are correct before launch (feeds LocalBusiness schema areaServed).
- [ ] Live domain + whether same-domain replatform of current WP (sas-codebreak.flywheelsites.com) → redirect inventory if so.
- [ ] Tracking IDs (GA4 `G-`, Ads `AW-`, Meta Pixel) — collect one at a time.
- [ ] Legal/Privacy/Cookie prose.
- [ ] Booking calendar link for "Book a free chat" (currently → /contact/).
- [ ] Real photography + Craig's headshot (AI placeholders in use).
- [ ] Real testimonials (section behind `showTestimonials` flag).

## CUTOVER RUNBOOK (2026-08-28 — branch launch/domain-cutover)
Recon findings: live WordPress site IS on smartaccountingsolutions.co.uk (LiteSpeed host, IP 5.134.11.60) → same-domain replatform. Old site canonicalised www→apex, but **Joel chose WWW as the canonical host (2026-08-28)**: www is primary in Netlify, apex 301s to www at the edge. Consequence: legacy apex URLs chain apex → www → target (2 hops max — accepted trade-off; equity follows). Fallbacks + SITE_URL + check tool all www. Legacy inventory = 9 URLs from /wp-sitemap.xml; homepage crawl found no extras. Redirect map in public/_redirects; /, /services/, /contact/, /legal/ carry over 1:1.

**Order of operations:**
1. [ ] Merge the launch/domain-cutover PR (redirects + apex fallbacks + check tool).
2. [ ] BACKUP THE OLD SITE first (playbook §11.7): full WP export/backup incl. any contact-form submission data. Do not decommission hosting until post-cutover checks pass.
3. [ ] GA4: create the property (client's Google account ideally), grab the G- ID.
4. [x] Netlify → Domain management → `www.smartaccountingsolutions.co.uk` is PRIMARY (Joel's choice) + apex as alias (Netlify auto-301s apex→www).
5. [x] Netlify env vars: `SITE_URL=https://www.smartaccountingsolutions.co.uk`, `PUBLIC_INDEXABLE=true`, `PUBLIC_GA4_ID=G-JY271XPH38`; `PREVIEW_PASSWORD` deleted 2026-08-28.
6. [ ] DNS at the registrar: apex A record → 75.2.60.5 (Netlify LB), www CNAME → brilliant-croissant-8cd6e9.netlify.app. Netlify provisions TLS automatically once DNS lands.
7. [ ] Post-cutover verification: `node tools/check-launch.mjs` (redirects 0-dead/0-double-hop, www/http canonicalisation, index,follow, robots/sitemap/llms, headers, no pre-consent gtag). Then PSI mobile+desktop TWICE (score the second run), consent paths on the live domain (accept/reject/granular + GA4 Realtime shows the accept visit), form test on live domain (email to hello@ — recipient already flipped ✓).
8. [ ] OG scrape: FB Sharing Debugger + LinkedIn Post Inspector (re-scrape on 502 — cold CDN edge).
9. [ ] GSC: add property (domain property covers apex+www), submit sitemap-index.xml, request indexing for /, /services/, /about/, /contact/. Bing Webmaster Tools: import from GSC.
10. [ ] Old host: keep paid + untouched until GSC shows the new pages indexing cleanly (~2 weeks), then decommission with the backup retained.

**GA4 mechanism verified locally (dummy ID):** fresh visitor = zero third-party requests, no dataLayer; Accept → gtag loads with consent default denied → analytics granted → config (anonymize_ip). Returning consented visitor loads GA4 on arrival. Reject → nothing.

## Open — launch (playbook §11)
- [ ] Netlify + GitHub org repo, branch protection, password-gate env var.
- [ ] Redirect inventory + verification (if replatform).
- [ ] Pre-launch: SEO audit, schema validation, Lighthouse (target 100), security headers, page-weight, a11y, §7 compliance checklist.
- [ ] Tracking activation + all consent paths verified on live domain.
- [ ] CRM webhook wired + test-fired.
- [ ] DNS cutover, delete preview password gate, OG re-scrape, GSC + Bing submission.
