/**
 * Diagram — the one place a brand diagram is turned into markup.
 *
 * `output: "export"` rules out next/image, so the responsive work is done at
 * build time instead: scripts/build-diagram-webp.py writes an 800w and a 1400w
 * WebP next to every PNG, and this component offers them to the browser.
 *
 * Only ONE file is ever downloaded. The PNG stays as the universal fallback
 * and remains the og:image, because social crawlers are the last place WebP
 * support is still uneven — and it costs nothing, since a browser that takes
 * the <source> never requests it.
 *
 * Measured: 151 KB average as PNG, 16 KB at 800w WebP — what a phone actually
 * gets. That gap is why scrolling used to outrun the image loading.
 *
 * Not a client component: this renders to plain HTML and must cost zero JS.
 */

type DiagramImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export function Diagram({
  image,
  sizes,
  className,
  /** Set on the one image per page that is at or just below the fold — it is
   *  the mobile LCP candidate, so it must not wait behind lazy-loading. */
  priority = false,
}: {
  image: DiagramImage;
  sizes: string;
  className?: string;
  priority?: boolean;
}) {
  const webp = (w: number) => image.src.replace(/\.png$/, `-${w}.webp`);

  return (
    // display:contents so the <picture> never becomes a layout box of its own —
    // the <img> stays the direct child of whatever flex/grid parent it is in.
    <picture className="contents">
      <source
        type="image/webp"
        srcSet={`${webp(800)} 800w, ${webp(1400)} 1400w`}
        sizes={sizes}
      />
      <img
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        decoding="async"
        // The box is already reserved by width/height, but until the image
        // arrives it would be a white hole. Painting it the diagram's own
        // background means the image resolves into place rather than flashing.
        style={{ backgroundColor: "#021d33" }}
        className={className}
      />
    </picture>
  );
}
