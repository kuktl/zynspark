/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import WhyZynspark from "./components/WhyZynspark";
import Process from "./components/Process";
import Results from "./components/Results";
import FAQ from "./components/FAQ";
import ContactFooter from "./components/ContactFooter";
import QuoteModal from "./components/QuoteModal";
import AnimatedSection from "./components/AnimatedSection";

export default function App() {
  return (
    <div className="min-h-screen bg-brand-cream text-brand-navy selection:bg-brand-gold/20 selection:text-brand-navy antialiased bg-grid-pattern relative">
      {/* Subtly glowing atmospheric lights mimicking luxury webflow sites */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand-gold/5 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute top-[1200px] right-1/4 w-[600px] h-[600px] bg-brand-gold/5 rounded-full blur-[140px] pointer-events-none z-0"></div>
      <div className="absolute bottom-[1000px] left-10 w-[400px] h-[400px] bg-brand-gold/5 rounded-full blur-[100px] pointer-events-none z-0"></div>

      {/* Dynamic Header / Navigation */}
      <Header />

      {/* Main Sections (in ordered sequence) */}
      <main id="main-content">
        {/* 1. Hero */}
        <AnimatedSection direction="none">
          <Hero />
        </AnimatedSection>

        {/* 2. Services Capability Grid */}
        <AnimatedSection direction="up">
          <Services />
        </AnimatedSection>

        {/* 3. Why Zynspark Visual Workflow */}
        <AnimatedSection direction="up">
          <WhyZynspark />
        </AnimatedSection>

        {/* 4. Process operational roadmap */}
        <AnimatedSection direction="up">
          <Process />
        </AnimatedSection>

        {/* 5. Client proof & testimonials */}
        <AnimatedSection direction="up">
          <Results />
        </AnimatedSection>

        {/* 7. Answer-first Q&A (AEO & Search optimized) */}
        <AnimatedSection direction="up">
          <FAQ />
        </AnimatedSection>

        {/* 8. Interactive Consultation Contact & Footer */}
        <AnimatedSection direction="up">
          <ContactFooter />
        </AnimatedSection>
      </main>

      {/* Interactive Project Quote Request Modal */}
      <QuoteModal />
    </div>
  );
}
