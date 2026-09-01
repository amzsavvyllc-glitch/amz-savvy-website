import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { answers, categories } from "@/lib/answers";
import { site } from "@/lib/site-config";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { FloatingActions } from "@/components/site/floating-actions";
import { RevealProvider } from "@/components/site/primitives";
import { SectionHeading } from "@/components/site/ui";

const description =
  "Straight answers to the questions Amazon sellers actually ask about ACOS, wasted ad spend, campaign structure, ranking and when an agency is worth it.";

export const metadata: Metadata = {
  title: "Amazon PPC & SEO Answers",
  description,
  alternates: { canonical: "/answers/" },
  // Without an explicit block this page inherits the layout's openGraph, which
  // sets og:url to the homepage — contradicting this page's own canonical.
  openGraph: {
    type: "website",
    title: "Amazon PPC & SEO Answers",
    description,
    url: `https://${site.domain}/answers/`,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "AMZ Savvy — Amazon PPC & SEO agency" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Amazon PPC & SEO Answers",
    description,
    images: ["/og.png"],
  },
};

/* A single FAQPage carrying every question, so one crawl of this index exposes
   the whole library as structured Q&A rather than as a list of links. */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "FAQPage",
      "@id": `https://${site.domain}/answers/#faq`,
      mainEntity: answers.map((a) => ({
        "@type": "Question",
        name: a.question,
        url: `https://${site.domain}/answers/${a.slug}/`,
        acceptedAnswer: { "@type": "Answer", text: a.short },
      })),
    },
    {
      "@type": "CollectionPage",
      "@id": `https://${site.domain}/answers/`,
      name: "Amazon PPC & SEO Answers",
      isPartOf: { "@id": `https://${site.domain}/#website` },
      publisher: { "@id": `https://${site.domain}/#org` },
    },
  ],
};

export default function AnswersIndex() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <RevealProvider />
      <Header />

      <main className="flex-1 bg-white">
        <section className="relative overflow-hidden bg-navy-900 pb-16 pt-32 text-white md:pt-40">
          <div className="pointer-events-none absolute inset-0 bg-grid opacity-50" />
          <div className="pointer-events-none absolute -right-32 top-10 h-[32rem] w-[32rem] glow" />
          <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              as="h1"
              tone="dark"
              eyebrow="Answers"
              title={
                <>
                  Straight answers, <span className="text-brand-400">no gatekeeping</span>
                </>
              }
              sub="The questions Amazon sellers actually ask, answered properly. No email required, no download, no course."
            />
          </div>
        </section>

        <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
          {categories.map((cat) => {
            const items = answers.filter((a) => a.category === cat);
            if (items.length === 0) return null;
            return (
              <section key={cat} className="mb-12">
                <h2 className="flex items-center gap-3 text-sm font-bold uppercase tracking-[0.16em] text-brand-600">
                  <span className="h-px w-6 bg-current" />
                  {cat}
                </h2>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {items.map((a) => (
                    <li key={a.slug}>
                      <Link
                        href={`/answers/${a.slug}/`}
                        className="group flex h-full flex-col rounded-2xl border border-navy-100 bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-brand-500/40 hover:shadow-lg hover:shadow-navy-900/5"
                      >
                        <h3 className="font-heading text-base font-extrabold leading-snug text-navy-800">
                          {a.question}
                        </h3>
                        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-navy-500">
                          {a.short}
                        </p>
                        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-brand-600">
                          Read
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      </main>

      <Footer />
      <FloatingActions />
    </>
  );
}
