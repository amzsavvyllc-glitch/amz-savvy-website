#!/usr/bin/env bash
# Build the static site and publish it to Cloudflare Pages (the LIVE host).
#
#   npm run deploy
#
# amzsavvy.com is served by the Cloudflare Pages project `amz-savvy-website`.
# For the old GitHub Pages host (kept only as a rollback) see deploy-github.sh.
set -euo pipefail

PROJECT="amz-savvy-website"
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

cd "$ROOT"

echo "▸ Building…"
npm run build

# The GitHub rollback script inits a git repo inside out/ so it can push a
# gh-pages branch. If that directory survives, wrangler uploads the whole
# .git folder as public static files. Always clear it first.
rm -rf out/.git

if [ ! -f out/index.html ]; then
  echo "✗ out/index.html missing — build did not produce a site"; exit 1
fi

echo "▸ Deploying to Cloudflare Pages…"
npx wrangler pages deploy out \
  --project-name="$PROJECT" \
  --branch=main \
  --commit-dirty=true

echo
echo "✓ Deployed. Live at https://amzsavvy.com (and https://www.amzsavvy.com)"
echo "  If it 401s, re-auth with: npx wrangler login"
