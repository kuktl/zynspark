import { Quote, Store, Wrench, Building2, Briefcase, Stethoscope, GraduationCap } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

export default function Results() {
  const industries = [
    {
      title: "E-Commerce & Retail",
      desc: "High-converting online stores, automated customer support, and performance ad campaigns.",
      icon: Store,
    },
    {
      title: "Local & Service-Based Businesses",
      desc: "Local SEO, Google Ads, and automated appointment scheduling for plumbers, electricians, clinics, and local providers.",
      icon: Wrench,
    },
    {
      title: "Real Estate & Property",
      desc: "Lead generation campaigns, WhatsApp automation, and automated lead qualification.",
      icon: Building2,
    },
    {
      title: "Professional & B2B Services",
      desc: "Custom business websites, lead nurture automation, and search engine optimization.",
      icon: Briefcase,
    },
    {
      title: "Healthcare & Medical",
      desc: "High-trust websites, appointment booking workflows, and local discovery campaigns.",
      icon: Stethoscope,
    },
    {
      title: "Education & Training",
      desc: "Student enrollment campaigns, automated inquiry follow-ups, and course landing pages.",
      icon: GraduationCap,
    },
  ];

  const testimonials = [
    {
      quote: "Zynspark re-engineered our entire website and configured WhatsApp & CRM automation. Within three months, our customer inquiry response times dropped from hours to seconds and lead conversions grew significantly.",
      author: "Siddharth Mehta",
      role: "VP of Growth",
      company: "Acme Commerce",
      region: "USA 🇺🇸",
    },
    {
      quote: "We struggled to sync our Facebook ad leads with our sales team. Zynspark built an automated pipeline with WhatsApp API integration that instantly qualifies and schedules appointments.",
      author: "Priya Nair",
      role: "Chief Operations Officer",
      company: "Nexa Health",
      region: "India 🇮🇳",
    },
    {
      quote: "The combination of Google Ads and AI Search Optimisation (GEO) completely transformed our inbound traffic. We now rank in both Google search and AI engine summaries.",
      author: "David Chen",
      role: "Founder & CEO",
      company: "HyperSaaS",
      region: "UK 🇬🇧",
    },
  ];

  return (
    <section className="py-24 bg-brand-section border-b border-brand-gray-border relative" id="results">
      <div className="absolute inset-0 bg-grid-pattern pointer-events-none opacity-20" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header: Industries We Serve */}
        <AnimatedSection direction="up">
          <div className="mb-16 text-left max-w-3xl">
            <span className="text-[10px] font-bold uppercase tracking-widest text-brand-gold flex items-center gap-2 mb-3">
              <span className="w-4 h-[1px] bg-brand-gold"></span> INDUSTRIES WE SERVE
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-brand-navy uppercase leading-tight">
              Built for Businesses Ready to Scale.
            </h2>
            <p className="text-sm md:text-base text-brand-navy-light/75 mt-4 leading-relaxed">
              Every industry has unique challenges. Our solutions are tailored to help you reach the right audience, generate qualified leads, and streamline your operations.
            </p>
          </div>
        </AnimatedSection>

        {/* 6-Card Industry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24" id="industries-grid">
          {industries.map((ind, idx) => {
            const Icon = ind.icon;
            return (
              <AnimatedSection key={idx} delay={idx * 0.08} direction="up">
                <div
                  className="group bg-brand-gray-light border border-brand-gray-border p-8 rounded-sm hover:border-brand-gold/40 hover:shadow-[0_10px_25px_rgba(176,141,87,0.1)] transition-all duration-300 relative h-full flex flex-col justify-between"
                  id={`industry-card-${idx}`}
                >
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-transparent group-hover:bg-brand-gold transition-colors duration-300" />
                  
                  <div>
                    <div className="w-10 h-10 rounded-sm bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center text-brand-gold mb-5 group-hover:bg-brand-gold group-hover:text-white transition-all duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-serif text-lg font-extrabold text-brand-navy mb-2">
                      {ind.title}
                    </h3>
                    <p className="text-xs text-brand-navy-light/70 leading-relaxed">
                      {ind.desc}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>

        {/* Client Stories / Testimonials */}
        <AnimatedSection direction="up">
          <div className="mb-12 text-left max-w-2xl border-t border-brand-gray-border pt-16">
            <span className="text-[10px] font-bold uppercase tracking-widest text-brand-gold flex items-center gap-2 mb-3">
              <span className="w-4 h-[1px] bg-brand-gold"></span> PROOF & SUCCESS
            </span>
            <h3 className="text-2xl md:text-4xl font-extrabold tracking-tight text-brand-navy uppercase leading-tight">
              Trusted by Growing Brands Worldwide
            </h3>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8" id="testimonials-grid">
          {testimonials.map((t, idx) => (
            <AnimatedSection key={idx} delay={idx * 0.1} direction="up">
              <div
                className="group border border-brand-gray-border p-8 bg-brand-gray-light flex flex-col justify-between hover:border-brand-gold/30 hover:shadow-[0_10px_30px_rgba(176,141,87,0.12)] transition-all duration-300 rounded-sm relative h-full"
                id={`testimonial-${idx}`}
              >
                <div className="absolute top-0 left-0 w-full h-[2px] bg-transparent group-hover:bg-brand-gold transition-colors duration-300" />
                
                <div>
                  <Quote className="w-6 h-6 text-brand-gold mb-4 opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
                  <p className="font-serif italic text-sm text-brand-navy leading-relaxed mb-6">
                    "{t.quote}"
                  </p>
                </div>

                <div className="border-t border-brand-gray-border pt-4 flex items-center justify-between mt-auto">
                  <div>
                    <h4 className="text-xs font-bold text-brand-navy">
                      {t.author}
                    </h4>
                    <p className="text-[10px] text-brand-navy-light/60 mt-0.5">
                      {t.role}, <span className="font-semibold text-brand-navy">{t.company}</span>
                    </p>
                  </div>
                  <div className="text-[9px] font-bold text-brand-navy bg-brand-cream border border-brand-gray-border px-2.5 py-1 rounded-full">
                    {t.region}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
