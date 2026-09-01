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
  /** Card thumbnail and article hero. Every word in the image also appears as
   *  real text on the page — the image supports the post, it never carries
   *  information alone (accessibility, and AI engines read text not pixels). */
  image?: { src: string; alt: string; width: number; height: number };
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
    image: {
      src: "/blog/amazon-75-character-title-item-highlights.png",
      alt: "Amazon cut product titles to 75 characters — check which title is live on your ASINs right now.",
      width: 1400,
      height: 689,
    },
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
    image: {
      src: "/blog/amazon-ppc-audit-checklist.png",
      alt: "The Amazon PPC audit we run before touching a single bid: five steps, three reports, no account access.",
      width: 1400,
      height: 689,
    },
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
  {
    slug: "amazon-ad-billing-proceeds-deduction-who-it-hit",
    title: "Amazon's ad billing change: who it actually hit, and the option nobody mentions",
    excerpt:
      "Amazon's switch from credit-card ad billing to deduction from retail proceeds took effect on 1 August 2026, and most of the coverage got the scope wrong. It applied to a subset of advertisers Amazon contacted directly, not to everyone — and there is a second option, Pay by Invoice on Net 30, that is arguably better than the credit card it replaced.",
    date: "2026-08-24",
    category: "Advertising",
    readMinutes: 6,
    image: {
      src: "/blog/amazon-ad-billing-proceeds-deduction-who-it-hit.png",
      alt: "Amazon's ad billing change and who it actually hit — a subset of advertisers Amazon contacted, not everyone.",
      width: 1400,
      height: 689,
    },
    sections: [
      {
        heading: "What changed, in order",
        body: [
          "In early April 2026 a group of Amazon advertisers received an email saying that from 15 April, the cost of Sponsored Products, Sponsored Brands and Sponsored Display would be deducted from their retail proceeds before disbursement, rather than charged to a credit card. There was no public announcement. Sellers found out because it landed in their inbox, and then because other sellers posted screenshots of it.",
          "The reaction was strong enough to be organised. Merchants in the private seller group Million Dollar Sellers coordinated a protest, with some calling for ads to be switched off on 15 April, the original implementation date. Co-founder Eugene Khayman's complaint was about accumulation rather than this change alone: Amazon had, he said, \"essentially rolled out three fees within a month.\"",
          "On 14 April — a day after the original deadline had already taken effect for some accounts — Amazon deferred it. The wording was: \"Based on feedback we heard, we're deferring this change until August 1, 2026 to give this group of advertisers more time to prepare.\" That deadline has now passed.",
        ],
      },
      {
        heading: "The part most coverage got wrong",
        body: [
          "Read the trade write-ups and you would conclude that every Amazon advertiser was moved onto proceeds deduction on 1 August. That is not what Amazon said. The announcement stated the update applies only to the small group of advertisers who had been contacted directly — those still using a credit card as their primary payment method — and noted that the overwhelming majority of advertisers were already on account balance deduction and were unaffected.",
          "Amazon's own wording, quoted in the coverage, was that it \"commonly review[s] advertiser payment methods as part of our normal course of business\", and that \"notified advertisers continue to have credit or debit cards as a backup payment method and also have the option to pay by invoice\". Two things follow from that sentence: you had to have been notified, and the card never went away entirely.",
          "If you never received the email, nothing changed for you. If you are not sure, the payment settings in your advertising console will tell you in under a minute, and that is a better use of the next sixty seconds than reading another article about it.",
          "This distinction matters because the panic version of the story caused sellers who were never in scope to go looking for financing they did not need.",
        ],
      },
      {
        heading: "There are two options, not one",
        body: [
          "Advertisers in scope had a choice: deduction from the account balance, or Pay by Invoice with Net 30 terms running from month-end. Anyone who did not choose before 1 August was migrated to balance deduction by default, with their existing payment method retained as a backup for when the balance runs short.",
          "The default is the worse of the two for most sellers, and the deadline for choosing has passed — but a payment preference is a setting, not a one-time door. It is worth checking which one you are on now.",
          "Net 30 from month-end is genuinely better than a credit card for cash-flow purposes. Spend on 2 September is not due until the end of October. That is a longer float than most card cycles give you, and it does not consume card limit or accrue interest.",
        ],
      },
      {
        heading: "The arithmetic to run on your own account",
        body: [
          "The cash-flow effect of proceeds deduction is not the ad spend itself — you were always paying that. It is the change in when the money leaves. Under card billing you spent, then paid the card on its own cycle. Under proceeds deduction the spend comes out before the disbursement reaches you.",
          "Work it out with your own numbers rather than a rule of thumb: take your average daily ad spend, multiply by the number of days between a charge and when you would previously have settled it, and that product is the working capital that quietly leaves your business once. It is a one-off transition cost, not a recurring one, which is why the effect is sharpest in the first disbursement cycle and then normalises.",
          "The reason this hurts unevenly is inventory timing. A seller placing a large purchase order in the same fortnight as the transition feels it; a seller with slack in the account barely notices. That is why the same change produced both genuine distress and shrugs, and neither reaction was wrong.",
        ],
      },
      {
        heading: "What to do this week",
        body: [
          "Check which payment method your advertising account is actually on. Do this even if you believe you were never in scope, because the default migration was automatic and silent.",
          "If you are on balance deduction and your cash position is tight, look at whether Pay by Invoice is available to you. If it is, the Net 30 terms are free working capital and there is no reason not to take them.",
          "Then stop thinking about it. This was a change in payment timing, not in advertising economics. Nothing about it makes a wasteful campaign more wasteful or a profitable one less profitable, and the accounts that suffered most were the ones already running with no margin for a single cycle of timing change. That is a cash-flow problem the billing change revealed rather than caused.",
        ],
      },
    ],
    sources: [
      {
        label: "PPC Land — Amazon Ads delays advertiser payment overhaul to August after pushback",
        url: "https://ppc.land/amazon-ads-delays-advertiser-payment-overhaul-to-august-after-pushback/",
      },
      {
        label: "PPC Land — Amazon's payment change: ad costs to auto-deduct from seller proceeds April 15",
        url: "https://ppc.land/amazons-payment-grab-ad-costs-to-auto-deduct-from-seller-proceeds-april-15/",
      },
      {
        label: "EcommerceBytes — Amazon delays change that would contribute to seller cashflow crunch",
        url: "https://www.ecommercebytes.com/2026/04/16/amazon-delays-change-that-would-contribute-to-seller-cashflow-crunch/",
      },
      {
        label: "Modern Retail — Amazon hits pause on controversial advertising payment change",
        url: "https://www.modernretail.co/operations/amazon-hits-pause-on-controversial-change-to-its-advertising-payment-system-that-had-caused-a-seller-revolt/",
      },
    ],
    related: [
      "how-much-to-spend-on-amazon-ads",
      "how-to-calculate-break-even-acos",
      "what-reports-for-ppc-audit",
    ],
  },
  {
    slug: "sponsored-products-off-amazon-creator-placements",
    title:
      "Your Sponsored Products ads now run off Amazon — and two of your bid controls do not follow them",
    excerpt:
      "Amazon's own help page confirms Sponsored Products campaigns extend to creators, apps and conversational surfaces off Amazon. The part worth your attention: Top of Search and Product Page bid adjustments do not apply there.",
    date: "2026-09-01",
    category: "News",
    readMinutes: 6,
    image: {
      src: "/blog/sponsored-products-off-amazon-creator-placements.png",
      alt: "Sponsored Products ads now run off Amazon, and two of your bid controls do not follow them.",
      width: 1400,
      height: 689,
    },
    sections: [
      {
        heading: "What Amazon's own page says",
        body: [
          "Amazon's help article on off-Amazon advertising, updated on 27 August 2026, states that \"Your Sponsored Products campaigns extend beyond Amazon to premium sites, apps, conversational experiences, and Amazon creators (influencers and publishers)\", and that Amazon uses \"your existing targeting, bid, and budget settings to place your ads where they're most relevant\".",
          "Availability, in Amazon's words, covers advertisers in Brazil, Canada, India, Mexico, the Middle East, North Africa, Türkiye and the United States. If you advertise only in a European marketplace, this does not currently apply to you.",
          "Several trade outlets report the rollout began on 10 August 2026 and that advertisers were enrolled without needing to act. We could not find that date on any Amazon-hosted page — the notice appears to have gone out as an in-console notification — so treat the date as trade reporting rather than an Amazon-confirmed fact. The mechanism itself is documented by Amazon; the start date is not.",
        ],
      },
      {
        heading: "The detail that actually changes how you bid",
        body: [
          "Amazon states plainly that \"Bid adjustments for Top of Search and Product Pages don't apply to off-Amazon placements. However, dynamic bidding and other bidding strategies will apply for off-Amazon placements.\"",
          "That is the sentence to sit with. If your account leans on a large Top of Search modifier to win the placements you care about, that lever simply is not operating on this inventory — while your dynamic bidding rules still are. The result is a slice of spend being bid in a way you did not specifically design, inside campaigns whose settings you did design carefully.",
          "It does not make the placement bad. It makes it unmeasured until you go and look, which is a different problem and a fixable one.",
        ],
      },
      {
        heading: "Where your search terms come from when there is no search",
        body: [
          "A social feed or an article has no query behind it, so Amazon supplies one. Per the same help page: \"When your ad appears in off-Amazon placements that have no search context (such as social sites), we will infer and provide a search term with customer context that best matches your advertised product. These keywords will qualify for negative targeting.\"",
          "Two practical consequences. First, terms you did not choose will appear in your Search Term report, and they are inferred rather than typed by a shopper. Second — and this is the useful half — they can be negated like any other term, so the normal harvesting and negation discipline still works here.",
          "Amazon also notes that \"Text ads may include AI generated content using your product and landing page\". If your listing copy is thin or off-message, that is now the raw material for an ad creative you did not write.",
        ],
      },
      {
        heading: "What to do this week",
        body: [
          "Pull the Sponsored Products Placement Report and look at the off-Amazon rows against your on-Amazon rows: spend, clicks, orders and ACOS, judged against your break-even rather than against a general benchmark. Advertising API users can read the same split through the Placement Classification metric. Until you have that comparison you are guessing, in either direction.",
          "Then review your Search Term report for terms you never targeted, and negate the ones that are clearly wrong for the product — the same rule you already apply on Amazon.",
          "If you decide the inventory is not for you, the control is at campaign level under \"Choose where your ads appear\": \"Increase reach off Amazon\" is the default, and \"Limit reach to Amazon\" keeps ads on Amazon-owned properties only. Worth noting because several write-ups of this change name that second setting \"Limit off-Amazon spend\", which is not what Amazon's current page calls it.",
        ],
      },
      {
        heading: "Our read",
        body: [
          "New inventory is not automatically good or bad; it is untested. The reasonable posture is to leave it running long enough to produce a readable signal, measure it separately in the placement report, and decide on your own numbers — rather than opting out on reflex or leaving it unexamined because the campaigns look unchanged in the console.",
          "The one thing we would not do is nothing at all. A placement that ignores two of your bid modifiers and generates its own search terms deserves a look at the report, even if the answer turns out to be that it is performing fine.",
        ],
      },
    ],
    sources: [
      {
        label:
          "Amazon Ads — Understand Sponsored Products off-Amazon advertising (updated 27 Aug 2026)",
        url: "https://advertising.amazon.com/help/GYTD2Z3SYMAAMVXA",
      },
      {
        label:
          "PPC Land — Amazon Sponsored Products campaigns gain creator placements (trade reporting for the 10 Aug date)",
        url: "https://ppc.land/amazon-sponsored-products-campaigns-gain-creator-placements-on-august-10/",
      },
    ],
    related: [
      "what-are-amazon-sponsored-listings",
      "how-to-find-wasted-search-terms",
      "what-is-a-placement-modifier",
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
