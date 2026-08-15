#!/usr/bin/env bash
# ROLLBACK ONLY — publish to the old GitHub Pages host.
#
#   npm run deploy:github
#
# The live site is Cloudflare Pages (npm run deploy). This script exists so the
# GitHub Pages copy can be kept current as a fallback. It only becomes the live
# site again if the nameservers at Hostinger are pointed back to
# ns1.dns-parking.com / ns2.dns-parking.com.
set -euo pipefail

REPO="https://github.com/amzsavvyllc-glitch/amz-savvy-website.git"
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

cd "$ROOT"

echo "▸ Building…"
npm run build

# .nojekyll is REQUIRED on GitHub Pages: without it Jekyll ignores any directory
# starting with an underscore — including Next's _next/ — and the site loads
# with no CSS or JS. CNAME carries the custom domain.
for f in CNAME .nojekyll; do
  [ -f "out/$f" ] || { echo "✗ out/$f missing — check public/$f"; exit 1; }
done

echo "▸ Publishing to gh-pages…"
cd out
rm -rf .git
git init -q
git checkout -q -b gh-pages
git add -A
git -c user.email="amzsavvy.llc@gmail.com" -c user.name="AMZ Savvy" \
    commit -q -m "Rollback deploy $(date -u '+%Y-%m-%d %H:%M UTC')"
git push -q -f "$REPO" gh-pages

echo "✓ Pushed to gh-pages. NOT live unless nameservers point back to Hostinger."
