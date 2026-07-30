import { Header } from "@/components/site/header";
import { Hero } from "@/components/site/hero";
import { Calculator } from "@/components/site/calculator";
import {
  Services,
  Process,
  Results,
  Deliverables,
  Testimonials,
  FitCheck,
} from "@/components/site/sections";
import { Faq, Booking, Contact, Footer, FloatingActions } from "@/components/site/convert";
import { RevealProvider } from "@/components/site/primitives";

export default function Home() {
  return (
    <>
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
        <FitCheck />
        <Faq />
        <Booking />
        <Contact />
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
