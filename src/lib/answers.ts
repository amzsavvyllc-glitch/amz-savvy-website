/**
 * ANSWERS LIBRARY — the GEO/AEO surface of the site.
 *
 * Each entry becomes its own static page at /answers/<slug>.
 *
 * Shape matters as much as content. Retrieval (RAG) pulls PASSAGES, not pages,
 * so every entry leads with `short` — a self-contained 2–3 sentence answer that
 * makes sense quoted with no surrounding context. That is the unit an AI cites.
 *
 * HONESTY RULE: everything here is method and publicly-checkable fact. No
 * invented client results, no fabricated benchmarks. Where a number is a rule
 * of thumb it is labelled as one.
 */

export type Answer = {
  slug: string;
  question: string;
  /** Self-contained answer. This is the passage an AI is most likely to quote. */
  short: string;
  category: "PPC" | "SEO" | "Strategy" | "Metrics";
  updated: string;
  sections: { heading: string; body: string[] }[];
  related: string[];
};

export const answers: Answer[] = [
  {
    slug: "what-is-a-good-acos-on-amazon",
    question: "What is a good ACOS on Amazon?",
    short:
      "There is no universal good ACOS — the only figure that matters is your break-even ACOS, which equals your profit margin before ad spend. If your product carries a 35% margin after all Amazon fees and COGS, then a 35% ACOS is break-even, anything below is profit, and anything above is bought at a loss. Most established sellers target 15–25%, but a launch may run 60% deliberately.",
    category: "Metrics",
    updated: "2026-08-15",
    sections: [
      {
        heading: "Why the 'industry average' is a trap",
        body: [
          "Averages circulate in the 20–30% range, but they mix a supplement seller with a 60% margin and an electronics reseller with a 12% margin. Copying someone else's target ACOS means copying their cost structure, which you do not share.",
          "A 40% ACOS is excellent if your margin is 55%. The same 40% is destroying money if your margin is 30%. The number alone is meaningless without the margin behind it.",
        ],
      },
      {
        heading: "Calculate yours instead",
        body: [
          "Take your selling price and subtract COGS, the Amazon referral fee (usually 15%), FBA fulfilment, storage, returns allowance and any shipping to Amazon. Divide what remains by the selling price. That percentage is your break-even ACOS.",
          "Then set a target below it. The gap between your target and break-even is your profit per advertised sale.",
        ],
      },
      {
        heading: "When a high ACOS is the right decision",
        body: [
          "During a launch, you are buying rank and review velocity, not immediate profit. Running above break-even for a defined window is a legitimate investment provided you have decided the window in advance and are tracking organic rank as the return.",
          "Defending a hero keyword against a competitor can also justify an elevated ACOS on that specific term, because losing the position costs more than the overspend.",
        ],
      },
    ],
    related: ["how-to-calculate-break-even-acos", "acos-vs-tacos", "how-to-lower-acos"],
  },
  {
    slug: "how-to-calculate-break-even-acos",
    question: "How do I calculate my break-even ACOS?",
    short:
      "Break-even ACOS equals your pre-advertising profit margin. Subtract COGS, Amazon referral fees, FBA fulfilment, storage, and a returns allowance from your selling price; divide the remainder by the selling price. If a $30 product leaves $9.60 after all costs, your margin is 32% and your break-even ACOS is 32%.",
    category: "Metrics",
    updated: "2026-08-15",
    sections: [
      {
        heading: "A worked example",
        body: [
          "Selling price $30.00. COGS $8.00. Referral fee at 15% is $4.50. FBA fulfilment $5.50. Storage and returns allowance $2.40. Total costs $20.40, leaving $9.60.",
          "$9.60 ÷ $30.00 = 32%. At a 32% ACOS you make nothing on an advertised sale. At 20% you keep $3.60 per advertised unit.",
        ],
      },
      {
        heading: "The costs people forget",
        body: [
          "Returns are the most commonly omitted line. A 5% return rate on a category where returns are unsellable is a real 5% off your margin, not a rounding error.",
          "Long-term storage fees, inbound shipping, and coupon or Subscribe & Save discounts all belong in the calculation. Leaving them out produces a break-even figure that is optimistic by several points, which is exactly the margin you are trying to protect.",
        ],
      },
    ],
    related: ["what-is-a-good-acos-on-amazon", "acos-vs-tacos", "how-much-to-spend-on-amazon-ads"],
  },
  {
    slug: "acos-vs-tacos",
    question: "What is the difference between ACOS and TACOS?",
    short:
      "ACOS is ad spend divided by ad-attributed sales, so it only measures advertising in isolation. TACOS is ad spend divided by total sales including organic, so it measures what advertising costs your whole business. A falling TACOS with steady revenue means organic rank is carrying more of the load — that is the healthiest signal in an Amazon account.",
    category: "Metrics",
    updated: "2026-08-15",
    sections: [
      {
        heading: "Why ACOS alone can mislead you",
        body: [
          "You can improve ACOS simply by switching off every campaign except your branded terms. ACOS drops beautifully and total sales fall off a cliff, because you stopped acquiring new customers.",
          "ACOS answers 'were these ads efficient'. It cannot answer 'is the business growing', which is why it should never be read on its own.",
        ],
      },
      {
        heading: "What TACOS tells you",
        body: [
          "TACOS falling while revenue holds or grows means organic sales are increasing relative to paid — your ranking is improving and you are becoming less dependent on ads.",
          "TACOS rising while revenue is flat means you are buying the same sales at a higher price. That is the early warning of listing decay or a new competitor bidding on your terms.",
        ],
      },
    ],
    related: ["what-is-a-good-acos-on-amazon", "why-did-my-acos-increase", "how-amazon-ranking-works"],
  },
  {
    slug: "high-ad-spend-no-sales",
    question: "Why is my Amazon ad spend high but I get no sales?",
    short:
      "High spend with few sales almost always means you are paying for clicks from shoppers with the wrong intent, or sending the right shoppers to a listing that does not convert. Pull your Search Term report and check the ratio of clicks to orders per term — if terms with many clicks and zero orders dominate spend, it is a targeting problem; if your conversion rate is below your category norm across the board, it is a listing problem.",
    category: "PPC",
    updated: "2026-08-15",
    sections: [
      {
        heading: "Diagnose targeting first",
        body: [
          "Download the Sponsored Products Search Term report for the last 60 days. Sort by spend descending and add a column for orders. Any term with spend above roughly 2× your target CPC and zero orders is a candidate for negation.",
          "Broad and phrase match campaigns are the usual culprits. They pick up loosely related searches that look relevant to Amazon's matching engine but are not what your product actually is.",
        ],
      },
      {
        heading: "Then check the listing",
        body: [
          "If good, exact-intent keywords are also failing to convert, more traffic will not help — it will just cost more. Compare your conversion rate against your category. Under-performing there points at price, main image, review count or rating rather than at the campaign.",
          "Paying to send buyers to a page that does not convert is the most expensive mistake in an Amazon account, because the cost scales with every click.",
        ],
      },
      {
        heading: "The order of operations",
        body: [
          "Fix targeting before scaling budget. Fix the listing before fixing targeting. Spending more on top of either problem multiplies the loss rather than solving it.",
        ],
      },
    ],
    related: ["how-to-find-wasted-search-terms", "what-is-a-good-conversion-rate-on-amazon", "how-to-lower-acos"],
  },
  {
    slug: "how-to-find-wasted-search-terms",
    question: "How do I find and negate wasted search terms on Amazon?",
    short:
      "Export the Sponsored Products Search Term report, filter to terms with zero orders, and sort by spend. Any term that has spent meaningfully more than your average cost-per-click without producing a single order is wasting money. Add those as negative exact keywords at the ad group level, and negate the obvious irrelevant patterns as negative phrase.",
    category: "PPC",
    updated: "2026-08-15",
    sections: [
      {
        heading: "Set a defensible threshold",
        body: [
          "A term with 3 clicks and no orders proves nothing — that is normal variance. A term with 40 clicks and no orders is a statement.",
          "A practical rule of thumb: give a term roughly 2–3× the number of clicks implied by your conversion rate before judging it. If you convert at 10%, expect a sale within about 10 clicks, so 25–30 clicks with nothing is a genuine signal.",
        ],
      },
      {
        heading: "Negative exact vs negative phrase",
        body: [
          "Negative exact blocks precisely that search term and nothing else. It is safe and surgical — use it for individual proven losers.",
          "Negative phrase blocks anything containing that string. It is powerful and dangerous. Use it for whole categories of wrong intent, such as a competitor brand name or a modifier like 'free' or 'used', but check what else it would block first.",
        ],
      },
      {
        heading: "This is maintenance, not a project",
        body: [
          "New search terms appear continuously as Amazon tests matches. A negation pass done once decays within weeks. Doing it on a fixed weekly or fortnightly cadence is what keeps spend clean.",
        ],
      },
    ],
    related: ["what-is-search-term-harvesting", "high-ad-spend-no-sales", "what-reports-for-ppc-audit"],
  },
  {
    slug: "what-is-search-term-harvesting",
    question: "What is search term harvesting in Amazon PPC?",
    short:
      "Search term harvesting is the practice of finding customer searches that have already produced orders in your broad, phrase or automatic campaigns, and promoting them into their own exact-match campaigns where you control the bid directly. It concentrates budget on proven converters instead of leaving them mixed in with untested traffic.",
    category: "PPC",
    updated: "2026-08-15",
    sections: [
      {
        heading: "Why it works",
        body: [
          "Discovery campaigns are deliberately loose so Amazon can test many searches. That looseness means a converting term shares its budget and bid with dozens of non-converters.",
          "Moving the winner into exact match lets you bid what that specific term is genuinely worth, and lets you negate it from the discovery campaign so the two do not compete against each other.",
        ],
      },
      {
        heading: "The full loop",
        body: [
          "Run automatic and broad campaigns to discover. Harvest converting terms into exact. Negate those terms in the discovery campaign so budget flows to fresh searches. Repeat.",
          "This is the core mechanic of a well-run account: discovery feeds exact, exact gets the budget, and the discovery layer keeps finding new terms rather than re-buying ones you already own.",
        ],
      },
    ],
    related: ["how-to-find-wasted-search-terms", "auto-vs-manual-campaigns", "how-to-lower-acos"],
  },
  {
    slug: "how-to-lower-acos",
    question: "How do I lower ACOS without losing sales?",
    short:
      "Lower ACOS by removing spend that produces nothing rather than by cutting bids across the board. Negate zero-order search terms, move proven converters to exact match, reduce bids only on keywords that convert below your break-even, and improve conversion rate on the listing. Across-the-board bid cuts lower ACOS by lowering sales, which is not the same as improving efficiency.",
    category: "PPC",
    updated: "2026-08-15",
    sections: [
      {
        heading: "The wrong way",
        body: [
          "Cutting every bid by 30% will reduce ACOS. It will also drop you out of the placements that were producing your profitable sales, and total revenue falls with it. The metric improves while the business gets smaller.",
        ],
      },
      {
        heading: "The order that actually works",
        body: [
          "First, negate terms with meaningful clicks and zero orders — this is pure waste with no downside to removing it.",
          "Second, reduce bids only on keywords converting worse than break-even, leaving profitable keywords untouched.",
          "Third, improve the listing. A conversion rate improvement lowers ACOS on every keyword simultaneously without touching a single bid.",
          "Fourth, check placements. Top-of-search often converts better and justifies its premium; product pages sometimes do not. Placement modifiers let you act on that difference.",
        ],
      },
    ],
    related: ["how-to-find-wasted-search-terms", "what-is-a-good-conversion-rate-on-amazon", "acos-vs-tacos"],
  },
  {
    slug: "how-long-does-amazon-ppc-take",
    question: "How long does Amazon PPC take to work?",
    short:
      "Wasted spend can be cut within two to three weeks, because switching off losing terms takes effect immediately. Genuine gains in rank and organic sales usually take 60 to 90 days, since Amazon's ranking responds to sustained sales velocity rather than to any single change. Anyone promising a transformation in days is describing budget cuts, not growth.",
    category: "Strategy",
    updated: "2026-08-15",
    sections: [
      {
        heading: "What moves quickly",
        body: [
          "Negating unprofitable search terms, correcting bids that are far above value, and fixing broken campaign structure all produce measurable savings inside the first billing cycle.",
          "These are subtractive wins. They are real, but they are about stopping losses rather than creating growth.",
        ],
      },
      {
        heading: "What takes a quarter",
        body: [
          "Organic rank responds to sustained conversion and sales velocity over weeks. A listing rewrite needs time to be re-indexed and then time for the new traffic to prove itself.",
          "Attribution windows also lag — Amazon attributes sales up to 7 days after a click, so the most recent fortnight of data always understates performance.",
        ],
      },
    ],
    related: ["how-amazon-ranking-works", "do-i-need-an-amazon-agency", "how-much-to-spend-on-amazon-ads"],
  },
  {
    slug: "auto-vs-manual-campaigns",
    question: "Should I use automatic or manual Amazon campaigns?",
    short:
      "Use both, for different jobs. Automatic campaigns are a discovery tool — they let Amazon find search terms you did not think of, at a low budget. Manual exact-match campaigns are where you put real money, on terms already proven to convert. Running only automatic means paying Amazon to guess forever; running only manual means never discovering anything new.",
    category: "PPC",
    updated: "2026-08-15",
    sections: [
      {
        heading: "The division of labour",
        body: [
          "Automatic campaigns run on a modest, capped budget with the sole purpose of surfacing new search terms. Judge them on discovery, not on ACOS.",
          "Manual exact campaigns carry the majority of spend and should be judged strictly on efficiency, because every term in them was chosen deliberately.",
        ],
      },
      {
        heading: "Keeping them from competing",
        body: [
          "Once a term is harvested into exact, negate it in the automatic and broad campaigns. Otherwise your own campaigns bid against each other and you pay more for the same click.",
          "This single step is one of the most common structural fixes in accounts that have grown without a plan.",
        ],
      },
    ],
    related: ["what-is-search-term-harvesting", "sponsored-products-brands-display", "how-to-find-wasted-search-terms"],
  },
  {
    slug: "sponsored-products-brands-display",
    question: "What is the difference between Sponsored Products, Sponsored Brands and Sponsored Display?",
    short:
      "Sponsored Products promote a single listing in search results and are where most accounts should concentrate spend, because intent is highest. Sponsored Brands promote your brand and a set of products with a custom headline or video, and require Brand Registry. Sponsored Display retargets shoppers on and off Amazon and is best used for defence and remarketing rather than primary acquisition.",
    category: "PPC",
    updated: "2026-08-15",
    sections: [
      {
        heading: "Where each earns its place",
        body: [
          "Sponsored Products captures active purchase intent — someone typing a search is closer to buying than someone browsing. For most sellers this deserves the largest share of budget.",
          "Sponsored Brands works hardest when you have a range worth cross-selling, and Sponsored Brands Video in particular tends to earn attention in a crowded results page.",
          "Sponsored Display is strongest defending your own product pages against competitor ads, and retargeting shoppers who viewed but did not buy.",
        ],
      },
      {
        heading: "A common sequencing mistake",
        body: [
          "Launching all three at once on a new product spreads a small budget too thin to produce a readable signal anywhere. Establish Sponsored Products first, then layer the others once you know which terms convert.",
        ],
      },
    ],
    related: ["auto-vs-manual-campaigns", "how-much-to-spend-on-amazon-ads", "brand-defense-amazon"],
  },
  {
    slug: "what-is-a-good-conversion-rate-on-amazon",
    question: "What is a good conversion rate on Amazon?",
    short:
      "Amazon conversion rates vary widely by category, but many sellers operate somewhere in the 10–20% range, which is far higher than typical ecommerce because Amazon shoppers arrive intending to buy. The useful comparison is not a global benchmark but your own category and your own historical rate — a sudden drop is far more diagnostic than an absolute number.",
    category: "Metrics",
    updated: "2026-08-15",
    sections: [
      {
        heading: "Where to find your real number",
        body: [
          "In Seller Central, the Business Reports section gives Unit Session Percentage per ASIN, which is your conversion rate. Track it over time rather than reading it once.",
        ],
      },
      {
        heading: "What actually moves it",
        body: [
          "Main image, price relative to the visible competition, review count and star rating carry most of the weight. Bullets and A+ content matter more for shoppers who scroll, which is a smaller group than most sellers assume.",
          "A conversion rate improvement is the highest-leverage change available, because it lowers ACOS on every keyword at once and simultaneously improves organic rank.",
        ],
      },
    ],
    related: ["high-ad-spend-no-sales", "how-to-lower-acos", "how-amazon-ranking-works"],
  },
  {
    slug: "why-did-my-acos-increase",
    question: "Why did my ACOS suddenly increase?",
    short:
      "A sudden ACOS rise usually has one of four causes: a competitor started bidding on your terms and pushed CPCs up, your conversion rate dropped, your campaign structure changed and budget shifted to weaker terms, or you lost the Buy Box. Check CPC and conversion rate separately — ACOS is a ratio, and knowing which side of it moved tells you which problem you have.",
    category: "Metrics",
    updated: "2026-08-15",
    sections: [
      {
        heading: "Split the ratio",
        body: [
          "If average CPC rose while conversion held steady, this is competitive pressure. Someone entered your auction, or a seasonal bidding surge began.",
          "If CPC held steady while conversion fell, the problem is on your listing — price change, a lost Buy Box, a new negative review, or going out of stock on a variation.",
        ],
      },
      {
        heading: "The Buy Box check people skip",
        body: [
          "Losing the Buy Box suppresses conversion sharply while your ads keep spending, which shows up as a sudden unexplained ACOS spike. Confirm Buy Box percentage before rebuilding campaigns you did not break.",
        ],
      },
    ],
    related: ["acos-vs-tacos", "what-is-a-good-conversion-rate-on-amazon", "how-to-lower-acos"],
  },
  {
    slug: "how-much-to-spend-on-amazon-ads",
    question: "How much should I spend on Amazon ads?",
    short:
      "Budget should follow proven efficiency rather than a fixed percentage of revenue. Once a campaign converts below your break-even ACOS, additional spend on it is profitable and should be increased until efficiency degrades. For a new product, a common starting approach is a modest daily budget held long enough to gather statistically meaningful click data before judging anything.",
    category: "Strategy",
    updated: "2026-08-15",
    sections: [
      {
        heading: "Why percentage-of-revenue rules mislead",
        body: [
          "Rules like 'spend 10% of revenue on ads' ignore whether that spend is working. If your campaigns return below break-even, 10% is too much. If they return well above, 10% is leaving money unclaimed.",
        ],
      },
      {
        heading: "Scale by keyword, not by account",
        body: [
          "Increase budget where specific keywords are profitable, not across the whole account. Account-level budget increases push money into weak campaigns alongside strong ones.",
          "Watch for the point where more spend stops producing proportional sales — that is the ceiling for that term, and pushing past it is where efficiency collapses.",
        ],
      },
    ],
    related: ["how-to-calculate-break-even-acos", "how-long-does-amazon-ppc-take", "auto-vs-manual-campaigns"],
  },
  {
    slug: "how-amazon-ranking-works",
    question: "How does Amazon search ranking actually work?",
    short:
      "Amazon ranks listings primarily on relevance and sales performance. Relevance comes from whether your listing is indexed for a search term through title, bullets, backend keywords and A+ content. Performance comes from click-through rate, conversion rate and sales velocity for that term. A listing cannot rank for a keyword it is not indexed for, no matter how much you spend.",
    category: "SEO",
    updated: "2026-08-15",
    sections: [
      {
        heading: "Indexing comes first",
        body: [
          "If a keyword appears nowhere in your listing, Amazon has no reason to show you for it. Check indexing before investing in ranking — searching the exact keyword plus your ASIN is a quick way to confirm.",
        ],
      },
      {
        heading: "Then sales velocity for that term",
        body: [
          "Amazon rewards listings that convert the searches it shows them for. Sales driven by a specific keyword strengthen your organic position for that keyword, which is the mechanism behind using PPC to support rank.",
          "This is also why conversion rate matters twice: it lowers your ad costs and it improves the organic position that reduces your dependence on ads.",
        ],
      },
      {
        heading: "What does not work",
        body: [
          "Keyword stuffing the title degrades readability and click-through, which harms the performance half of the equation. Repeating a keyword more times does not increase relevance once you are indexed.",
        ],
      },
    ],
    related: ["how-to-rank-on-page-one", "what-is-a-good-conversion-rate-on-amazon", "acos-vs-tacos"],
  },
  {
    slug: "how-to-rank-on-page-one",
    question: "How do I rank on page one of Amazon?",
    short:
      "Page-one ranking requires being indexed for the keyword, converting well when shown, and sustaining sales velocity for that term over weeks. In practice that means a listing optimised for the exact search, a competitive price and review position, and targeted advertising on that keyword to generate the velocity Amazon uses as evidence. There is no shortcut that bypasses conversion.",
    category: "SEO",
    updated: "2026-08-15",
    sections: [
      {
        heading: "Pick fewer keywords",
        body: [
          "Attempting to rank for thirty keywords at once spreads velocity too thin to move any of them. Choosing three to five priority terms and concentrating effort produces movement you can actually see.",
        ],
      },
      {
        heading: "Defend what you win",
        body: [
          "Rank decays. Once you hold a position, competitors bid on that term and your velocity must be maintained to keep it. Treating ranking as a one-off project rather than an ongoing position is why gains often disappear a quarter later.",
        ],
      },
    ],
    related: ["how-amazon-ranking-works", "brand-defense-amazon", "how-long-does-amazon-ppc-take"],
  },
  {
    slug: "brand-defense-amazon",
    question: "What is brand defense on Amazon and do I need it?",
    short:
      "Brand defense means advertising on your own brand name and your own product pages so competitors cannot capture shoppers who are already looking for you. It is usually cheap, because your relevance on your own brand is high, and it protects sales you would otherwise lose to a competitor's ad placed directly on your listing.",
    category: "PPC",
    updated: "2026-08-15",
    sections: [
      {
        heading: "The objection, and the answer",
        body: [
          "Sellers often argue they should not pay for traffic that would have found them anyway. That holds only if no competitor is bidding on your brand — and if you are worth targeting, someone eventually will.",
          "The correct test is empirical: check whether competitor ads appear on your branded searches and on your product pages. If they do, the traffic is not safely yours.",
        ],
      },
      {
        heading: "Keep it proportionate",
        body: [
          "Brand defense should be a small, efficient slice of the account, not a way to flatter overall ACOS. Branded terms convert well and can make an account look healthier than its acquisition performance justifies — always review branded and non-branded separately.",
        ],
      },
    ],
    related: ["sponsored-products-brands-display", "how-to-rank-on-page-one", "acos-vs-tacos"],
  },
  {
    slug: "what-reports-for-ppc-audit",
    question: "What reports do I need for an Amazon PPC audit?",
    short:
      "Three exports cover almost everything: the Sponsored Products Search Term report for at least 60 days, the Business Report by ASIN for sessions and conversion rate, and a Bulk Operations file for the full campaign structure, bids and negatives. Together these show what you paid for, what converted, and how the account is put together — without needing account access.",
    category: "Strategy",
    updated: "2026-08-15",
    sections: [
      {
        heading: "What each one answers",
        body: [
          "The Search Term report shows the actual customer searches you paid for, with clicks, spend and orders per term. This is where wasted spend becomes visible.",
          "The Business Report gives sessions and Unit Session Percentage per ASIN, which separates a traffic problem from a conversion problem.",
          "The Bulk file exposes structure — duplicate keywords across campaigns, missing negatives, bids set far from value, and campaigns competing with each other.",
        ],
      },
      {
        heading: "Why 60 days minimum",
        body: [
          "Shorter windows do not produce enough clicks per keyword to distinguish a genuinely bad term from normal variance. Judging keywords on two weeks of data usually means negating terms that were merely unlucky.",
        ],
      },
    ],
    related: ["how-to-find-wasted-search-terms", "do-i-need-an-amazon-agency", "high-ad-spend-no-sales"],
  },
  {
    slug: "do-i-need-an-amazon-agency",
    question: "Do I need an Amazon agency, or can I run PPC myself?",
    short:
      "You can run Amazon PPC yourself, and at low spend you probably should — the work is mostly disciplined weekly maintenance rather than secret knowledge. An agency becomes worth its fee when spend is high enough that a few points of ACOS exceed the retainer, or when the weekly cadence is not happening because nobody has time for it.",
    category: "Strategy",
    updated: "2026-08-15",
    sections: [
      {
        heading: "The honest arithmetic",
        body: [
          "If you spend $3,000 a month on ads, a 5-point ACOS improvement is worth roughly $150 a month, which does not cover a retainer. At $30,000 a month the same improvement is worth $1,500 and the maths changes.",
          "Any agency unwilling to walk you through this calculation before quoting is not worth hiring.",
        ],
      },
      {
        heading: "What to check before signing",
        body: [
          "Ask what specifically will be done each week, what reporting looks like, whether you keep the campaign structure and keyword lists if you leave, and whether the contract is month-to-month after an initial period.",
          "Be sceptical of guaranteed rank or guaranteed sales figures. Nobody controls Amazon's algorithm or your competitors' budgets.",
        ],
      },
    ],
    related: ["what-reports-for-ppc-audit", "how-long-does-amazon-ppc-take", "how-much-to-spend-on-amazon-ads"],
  },
];

export const answerBySlug = (slug: string) => answers.find((a) => a.slug === slug);

export const categories = ["PPC", "SEO", "Metrics", "Strategy"] as const;
