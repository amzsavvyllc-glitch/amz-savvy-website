import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarDays, Clock } from "lucide-react";
import { posts } from "@/lib/blog";
import { site } from "@/lib/site-config";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { FloatingActions } from "@/components/site/floating-actions";
import { RevealProvider, SectionHeading } from "@/components/site/primitives";
import { Diagram } from "@/components/site/diagram";

const description =
  "Practical writing on Amazon advertising and listing optimisation — what changed, what it means for your account, and what to do about it.";

export const metadata: Metadata = {
  title: "Amazon PPC & SEO Blog",
  description,
  alternates: { canonical: "/blog/" },
  // Without an explicit block this inherits the layout's openGraph, whose
  // og:url points at the homepage and contradicts this page's canonical.
  openGraph: {
    type: "website",
    title: "Amazon PPC & SEO Blog",
    description,
    url: `https://${site.domain}/blog/`,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "AMZ Savvy — Amazon PPC & SEO agency" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Amazon PPC & SEO Blog",
    description,
    images: ["/og.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Blog",
      "@id": `https://${site.domain}/blog/`,
      name: "Amazon PPC & SEO Blog",
      description,
      isPartOf: { "@id": `https://${site.domain}/#website` },
      publisher: { "@id": `https://${site.domain}/#org` },
      blogPost: posts.map((p) => ({
        "@type": "BlogPosting",
        headline: p.title,
        description: p.excerpt,
        datePublished: p.date,
        url: `https://${site.domain}/blog/${p.slug}/`,
        ...(p.image && {
          image: {
            "@type": "ImageObject",
            url: `https://${site.domain}${p.image.src}`,
            width: p.image.width,
            height: p.image.height,
            caption: p.image.alt,
          },
        }),
      })),
    },
  ],
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function BlogIndex() {
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
          <div className="pointer-events-none absolute -right-32 top-10 h-[32rem] w-[32rem] rounded-full bg-brand-500/12 blur-[120px]" />
          <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              as="h1"
              tone="dark"
              eyebrow="Blog"
              title={
                <>
                  What changed on Amazon, <span className="text-brand-400">and what to do</span>
                </>
              }
              sub="Written for sellers who run the account themselves. Every factual claim links to its source."
            />
          </div>
        </section>

        <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <p className="text-navy-500">First posts are on the way.</p>
          ) : (
            <ul className="grid gap-5 sm:grid-cols-2">
              {posts.map((p, i) => (
                <li key={p.slug}>
                  <Link
                    href={`/blog/${p.slug}/`}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-navy-100 bg-white transition-all hover:-translate-y-0.5 hover:border-brand-500/40 hover:shadow-lg hover:shadow-navy-900/5"
                  >
                    {/* Only the first card is likely above the fold. */}
                    {p.image && (
                      <Diagram
                        image={p.image}
                        priority={i === 0}
                        sizes="(min-width: 640px) 470px, calc(100vw - 32px)"
                        className="w-full border-b border-navy-100"
                      />
                    )}
                    <div className="flex flex-1 flex-col p-6">
                    <span className="w-fit rounded-full bg-navy-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-600">
                      {p.category}
                    </span>
                    <h2 className="mt-4 font-heading text-lg font-extrabold leading-snug text-navy-800">
                      {p.title}
                    </h2>
                    <p className="mt-2.5 flex-1 text-sm leading-relaxed text-navy-500">
                      {p.excerpt}
                    </p>
                    <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-navy-100 pt-4 text-xs text-navy-400">
                      <span className="inline-flex items-center gap-1.5">
                        <CalendarDays className="h-3.5 w-3.5" />
                        {formatDate(p.date)}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" />
                        {p.readMinutes} min read
                      </span>
                      <span className="ml-auto inline-flex items-center gap-1.5 font-bold text-brand-600">
                        Read
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>

      <Footer />
      <FloatingActions />
    </>
  );
}
