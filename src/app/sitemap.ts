import type { MetadataRoute } from "next";
import { answers } from "@/lib/answers";
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
  ];
}
