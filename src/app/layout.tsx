import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import { site, profiles, services } from "@/lib/site-config";
import "./globals.css";

/* Montserrat = brand display face. Inter = body (Montserrat is poor at
   long reading lengths). Pairing follows Pro Max "Modern Professional". */
const montserrat = Montserrat({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});


const description =
  "AMZ Savvy is an Amazon Ads Verified Partner running SEO, PPC, launches and ranking for Amazon brands. Get a free audit that shows exactly where your ad spend is leaking.";

export const metadata: Metadata = {
  metadataBase: new URL(`https://${site.domain}`),
  title: {
    default: "AMZ Savvy — Amazon PPC & SEO Agency | Amazon Ads Verified Partner",
    template: "%s | AMZ Savvy",
  },
  description,
  keywords: [
    "Amazon PPC agency",
    "Amazon SEO",
    "Amazon advertising management",
    "Amazon Ads Verified Partner",
    "ACOS reduction",
    "Amazon product launch",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: `https://${site.domain}`,
    title: "AMZ Savvy — Amazon PPC & SEO Agency",
    description,
    siteName: site.name,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "AMZ Savvy — Amazon PPC & SEO agency" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AMZ Savvy — Amazon PPC & SEO Agency",
    description,
    images: ["/og.png"],
  },
  robots: { index: true, follow: true },
};

/** Structured data: helps both Google and AI search engines quote the site. */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": `https://${site.domain}/#org`,
      name: site.name,
      alternateName: "AMZ Savvy LLC",
      description,
      email: site.email,
      url: `https://${site.domain}`,
      slogan: site.tagline,
      areaServed: "Worldwide",
      // Entity linking. Empty until real profiles exist — see site-config.ts.
      ...(profiles.length > 0 ? { sameAs: profiles } : {}),
      knowsAbout: [
        "Amazon PPC",
        "Amazon Advertising",
        "Sponsored Products",
        "Sponsored Brands",
        "Sponsored Display",
        "ACOS optimization",
        "TACOS",
        "Amazon SEO",
        "Amazon keyword ranking",
        "Amazon product launch",
      ],
      serviceType: [
        "Amazon PPC Management",
        "Amazon SEO",
        "Amazon Product Launch",
        "Amazon Ranking",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Amazon growth services",
        itemListElement: services.map((s) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: s.title,
            description: s.tagline,
            provider: { "@id": `https://${site.domain}/#org` },
          },
        })),
      },
    },
    {
      "@type": "WebSite",
      "@id": `https://${site.domain}/#website`,
      url: `https://${site.domain}`,
      name: site.name,
      publisher: { "@id": `https://${site.domain}/#org` },
    },
  ],
};
/* NOTE: the homepage FAQPage schema deliberately lives in app/page.tsx, not
   here. Emitting it from the layout put it on every route, so each answer page
   claimed to contain the homepage's FAQs — inaccurate markup that dilutes the
   page's real QAPage entity. Only site-wide entities belong in this graph. */

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${montserrat.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-navy-800">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
