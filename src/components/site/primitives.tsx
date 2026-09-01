"use client";

/**
 * primitives.tsx — the components that genuinely need the client.
 *
 * Only RevealProvider and Counter live here. Everything presentational moved
 * to ui.tsx, which has no "use client" and therefore never ships to the
 * browser. Keep that split: adding a static component back into this file
 * silently pushes it, its copy and its icons into the client bundle.
 */

import { useEffect, useRef } from "react";

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
