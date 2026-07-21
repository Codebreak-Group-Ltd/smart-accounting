# Codebreak Website Build Playbook

**What this is:** every learning, standard and gotcha from the codebreak.co.uk rebuild
(Astro, launched July 2026 — 100/100/100/100 Lighthouse on the live domain, zero lost
redirects, full consent-gated tracking). Use it as the starting knowledge for every
client website build. Drop this file into a new build's repo (or paste it into the
project's CLAUDE.md context) and hold the build to it.

**How to read it:** rules are written as instructions, not suggestions. Where a rule
came from something that actually went wrong, the lesson is noted so nobody has to
relearn it.

---

## 1. Stack and project setup

- **Astro (static output)** is the default for marketing/brochure sites. Fast by
  default, no client JS unless added deliberately, content collections for blogs.
- **Hosting: Netlify via GitHub CI.** Repo lives in the **company GitHub org** (not a
  personal account — org is required for branch rulesets on private repos). Push to
  `main` auto-deploys.
- **Workflow: branch → PR → Netlify Deploy Preview → merge → live.** Protect `main`
  with a ruleset requiring PRs from day one of go-live. No direct pushes to main, ever
  — including "tiny" copy tweaks.
- **Password-gate the preview** while the site is in build (env-var gate, e.g.
  `PREVIEW_PASSWORD`) so unfinished work can't leak or get indexed. Deleting that env
  var is a cutover step — check it's actually gone on the live domain.
- Ship team docs in the repo: `README.md`, `ONBOARDING.md` (pull latest before every
  edit session), `CONTRIBUTING.md`, `.nvmrc` + `package.json` engines.
- Keep a **`LAUNCH.md` living runbook** in the repo: a dated tick-list of everything
  done and still open. It becomes the audit trail and the post-launch backlog.
- Independent changes go on **independent branches off latest `main`** so PRs merge
  in any order. Site-wide changes (shared components) get their own PR — never bundled
  into a page-specific one — because their blast radius is different.
- Blog migrations get **repeatable import tooling** (`import-post.mjs` /
  `reimport-all.mjs` pattern) rather than hand-pasting — posts will need re-importing
  more than once.

### Trailing-slash canon (Netlify)
Netlify serves directory-style URLs, so the 200 URL is `/about/` not `/about`. Set
`trailingSlash: 'always'` in `astro.config.mjs` and keep **canonicals, og:url, the
sitemap, internal links and redirect targets all slashed**. If legacy redirects point
at unslashed targets you create a double-hop 301 chain — write the redirect build
script to emit slashed targets. Rule: canonical == sitemap URL == the URL that returns 200.

### Design tokens
- All colours/type/spacing/z-index live in **`tokens.css` as pure `:root` variables,
  zero selectors**. That purity is what makes it safely importable into any standalone
  page (landing funnels, embeds) without side-effects.
- **Astro scoped `<style>` does NOT reach JS-created elements or child-component
  internals.** Use `:global()` for anything rendered by a script or inside a child
  component (video embeds, modals, injected banners). This bit us repeatedly.

---

## 2. Design standards

(Deliberately brand-agnostic — every client gets their own visual identity. These are
the rules for *how* to build any identity well, not what it should look like.)

- **Every client gets a distinctive visual signature of their own** — a repeatable
  device (a shadow treatment, a border style, a typographic move, a texture) applied
  consistently across buttons, cards and imagery so the site is recognisably theirs.
  The test: if the design could belong to any other business, redesign it. Never
  default to Bootstrap-alikes or the first Google Fonts pairing.
- Derive the direction from the client's real world: their trade, their customers,
  their existing brand equity. A palette/typography decision should be justifiable to
  the client in one sentence that mentions *their* business.
- Encode the identity as **design tokens from day one** (§1) — colours, type scale,
  spacing, shadows, z-index. The client's brand lives in one file; components consume
  tokens, never hard-coded values. This is also what makes standalone pages and
  embeds (§9) possible later.
- **Logos must be outlined SVGs** (no `<text>` elements / font dependencies). Inlined
  logo SVGs render with whatever fonts the visitor has — a `<text>`-based logo will
  silently render wrong. Convert to paths before any logo enters the repo. Applies
  doubly to client-logo walls (their customers' logos).
- Area-equalise logo walls with per-logo scale factors rather than uniform heights —
  optically even beats mathematically even.
- WCAG AA contrast minimum. Watch "brand-adjacent" shades: darkened or tinted
  variants of a brand colour often fail as text where the pure colour passes — test
  the actual pairs used, and ban specific failing shades explicitly in the project
  notes so they don't creep back in.
- Accessibility is part of done: focus-visible states on everything interactive,
  correct ARIA (don't invent table roles — plain elements with sr-only labels beat
  broken ARIA), `prefers-reduced-motion` kills ambient animation.

---

## 3. Copy standards

(Global rules live in the company CLAUDE.md — these are the ones this build proved.)

- UK English. **No em or en dashes in visible copy** — restructure the sentence.
- One clear job per page; lead with the reader, not the client.
- Specific beats vague everywhere: real numbers, real dates, named people.
- Never fabricate proof. If a metric is a business figure (revenue managed, ad spend),
  it is NOT a review rating — do not put it in AggregateRating schema. Declining bad
  schema is part of the service.
- CTAs are specific and low-friction. On forms, cut reassurance micro-copy to the
  minimum that earns trust ("Live and free." beat three sentences about phone usage).
- Iterate question wording on multi-step forms with the client — the question users
  actually understand rarely survives the first draft. Offer "All of the above" where
  options aren't mutually exclusive.

---

## 4. SEO protocol (every page, every build)

**Per-page checklist:**
- Title ≤60 chars, primary keyword near the front. Homepage title can **omit the brand**
  — Google auto-appends the site name for homepage results, so spend the characters on
  keywords.
- Meta description ≤155 chars, benefit-led, ends with a hook.
- Exactly one H1 matching search intent. H2/H3 answer follow-up questions.
- Canonical (slashed), og:title/description/url/image + twitter card on every page —
  including thank-you pages.
- `lang="en-GB"`, `og:locale: en_GB`.
- Internal links: every page links to related pages with descriptive anchors.
- Per-page OG images, 1200×630 JPEG. Bespoke beats generic for anything that will be
  shared or advertised.

**Schema:**
- Standard stack for a service business: Organization + WebSite (site-wide),
  LocalBusiness/Service + FAQPage on key pages, BreadcrumbList, Event for events,
  VideoObject for videos.
- Pull video metadata (thumbnail, duration, upload date) from the platform's oEmbed at
  build time — if the network's down, omit the video from the graph rather than ship
  fabricated data.
- Validate before launch (Rich Results Test). Schema on noindex pages is pointless —
  don't flag its absence there.

**AEO/GEO:**
- `robots.txt` allows AI crawlers; ship `/llms.txt` as an index for LLM consumption.
- Submit to Bing Webmaster Tools as well as GSC — Bing feeds ChatGPT/Copilot answers.

**Local SEO (service businesses):**
- NAP (name, address, phone) in footer HTML — text, not an image — and consistent
  with GBP/citations. Location + service in title/H1 on local service pages.

**Hidden/ad pages:** `noindex,follow` meta AND excluded from the sitemap (config
filter). Never submit them to GSC; that's correct behaviour, not an oversight.

**Tooling:** keep a static pre-deploy audit script in the repo (`tools/seo-audit.mjs`
pattern) that walks `dist/` and flags title/desc lengths, missing canonicals, missing
alt, H1 count, missing schema. Run it before every deploy. Treat third-party audit
tools as leads to verify, not verdicts — this build's "High severity" finding was a
false positive (server-rendered H1s misread as JS-only).

---

## 5. Site speed and performance protocol

Performance is a deliverable with numbers attached, not a vibe. Every target below was
hit on the live Codebreak domain.

### Targets (lab, on the LIVE domain, mobile AND desktop)
- **Lighthouse/PSI: 100 across Performance / Accessibility / Best Practices / SEO is
  the goal; 95+ Performance is the floor** on every key page.
- **LCP < 2.0s** lab (achieved 1.3s). **CLS ≈ 0. TBT ≈ 0** (static sites have no
  excuse for main-thread work).
- Run PSI **twice** and score the second run — the first can hit a cold CDN edge.
- Lab ≠ field: watch **CrUX field data** in GSC for the weeks after launch; that's
  what actually ranks.

### Budgets
- Hero images **<150KB**; every other image sized to its slot (see below).
- Fonts: only the weights/subsets actually used, self-hosted woff2 (§ fonts).
- Client JS: none beyond what's deliberate. Astro static output means zero framework
  JS by default — keep it that way. Every third-party script is consent-gated (§6),
  which also keeps it off the critical path.
- Run a page-weight audit pre-launch and record it in LAUNCH.md.

### Render path
- Inline critical CSS (`inlineStylesheets: 'auto'`), `compressHTML: true`, sharp image
  service at build time.
- **Zero render-blocking third-party requests.** Self-hosted fonts + consent-gated
  tracking achieve this automatically.
- LCP element (hero/cover image): `loading="eager" fetchpriority="high"`. Everything
  below the fold lazy-loads.

### Layout stability (CLS)
- Every media slot declares dimensions or an `aspect-ratio` box — images, video
  embeds, iframes. No content jumps, ever.
- Video elements always have a `poster` so the slot paints instantly.
- `font-display: swap` on all faces (fontsource default) so text never blocks.

### Fonts — self-host, always
- `@fontsource` packages (subsetted woff2), imported per page/layout. **Never a Google
  Fonts `<link>`**: it's a render-blocking external request AND a GDPR IP-leak (§7).
  Never ship raw TTFs (a 394KB TTF vs ~30KB of latin woff2).
- Unicode-range subsetting means only the latin subset downloads — verify with the
  network panel, not assumptions.

### Images
- WebP for web, sized to a maximum of **2× the largest display slot**. The cautionary
  tale: a decorative watermark shipped at 9550×9830px / 3.6MB for a 520px slot at 4%
  opacity — resized + WebP'd it was 173KB, visually identical. Check every handoff
  asset's real dimensions before it enters the repo.
- Alpha channels are expensive in WebP — drop `alphaQuality` on decorative images.
- Descriptive alt text on every image; empty `alt=""` only for pure decoration.
- Descriptive hyphenated filenames. Version filenames when swapping assets (cache).
- Use the project's own toolchain (`sharp` is already in node_modules on an Astro
  build) before reaching for external binaries; if you do need a binary (ffmpeg),
  match the CPU architecture (Intel builds fail on Apple Silicon with "bad CPU type").

### Video
- Click-to-play with sound: **single H.264 + AAC MP4, `+faststart`, metadata
  stripped**, `preload="metadata"`. No dual format needed — universal including iOS.
- Silent autoplay hero loops: WebM (VP9) + MP4 fallback, audio stripped, `muted
  playsinline loop`, poster frame.
- Crop/encode to the aspect ratio the design displays (e.g. bake a 4:5 portrait crop
  from 16:9 source, verifying the subject stays framed across the whole clip) rather
  than relying on CSS `object-fit` to hide 60% of the pixels users still download.
- Always a poster frame from the actual video — never let it flash an unrelated image.
- Captions on talking-head video wherever feasible (mute-watching is the norm).
- CRF ~20, preset slow: this build took a 63MB source → 9.3MB web file with no
  visible loss.

### Animation
- Decorative/ambient animations **< 800ms** and transform/opacity only. A 1.3s hero
  text-decode animation tanked lab Speed Index under CPU throttle; halving it restored
  PSI 100. Real users didn't mind it — but the metric is the metric.
- `prefers-reduced-motion` disables all of it.

---

## 6. Tracking and consent architecture

This is the piece most worth copying wholesale.

- **One consent-gated registry** (`src/data/cookies.ts` pattern): a single source of
  tracking IDs + service definitions that drives (a) the banner, (b) gated script
  loading, (c) the cookie-policy table. Add a service in one place; everything updates.
- **Nothing pastes raw into `<head>`. Ever.** Every pixel/script — GA4, Google Ads,
  Meta Pixel, white-labelled ad platforms — loads through the consent component in its
  category. When a client hands you "just paste this snippet", translate it into the
  registry instead.
- **Google Consent Mode v2** default-denied signals fire before anything else.
- **Attribution capture**: a tiny script stores `gclid/gbraid/wbraid/utm_*` in
  localStorage on landing; every lead payload merges them in. This is how the client's
  ad platform gets told which click became a lead.
- Verify all three consent paths before launch: accept-all, reject, granular.
- Third-party pixel endpoints are often **domain-locked** — they'll 400 from localhost
  and previews. Test event flow on the live domain and check the platform's
  allowed-domains list.
- Standalone pages (funnels) still get the SAME consent component — see §9.

---

## 7. GDPR, PECR and legal compliance (UK)

Not optional, not an afterthought, and mostly free if the architecture in §6 is
followed. The standard is UK GDPR + PECR, regulated by the ICO.

### Cookie consent — the behaviour that must be true
- **Zero non-essential cookies or tracking requests before consent.** Verify with the
  network panel on a fresh profile: before any banner interaction there must be no
  requests to Google, Meta, or any ad platform. Consent Mode v2 default-denied pings
  are the only permitted Google traffic.
- The banner offers **Accept all and Reject non-essential with equal prominence** —
  rejecting must be as easy as accepting. No dark patterns: no buried reject, no
  "reject" behind a settings click, no pre-ticked boxes.
- **Granular control**: a Manage Preferences panel with per-category toggles —
  Strictly Necessary (always on, not toggleable), Analytics, Advertising. Category
  descriptions in plain English.
- The compact mobile banner (§10) still carries both buttons — compliance and
  conversion are not in conflict; a smaller banner with both options beats a tall one.
- **Consent must be revocable**: a persistent way to reopen the preferences panel
  (link on the cookie policy page at minimum). Consent choice is stored client-side;
  changing it takes effect without support tickets.
- Conversion events (e.g. Meta `Lead` on a thank-you page) **fire only after
  consent** — guard/poll for the gated pixel. Brief the ads team so they don't chase
  "missing" events; Consent Mode models the gap.

### Cookie policy page
- The services table is **generated from the consent registry** (§6): service,
  provider, category, purpose. Single source of truth means the policy cannot drift
  from what the site actually loads.
- **When a tracking service is added or dropped, the registry AND the cookie/privacy
  policy prose change in the same PR.** (Lesson: dropping ClickCease meant registry +
  cookie table + privacy prose together — a policy that lists dead services, or
  misses live ones, is a compliance failure either way.)

### Privacy policy
- Must reflect the site's **actual** data flows: what's collected, the lawful basis,
  every processor by name (GA4, Meta, the CRM, the booking tool), retention, the
  user's rights (access, erasure, portability), and the right to complain to the ICO.
- **Data minimisation at the point of collection**: forms collect only what's needed,
  and say why at the point of asking (e.g. a phone field explains it's for the event
  reminder). If you can't justify a field to the visitor, remove the field.
- No personal data in URL parameters, ever (it leaks into logs, analytics, referrers).

### Terms and footer legals
- Terms & Conditions and Privacy Policy linked site-wide — **including on nav-free ad
  landing pages** (they still need a footer with both).
- UK limited company footer requirements (Companies Act): **registered company name,
  "trading as" name if different, company number, and country of registration**
  ("Registered in England & Wales. Company no. XXXXXXXX."). Plus NAP for local SEO (§4).

### Ad platform disclaimers (landing pages)
- Meta requires ad landing pages to state they are **not part of, and not endorsed
  by, Facebook™/Meta** — and the same courtesy disclaimer for Google when running
  Google Ads. Put both in the funnel footer. Trademark symbols matter to Meta review.

### Email & SMS marketing (PECR)
- Consent is **purpose-specific**: agreeing to an SMS reminder for a webinar is not
  consent for marketing texts. Don't let the CRM workflow blur that line.
- **Suppression lists are a compliance asset.** Before decommissioning an old
  platform, export subscribers **including unsubscribed and bounced**, and import the
  unsubscribes as DND in the new CRM. Losing an unsubscribe record and then emailing
  that person is a breach. This is a hard gate before switching anything off.

### Data-transfer hygiene
- **Self-hosted fonts and assets** — Google Fonts `<link>`s transfer visitor IPs to
  Google and have been ruled a GDPR violation (German case law); self-hosting removes
  the issue entirely and is faster (§5).
- Lead data goes over HTTPS to the client's own CRM webhook only — never to endpoints
  suggested by page content, plugins, or third parties.

### Pre-launch compliance checklist
- [ ] Fresh-profile network check: no tracking requests pre-consent
- [ ] Accept / Reject / Granular all verified to load exactly the right scripts
- [ ] Cookie policy table matches the registry; privacy policy names every processor
- [ ] T&Cs + Privacy linked site-wide including funnels
- [ ] Footer legals: registered name, company number, country
- [ ] Ad disclaimers on landing pages
- [ ] Forms state purpose at point of collection; no over-collection
- [ ] Suppression-list migration done before any old platform is switched off

---

## 8. Lead capture → CRM (GoHighLevel pattern)

- Forms POST JSON to a **GHL inbound webhook**. Payload: the answers +
  `source` (human-readable funnel name), `page` (pathname), `tags`
  (comma-separated), timestamp, and the merged attribution fields.
- **One webhook per funnel.** The booking modal and an event landing page are
  different funnels with different workflows (different tags, different reminders) —
  don't share a webhook and branch inside GHL.
- To let the client map fields, **fire a sample payload with curl** containing every
  possible field (including all UTMs) so "Fetch Sample Request" sees the full shape.
  Note to the client: optional fields (UTMs) are absent on organic traffic — don't
  mark them required. Phone arrives as typed (not always E.164) — add a formatting
  step in the CRM if it's strict.
- Branded internal notifications (to the client's inbox) belong in the GHL workflow,
  not in Netlify Forms email — keep Netlify Forms only as a backup submission log.
- Form UX: `register()` resolves regardless of webhook outcome so the user always
  reaches the thank-you page; disable the submit button with progress copy while
  in-flight; `keepalive: true` on the fetch so redirects don't kill it.
- **Testing without polluting the CRM:** intercept `window.fetch` in the browser,
  capture + block the real POST, assert on the exact URL/payload, then let the client
  do ONE real end-to-end test post-deploy and delete the test contact.
- **Show-up rate is a copy job.** Default booking-tool reminder templates are weak —
  rewrite email and SMS reminders benefit-led (what they'll get, who's hosting, one
  clear join link, human sign-off). For calls, the Calendly event description sells
  the call, not the company.

---

## 9. Ad landing funnels (hidden pages)

Pattern proven by the AI Masterclass funnel:

- Two routes: landing (nav-free, one job) + thank-you (fires the conversion event).
- Both `noindex,follow`, excluded from the sitemap, full canonicals/OG anyway (ads
  get shared).
- **Nav-free but never tracking-free**: import the site's `<CookieConsent/>` +
  attribution component rather than pasting snippets. And never legal-free: funnel
  footer carries Privacy, Terms, company legals and ad-platform disclaimers (§7).
- Standalone pages that don't load the site's global CSS need a small **embed
  stylesheet** so shared components render identically: import `tokens.css` (pure
  variables), then scope the site's button styles under the component's own classes
  (`.cc-banner .btn { … }`) so they win inside the banner without touching the page's
  own button system. Map utility-class collisions (`.mono`) the same way. Verify with
  a computed-style A/B against the homepage — byte-for-byte, not "looks close".
- Event pages get **Event schema** (VirtualLocation, free Offer, performer, correct
  BST/GMT timezone offsets — countdown targets too).
- Thank-you pages do a job: confirmation status, **add-to-calendar buttons**
  (Google/Apple/Outlook), what-happens-next, one prep task, and honest scarcity if
  true ("no replay — come live").
- One bespoke OG image can feed both pages' social cards + the Event schema if they
  all reference the same path.
- **Dated event pages have an expiry.** Diarise the post-event decision: archive,
  redirect, or repurpose. Never leave a past-date event page live.

---

## 10. Mobile UX standards (and how to verify them)

The masterclass mobile pass produced rules worth enforcing on every build:

- **The primary conversion action lives above the fold on mobile.** If a desktop
  2-column hero (copy left, form right) naively stacks, the form lands 1+ viewport
  down. Fix with **CSS grid named areas** — split the copy block so mobile order is
  `headline → form → supporting copy/photo` without touching desktop. Verify with
  numbers: the CTA button's bottom edge vs an 844px fold.
- Compress the mobile run-in: drop decorative header rows, shrink eyebrows, tighten
  padding. Every 100px above the form is paid-traffic money.
- **Zero horizontal overflow, verified** (`scrollWidth - clientWidth === 0` at 390px).
  Common causes found here: decorative images intentionally bleeding past an edge
  with no clipping ancestor (clip at the root), headlines whose `clamp()` minimum is
  too large for 390px, containers keeping desktop side-padding on mobile.
- Content containers get the site gutter (`--section-x`) on mobile. A `max-width`
  container with no `padding-inline` looks fine on desktop and touches the screen
  edges on a phone — fold the gutter into the max-width
  (`calc(52rem + 2 * var(--section-x))`) so desktop column width is unchanged.
- Match content-block widths deliberately: an article's body copy should share the
  featured image's column (override a global `68ch` prose cap in-article if the
  design calls for matched edges).
- Groups of 4 stat/countdown boxes wrap 3+1 in flex — use a 2×2 grid on mobile.
- Multi-option choice lists (form steps) go single-column on mobile.
- **Consent banners are conversion surfaces.** Full-size banner was 328px (~40% of a
  phone viewport) sitting over the hero CTA. Compact mobile variant (drop redundant
  title, single-line buttons, tighter copy) halved it — while keeping Accept AND
  Reject equally visible (§7). Scope with `@media (max-width: 640px)` so desktop is
  untouched.

**Verification method (when device emulation isn't available):** render the built
page inside a **390px iframe** — media queries fire on iframe width — then measure
`getBoundingClientRect()` positions from the parent. Measure, don't eyeball;
screenshots glitch, DOM numbers don't. Always re-verify desktop after mobile fixes,
and re-verify the fix against the page it shares components with.

---

## 11. Launch sequence (replatform on the same domain)

Same-domain replatform = SEO authority carries over; no Change of Address. The order
that worked:

1. **Redirect completeness first**: inventory EVERY live legacy URL (crawl + GSC +
   sitemap), map each to a slashed target, then **hit all of them against production**
   post-cutover. Standard: 0 dead, 0 double-hops. This build: 63/63.
2. Pre-launch passes on the preview: SEO audit (0 high), schema validation, Lighthouse
   (aim 100s), security headers, page-weight, a11y, **the §7 compliance checklist**.
3. Tracking activation: collect IDs from the client one at a time (GA4 `G-`, Ads
   `AW-`, Meta Pixel, any white-label platform), wire into the consent registry,
   verify all consent paths.
4. CRM webhooks wired and test-fired.
5. Cutover: DNS/domain to the new host, **delete the preview password gate env var**,
   confirm homepage 200 + `index,follow` + no `X-Robots-Tag`, apex + http 301 to the
   canonical https://www host.
6. Post-cutover verification **on the live domain**: redirects (again), Lighthouse
   (again, PSI run twice), OG scrapes (FB Sharing Debugger + LinkedIn Post Inspector
   — re-scrape after any later title/OG change; a first-hit 502 from the scraper is
   usually a cold CDN edge, retry before debugging), GSC sitemap submission +
   priority-page requests, Bing Webmaster import, live pixel/event check
   (domain-locked platforms, §6).
7. **Do not decommission the old site** until redirects are confirmed AND all data is
   migrated out — including the **suppression-list export** (§7, the hard compliance
   gate). Keep a full backup of the old platform.
8. Convert to team project: org transfer, branch protection, Netlify app relink
   (transfers break the GitHub App link — live site unaffected, new deploys pause),
   onboarding docs + share link.

Post-launch watch: GSC indexing of new URL patterns, CrUX field data, conversion
actions built in the ad platforms (GA4 events, Ads conversion + label, Meta events,
remarketing audiences).

---

## 12. Hard-won gotchas (the "don't relearn this" list)

- **Astro scoped styles miss JS-created elements** → `:global()`.
- **Trailing-slash mismatches create redirect double-hops** → slash everything.
- **`<text>` in SVG logos renders in the wrong font** → outline to paths.
- **Google Fonts links = render-block + GDPR leak** → @fontsource.
- **Handoff assets lie about their size** → check dimensions/weight of every file.
- **Third-party pixels are domain-locked** → test events on the live domain.
- **Shared components assume the global CSS exists** → standalone pages need tokens +
  scoped embed styles, verified by computed-style diff.
- **Dropping a tracking service is three changes, not one** → registry + cookie
  policy table + privacy prose in the same PR.
- **GitHub org transfer silently unlinks Netlify's GitHub App** → relink, then test a
  deploy.
- **Stale local state**: before claiming PR/merge status, `git fetch` and check — the
  team may have merged while you were working. Before editing, pull latest main.
- **Screenshots at scroll offsets can glitch** → trust DOM measurement.
- **Lab Speed Index punishes long decorative animations** under CPU throttle even
  when real UX is fine → keep hero animations <800ms.
- **Consent-gated conversion events don't fire pre-consent** → guard/poll for the
  pixel; brief the ads team so they don't chase "missing" events.
- **A "quick font swap" on a page with its own `.btn` system collides with the site's
  `.btn`** → scope, never redefine globally.
- **Social scrapers 502 on first hit after deploy** → cold CDN edge; re-scrape before
  investigating.
- **macOS `sips` can't write WebP; Intel binaries fail on Apple Silicon** → use the
  project's `sharp` first; match CPU arch on any downloaded binary.
- **Vimeo player branding is an account-tier / per-video setting**, not embed
  parameters — check the video's own settings before touching code.

---

## 13. Definition of done (any page, any build)

**Copy**
- [ ] One job, reader-led, UK English, no em dashes, specific claims only

**SEO**
- [ ] Title ≤60, desc ≤155, one H1, canonical slashed, OG + twitter, schema
      identified/validated, internal links

**Design & a11y**
- [ ] Distinctive to this client, AA contrast (tested pairs), focus states,
      reduced-motion respected

**Performance**
- [ ] Lighthouse ≥95 (target 100) mobile + desktop, LCP <2.0s lab, CLS ≈ 0
- [ ] Images WebP ≤2× slot + alt text; fonts self-hosted woff2; media slots
      dimensioned (no shift); hero eager + fetchpriority

**GDPR / legal**
- [ ] Zero pre-consent tracking requests (network-panel verified)
- [ ] Accept / Reject equal prominence + granular panel; consent revocable
- [ ] Cookie table matches registry; privacy policy names every processor
- [ ] Footer legals + T&Cs/Privacy linked (funnels included); ad disclaimers on
      landing pages; forms state purpose

**Tracking & leads**
- [ ] Consent-gated via the registry, attribution merged into leads, live-domain
      event check
- [ ] Webhook tested (intercepted locally + one real post-deploy), always reaches
      thank-you

**Mobile**
- [ ] Primary CTA above fold, zero horizontal overflow at 390px, site gutter
      respected, verified with DOM measurements
- [ ] Desktop re-verified unchanged after any mobile fix

**Process**
- [ ] Branch → PR → preview → merge; LAUNCH.md updated; nothing pushed to main
