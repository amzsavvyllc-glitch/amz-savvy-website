"use client";

/**
 * Results — the tabbed playbooks section, and the ONLY part of the old
 * sections.tsx that needs the client. It was holding four purely static
 * sections hostage: "use client" marks the whole module, so Services,
 * Deliverables and Testimonials shipped their copy and icons to the browser
 * to support one useState in this component.
 */

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { playbooks } from "@/lib/site-config";
import { CtaButton, SectionHeading } from "./ui";
import { cn } from "@/lib/utils";

/* ================================================================
   PLAYBOOKS — tabbed, by account situation.
   Describes method, not client outcomes.
   ================================================================ */
export function Results() {
  const [active, setActive] = useState(0);

  return (
    <section id="results" className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Our playbooks"
          title={
            <>
              Tell us what&apos;s broken. Here&apos;s{" "}
              <span className="text-brand-700">exactly what we do.</span>
            </>
          }
          sub="Pick the problem that sounds like your account."
        />

        {/* Tabs */}
        <div className="mt-10 flex flex-wrap gap-2" data-reveal role="tablist">
          {playbooks.map((p, i) => (
            <button
              key={p.category}
              id={`playbook-tab-${i}`}
              role="tab"
              aria-selected={active === i}
              aria-controls={`playbook-panel-${i}`}
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

        {/* All three panels are rendered so crawlers and AI retrieval see every
            playbook. Only visibility toggles — conditional rendering would keep
            two-thirds of this copy out of the HTML entirely. */}
        {playbooks.map((p, i) => (
          <div
            key={p.category}
            id={`playbook-panel-${i}`}
            role="tabpanel"
            aria-labelledby={`playbook-tab-${i}`}
            hidden={active !== i}
            className="mt-6 grid gap-8 rounded-3xl border border-navy-100 bg-navy-50/60 p-7 lg:grid-cols-5 lg:p-10"
            data-reveal
          >
            <div className="lg:col-span-3">
              <h3 className="text-balance text-2xl font-extrabold leading-tight text-navy-800 lg:text-3xl">
                {p.headline}
              </h3>
              <p className="mt-4 leading-relaxed text-navy-500">{p.body}</p>
              <CtaButton href="#book" variant="dark" className="mt-7">
                Get this run on my account
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </CtaButton>
            </div>

            <ol className="space-y-3 lg:col-span-2">
              {p.steps.map((step, n) => (
                <li
                  key={step}
                  className="flex gap-3.5 rounded-xl border border-navy-100 bg-white p-4"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-500/12 font-heading text-xs font-extrabold text-brand-700">
                    {n + 1}
                  </span>
                  <span className="text-sm leading-relaxed text-navy-600">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </section>
  );
}
