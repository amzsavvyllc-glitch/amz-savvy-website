import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BadgeCheck, MapPin } from "lucide-react";
import {
  site,
  founder,
  stats,
  reviewSource,
  addressLine,
  profiles,
} from "@/lib/site-config";
import { Header } from "@/components/site/header";
import { Footer, FloatingActions } from "@/components/site/convert";
import { RevealProvider, CtaButton, PartnerBadge } from "@/components/site/primitives";

/**
 * ABOUT — the entity page.
 *
 * The site had 48 pages of advice and nowhere that said who was behind them.
 * This page exists to be the one URL that answers "who is AMZ Savvy" for three
 * different readers at once: a buyer deciding whether to trust the advice,
 * Google looking for experience and expertise signals behind commercial
 * advice, and an AI answer engine deciding whether this source is attributable
 * enough to cite.
 *
 * PROOF RULE, same as everywhere else on this site: every number and claim here
 * is owner-confirmed and checkable from outside — the partner status against
 * Amazon's public directory listing, the rating against the live Fiverr
 * profile, the figures against `stats` in site-config. Nothing goes on this
 * page that a sceptical reader could not verify.
 */

const description =
  `${founder.name} runs AMZ Savvy, an Amazon Ads Verified Partner agency managing Amazon PPC and SEO for brand owners in the US and Europe. Nine years on Amazon, $8M+ in managed ad spend, 120+ brands.`;

export const metadata: Metadata = {
  title: "About AMZ Savvy",
  description,
  alternates: { canonical: "/about/" },
  openGraph: {
    type: "profile",
    title: "About AMZ Savvy",
    description,
    url: `https://${site.domain}/about/`,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "AMZ Savvy — Amazon PPC & SEO agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About AMZ Savvy",
    description,
    images: ["/og.png"],
  },
};

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "@id": `https://${site.domain}/about/#page`,
        url: `https://${site.domain}/about/`,
        name: "About AMZ Savvy",
        description,
        // The page is ABOUT both the company and the person — that pairing is
        // what lets an engine resolve "who wrote this" into a real entity.
        about: [
          { "@id": `https://${site.domain}/#org` },
          { "@id": `https://${site.domain}/#founder` },
        ],
        isPartOf: { "@id": `https://${site.domain}/#website` },
        publisher: { "@id": `https://${site.domain}/#org` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: `https://${site.domain}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "About",
            item: `https://${site.domain}/about/`,
          },
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
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-400">
              <BadgeCheck className="h-3.5 w-3.5" />
              Amazon Ads Verified Partner
            </span>
            <h1 className="mt-5 text-balance text-3xl font-extrabold leading-[1.12] sm:text-4xl lg:text-[2.75rem]">
              About AMZ Savvy
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-navy-200">
              An Amazon advertising agency run by {founder.name}, working with
              brand owners in the US and Europe on PPC, listing optimisation and
              organic ranking.
            </p>
          </div>
        </section>

        <article className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
          {/* Numbers first — they are the fastest credibility check a reader
              or a model can make, and every one is verifiable. */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-navy-100 bg-navy-50/70 p-5 text-center"
              >
                <div className="text-2xl font-extrabold text-navy-900">
                  {s.prefix}
                  {"decimals" in s && s.decimals
                    ? s.value.toFixed(s.decimals)
                    : s.value}
                  {s.suffix}
                </div>
                <div className="mt-1 text-xs font-semibold uppercase tracking-wide text-navy-400">
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          <section className="mt-12">
            <h2 className="text-xl font-extrabold text-navy-800 sm:text-2xl">
              Who runs it
            </h2>
            {founder.bio.map((p, i) => (
              <p key={i} className="mt-4 leading-relaxed text-navy-600">
                {p}
              </p>
            ))}
          </section>

          <section className="mt-10">
            <h2 className="text-xl font-extrabold text-navy-800 sm:text-2xl">
              What &ldquo;Verified Partner&rdquo; actually means
            </h2>
            <p className="mt-4 leading-relaxed text-navy-600">
              Amazon runs its own partner directory and verifies the agencies
              listed in it. It is not a badge you buy or a certification you sit
              an exam for — Amazon checks the account history behind it. You can
              confirm the listing yourself rather than taking it on trust.
            </p>
            <div className="mt-6">
              <PartnerBadge width={180} />
            </div>
            <a
              href={profiles[0]}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-600 underline-offset-4 hover:underline"
            >
              See the listing in Amazon&rsquo;s partner directory
              <ArrowRight className="h-4 w-4" />
            </a>
          </section>

          <section className="mt-10">
            <h2 className="text-xl font-extrabold text-navy-800 sm:text-2xl">
              How we work, and what we will not do
            </h2>
            <p className="mt-4 leading-relaxed text-navy-600">
              Every engagement starts with a read of the account before anything
              is changed. In the first week no bids are touched — the search
              term report, the business report and the bulk file get pulled and
              read first, because roughly a third of the problems that look like
              bidding problems turn out to be listing problems, and changing
              bids first destroys the baseline you would have measured against.
            </p>
            <p className="mt-4 leading-relaxed text-navy-600">
              We do not guarantee a rank or a sales figure. Nobody controls
              Amazon&rsquo;s algorithm or a competitor&rsquo;s budget, and an
              agency that promises either is telling you something it cannot
              know. What can be committed to is the method, the cadence and the
              reporting — and that you keep your campaign structure and keyword
              lists if you leave.
            </p>
            <p className="mt-4 leading-relaxed text-navy-600">
              The same rule governs the {" "}
              <Link
                href="/answers/"
                className="font-semibold text-brand-600 underline-offset-4 hover:underline"
              >
                answers library
              </Link>{" "}
              and the{" "}
              <Link
                href="/blog/"
                className="font-semibold text-brand-600 underline-offset-4 hover:underline"
              >
                blog
              </Link>
              : no invented benchmarks, no fabricated case studies, and no
              confident number about an Amazon limit or fee without a current
              source next to it. Where a figure cannot be verified, it is left
              out rather than guessed.
            </p>
          </section>

          <section className="mt-10">
            <h2 className="text-xl font-extrabold text-navy-800 sm:text-2xl">
              What clients say
            </h2>
            <p className="mt-4 leading-relaxed text-navy-600">
              Reviews are public and tied to completed paid orders on Fiverr,
              where the agency holds a {reviewSource.rating} rating across{" "}
              {reviewSource.count} reviews. They are quoted verbatim on the
              homepage rather than paraphrased, and they are not marked up as
              structured data on this site — a third-party rating that a company
              marks up on its own pages is self-serving, and Google treats it
              that way.
            </p>
            <a
              href={reviewSource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-600 underline-offset-4 hover:underline"
            >
              Read the reviews on {reviewSource.platform}
              <ArrowRight className="h-4 w-4" />
            </a>
          </section>

          <section className="mt-10">
            <h2 className="text-xl font-extrabold text-navy-800 sm:text-2xl">
              Where we are
            </h2>
            <p className="mt-4 inline-flex items-start gap-2 leading-relaxed text-navy-600">
              <MapPin className="mt-1 h-4 w-4 shrink-0 text-brand-600" />
              <span>
                {addressLine}
                <br />
                <a
                  href={`tel:${site.phone}`}
                  className="font-semibold text-brand-600 underline-offset-4 hover:underline"
                >
                  {site.phoneDisplay}
                </a>
                {" · "}
                <a
                  href={`mailto:${site.email}`}
                  className="font-semibold text-brand-600 underline-offset-4 hover:underline"
                >
                  {site.email}
                </a>
              </span>
            </p>
          </section>

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
        </article>
      </main>

      <Footer />
      <FloatingActions />
    </>
  );
}
