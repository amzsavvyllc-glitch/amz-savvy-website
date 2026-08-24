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
  const lastModified = new Date("2026-08-15");

  return [
    { url: `${base}/`, lastModified, changeFrequency: "monthly", priority: 1 },
    // The entity page. High priority on purpose: it is the URL that resolves
    // "who is AMZ Savvy" for both Google and AI answer engines, and the
    // natural target for any inbound directory or profile link.
    {
      url: `${base}/about/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${base}/answers/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...answers.map((a) => ({
      url: `${base}/answers/${a.slug}/`,
      lastModified: new Date(a.updated),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    // Weekly changeFrequency on the index because a new post lands there first.
    {
      url: `${base}/blog/`,
      lastModified: posts[0] ? new Date(posts[0].date) : lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    ...posts.map((p) => ({
      url: `${base}/blog/${p.slug}/`,
      lastModified: new Date(p.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
