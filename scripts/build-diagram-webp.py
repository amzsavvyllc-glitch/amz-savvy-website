#!/usr/bin/env python3
"""
Write an 800w and 1400w WebP next to every diagram PNG.

`output: "export"` means next/image is unavailable, so responsive images are a
build step instead. Run this after adding or redrawing any diagram:

    python3 scripts/build-diagram-webp.py

800w covers a phone at 2x DPR (the rendered box is ~343 CSS px); 1400w covers a
desktop retina screen. The PNG is left untouched as the <picture> fallback and
as the og:image. Idempotent — safe to re-run.
"""
import glob, os, sys

try:
    from PIL import Image
except ImportError:
    sys.exit("Pillow required:  python3 -m venv .venv && .venv/bin/pip install pillow")

WIDTHS = (800, 1400)
QUALITY = 82

def main() -> int:
    srcs = [p for p in sorted(glob.glob("public/answers/*.png") + glob.glob("public/blog/*.png"))]
    if not srcs:
        sys.exit("No diagram PNGs found — run from the repo root.")

    png_bytes = webp_bytes = 0
    for p in srcs:
        src = Image.open(p).convert("RGB")
        png_bytes += os.path.getsize(p)
        for w in WIDTHS:
            out = p.replace(".png", f"-{w}.webp")
            im = src if src.width == w else src.resize(
                (w, round(w * src.height / src.width)), Image.LANCZOS
            )
            im.save(out, "WEBP", quality=QUALITY, method=6)
            webp_bytes += os.path.getsize(out)

    n = len(srcs)
    print(f"{n} diagrams -> {n * len(WIDTHS)} WebP files")
    print(f"  PNG  {png_bytes / 1024 / 1024:.2f} MB ({png_bytes // n // 1024} KB avg)")
    print(f"  WebP {webp_bytes / 1024 / 1024:.2f} MB across both widths")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
