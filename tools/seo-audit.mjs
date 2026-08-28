#!/usr/bin/env node
/* ============================================================================
   Pre-deploy SEO/quality audit (playbook §4 "Tooling").
   Walks dist/ and flags, per page:
   - title missing / >60 chars; meta description missing / >155 chars
   - H1 count != 1
   - canonical missing / unslashed / mismatching og:url
   - og:title/description/url/image + twitter card presence
   - robots meta state (noindex where unexpected, missing where expected)
   - JSON-LD blocks that fail to parse
   - <img> missing alt, or missing width/height (CLS risk)
   - internal links without trailing slash (double-hop 301 risk) or pointing
     at routes that do not exist in dist/
   - approximate page weight: HTML + local CSS/JS/font/image references
   Exit code 1 if any HIGH severity finding, so it can gate CI later.
   Run: node tools/seo-audit.mjs [--indexable]
   --indexable = expectations for the LIVE site (no page-level noindex except
   deliberate ones); default = preview expectations (noindex everywhere OK).
   ========================================================================== */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';

const DIST = 'dist';
const INDEXABLE = process.argv.includes('--indexable');
// Pages that are ALLOWED to be noindex on the live site (funnels/thank-you).
const ALLOWED_NOINDEX = [/^\/thank-you\//, /^\/go\//];

const findings = []; // {sev, page, msg}
const add = (sev, page, msg) => findings.push({ sev, page, msg });

const walk = (dir) =>
  readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });

const htmlFiles = walk(DIST).filter((p) => p.endsWith('.html'));
const routeOf = (p) => '/' + relative(DIST, p).replace(/index\.html$/, '');

// Collect known routes for dead-link checking.
const knownRoutes = new Set(htmlFiles.map(routeOf));
knownRoutes.add('/robots.txt');
knownRoutes.add('/sitemap-index.xml');

const grab = (html, re) => { const m = html.match(re); return m ? m[1] : null; };
const grabAll = (html, re) => [...html.matchAll(re)].map((m) => m[1]);

let totalPages = 0;
const weights = [];

for (const file of htmlFiles) {
  totalPages++;
  const page = routeOf(file);
  const html = readFileSync(file, 'utf8');

  // --- title / description ---
  const title = grab(html, /<title>([^<]*)<\/title>/i);
  if (!title) add('HIGH', page, 'missing <title>');
  else {
    const t = title.replace(/&amp;/g, '&').replace(/&#39;|&apos;/g, "'");
    if (t.length > 60) add('MED', page, `title ${t.length} chars (>60): "${t}"`);
  }
  const desc = grab(html, /<meta name="description" content="([^"]*)"/i);
  if (!desc) add('HIGH', page, 'missing meta description');
  else {
    const d = desc.replace(/&amp;/g, '&').replace(/&#39;|&apos;/g, "'");
    if (d.length > 155) add('MED', page, `description ${d.length} chars (>155)`);
  }

  // --- H1 ---
  const h1s = (html.match(/<h1[\s>]/g) || []).length;
  if (h1s !== 1) add('HIGH', page, `H1 count is ${h1s} (must be exactly 1)`);

  // --- canonical ---
  const canonical = grab(html, /<link rel="canonical" href="([^"]*)"/i);
  if (!canonical) add('HIGH', page, 'missing canonical');
  else {
    if (!canonical.endsWith('/') && !canonical.match(/\.(xml|txt)$/))
      add('HIGH', page, `canonical not slashed: ${canonical}`);
    const ogUrl = grab(html, /<meta property="og:url" content="([^"]*)"/i);
    if (ogUrl && ogUrl !== canonical) add('MED', page, `og:url != canonical`);
  }

  // --- OG / twitter ---
  for (const p of ['og:title', 'og:description', 'og:url']) {
    if (!html.includes(`property="${p}"`)) add('MED', page, `missing ${p}`);
  }
  if (!html.includes('property="og:image"')) add('MED', page, 'missing og:image');
  if (!html.includes('name="twitter:card"')) add('MED', page, 'missing twitter:card');

  // --- robots expectations ---
  const noindex = /<meta name="robots" content="[^"]*noindex/i.test(html);
  if (INDEXABLE) {
    const allowed = ALLOWED_NOINDEX.some((re) => re.test(page));
    if (noindex && !allowed) add('HIGH', page, 'noindex present on a page that should be indexable');
  } else if (!noindex) {
    add('HIGH', page, 'preview build but page is NOT noindex');
  }

  // --- JSON-LD parses ---
  for (const block of grabAll(html, /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(block); } catch { add('HIGH', page, 'JSON-LD block fails to parse'); }
  }

  // --- images ---
  for (const imgTag of html.match(/<img [^>]*>/g) || []) {
    const src = (imgTag.match(/src="([^"]*)"/) || [])[1] || '?';
    if (!/alt="/.test(imgTag)) add('HIGH', page, `img missing alt: ${src.slice(0, 60)}`);
    if (!/width="/.test(imgTag) || !/height="/.test(imgTag))
      add('MED', page, `img missing width/height (CLS): ${src.slice(0, 60)}`);
  }

  // --- internal links ---
  for (const href of grabAll(html, /<a [^>]*href="(\/[^"#?]*)[#?"]?/g)) {
    if (href.match(/\.(xml|txt|pdf|svg|png|webp|jpg)$/)) continue;
    if (!href.endsWith('/')) add('MED', page, `unslashed internal link: ${href} (301 double-hop risk)`);
    const normalised = href.endsWith('/') ? href : href + '/';
    if (!knownRoutes.has(normalised)) add('HIGH', page, `dead internal link: ${href}`);
  }

  // --- approximate first-load weight (HTML + local assets referenced) ---
  let weight = statSync(file).size;
  const assetRefs = new Set([
    ...grabAll(html, /(?:src|href)="(\/_astro\/[^"]+)"/g),
    ...grabAll(html, /url\((\/_astro\/[^)]+)\)/g),
    ...grabAll(html, /srcset="([^"]*)"/g).flatMap((s) => s.split(',').map((x) => x.trim().split(' ')[0])).filter((s) => s.startsWith('/_astro/')),
  ]);
  for (const ref of assetRefs) {
    const p = join(DIST, ref.split('?')[0]);
    if (existsSync(p)) weight += statSync(p).size;
  }
  weights.push({ page, kb: Math.round(weight / 1024) });
  if (weight > 1_200_000) add('MED', page, `page weight ~${Math.round(weight / 1024)}KB (>1.2MB referenced)`);
}

// --- sitemap consistency: no noindex page should be in the sitemap ---
const smPath = join(DIST, 'sitemap-0.xml');
if (existsSync(smPath)) {
  const sm = readFileSync(smPath, 'utf8');
  const urls = grabAll(sm, /<loc>([^<]+)<\/loc>/g);
  for (const u of urls) {
    const path = new URL(u).pathname;
    const f = join(DIST, path.replace(/\/$/, '/index.html').replace(/^\//, ''));
    if (existsSync(f)) {
      const html = readFileSync(f, 'utf8');
      if (INDEXABLE && /<meta name="robots" content="[^"]*noindex/i.test(html))
        add('HIGH', path, 'page is noindex but present in sitemap');
    } else add('HIGH', path, 'sitemap URL has no matching file in dist');
  }
} else add('MED', '/', 'sitemap-0.xml not found');

// --- report ---
const order = { HIGH: 0, MED: 1 };
findings.sort((a, b) => order[a.sev] - order[b.sev] || a.page.localeCompare(b.page));
console.log(`\nSEO audit — ${totalPages} pages, mode: ${INDEXABLE ? 'INDEXABLE (live)' : 'preview'}\n`);
if (!findings.length) console.log('  ✓ No findings.\n');
for (const f of findings) console.log(`  [${f.sev}] ${f.page}  ${f.msg}`);
console.log('\nPage weights (HTML + referenced local assets):');
weights.sort((a, b) => b.kb - a.kb);
for (const w of weights) console.log(`  ${String(w.kb).padStart(5)}KB  ${w.page}`);
const high = findings.filter((f) => f.sev === 'HIGH').length;
console.log(`\n${findings.length} findings (${high} high).`);
process.exit(high ? 1 : 0);
