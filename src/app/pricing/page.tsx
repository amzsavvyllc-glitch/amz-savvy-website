import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { site } from "@/lib/site-config";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { FloatingActions } from "@/components/site/floating-actions";
import { RevealProvider } from "@/components/site/primitives";
import { CtaButton } from "@/components/site/ui";

const description =
  "How AMZ Savvy prices Amazon PPC and SEO management: scoped per account from a free audit, month-to-month, no lock-in, and you keep your campaigns if you leave.";

export const metadata: Metadata = {
  title: "Pricing & Engagement",
  description,
  alternates: { canonical: "/pricing/" },
  openGraph: {
    type: "website",
    title: "Pricing & Engagement | AMZ Savvy",
    description,
    url: `https://${site.domain}/pricing/`,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "AMZ Savvy — Amazon PPC & SEO agency" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pricing & Engagement | AMZ Savvy",
    description,
    images: ["/og.png"],
  },
};

const scopeFactors = [
  { label: "Monthly ad spend", detail: "The larger the spend, the more a point of ACOS is worth — and the more management earns its fee." },
  { label: "Number of ASINs & campaigns", detail: "A single hero product is a different job from a catalogue of a hundred SKUs." },
  { label: "Marketplaces", detail: "One marketplace or several — each is indexed and managed separately." },
  { label: "Listing state", detail: "Whether the listings need rebuilding first, or are already sound and just need advertising tuned." },
  { label: "Stage", detail: "A launch buying rank is a different engagement from a mature account defending page one." },
];

const faqs = [
  {
    q: "Why isn't there a fixed price list?",
    a: "Because a flat menu would either overcharge a small account or underserve a large one. Spend, catalogue size, marketplaces and the state of your listings change the work enough that an honest number has to follow the audit, not precede it.",
  },
  {
    q: "How does pricing get decided?",
    a: "The free audit is step one. It reads your Search Term, Business and bulk reports and shows where the problem actually is. Scope and fee follow from what it finds — you see the number before you commit to anything.",
  },
  {
    q: "Is there a long contract?",
    a: "No lock-in that holds your account hostage. The work is month-to-month; if it is not paying for itself, you should be able to leave — and keep your campaign structure, keyword lists and negatives when you do.",
  },
  {
    q: "Do you charge a percentage of ad spend?",
    a: "The structure is agreed up front and set against your account, not left as an open-ended cut. Whatever the shape, it is one you can check against the value it produces in your own reporting.",
  },
  {
    q: "Do you guarantee an ACOS or a rank?",
    a: "No. Nobody controls Amazon's algorithm or a competitor's budget. We commit to the method, the cadence and the reporting — not to a number we cannot honestly promise.",
  },
];

export default function PricingPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FAQPage",
        "@id": `https://${site.domain}/pricing/#faq`,
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `https://${site.domain}/` },
          { "@type": "ListItem", position: 2, name: "Pricing", item: `https://${site.domain}/pricing/` },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <RevealProvider />
      <Header />

      <main className="flex-1 bg-white">
        <section className="relative overflow-hidden bg-navy-900 pb-14 pt-32 text-white md:pt-40">
          <div className="pointer-events-none absolute inset-0 bg-grid opacity-50" />
          <div className="pointer-events-none absolute -left-40 top-0 h-[30rem] w-[30rem] glow" />
          <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-balance text-3xl font-extrabold leading-[1.12] sm:text-4xl lg:text-[2.75rem]">
              Pricing &amp; engagement
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-navy-200">
              Scoped per account, from a free audit. No flat menu that
              overcharges small accounts and underserves large ones — and no
              number quoted before we have seen what the work actually is.
            </p>
          </div>
        </section>

        <article className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
          <p className="text-lg leading-relaxed text-navy-700">
            The honest answer to &ldquo;what does it cost&rdquo; is &ldquo;it
            depends&rdquo; — so here is exactly what it depends on, and how the
            number gets decided, before you ever have to commit.
          </p>

          <section className="mt-12">
            <h2 className="text-xl font-extrabold text-navy-800 sm:text-2xl">
              How the free audit works
            </h2>
            <ol className="mt-6 space-y-4">
              {[
                "You export three reports — Search Term, Business and the bulk file. No Seller Central password changes hands.",
                "We read them and find where the money is actually leaking: targeting, listing, or campaign structure.",
                "You get a written list of what to fix — yours to keep whether or not you hire us.",
                "If it makes sense to work together, scope and fee follow from what the audit found. You see the number first.",
              ].map((step, i) => (
                <li key={i} className="flex gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-500/15 text-sm font-bold text-brand-700">
                    {i + 1}
                  </span>
                  <span className="pt-0.5 leading-relaxed text-navy-600">{step}</span>
                </li>
              ))}
            </ol>
          </section>

          <section className="mt-12">
            <h2 className="text-xl font-extrabold text-navy-800 sm:text-2xl">
              What determines your scope
            </h2>
            <ul className="mt-6 space-y-4">
              {scopeFactors.map((f) => (
                <li key={f.label} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-500" />
                  <div>
                    <div className="font-bold text-navy-800">{f.label}</div>
                    <p className="mt-1 leading-relaxed text-navy-600">{f.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-12">
            <h2 className="text-xl font-extrabold text-navy-800 sm:text-2xl">
              What you can count on
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                "Month-to-month — no lock-in that holds your account hostage.",
                "You keep your campaigns, keyword lists and negatives if you leave.",
                "No guaranteed ACOS or rank, because neither can be honestly promised.",
                "Reporting you can read, tying every change to what it did.",
              ].map((line) => (
                <div
                  key={line}
                  className="flex items-start gap-2.5 rounded-2xl border border-navy-100 bg-navy-50/60 p-5 text-navy-700"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-500" />
                  <span className="leading-relaxed">{line}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-12">
            <h2 className="text-xl font-extrabold text-navy-800 sm:text-2xl">
              Pricing questions
            </h2>
            <div className="mt-6 space-y-6">
              {faqs.map((f) => (
                <div key={f.q}>
                  <h3 className="font-bold text-navy-800">{f.q}</h3>
                  <p className="mt-2 leading-relaxed text-navy-600">{f.a}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="mt-12 rounded-2xl border border-navy-100 bg-navy-50/70 p-7">
            <h2 className="text-lg font-extrabold text-navy-800">
              Get the number that fits your account
            </h2>
            <p className="mt-2 text-navy-500">
              Start with the free audit — it costs nothing and the findings are
              yours to keep. See the{" "}
              <Link href="/services/" className="font-semibold text-brand-600 underline-offset-4 hover:underline">
                services
              </Link>{" "}
              if you want the detail first.
            </p>
            <CtaButton href="/#book" className="mt-5">
              Get my free audit
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </CtaButton>
          </div>
        </article>
      </main>

      <Footer />
      <FloatingActions />
    </>
  );
}
