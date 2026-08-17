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
    slug: "amazon-75-character-title-item-highlights",
    title:
      "Amazon cut titles to 75 characters. Go and read what its AI put in the other 125.",
    excerpt:
      "Since 27 July 2026 Amazon product titles are capped at 75 characters, with a new 125-character Item Highlights field carrying the overflow. Amazon has been generating the split for non-compliant listings itself, and brand owners get only 14 days to review a suggestion before it publishes — so the urgent job is not rewriting your title, it is checking which version is live right now.",
    date: "2026-08-17",
    category: "News",
    readMinutes: 7,
    sections: [
      {
        heading: "What actually changed",
        body: [
          "Amazon has split the product title into two fields. The item name is now capped at 75 characters including spaces, and a new field called Item Highlights holds up to 125 more. Amazon's own framing is that the total content budget is unchanged at 200 characters, only now divided across two boxes instead of one. Media categories — books, music, video — are outside the rule.",
          "The second field is not a hidden attribute like backend search terms. From 10 August 2026 Item Highlights displays beneath the item name on both desktop and mobile, in search results and on the detail page. Shoppers see it, which means it is doing merchandising work as well as indexing work, and the two jobs do not always want the same words.",
          "On the question every seller asked first, Amazon has been unusually direct. In its answers thread on the seller forums it states that item name and Item Highlights are “both inputs for search, and one isn't prioritized over the other.” Take that at face value: content moved into the new field is still indexed. It is not a demotion to a dead zone.",
        ],
      },
      {
        heading: "The part that is actually urgent",
        body: [
          "Amazon did not simply wait for sellers to comply. For listings over the limit it began generating its own AI-written split, and brand owners get 14 days in the Review Listing Changes tool to review, modify or approve that suggestion before it goes live. If nobody opens the tool, the suggestion publishes on its own.",
          "That is the whole reason this post is worth your Monday morning. The deadline that matters is not a policy date you can look up — it is a rolling 14-day clock that started on a different day for every ASIN you own, and for a lot of accounts it has already run out. The title on your live detail page may no longer be the title you wrote, and nothing in your ad reports will announce that.",
          "So the first action is not rewriting anything. It is reading. Pull your current live titles and compare them against what you believe they say. Anywhere the two differ, an AI made a keyword decision on your behalf.",
        ],
      },
      {
        heading: "Do not trust the calendar, and do not panic about it either",
        body: [
          "The dates in circulation do not agree. Amazon's forum posts put the start of recommendations at 27 July 2026, while trade coverage has variously reported an original date of 26 July and a revised start of 3 August. We are not going to publish a single hard cutover date, because the sources genuinely conflict and because Amazon itself has said the date is not the point.",
          "Amazon's moderator described 27 July as “the kick-off date, not a hard deadline,” with changes phased in progressively through the year rather than enforced overnight. It also confirmed that listings over the limit “will remain active, editable, and searchable, even if they haven't been updated yet.”",
          "Read those two statements together and the practical position is clear. Nothing gets suppressed for being long, so there is no emergency. But the rewrites are already happening in the background across 2026, so there is no reason to wait either. The risk is not a penalty; the risk is drift you never noticed.",
        ],
      },
      {
        heading: "The one failure mode worth hunting: split phrases",
        body: [
          "Amazon's position is that relevancy does not change when a title is simply divided across the two fields. The failure mode is not the format — it is what an automated rewrite does to multi-word phrases when it decides where to cut.",
          "If shoppers search stainless steel coffee grinder and the rewrite leaves stainless steel in the item name while pushing coffee grinder into Item Highlights, both fragments are still indexed, but the intact phrase no longer sits in one place. Whether Amazon's matching treats that identically is precisely what has not been confirmed. This is the single highest-value thing to check, because it is invisible: nothing errors, nothing gets flagged, the listing simply competes slightly differently.",
          "So work through your top ASINs and list the exact phrases you actually rank for and bid on. Then look at where each one now physically sits. Any phrase broken across the boundary is your priority fix, and the fix is to pull it back together inside the 75 characters even if that means evicting something else.",
        ],
      },
      {
        heading: "How to spend the 75 characters",
        body: [
          "Treat the item name as the field with the least room and the most scrutiny, and fill it in strict priority order: brand, then the core product noun a shopper would actually type, then the one or two attributes that distinguish this variation — colour, size, pack count — then whatever high-value phrase still fits intact. Amazon recommends keeping the brand name inside the 75.",
          "Item Highlights then takes what genuinely reads as supporting detail: materials, compatibility, use cases, secondary phrases. Because it renders under the title for shoppers, write it in readable fragments rather than a keyword dump — short attribute phrases separated by a visible divider work well, and they survive being read by a human on a phone.",
          "One constraint to know before you plan: Item Highlights is generally only displayed when the title is inside the 75-character limit. Staying long does not preserve your old title and win you the new field as a bonus. It costs you the new field.",
        ],
      },
      {
        heading: "What to do this week",
        body: [
          "Open Review Listing Changes and clear the queue of pending AI suggestions before their windows expire — that is the only step with a clock on it. Then export your live titles and diff them against your intended copy, so you know which ASINs have already been rewritten and which are still yours.",
          "For every ASIN that changed, check your priority phrases for splits, rebuild the 75 characters by hand where a phrase was broken, and move the remainder into Item Highlights deliberately. Then confirm the phrases you moved are still indexed rather than assuming it, and watch organic rank on those terms for a couple of weeks — a rank drop that starts the week your title silently changed is not a coincidence.",
          "Finally, a note on scope: this applies to Amazon's own listings too, according to a moderator responding to that exact question. This is a catalogue-wide format change, not a seller compliance crackdown. Handle it as housekeeping with a deadline attached, and the main thing you are buying is control over your own copy rather than accepting a machine's guess at it.",
        ],
      },
    ],
    sources: [
      {
        label:
          "Amazon Seller Forums — Answers to your product title update questions",
        url: "https://sellercentral.amazon.com/seller-forums/discussions/t/302aaac6-6f2b-4d86-bcd2-36fe24f0e6cd",
      },
      {
        label: "Amazon Seller Forums — New title requirements and fields",
        url: "https://sellercentral.amazon.com/seller-forums/discussions/t/878dffcd-ed3f-4570-88c8-497e547e825a",
      },
      {
        label:
          "Amalytix — Optimising Amazon product titles: 75 characters and item highlights",
        url: "https://www.amalytix.com/en/knowledge/seo/amazon-product-title/",
      },
      {
        label:
          "Helium 10 — How to split your title into item name and item highlights",
        url: "https://www.helium10.com/blog/amazon-title-requirements-how-to-split-your-title-into-item-name-and-item-highlights-without-losing-rankings/",
      },
      {
        label:
          "EcommerceBytes — Amazon's new product title policy also applies to its listings",
        url: "https://www.ecommercebytes.com/2026/08/07/amazons-new-product-title-policy-also-applies-to-its-listings/",
      },
      {
        label: "AMZScaler — Item Highlights: confirmed facts vs the guesses",
        url: "https://amzscaler.com/amazon-item-highlights-field/",
      },
    ],
    related: [
      "how-to-check-keyword-indexing",
      "sudden-organic-rank-drop",
      "how-amazon-ranking-works",
    ],
  },
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
