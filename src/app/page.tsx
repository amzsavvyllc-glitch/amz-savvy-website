import { Header } from "@/components/site/header";
import { Hero } from "@/components/site/hero";
import { Calculator } from "@/components/site/calculator";
import {
  Services,
  Process,
  Results,
  Deliverables,
  Testimonials,
} from "@/components/site/sections";
import { Faq, Booking, Contact } from "@/components/site/convert";
import { Footer } from "@/components/site/footer";
import { FloatingActions } from "@/components/site/floating-actions";
import { RevealProvider } from "@/components/site/primitives";
import { faqs, site } from "@/lib/site-config";

/* Homepage-only: this is the page that actually contains these FAQs. */
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `https://${site.domain}/#faq`,
  isPartOf: { "@id": `https://${site.domain}/#website` },
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <RevealProvider />
      <Header />
      <main className="flex-1">
        <Hero />
        <Services />
        <Calculator />
        <Process />
        <Results />
        <Deliverables />
        <Testimonials />
        <Faq />
        <Booking />
        <Contact />
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
