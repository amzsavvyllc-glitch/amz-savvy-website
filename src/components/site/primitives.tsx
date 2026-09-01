"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { profiles } from "@/lib/site-config";

/* The official Amazon Ads partner-directory listing — the badge links here so
   anyone can independently verify the credential on Amazon's own site. */
const AMAZON_PARTNER_URL =
  profiles.find((p) => p.includes("advertising.amazon.com")) ?? profiles[0];

/* ------------------------------------------------------------------
   RevealProvider

   Adds `js-reveal-ready` to <html> only after mount, so the fade-up
   styles never apply for no-JS users or crawlers (content stays
   visible). Then observes every [data-reveal] node.

   The hard constraint here: THIS EFFECT RUNS AFTER FIRST PAINT. The
   browser has already painted the server HTML — fully visible — before
   React hydrates. So everything this does is a *correction* applied to
   something the reader may already be looking at, and the cost of
   getting it wrong is content disappearing under them. Hence the three
   guards below (small screens, late hydration, above-the-fold), and the
   failsafe: content must never depend on an animation to be readable.
   ------------------------------------------------------------------ */

/** Below this width the reveal is skipped entirely — see NO_ANIMATE_BELOW use. */
const NO_ANIMATE_BELOW = 768;
/** If hydration took longer than this, the reader is already reading. */
const LATE_HYDRATION_MS = 1200;
/** Nothing stays hidden longer than this, whatever else goes wrong. */
const FAILSAFE_MS = 2500;

export function RevealProvider() {
  useEffect(() => {
    const root = document.documentElement;
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    if (nodes.length === 0) return;

    // 1. Phones skip the animation outright. It is decoration, and on a slow
    //    device it costs a blank screen: hydration lands long after paint, so
    //    arming the hide would black out content mid-scroll and fade it back
    //    a section at a time. Mobile gets the copy immediately instead.
    // 2. Same reasoning whenever hydration was slow, at any width.
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      window.innerWidth < NO_ANIMATE_BELOW ||
      performance.now() > LATE_HYDRATION_MS
    ) {
      return;
    }

    // 3. Reveal everything already on screen BEFORE arming the hide class, so
    //    nothing the reader can currently see ever blinks out and back.
    const fold = window.innerHeight;
    for (const n of nodes) {
      if (n.getBoundingClientRect().top < fold) n.classList.add("is-visible");
    }

    root.classList.add("js-reveal-ready");

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        }
      },
      {
        // A POSITIVE bottom margin starts the fade while the element is still
        // below the fold, so it has finished by the time it is scrolled into
        // view. The old value was negative (-10%), which meant an element was
        // already ~108px on screen before it even began fading in — that is
        // the blank space you scroll into.
        rootMargin: "0px 0px 20% 0px",
        // threshold 0 = one pixel is enough. The old 0.1 also had a latent
        // trap: intersectionRatio caps at rootHeight/elementHeight, so any
        // element taller than 10x the root could never reach 0.1 and would
        // have stayed invisible permanently.
        threshold: 0,
      },
    );
    nodes.forEach((n) => io.observe(n));

    const failsafe = window.setTimeout(() => {
      nodes.forEach((n) => n.classList.add("is-visible"));
      io.disconnect();
    }, FAILSAFE_MS);

    return () => {
      window.clearTimeout(failsafe);
      io.disconnect();
      root.classList.remove("js-reveal-ready");
    };
  }, []);

  return null;
}

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
   Counter — counts up once, when scrolled into view.
   ------------------------------------------------------------------ */
/**
 * Renders the FINAL value on the server, then animates by writing textContent
 * through a ref. No state, so no re-render per frame and no setState-in-effect.
 * Crawlers and no-JS visitors see the real number, never a zero.
 */
export function Counter({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  className,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const write = (n: number) => {
      el.textContent = `${prefix}${n.toFixed(decimals)}${suffix}`;
    };

    let raf = 0;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        io.disconnect();

        const duration = 1400;
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1);
          // expo.out — matches the site's --ease-out-expo
          const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
          write(value * eased);
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        write(0);
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );

    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, prefix, suffix, decimals]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value.toFixed(decimals)}
      {suffix}
    </span>
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
          "border border-white/15 bg-white/5 text-white backdrop-blur-sm hover:border-white/30 hover:bg-white/10",
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
