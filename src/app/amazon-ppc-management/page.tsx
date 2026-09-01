import type { Metadata } from "next";
import { site } from "@/lib/site-config";
import { servicePages } from "@/lib/services-content";
import { ServiceDetail } from "@/components/site/service-page";

const data = servicePages["amazon-ppc-management"];

export const metadata: Metadata = {
  title: data.title,
  description: data.metaDescription,
  alternates: { canonical: `/${data.slug}/` },
  openGraph: {
    type: "website",
    title: data.title,
    description: data.metaDescription,
    url: `https://${site.domain}/${data.slug}/`,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "AMZ Savvy — Amazon PPC & SEO agency" }],
  },
  twitter: {
    card: "summary_large_image",
    title: data.title,
    description: data.metaDescription,
    images: ["/og.png"],
  },
};

export default function AmazonPpcManagementPage() {
  return <ServiceDetail data={data} />;
}
