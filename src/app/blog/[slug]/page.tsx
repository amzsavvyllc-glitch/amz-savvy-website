import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CalendarDays, Clock, ExternalLink } from "lucide-react";
import { posts, postBySlug } from "@/lib/blog";
import { answerBySlug } from "@/lib/answers";
import { site } from "@/lib/site-config";
import { AuthorBox, Byline } from "@/components/site/author-box";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { FloatingActions } from "@/components/site/floating-actions";
import { RevealProvider } from "@/components/site/primitives";
import { CtaButton } from "@/components/site/ui";
import { Diagram } from "@/components/site/diagram";

/** Static export: every post is pre-rendered at build time. */
export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

// Next 16: route params arrive as a Promise.
type Props = { params: Promise<{ slug: string }> };

/** Trim to a word boundary — a description cut mid-word looks broken
 *  everywhere it is shown verbatim (Slack, WhatsApp and LinkedIn unfurls). */
function metaDescription(text: string, max = 155): string {
  if (text.length <= max) return text;
  const window = text.slice(0, max + 1);
  const sentenceEnd = window.lastIndexOf(". ");
  if (sentenceEnd > max * 0.6) return window.slice(0, sentenceEnd + 1);
  return window.replace(/\s+\S*$/, "") + "…";
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = postBySlug(slug);
  if (!p) return {};
  const description = metaDescription(p.excerpt);
  const url = `https://${site.domain}/blog/${p.slug}/`;
  // Share this post's own hero rather than the generic site card: a unfurl
  // that shows the headline beats one that shows the company name again.
  const image = p.image
    ? { url: p.image.src, width: p.image.width, height: p.image.height, alt: p.image.alt }
    : { url: "/og.png", width: 1200, height: 630, alt: "AMZ Savvy — Amazon PPC & SEO agency" };
  return {
    title: p.title,
    description,
    alternates: { canonical: `/blog/${p.slug}/` },
    openGraph: {
      type: "article",
      title: p.title,
      description,
      url,
      publishedTime: p.date,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: p.title,
      description,
      images: [image.url],
    },
  };
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const p = postBySlug(slug);
  if (!p) notFound();

  const url = `https://${site.domain}/blog/${p.slug}/`;
  const related = (p.related ?? []).map(answerBySlug).filter(Boolean);
  const more = posts.filter((o) => o.slug !== p.slug).slice(0, 2);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": url,
        url,
        headline: p.title,
        description: p.excerpt,
        datePublished: p.date,
        dateModified: p.date,
        articleSection: p.category,
        // ImageObject rather than a bare URL: the caption and description are
        // what Google Images has to work with, and they are the only place the
        // image's meaning is stated in machine-readable form.
        ...(p.image && {
          image: {
            "@type": "ImageObject",
            url: `https://${site.domain}${p.image.src}`,
            contentUrl: `https://${site.domain}${p.image.src}`,
            width: p.image.width,
            height: p.image.height,
            caption: p.image.alt,
            description: p.image.alt,
            representativeOfPage: true,
            creditText: site.name,
            creator: { "@id": `https://${site.domain}/#org` },
          },
        }),
        author: { "@id": `https://${site.domain}/#founder` },
        publisher: { "@id": `https://${site.domain}/#org` },
        isPartOf: { "@id": `https://${site.domain}/blog/` },
        mainEntityOfPage: url,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `https://${site.domain}/` },
          { "@type": "ListItem", position: 2, name: "Blog", item: `https://${site.domain}/blog/` },
          { "@type": "ListItem", position: 3, name: p.title, item: url },
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
            <Link
              href="/blog/"
              className="-my-3 inline-flex items-center gap-2 py-3 text-sm font-semibold text-brand-400 transition-colors hover:text-brand-300"
            >
              <ArrowLeft className="h-4 w-4" />
              All posts
            </Link>
            <h1 className="mt-5 text-balance text-3xl font-extrabold leading-[1.12] sm:text-4xl lg:text-[2.6rem]">
              {p.title}
            </h1>
            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-navy-300">
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-400">
                {p.category}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="h-4 w-4" />
                {formatDate(p.date)}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {p.readMinutes} min read
              </span>
              <Byline />
            </div>
          </div>
        </section>

        <article className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
          {/* The article hero: largest element above the fold, so it leads
              the load rather than waiting behind lazy-loading. */}
          {p.image && (
            <Diagram
              image={p.image}
              priority
              sizes="(min-width: 768px) 704px, calc(100vw - 32px)"
              className="mb-10 w-full rounded-2xl border border-navy-100"
            />
          )}

          <p className="text-lg leading-relaxed text-navy-700">{p.excerpt}</p>

          {p.sections.map((s) => (
            <section key={s.heading} className="mt-10">
              <h2 className="text-xl font-extrabold text-navy-800 sm:text-2xl">
                {s.heading}
              </h2>
              {s.body.map((para, i) => (
                <p key={i} className="mt-4 leading-relaxed text-navy-600">
                  {para}
                </p>
              ))}
            </section>
          ))}

          {p.sources && p.sources.length > 0 && (
            <section className="mt-12 rounded-2xl border border-navy-100 bg-navy-50/70 p-6">
              <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-brand-600">
                Sources
              </h2>
              <ul className="mt-4 space-y-2.5">
                {p.sources.map((s) => (
                  <li key={s.url}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-start gap-2 text-sm text-navy-600 underline decoration-navy-300 underline-offset-2 transition-colors hover:text-brand-600"
                    >
                      <ExternalLink className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <AuthorBox />

          <div className="mt-12 rounded-2xl border border-navy-100 bg-navy-50/70 p-7">
            <h2 className="text-lg font-extrabold text-navy-800">
              Want this run on your own account?
            </h2>
            <p className="mt-2 text-navy-500">
              The free audit applies all of this to your real numbers — no Seller
              Central password needed, just three exported reports.
            </p>
            <CtaButton href="/#book" className="mt-5">
              Get my free audit
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </CtaButton>
          </div>

          {related.length > 0 && (
            <nav className="mt-12" aria-label="Related answers">
              <h2 className="text-lg font-extrabold text-navy-800">
                Go deeper
              </h2>
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

          {more.length > 0 && (
            <nav className="mt-10" aria-label="More posts">
              <h2 className="text-lg font-extrabold text-navy-800">More posts</h2>
              <ul className="mt-4 space-y-2.5">
                {more.map((o) => (
                  <li key={o.slug}>
                    <Link
                      href={`/blog/${o.slug}/`}
                      className="group flex items-start gap-2.5 text-navy-600 transition-colors hover:text-brand-600"
                    >
                      <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-brand-500 transition-transform group-hover:translate-x-0.5" />
                      {o.title}
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
