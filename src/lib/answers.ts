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
  /**
   * Optional SEARCH SNIPPET, written to earn the click.
   *
   * `short` is optimised for a different job — being retrieved and quoted whole
   * by an answer engine — so it is dense and long, and truncating it at 155
   * characters for a meta description reliably cuts mid-sentence. A Google
   * snippet ending "…in the previous twelve…" reads as broken and costs clicks.
   *
   * Set this on any page that actually earns impressions. Keep it under ~155
   * characters so it is never truncated, make it a complete thought, and give
   * the searcher a reason to choose this result. Same proof rules as everywhere
   * else: no numbers that are not in the page.
   */
  metaDescription?: string;
  category: "PPC" | "SEO" | "Strategy" | "Metrics";
  updated: string;
  /**
   * Optional explanatory diagram, rendered directly under the short answer.
   * Built in Canva (the single source for AMZ Savvy visuals, so assets stay
   * editable by the owner in the tool he owns) and exported to /public/answers/.
   * Every word in the image must also appear as real text on the page — the
   * image supports the answer, it never carries information alone.
   */
  image?: { src: string; alt: string; width: number; height: number; caption?: string };
  sections: {
    heading: string;
    body: string[];
    /**
     * Optional comparison table, rendered after this section's paragraphs.
     * AI Overviews and Perplexity preferentially lift real <table> markup, so
     * comparison ("X vs Y") answers earn citations by structuring the contrast
     * as data, not only prose. `columns` is the header row; every `rows` entry
     * must have the same length as `columns`. Same HONESTY RULE as everywhere
     * else — method and checkable fact only, no invented numbers.
     */
    table?: {
      caption?: string;
      columns: string[];
      rows: string[][];
    };
  }[];
  related: string[];
};

const coreAnswers: Answer[] = [
  {
    slug: "what-is-a-good-acos-on-amazon",
    question: "What is a good ACOS on Amazon?",
    short:
      "There is no universal good ACOS — the only figure that matters is your break-even ACOS, which equals your profit margin before ad spend. If your product carries a 35% margin after all Amazon fees and COGS, then a 35% ACOS is break-even, anything below is profit, and anything above is bought at a loss. Most established sellers target 15–25%, but a launch may run 60% deliberately.",
    metaDescription:
      "There is no universal good ACOS — only yours. How to work out the number your margin can carry, and why copied targets lose money.",
    category: "Metrics",
    updated: "2026-08-15",
    image: {
      src: "/answers/what-is-a-good-acos-on-amazon.png",
      alt: "Diagram showing that most established Amazon sellers target a 15 to 25 percent ACOS, while the figure that actually decides profit is your own break-even ACOS.",
      width: 1400,
      height: 689,
      caption: "The common target range, and the number that decides profit.",
    },
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
    metaDescription:
      "Your break-even ACOS is your margin after every Amazon fee — not before. Work it out in a few minutes with the exact deductions to include.",
    category: "Metrics",
    updated: "2026-08-15",
    image: {
      src: "/answers/how-to-calculate-break-even-acos.png",
      alt: "Diagram of the break-even ACOS formula: selling price minus all costs, divided by selling price, which equals your pre-advertising profit margin.",
      width: 1400,
      height: 689,
      caption: "Break-even ACOS is your pre-advertising margin.",
    },
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
    metaDescription:
      "ACOS measures ad spend against ad sales; TACOS measures it against total sales. Which one to watch, and what a rising TACOS actually means.",
    category: "Metrics",
    updated: "2026-09-01",
    image: {
      src: "/answers/acos-vs-tacos.png",
      alt: "ACOS equals ad spend divided by ad sales and measures the ads in isolation; TACOS equals ad spend divided by total sales and measures what ads cost the whole business. Same numerator, different denominator.",
      width: 1400,
      height: 688,
      caption: "The only difference is the denominator.",
    },
    sections: [
      {
        heading: "How do ACOS and TACOS differ at a glance?",
        body: [
          "Both divide ad spend by sales — the difference is which sales sit in the denominator. ACOS uses only ad-attributed sales; TACOS uses every sale, paid and organic.",
        ],
        table: {
          columns: ["", "ACOS", "TACOS"],
          rows: [
            ["Formula", "Ad spend ÷ ad-attributed sales", "Ad spend ÷ total sales (paid + organic)"],
            ["Measures", "Efficiency of advertising in isolation", "What advertising costs the whole business"],
            ["Best for", "Tuning bids, keywords and campaigns", "Tracking overall ad dependence over time"],
            [
              "A falling number means",
              "Ads got more efficient — but can be faked by pausing non-branded campaigns",
              "Organic rank is carrying more of the load — the healthiest signal in an account",
            ],
          ],
          caption: "ACOS answers “were these ads efficient?”; TACOS answers “is the business growing?”",
        },
      },
      {
        heading: "When does ACOS alone mislead you?",
        body: [
          "You can improve ACOS simply by switching off every campaign except your branded terms. ACOS drops beautifully and total sales fall off a cliff, because you stopped acquiring new customers.",
          "ACOS answers 'were these ads efficient'. It cannot answer 'is the business growing', which is why it should never be read on its own.",
        ],
      },
      {
        heading: "What does a rising or falling TACOS tell you?",
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
    image: {
      src: "/answers/high-ad-spend-no-sales.png",
      alt: "Diagram contrasting the two reasons for high Amazon ad spend with no sales: wrong traffic, meaning clicks with no buying intent, and a weak listing that the right shoppers do not convert on.",
      width: 1400,
      height: 689,
      caption: "The two causes of high spend and no sales.",
    },
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
    metaDescription:
      "Pull one report, sort it two ways, and the wasted spend is obvious in ten minutes. The exact filters, and what to negate versus what to leave.",
    category: "PPC",
    updated: "2026-08-15",
    image: {
      src: "/answers/how-to-find-wasted-search-terms.png",
      alt: "Four-step checklist for finding wasted Amazon search terms: export the Search Term report, filter to terms with zero orders, sort by spend, then negate as exact or phrase.",
      width: 1400,
      height: 689,
      caption: "The four steps, in the order we run them.",
    },
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
    image: {
      src: "/answers/what-is-search-term-harvesting.png",
      alt: "Diagram of Amazon search term harvesting: a converting search term is discovered in broad, phrase and automatic campaigns, then promoted into its own exact-match campaign where you control the bid.",
      width: 1400,
      height: 689,
      caption: "Where a converting term is found, and where it should end up.",
    },
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
    metaDescription:
      "Lowering ACOS by cutting bids usually cuts sales too. The order to work in so efficiency improves without losing the volume.",
    category: "PPC",
    updated: "2026-08-15",
    image: {
      src: "/answers/how-to-lower-acos.png",
      alt: "Checklist of four ways to lower Amazon ACOS without losing sales: negate zero-order search terms, move proven converters to exact match, cut bids selectively, and improve listing conversion.",
      width: 1400,
      height: 689,
      caption: "Four moves that lower ACOS without lowering sales.",
    },
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
    image: {
      src: "/answers/how-long-does-amazon-ppc-take.png",
      alt: "Timeline diagram for Amazon PPC results: wasted spend can be cut in two to three weeks, while gains in rank and organic sales take 60 to 90 days.",
      width: 1400,
      height: 689,
      caption: "Two different clocks: cutting waste, and building rank.",
    },
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
    metaDescription:
      "You need both, but not for the reasons usually given. What each campaign type is actually for, and how they should feed each other.",
    category: "PPC",
    updated: "2026-08-15",
    image: {
      src: "/answers/auto-vs-manual-campaigns.png",
      alt: "Diagram comparing Amazon automatic campaigns as a low-budget discovery tool with manual exact-match campaigns, where proven converters get real budget and full bid control.",
      width: 1400,
      height: 689,
      caption: "Automatic discovers. Manual exact scales.",
    },
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
    updated: "2026-09-01",
    image: {
      src: "/answers/sponsored-products-brands-display.png",
      alt: "Three-column comparison of Amazon Sponsored Products, Sponsored Brands and Sponsored Display, showing what each format promotes and where it belongs in an account.",
      width: 1400,
      height: 689,
      caption: "What each Amazon ad format does, side by side.",
    },
    sections: [
      {
        heading: "How do the three ad types compare?",
        body: [
          "Sponsored Products captures active purchase intent — someone typing a search is closer to buying than someone browsing. For most sellers this deserves the largest share of budget.",
          "Sponsored Brands works hardest when you have a range worth cross-selling, and Sponsored Brands Video in particular tends to earn attention in a crowded results page.",
          "Sponsored Display is strongest defending your own product pages against competitor ads, and retargeting shoppers who viewed but did not buy.",
        ],
        table: {
          columns: ["", "Sponsored Products", "Sponsored Brands", "Sponsored Display"],
          rows: [
            ["Where it shows", "In search results, single listing", "Top of search, brand + product set", "On/off Amazon product pages & retargeting"],
            ["Primary job", "Acquisition on high intent", "Brand awareness & cross-sell", "Defence & remarketing"],
            ["Brand Registry required", "No", "Yes", "Yes"],
            ["Best share of budget", "Largest for most accounts", "Once you have a range to cross-sell", "Smaller, tactical"],
          ],
          caption: "Most accounts should establish Sponsored Products first, then layer the others.",
        },
      },
      {
        heading: "What is the most common sequencing mistake?",
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
    metaDescription:
      "Where to find your real conversion rate in Seller Central, what counts as healthy in your category, and what to fix first when it is low.",
    category: "Metrics",
    updated: "2026-08-15",
    image: {
      src: "/answers/what-is-a-good-conversion-rate-on-amazon.png",
      alt: "Diagram showing that many Amazon sellers convert in the 10 to 20 percent range, far above typical ecommerce, and that your own trend matters more than any benchmark.",
      width: 1400,
      height: 689,
      caption: "Where many Amazon sellers sit, and why your trend matters more.",
    },
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
    image: {
      src: "/answers/why-did-my-acos-increase.png",
      alt: "Diagram showing the two sides of a sudden Amazon ACOS increase: cost per click went up, or conversion rate fell.",
      width: 1400,
      height: 689,
      caption: "ACOS is a ratio — find out which side of it moved.",
    },
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
    image: {
      src: "/answers/how-much-to-spend-on-amazon-ads.png",
      alt: "Diagram showing that Amazon ad budget should follow proven efficiency rather than a fixed percentage of revenue, increasing while a campaign converts below break-even ACOS.",
      width: 1400,
      height: 689,
      caption: "Budget follows proof, not a fixed percentage.",
    },
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
    metaDescription:
      "Relevance, then conversion history, then velocity. How Amazon's ranking really behaves, and the levers you actually control.",
    category: "SEO",
    updated: "2026-08-15",
    image: {
      src: "/answers/how-amazon-ranking-works.png",
      alt: "Diagram of how Amazon search ranking works: relevance decides whether you can rank, through indexing; performance decides how high, through click-through rate, conversion rate and sales velocity.",
      width: 1400,
      height: 689,
      caption: "Relevance decides if you can rank. Performance decides how high.",
    },
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
    image: {
      src: "/answers/how-to-rank-on-page-one.png",
      alt: "Checklist of what page-one ranking on Amazon requires: be indexed for the keyword, convert when shown, sustain sales velocity, and advertise on that keyword.",
      width: 1400,
      height: 689,
      caption: "What page one actually requires, in order.",
    },
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
    image: {
      src: "/answers/brand-defense-amazon.png",
      alt: "Diagram defining Amazon brand defense as advertising on your own brand name, which is cheap because your relevance is high and protects sales from competitor ads on your page.",
      width: 1400,
      height: 689,
      caption: "What brand defense is, and why it costs so little.",
    },
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
    metaDescription:
      "Three exports cover almost everything: search terms, business report by ASIN, and a bulk file. What each one tells you and how they combine.",
    category: "Strategy",
    updated: "2026-08-15",
    image: {
      src: "/answers/what-reports-for-ppc-audit.png",
      alt: "Three-column diagram of the three exports an Amazon PPC audit needs: the Sponsored Products Search Term report, the Business Report by ASIN, and a Bulk Operations file.",
      width: 1400,
      height: 689,
      caption: "Three exports cover an entire PPC audit.",
    },
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
    slug: "why-zero-impressions",
    question: "Why is my Amazon campaign getting zero impressions?",
    short:
      "Zero impressions almost always means your ad is never entering the auction, not that it is losing it. The usual causes are a bid far below the going rate for your keywords, a listing that is not indexed for the terms you are targeting, no Buy Box on the advertised ASIN, the campaign not actually being live because of dates or budget, or ineligibility such as needing Brand Registry for Sponsored Brands.",
    category: "PPC",
    updated: "2026-08-15",
    image: {
      src: "/answers/why-zero-impressions.png",
      alt: "Checklist of the usual causes of zero impressions on an Amazon campaign: a bid far below the going rate, a listing not indexed, no Buy Box, or a campaign that is not live.",
      width: 1400,
      height: 689,
      caption: "The usual causes, cheapest to check first.",
    },
    sections: [
      {
        heading: "Work through these in order",
        body: [
          "Check the campaign is genuinely running: status Delivering, start date in the past, no end date already passed, and daily budget not exhausted early in the day.",
          "Check Buy Box. If you do not hold the Featured Offer on that ASIN, Sponsored Products will generally not serve at all. This is the single most common cause people miss, because the campaign looks perfectly healthy.",
          "Check indexing. If your listing is not indexed for the keyword, targeting it produces nothing. Search the exact keyword plus your ASIN in the Amazon search box to confirm.",
          "Check the bid against reality. A bid well under the suggested range for a competitive term will simply never win a placement. Raise it temporarily to test whether impressions appear at all.",
          "Check eligibility. Sponsored Brands and Sponsored Display require Brand Registry. A campaign created without it can sit there looking active and never serve.",
        ],
      },
      {
        heading: "Low impressions is a different problem",
        body: [
          "If you are getting a trickle rather than nothing, you are entering the auction and losing it. That is a bid and relevance issue, not an eligibility issue, and the fix is bid strategy rather than the checklist above.",
        ],
      },
      {
        heading: "Give it time before concluding anything",
        body: [
          "New campaigns can take up to about 48 hours to begin serving consistently, and reporting itself lags. Judging a campaign a few hours after launch produces a lot of false alarms.",
        ],
      },
    ],
    related: ["negative-keywords-not-working", "how-to-check-keyword-indexing", "auto-vs-manual-campaigns"],
  },
  {
    slug: "negative-keywords-not-working",
    question: "Why are my negative keywords not working?",
    short:
      "Negatives usually are working — the traffic you are still seeing comes from close variants, from a different campaign that has no negatives applied, or from reporting lag. Negative exact only blocks that precise term, so plurals, misspellings and word-order changes still get through unless you use negative phrase.",
    category: "PPC",
    updated: "2026-08-15",
    image: {
      src: "/answers/negative-keywords-not-working.png",
      alt: "Checklist explaining why Amazon negative keywords look like they are not working: close variants, another campaign without negatives, reporting lag, and the limits of negative exact.",
      width: 1400,
      height: 689,
      caption: "Why traffic still appears after you negate.",
    },
    sections: [
      {
        heading: "The three real causes",
        body: [
          "Close variants: Amazon matches plurals, misspellings and small variations. A negative exact on one spelling leaves every variation live. Negative phrase catches the family.",
          "Wrong level or wrong campaign: a negative added to one ad group does not apply to the others, and the spend you are seeing may be coming from a completely different campaign targeting the same term.",
          "Reporting lag: search term data is delayed and sales are attributed up to 7 days after a click. Spend appearing today may have happened before the negative existed.",
        ],
      },
      {
        heading: "How to confirm which one it is",
        body: [
          "Pull the Search Term report and add the campaign and ad group columns. If the term appears under a campaign you did not negate, you have found it.",
          "If it appears under the same ad group but as a slightly different string, it is close variants, and the fix is negative phrase rather than negative exact.",
        ],
      },
    ],
    related: ["how-to-find-wasted-search-terms", "why-zero-impressions", "what-is-search-term-harvesting"],
  },
  {
    slug: "sudden-organic-rank-drop",
    question: "Why did my organic rank suddenly drop on Amazon?",
    short:
      "A sudden rank drop usually traces to one of five things: you went out of stock or lost the Buy Box, your conversion rate fell, you edited the listing and lost indexing for a term, a competitor increased sales velocity on that keyword, or you were hit by a suppression or compliance flag. Check availability and Buy Box first — they are the fastest to confirm and the most common.",
    category: "SEO",
    updated: "2026-08-15",
    image: {
      src: "/answers/sudden-organic-rank-drop.png",
      alt: "Checklist for diagnosing a sudden Amazon organic rank drop: stock and Buy Box, a fall in conversion rate, lost indexing after a listing edit, or a competitor's sales velocity.",
      width: 1400,
      height: 689,
      caption: "Check these first — fastest to confirm, most often the cause.",
    },
    sections: [
      {
        heading: "Check in this order",
        body: [
          "Stock and Buy Box. Going out of stock, even briefly, damages rank and recovery is not instant. Losing the Featured Offer has a similar effect.",
          "Listing edits. If you changed the title or backend terms, you may have dropped a keyword you were indexed for. Compare against a saved copy and re-check indexing.",
          "Conversion rate. If sessions held but conversion fell, something on the page changed — price, a new negative review, or a competitor undercutting you.",
          "Account health. Policy flags, suppressed listings and restricted claims can remove you from results without an obvious notification.",
        ],
      },
      {
        heading: "What not to do",
        body: [
          "Do not rewrite the whole listing in a panic. If an edit caused the drop, further edits make the cause impossible to isolate. Change one thing, then wait for re-indexing before changing another.",
        ],
      },
    ],
    related: ["how-amazon-ranking-works", "how-to-check-keyword-indexing", "why-did-my-acos-increase"],
  },
  {
    slug: "why-was-my-amazon-ad-rejected",
    question: "Why was my Amazon ad rejected?",
    short:
      "Most rejections come from ad copy rather than the product: superlatives and unsubstantiated claims such as best or number one, references to price or promotions, ALL CAPS or excessive punctuation, mention of shipping or guarantees, or medical and health claims. Sponsored Brands headlines are moderated far more strictly than Sponsored Products, which have no custom copy to reject.",
    category: "PPC",
    updated: "2026-08-15",
    image: {
      src: "/answers/why-was-my-amazon-ad-rejected.png",
      alt: "Checklist of the usual reasons an Amazon ad is rejected: superlatives, references to price or promotions, all caps and excessive punctuation, and shipping or health claims.",
      width: 1400,
      height: 689,
      caption: "Almost always the copy, not the product.",
    },
    sections: [
      {
        heading: "The usual offenders in headlines",
        body: [
          "Superlatives and rankings: best seller, number one, top rated. These need substantiation Amazon will not accept from you directly.",
          "Price and promotion language: sale, discount, free shipping, cheapest. Pricing is handled by the listing, not the ad copy.",
          "Formatting: all capitals, repeated exclamation marks, symbols used decoratively.",
          "Claims about health outcomes, safety or guarantees, which face the tightest moderation of all.",
        ],
      },
      {
        heading: "If you believe the rejection is wrong",
        body: [
          "Rejections are partly automated and false positives happen. Resubmit once with the copy tightened, and if it fails again open a case rather than repeatedly resubmitting the same text.",
          "Check the destination listing too. A suppressed or ineligible product can cause an ad rejection that reads as a copy problem.",
        ],
      },
    ],
    related: ["sponsored-products-brands-display", "why-zero-impressions", "brand-defense-amazon"],
  },
  {
    slug: "roas-vs-acos",
    question: "What is ROAS and how does it relate to ACOS?",
    short:
      "ROAS is revenue divided by ad spend; ACOS is ad spend divided by revenue. They are reciprocals of each other, so a 25% ACOS is a 4x ROAS and a 50% ACOS is a 2x ROAS. Convert between them with ROAS = 1 ÷ ACOS. Neither is better — Amazon reports ACOS by default, most other advertising platforms report ROAS.",
    category: "Metrics",
    updated: "2026-09-01",
    image: {
      src: "/answers/roas-vs-acos.png",
      alt: "ACOS is ad spend divided by sales and shows the share of revenue spent on ads; ROAS is sales divided by ad spend and shows the return on each advertising dollar. They are reciprocals: ROAS equals 1 divided by ACOS.",
      width: 1400,
      height: 688,
      caption: "The two metrics are reciprocals of each other.",
    },
    sections: [
      {
        heading: "How do ACOS and ROAS convert to each other?",
        body: [
          "Because they are reciprocals (ROAS = 1 ÷ ACOS), a small ACOS improvement at the low end is a large ROAS movement, which is why ROAS can look more dramatic in reporting.",
        ],
        table: {
          columns: ["ACOS", "ROAS", "Meaning"],
          rows: [
            ["10%", "10x", "Every $1 of ad spend returns $10 of sales"],
            ["20%", "5x", "Efficient — common target for established products"],
            ["25%", "4x", "A frequently cited healthy target"],
            ["33%", "3x", "Acceptable if margin is high enough"],
            ["50%", "2x", "Break-even for a ~50% margin product"],
            ["100%", "1x", "You spent exactly what you earned"],
          ],
          caption: "ACOS and ROAS are reciprocals — convert with ROAS = 1 ÷ ACOS.",
        },
      },
      {
        heading: "Which one should I manage against?",
        body: [
          "Use whichever your team reads without converting in their head. What matters is comparing it against your break-even, not which format you picked.",
          "If you run advertising outside Amazon, standardising on ROAS makes cross-channel comparison easier.",
        ],
      },
    ],
    related: ["what-is-a-good-acos-on-amazon", "acos-vs-tacos", "how-to-calculate-break-even-acos"],
  },
  {
    slug: "how-to-check-keyword-indexing",
    question: "How do I check if my listing is indexed for a keyword?",
    short:
      "Search Amazon for the exact keyword followed by your ASIN, for example: stainless steel water bottle B08XXXXXXX. If your product appears, you are indexed for that phrase. If nothing comes back, you are not indexed and no amount of advertising will make you rank organically for it.",
    category: "SEO",
    updated: "2026-08-15",
    image: {
      src: "/answers/how-to-check-keyword-indexing.png",
      alt: "Diagram of the Amazon indexing check: search Amazon for the exact keyword followed by your ASIN, and if your product appears you are indexed for that phrase.",
      width: 1400,
      height: 689,
      caption: "The one-search test for keyword indexing.",
    },
    sections: [
      {
        heading: "Why this test matters before anything else",
        body: [
          "Indexing is binary and it is the precondition for ranking. Sellers routinely spend months trying to rank for a phrase their listing does not contain anywhere.",
          "Run the test in the marketplace you are targeting, not just amazon.com, since indexing differs per marketplace.",
        ],
      },
      {
        heading: "If you are not indexed",
        body: [
          "Add the phrase naturally to the title, bullets or backend search terms, then re-test after Amazon has recrawled — usually a matter of days, not hours.",
          "Do not add it multiple times. Once indexed, repetition adds nothing and damages readability, which hurts the click-through and conversion half of ranking.",
        ],
      },
    ],
    related: ["how-amazon-ranking-works", "sudden-organic-rank-drop", "how-to-rank-on-page-one"],
  },
  {
    slug: "amazon-backend-search-terms",
    question: "How do Amazon backend search terms work, and what belongs in them?",
    short:
      "Backend search terms are a hidden field in Seller Central that adds keywords to a listing's search index without showing them to shoppers. They exist for the words a customer might type that do not fit naturally in the title, bullets or description — synonyms, alternative product names, materials, and use cases. They are not a second copy of your title: once a word is indexed anywhere on the listing, repeating it in the backend adds nothing to relevance.",
    category: "SEO",
    updated: "2026-08-17",
    image: {
      src: "/answers/amazon-backend-search-terms.png",
      alt: "Diagram of what belongs in Amazon backend search terms — synonyms, alternative product names, materials and use cases — versus what does not, such as words already indexed in the title.",
      width: 1400,
      height: 689,
      caption: "What belongs in the hidden field, and what is wasted there.",
    },
    sections: [
      {
        heading: "What the field actually does",
        body: [
          "Amazon builds its search index from the whole listing — title, bullets, description, A+ content where applicable, and the backend search terms field. The backend field is the only one of those the shopper never reads, which makes it the place for words you need indexed but would not want in your copy.",
          "That is its entire job. It makes you eligible to appear for a query. It does not push you up the results for that query — position is decided by click-through, conversion and sales velocity once you are eligible. Sellers who treat the backend field as a ranking lever rather than an indexing lever are disappointed by it every time.",
          "It also means the field is worthless in isolation. Getting indexed for a phrase you convert badly on produces impressions, a falling click-through rate, and no sales.",
        ],
      },
      {
        heading: "What belongs in it",
        body: [
          "Start with the words your listing does not already contain. Write out the title and bullets, list the search terms you want to be found for, and delete every word already present in that copy. What remains is your backend candidate list — that subtraction alone usually halves what sellers were about to paste in.",
          "The useful categories are consistent: genuine synonyms (a 'dog crate' shopper may search 'kennel'), regional word choices across marketplaces, materials and specifications, use cases and occasions, and the informal names customers actually use for the product when they are not using the industry term. Search-term reports from your own campaigns are the best source for this, because they show real queries that produced clicks rather than words you imagined.",
          "Leave out competitor brand names and trademarks — using them here is against Amazon's policy and puts the listing at risk for no ranking benefit. Also drop subjective claims like 'best' or 'cheapest', temporary phrases such as 'new' or a sale date, ASINs, and anything you would not defend to a compliance reviewer.",
        ],
      },
      {
        heading: "Formatting: what changes indexing and what does not",
        body: [
          "The field has a size limit that Seller Central enforces, and it is measured in bytes rather than characters — so accented and non-Latin characters consume more of it than plain Latin letters do. Check the limit shown in the field itself for your marketplace rather than trusting a figure quoted in a blog post, because it varies and it has changed over time. Reports differ on whether the overflow is truncated or the whole field is discarded; either way the words past the limit do nothing for you, so stay comfortably inside it.",
          "Amazon's guidance is to separate terms with spaces, not commas. There is no need to write phrases in the order a customer would type them — a query can be matched from words present across the listing — so 'stainless steel insulated water bottle' does not need to appear as a block if those words are already there individually. Repeating a word to build multiple phrases wastes the byte budget.",
          "Do not spend the space on plurals, minor misspellings, or the same stem in several forms; Amazon's search handles that kind of variation. Duplicating words already in your title is the single most common way sellers burn the entire field without adding one new indexed term.",
        ],
      },
      {
        heading: "How to prove it worked",
        body: [
          "Backend changes are invisible on the listing page, so the only honest verification is an index test: search Amazon for the exact phrase followed by your ASIN. If the product comes back, the phrase is indexed; if it does not, the words are not doing what you assumed. Re-test in each marketplace you sell in, because indexing is per-marketplace.",
          "Allow for recrawl time. A backend edit is not reflected immediately — treat a few days as normal before concluding a term failed to index, and re-run the same test rather than changing three things at once and losing track of which one worked.",
          "Keep a dated record of what the field contained before and after each edit. When rank or impressions shift weeks later, that record is the difference between knowing which change caused it and guessing.",
        ],
      },
    ],
    related: ["how-to-check-keyword-indexing", "how-amazon-ranking-works", "amazon-seo-vs-ppc-for-ranking"],
  },
  {
    slug: "how-much-does-an-amazon-ppc-agency-cost",
    question: "How much does an Amazon PPC agency cost?",
    short:
      "Amazon PPC agencies typically charge either a percentage of ad spend, commonly around 10–20%, or a flat monthly retainer that often falls in the low-to-mid four figures, sometimes with a performance component on top. The right question is not the headline fee but whether the efficiency gain exceeds it — at low ad spend it usually does not.",
    metaDescription:
      "Percentage of spend, flat retainer or hybrid — what each model really costs, and the spend level below which an agency cannot pay for itself.",
    category: "Strategy",
    updated: "2026-09-01",
    image: {
      src: "/answers/how-much-does-an-amazon-ppc-agency-cost.png",
      alt: "Three-column comparison of Amazon PPC agency pricing models: a percentage of ad spend, a flat monthly retainer, and a performance component on top.",
      width: 1400,
      height: 689,
      caption: "The three ways Amazon PPC agencies charge.",
    },
    sections: [
      {
        heading: "What are the three pricing models, and how do they compare?",
        body: [
          "Percentage of ad spend: simple, but it rewards the agency for spending more of your money, so check how that conflict is handled.",
          "Flat retainer: predictable, and does not penalise you for scaling. Usually banded by account size or ad spend.",
          "Retainer plus performance: a smaller base with an upside tied to an agreed metric. Make sure the metric is one you actually care about — growth in profit, not growth in attributed revenue.",
        ],
        table: {
          columns: ["Model", "Typical shape", "Best when", "What to watch"],
          rows: [
            ["% of ad spend", "Commonly around 10–20% of monthly ad spend", "Spend is stable and you want the fee to track the account", "It pays the agency to spend more of your money — ask how that conflict is handled"],
            ["Flat retainer", "Often low-to-mid four figures monthly, banded by account size", "You are scaling and do not want the fee to rise with every extra dollar spent", "Check what is actually included, and whether listing work sits inside or outside it"],
            ["Retainer + performance", "Smaller base plus an upside on an agreed metric", "Both sides want skin in the game", "Tie the upside to profit, not to attributed revenue — those two diverge fast"],
          ],
          caption: "Ranges are orientation, not quotes: fees move with marketplace, category, ASIN count and how much listing work is included.",
        },
      },
      {
        heading: "How do I work out whether the fee pays for itself?",
        body: [
          "If you spend $3,000 a month on ads, a 5-point ACOS improvement is worth about $150 a month, which does not cover any real retainer. At $30,000 a month the same improvement is worth $1,500 and the maths works.",
          "Ask what is included, what reporting looks like, whether you keep the campaign structure and keyword lists if you leave, and whether it is month-to-month after an initial period.",
        ],
      },
      {
        heading: "Ranges vary, so treat any number as a starting point",
        body: [
          "Fees differ by marketplace, category complexity, number of ASINs and how much of the listing work is included. Any figure quoted online, including here, is an orientation rather than a quote.",
        ],
      },
    ],
    related: ["do-i-need-an-amazon-agency", "what-reports-for-ppc-audit", "how-much-to-spend-on-amazon-ads"],
  },
  {
    slug: "how-many-clicks-before-pausing-keyword",
    question: "How many clicks with no sales before I pause a keyword?",
    short:
      "Base the threshold on your conversion rate, not on a fixed number. If you convert at 10%, a sale is expected around every 10 clicks, so roughly 20–30 clicks with no orders is a real signal rather than bad luck. The widely repeated rule of 10 clicks is too aggressive for most accounts and kills keywords that were merely unlucky.",
    category: "Metrics",
    updated: "2026-08-15",
    image: {
      src: "/answers/how-many-clicks-before-pausing-keyword.png",
      alt: "Diagram showing that the clicks needed before pausing an Amazon keyword should be two to three times your conversion rate, not a fixed count of ten.",
      width: 1400,
      height: 689,
      caption: "Base the threshold on your conversion rate.",
    },
    sections: [
      {
        heading: "Why a fixed rule misleads",
        body: [
          "At a 20% conversion rate, 10 clicks without a sale is unremarkable. At a 2% conversion rate, 10 clicks tells you almost nothing at all — you would expect roughly 50 clicks per sale.",
          "Take your expected clicks per sale as 1 ÷ conversion rate, then wait for about two to three times that before judging a keyword.",
        ],
      },
      {
        heading: "Consider spend, not just clicks",
        body: [
          "A term with 40 cheap clicks and no orders has cost you little. A term with 12 expensive clicks may already have cost more than a sale is worth. Sorting by spend rather than clicks finds the real damage faster.",
        ],
      },
      {
        heading: "Lower the bid before removing it",
        body: [
          "Pausing removes the data. Reducing the bid keeps the keyword alive at a price where it can still be profitable, which is often the better first move for a term you believe in.",
        ],
      },
    ],
    related: ["how-to-find-wasted-search-terms", "how-to-lower-acos", "what-is-a-good-conversion-rate-on-amazon"],
  },
  {
    slug: "do-i-need-an-amazon-agency",
    question: "Do I need an Amazon agency, or can I run PPC myself?",
    short:
      "You can run Amazon PPC yourself, and at low spend you probably should — the work is mostly disciplined weekly maintenance rather than secret knowledge. An agency becomes worth its fee when spend is high enough that a few points of ACOS exceed the retainer, or when the weekly cadence is not happening because nobody has time for it.",
    metaDescription:
      "The arithmetic that decides it: at what ad spend a few points of ACOS exceed a retainer, and what to check before signing anything.",
    category: "Strategy",
    updated: "2026-08-15",
    image: {
      src: "/answers/do-i-need-an-amazon-agency.png",
      alt: "Diagram comparing running Amazon PPC yourself at low spend against hiring an agency when spend is high enough that a few points of ACOS exceed the retainer.",
      width: 1400,
      height: 689,
      caption: "The deciding factor is spend level, not skill.",
    },
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
  {
    slug: "what-belongs-in-amazon-a-plus-content",
    question: "What actually belongs in Amazon A+ content?",
    short:
      "A+ content is the place to answer the questions that stop someone buying — sizing and fit, what is in the box, how it compares to the obvious alternative, and who it is not for. It replaces the plain description on brand-registered listings, and its job is conversion rather than discovery: the fields that reliably drive Amazon search are still the title, bullets, backend search terms and structured attributes, so A+ should be written for the shopper who has already arrived and is deciding.",
    category: "SEO",
    updated: "2026-08-24",
    image: {
      src: "/answers/what-belongs-in-amazon-a-plus-content.png",
      alt: "Checklist of what belongs in Amazon A+ content: sizing and fit, what is actually in the box, how it compares to the obvious alternative, and who the product is not for.",
      width: 1400,
      height: 689,
      caption: "The four questions A+ content should answer.",
    },
    sections: [
      {
        heading: "Write it against real objections, not features",
        body: [
          "The most common mistake is restating the bullets in larger type on a coloured background. The shopper has already read the bullets. If A+ repeats them, it adds a scroll and nothing else.",
          "The useful source material is your own returns and negative reviews. Every recurring complaint is an objection that A+ can answer before the purchase instead of after it — the sizing that runs small, the part that is sold separately, the surface it will not stick to. Answering those honestly costs you a few sales you would have refunded anyway and keeps the ones you would have lost to hesitation.",
          "Questions in the customer Q&A section are the second source. If the same question is asked repeatedly, the listing has failed to answer it and A+ is the place to fix that.",
        ],
      },
      {
        heading: "The comparison module earns its space",
        body: [
          "If you sell more than one variant or model, the comparison table is usually the highest-value module on the page. It moves shoppers to the right item instead of letting them guess and return the wrong one, and it keeps a browsing shopper inside your catalogue rather than sending them back to search.",
          "Choose the columns that actually decide the purchase. A table comparing five products on eight specifications is a wall; one comparing them on the two or three attributes people genuinely weigh is a decision aid.",
        ],
      },
      {
        heading: "Do not treat it as a keyword surface",
        body: [
          "Sources disagree on how much of A+ content Amazon indexes for its own search, and the position has shifted over time. Because the answer is contested, the safe strategy is to assume it does not help ranking and place every keyword you care about where indexing is not in question: the title, the bullets, the backend search terms and the structured attribute fields.",
          "If A+ text does turn out to contribute, you lose nothing by having written it for humans. If you invert that bet — stuffing A+ with keywords and neglecting the fields that certainly index — you lose either way, because keyword-stuffed A+ also converts worse.",
          "One thing that is worth doing regardless: fill in the image alt text on every module. It costs a minute, it is what screen readers announce, and it is the part of A+ most consistently reported to be read by crawlers.",
        ],
      },
      {
        heading: "Design constraints that matter more than they sound",
        body: [
          "Most Amazon traffic is on a phone, and modules stack vertically on a small screen. Text set inside an image does not reflow and frequently becomes unreadable. Keep words in the text fields wherever the module allows it, and treat any text baked into artwork as decorative.",
          "Put the strongest module first. A+ sits below the fold on a phone and engagement falls with every scroll, so the module answering the biggest objection should not be at the bottom.",
          "Amazon rejects A+ submissions for things that have nothing to do with quality — mentions of price or promotions, claims about shipping, contact details, competitor references, and unsubstantiated guarantees. Reading the current guidelines before designing is faster than redesigning after a rejection.",
        ],
      },
      {
        heading: "How to tell whether it worked",
        body: [
          "A+ affects conversion rate, so the measurement is the Business Report by ASIN: unit session percentage before and after publication, over enough weeks to see past normal variance, with ad spend and price held as steady as you can manage.",
          "Do not judge it on sales alone. If you publish A+ in the same fortnight you change price, add a coupon or scale a campaign, you will not know which one moved the number. Change one thing at a time or accept that the result is not attributable.",
        ],
      },
    ],
    related: ["how-to-rank-on-page-one", "amazon-backend-search-terms", "what-is-a-good-conversion-rate-on-amazon"],
  },
  {
    slug: "how-to-write-an-amazon-title",
    question: "How do I write an Amazon title that ranks and still converts?",
    short:
      "An Amazon title has to do two jobs at once: carry the words that make the listing eligible to appear in search, and tell a shopper scanning a results page what the product is and whether it suits them. Since 2026 the copy is split across two fields — an item name capped at 75 characters and an Item Highlights field of up to 125 more that displays beneath it — and Amazon has said both are inputs to search with neither prioritised. So the ordering is decided by the shopper, not the index: brand, the plain noun a customer would actually type, then the one or two attributes that distinguish this variation, keeping any phrase you rank for intact inside the 75 rather than broken across the boundary. Supporting detail — materials, compatibility, use cases — belongs in Item Highlights, written in readable fragments rather than as a keyword dump, because people read it too.",
    metaDescription:
      "The title has to earn the click and carry the keywords, now across two fields. How to order the 75 characters, and what belongs in Item Highlights.",
    category: "SEO",
    updated: "2026-09-01",
    sections: [
      {
        heading: "The two jobs pull in opposite directions",
        body: [
          "Indexing wants breadth. Every genuine phrase a customer might search is one you would like to be eligible for, and the title area is the strongest place on the listing to put one. Left to that logic alone, the ideal title is a keyword list.",
          "Conversion wants the opposite. A shopper reads titles in a results grid, several at a time, while comparing images and prices — a few words each, at speed. A title built as a keyword list reads as noise at that speed, so the shopper skips it and clicks the one they understood. Impressions rise and click-through falls, which is the worst trade available on Amazon: you have bought visibility with the one metric that decides whether visibility keeps being granted.",
          "The resolution is not a compromise between the two but an ordering. Position within the title does not appear to change whether a word is indexed; Amazon has stated that the item name and Item Highlights are both search inputs with neither prioritised over the other. Shoppers absolutely do weight by position. So the sequence that serves both jobs is decided entirely by the human: put what a person needs to make a decision first, and let the words that exist mainly for the index sit behind them.",
        ],
      },
      {
        heading: "Spend the item name in strict priority order",
        body: [
          "Seventy-five characters is roughly one short sentence, so the field only has room for what a buyer cannot choose without. The order that survives contact with a results page is brand, then the core product noun a shopper would actually type, then the one or two attributes that separate this variation from your others — colour, size, pack count.",
          "The plain noun matters more than it looks. Sellers frequently open with a marketing name or a model number, and someone scanning for a travel mug does not recognise Voyager 450 Thermal Vessel as the thing they are shopping for. Which attributes deserve the remaining space is category-specific and worth checking rather than guessing: look at the filters Amazon offers in the left rail of the results page for your category, because those are the attributes Amazon has already determined shoppers narrow by. In cables it is length and connector type; in supplements it is count and dosage; in apparel it is size and material.",
          "One rule overrides the rest. Keep the phrases you actually rank for and bid on intact and inside the item name, rather than letting one half sit in the title and the other in Item Highlights. Both fragments remain indexed, but whether a split phrase is matched identically to an intact one has not been confirmed, and the failure is silent — nothing errors and nothing is flagged, the listing simply competes a little differently. Where a phrase has to be rebuilt, evict something else to make room for it.",
          "Two tests catch most bad item names. Read it aloud and ask whether a stranger could say what the product is and who it is for. Then open a results page on a phone, find your listing, and read what is actually displayed rather than what you typed — if the visible portion ends mid-attribute or shows the brand and nothing useful, the ordering is wrong however complete the full string is.",
        ],
      },
      {
        heading: "Item Highlights is read by people, not just crawlers",
        body: [
          "The second field is not a hidden attribute like backend search terms. It renders beneath the item name on desktop and mobile, so anything written there is merchandising copy as well as index fodder. That rules out the obvious temptation to treat it as 125 more characters of keyword space.",
          "What belongs there is genuine supporting detail: materials and construction, compatibility, use cases and occasions, and secondary phrases that did not fit the item name. Write it as short attribute fragments separated by a visible divider rather than as prose or as a run-on string. Fragments survive being read on a phone at a glance; a paragraph does not, and a keyword dump actively signals a low-quality listing to the person deciding whether to click.",
          "There is a structural reason not to stay over the limit in the hope of keeping a long title. Item Highlights is generally only displayed when the item name is inside the character limit, so a non-compliant title does not preserve your old copy and win the new field as a bonus — it costs you the field. Media categories such as books, music and video sit outside these rules, and the authority for your own category is the current style guide in Seller Central and the field itself, not a figure quoted in an article.",
        ],
      },
      {
        heading: "What gets a title rewritten, suppressed or flagged",
        body: [
          "The content rules are a recognisable set: no promotional or pricing language such as free shipping, sale or best seller; no subjective superlatives; no contact details or URLs; no decorative symbols; and no typographic shouting such as a title set entirely in capitals. Requirements on capitalisation, and on whether units are spelled out or abbreviated, are set per category in the style guide.",
          "The consequence is not always a rejection you notice. Amazon may normalise a title programmatically, and a non-compliant title can be suppressed from search results while the detail page still loads perfectly for anyone holding the link. That failure mode is quiet and expensive: traffic falls, nothing on the page looks broken, and the seller spends a fortnight investigating bids. If organic impressions drop sharply after a listing edit, check compliance before anything else.",
          "Since the two-field change, there is a second way a title stops being yours. For listings over the limit Amazon has been generating its own split and publishing it if nobody reviews the suggestion in time, which means the live title may differ from the one you wrote without anything in your reports announcing it. Before rewriting anything, export your live titles and compare them against your intended copy — you cannot improve a title you are not actually looking at.",
          "Keep competitor brand names and trademarks out of both fields. It carries the same policy risk as putting them in the backend search terms, with the added problem of being visible to the brand owner.",
        ],
      },
      {
        heading: "How to tell whether a new title worked",
        body: [
          "A title change moves two different numbers and they need separate measurements. New words change what the listing is eligible for, which shows up as impressions and is verified with an index test: search the exact phrase followed by your ASIN and see whether the product comes back. Re-test after a few days rather than immediately, since a recrawl is not instant, and test the phrases you moved between fields rather than assuming they survived the move.",
          "The wording change moves click-through rate, and the fastest honest read on that is advertising, because a campaign delivers in days the impression volume organic search would take weeks to supply. Hold one campaign completely still — same keywords, same bids, same budget, same placements — and compare click-through before and after. The arithmetic is plain: 250 clicks on 10,000 impressions is 2.5%; if the same campaign returns 300 clicks on 10,000 impressions after the rewrite, that is 3.0%, a fifth more traffic at the same impression volume. Run that on your own account rather than accepting a claimed lift from anyone, including us.",
          "Change the title on its own. If you rewrite it in the same week you swap the main image, add a coupon or raise bids, the result is unattributable and you have spent the experiment for nothing. Record the previous item name and Item Highlights verbatim with the date before you edit, because reverting is the fastest fix if impressions fall and you will not remember the old string otherwise.",
        ],
      },
    ],
    related: ["amazon-backend-search-terms", "how-amazon-ranking-works", "how-to-check-keyword-indexing"],
  },
];

import { glossaryAnswers, comparisonAnswers } from "./answers-extra";

/** Single source consumed by routing, sitemap and schema. */
export const answers: Answer[] = [
  ...coreAnswers,
  ...glossaryAnswers,
  ...comparisonAnswers,
];

export const answerBySlug = (slug: string) => answers.find((a) => a.slug === slug);

export const categories = ["PPC", "SEO", "Metrics", "Strategy"] as const;
