# AMZ Savvy — website (v2)

Modern, interactive, conversion-optimised rebuild of the AMZ Savvy landing page.
Next.js 16 (App Router) + Tailwind v4 + shadcn/ui, exported as a **static site**.

The previous single-file version still lives untouched at
`/Users/mehran/amz-savvy-website/index.html`.

## Run it

```bash
npm run dev
```

Serves on <http://localhost:3200> (see `~/.claude/launch.json` → `amz-savvy-v2`).

## Deploy

Hosting is **GitHub Pages** (free). The domain stays registered at Hostinger —
only its DNS records point at GitHub.

- Repo: <https://github.com/amzsavvyllc-glitch/amz-savvy-website>
- `main` = source, `gh-pages` = the built site GitHub serves
- Live at <https://amzsavvy.com>

To ship a change:

```bash
npm run deploy
```

That builds and force-pushes `out/` to `gh-pages`. Live in about a minute.

### DNS (set once, at Hostinger hPanel → Domains → DNS Zone)

| Type | Name | Value |
| --- | --- | --- |
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| CNAME | `www` | `amzsavvyllc-glitch.github.io` |

Remove the old `A @ → 195.35.38.156` record. **Do not touch MX or TXT records** —
those carry email and domain verification, and they are unaffected by hosting.

Once DNS resolves, tick **Enforce HTTPS** in repo Settings → Pages (GitHub
issues the certificate free, but only after the domain points at it).

### Two things that will break Pages if lost

- `public/.nojekyll` — without it GitHub runs Jekyll, which skips any folder
  starting with `_`, including Next's `_next/`. The site loads with no CSS/JS.
- `public/CNAME` — holds the custom domain. If it disappears from a deploy,
  Pages reverts to the `github.io` address.

`npm run deploy` checks both are present before pushing.

### Automatic deploys (optional)

`.github/workflows/deploy.yml` is written and ready but **not committed** — the
current `gh` token lacks the `workflow` scope, so GitHub rejects the push. To
turn on build-on-push:

```bash
gh auth refresh -s workflow
```

then remove `.github/workflows/` from `.gitignore` and commit the file.

## Where the content lives

**Everything editable is in [`src/lib/site-config.ts`](src/lib/site-config.ts).**
Copy, services, process steps, case studies, testimonials, FAQ, contact details
— all of it. You should rarely need to touch a component.

### ⚠️ Placeholders to replace

Search `site-config.ts` for `placeholder: true`:

| What | Where | Currently |
| --- | --- | --- |
| Stats band | `stats` | $8M+ / 120+ / 4.6x / 9 — invented |
| Case studies | `caseStudies` | 3 invented results |
| Testimonials | `testimonials` | 3 invented quotes, "Placeholder Name" |

Placeholder case studies and testimonials render a visible amber **"⚠ Placeholder"**
chip on the page so they cannot be shipped by accident. Delete the chip markup in
`src/components/site/sections.tsx` once real content is in.

Real, verifiable trust signals already in place and safe to keep: the Amazon Ads
Verified Partner badge, the marketplace list, and the process transparency.

## Structure

```
src/app/layout.tsx        fonts, metadata, JSON-LD (Org + WebSite + FAQPage)
src/app/page.tsx          section order
src/app/globals.css       brand tokens, scroll-reveal, reduced-motion
src/lib/site-config.ts    ALL content
src/components/site/
  primitives.tsx          logo, partner badge, animated counter, reveal, CTA
  header.tsx              sticky nav, mobile menu, scroll progress
  hero.tsx                hero + glass stats card + marketplace marquee
  calculator.tsx          wasted-spend calculator
  sections.tsx            services, process, results tabs, testimonials
  convert.tsx             FAQ, Calendly, contact form, footer, WhatsApp FAB
```

`src/components/ui/glassmorphism-trust-hero.tsx` is the original 21st.dev
component the hero was adapted from. It is **not imported** — kept as reference.
Safe to delete.

## Design decisions

- **Brand tokens** — navy `#253247` and green `#4fc47f` expanded into full
  scales in `globals.css` (`navy-50…950`, `brand-300…700`). Neutral scale
  structure taken from the UI/UX Pro Max "B2B Service" palette.
- **Type** — Montserrat (brand face) for headings, Inter for body. Montserrat
  reads poorly at paragraph length, so it is display-only.
- **Motion** — scroll reveal is 14px + 450ms ease-out, per Pro Max motion
  guidance ("small offset so it reads as a fade, not a slide"). Content is
  **visible by default** and only animated once JS confirms it can restore it,
  so crawlers and no-JS visitors always see the copy. Fully disabled under
  `prefers-reduced-motion`.
- **Conversion structure** — follows the Pro Max funnel pattern: a mini-CTA per
  section rather than one CTA at the bottom. Hero → services → calculator →
  process (+CTA) → results → testimonials → FAQ → booking → contact.
- **The calculator is the hook.** It lets a visitor self-qualify with no email
  gate, which is a stronger opener than a form. Its output is explicitly framed
  as an estimate, not a promise.

## Honesty notes

- The marketplace marquee lists marketplaces, **not client logos** — inventing
  client brands would be fabricated social proof.
- The hero's "42% → 21%" bar is labelled as an illustrative range, not a claim.
- The calculator carries a disclaimer that it holds ad sales constant and is
  not a forecast.

## Not done yet

- `public/sitemap.xml` still lists only `/`. Fine for a one-pager.
- No raster OG social card, so link previews are text-only until a 1200×630 PNG
  is added and referenced from `layout.tsx`.
- Favicon is still the Next.js default; `public/logo.svg` is the real mark.
