import { useState } from "react";
import { Plus, Minus, Info } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "What services does Zynspark provide?",
      answer: "We provide website design and development, performance marketing (Google Ads & Meta Ads), AI automation (WhatsApp, email, and workflow automation), and search engine optimisation (SEO, AEO, and GEO).",
      category: "Services"
    },
    {
      question: "Do I need to hire multiple agencies for website, marketing, and automation?",
      answer: "No. Zynspark brings everything under one roof so your website, advertising, and automation work seamlessly together without the confusion of managing multiple teams.",
      category: "Solutions"
    },
    {
      question: "How long does it take to get started?",
      answer: "After our initial discussion and strategy alignment, most projects begin within 5 to 7 business days depending on the scope of your requirements.",
      category: "Onboarding"
    },
    {
      question: "Can you help automate customer follow-ups and inquiries?",
      answer: "Yes. We build custom AI automation solutions for WhatsApp, Instagram, email, and web chat that handle customer inquiries, qualify leads, and schedule appointments automatically.",
      category: "AI Automation"
    },
    {
      question: "What is AEO and GEO, and why does my business need it?",
      answer: "Answer Engine Optimisation (AEO) and Generative Engine Optimisation (GEO) ensure your business appears not only on Google search, but also inside AI search assistants like ChatGPT, Gemini, and Perplexity when customers ask for recommendations.",
      category: "AI Search & SEO"
    },
    {
      question: "How do we track progress and results?",
      answer: "We believe in complete transparency. You will receive regular performance reports and clear updates showing website activity, lead generation, ad performance, and automation efficiency.",
      category: "Reporting"
    }
  ];

  return (
    <section className="py-24 bg-brand-cream border-b border-brand-gray-border relative" id="faq">
      <div className="absolute inset-0 bg-grid-pattern pointer-events-none opacity-20" />
      
      <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <AnimatedSection direction="up">
          <div className="mb-16 text-center">
            <span className="text-[10px] font-bold uppercase tracking-widest text-brand-gold flex items-center justify-center gap-2 mb-3">
              <span className="w-4 h-[1px] bg-brand-gold"></span> FAQ
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-brand-navy uppercase leading-none mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-sm md:text-base text-brand-navy-light/70 mt-4 leading-relaxed max-w-2xl mx-auto">
              Everything you need to know about working with Zynspark and our connected growth solutions.
            </p>
          </div>
        </AnimatedSection>

        {/* FAQ Accordion List */}
        <div className="space-y-4" id="faq-accordion-list">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <AnimatedSection key={idx} delay={idx * 0.05} direction="up">
                <div
                  className="bg-brand-gray-light border border-brand-gray-border overflow-hidden transition-all duration-300 rounded-sm"
                  id={`faq-item-${idx}`}
                >
                  {/* Header / Question */}
                  <button
                    className="w-full text-left p-6 flex items-center justify-between gap-4 focus:outline-none cursor-pointer group"
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    id={`faq-button-${idx}`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                      <span className="w-fit text-[9px] font-bold tracking-widest text-brand-gold bg-brand-cream border border-brand-gray-border px-3 py-1 uppercase rounded-full">
                        {faq.category}
                      </span>
                      <h3 className="font-serif text-base md:text-lg font-extrabold text-brand-navy group-hover:text-brand-gold transition-colors duration-200">
                        {faq.question}
                      </h3>
                    </div>
                    <span className="text-brand-navy-light/50 group-hover:text-brand-gold transition-colors duration-200 shrink-0">
                      {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                    </span>
                  </button>

                  {/* Body / Answer */}
                  {isOpen && (
                    <div className="px-6 pb-6 border-t border-brand-gray-border pt-5 bg-brand-gray-light">
                      <div className="flex gap-3 items-start">
                        <div className="mt-0.5 p-1 bg-brand-gold/10 text-brand-gold border border-brand-gold/25 rounded-xs shrink-0">
                          <Info className="w-4 h-4" />
                        </div>
                        <p className="text-xs md:text-sm text-brand-navy-light/80 leading-relaxed font-normal">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
