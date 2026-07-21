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
 *
 * Implementation note: we DECODE the incoming Authorization header and compare,
 * rather than btoa()-encoding our own expected value — btoa throws on any non-Latin1
 * character in the password, which would crash the function. All parsing is guarded.
 */

export default async (request: Request) => {
  const password = Netlify.env.get('PREVIEW_PASSWORD');
  // Gate disabled when no password is configured — pass straight through.
  if (!password) return;

  const user = Netlify.env.get('PREVIEW_USER') || 'client';
  const header = request.headers.get('authorization') || '';

  let authorized = false;
  if (header.startsWith('Basic ')) {
    try {
      const decoded = atob(header.slice(6).trim()); // "user:password"
      const sep = decoded.indexOf(':');
      if (sep !== -1) {
        authorized =
          decoded.slice(0, sep) === user && decoded.slice(sep + 1) === password;
      }
    } catch {
      authorized = false;
    }
  }

  if (!authorized) {
    return new Response('Authentication required.', {
      status: 401,
      headers: {
        'WWW-Authenticate':
          'Basic realm="Smart Accounting Solutions - private preview", charset="UTF-8"',
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
