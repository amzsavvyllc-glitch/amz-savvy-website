import Link from "next/link";
import { BadgeCheck } from "lucide-react";
import { founder, stats, reviewSource } from "@/lib/site-config";

/**
 * AUTHOR BOX — the human behind the advice.
 *
 * Every page in the answers library and the blog is expert commentary on
 * someone's advertising budget, and until now all of it was published with no
 * named author at all. That is a weak signal twice over: Google's guidance on
 * experience and expertise expects a demonstrable practitioner behind advice
 * like this, and AI answer engines attribute to named people far more readily
 * than to a bare domain.
 *
 * Everything shown here is owner-confirmed and checkable from outside — the
 * partner status against Amazon's own directory listing, the numbers against
 * `stats`, the rating against the public Fiverr profile. Nothing is asserted
 * here that could not be verified by a reader who wanted to.
 */
export function AuthorBox() {
  const spend = stats.find((s) => s.label === "Ad spend managed");
  const years = stats.find((s) => s.label === "Years on Amazon");

  return (
    <aside className="mt-14 rounded-2xl border border-navy-100 bg-white p-7">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <span className="text-xs font-bold uppercase tracking-[0.16em] text-brand-600">
          Written by
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-700">
          <BadgeCheck className="h-3.5 w-3.5" />
          Amazon Ads Verified Partner
        </span>
      </div>

      <h2 className="mt-3 text-lg font-extrabold text-navy-800">
        {founder.name}
        <span className="ml-2 text-sm font-semibold text-navy-400">
          {founder.jobTitle}, AMZ Savvy
        </span>
      </h2>

      {founder.bio.map((p, i) => (
        <p key={i} className="mt-3 text-sm leading-relaxed text-navy-600">
          {p}
        </p>
      ))}

      <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-navy-500">
        {years ? (
          <span>
            <strong className="text-navy-800">{years.value} years</strong> on Amazon
          </span>
        ) : null}
        {spend ? (
          <span>
            <strong className="text-navy-800">
              {spend.prefix}
              {spend.value}
              {spend.suffix}
            </strong>{" "}
            ad spend managed
          </span>
        ) : null}
        <a
          href={reviewSource.url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-brand-600 underline-offset-4 hover:underline"
        >
          {reviewSource.rating}★ from {reviewSource.count} reviews on{" "}
          {reviewSource.platform}
        </a>
      </div>

      <Link
        href="/about/"
        className="mt-5 inline-block text-sm font-semibold text-brand-600 underline-offset-4 hover:underline"
      >
        More about AMZ Savvy and how we work →
      </Link>
    </aside>
  );
}

/** Compact one-line byline for the title band. */
export function Byline({ className = "" }: { className?: string }) {
  return (
    <span className={className}>
      By{" "}
      <Link href="/about/" className="font-semibold underline-offset-4 hover:underline">
        {founder.name}
      </Link>
    </span>
  );
}
