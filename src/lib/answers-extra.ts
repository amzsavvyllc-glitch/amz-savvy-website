import type { Answer } from "./answers";

/**
 * GLOSSARY + COMPARISON pages.
 *
 * Kept in a separate file purely to keep answers.ts readable — these are
 * concatenated into the single `answers` export, so routing, sitemap and
 * schema all pick them up with no further wiring.
 *
 * Same honesty rule as answers.ts: mechanism and method, no invented
 * statistics. Platform limits are stated only where Amazon documents them.
 */

export const glossaryAnswers: Answer[] = [
  {
    slug: "what-is-the-buy-box",
    question: "What is the Buy Box (Featured Offer) on Amazon?",
    short:
      "The Buy Box — now officially called the Featured Offer — is the box on a product page containing the Add to Cart button, and it determines which seller receives the sale when several sellers list the same ASIN. Amazon awards it on price, fulfilment method, delivery speed, stock position and seller performance. It matters to advertisers because Sponsored Products generally will not serve for an ASIN where you do not hold the Featured Offer.",
    category: "PPC",
    updated: "2026-08-16",
    sections: [
      {
        heading: "How it is awarded",
        body: [
          "Amazon does not publish the weighting, but the inputs are well established: landed price including delivery, fulfilment method (FBA and Prime-eligible offers are advantaged), delivery speed, stock availability, and seller performance measures such as order defect rate.",
          "On a listing with a single seller the Featured Offer is normally yours by default. It can still be suppressed — usually when Amazon judges the price uncompetitive against the same product sold elsewhere.",
        ],
      },
      {
        heading: "Why it decides whether your ads run",
        body: [
          "Losing the Featured Offer typically stops Sponsored Products serving on that ASIN while the campaign continues to look perfectly healthy in the console. Impressions fall away with no error and no obvious cause.",
          "It also suppresses conversion sharply when ads do serve, which surfaces later as an unexplained ACOS spike. Checking Buy Box percentage is the cheapest first move in almost any sudden-performance investigation.",
        ],
      },
    ],
    related: ["why-zero-impressions", "why-did-my-acos-increase", "sudden-organic-rank-drop"],
  },
  {
    slug: "what-is-dayparting",
    question: "What is dayparting in Amazon PPC?",
    short:
      "Dayparting means varying bids or budgets by hour of day and day of week, so spend concentrates in the periods that convert and eases off in the periods that do not. It is only worth doing once you have enough hourly data to show a genuine repeating pattern rather than noise. Amazon's console offers scheduled budget rules rather than true hour-by-hour bid control, so most real dayparting runs through the Advertising API or third-party software.",
    metaDescription:
      "Dayparting shifts bids by hour and day. When it is worth setting up, when it quietly costs you sales, and how to tell which applies to you.",
    category: "PPC",
    updated: "2026-08-16",
    sections: [
      {
        heading: "The evidence you need first",
        body: [
          "Standard console reports are daily. Establishing an hourly pattern means collecting data through the Advertising API, or a tool that polls it, over enough weeks that a weekday-evening effect can be distinguished from one good Tuesday.",
          "Beware attribution when reading hourly data. A sale is credited to the click that caused it, which may have happened hours or days earlier, so hourly conversion patterns are blurrier than they look.",
        ],
      },
      {
        heading: "When it is worth the effort",
        body: [
          "Dayparting pays off mainly on large accounts with high spend concentration and a clear behavioural pattern — B2B products bought in office hours, or categories with pronounced evening browsing.",
          "On a small account it is usually the wrong priority. Wasted search terms, poor structure and a weak listing cost far more, and they are fixable with data you already have.",
        ],
      },
    ],
    related: ["what-is-a-bid-strategy", "how-much-to-spend-on-amazon-ads", "what-is-a-placement-modifier"],
  },
  {
    slug: "negative-exact-and-negative-phrase",
    question: "What do negative exact and negative phrase mean?",
    short:
      "Negative exact blocks one precise search term and nothing else. Negative phrase blocks any search containing that word or sequence of words in that order, so it removes a whole family of searches at once. Use negative exact for individual proven losers, and negative phrase for entire categories of wrong intent — but check what else a phrase would catch before applying it.",
    category: "PPC",
    updated: "2026-08-16",
    sections: [
      {
        heading: "What each one actually blocks",
        body: [
          "Negative exact on 'dog bowl stand' stops that search alone. 'Dog bowl stands', 'stand for dog bowl' and 'dog bowls stand' all remain live, and in practice sellers regularly see those near-variants continue to spend.",
          "Negative phrase on 'stand' stops every search containing the word stand, in any surrounding wording. That is what you want if stands are not your product, and exactly what you do not want if 'water bottle that stands upright' is one of your converters.",
        ],
      },
      {
        heading: "Where to apply them",
        body: [
          "A negative applied at ad group level covers only that ad group. Campaign-level negatives cover every ad group in that campaign.",
          "If spend on a term continues after negation, the most common explanation is that it is coming from a different campaign entirely.",
        ],
      },
    ],
    related: ["how-to-find-wasted-search-terms", "negative-keywords-not-working", "what-is-a-close-variant"],
  },
  {
    slug: "what-is-a-placement-modifier",
    question: "What is a placement modifier in Amazon PPC?",
    short:
      "A placement modifier is a percentage increase applied to your bid for a specific ad placement — Top of Search, Product Pages, or Rest of Search. Amazon allows increases of up to 900%, applied on top of your keyword bid, so a 50% modifier turns a $1.00 bid into $1.50 for that placement. Modifiers only go upwards, so the way to spend less in a weak placement is to lower the base bid and raise the modifier on the placement that performs.",
    category: "PPC",
    updated: "2026-08-16",
    sections: [
      {
        heading: "Why placements differ so much",
        body: [
          "Top of Search usually costs more per click and often converts better, because it sits above the fold on a page of active search intent. Whether the premium is justified is an account-level question, not a universal one.",
          "Product Pages traffic behaves differently — the shopper is already looking at something specific, so relevance to that listing matters more than keyword relevance. It frequently carries hidden waste in accounts that have never reviewed placement data.",
        ],
      },
      {
        heading: "How it stacks with bid strategy",
        body: [
          "The placement modifier is applied to your bid first, and the campaign bid strategy adjusts from there. With dynamic bids up and down, a large modifier and an aggressive strategy can compound into a considerably higher final bid than the number you typed.",
          "Change one at a time, and give each change enough clicks to read before making the next.",
        ],
      },
    ],
    related: ["what-is-a-bid-strategy", "how-to-lower-acos", "what-is-impression-share"],
  },
  {
    slug: "what-is-new-to-brand",
    question: "What does new-to-brand (NTB) mean in Amazon advertising?",
    short:
      "New-to-brand metrics count the orders and sales that came from customers who had not bought anything from your brand on Amazon in the previous twelve months. They separate genuine customer acquisition from repeat purchases, which matters because a campaign with an unremarkable ACOS can be the most valuable in the account if most of its orders are new customers.",
    metaDescription:
      "NTB counts orders from customers who had not bought your brand on Amazon in the past year. Here is what it tells you, and where it misleads.",
    category: "Metrics",
    updated: "2026-08-16",
    sections: [
      {
        heading: "What it corrects for",
        body: [
          "Branded campaigns and retargeting tend to show flattering ACOS because they reach people who already know you. NTB exposes how much of that performance is acquisition and how much is buying back customers you already had.",
          "The mirror image is also useful: a campaign with a high ACOS but a high proportion of new-to-brand orders is buying future repeat purchases, which the ACOS alone will never show.",
        ],
      },
      {
        heading: "The limits of the definition",
        body: [
          "The twelve-month window is Amazon's, and it is measured on your brand within Amazon only. Someone who bought from your own website last week counts as new-to-brand here.",
          "It also cannot see profitability. A high NTB rate justifies a higher acquisition cost only if those customers come back, which is a question for your repeat-purchase data rather than the ads console.",
        ],
      },
    ],
    related: ["acos-vs-tacos", "sponsored-products-brands-display", "brand-defense-amazon"],
  },
  {
    slug: "what-is-share-of-voice",
    question: "What is share of voice on Amazon?",
    short:
      "Share of voice is the proportion of the advertising or search real estate for a given keyword that your brand occupies, relative to everyone else competing for it. Amazon does not publish a single share-of-voice figure, so any number you see is derived — either from Amazon's impression share reporting, or from third-party tools that scrape search results and count placements. Treat a specific percentage as the output of one method rather than a fact from Amazon.",
    category: "Metrics",
    updated: "2026-08-16",
    sections: [
      {
        heading: "The two ways it gets calculated",
        body: [
          "Impression-based: what proportion of the impressions available for a search term your ads received. This comes from Amazon's own reporting and is the more defensible, because the denominator is Amazon's.",
          "Placement-based: a tool searches the keyword on a schedule and counts how many visible slots belong to your brand. Useful and visual, but the result depends entirely on how often, from where, and on which device the tool searched.",
        ],
      },
      {
        heading: "How to use it without misleading yourself",
        body: [
          "Most useful as a trend on a small set of priority keywords, tracked with one consistent method. Comparing a figure from one tool against another tells you about the tools, not the market.",
          "It is a means, not an end. A rising share of voice on a keyword that does not convert is simply a more expensive way of not selling anything.",
        ],
      },
    ],
    related: ["what-is-impression-share", "how-to-rank-on-page-one", "brand-defense-amazon"],
  },
  {
    slug: "what-is-a-close-variant",
    question: "What is a close variant in Amazon advertising?",
    short:
      "A close variant is a version of your keyword that Amazon treats as effectively the same search — singulars and plurals, common misspellings, changes in word order, and stemmed forms. Close variant matching applies to exact match too, which is why an exact-match keyword still picks up search terms that are not literally identical to it, and why your Search Term report never lines up with your keyword list one for one.",
    category: "PPC",
    updated: "2026-08-16",
    sections: [
      {
        heading: "Why exact match is not literal",
        body: [
          "Exact match means exact intent, not exact string. Amazon's reasoning is that 'water bottle' and 'water bottles' are the same shopper, and forcing advertisers to enumerate every spelling would produce worse matching.",
          "The practical consequence is that you should read the search term column, not the keyword column, when judging what you actually bought.",
        ],
      },
      {
        heading: "Where it causes problems",
        body: [
          "Negation is the main one. A negative exact on a single spelling frequently leaves the variants running, which is why phrase-level negation is the reliable fix for a family of unwanted searches.",
          "Harvesting is the other. Promote a term to exact and negate only that precise string in the discovery campaign, and the variants can keep serving there, competing with the exact campaign you just built.",
        ],
      },
    ],
    related: ["negative-exact-and-negative-phrase", "negative-keywords-not-working", "search-term-vs-keyword"],
  },
  {
    slug: "search-term-vs-keyword",
    question: "What is a search term, and how is it different from a keyword?",
    short:
      "A keyword is what you bid on; a search term is what the shopper actually typed into Amazon. Amazon matches search terms to your keywords according to the match type you selected, so a single broad keyword can collect hundreds of different search terms. Optimisation happens on the search term side — reading what you actually paid for, then deciding which terms deserve their own keyword and which deserve a negative.",
    category: "PPC",
    updated: "2026-08-16",
    sections: [
      {
        heading: "A concrete example",
        body: [
          "You bid on the broad keyword 'water bottle'. The search terms you pay for might include 'insulated water bottle 1l', 'water bottle for kids', 'water bottle cleaning brush' and a competitor brand name. Only some are your product.",
          "Judging that keyword on its blended ACOS hides everything. It may look mediocre while containing two excellent search terms and six that should never have been bought.",
        ],
      },
      {
        heading: "Why the distinction drives the whole workflow",
        body: [
          "Every core PPC routine sits on this split. Harvesting promotes profitable search terms into keywords. Negation blocks unprofitable ones from matching again. Neither is possible from keyword-level reporting alone.",
          "The Sponsored Products Search Term report is where the two columns appear side by side. It is the single most useful export in the account.",
        ],
      },
    ],
    related: ["what-is-search-term-harvesting", "how-to-find-wasted-search-terms", "broad-vs-phrase-vs-exact-match"],
  },
  {
    slug: "what-is-impression-share",
    question: "What is impression share in Amazon advertising?",
    short:
      "Impression share is the percentage of the impressions available for a search term that your ads actually received. A low share on a keyword that converts profitably means there is volume you are not buying, usually because your bid or your daily budget takes you out of the auction. Amazon exposes this for brand-registered sellers, including a separate figure for the top-of-search placement.",
    category: "Metrics",
    updated: "2026-08-16",
    sections: [
      {
        heading: "What it tells you that ACOS cannot",
        body: [
          "ACOS describes the efficiency of what you bought. Impression share describes the size of what you did not buy. A keyword at 15% ACOS and 12% impression share is not a success story — it is a keyword you are barely present on.",
          "Profitable keyword plus low impression share is the highest-confidence case available for raising a bid or lifting a budget cap.",
        ],
      },
      {
        heading: "Reading it honestly",
        body: [
          "Low share can come from bid, from budget exhausting early in the day, or from relevance. Check budget first — a campaign that stops delivering at midday shows poor impression share no matter what you bid.",
          "High impression share is not automatically good either. Owning nearly all impressions on a term that converts badly means you have cornered a market you did not want.",
        ],
      },
    ],
    related: ["what-is-a-placement-modifier", "what-is-share-of-voice", "how-much-to-spend-on-amazon-ads"],
  },
  {
    slug: "what-is-a-bid-strategy",
    question: "What is a bid strategy in Amazon PPC?",
    short:
      "Amazon offers three campaign bid strategies. Dynamic bids down only lowers your bid in real time when a click looks less likely to convert. Dynamic bids up and down does the same but will also raise your bid — by up to 100% for top-of-search and up to 50% for other placements — when a conversion looks likely. Fixed bids use the bid exactly as entered, with no automatic adjustment in either direction.",
    category: "PPC",
    updated: "2026-08-16",
    sections: [
      {
        heading: "What each one is for",
        body: [
          "Down only is the conservative default. It cannot overspend relative to your stated bid, which makes it sensible for a new campaign, an untested keyword set, or any account where control matters more than volume.",
          "Up and down chases conversions and can raise your effective cost per click substantially. It belongs on campaigns with proven exact-match terms and a known conversion rate — not on discovery campaigns.",
          "Fixed bids remove Amazon's judgement entirely, which is mainly useful when running a deliberate test and the bid must be the one variable that is not moving.",
        ],
      },
      {
        heading: "Testing it properly",
        body: [
          "Changing bid strategy changes which auctions you win, so the search term mix changes with it. Give any change enough time to accumulate meaningful clicks, and do not change bids in the same week if you want a readable result.",
        ],
      },
    ],
    related: ["what-is-a-placement-modifier", "how-many-clicks-before-pausing-keyword", "how-to-lower-acos"],
  },
];

export const comparisonAnswers: Answer[] = [
  {
    slug: "broad-vs-phrase-vs-exact-match",
    question: "Broad vs phrase vs exact match — which should I use?",
    short:
      "Use all three, for different jobs, rather than choosing one. Broad match casts wide and belongs on a capped discovery budget; phrase match narrows to searches containing your keyword in order; exact match targets that search intent alone and is where proven converters and the bulk of your spend belong. The standard flow is broad and automatic campaigns to discover terms, exact to scale them, with negatives stopping the layers bidding against each other.",
    category: "PPC",
    updated: "2026-08-16",
    sections: [
      {
        heading: "What does each match type actually do?",
        body: [
          "Broad matches searches related to your keyword, including terms with additional or reordered words and related concepts. It is the loosest, and produces useful and wasteful terms in roughly equal measure.",
          "Phrase matches searches containing your keyword as a sequence, with words allowed before and after. It is the middle ground and often the most neglected of the three.",
          "Exact matches that search and its close variants only, giving you direct control of the bid on one intent.",
        ],
        table: {
          columns: ["Match type", "Matches", "Control", "Where it belongs"],
          rows: [
            ["Broad", "Related searches, reordered or extra words, related concepts", "Loosest", "Capped discovery budget"],
            ["Phrase", "Searches containing your keyword in order", "Middle ground", "Discovery, then scaling proven terms"],
            ["Exact", "That search and its close variants only", "Tightest", "Proven converters and the bulk of spend"],
          ],
          caption: "The standard flow: broad and automatic discover terms, exact scales them, negatives keep the layers from bidding against each other.",
        },
      },
      {
        heading: "What is the costliest match-type mistake?",
        body: [
          "Running the same keyword in broad, phrase and exact without negating it downwards means your own campaigns compete in the same auction. You pay more for a click you were going to win anyway. Once a term is in exact, negate it in the looser layers.",
        ],
      },
    ],
    related: ["what-is-search-term-harvesting", "auto-vs-manual-campaigns", "search-term-vs-keyword"],
  },
  {
    slug: "keyword-vs-product-targeting",
    question: "Keyword targeting vs ASIN/product targeting — which should I use?",
    short:
      "Keyword targeting reaches shoppers by what they type; product targeting reaches them by what they are already looking at. Keyword targeting should be the primary engine for most accounts because search intent is explicit and measurable. Product targeting earns its place in two specific jobs: placing your ad on competitor listings you can beat on price, rating or format, and defending your own detail pages against competitors doing the same to you.",
    category: "PPC",
    updated: "2026-08-16",
    sections: [
      {
        heading: "How do keyword and product targeting compare?",
        body: [
          "Attacking a specific weaker competitor. If you have an advantage a shopper can see from the ad — better rating, more units, a stronger price — appearing on that listing is a direct comparison.",
          "Defending your own pages, which is usually cheap because your relevance on your own listing is high.",
          "Complementary products: targeting the item your product pairs with reaches a shopper mid-purchase, often better intent than a generic keyword.",
        ],
        table: {
          columns: ["", "Keyword targeting", "Product / ASIN targeting"],
          rows: [
            ["Reaches shoppers by", "What they type into search", "What they are already looking at"],
            ["Role in the account", "Primary engine for most accounts", "Tactical — attack and defend"],
            ["Strongest at", "Explicit, measurable search intent", "Beating weaker listings on price, rating or format; defending your own"],
            ["Weakest at", "Reaching browsers not yet searching", "Beating stronger competitors; untuned category targeting"],
          ],
        },
      },
      {
        heading: "Where does product targeting disappoint?",
        body: [
          "Category targeting with broad refinements behaves much like an untuned automatic campaign — many impressions across thousands of ASINs, most irrelevant. It needs the same negation discipline, applied to ASINs.",
          "Targeting stronger competitors rarely works. If the listing you appear on has more reviews and a better price, you are paying to advertise their product to their shopper.",
        ],
      },
    ],
    related: ["brand-defense-amazon", "broad-vs-phrase-vs-exact-match", "sponsored-products-brands-display"],
  },
  {
    slug: "sponsored-display-vs-amazon-dsp",
    question: "Sponsored Display vs Amazon DSP — which should I use?",
    short:
      "Sponsored Display sits inside the normal Amazon Ads console, is self-service, has no meaningful spend floor, and is best used for retargeting and defending your own listings. Amazon DSP is a full programmatic platform with far wider inventory and deeper audience targeting, but it carries substantially higher minimum commitments that are negotiated case by case, and generally needs an agency or an Amazon account team. Sponsored Display is the sensible starting point.",
    category: "PPC",
    updated: "2026-08-16",
    sections: [
      {
        heading: "How do Sponsored Display and DSP compare?",
        body: [
          "Published figures for DSP minimums contradict each other and vary by market, by whether the seat is managed or self-service, and by the individual agreement. Anyone quoting a single universal number is guessing.",
          "Ask Amazon or a partner for the commitment that applies to your market and setup, and treat any figure you read online — including here — as no substitute for that conversation.",
        ],
        table: {
          columns: ["", "Sponsored Display", "Amazon DSP"],
          rows: [
            ["Access", "Self-service, normal Ads console", "Programmatic platform, usually agency or account-team managed"],
            ["Minimum spend", "No meaningful floor", "Substantial, negotiated case by case"],
            ["Inventory", "Amazon plus limited off-Amazon", "Far wider, on and off Amazon"],
            ["Best used for", "Retargeting and defending your listings", "Upper-funnel reach and retention"],
          ],
          caption: "Sponsored Display is the sensible starting point; DSP earns its place once search is already efficient.",
        },
      },
      {
        heading: "Which should I start with?",
        body: [
          "DSP is an upper-funnel and retention instrument. Buying it while your Sponsored Products account still contains obvious wasted spend means paying premium rates for reach you cannot yet convert efficiently.",
          "Get search working first. When Sponsored Products is efficient and additional search spend has stopped producing proportional sales, that is when DSP has something to add.",
        ],
      },
    ],
    related: ["sponsored-products-brands-display", "how-much-to-spend-on-amazon-ads", "what-is-new-to-brand"],
  },
  {
    slug: "search-term-report-vs-search-query-performance",
    question: "Search Term Report vs Search Query Performance — which should I use?",
    short:
      "The Search Term report shows only the searches your ads paid for, with clicks, spend and orders per term, which makes it the tool for cutting waste and harvesting winners. Search Query Performance, in Brand Analytics, shows the whole marketplace funnel for a query — impressions, clicks, cart adds and purchases — alongside your brand's share of each, covering organic as well as paid. Use the first to manage campaigns and the second to see how much of a query you are actually winning.",
    metaDescription:
      "Two reports, two different questions. Which one answers what, and why the numbers in them will never quite agree.",
    category: "Strategy",
    updated: "2026-08-16",
    sections: [
      {
        heading: "What does each report actually measure?",
        body: [
          "The Search Term report's universe is your own ad spend. It cannot tell you how big a query is, only what you bought of it — exactly right for deciding what to negate and what to promote.",
          "Search Query Performance's universe is the query across the marketplace. It answers whether a term is worth pursuing at all, and where in the funnel you are losing.",
        ],
        table: {
          columns: ["", "Search Term Report", "Search Query Performance"],
          rows: [
            ["Universe", "Only searches your ads paid for", "The whole marketplace for a query"],
            ["Shows", "Clicks, spend and orders per term", "Impressions, clicks, cart adds, purchases and your brand's share"],
            ["Covers", "Paid only", "Paid and organic"],
            ["Use it to", "Cut waste and harvest winners", "See how much of a query you are actually winning"],
            ["Lives in", "Advertising reports", "Brand Analytics"],
          ],
        },
      },
      {
        heading: "How do I use them together?",
        body: [
          "Search Query Performance identifies which queries are large and where your share is weak; the Search Term report tells you what your ads are currently doing about them.",
          "A query where your click share is high but purchase share is low is a conversion problem, and no amount of bidding will fix it. That diagnosis is only visible when you read the two against each other.",
        ],
      },
    ],
    related: ["what-reports-for-ppc-audit", "how-to-find-wasted-search-terms", "what-is-impression-share"],
  },
  {
    slug: "amazon-seo-vs-ppc-for-ranking",
    question: "Amazon SEO vs Amazon PPC for ranking — which should I use?",
    short:
      "They are not alternatives. Amazon SEO decides whether you can rank for a keyword; PPC influences whether you do. SEO is indexing and relevance — if a phrase is nowhere in your title, bullets or backend terms, no budget will make you rank organically for it. PPC contributes the sales velocity and conversion history Amazon uses as evidence once you are indexed, which is why the listing work comes first.",
    category: "SEO",
    updated: "2026-08-16",
    sections: [
      {
        heading: "Why does the dependency run one way?",
        body: [
          "Indexing is binary and it is a precondition. Advertising on a keyword your listing does not contain can still produce ad sales, but it will not build the organic position you are paying to build.",
          "Conversion rate is the shared variable. It lowers ACOS on every keyword and strengthens your organic position for the terms you convert on. It is the only change that works on both sides at once.",
        ],
        table: {
          columns: ["", "Amazon SEO", "Amazon PPC"],
          rows: [
            ["Decides", "Whether you can rank (indexing + relevance)", "Whether you do (sales velocity + conversion history)"],
            ["Order", "Comes first", "Contributes once you are indexed"],
            ["Cannot", "Manufacture sales velocity", "Manufacture relevance or rank that persists after you stop paying"],
            ["Shared lever", "Conversion rate lifts both at once", "Conversion rate lifts both at once"],
          ],
        },
      },
      {
        heading: "What can each not do on its own?",
        body: [
          "SEO cannot manufacture velocity. A perfectly optimised listing with no sales history will not overtake an established competitor on a competitive head term by wording alone.",
          "PPC cannot manufacture relevance. Sustained spend on a term you are not indexed for buys placements for as long as you keep paying, and nothing that persists when you stop.",
        ],
      },
    ],
    related: ["how-amazon-ranking-works", "how-to-check-keyword-indexing", "how-to-rank-on-page-one"],
  },
  {
    slug: "agency-vs-in-house-vs-ppc-software",
    question: "Agency vs in-house vs PPC software — which should I use?",
    short:
      "PPC software automates rules such as bid changes and negation, but it does not choose a strategy and still needs someone to configure and review it. In-house is the cheapest option and the right one when somebody genuinely has the weekly hours. An agency earns its fee when spend is high enough that a few points of ACOS exceed the retainer, or when the weekly maintenance simply is not happening. Run the arithmetic on your own spend before deciding.",
    category: "Strategy",
    updated: "2026-08-16",
    sections: [
      {
        heading: "How do the three options compare?",
        body: [
          "Software executes rules quickly and consistently at a scale a person cannot match — adjusting hundreds of bids, applying negatives, acting on thresholds. That is real value on a large keyword set.",
          "It does not decide which keywords matter, whether your break-even is right, or whether the listing is the actual problem. Rules applied to a badly structured account automate the wrong decisions faster.",
        ],
        table: {
          columns: ["", "PPC software", "In-house", "Agency"],
          rows: [
            ["Best when", "A large keyword set needs fast, consistent rule execution", "Someone genuinely has the weekly hours", "Spend is high enough that a few ACOS points beat the retainer"],
            ["Sets strategy", "No — executes rules only", "Yes, if the skill exists in-house", "Yes"],
            ["Main cost", "Subscription plus configuration time", "Time and weekly discipline", "Retainer"],
            ["Main risk", "Automates the wrong decisions faster", "The cadence lapsing", "Paying a fee before spend justifies it"],
          ],
          caption: "Run the arithmetic on your own spend before deciding — the right answer changes with account size.",
        },
      },
      {
        heading: "What is the hidden cost of in-house?",
        body: [
          "The work is mostly disciplined weekly maintenance — search term review, negation, harvesting, bid adjustments. It is learnable, and most sellers can do it.",
          "The failure mode is not incompetence, it is the cadence lapsing. An account maintained for two months then left alone for a quarter performs worse than one on a modest but unbroken routine. Be honest about whether the time exists.",
        ],
      },
    ],
    related: ["do-i-need-an-amazon-agency", "how-much-does-an-amazon-ppc-agency-cost", "what-reports-for-ppc-audit"],
  },
];
