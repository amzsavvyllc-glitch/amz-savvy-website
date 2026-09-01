"use client";

import { useMemo, useState } from "react";
import { ArrowRight, Info } from "lucide-react";
import { CtaButton, SectionHeading } from "./primitives";

const money = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
  format,
  hint,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  format: (v: number) => string;
  hint?: string;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <label className="text-sm font-semibold text-navy-700">{label}</label>
        <span className="font-heading text-xl font-extrabold tabular-nums text-navy-800">
          {format(value)}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={label}
        className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-full outline-none focus-visible:ring-2 focus-visible:ring-brand-700 focus-visible:ring-offset-2
          [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none
          [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2
          [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:bg-brand-600
          [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:transition-transform
          hover:[&::-webkit-slider-thumb]:scale-110
          [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full
          [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:bg-brand-600"
        style={{
          background: `linear-gradient(to right, var(--color-brand-500) 0%, var(--color-brand-500) ${pct}%, var(--color-navy-100) ${pct}%, var(--color-navy-100) 100%)`,
        }}
      />
      {hint && <p className="mt-2 text-xs text-navy-400">{hint}</p>}
    </div>
  );
}

export function Calculator() {
  const [spend, setSpend] = useState(15000);
  // TACOS = ad spend ÷ TOTAL sales (ad + organic), so the figure derived below
  // is total revenue, not ad-attributed sales. Defaults reflect realistic TACOS
  // levels, which sit well below typical ACOS.
  const [tacos, setTacos] = useState(18);
  const [targetTacos, setTargetTacos] = useState(11);

  // Target can never exceed current — clamp for sane output
  const effectiveTarget = Math.min(targetTacos, tacos);

  const result = useMemo(() => {
    const revenue = spend / (tacos / 100);
    const spendAtTarget = revenue * (effectiveTarget / 100);
    const monthlySaving = Math.max(spend - spendAtTarget, 0);
    const roasNow = revenue / spend;
    const roasAfter = spendAtTarget > 0 ? revenue / spendAtTarget : 0;
    // Alternative framing: keep the same budget, earn more total revenue
    const extraRevenue = Math.max(spend / (effectiveTarget / 100) - revenue, 0);
    return {
      revenue,
      monthlySaving,
      annualSaving: monthlySaving * 12,
      roasNow,
      roasAfter,
      extraRevenue,
      savedPct: spend > 0 ? (monthlySaving / spend) * 100 : 0,
    };
  }, [spend, tacos, effectiveTarget]);

  return (
    <section id="calculator" className="relative overflow-hidden bg-navy-50 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Wasted spend calculator"
          title={
            <>
              What is your current TACOS{" "}
              <span className="text-brand-700">actually costing you?</span>
            </>
          }
          sub="Move the sliders to your real numbers. This is the same arithmetic we run on day one of an audit — no email required."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-5 lg:gap-8">
          {/* Inputs */}
          <div
            className="rounded-3xl border border-navy-100 bg-white p-7 shadow-sm lg:col-span-2 lg:p-8"
            data-reveal
          >
            <div className="space-y-8">
              <Slider
                label="Monthly ad spend"
                value={spend}
                min={1000}
                max={150000}
                step={500}
                onChange={setSpend}
                format={money}
              />
              <Slider
                label="Your TACOS today"
                value={tacos}
                min={2}
                max={50}
                step={1}
                onChange={setTacos}
                format={(v) => `${v}%`}
                hint="Ad spend ÷ total sales (ad + organic)."
              />
              <Slider
                label="Target TACOS"
                value={effectiveTarget}
                min={2}
                max={50}
                step={1}
                onChange={setTargetTacos}
                format={(v) => `${v}%`}
                hint="Where you want ad cost to sit as a share of total revenue."
              />
            </div>

            <p className="mt-8 flex gap-2.5 rounded-xl bg-navy-50 p-4 text-xs leading-relaxed text-navy-500">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-navy-400" />
              <span>
                An estimate from your own inputs, holding total sales constant —
                not a forecast or a guarantee. Real accounts move at different speeds
                depending on category, margin and competition.
              </span>
            </p>
          </div>

          {/* Output */}
          <div
            className="relative overflow-hidden rounded-3xl bg-navy-800 p-7 text-white shadow-xl lg:col-span-3 lg:p-10"
            data-reveal
          >
            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand-500/20 blur-3xl" />
            <div className="pointer-events-none absolute inset-0 bg-grid opacity-40" />

            <div className="relative">
              <div className="text-xs font-bold uppercase tracking-[0.16em] text-brand-400">
                Recoverable ad spend
              </div>

              <div className="mt-3 font-heading text-5xl font-extrabold tabular-nums lg:text-6xl">
                {money(result.monthlySaving)}
                <span className="ml-2 align-middle text-lg font-semibold text-navy-300">
                  / month
                </span>
              </div>

              <div className="mt-2 text-navy-200">
                That&apos;s{" "}
                <span className="font-bold text-brand-400">
                  {money(result.annualSaving)}
                </span>{" "}
                a year — {result.savedPct.toFixed(0)}% of your current budget,
                freed up without losing a single sale.
              </div>

              {/* Visual comparison */}
              <div className="mt-8 space-y-4">
                <div>
                  <div className="mb-1.5 flex justify-between text-xs font-medium text-navy-300">
                    <span>Spend today at {tacos}% TACOS</span>
                    <span className="tabular-nums text-white">{money(spend)}</span>
                  </div>
                  <div className="h-3 w-full overflow-hidden rounded-full bg-white/10">
                    <div className="h-full w-full rounded-full bg-navy-400" />
                  </div>
                </div>
                <div>
                  <div className="mb-1.5 flex justify-between text-xs font-medium text-navy-300">
                    <span>Same revenue at {effectiveTarget}% TACOS</span>
                    <span className="tabular-nums text-white">
                      {money(spend - result.monthlySaving)}
                    </span>
                  </div>
                  <div className="h-3 w-full overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-brand-600 to-brand-400 transition-[width] duration-500 ease-out"
                      style={{
                        width: `${Math.max(100 - result.savedPct, 4)}%`,
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
                <div>
                  <div className="font-heading text-2xl font-extrabold tabular-nums">
                    {result.roasNow.toFixed(1)}x
                  </div>
                  <div className="text-xs text-navy-400">Total ROAS now</div>
                </div>
                <div>
                  <div className="font-heading text-2xl font-extrabold tabular-nums text-brand-400">
                    {result.roasAfter.toFixed(1)}x
                  </div>
                  <div className="text-xs text-navy-400">Total ROAS at target</div>
                </div>
                <div>
                  <div className="font-heading text-2xl font-extrabold tabular-nums">
                    {money(result.extraRevenue)}
                  </div>
                  <div className="text-xs text-navy-400">
                    Or extra revenue at same budget
                  </div>
                </div>
              </div>

              <CtaButton href="#book" className="mt-8 w-full sm:w-auto">
                Find this money in my account
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </CtaButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
