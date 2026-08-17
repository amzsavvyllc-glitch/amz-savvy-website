/**
 * BLOG — timely writing about Amazon advertising.
 *
 * Distinct from the answers library on purpose. `answers` covers durable
 * questions that stay true for years; the blog covers what changed, when, and
 * what a seller should do about it. Mixing the two would rot the answers.
 *
 * HONESTY RULE, inherited from answers.ts and non-negotiable here because this
 * is the section most likely to drift: every factual claim about Amazon — a
 * feature launch, a policy change, a fee — needs a real source in `sources`.
 * No invented client results, no fabricated benchmarks, and never a confident
 * date or number that could not be verified. A wrong claim about Amazon
 * published on an Amazon agency's own site costs more credibility than staying
 * quiet would have.
 *
 * Posts are ordered newest-first by `date`; the index and sitemap both sort on
 * it, so simply pushing an entry is enough.
 */

export type Post = {
  slug: string;
  title: string;
  /** One or two sentences, self-contained. Used as the meta description, the
   *  card summary, and the passage an AI is most likely to quote. */
  excerpt: string;
  /** ISO date, YYYY-MM-DD. Sorting and schema both depend on it. */
  date: string;
  category: "Advertising" | "SEO" | "Strategy" | "News";
  /** Rough minutes; shown on the card so a reader can judge the commitment. */
  readMinutes: number;
  sections: { heading: string; body: string[] }[];
  /** Where the factual claims came from. Rendered publicly — that is the point. */
  sources?: { label: string; url: string }[];
  /** Slugs from the answers library that go deeper on a term used here. */
  related?: string[];
};

export const postCategories = [
  "Advertising",
  "SEO",
  "Strategy",
  "News",
] as const;

const allPosts: Post[] = [
  {
    slug: "amazon-ppc-audit-checklist",
    title: "The Amazon PPC audit we run before touching a single bid",
    excerpt:
      "Before changing anything in an Amazon account we run the same five-step audit, and it uses three exported reports rather than account access. This is the full checklist, in the order we work it, so you can run it yourself this week.",
    date: "2026-08-17",
    category: "Advertising",
    readMinutes: 7,
    sections: [
      {
        heading: "Why an audit comes before any optimisation",
        body: [
          "The instinct when ACOS is high is to cut bids. It is almost always the wrong first move, because it treats a symptom that has at least four different causes — wasted spend on non-converting terms, a listing that does not convert the traffic it already gets, a structural problem where campaigns compete with each other, and genuine bid inflation. Cutting bids only helps the fourth.",
          "An audit exists to tell you which of the four you actually have. It takes a couple of hours and costs nothing, and it stops you spending three months fixing the wrong thing.",
          "None of what follows needs Seller Central access or a password. Three exported reports contain everything.",
        ],
      },
      {
        heading: "Step 1 — Pull the three reports",
        body: [
          "The Search Term report, from the advertising console, over at least 60 days. Shorter windows do not accumulate enough clicks per term for the zero-order test in step two to mean anything.",
          "The Business report, per ASIN, over the same window. This gives sessions, unit session percentage (your conversion rate) and total sales — the denominators for everything else.",
          "The Bulk file, over 60 days. It carries campaign structure, bids, budgets and placement modifiers in one sheet, which is the only practical way to see structure rather than guess at it.",
        ],
      },
      {
        heading: "Step 2 — Tag every search term by orders, not by clicks",
        body: [
          "Sort the Search Term report by spend, descending. Then add one column: did this term produce any orders at all in the window?",
          "Terms with meaningful spend and zero orders are the wasted-spend pile. What counts as meaningful depends on your conversion rate: if you convert at 10%, a term with 30 clicks and no orders is a genuine signal; at 2%, thirty clicks tells you almost nothing and you need closer to 100 before judging.",
          "This one column typically accounts for the majority of the recoverable money in an account. It is unglamorous and it is where the value is.",
        ],
      },
      {
        heading: "Step 3 — Check the listing before you blame the ads",
        body: [
          "Take unit session percentage from the Business report. If it is materially below what your category sustains, more traffic will not fix the account — it will cost more and convert at the same poor rate.",
          "Paying to send buyers to a page that does not convert is the most expensive mistake in an Amazon account, and it is invisible if you only ever look at advertising dashboards. The ad reports look like a bidding problem; the Business report shows it is not.",
          "If conversion is the bottleneck, the fix order is title and images first, then bullets and A+ content, then bids. Not the reverse.",
        ],
      },
      {
        heading: "Step 4 — Find your real break-even ACOS",
        body: [
          "Break-even ACOS equals your profit margin after all Amazon fees and cost of goods, before ad spend. If the margin is 32%, then a 32% ACOS breaks even, below it is profit and above it is a deliberate purchase of rank or volume.",
          "Every target in the account should be set against that number and no other. Industry-average ACOS figures mix sellers with 60% margins and sellers with 12% margins, so copying one means copying a cost structure you do not have.",
          "Write the number down before looking at any campaign. Deciding the target after seeing current performance is how a bad ACOS quietly becomes the new normal.",
        ],
      },
      {
        heading: "Step 5 — Read the structure from the bulk file",
        body: [
          "Look for the same keyword running in several campaigns at different bids. That is you bidding against yourself, and it inflates cost per click with no benefit.",
          "Look for automatic campaigns that were never harvested — terms that have proven themselves but still sit in auto, where you cannot control the bid.",
          "Look for budget caps on campaigns that are profitable and hitting them daily, which is capped growth, and for uncapped budget on campaigns that have never returned their spend.",
        ],
      },
      {
        heading: "What to do with the output",
        body: [
          "You should now have four things: a wasted-spend figure, a verdict on whether the listing or the ads are the bottleneck, a break-even ACOS, and a list of structural faults. That combination tells you what to do first, and roughly what it is worth.",
          "Work it in money order, biggest first. Negating dead terms is usually the fastest measurable win because it is pure subtraction — no new spend, no waiting for data.",
          "If you would rather have this run on your own account with your numbers, that is exactly what our free audit is, and it needs the same three reports and no password.",
        ],
      },
    ],
    related: [
      "what-reports-for-ppc-audit",
      "how-to-calculate-break-even-acos",
      "how-to-find-wasted-search-terms",
    ],
  },
];

/** Newest first. The index page, the sitemap and the homepage teaser all rely
 *  on this order, so sort here once rather than at every call site. */
export const posts: Post[] = [...allPosts].sort((a, b) =>
  b.date.localeCompare(a.date),
);

export function postBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
