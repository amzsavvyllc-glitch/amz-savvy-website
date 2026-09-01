"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { nav, site } from "@/lib/site-config";
import { Logo, CtaButton } from "./primitives";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

  /* Scroll handling is deliberately hostile to React here.
   *
   * The previous version read `document.documentElement.scrollHeight` inside
   * the handler and pushed the result through `setProgress`. Both halves were
   * expensive: `scrollHeight` forces a synchronous layout, and the state
   * update re-rendered the whole Header on every scroll event, which wrote a
   * new inline transform, which invalidated style, which meant the NEXT
   * event's `scrollHeight` read could not reuse a cached layout. A self-
   * feeding thrash loop, measured at ~8ms per scroll event on the homepage
   * against a 16.7ms frame budget — and phones are several times slower.
   *
   * So: measure the page height once (and on resize, not on scroll), write
   * the progress bar straight to the DOM through a ref, and keep React state
   * only for `scrolled`, which changes at most twice per page. */
  useEffect(() => {
    let max = 0;
    let frame = 0;

    const measure = () => {
      max = document.documentElement.scrollHeight - window.innerHeight;
    };

    const paint = () => {
      frame = 0;
      const y = window.scrollY;
      setScrolled(y > 24);
      if (barRef.current) {
        const pct = max > 0 ? Math.min(y / max, 1) : 0;
        barRef.current.style.transform = `scaleX(${pct})`;
      }
    };

    // Coalesce to one write per frame: scroll fires far more often than paint.
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };

    measure();
    paint();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure, { passive: true });
    // Content can change height after mount (fonts, images), which would leave
    // the bar mis-scaled for the rest of the session.
    const ro = new ResizeObserver(measure);
    ro.observe(document.documentElement);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      ro.disconnect();
    };
  }, []);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          // Opaque on mobile: a full-width backdrop-filter pinned to the
          // top re-composites on every scroll frame, and on a dark navy bar
          // at 85% the blur is all but invisible on a phone anyway.
          ? "border-b border-white/10 bg-navy-900 sm:bg-navy-900/85 sm:backdrop-blur-xl"
          : "bg-transparent",
      )}
    >
      {/* Reading progress. Driven by a ref write, not state — see the effect.
          No CSS transition: the rAF write is already per-frame, and a 150ms
          transition on top of it only makes the bar lag the scroll. */}
      <div
        ref={barRef}
        className="absolute inset-x-0 top-0 h-0.5 origin-left bg-brand-500 will-change-transform"
        style={{ transform: "scaleX(0)" }}
        aria-hidden="true"
      />

      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-white" aria-label="AMZ Savvy home">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Main">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-navy-200 transition-colors hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={`https://wa.me/${site.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-navy-200 transition-colors hover:text-white"
          >
            WhatsApp
          </a>
          <CtaButton href="/#book" className="px-5 py-2.5 text-[13px]">
            Get a free audit
          </CtaButton>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          // p-3 not p-2: 24px icon + 12px padding = a 48px tap target.
          className="-mr-1 rounded-lg p-3 text-white lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "overflow-hidden border-t border-white/10 bg-navy-900/95 backdrop-blur-xl transition-[max-height] duration-300 lg:hidden",
          open ? "max-h-96" : "max-h-0 border-t-0",
        )}
      >
        <nav className="flex flex-col gap-1 px-4 py-4" aria-label="Mobile">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-3 text-base font-medium text-navy-100 transition-colors hover:bg-white/5 hover:text-white"
            >
              {item.label}
            </a>
          ))}
          <CtaButton
            href="/#book"
            className="mt-2 w-full"
            onClick={() => setOpen(false)}
          >
            Get a free audit
          </CtaButton>
        </nav>
      </div>
    </header>
  );
}
