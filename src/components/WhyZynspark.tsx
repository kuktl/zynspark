import { ArrowRight, ShieldCheck, Heart, Sparkles, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";
import AnimatedSection from "./AnimatedSection";

export default function WhyZynspark() {
  const pillars = [
    {
      title: "Your website builds trust.",
      desc: "A fast, modern, mobile-friendly digital presence communicates credibility instantly and convinces visitors to take action.",
      icon: ShieldCheck,
      bounce: { y: -10, rotate: -1.5, scale: 1.03, stiffness: 400, damping: 10 },
    },
    {
      title: "Your marketing brings in qualified customers.",
      desc: "Targeted advertising and multi-channel search optimization place your business directly in front of people ready to buy.",
      icon: Sparkles,
      bounce: { y: -12, rotate: 1.5, scale: 1.04, stiffness: 350, damping: 9 },
    },
    {
      title: "Your automation follows up & saves time.",
      desc: "Smart AI workflows handle customer enquiries, schedule appointments, and nurture leads around the clock.",
      icon: Heart,
      bounce: { y: -8, rotate: -1, scale: 1.03, stiffness: 450, damping: 11 },
    },
  ];

  return (
    <section className="py-24 bg-brand-section border-b border-brand-gray-border relative" id="why">
      <div className="absolute inset-0 bg-grid-pattern pointer-events-none opacity-20" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <AnimatedSection direction="up">
          {/* Main Copy Heading & Intro */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
            <div className="lg:col-span-6">
              <span className="text-[10px] font-bold uppercase tracking-widest text-brand-gold flex items-center gap-2 mb-3">
                <span className="w-4 h-[1px] bg-brand-gold"></span> WHY CHOOSE US
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-brand-navy mb-6 uppercase leading-tight">
                Why Businesses Choose Zynspark
              </h2>
              <p className="text-lg md:text-xl font-bold text-brand-gold leading-snug">
                Most businesses don't need another agency. They need a partner who understands how everything works together.
              </p>
            </div>
            
            <div className="lg:col-span-6 lg:pl-6 space-y-4">
              <p className="text-sm md:text-base text-brand-navy-light/80 leading-relaxed">
                At Zynspark, we don't treat websites, marketing, and automation as separate services. We build connected systems where every solution supports the next.
              </p>
              <motion.div
                className="p-5 bg-brand-gray-light border border-brand-gray-border rounded-sm shadow-sm space-y-2 cursor-pointer"
                whileHover={{ y: -4, scale: 1.015, borderColor: "rgba(176,141,87,0.5)" }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <p className="text-xs md:text-sm font-semibold text-brand-navy leading-relaxed">
                  Everything works together with one goal—<strong className="text-brand-gold font-bold">to help your business grow consistently and sustainably.</strong>
                </p>
              </motion.div>
            </div>
          </div>
        </AnimatedSection>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <AnimatedSection key={idx} delay={idx * 0.12} direction="up">
                <motion.div
                  className="h-full bg-brand-gray-light border border-brand-gray-border p-8 rounded-sm hover:border-brand-gold/50 transition-all duration-300 relative group flex flex-col justify-between cursor-pointer shadow-sm"
                  whileHover={{
                    y: pillar.bounce.y,
                    rotate: pillar.bounce.rotate,
                    scale: pillar.bounce.scale,
                    boxShadow: "0 20px 40px rgba(176,141,87,0.15)",
                    transition: {
                      type: "spring",
                      stiffness: pillar.bounce.stiffness,
                      damping: pillar.bounce.damping,
                    },
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-transparent group-hover:bg-brand-gold transition-colors duration-300" />
                  <div>
                    <motion.div
                      className="w-12 h-12 rounded-sm bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center text-brand-gold mb-6 shadow-inner group-hover:bg-brand-gold group-hover:text-white transition-all duration-300"
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ type: "spring", stiffness: 350, damping: 10 }}
                    >
                      <Icon className="w-6 h-6" />
                    </motion.div>
                    <h3 className="font-serif text-lg font-extrabold text-brand-navy mb-3">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-brand-navy-light/70 leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-brand-gray-border flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-widest text-brand-gold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-gold" />
                    <span>CONNECTED SYSTEM</span>
                  </div>
                </motion.div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
