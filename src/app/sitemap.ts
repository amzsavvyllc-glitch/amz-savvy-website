import type { MetadataRoute } from "next";
import { answers } from "@/lib/answers";
import { posts } from "@/lib/blog";
import { site } from "@/lib/site-config";

/**
 * Generated from the content itself, so it can never drift out of sync the way
 * a hand-maintained sitemap.xml does. Replaces the old static public/sitemap.xml.
 */

// Required for `output: "export"` — metadata routes must be explicitly static.
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = `https://${site.domain}`;

  /**
   * Hand-maintained dates for the seven static routes.
   *
   * Everything else on this page reads its date from a content record
   * (`a.updated`, `p.date`). These seven pages are components, so there is no
   * record to read and the date has to be written down — which is why it can be
   * wrong, and was: a single shared `new Date("2026-08-15")` supplied lastmod
   * for all seven. Four of them did not exist until 2026-09-01, so the sitemap
   * dated them 17 days before they were created and before Google's previous
   * crawl of the site (2026-08-22). A crawler reading that concludes "nothing
   * has changed here", and all four are still recorded as never crawled.
   *
   * UPDATE THE ENTRY WHENEVER YOU CHANGE THE PAGE — including when you change a
   * shared component the page renders, since that changes its HTML too. Two
   * rules, both checkable against the comment on each line:
   *
   *   1. Never a date before the page first existed.
   *   2. Never a date in the future.
   */
  const staticLastModified = {
    "/": "2026-09-16", // created 2026-07-30
    "/about/": "2026-09-02", // created 2026-08-24
    "/services/": "2026-09-02", // created 2026-09-01
    "/amazon-ppc-management/": "2026-09-02", // created 2026-09-01
    "/amazon-seo/": "2026-09-02", // created 2026-09-01
    "/pricing/": "2026-09-02", // created 2026-09-01
    "/answers/": "2026-09-02", // created 2026-08-15
  } as const;

  // The answers index moves for two reasons: the page itself changes, or an
  // answer listed on it does. Take whichever is newer, so publishing or editing
  // an answer refreshes the index date without anyone remembering to.
  // (`answers` is ordered by topic, not by date, hence the max rather than [0].)
  const answersUpdated = answers.reduce<string>(
    (newest, a) => (a.updated > newest ? a.updated : newest),
    staticLastModified["/answers/"],
  );

  return [
    {
      url: `${base}/`,
      lastModified: new Date(staticLastModified["/"]),
      changeFrequency: "monthly",
      priority: 1,
    },
    // The entity page. High priority on purpose: it is the URL that resolves
    // "who is AMZ Savvy" for both Google and AI answer engines, and the
    // natural target for any inbound directory or profile link.
    {
      url: `${base}/about/`,
      lastModified: new Date(staticLastModified["/about/"]),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    // Commercial layer — the pages that earn impressions for high-intent terms.
    {
      url: `${base}/services/`,
      lastModified: new Date(staticLastModified["/services/"]),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${base}/amazon-ppc-management/`,
      lastModified: new Date(staticLastModified["/amazon-ppc-management/"]),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${base}/amazon-seo/`,
      lastModified: new Date(staticLastModified["/amazon-seo/"]),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${base}/pricing/`,
      lastModified: new Date(staticLastModified["/pricing/"]),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/answers/`,
      lastModified: new Date(answersUpdated),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    // `images` emits <image:image> entries, which is how Google Images finds
    // a diagram that lives on a page it has already crawled. Without them the
    // images are discoverable only by re-parsing the HTML.
    ...answers.map((a) => ({
      url: `${base}/answers/${a.slug}/`,
      lastModified: new Date(a.updated),
      changeFrequency: "monthly" as const,
      priority: 0.8,
      ...(a.image && { images: [`${base}${a.image.src}`] }),
    })),
    // Weekly changeFrequency on the index because a new post lands there first.
    {
      url: `${base}/blog/`,
      lastModified: new Date(
        posts[0] ? posts[0].date : staticLastModified["/"],
      ),
      changeFrequency: "weekly" as const,
      priority: 0.9,
      // Every card image appears on this page, so they belong on this entry.
      images: posts.flatMap((p) => (p.image ? [`${base}${p.image.src}`] : [])),
    },
    ...posts.map((p) => ({
      url: `${base}/blog/${p.slug}/`,
      lastModified: new Date(p.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
      ...(p.image && { images: [`${base}${p.image.src}`] }),
    })),
  ];
}
