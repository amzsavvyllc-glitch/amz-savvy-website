/**
 * SERVICE PAGES — the commercial layer.
 *
 * The site was rich in informational answers but had no independently rankable
 * pages for commercial-intent queries ("amazon ppc management", "amazon seo
 * agency"). These entries back the /amazon-ppc-management/, /amazon-seo/,
 * /services/ and /pricing/ routes.
 *
 * SAME PROOF RULES as answers.ts and the about page: method and publicly
 * checkable fact only. No invented client results, no fabricated benchmarks,
 * and — per the owner's standing policy — no dollar figures we cannot stand
 * behind. Pricing is scoped per account and funnels to the free audit.
 */

export type ServicePage = {
  slug: string;
  /** Commercial-intent H1 and <title>. */
  title: string;
  /** schema.org Service.serviceType. */
  serviceType: string;
  /** One-line promise under the H1. */
  tagline: string;
  metaDescription: string;
  /** Lead paragraph — the self-contained "what this is" passage. */
  intro: string;
  /** Concrete deliverables. Renders as a checked list and Service hasOfferCatalog. */
  included: { label: string; detail: string }[];
  /** Long-form method sections, same shape as an Answer. */
  sections: { heading: string; body: string[] }[];
  /** Honest qualification, mirroring the homepage fitCheck. */
  fit: { good: string[]; notFor: string[] };
  faqs: { q: string; a: string }[];
  /** Slugs of related answers to cross-link (keeps the info layer feeding the commercial layer). */
  relatedAnswers: string[];
};

export const servicePages: Record<string, ServicePage> = {
  "amazon-ppc-management": {
    slug: "amazon-ppc-management",
    title: "Amazon PPC Management",
    serviceType: "Amazon PPC management",
    tagline: "Cut the wasted spend first, then scale what actually converts.",
    metaDescription:
      "Amazon PPC management by an Amazon Ads Verified Partner: audit-first, bid-to-margin, no Seller Central password and no guaranteed-ACOS promises.",
    intro:
      "Amazon PPC management is the ongoing work of structuring, targeting and bidding your Sponsored Products, Brands and Display campaigns so spend follows profit instead of leaking into searches that never convert. We run it audit-first: the account is read before anything is changed, because roughly a third of what looks like a bidding problem is really a listing problem, and touching bids first destroys the baseline you would have measured against.",
    included: [
      { label: "Campaign structure & segmentation", detail: "Auto/discovery, exact-scale and defensive campaigns kept separate so each has a readable signal." },
      { label: "Search-term harvesting & negation", detail: "Winning terms promoted to exact; wasteful terms negated so your own campaigns stop bidding against each other." },
      { label: "Bid strategy tuned to your margin", detail: "Targets set against your break-even ACOS, not a copied industry number." },
      { label: "Sponsored Products, Brands & Display", detail: "The right mix for your stage — acquisition, brand, and defence/retargeting." },
      { label: "Placement & dayparting adjustments", detail: "Spend shifted toward the placements and times that actually return." },
      { label: "Monthly reporting you can read", detail: "What changed, why, and what it did — in plain language, not a data dump." },
    ],
    sections: [
      {
        heading: "How do you run the account in the first month?",
        body: [
          "Week one is diagnosis, not changes. We pull the Sponsored Products Search Term report, the Business report and the bulk file, and read them before adjusting a single bid. That is where the wasted spend, the missed converters and the listing problems become visible.",
          "Only then do we restructure and start tuning — so every later change is measured against a baseline we actually recorded, instead of one we overwrote on day one.",
        ],
      },
      {
        heading: "What do you optimise against?",
        body: [
          "Your break-even ACOS, which is your profit margin after every Amazon fee and COGS. A 40% ACOS is excellent on a 55% margin and ruinous on a 30% one, so a copied target is meaningless. We work out yours first and set targets below it.",
          "Where a high ACOS is the right call — a launch buying rank, or defending a hero keyword — we decide the window in advance and track organic rank as the return, rather than letting overspend drift.",
        ],
      },
      {
        heading: "What will you not promise?",
        body: [
          "We do not guarantee a rank or a sales number. Nobody controls Amazon's algorithm or a competitor's budget, and an agency that promises either is telling you something it cannot know.",
          "What we commit to is the method, the weekly cadence and the reporting — and that you keep your campaign structure and keyword lists if you ever leave.",
        ],
      },
    ],
    fit: {
      good: [
        "You are spending enough on ads that a few points of ACOS outweigh a management fee.",
        "The weekly maintenance — search-term review, negation, harvesting — simply is not happening in-house.",
        "You want to understand what is being changed and why, not just receive a monthly invoice.",
      ],
      notFor: [
        "You want a guaranteed ACOS or rank in writing — we will not sign that, because it cannot be honestly promised.",
        "The real problem is a listing that does not convert; more ad spend on it multiplies the loss, and we will tell you so before taking the work.",
      ],
    },
    faqs: [
      { q: "Do you need my Seller Central password?", a: "No. The audit runs on three reports you export yourself, and ongoing management uses standard advertising access — never your account password." },
      { q: "What is the minimum ad spend to work with you?", a: "There is no single published floor. Management earns its fee once a few points of ACOS improvement exceed the retainer; below that, in-house or software is often the honest recommendation, and we will say so." },
      { q: "How is it priced?", a: "Per account, because spend and complexity vary too much for a flat menu. The free audit is step one, and the scope and fee follow from what it finds. See the pricing page for how that works." },
      { q: "Do I keep my campaigns if I leave?", a: "Yes. Your campaign structure, keyword lists and negatives are yours. There is no lock-in that holds your account hostage." },
    ],
    relatedAnswers: ["what-is-a-good-acos-on-amazon", "how-to-find-wasted-search-terms", "agency-vs-in-house-vs-ppc-software"],
  },
  "amazon-seo": {
    slug: "amazon-seo",
    title: "Amazon SEO & Listing Optimization",
    serviceType: "Amazon SEO and listing optimization",
    tagline: "Get indexed for the terms that matter, then earn the rank.",
    metaDescription:
      "Amazon SEO and listing optimization: keyword and indexing work, listing copy, backend terms and A+ content, with honest method and no rank guarantees.",
    intro:
      "Amazon SEO decides whether you can rank for a keyword; advertising influences whether you do. If a phrase is nowhere in your title, bullets or backend terms, no budget will make you rank organically for it. The work is indexing and relevance first — keyword research, listing copy, backend terms and A+ content — then the sales velocity and conversion history that turn a ranked listing into a ranking one.",
    included: [
      { label: "Keyword & competitor gap research", detail: "The terms your buyers actually search, and the ones competitors rank for that you are missing." },
      { label: "Listing copy & backend terms", detail: "Title, bullets and backend search terms written for both the shopper and the index." },
      { label: "A+ content structure", detail: "Modules that lift conversion, which in turn strengthens organic rank." },
      { label: "Indexing checks", detail: "Confirming your listing is actually indexed for priority phrases before any campaign chases them." },
      { label: "Rank tracking", detail: "Position tracked over time on the keywords that matter, not a vanity list." },
    ],
    sections: [
      {
        heading: "Why does indexing come before everything else?",
        body: [
          "Indexing is binary and it is the precondition for ranking. Sellers routinely spend months trying to rank for a phrase their listing does not contain anywhere. The first job is to confirm you are indexed for your priority terms — in the marketplace you are targeting, since indexing differs per marketplace.",
          "Only once a term is indexed does the rest of the work — relevance, conversion rate, velocity — have anything to act on.",
        ],
      },
      {
        heading: "How does conversion rate fit into SEO?",
        body: [
          "Conversion rate is the shared lever: it lowers ACOS on every keyword and strengthens your organic position for the terms you convert on. It is the one change that works on both the paid and organic sides at once, which is why listing quality is treated as an SEO input, not a separate project.",
          "That is also why price, main image, review count and rating get looked at alongside the copy — they move conversion, and conversion moves rank.",
        ],
      },
      {
        heading: "What can SEO not do on its own?",
        body: [
          "SEO cannot manufacture velocity. A perfectly optimised listing with no sales history will not overtake an established competitor on a competitive head term by wording alone — that is where advertising contributes the evidence Amazon uses.",
          "So the listing work and the advertising are sequenced, not treated as alternatives: get indexed and relevant first, then use PPC to build the velocity that earns the organic position.",
        ],
      },
    ],
    fit: {
      good: [
        "Your listings are under-indexed or thin, and you want the foundation right before scaling ads.",
        "You are launching or relaunching and need the copy and backend terms built properly from the start.",
        "You want ranking treated as listing-plus-advertising, not a one-off copy rewrite.",
      ],
      notFor: [
        "You want a guaranteed page-one rank — no honest agency can commit to that.",
        "You expect wording changes alone to beat a far stronger competitor with more reviews and better velocity.",
      ],
    },
    faqs: [
      { q: "How do I check if my listing is indexed for a keyword?", a: "Search Amazon for the exact keyword followed by your ASIN. If your product appears, you are indexed for that phrase; if nothing comes back, you are not, and advertising will not make you rank organically for it." },
      { q: "Is Amazon SEO separate from PPC?", a: "They are not alternatives. SEO decides whether you can rank; PPC contributes the velocity and conversion history that decide whether you do. The listing work comes first." },
      { q: "How is it priced?", a: "Per account and scope, funneling through the free audit — the same custom-scope model as our PPC work. See the pricing page." },
    ],
    relatedAnswers: ["how-to-check-keyword-indexing", "amazon-seo-vs-ppc-for-ranking", "how-amazon-ranking-works"],
  },
};

export const servicePageList = Object.values(servicePages);
