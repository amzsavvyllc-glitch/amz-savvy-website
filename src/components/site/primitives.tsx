"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------
   RevealProvider
   Adds `js-reveal-ready` to <html> only after mount, so the fade-up
   styles never apply for no-JS users or crawlers (content stays
   visible). Then observes every [data-reveal] node.
   ------------------------------------------------------------------ */
export function RevealProvider() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const root = document.documentElement;
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
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    );

    const nodes = document.querySelectorAll("[data-reveal]");
    nodes.forEach((n) => io.observe(n));

    return () => {
      io.disconnect();
      root.classList.remove("js-reveal-ready");
    };
  }, []);

  return null;
}

/** Staggered reveal delay. Keep stagger small (Pro Max: 20–40ms). */
export function revealDelay(i: number, step = 60) {
  return { "--reveal-delay": `${i * step}ms` } as React.CSSProperties;
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
   Amazon Ads Verified Partner badge — real, verifiable credential, so
   it carries more conversion weight than any invented stat.
   ------------------------------------------------------------------ */
export function PartnerBadge({
  className,
  tone = "dark",
}: {
  className?: string;
  tone?: "dark" | "light";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] font-semibold tracking-wide backdrop-blur-md",
        tone === "dark"
          ? "border-white/15 bg-white/5 text-white/90"
          : "border-navy-200 bg-white text-navy-700",
        className,
      )}
    >
      <svg viewBox="0 0 20 20" className="h-4 w-4 shrink-0" aria-hidden="true">
        <path
          d="M10 1.5l2.35 1.7 2.9-.05.87 2.77 2.38 1.63-1.1 2.68 1.1 2.68-2.38 1.63-.87 2.77-2.9-.05L10 18.5l-2.35-1.7-2.9.05-.87-2.77L1.5 12.5l1.1-2.68L1.5 7.14l2.38-1.63.87-2.77 2.9.05L10 1.5z"
          className="fill-brand-500"
        />
        <path
          d="M6.6 10.2l2.2 2.2 4.6-4.6"
          fill="none"
          stroke="#fff"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      Amazon Ads Verified Partner
    </span>
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
  return (
    <div className={cn("max-w-2xl", className)} data-reveal>
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
