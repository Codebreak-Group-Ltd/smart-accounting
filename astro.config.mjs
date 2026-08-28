import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Canonical host is the APEX (no www) — the pre-existing WordPress site
// canonicalised www -> apex, so all indexed URLs and link equity live there
// (verified 2026-08-28). SITE_URL in Netlify should match; this is the fallback.
// Trailing-slash canon (playbook §1): canonical == sitemap URL == the URL that returns 200.
const SITE = process.env.SITE_URL || 'https://smartaccountingsolutions.co.uk';

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
