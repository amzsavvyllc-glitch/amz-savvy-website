/**
 * SINGLE SOURCE OF TRUTH for all site content.
 *
 * There are no placeholders left — every claim here is one AMZ Savvy can stand
 * behind. `playbooks` describes method, not client outcomes. `testimonials` is
 * empty by design and its section stays hidden until real, permissioned quotes
 * are added. See README before adding proof of any kind.
 */

export const site = {
  name: "AMZ Savvy",
  tagline: "Strategies | Optimize | Maximize ads",
  domain: "amzsavvy.com",
  email: "amzsavvy.llc@gmail.com",

  /* One number, three uses. `phone` is the E.164 form for tel: links and
     schema; `phoneDisplay` is what humans read; `whatsapp` is the same number
     digits-only, because wa.me rejects a leading + or any spacing. Change the
     number here and every link on the site follows. */
  phone: "+17372787962",
  phoneDisplay: "+1 737 278 7962",
  whatsapp: "17372787962",

  /* A verifiable street address is the single strongest local-search signal an
     agency site can carry, and AI answer engines lean on it to decide whether
     "Amazon PPC agency in the US" describes this company. */
  address: {
    street: "5900 Balcones Drive, Suite 4000",
    locality: "Austin",
    region: "TX",
    postalCode: "78731",
    country: "US",
  },

  calendly: "https://calendly.com/amzsavvy/30min",
} as const;

/** Address as one line, for footers and contact blocks. */
export const addressLine = `${site.address.street}, ${site.address.locality}, ${site.address.region} ${site.address.postalCode}, USA`;

export const nav = [
  { label: "Services", href: "/#services" },
  { label: "Process", href: "/#process" },
  { label: "Calculator", href: "/#calculator" },
  { label: "Answers", href: "/answers/" },
  { label: "Blog", href: "/blog/" },
  { label: "FAQ", href: "/#faq" },
] as const;

/**
 * Profile URLs for schema.org `sameAs`.
 *
 * This is how machines link "AMZ Savvy the website" to "AMZ Savvy the company"
 * across the internet — the single strongest entity signal available, and the
 * groundwork for being cited by AI search.
 *
 * Add ONLY real, live profiles. A sameAs pointing at a 404 or the wrong company
 * actively weakens the entity rather than strengthening it.
 *
 * Good candidates: LinkedIn company page, Clutch, G2, Crunchbase,
 * Google Business Profile, X, YouTube, Amazon Ads partner directory listing.
 *
 * Each URL below was loaded and confirmed live before being added.
 * LinkedIn MUST be the public vanity URL (/company/amz-savvy/), not the numeric
 * admin one — /company/101407041/ redirects logged-out visitors to a login wall,
 * which is a dead end for a crawler.
 */
export const profiles: string[] = [
  // Amazon's own verified-partner listing — the strongest of the three, because
  // Amazon publishes and verifies it, so it corroborates the FAQ claim below.
  "https://advertising.amazon.com/partners/directory/details/amzn1.ads1.ma1.20ezhmglurcer9oabjewtxrsg/AMZ-Savvy-LLC/",
  "https://www.linkedin.com/company/amz-savvy/",
  "https://www.fiverr.com/agencies/AMZSavvy",
];

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
 * Where the testimonials below come from.
 *
 * Shown as visible text with a link, so any visitor can open the source and
 * find the exact review. Deliberately NOT emitted as schema.org
 * `aggregateRating`: Google's structured-data policy treats a rating collected
 * on a third-party site and marked up on your own as self-serving, and it can
 * cost the site its rich results. Visible text + link is the compliant form.
 */
export const reviewSource = {
  platform: "Fiverr",
  url: "https://www.fiverr.com/agencies/AMZSavvy",
  rating: "4.9",
  count: 216,
} as const;

/**
 * TESTIMONIALS — every one is a real, public, verified-purchase review.
 *
 * Sourced from the Fiverr agency profile (see `reviewSource`), where each is
 * tied to a completed paid order and attributed to the buyer's own public
 * username. Quotes are VERBATIM, including the reviewers' own capitalisation
 * and typos; where a long review is shortened, the cut is marked with an
 * ellipsis and never changes the meaning.
 *
 * The FTC's Consumer Reviews and Testimonials Rule (16 CFR 465) is what these
 * constraints exist for — it treats invented endorsers, and edits that distort
 * what a reviewer actually said, as deceptive. So:
 *
 *   - Never add an entry for someone who did not write it.
 *   - Never "tidy up" a quote into something the reviewer did not say.
 *   - Never trim a qualifier that changes the sense (a 3-star review edited
 *     down to its one warm sentence is the textbook violation).
 *
 * Direct client quotes are welcome here too — get the client's written OK to
 * publish their name, role and words first, then push an object. Anonymised is
 * fine and still real: "Founder, supplements brand" works when a client won't
 * be named.
 */
export const testimonials: {
  quote: string;
  name: string;
  role: string;
}[] = [
  {
    quote:
      "We began our partnership almost a year ago, and since then the Amazon Savvy team and Mehran have been the backbone of our marketing and operations for our brands on Amazon. As a demanding client with high standards who often parts ways with partners unable to deliver excellence, I can confidently say after a year that this team has exceeded expectations. … Speaking as a senior brand manager who has managed six-figure sales on Amazon, I can attest to their exceptional capabilities.",
    name: "benja_team",
    role: "Senior brand manager, Germany · Ongoing collaboration",
  },
  {
    quote:
      "Outstanding first month. We have tried several high dollar, recommended agencies in the US, and this has been the best team so far. This team went above and beyond our expectations. Ran a deep analysis, found issues, and improved every day. Excellent communication.",
    name: "jmasters",
    role: "Amazon seller, United States · Sponsored ads",
  },
  {
    quote:
      "I hired this group to assist with my Amazon store. Primarily to run ads. They are constantly testing new campaigns and niches in my market to acquire sales and also have returning customers. I am seeing that! I am blown away their work ethic and communication. … My numbers in Amazon are proof!",
    name: "russellhtayler",
    role: "Amazon seller, United States · Ongoing collaboration",
  },
  {
    quote:
      "His team is exceptional, in market depth and research, the knowledge is incomparable to any other freelancers in this platform, the professionalism is eye opening and his guidance before onboarding with them was a privilege to have.",
    name: "engr_sufy",
    role: "Amazon seller, Saudi Arabia",
  },
  {
    quote:
      "Amz Savvy not only saved my Amazon FBA business but also EXCEEDED my expectations with their professionalism and deep understanding of E-commerce management. Their quick responsiveness and proactive communication made the project seamless.",
    name: "pprsgp",
    role: "FBA seller, Australia",
  },
  {
    // Sentence-initial capital added; the reviewer's own wording is otherwise
    // untouched, grammar included.
    quote:
      "We have been working for two months, and we are about to launch a new Brand I am very happy and recommend to anyone who wants be successful on Amazon.",
    name: "sobrinabrand",
    role: "Brand owner, El Salvador · Repeat client",
  },
];

/** What the client actually receives. Their own deliverables — not client claims. */
export const deliverables = [
  {
    title: "The audit",
    when: "Within 48 hours of the call",
    lines: [
      "Wasted-spend figure for your real account",
      "Every zero-order search term, listed",
      "Your true break-even ACOS at your margin",
      "Ranked fix list — biggest money first",
    ],
  },
  {
    title: "The monthly report",
    when: "First week, every month",
    lines: [
      "One page. Plain English. No dashboard maze.",
      "What we changed and why",
      "Spend, sales, ACOS, TACOS vs last month",
      "What we are doing next month",
    ],
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
