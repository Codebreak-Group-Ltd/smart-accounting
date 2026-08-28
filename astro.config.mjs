import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Canonical host is WWW (Joel's decision, 2026-08-28) — www is the primary domain
// in Netlify, apex 301s to it at the edge. The old WordPress site canonicalised the
// other way (apex), so legacy apex URLs take one extra hop (apex -> www -> target);
// equity still follows. SITE_URL in Netlify must match; this is the fallback.
// Trailing-slash canon (playbook §1): canonical == sitemap URL == the URL that returns 200.
const SITE = process.env.SITE_URL || 'https://www.smartaccountingsolutions.co.uk';

export default defineConfig({
  site: SITE,
  trailingSlash: 'always',
  output: 'static',
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto',
  },
  image: {
    // sharp is the build-time image service (playbook §5).
  },
  integrations: [
    sitemap({
      // Hidden/ad pages (noindex) are excluded from the sitemap at the page level
      // via this filter once funnels exist (playbook §4).
      filter: (page) => !page.includes('/thank-you/') && !page.includes('/go/'),
    }),
  ],
});
