/* Preview password gate (playbook §1).
 *
 * Runs on every request. If PREVIEW_PASSWORD is set, the whole site (pages AND
 * assets) requires HTTP Basic Auth, so unfinished work cannot leak or be indexed —
 * crawlers receive 401 and never see content. Unset the env var to open the site;
 * that is the single-step ungate at launch (and a documented cutover step).
 *
 * Env vars (set in the Netlify UI, never committed):
 *   PREVIEW_PASSWORD  required to enable the gate
 *   PREVIEW_USER      optional, defaults to "client"
 */
import type { Context } from '@netlify/edge-functions';

export default async (request: Request, _context: Context) => {
  const password = Netlify.env.get('PREVIEW_PASSWORD');
  // Gate disabled when no password is configured — pass straight through.
  if (!password) return;

  const user = Netlify.env.get('PREVIEW_USER') || 'client';
  const expected = 'Basic ' + btoa(`${user}:${password}`);
  const provided = request.headers.get('authorization') || '';

  // Constant-ish comparison is unnecessary here (shared preview credential), but we
  // still avoid leaking which of user/pass was wrong by checking the whole header.
  if (provided !== expected) {
    return new Response('Authentication required.', {
      status: 401,
      headers: {
        'WWW-Authenticate':
          'Basic realm="Smart Accounting Solutions — private preview", charset="UTF-8"',
        'Content-Type': 'text/plain; charset=utf-8',
        // Belt-and-braces: never let a gated response be indexed or cached.
        'X-Robots-Tag': 'noindex, nofollow',
        'Cache-Control': 'no-store',
      },
    });
  }

  // Authorised — continue to the static asset.
  return;
};

export const config = { path: '/*' };
