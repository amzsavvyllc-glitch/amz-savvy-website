import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/convert";
import { CtaButton } from "@/components/site/primitives";
import { answers } from "@/lib/answers";

/* The root layout sets robots index:true and canonical:"/". Without these
   overrides a 404 shipped both, so every dead URL declared itself indexable
   and canonical to the homepage. */
export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
  alternates: {},
};

export default function NotFound() {
  // A rotted inbound link is still a visitor — give them somewhere to go.
  const suggestions = answers.slice(0, 5);

  return (
    <>
      <Header />
      <main className="flex flex-1 items-center bg-navy-900 py-32 text-white">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-40" />
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <p className="font-heading text-7xl font-extrabold text-brand-500/40">404</p>
          <h1 className="mt-4 text-balance text-3xl font-extrabold sm:text-4xl">
            That page doesn&apos;t exist
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-navy-200">
            The link may be out of date. Everything below still works.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <CtaButton href="/">
              Back to the homepage
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </CtaButton>
            <CtaButton href="/answers/" variant="ghost">
              Browse the answers library
            </CtaButton>
          </div>

          <div className="mt-12 border-t border-white/10 pt-8">
            <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-brand-400">
              Popular answers
            </h2>
            <ul className="mt-4 space-y-2.5">
              {suggestions.map((a) => (
                <li key={a.slug}>
                  <Link
                    href={`/answers/${a.slug}/`}
                    className="group flex items-start gap-2.5 text-navy-200 transition-colors hover:text-white"
                  >
                    <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-brand-500 transition-transform group-hover:translate-x-0.5" />
                    {a.question}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
