import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Live domain not confirmed yet. Placeholder until cutover — update in one place.
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
