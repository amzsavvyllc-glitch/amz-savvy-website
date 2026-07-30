#!/usr/bin/env bash
# Build the static site and publish it to the gh-pages branch.
#
#   npm run deploy
#
# Source code lives on `main`; the built site lives on `gh-pages`.
# GitHub Pages serves gh-pages at https://amzsavvy.com
set -euo pipefail

REPO="https://github.com/amzsavvyllc-glitch/amz-savvy-website.git"
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

cd "$ROOT"

echo "▸ Building…"
npm run build

# CNAME + .nojekyll live in public/ so they are copied into out/ automatically.
# .nojekyll is REQUIRED: without it GitHub runs Jekyll, which ignores any
# directory starting with an underscore — including Next's _next/ — and the
# site loads with no CSS or JS.
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
    commit -q -m "Deploy $(date -u '+%Y-%m-%d %H:%M UTC')"
git push -q -f "$REPO" gh-pages

echo "✓ Deployed. Live in ~1 minute at https://amzsavvy.com"
