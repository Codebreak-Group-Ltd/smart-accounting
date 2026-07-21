import type { APIRoute } from 'astro';

// PUBLIC_INDEXABLE gates indexing. Unset/anything-but-"true" (the preview default) →
// disallow everything. Set to "true" at launch → allow + advertise the sitemap.
const indexable = import.meta.env.PUBLIC_INDEXABLE === 'true';

export const GET: APIRoute = ({ site }) => {
  const body = indexable
    ? [
        'User-agent: *',
        'Allow: /',
        '',
        // Ad/thank-you routes stay out even when the site is public.
        'Disallow: /thank-you/',
        'Disallow: /go/',
        '',
        `Sitemap: ${new URL('sitemap-index.xml', site).href}`,
        '',
      ].join('\n')
    : [
        '# Private preview build — not for indexing.',
        'User-agent: *',
        'Disallow: /',
        '',
      ].join('\n');

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
