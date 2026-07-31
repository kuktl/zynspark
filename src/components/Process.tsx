import { Check } from "lucide-react";
import { motion } from "motion/react";
import AnimatedSection from "./AnimatedSection";

export default function Process() {
  const steps = [
    {
      number: "01",
      title: "Understand Your Business",
      description: "Every business is different. We begin by understanding your goals, your customers, your challenges, and where you want to grow.",
      bounce: { y: -10, rotate: -2, stiffness: 420, damping: 9 },
    },
    {
      number: "02",
      title: "Build the Right Strategy",
      description: "Based on your business needs, we create a customised plan that combines the right mix of websites, marketing, and automation.",
      bounce: { y: -8, rotate: 1.5, stiffness: 380, damping: 8 },
    },
    {
      number: "03",
      title: "Design, Build & Launch",
      description: "Our team takes care of everything—from planning and design to development, campaign setup, automation, testing, and launch.",
      bounce: { y: -12, rotate: -1, stiffness: 450, damping: 11 },
    },
    {
      number: "04",
      title: "Optimise & Grow",
      description: "Growth doesn't stop after launch. We continuously monitor, improve, and optimise your digital systems so they continue delivering better results over time.",
      bounce: { y: -9, rotate: 2, stiffness: 350, damping: 10 },
    },
  ];

  return (
    <section className="py-24 bg-brand-cream border-b border-brand-gray-border relative" id="process">
      <div className="absolute inset-0 bg-grid-pattern pointer-events-none opacity-20" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="mb-16 text-left max-w-2xl">
          <span className="text-[10px] font-bold uppercase tracking-widest text-brand-gold flex items-center gap-2 mb-3">
            <span className="w-4 h-[1px] bg-brand-gold"></span> OUR METHODOLOGY
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-brand-navy uppercase leading-tight">
            How We Work
          </h2>
          <p className="text-sm md:text-base text-brand-navy-light/70 mt-4 leading-relaxed">
            Standardized, transparent growth methodology built to take your business from strategy to sustained expansion.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 border-t border-brand-gray-border pt-12" id="process-steps">
          {steps.map((step, idx) => (
            <AnimatedSection key={step.number} delay={idx * 0.1} direction="up">
              <motion.div
                className="h-full relative border border-brand-gray-border p-8 flex flex-col justify-between group bg-brand-gray-light hover:border-brand-gold/60 transition-all duration-300 rounded-sm cursor-pointer"
                id={`process-step-${step.number}`}
                whileHover={{
                  y: step.bounce.y,
                  rotate: step.bounce.rotate,
                  scale: 1.03,
                  boxShadow: "0 20px 40px rgba(255,107,44,0.15)",
                  transition: {
                    type: "spring",
                    stiffness: step.bounce.stiffness,
                    damping: step.bounce.damping,
                  },
                }}
                whileTap={{ scale: 0.97 }}
              >
                <div className="absolute top-0 left-0 w-full h-[2px] bg-transparent group-hover:bg-brand-gold transition-colors duration-300" />
                
                <div>
                  {/* Step Number */}
                  <motion.div
                    className="font-serif text-3xl md:text-4xl font-black text-brand-gold mb-6 inline-block"
                    whileHover={{ scale: 1.25, rotate: 10 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    {step.number}
                  </motion.div>

                  <h3 className="font-serif text-xl font-extrabold text-brand-navy mb-4 leading-snug">
                    {step.title}
                  </h3>
                  
                  <p className="text-xs md:text-sm text-brand-navy-light/75 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-brand-gray-border flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-gold shrink-0 animate-pulse" />
                  <span className="text-[9px] font-extrabold uppercase tracking-widest text-brand-gold">
                    PHASE {step.number}
                  </span>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
