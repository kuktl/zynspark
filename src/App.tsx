/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { lazy, Suspense } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import DeferredContent from "./components/DeferredContent";

const Services = lazy(() => import("./components/Services"));
const WhyZynspark = lazy(() => import("./components/WhyZynspark"));
const Process = lazy(() => import("./components/Process"));
const Results = lazy(() => import("./components/Results"));
const FAQ = lazy(() => import("./components/FAQ"));
const ContactFooter = lazy(() => import("./components/ContactFooter"));
const QuoteModal = lazy(() => import("./components/QuoteModal"));
const AnimatedSection = lazy(() => import("./components/AnimatedSection"));
const Analytics = lazy(() => import("@vercel/analytics/react").then(({ Analytics }) => ({ default: Analytics })));

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
        <Hero />

        <DeferredContent>
          <Suspense fallback={null}>
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
          </Suspense>
        </DeferredContent>
      </main>

      <Suspense fallback={null}>
        <QuoteModal />
        <Analytics />
      </Suspense>
    </div>
  );
}
