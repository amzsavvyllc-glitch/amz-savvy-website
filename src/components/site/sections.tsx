"use client";

import { useState } from "react";
import {
  ArrowRight,
  ArrowRight as ArrowIcon,
  Quote,
  Rocket,
  Search,
  Target,
  TrendingUp,
  Check,
} from "lucide-react";
import { caseStudies, process, services, testimonials } from "@/lib/site-config";
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
   RESULTS — tabbed case studies
   ================================================================ */
export function Results() {
  const [active, setActive] = useState(0);
  const study = caseStudies[active];

  return (
    <section id="results" className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Client results"
          title="What changed, and by how much"
          sub="Pick a category to see the before and after."
        />

        {/* Tabs */}
        <div className="mt-10 flex flex-wrap gap-2" data-reveal role="tablist">
          {caseStudies.map((c, i) => (
            <button
              key={c.category}
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
              {c.category}
            </button>
          ))}
        </div>

        <div
          className="mt-6 grid gap-6 rounded-3xl border border-navy-100 bg-navy-50/60 p-7 lg:grid-cols-5 lg:p-10"
          data-reveal
        >
          <div className="lg:col-span-3">
            <h3 className="text-balance text-2xl font-extrabold leading-tight text-navy-800 lg:text-3xl">
              {study.headline}
            </h3>
            <p className="mt-4 leading-relaxed text-navy-500">{study.body}</p>
            <p className="mt-6 inline-flex items-center gap-2 rounded-lg bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-700 ring-1 ring-amber-200">
              ⚠ Placeholder case study — replace with a real client result
            </p>
          </div>

          <div className="space-y-3 lg:col-span-2">
            {study.metrics.map((m) => (
              <div
                key={m.label}
                className="flex items-center justify-between gap-4 rounded-xl border border-navy-100 bg-white p-4"
              >
                <span className="text-sm font-medium text-navy-500">{m.label}</span>
                <span className="flex items-center gap-2.5 font-heading font-extrabold tabular-nums">
                  <span className="text-navy-300 line-through decoration-navy-200">
                    {m.from}
                  </span>
                  <ArrowIcon className="h-4 w-4 text-brand-500" />
                  <span className="text-brand-600">{m.to}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   TESTIMONIALS
   ================================================================ */
export function Testimonials() {
  return (
    <section className="bg-navy-50 py-20 lg:py-28">
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
                <div className="mt-2 inline-block rounded bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-700 ring-1 ring-amber-200">
                  ⚠ Placeholder
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
