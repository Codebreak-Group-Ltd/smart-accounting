#!/usr/bin/env node
/* ============================================================================
   Post-cutover launch verification (playbook §11 step 6).
   Run AFTER DNS points at Netlify and the env flip is deployed:
     node tools/check-launch.mjs
   Checks, against the LIVE domain:
   1. Every legacy URL 301s once (no double hops) to a 200 target
   2. www -> apex 301; http -> https 301
   3. Homepage: 200, index,follow (no noindex meta), no X-Robots-Tag header
   4. robots.txt allows, sitemap present + referenced
   5. Every sitemap URL returns 200
   6. Security + cache headers present
   7. No pre-consent third-party hosts referenced as <script src>
   Exit 1 on any failure.
   ========================================================================== */

const BASE = process.env.CHECK_BASE || 'https://www.smartaccountingsolutions.co.uk';
let failures = 0;
const ok = (msg) => console.log(`  ✓ ${msg}`);
const bad = (msg) => { failures++; console.log(`  ✗ ${msg}`); };

const head = async (url) => {
  const res = await fetch(url, { method: 'GET', redirect: 'manual' });
  return { status: res.status, location: res.headers.get('location'), headers: res.headers, body: null, res };
};

// 1. Legacy redirects — keep in lockstep with public/_redirects.
const legacy = [
  ['/home/', '/'],
  ['/about-us/', '/about/'],
  ['/privacy-policy/', '/privacy/'],
  ['/testing/', '/'],
  ['/author/admin/', '/about/'],
  ['/feed/', '/'],
];
console.log('\n1. Legacy redirects (single hop -> 200):');
for (const [from, to] of legacy) {
  try {
    const r1 = await head(BASE + from);
    if (r1.status !== 301) { bad(`${from} returned ${r1.status}, expected 301`); continue; }
    const target = new URL(r1.location, BASE);
    if (target.pathname !== to) { bad(`${from} -> ${target.pathname}, expected ${to}`); continue; }
    const r2 = await head(target.href);
    if (r2.status !== 200) { bad(`${from} -> ${to} second hop returned ${r2.status} (double hop or dead)`); continue; }
    ok(`${from} -> ${to} (301 -> 200)`);
  } catch (e) { bad(`${from} fetch failed: ${e.message}`); }
}

// 2. Host canonicalisation — www is primary (Joel, 2026-08-28); apex 301s to it.
//    Legacy apex URLs therefore take apex -> www -> target (2 hops max, accepted).
console.log('\n2. Host canonicalisation:');
const APEX = BASE.replace('https://www.', 'https://');
try {
  const apex = await head(APEX + '/');
  if (apex.status >= 300 && apex.status < 400 && new URL(apex.location).hostname === new URL(BASE).hostname)
    ok(`apex -> www (${apex.status})`);
  else bad(`apex returned ${apex.status} -> ${apex.location}`);
} catch (e) { bad(`apex check failed: ${e.message}`); }
try {
  // A legacy path on the apex must chain apex -> www (path preserved) -> final target.
  const hop1 = await head(APEX + '/about-us/');
  if (hop1.status >= 300 && hop1.status < 400 && new URL(hop1.location).pathname === '/about-us/') {
    const hop2 = await head(new URL(hop1.location).href);
    if (hop2.status === 301 && new URL(hop2.location, BASE).pathname === '/about/') ok('apex legacy chain: apex -> www -> /about/ (2 hops)');
    else bad(`apex legacy chain broke at hop 2: ${hop2.status} -> ${hop2.location}`);
  } else bad(`apex legacy hop 1: ${hop1.status} -> ${hop1.location}`);
} catch (e) { bad(`apex legacy chain check failed: ${e.message}`); }
try {
  const http = await head(BASE.replace('https://', 'http://') + '/');
  if (http.status >= 300 && http.status < 400 && String(http.location).startsWith('https://')) ok(`http -> https (${http.status})`);
  else bad(`http returned ${http.status} -> ${http.location}`);
} catch (e) { bad(`http check failed: ${e.message}`); }

// 3. Homepage state
console.log('\n3. Homepage:');
try {
  const res = await fetch(BASE + '/');
  const html = await res.text();
  res.status === 200 ? ok('200') : bad(`status ${res.status}`);
  /<meta name="robots" content="[^"]*noindex/.test(html) ? bad('noindex META still present') : ok('no noindex meta');
  res.headers.get('x-robots-tag') ? bad(`X-Robots-Tag header present: ${res.headers.get('x-robots-tag')}`) : ok('no X-Robots-Tag header');
  html.includes('rel="canonical" href="' + BASE + '/"') ? ok('canonical matches live host') : bad('canonical does not match live host');
  /<script[^>]*src="[^"]*googletagmanager/.test(html) ? bad('gtag <script src> present pre-consent') : ok('no pre-consent gtag script tag');
  // security + cache headers
  for (const h of ['x-frame-options', 'x-content-type-options', 'referrer-policy', 'permissions-policy']) {
    res.headers.get(h) ? ok(`header ${h}`) : bad(`missing header ${h}`);
  }
  const asset = html.match(/(?:src|href)="(\/_astro\/[^"]+)"/)?.[1];
  if (asset) {
    const a = await fetch(BASE + asset);
    /immutable/.test(a.headers.get('cache-control') || '') ? ok('/_astro immutable cache') : bad(`/_astro cache-control: ${a.headers.get('cache-control')}`);
  }
} catch (e) { bad(`homepage check failed: ${e.message}`); }

// 4 + 5. robots + sitemap
console.log('\n4. robots.txt + sitemap:');
try {
  const robots = await (await fetch(BASE + '/robots.txt')).text();
  robots.includes('Allow: /') && !robots.includes('Disallow: /\n') ? ok('robots allows crawling') : bad(`robots.txt:\n${robots}`);
  robots.includes('Sitemap:') ? ok('sitemap referenced in robots') : bad('no Sitemap: line in robots');
  const smi = await (await fetch(BASE + '/sitemap-index.xml')).text();
  const smUrl = smi.match(/<loc>([^<]+)<\/loc>/)?.[1];
  const sm = await (await fetch(smUrl)).text();
  const urls = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  console.log(`   sitemap has ${urls.length} URLs`);
  for (const u of urls) {
    if (!u.startsWith(BASE)) { bad(`sitemap URL on wrong host: ${u}`); continue; }
    const r = await head(u);
    r.status === 200 ? ok(`200 ${new URL(u).pathname}`) : bad(`${r.status} ${u}`);
  }
} catch (e) { bad(`robots/sitemap check failed: ${e.message}`); }

// 6. llms.txt
console.log('\n5. AEO:');
try {
  const r = await fetch(BASE + '/llms.txt');
  r.status === 200 ? ok('llms.txt 200') : bad(`llms.txt ${r.status}`);
} catch (e) { bad(`llms.txt failed: ${e.message}`); }

console.log(failures ? `\n${failures} FAILURES — do not sign off.\n` : '\nAll launch checks passed.\n');
process.exit(failures ? 1 : 0);
