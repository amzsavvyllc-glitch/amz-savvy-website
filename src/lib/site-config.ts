/**
 * SINGLE SOURCE OF TRUTH for all site content.
 *
 * ⚠️  PLACEHOLDER = invented number/name. Every one is tagged with `placeholder: true`
 *     so you can find and swap them. Search this file for "placeholder: true".
 */

export const site = {
  name: "AMZ Savvy",
  tagline: "Strategies | Optimize | Maximize ads",
  domain: "amzsavvy.com",
  email: "amzsavvy.llc@gmail.com",
  whatsapp: "97455401403", // wa.me number — digits only, no +
  calendly: "https://calendly.com/amzsavvy/30min",
} as const;

export const nav = [
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Results", href: "#results" },
  { label: "Calculator", href: "#calculator" },
  { label: "FAQ", href: "#faq" },
] as const;

/** Hero + trust band stats. Confirmed accurate by the owner 2026-07-30. */
export const stats = [
  { value: 8, prefix: "$", suffix: "M+", label: "Ad spend managed" },
  { value: 120, prefix: "", suffix: "+", label: "Brands scaled" },
  { value: 4.6, prefix: "", suffix: "x", label: "Average ROAS", decimals: 1 },
  { value: 9, prefix: "", suffix: "", label: "Years on Amazon" },
] as const;

export const services = [
  {
    icon: "Search",
    title: "Amazon SEO",
    tagline: "Get found by buyers who are ready to buy.",
    points: [
      "Keyword & competitor gap research",
      "Listing copy, backend terms, A+ content",
      "Indexing and rank tracking",
    ],
  },
  {
    icon: "Target",
    title: "PPC Management",
    tagline: "Cut wasted spend, scale what converts.",
    points: [
      "Sponsored Products, Brands & Display",
      "Search-term harvesting & negation",
      "Bid strategy tuned to your margin",
    ],
  },
  {
    icon: "Rocket",
    title: "Product Launches",
    tagline: "Momentum from day one, not month six.",
    points: [
      "Pre-launch keyword & pricing plan",
      "Launch ad structure & budget ramp",
      "Review velocity and honeymoon capture",
    ],
  },
  {
    icon: "TrendingUp",
    title: "Ranking & Growth",
    tagline: "Hold page one and defend it.",
    points: [
      "Rank campaigns for priority keywords",
      "Brand defense against competitors",
      "Monthly reporting you can actually read",
    ],
  },
] as const;

export const process = [
  {
    step: "01",
    title: "Audit",
    body: "We pull your Search Term, Business, and Bulk reports and show you exactly where money is leaking — before you pay us anything.",
  },
  {
    step: "02",
    title: "Plan",
    body: "You get a written plan: which keywords to own, which campaigns to kill, what your target ACOS should actually be at your margin.",
  },
  {
    step: "03",
    title: "Execute",
    body: "We restructure campaigns, rewrite listings, and set bid rules. You approve everything before it goes live.",
  },
  {
    step: "04",
    title: "Scale",
    body: "Weekly optimization and a monthly report in plain English. We scale spend only where it returns.",
  },
] as const;

/**
 * PLAYBOOKS — what we actually do, by account situation.
 *
 * These describe METHOD, not client outcomes. No brand names, no invented
 * clients, no numbers presented as achieved results. Every figure here is
 * explicitly framed as "what we target" or "what the maths does", which the
 * visitor can check themselves in the calculator above.
 *
 * When real, permissioned client results exist, this section can become a
 * proper case-study block — see README.
 */
export const playbooks = [
  {
    category: "ACOS too high",
    headline: "The spend is not too big. It is pointed at the wrong keywords.",
    body: "Most accounts we open have 60–80% of spend on terms that have never converted. We pull your Search Term report, negate the dead weight, and rebuild around the handful of keywords that actually produce orders.",
    steps: [
      "Search Term report → tag every term by orders, not clicks",
      "Negate zero-order terms above your click threshold",
      "Promote proven converters into exact-match campaigns",
      "Reset bids against your true break-even ACOS",
    ],
  },
  {
    category: "Sales flat",
    headline: "You are capped by the listing, not the budget.",
    body: "If conversion rate is the bottleneck, more traffic just costs more. We check the listing before we touch a bid — because paying to send buyers to a page that does not convert is the most expensive mistake in the account.",
    steps: [
      "Conversion rate benchmarked against your category",
      "Title, bullets and backend rebuilt around ranking terms",
      "Image stack and A+ reviewed for the actual objection",
      "Only then scale the campaigns that already work",
    ],
  },
  {
    category: "Losing rank",
    headline: "Organic position is defended, not bought once.",
    body: "Rank decays the moment a competitor outbids you on your own terms. We separate defense from growth so your hero keywords keep their position while new terms get their own budget.",
    steps: [
      "Identify the terms carrying your organic sales",
      "Brand-defense campaigns on your own name and ASINs",
      "Staged rank push on priority keywords",
      "Weekly tracking so slippage is caught in days, not months",
    ],
  },
] as const;

/**
 * Who this is and is not for. Replaces the testimonial block.
 *
 * Self-qualification converts better than praise a visitor cannot verify —
 * and unlike testimonials, every line here is a statement AMZ Savvy can stand
 * behind without needing a third party to vouch for it.
 */
export const fitCheck = {
  good: [
    "You are already spending on Amazon ads and suspect some of it is wasted",
    "You sell on at least one marketplace and have 90 days of data",
    "You want to understand the decisions, not just receive a dashboard",
    "Your margin can support paid traffic once ACOS is under control",
  ],
  bad: [
    "You want guaranteed rank or a fixed sales number in writing",
    "You are pre-launch with no product live yet",
    "You need someone to run black-hat tactics or manipulate reviews",
    "You want the cheapest possible retainer above all else",
  ],
} as const;

export const faqs = [
  {
    q: "What does it cost?",
    a: "It depends on your ad spend and how much of the work you want us to own. Most brands land between a flat monthly retainer and a retainer plus a performance share. You'll get an exact number on the strategy call — no proposal theatre, no hidden setup fee.",
  },
  {
    q: "How fast will I see results?",
    a: "Wasted-spend cuts usually show up in the first 2–3 weeks because that's just switching off what's losing money. Rank and organic gains take longer — plan on 60–90 days for a meaningful move.",
  },
  {
    q: "I'm already with another agency. Is switching a nightmare?",
    a: "No. We run the audit while you're still with them, so you can compare a real plan against what you're getting now. If you move, we take over the account without pausing campaigns — your sales don't go dark during the handover.",
  },
  {
    q: "Do you need access to my Seller Central account?",
    a: "For the free audit, no — just three exported reports. If we work together, we use Amazon's official user-permission system at the access level you set. We never ask for your password.",
  },
  {
    q: "Are you an actual Amazon partner?",
    a: "Yes — AMZ Savvy is an Amazon Ads Verified Partner. That's a status Amazon grants and verifies directly; it isn't a badge you can buy.",
  },
  {
    q: "What if it doesn't work?",
    a: "Month-to-month after the first 90 days. If we're not earning our fee you can leave, and you keep every campaign structure, keyword list, and listing asset we built.",
  },
] as const;
