import Link from "next/link";
import { ArrowRight, CheckCircle2, Check, X } from "lucide-react";
import { site } from "@/lib/site-config";
import type { ServicePage } from "@/lib/services-content";
import { answerBySlug } from "@/lib/answers";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { FloatingActions } from "@/components/site/floating-actions";
import { RevealProvider, CtaButton, PartnerBadge } from "@/components/site/primitives";

/**
 * Shared renderer for a single service page. Content comes entirely from
 * `servicePages` in services-content.ts, so the two route files stay thin.
 */
export function ServiceDetail({ data }: { data: ServicePage }) {
  const url = `https://${site.domain}/${data.slug}/`;
  const related = data.relatedAnswers.map(answerBySlug).filter(Boolean);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: data.title,
        serviceType: data.serviceType,
        description: data.metaDescription,
        url,
        provider: { "@id": `https://${site.domain}/#org` },
        areaServed: ["US", "Europe"],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: `${data.title} — what's included`,
          itemListElement: data.included.map((i) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: i.label },
          })),
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: data.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `https://${site.domain}/` },
          { "@type": "ListItem", position: 2, name: "Services", item: `https://${site.domain}/services/` },
          { "@type": "ListItem", position: 3, name: data.title, item: url },
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
        {/* Title band */}
        <section className="relative overflow-hidden bg-navy-900 pb-14 pt-32 text-white md:pt-40">
          <div className="pointer-events-none absolute inset-0 bg-grid opacity-50" />
          <div className="pointer-events-none absolute -left-40 top-0 h-[30rem] w-[30rem] rounded-full bg-brand-500/12 blur-[120px]" />
          <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <Link
              href="/services/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-400 transition-colors hover:text-brand-300"
            >
              All services
            </Link>
            <h1 className="mt-5 text-balance text-3xl font-extrabold leading-[1.12] sm:text-4xl lg:text-[2.75rem]">
              {data.title}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-navy-200">{data.tagline}</p>
            <div className="mt-7">
              <CtaButton href="/#book">
                Get my free audit
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </CtaButton>
            </div>
            <div className="mt-6">
              <PartnerBadge />
            </div>
          </div>
        </section>

        <article className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
          <p className="text-lg leading-relaxed text-navy-700">{data.intro}</p>

          {/* What's included */}
          <section className="mt-12">
            <h2 className="text-xl font-extrabold text-navy-800 sm:text-2xl">
              What&rsquo;s included
            </h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {data.included.map((i) => (
                <li
                  key={i.label}
                  className="rounded-2xl border border-navy-100 bg-navy-50/60 p-5"
                >
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-500" />
                    <div>
                      <div className="font-bold text-navy-800">{i.label}</div>
                      <p className="mt-1 text-sm leading-relaxed text-navy-500">{i.detail}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* Method sections */}
          {data.sections.map((s) => (
            <section key={s.heading} className="mt-10">
              <h2 className="text-xl font-extrabold text-navy-800 sm:text-2xl">{s.heading}</h2>
              {s.body.map((p, i) => (
                <p key={i} className="mt-4 leading-relaxed text-navy-600">
                  {p}
                </p>
              ))}
            </section>
          ))}

          {/* Fit check */}
          <section className="mt-12 grid gap-5 sm:grid-cols-2">
            <div className="rounded-2xl border border-brand-200 bg-brand-50/50 p-6">
              <div className="text-sm font-bold uppercase tracking-wide text-brand-700">
                A good fit if
              </div>
              <ul className="mt-4 space-y-3">
                {data.fit.good.map((g) => (
                  <li key={g} className="flex gap-2.5 text-sm leading-relaxed text-navy-700">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                    {g}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-navy-100 bg-navy-50/70 p-6">
              <div className="text-sm font-bold uppercase tracking-wide text-navy-500">
                Not the right fit if
              </div>
              <ul className="mt-4 space-y-3">
                {data.fit.notFor.map((n) => (
                  <li key={n} className="flex gap-2.5 text-sm leading-relaxed text-navy-600">
                    <X className="mt-0.5 h-4 w-4 shrink-0 text-navy-400" />
                    {n}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* FAQ */}
          <section className="mt-12">
            <h2 className="text-xl font-extrabold text-navy-800 sm:text-2xl">
              Common questions
            </h2>
            <div className="mt-6 space-y-6">
              {data.faqs.map((f) => (
                <div key={f.q}>
                  <h3 className="font-bold text-navy-800">{f.q}</h3>
                  <p className="mt-2 leading-relaxed text-navy-600">{f.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <div className="mt-12 rounded-2xl border border-navy-100 bg-navy-50/70 p-7">
            <h2 className="text-lg font-extrabold text-navy-800">
              Start with the audit, not the contract
            </h2>
            <p className="mt-2 text-navy-500">
              It runs on three exported reports and needs no Seller Central
              password. You get the findings whether or not you hire us.
            </p>
            <CtaButton href="/#book" className="mt-5">
              Get my free audit
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </CtaButton>
          </div>

          {related.length > 0 && (
            <nav className="mt-12" aria-label="Related answers">
              <h2 className="text-lg font-extrabold text-navy-800">Read more</h2>
              <ul className="mt-4 space-y-2.5">
                {related.map((r) => (
                  <li key={r!.slug}>
                    <Link
                      href={`/answers/${r!.slug}/`}
                      className="group flex items-start gap-2.5 text-navy-600 transition-colors hover:text-brand-600"
                    >
                      <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-brand-500 transition-transform group-hover:translate-x-0.5" />
                      {r!.question}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </article>
      </main>

      <Footer />
      <FloatingActions />
    </>
  );
}
