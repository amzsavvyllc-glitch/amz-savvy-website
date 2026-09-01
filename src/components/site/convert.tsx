"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown, Mail, MessageCircle, Loader2, CheckCircle2, Phone, MapPin } from "lucide-react";
import { faqs, site } from "@/lib/site-config";
import { CtaButton, PartnerBadge, SectionHeading, revealDelay } from "./ui";
import { cn } from "@/lib/utils";

/* ================================================================
   FAQ — accordion
   ================================================================ */
export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Straight answers"
          title="Questions we get asked first"
          className="mx-auto text-center [&_div]:justify-center"
        />

        <div className="mt-12 divide-y divide-navy-100 border-y border-navy-100">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} data-reveal style={revealDelay(i, 40)}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-6 py-5 text-left"
                >
                  <span className="font-heading text-base font-bold text-navy-800 sm:text-lg">
                    {f.q}
                  </span>
                  <ChevronDown
                    className={cn(
                      "h-5 w-5 shrink-0 text-brand-700 transition-transform duration-300",
                      isOpen && "rotate-180",
                    )}
                  />
                </button>
                <div
                  className={cn(
                    "grid transition-all duration-300 ease-out",
                    isOpen ? "grid-rows-[1fr] pb-6" : "grid-rows-[0fr]",
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="pr-10 leading-relaxed text-navy-500">{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   BOOKING — Calendly, script loaded only when scrolled near
   ================================================================ */
export function Booking() {
  const ref = useRef<HTMLDivElement>(null);
  const [load, setLoad] = useState(false);

  /* Load when the section comes near the viewport, and never before.
     Calendly is ~1MB over 8 requests from an origin that measures a ~1s TTFB,
     so it must not compete with our own page load.

     There is deliberately NO timer here. This section sits ~27,500px down a
     ~31,000px page: a reader who has not scrolled cannot be looking at it, and
     a timer only ever fires for the visitor who never reaches it at all. The
     three signals below cover everyone who can actually see the widget —
     IntersectionObserver with 400px of lead, plus scroll and the first pointer
     event as fallbacks in case IO is throttled. Someone landing on /#book
     starts with the section in view, so IO fires immediately. */
  useEffect(() => {
    let done = false;
    const trigger = () => {
      if (done) return;
      done = true;
      setLoad(true);
      cleanup();
    };

    const io =
      typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver(
            (entries) => {
              if (entries[0].isIntersecting) trigger();
            },
            { rootMargin: "400px" },
          )
        : null;
    if (io && ref.current) io.observe(ref.current);

    window.addEventListener("scroll", trigger, { passive: true, once: true });
    window.addEventListener("pointerdown", trigger, { once: true });

    function cleanup() {
      io?.disconnect();
      window.removeEventListener("scroll", trigger);
      window.removeEventListener("pointerdown", trigger);
    }
    return cleanup;
  }, []);

  useEffect(() => {
    if (!load) return;
    const s = document.createElement("script");
    s.src = "https://assets.calendly.com/assets/external/widget.js";
    s.async = true;
    document.body.appendChild(s);
    return () => {
      s.remove();
    };
  }, [load]);

  return (
    <section
      id="book"
      className="relative overflow-hidden bg-navy-900 py-20 text-white lg:py-28"
    >
      {/* Warm the TLS connection to Calendly's asset host before the widget is
          requested — measured ~1s TTFB to calendly.com, so the handshake is
          worth doing early even though the bundle is not. Next/React hoist
          these into <head> and dedupe them; they only render on pages that
          mount Booking. */}
      <link rel="preconnect" href="https://assets.calendly.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://calendly.com" />
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-50" />
      <div className="pointer-events-none absolute -left-40 bottom-0 h-[32rem] w-[32rem] glow" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              tone="dark"
              eyebrow="Free strategy call"
              title={
                <>
                  Pick a time. Get your{" "}
                  <span className="text-brand-400">audit</span>.
                </>
              }
              sub="30 minutes. We look at your account together and you leave with a written list of what to fix — whether or not you hire us."
            />

            <ul className="mt-8 space-y-4" data-reveal>
              {[
                "We review your Search Term and Business reports live",
                "You get the wasted-spend number for your actual account",
                "A written plan follows within 48 hours",
                "No Seller Central password required — ever",
              ].map((line) => (
                <li key={line} className="flex gap-3 text-navy-200">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-500" />
                  {line}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3" data-reveal>
              <CtaButton
                href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
                  "Hi AMZ Savvy — I'd like a free Amazon account audit.",
                )}`}
                variant="ghost"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="h-4 w-4" />
                Rather message on WhatsApp
              </CtaButton>
            </div>

            <div className="mt-8" data-reveal>
              <PartnerBadge />
            </div>
          </div>

          {/* Calendly */}
          <div ref={ref} data-reveal>
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-white shadow-2xl">
              {load ? (
                <div
                  className="calendly-inline-widget"
                  data-url={`${site.calendly}?hide_gdpr_banner=1&background_color=ffffff&text_color=253247&primary_color=4fc47f`}
                  style={{ minWidth: "320px", height: "660px" }}
                />
              ) : (
                /* Pre-load state. This must be USEFUL, not decorative: it is
                   the only thing standing between a visitor and the primary
                   conversion path if the embed never triggers. It used to be a
                   spinner that span forever, which is why a 4s timer was
                   loading Calendly for every visitor — the timer was covering
                   for a dead end. A real link removes the need for both.

                   In normal use nobody lingers here: the observer fires 400px
                   before the section arrives, so by the time it is on screen
                   `load` is already true and Calendly is drawing itself. */
                <div className="flex h-[660px] flex-col items-center justify-center gap-4 bg-navy-50 px-6 text-center">
                  {/* For a visitor without JS the embed is never coming, so a
                      spinner and the word "loading" would be a lie. Hide both
                      for them and leave the link, which works for everyone.
                      This replaces the old <noscript> link that sat below a
                      spinner that span forever. */}
                  <noscript>
                    <style>{`.calendly-pending{display:none}`}</style>
                  </noscript>
                  <Loader2
                    className="calendly-pending h-6 w-6 animate-spin text-navy-300"
                    aria-hidden="true"
                  />
                  <p className="calendly-pending text-sm text-navy-500">
                    Loading the calendar…
                  </p>
                  <a
                    href={site.calendly}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-brand-500 px-6 py-3 text-sm font-bold text-navy-900 shadow-lg shadow-brand-500/25 transition-colors hover:bg-brand-400"
                  >
                    Open the booking page instead
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   CONTACT FORM
   ================================================================ */
export function Contact() {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setState("sending");
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${site.email}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      if (!res.ok) throw new Error("bad response");
      setState("done");
      form.reset();
    } catch {
      setState("error");
    }
  }

  const field =
    "w-full rounded-xl border border-navy-200 bg-white px-4 py-3 text-navy-800 placeholder:text-navy-400 outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20";

  return (
    <section id="contact" className="bg-navy-50 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Or just write to us"
              title="Tell us what's going wrong"
              sub="Send the short version — the category, the spend, and what's frustrating you. We reply with something useful, not a brochure."
            />

            <div className="mt-8 space-y-3" data-reveal>
              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-3 text-navy-600 transition-colors hover:text-brand-700"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white ring-1 ring-navy-100">
                  <Mail className="h-5 w-5 text-brand-700" />
                </span>
                {site.email}
              </a>
              <a
                href={`https://wa.me/${site.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-navy-600 transition-colors hover:text-brand-700"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white ring-1 ring-navy-100">
                  <MessageCircle className="h-5 w-5 text-brand-700" />
                </span>
                WhatsApp {site.phoneDisplay}
              </a>
              <a
                href={`tel:${site.phone}`}
                className="flex items-center gap-3 text-navy-600 transition-colors hover:text-brand-700"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white ring-1 ring-navy-100">
                  <Phone className="h-5 w-5 text-brand-700" />
                </span>
                Call {site.phoneDisplay}
              </a>
              {/* Real address, marked up so a crawler reads it as one. */}
              <address className="flex items-start gap-3 not-italic text-navy-600">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white ring-1 ring-navy-100">
                  <MapPin className="h-5 w-5 text-brand-700" />
                </span>
                <span className="pt-2 leading-relaxed">
                  {site.address.street}
                  <br />
                  {site.address.locality}, {site.address.region}{" "}
                  {site.address.postalCode}, USA
                </span>
              </address>
            </div>
          </div>

          <form
            onSubmit={onSubmit}
            className="rounded-3xl border border-navy-100 bg-white p-7 shadow-sm lg:p-8"
            data-reveal
          >
            {state === "done" ? (
              <div className="flex h-full min-h-72 flex-col items-center justify-center text-center">
                <CheckCircle2 className="h-12 w-12 text-brand-500" />
                <h3 className="mt-4 text-xl font-extrabold text-navy-800">
                  Message sent
                </h3>
                <p className="mt-2 text-navy-500">
                  We reply within one business day.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <input type="hidden" name="_subject" value="New AMZ Savvy enquiry" />
                <input type="text" name="_honey" className="hidden" tabIndex={-1} aria-hidden="true" />

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="cf-name" className="sr-only">Your name</label>
                    <input id="cf-name" name="name" required placeholder="Your name" className={field} />
                  </div>
                  <div>
                    <label htmlFor="cf-email" className="sr-only">Email</label>
                    <input
                      id="cf-email"
                      name="email"
                      type="email"
                      required
                      placeholder="Email"
                      className={field}
                    />
                  </div>
                </div>
                <label htmlFor="cf-brand" className="sr-only">Brand or storefront</label>
                <input id="cf-brand" name="brand" placeholder="Brand or storefront" className={field} />
                <label htmlFor="cf-spend" className="sr-only">Monthly ad spend</label>
                <select id="cf-spend" name="spend" className={field} defaultValue="">
                  <option value="" disabled>
                    Monthly ad spend
                  </option>
                  <option>Under $5k</option>
                  <option>$5k – $20k</option>
                  <option>$20k – $50k</option>
                  <option>$50k+</option>
                  <option>Not running ads yet</option>
                </select>
                <label htmlFor="cf-message" className="sr-only">What is the main problem right now?</label>
                <textarea
                  id="cf-message"
                  name="message"
                  rows={4}
                  required
                  placeholder="What's the main problem right now?"
                  className={cn(field, "resize-none")}
                />

                <button
                  type="submit"
                  disabled={state === "sending"}
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-500 px-7 py-3.5 text-sm font-bold text-navy-900 shadow-lg shadow-brand-500/25 transition-all hover:bg-brand-400 active:scale-[0.98] disabled:opacity-60"
                >
                  {state === "sending" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending
                    </>
                  ) : (
                    <>
                      Send message
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>

                {state === "error" && (
                  <p className="text-sm text-red-600">
                    That didn&apos;t go through.{" "}
                    <a href={`mailto:${site.email}`} className="underline">
                      Email us directly
                    </a>
                    .
                  </p>
                )}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
