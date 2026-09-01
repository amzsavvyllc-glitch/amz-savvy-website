import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Search, Target, Rocket, TrendingUp } from "lucide-react";
import { site, services, stats } from "@/lib/site-config";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { FloatingActions } from "@/components/site/floating-actions";
import { RevealProvider } from "@/components/site/primitives";
import { CtaButton } from "@/components/site/ui";

const description =
  "Amazon PPC management, SEO and listing optimization, launches and ranking — from an Amazon Ads Verified Partner. Audit-first, bid-to-margin, no guaranteed-number promises.";

export const metadata: Metadata = {
  title: "Amazon Advertising Services",
  description,
  alternates: { canonical: "/services/" },
  openGraph: {
    type: "website",
    title: "Amazon Advertising Services | AMZ Savvy",
    description,
    url: `https://${site.domain}/services/`,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "AMZ Savvy — Amazon PPC & SEO agency" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Amazon Advertising Services | AMZ Savvy",
    description,
    images: ["/og.png"],
  },
};

// Icon name (from site-config) → component; and title → dedicated page where one exists.
const icons = { Search, Target, Rocket, TrendingUp } as const;
const detailHref: Record<string, string> = {
  "Amazon SEO": "/amazon-seo/",
  "PPC Management": "/amazon-ppc-management/",
};

export default function ServicesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ItemList",
        "@id": `https://${site.domain}/services/#list`,
        name: "AMZ Savvy services",
        itemListElement: services.map((s, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "Service",
            name: s.title,
            description: s.tagline,
            provider: { "@id": `https://${site.domain}/#org` },
            ...(detailHref[s.title]
              ? { url: `https://${site.domain}${detailHref[s.title]}` }
              : {}),
          },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `https://${site.domain}/` },
          { "@type": "ListItem", position: 2, name: "Services", item: `https://${site.domain}/services/` },
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
              Amazon advertising services
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-navy-200">
              Four levers, pulled in the right order — SEO to get found, PPC to
              scale what converts, launches for momentum, and ranking to hold
              page one. Every engagement starts with a free audit.
            </p>
          </div>
        </section>

        <article className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2">
            {services.map((s) => {
              const Icon = icons[s.icon as keyof typeof icons] ?? Target;
              const href = detailHref[s.title];
              return (
                <div
                  key={s.title}
                  className="flex flex-col rounded-2xl border border-navy-100 bg-navy-50/50 p-7"
                >
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-500/12 text-brand-600">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h2 className="mt-4 text-lg font-extrabold text-navy-800">{s.title}</h2>
                  <p className="mt-1.5 text-navy-500">{s.tagline}</p>
                  <ul className="mt-4 space-y-2 text-sm text-navy-600">
                    {s.points.map((p) => (
                      <li key={p} className="flex gap-2">
                        <ArrowRight className="mt-1 h-3.5 w-3.5 shrink-0 text-brand-500" />
                        {p}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 pt-1">
                    {href ? (
                      <Link
                        href={href}
                        className="group inline-flex items-center gap-1.5 text-sm font-bold text-brand-600 underline-offset-4 hover:underline"
                      >
                        Explore {s.title}
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </Link>
                    ) : (
                      <Link
                        href="/#book"
                        className="group inline-flex items-center gap-1.5 text-sm font-bold text-brand-600 underline-offset-4 hover:underline"
                      >
                        Ask about {s.title}
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Proof band — same owner-confirmed, checkable numbers used site-wide */}
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-navy-100 bg-white p-5 text-center"
              >
                <div className="text-2xl font-extrabold text-navy-900">
                  {s.prefix}
                  {"decimals" in s && s.decimals ? s.value.toFixed(s.decimals) : s.value}
                  {s.suffix}
                </div>
                <div className="mt-1 text-xs font-semibold uppercase tracking-wide text-navy-400">
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-navy-100 bg-navy-50/70 p-7">
            <h2 className="text-lg font-extrabold text-navy-800">
              Not sure which you need?
            </h2>
            <p className="mt-2 text-navy-500">
              The free audit tells you where the problem actually is — targeting,
              listing or structure — before you commit to anything. See{" "}
              <Link href="/pricing/" className="font-semibold text-brand-600 underline-offset-4 hover:underline">
                how pricing works
              </Link>
              .
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
