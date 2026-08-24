import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CalendarDays } from "lucide-react";
import { answers, answerBySlug } from "@/lib/answers";
import { site } from "@/lib/site-config";
import { AuthorBox, Byline } from "@/components/site/author-box";
import { Header } from "@/components/site/header";
import { Footer, FloatingActions } from "@/components/site/convert";
import { CtaButton, RevealProvider } from "@/components/site/primitives";

/** Static export: every answer is pre-rendered at build time. */
export function generateStaticParams() {
  return answers.map((a) => ({ slug: a.slug }));
}

// Next 16: route params arrive as a Promise.
type Props = { params: Promise<{ slug: string }> };

/** Trim to a word boundary near `max` — never mid-word, never mid-sentence if
 *  a sentence end is close. A description cut at "bought at a los" looks broken
 *  everywhere it is shown verbatim (Slack, WhatsApp and LinkedIn unfurls). */
function metaDescription(text: string, max = 155): string {
  if (text.length <= max) return text;
  const window = text.slice(0, max + 1);
  const sentenceEnd = window.lastIndexOf(". ");
  if (sentenceEnd > max * 0.6) return window.slice(0, sentenceEnd + 1);
  return window.replace(/\s+\S*$/, "") + "…";
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const a = answerBySlug(slug);
  if (!a) return {};
  const description = metaDescription(a.short);
  const url = `https://${site.domain}/answers/${a.slug}/`;
  return {
    title: a.question,
    description,
    alternates: { canonical: `/answers/${a.slug}/` },
    openGraph: {
      type: "article",
      title: a.question,
      description,
      url,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "AMZ Savvy — Amazon PPC & SEO agency" }],
    },
    // Without these, Twitter/X cards fall through to the homepage's copy while
    // the OG tags describe this page — two cards, two different subjects.
    twitter: {
      card: "summary_large_image",
      title: a.question,
      description,
      images: ["/og.png"],
    },
  };
}

export default async function AnswerPage({ params }: Props) {
  const { slug } = await params;
  const a = answerBySlug(slug);
  if (!a) notFound();

  const url = `https://${site.domain}/answers/${a.slug}/`;
  const related = a.related.map(answerBySlug).filter(Boolean);

  /* QAPage + BreadcrumbList: tells crawlers and AI systems that this page IS
     the answer to one specific question, and where it sits in the site. */
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "QAPage",
        "@id": url,
        url,
        mainEntity: {
          "@type": "Question",
          name: a.question,
          dateModified: a.updated,
          answerCount: 1,
          acceptedAnswer: {
            "@type": "Answer",
            text: a.short,
            url,
            // Attributed to the named practitioner, not the bare company.
            // Answer engines quote a person far more readily than a domain.
            author: { "@id": `https://${site.domain}/#founder` },
          },
        },
        isPartOf: { "@id": `https://${site.domain}/#website` },
        about: { "@type": "Thing", name: "Amazon advertising" },
        publisher: { "@id": `https://${site.domain}/#org` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `https://${site.domain}/` },
          { "@type": "ListItem", position: 2, name: "Answers", item: `https://${site.domain}/answers/` },
          { "@type": "ListItem", position: 3, name: a.question, item: url },
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
              href="/answers/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-400 transition-colors hover:text-brand-300"
            >
              <ArrowLeft className="h-4 w-4" />
              All answers
            </Link>
            <h1 className="mt-5 text-balance text-3xl font-extrabold leading-[1.12] sm:text-4xl lg:text-[2.75rem]">
              {a.question}
            </h1>
            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-navy-300">
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-400">
                {a.category}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="h-4 w-4" />
                Updated {a.updated}
              </span>
              <Byline />
            </div>
          </div>
        </section>

        <article className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
          {/* The short answer, first thing on the page and self-contained.
              This is the passage most likely to be retrieved and quoted. */}
          <div className="rounded-2xl border-l-4 border-brand-500 bg-navy-50 p-6 sm:p-7">
            <div className="text-xs font-bold uppercase tracking-[0.16em] text-brand-600">
              Short answer
            </div>
            <p className="mt-3 text-lg leading-relaxed text-navy-800">{a.short}</p>
          </div>

          {a.sections.map((s) => (
            <section key={s.heading} className="mt-10">
              <h2 className="text-xl font-extrabold text-navy-800 sm:text-2xl">
                {s.heading}
              </h2>
              {s.body.map((p, i) => (
                <p key={i} className="mt-4 leading-relaxed text-navy-600">
                  {p}
                </p>
              ))}
            </section>
          ))}

          <AuthorBox />

          {/* Conversion path from an informational page */}
          <div className="mt-12 rounded-2xl border border-navy-100 bg-navy-50/70 p-7">
            <h2 className="text-lg font-extrabold text-navy-800">
              Want this checked on your own account?
            </h2>
            <p className="mt-2 text-navy-500">
              The free audit answers this question with your numbers instead of
              general rules — no Seller Central password needed.
            </p>
            <CtaButton href="/#book" className="mt-5">
              Get my free audit
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </CtaButton>
          </div>

          {related.length > 0 && (
            <nav className="mt-12" aria-label="Related answers">
              <h2 className="text-lg font-extrabold text-navy-800">Related</h2>
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
