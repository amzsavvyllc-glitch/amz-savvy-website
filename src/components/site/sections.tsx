"use client";

import { useState } from "react";
import {
  ArrowRight,
  Quote,
  Rocket,
  Search,
  Target,
  TrendingUp,
  Check,
  X,
} from "lucide-react";
import {
  deliverables,
  fitCheck,
  playbooks,
  process,
  services,
  testimonials,
} from "@/lib/site-config";
import { CtaButton, SectionHeading, revealDelay } from "./primitives";
import { cn } from "@/lib/utils";

const ICONS = { Search, Target, Rocket, TrendingUp } as const;

/* ================================================================
   SERVICES
   ================================================================ */
export function Services() {
  return (
    <section id="services" className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="What we do"
          title={
            <>
              Four levers. Pulled in the{" "}
              <span className="text-brand-600">right order.</span>
            </>
          }
          sub="Most accounts don't need more spend — they need the spend pointed somewhere else, and a listing that converts once the click lands."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => {
            const Icon = ICONS[s.icon as keyof typeof ICONS];
            return (
              <div
                key={s.title}
                data-reveal
                style={revealDelay(i)}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-navy-100 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-500/40 hover:shadow-xl hover:shadow-navy-900/5"
              >
                <div className="pointer-events-none absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-brand-500 to-brand-400 transition-transform duration-300 group-hover:scale-x-100" />

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-50 text-brand-600 transition-colors group-hover:bg-brand-500 group-hover:text-white">
                  <Icon className="h-6 w-6" />
                </div>

                <h3 className="mt-5 text-lg font-extrabold text-navy-800">
                  {s.title}
                </h3>
                <p className="mt-1.5 text-sm font-medium text-brand-600">
                  {s.tagline}
                </p>

                <ul className="mt-5 space-y-2.5 border-t border-navy-100 pt-5">
                  {s.points.map((p) => (
                    <li key={p} className="flex gap-2.5 text-sm text-navy-500">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   PROCESS
   ================================================================ */
export function Process() {
  return (
    <section id="process" className="relative overflow-hidden bg-navy-900 py-20 text-white lg:py-28">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-50" />
      <div className="pointer-events-none absolute -right-40 top-20 h-[30rem] w-[30rem] rounded-full bg-brand-500/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          tone="dark"
          eyebrow="How it works"
          title="From audit to scale in four steps"
          sub="You see the plan before you commit to anything. Nothing goes live without your sign-off."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {process.map((p, i) => (
            <div
              key={p.step}
              data-reveal
              style={revealDelay(i)}
              className="group relative rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm transition-colors hover:border-brand-500/40 hover:bg-white/[0.07]"
            >
              {/* Connector line on desktop */}
              {i < process.length - 1 && (
                <div className="pointer-events-none absolute -right-3 top-12 hidden h-px w-6 bg-white/15 lg:block" />
              )}

              <div className="font-heading text-4xl font-extrabold text-brand-500/30 transition-colors group-hover:text-brand-500/60">
                {p.step}
              </div>
              <h3 className="mt-3 text-xl font-extrabold text-white">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-navy-300">{p.body}</p>
            </div>
          ))}
        </div>

        {/* Mid-page CTA — Pro Max funnel pattern: mini-CTA per chapter */}
        <div
          className="mt-14 flex flex-col items-center justify-between gap-5 rounded-2xl border border-brand-500/25 bg-brand-500/[0.07] p-7 sm:flex-row"
          data-reveal
        >
          <p className="text-center text-lg font-semibold text-white sm:text-left">
            Step one is free. You keep the audit either way.
          </p>
          <CtaButton href="#book" className="shrink-0">
            Book the audit call
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </CtaButton>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   PLAYBOOKS — tabbed, by account situation.
   Describes method, not client outcomes.
   ================================================================ */
export function Results() {
  const [active, setActive] = useState(0);
  const play = playbooks[active];

  return (
    <section id="results" className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Our playbooks"
          title={
            <>
              Tell us what&apos;s broken. Here&apos;s{" "}
              <span className="text-brand-600">exactly what we do.</span>
            </>
          }
          sub="Pick the problem that sounds like your account."
        />

        {/* Tabs */}
        <div className="mt-10 flex flex-wrap gap-2" data-reveal role="tablist">
          {playbooks.map((p, i) => (
            <button
              key={p.category}
              role="tab"
              aria-selected={active === i}
              onClick={() => setActive(i)}
              className={cn(
                "rounded-full px-5 py-2.5 text-sm font-bold transition-all",
                active === i
                  ? "bg-navy-800 text-white shadow-md"
                  : "bg-navy-50 text-navy-500 hover:bg-navy-100 hover:text-navy-700",
              )}
            >
              {p.category}
            </button>
          ))}
        </div>

        <div
          className="mt-6 grid gap-8 rounded-3xl border border-navy-100 bg-navy-50/60 p-7 lg:grid-cols-5 lg:p-10"
          data-reveal
        >
          <div className="lg:col-span-3">
            <h3 className="text-balance text-2xl font-extrabold leading-tight text-navy-800 lg:text-3xl">
              {play.headline}
            </h3>
            <p className="mt-4 leading-relaxed text-navy-500">{play.body}</p>
            <CtaButton href="#book" variant="dark" className="mt-7">
              Get this run on my account
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </CtaButton>
          </div>

          <ol className="space-y-3 lg:col-span-2">
            {play.steps.map((s, i) => (
              <li
                key={s}
                className="flex gap-3.5 rounded-xl border border-navy-100 bg-white p-4"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-500/12 font-heading text-xs font-extrabold text-brand-700">
                  {i + 1}
                </span>
                <span className="text-sm leading-relaxed text-navy-600">{s}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   DELIVERABLES — shows the actual artefacts a client receives.
   The mock report is drawn in CSS and labelled SAMPLE: it depicts
   AMZ Savvy's own deliverable, so it makes no claim about any client.
   ================================================================ */
export function Deliverables() {
  return (
    <section className="relative overflow-hidden bg-navy-900 py-20 text-white lg:py-28">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-50" />
      <div className="pointer-events-none absolute -left-32 bottom-0 h-[30rem] w-[30rem] rounded-full bg-brand-500/12 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              tone="dark"
              eyebrow="What you actually get"
              title={
                <>
                  No dashboard maze.{" "}
                  <span className="text-brand-400">One page you&apos;ll read.</span>
                </>
              }
              sub="Most agencies hand you a login and call it reporting. You get a document that says what changed, what it cost, and what happens next."
            />

            <div className="mt-9 space-y-5">
              {deliverables.map((d, i) => (
                <div
                  key={d.title}
                  data-reveal
                  style={revealDelay(i)}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-lg font-extrabold text-white">{d.title}</h3>
                    <span className="rounded-full bg-brand-500/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-brand-400">
                      {d.when}
                    </span>
                  </div>
                  <ul className="mt-4 space-y-2">
                    {d.lines.map((l) => (
                      <li key={l} className="flex gap-2.5 text-sm text-navy-300">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                        {l}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* CSS mock of the one-page report */}
          <div className="relative" data-reveal>
            <div className="relative rounded-2xl bg-white p-7 text-navy-800 shadow-2xl lg:rotate-[1.5deg] lg:p-8">
              <span className="absolute right-5 top-5 rounded-md bg-navy-100 px-2 py-1 text-[10px] font-extrabold uppercase tracking-widest text-navy-400">
                Sample
              </span>

              <div className="flex items-center gap-2.5 text-navy-800">
                <svg viewBox="0 0 48 48" className="h-6 w-6" aria-hidden="true">
                  <circle cx="21" cy="27" r="17" fill="none" stroke="#4fc47f" strokeWidth="3" />
                  <circle cx="21" cy="27" r="10.5" fill="none" stroke="#4fc47f" strokeWidth="3" opacity=".7" />
                  <circle cx="21" cy="27" r="4" fill="#4fc47f" />
                  <path d="M44 6 L28.5 20.5 L34 23.5 Z" fill="#253247" />
                </svg>
                <span className="font-heading text-sm font-extrabold">
                  Monthly Performance Report
                </span>
              </div>

              <div className="mt-6 space-y-4">
                {[
                  { label: "Ad spend", val: "$14,208", w: "62%", down: false },
                  { label: "Ad sales", val: "$68,140", w: "88%", down: false },
                  { label: "ACOS", val: "20.8%", w: "31%", down: true },
                  { label: "TACOS", val: "11.4%", w: "22%", down: true },
                ].map((r) => (
                  <div key={r.label}>
                    <div className="mb-1.5 flex items-baseline justify-between">
                      <span className="text-xs font-semibold text-navy-500">{r.label}</span>
                      <span className="font-heading text-sm font-extrabold tabular-nums">
                        {r.val}
                      </span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-navy-100">
                      <div
                        className={cn(
                          "h-full rounded-full",
                          r.down
                            ? "bg-gradient-to-r from-brand-600 to-brand-400"
                            : "bg-navy-700",
                        )}
                        style={{ width: r.w }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 border-t border-navy-100 pt-5">
                <div className="text-[11px] font-bold uppercase tracking-wider text-navy-400">
                  What we changed
                </div>
                <ul className="mt-2.5 space-y-1.5 text-xs leading-relaxed text-navy-500">
                  <li>• Negated 214 zero-order search terms</li>
                  <li>• Moved 9 converters to exact match</li>
                  <li>• Cut bids on 3 campaigns above break-even</li>
                </ul>
              </div>

              <p className="mt-5 text-[10px] leading-relaxed text-navy-300">
                Illustration of the report format. Figures are examples, not a
                client account.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   TESTIMONIALS — renders ONLY when real, permissioned quotes exist.
   Empty by default; see site-config.ts.
   ================================================================ */
export function Testimonials() {
  if (testimonials.length === 0) return null;

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="In their words" title="What sellers say" />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <figure
              key={i}
              data-reveal
              style={revealDelay(i)}
              className="flex flex-col rounded-2xl border border-navy-100 bg-white p-7 transition-shadow hover:shadow-lg hover:shadow-navy-900/5"
            >
              <Quote className="h-7 w-7 shrink-0 text-brand-500/30" />
              <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-navy-600">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 border-t border-navy-100 pt-5">
                <div className="font-bold text-navy-800">{t.name}</div>
                <div className="text-sm text-navy-400">{t.role}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   FIT CHECK — self-qualification, not third-party praise.
   ================================================================ */
export function FitCheck() {
  return (
    <section className="bg-navy-50 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Straight talk"
          title="We are not right for everyone"
          sub="Read the right-hand column first. If any of it describes you, save yourself the call."
        />

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          <div
            className="rounded-2xl border border-brand-500/30 bg-white p-7"
            data-reveal
          >
            <h3 className="flex items-center gap-2.5 text-lg font-extrabold text-navy-800">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-500/15">
                <Check className="h-4 w-4 text-brand-600" />
              </span>
              A good fit if
            </h3>
            <ul className="mt-5 space-y-3.5">
              {fitCheck.good.map((line) => (
                <li key={line} className="flex gap-3 text-[15px] leading-relaxed text-navy-600">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-brand-500" />
                  {line}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-navy-200 bg-white p-7" data-reveal>
            <h3 className="flex items-center gap-2.5 text-lg font-extrabold text-navy-800">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-navy-100">
                <X className="h-4 w-4 text-navy-500" />
              </span>
              Not a fit if
            </h3>
            <ul className="mt-5 space-y-3.5">
              {fitCheck.bad.map((line) => (
                <li key={line} className="flex gap-3 text-[15px] leading-relaxed text-navy-500">
                  <X className="mt-1 h-4 w-4 shrink-0 text-navy-300" />
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
