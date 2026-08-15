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

Hosting is **Cloudflare Pages** (project `amz-savvy-website`). The domain is
still *registered* at Hostinger; only its DNS is on Cloudflare.

Live at <https://amzsavvy.com> and <https://www.amzsavvy.com>.

To ship a change:

```bash
npm run deploy
```

Builds and uploads `out/` to Cloudflare Pages. Live in well under a minute.

If it returns 401, re-authenticate with `npx wrangler login`.

### Infrastructure

| Thing | Value |
| --- | --- |
| Cloudflare account | `amzsavvy.llc@gmail.com` |
| Zone | `amzsavvy.com` (active, Free plan) |
| Nameservers | `bonnie.ns.cloudflare.com`, `quincy.ns.cloudflare.com` |
| Pages project | `amz-savvy-website` → `amz-savvy-website.pages.dev` |
| Registrar | Hostinger (unchanged) |

DNS zone (6 records + DMARC): apex and `www` are CNAMEs to
`amz-savvy-website.pages.dev` (proxied; Cloudflare flattens the apex). The rest
is email — see below.

### ⚠️ Email records — do not delete

| Type | Name | Purpose |
| --- | --- | --- |
| MX | `@` | `mx1.titan.email` (10) |
| MX | `@` | `mx2.titan.email` (20) |
| TXT | `@` | SPF — `v=spf1 include:spf.titan.email ~all` |
| TXT | `titan2._domainkey` | DKIM signing key |
| TXT | `_dmarc` | `v=DMARC1; p=none; …` (monitoring) |

Mail runs on **Titan**. Cloudflare's automatic DNS scan during migration
**missed the DKIM record** — it only probes common names and never finds DKIM
selectors. A pre-migration snapshot is kept at `dns-backup-amzsavvy.txt`. If DNS
is ever moved again, diff the new zone against that file before switching
nameservers.

DMARC is deliberately at `p=none` (monitor only, nothing gets rejected). It has
no `rua=` reporting address yet — that needs a real mailbox **on amzsavvy.com**;
a Gmail address will not work without an authorisation record on Google's side.
Once reports look clean, tighten to `p=quarantine`.

### Rollback to GitHub Pages

The GitHub Pages copy still exists at
<https://github.com/amzsavvyllc-glitch/amz-savvy-website> (`gh-pages` branch).

```bash
npm run deploy:github
```

That refreshes the fallback but does **not** make it live. To actually roll
back, point the Hostinger nameservers back to `ns1.dns-parking.com` /
`ns2.dns-parking.com`.

Two files exist only for that fallback and must survive in `public/`:

- `.nojekyll` — without it GitHub runs Jekyll, which skips any folder starting
  with `_`, including Next's `_next/`, and the site loads with no CSS or JS.
- `CNAME` — holds the custom domain for GitHub Pages.

Both are harmless on Cloudflare. `deploy:github` checks for them before pushing.

## Where the content lives

**Everything editable is in [`src/lib/site-config.ts`](src/lib/site-config.ts).**
Copy, services, process steps, case studies, testimonials, FAQ, contact details
— all of it. You should rarely need to touch a component.

### Proof and claims — read before editing

There are **no placeholders left**. Every claim on the page is one AMZ Savvy can
stand behind:

| Block | Where | Status |
| --- | --- | --- |
| Stats band | `stats` | Confirmed accurate by the owner, 2026-07-30 |
| Playbooks | `playbooks` | Describes **method**, not client outcomes |
| Fit check | `fitCheck` | First-person statements, nothing third-party |

The site deliberately contains **no testimonials and no case studies**. Earlier
drafts had invented ones; they were removed rather than published. The FTC's
Consumer Reviews and Testimonials Rule prohibits testimonials from people who do
not exist, and in the Amazon niche specifically, a prospect who cannot verify a
named client reads it as a faked review.

**To add real proof later:** get written permission from the client, then either
add a `testimonials` array back (real name, real role) or convert `playbooks`
into case studies with real before/after numbers. Ask and this can be rebuilt in
minutes — the layout already supports it.

Real, verifiable trust signals already carrying the page: the Amazon Ads Verified
Partner badge, the marketplace list, the process transparency, and the calculator
(which lets a visitor prove the core claim with their own numbers).

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
  sections.tsx            services, process, playbook tabs, fit check
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
