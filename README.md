# Smart Accounting Solutions — website

Marketing site for Smart Accounting Solutions (Penistone, Yorkshire). Built with
**Astro** (static output), deployed on **Netlify** via GitHub CI. Built to the
[Codebreak Website Build Playbook](CODEBREAK-WEBSITE-PLAYBOOK.md).

## Local development

```bash
nvm use            # Node 22 (.nvmrc)
npm install
npm run dev        # http://localhost:4321
npm run build      # static build to dist/
npm run preview    # serve the built dist/
```

## Stack & conventions

- **Astro static**, `trailingSlash: 'always'` — the 200 URL, canonical and sitemap URL all match.
- Design tokens in `src/styles/tokens.css` (pure `:root`, no selectors).
- Fonts self-hosted (Gotham woff + Inter via `@fontsource`); **never** a Google Fonts `<link>`.
- Single source of truth for NAP/legals/CTAs: `src/data/site.ts`.
- Copy is client-approved — do not rewrite. SEO title/meta are build-owned (see `LAUNCH.md`).

## Deployment

Push to `main` → Netlify builds (`npm run build`) and deploys `dist/`.

### Preview gate (while in build)

The whole site is behind HTTP Basic Auth via a Netlify Edge Function
(`netlify/edge-functions/preview-gate.ts`). Set in the Netlify UI:

| Env var | Purpose |
|---|---|
| `PREVIEW_PASSWORD` | Enables the gate. **Unset it to open the site (launch step).** |
| `PREVIEW_USER` | Optional, defaults to `client`. |
| `PUBLIC_INDEXABLE` | `false`/unset = `noindex` + `robots: Disallow /`. Set `true` at launch. |
| `SITE_URL` | Real domain for canonicals/sitemap. Set at launch. |

While `PUBLIC_INDEXABLE` is unset, robots.txt disallows everything and every page is
`noindex` — belt-and-braces behind the auth gate.

### Launch (see LAUNCH.md for the full sequence)

1. Set `SITE_URL` to the live domain, `PUBLIC_INDEXABLE=true`.
2. Delete `PREVIEW_PASSWORD` to open the site.
3. Verify homepage 200 + `index,follow` + no `X-Robots-Tag`, submit sitemap.

## Docs

- `LAUNCH.md` — living runbook (done / open / launch steps).
- `ONBOARDING.md` — read before each edit session.
- `CODEBREAK-WEBSITE-PLAYBOOK.md` — the build standard.
