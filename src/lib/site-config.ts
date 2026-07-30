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

/** Hero + trust band stats. ALL PLACEHOLDER — swap with real numbers. */
export const stats = [
  { value: 8, prefix: "$", suffix: "M+", label: "Ad spend managed", placeholder: true },
  { value: 120, prefix: "", suffix: "+", label: "Brands scaled", placeholder: true },
  { value: 4.6, prefix: "", suffix: "x", label: "Average ROAS", placeholder: true, decimals: 1 },
  { value: 9, prefix: "", suffix: "", label: "Years on Amazon", placeholder: true },
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

/** ⚠️ ALL PLACEHOLDER case studies — replace with real, permissioned client results. */
export const caseStudies = [
  {
    category: "Supplements",
    headline: "ACOS cut from 48% to 19% in 90 days",
    body: "Rebuilt a flat 40-campaign account into a tiered structure, negated 600+ wasted search terms, and moved budget to the 12 keywords that actually converted.",
    metrics: [
      { label: "ACOS", from: "48%", to: "19%" },
      { label: "Monthly sales", from: "$41k", to: "$77k" },
      { label: "TACOS", from: "31%", to: "14%" },
    ],
    placeholder: true,
  },
  {
    category: "Home & Kitchen",
    headline: "3.1x to 6.4x ROAS without raising budget",
    body: "Same ad spend, different allocation. Harvested converting search terms into exact-match campaigns and killed broad-match bleed.",
    metrics: [
      { label: "ROAS", from: "3.1x", to: "6.4x" },
      { label: "Ad spend", from: "$18k/mo", to: "$18k/mo" },
      { label: "Attributed sales", from: "$56k", to: "$115k" },
    ],
    placeholder: true,
  },
  {
    category: "Pet Products",
    headline: "Page-one rank on 9 of 10 priority keywords",
    body: "Full listing rewrite plus a staged rank campaign. Organic sessions nearly doubled while paid share of sales dropped.",
    metrics: [
      { label: "Page-one keywords", from: "2", to: "9" },
      { label: "Organic sessions", from: "12k/mo", to: "23k/mo" },
      { label: "Paid share of sales", from: "62%", to: "34%" },
    ],
    placeholder: true,
  },
] as const;

/** ⚠️ ALL PLACEHOLDER testimonials — replace with real, permissioned quotes. */
export const testimonials = [
  {
    quote:
      "They found $6,000 a month of wasted spend in the first audit. We'd been running those campaigns for two years.",
    name: "Placeholder Name",
    role: "Founder, Supplement Brand",
    placeholder: true,
  },
  {
    quote:
      "First agency that actually explained what they were doing instead of hiding behind a dashboard. The monthly report is one page and I read all of it.",
    name: "Placeholder Name",
    role: "Ecommerce Director",
    placeholder: true,
  },
  {
    quote:
      "We went from scared of scaling to adding budget every month because we finally trust the numbers.",
    name: "Placeholder Name",
    role: "Co-founder, Home Goods",
    placeholder: true,
  },
] as const;

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
