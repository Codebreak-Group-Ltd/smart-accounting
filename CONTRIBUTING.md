# Contributing — Smart Accounting Solutions website

This repo powers the live Smart Accounting Solutions site. Anyone on the team can
propose a change and ship it. This is how we do it safely, so the site is always in a
state we would happily show the client.

Read `ONBOARDING.md` before your first edit session. Read `LAUNCH.md` for what is done,
what is open, and the client inputs we are still waiting on.

## The workflow — request to live

1. **Ask in the Buzz channel.** Drop what you want in plain English — "change the hero
   headline on About", "add Craig's new testimonial", "fix the pricing table spacing".
   An agent (Fizz, Bumble or Honey) or a teammate picks it up.
2. **Branch off latest `main`.** One change, one branch. Independent changes go on
   independent branches so pull requests can merge in any order.
3. **Open a pull request.** Describe what changed and why. Keep it focused.
4. **Review the Netlify Deploy Preview.** Every PR gets an automatic preview URL — a
   real, clickable build of the site with your change in it. Look at it before merging.
5. **Merge to `main`.** Netlify builds and deploys `dist/` **live** automatically.
   No manual uploads.

**No direct pushes to `main`.** Everything goes through a PR and a preview. The whole
team can review and merge.

## Guardrails

- **Copy is client-approved and immutable.** Do not rewrite visible page copy (headlines,
  body, FAQs). SEO titles and meta descriptions are build-owned — those we do control.
- **Site-wide changes get their own PR.** Shared components (header, footer, design
  tokens, the Base layout) affect every page, so never bundle them into a page-specific
  change. One shared-component PR, reviewed on its own.
- **House style** (see `ONBOARDING.md`): UK English. No em or en dashes. No contractions
  in formal copy. No emoji. No exclamation marks. NAP and legals come from
  `src/data/site.ts` — the single source of truth — never hardcoded.
- **Assets:** every image has descriptive alt text, is sized to its slot, and is WebP.
  Fonts are self-hosted only — never a Google Fonts `<link>`.
- **Preview gate stays on.** Keep `PREVIEW_PASSWORD` set and `PUBLIC_INDEXABLE` off until
  launch, so we can push freely without the public seeing half-built work.

## Local development

```bash
nvm use            # Node per .nvmrc
npm install
npm run dev        # http://localhost:4321
npm run build      # static build to dist/ — must pass before you open a PR
npm run preview    # serve the built dist/ locally
```

**Every PR must build clean** (`npm run build` with no errors). If the build fails, the
Netlify preview fails too.

## Commit sign-off

Every commit needs two trailers for the human operator who is accountable for the change,
using the exact `user.name` and `user.email` configured in this repo:

```bash
git commit \
  --trailer "Co-authored-by: Name <email>" \
  --trailer "Signed-off-by: Name <email>"
```

`Co-authored-by` gives GitHub contribution credit; `Signed-off-by` records accountability.
One blank line separates the trailer block from the commit body. If `git config
user.email` is empty, stop and ask before committing — do not guess.

## Pull request checklist

- [ ] Branched off latest `main`, one focused change
- [ ] `npm run build` passes clean
- [ ] Netlify Deploy Preview reviewed and looks right
- [ ] No visible client copy rewritten (SEO title/meta only)
- [ ] Site-wide component changes are in their own PR
- [ ] House style respected (UK English, no dashes/contractions/emoji/exclamation marks)
- [ ] Images: alt text, sized to slot, WebP
- [ ] `LAUNCH.md` updated if this moves an open item
- [ ] Commit carries `Signed-off-by` and `Co-authored-by` trailers

## Who is who

| Name | Role |
|------|------|
| Fizz | Maker — turns channel requests into branches, PRs and live deploys |
| Bumble | Team agent |
| Honey | Team agent |

Drop a request in the channel and tag whoever you want on it. Let's build. 🐝
