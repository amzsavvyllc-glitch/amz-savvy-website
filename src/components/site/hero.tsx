/**
 * hero.tsx — no "use client": this section is pure markup. It carried the
 * directive without ever using a hook or an event handler, so ~190 lines of
 * copy and icons were being shipped and hydrated for nothing. Counter is the
 * only interactive thing here and brings its own client boundary.
 */
import { ArrowRight, CalendarCheck, Target, TrendingDown } from "lucide-react";
import { stats } from "@/lib/site-config";
import { Counter } from "./primitives";
import { CtaButton, PartnerBadge, revealDelay } from "./ui";

/* Marketplaces we actually work in — used instead of invented client
   logos, which would be fabricated social proof. */
const MARKETPLACES = [
  "Amazon.com",
  "Amazon.co.uk",
  "Amazon.de",
  "Amazon.ca",
  "Amazon.ae",
  "Amazon.sa",
  "Amazon.com.au",
  "Amazon.fr",
];

export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate overflow-hidden bg-navy-900 text-white"
    >
      {/* Ambient brand glow — Aurora-style, per Pro Max marketing-agency
          style recommendation (motion-driven + bold brand colour) */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-grid opacity-60" />
      <div className="pointer-events-none absolute -left-40 top-[-10rem] -z-10 h-[38rem] w-[38rem] glow glow-strong" />
      <div className="pointer-events-none absolute -right-32 top-40 -z-10 h-[34rem] w-[34rem] glow glow-alt" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-b from-transparent to-white" />

      <div className="mx-auto max-w-7xl px-4 pb-20 pt-32 sm:px-6 md:pt-40 lg:px-8 lg:pb-28">
        <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-12 lg:gap-10">
          {/* ---------------- LEFT ---------------- */}
          <div className="lg:col-span-7">
            <div data-reveal style={revealDelay(0)}>
              <PartnerBadge />
            </div>

            <h1
              className="mt-6 text-balance text-4xl font-extrabold leading-[1.06] tracking-tight sm:text-5xl lg:text-[3.25rem] xl:text-[3.75rem]"
            >
              Stop paying Amazon for clicks that{" "}
              <span className="bg-gradient-to-br from-brand-300 via-brand-400 to-brand-600 bg-clip-text text-transparent">
                never convert
              </span>
            </h1>

            <p
              className="mt-6 max-w-xl text-lg leading-relaxed text-navy-200"
            >
              We rebuild Amazon PPC accounts around the keywords that actually
              make you money — then hold the rank with SEO. Most brands find
              four figures of monthly waste in the first audit.
            </p>

            <div
              className="mt-9 flex flex-col gap-3 sm:flex-row"
              data-reveal
              style={revealDelay(3)}
            >
              <CtaButton href="#book">
                Get my free audit
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </CtaButton>
              <CtaButton href="#calculator" variant="ghost">
                <TrendingDown className="h-4 w-4" />
                Show me what I&apos;m wasting
              </CtaButton>
            </div>

            {/* Risk reversal — removes the "this is a sales trap" objection */}
            <p
              className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-navy-300"
              data-reveal
              style={revealDelay(4)}
            >
              <span className="inline-flex items-center gap-1.5">
                <CalendarCheck className="h-4 w-4 text-brand-500" />
                30-minute call
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Target className="h-4 w-4 text-brand-500" />
                No Seller Central access needed
              </span>
              <span>No contract to see the audit</span>
            </p>
          </div>

          {/* ---------------- RIGHT ---------------- */}
          <div className="lg:col-span-5 lg:mt-4">
            {/* Glass stats card */}
            <div
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.06] p-7 shadow-2xl sm:backdrop-blur-xl"
              data-reveal
              style={revealDelay(3)}
            >
              <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 glow [--glow:rgb(79_196_127/0.15)]" />

              <div className="relative">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span
                      className="absolute inline-flex h-full w-full rounded-full bg-brand-400"
                      style={{ animation: "pulse-ring 2.4s ease-out infinite" }}
                    />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-500" />
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-navy-300">
                    Managing right now
                  </span>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-7">
                  {stats.map((s) => (
                    <div key={s.label}>
                      <div className="font-heading text-3xl font-extrabold text-white">
                        <Counter
                          value={s.value}
                          prefix={s.prefix}
                          suffix={s.suffix}
                          decimals={"decimals" in s ? s.decimals : 0}
                        />
                      </div>
                      <div className="mt-1 text-xs font-medium text-navy-300">
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="my-6 h-px w-full bg-white/10" />

                {/* Mini before/after — the core promise, visualised */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-medium">
                    <span className="text-navy-300">
                      Typical ACOS before / after
                    </span>
                    <span className="text-white">42% → 21%</span>
                  </div>
                  <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-white/10">
                    <div className="absolute inset-y-0 left-0 w-1/2 rounded-full bg-gradient-to-r from-brand-600 to-brand-400" />
                  </div>
                  <p className="text-[11px] leading-relaxed text-navy-400">
                    Illustrative range across managed accounts — your numbers
                    come from your own audit.
                  </p>
                </div>
              </div>
            </div>

            {/* Marketplace marquee */}
            <div
              className="relative mt-5 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] py-6 sm:backdrop-blur-xl"
              data-reveal
              style={revealDelay(4)}
            >
              <h2 className="mb-4 px-7 text-xs font-bold uppercase tracking-[0.16em] text-navy-400">
                Marketplaces we manage
              </h2>
              <div
                className="relative flex overflow-hidden"
                style={{
                  maskImage:
                    "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
                  WebkitMaskImage:
                    "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
                }}
              >
                <div className="animate-marquee flex shrink-0 gap-9 whitespace-nowrap px-4">
                  {[...MARKETPLACES, ...MARKETPLACES].map((m, i) => (
                    <span
                      key={i}
                      className="font-heading text-base font-bold tracking-tight text-white/45"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
