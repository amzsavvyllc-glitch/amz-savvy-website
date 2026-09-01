/**
 * ui.tsx — presentational primitives with NO client behaviour.
 *
 * Deliberately has no "use client". Every component here is pure markup, so
 * keeping it out of the client graph means its JSX, its copy and its icons are
 * rendered to HTML and never shipped, parsed or hydrated a second time.
 *
 * These lived in primitives.tsx, whose "use client" was required only by
 * RevealProvider and Counter — but the directive marks the whole MODULE as a
 * client entry point, so importing CtaButton for a static page dragged the
 * entire file across the boundary. That is why this split exists: the boundary
 * belongs around the two components that actually need it, not around the file
 * they happen to share.
 *
 * If you add anything here that needs state, an effect or an event handler, it
 * belongs in primitives.tsx instead — not a "use client" on this file.
 */

import { cn } from "@/lib/utils";
import { profiles } from "@/lib/site-config";

/* The official Amazon Ads partner-directory listing — the badge links here so
   anyone can independently verify the credential on Amazon's own site. */
const AMAZON_PARTNER_URL =
  profiles.find((p) => p.includes("advertising.amazon.com")) ?? profiles[0];

/** Staggered reveal delay. Capped, because the stagger is per-item but the
 *  wait is cumulative: an 8-item grid at 60ms used to leave the last card
 *  480ms behind the first, on top of the 450ms fade. */
const MAX_STAGGER_MS = 180;
export function revealDelay(i: number, step = 40) {
  return {
    "--reveal-delay": `${Math.min(i * step, MAX_STAGGER_MS)}ms`,
  } as React.CSSProperties;
}

/* ------------------------------------------------------------------
   Logo — green target rings with a white paper plane launching out.
   ------------------------------------------------------------------ */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg viewBox="0 0 48 48" className="h-8 w-8 shrink-0" aria-hidden="true">
        <circle cx="21" cy="27" r="17" fill="none" stroke="currentColor" strokeWidth="3" className="text-brand-500" />
        <circle cx="21" cy="27" r="10.5" fill="none" stroke="currentColor" strokeWidth="3" className="text-brand-500/70" />
        <circle cx="21" cy="27" r="4" fill="currentColor" className="text-brand-500" />
        <path d="M44 6 L28.5 20.5 L34 23.5 Z" fill="#fff" />
        <path d="M44 6 L34 23.5 L31.5 17.5 Z" fill="#fff" fillOpacity="0.75" />
      </svg>
      <span className="font-heading text-lg font-extrabold tracking-tight">
        AMZ<span className="text-brand-500">Savvy</span>
      </span>
    </span>
  );
}

/* ------------------------------------------------------------------
   Amazon Ads Verified Partner badge — the OFFICIAL Amazon Ads asset,
   used unmodified and linked to AMZ Savvy's live listing in Amazon's
   partner directory. A real, independently verifiable credential, so it
   carries more conversion weight than any invented stat.
   ------------------------------------------------------------------ */
export function PartnerBadge({
  className,
  width = 156,
}: {
  className?: string;
  /** Rendered width in px. Intrinsic asset is 480×366 (ratio 1.311). */
  width?: number;
}) {
  const height = Math.round((width * 366) / 480);
  return (
    <a
      href={AMAZON_PARTNER_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Amazon Ads Verified Partner — view AMZ Savvy's listing in Amazon's partner directory"
      className={cn(
        "inline-block rounded-xl transition-transform duration-200 hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
        className,
      )}
    >
      <img
        src="/amazon-ads-verified-partner.png"
        alt="Amazon Ads Verified Partner"
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
        draggable={false}
        className="block h-auto select-none"
        style={{ width }}
      />
    </a>
  );
}

/* ------------------------------------------------------------------
   Section heading
   ------------------------------------------------------------------ */
export function SectionHeading({
  eyebrow,
  title,
  sub,
  tone = "light",
  as: Heading = "h2",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  sub?: string;
  tone?: "light" | "dark";
  /** Pages that use this as their page title must pass "h1". */
  as?: "h1" | "h2";
  className?: string;
}) {
  // An h1 is the page title and the likely LCP element. Hiding it until
  // hydration pushes LCP from first paint to post-JS, which is a ranking cost.
  const revealProps = Heading === "h1" ? {} : { "data-reveal": true };
  return (
    <div className={cn("max-w-2xl", className)} {...revealProps}>
      {eyebrow && (
        <div
          className={cn(
            "mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em]",
            tone === "dark" ? "text-brand-400" : "text-brand-600",
          )}
        >
          <span className="h-px w-6 bg-current" />
          {eyebrow}
        </div>
      )}
      <Heading
        className={cn(
          "text-balance text-3xl font-extrabold leading-[1.1] sm:text-4xl lg:text-5xl",
          tone === "dark" ? "text-white" : "text-navy-800",
        )}
      >
        {title}
      </Heading>
      {sub && (
        <p
          className={cn(
            "mt-4 text-lg leading-relaxed",
            tone === "dark" ? "text-navy-200" : "text-navy-500",
          )}
        >
          {sub}
        </p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------
   Buttons
   ------------------------------------------------------------------ */
export function CtaButton({
  href,
  children,
  variant = "primary",
  className,
  ...rest
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost" | "dark";
} & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      href={href}
      className={cn(
        "group inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold transition-all duration-200 active:scale-[0.98]",
        variant === "primary" &&
          "bg-brand-500 text-navy-900 shadow-lg shadow-brand-500/25 hover:bg-brand-400 hover:shadow-xl hover:shadow-brand-500/30",
        variant === "ghost" &&
          "border border-white/15 bg-white/5 text-white sm:backdrop-blur-sm hover:border-white/30 hover:bg-white/10",
        variant === "dark" &&
          "bg-navy-700 text-white hover:bg-navy-600",
        className,
      )}
      {...rest}
    >
      {children}
    </a>
  );
}
