import { Code, TrendingUp, Cpu, Search, Sparkles, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import AnimatedSection from "./AnimatedSection";

export default function Services() {
  const solutions = [
    {
      id: "marketing",
      title: "Performance Marketing",
      subtitle: "Reach More Customers",
      icon: TrendingUp,
      description:
        "People are already searching for businesses like yours every day. The real question is—are they finding you or your competitors? We create and manage high-performing advertising campaigns that connect your business with people who are actively looking for your products or services. Every campaign is built around your goals, monitored closely, and continuously improved to deliver better leads, higher conversions, and stronger returns on your marketing investment.",
      deliverables: [
        "Google Ads Campaigns",
        "Facebook & Instagram Advertising",
        "Lead Generation Campaigns",
        "Sales & Conversion Campaigns",
        "Audience Research & Targeting",
        "Campaign Strategy",
        "Remarketing Campaigns",
        "Landing Page Recommendations",
        "Campaign Optimisation",
        "Conversion Tracking",
        "Monthly Performance Reports",
      ],
    },
    {
      id: "automation",
      title: "AI Automation",
      subtitle: "Save Time & Automate Repetitive Work",
      icon: Cpu,
      description:
        "As your business grows, so do customer enquiries, follow-ups, appointments, and everyday tasks. Managing everything manually can slow your team down and create missed opportunities. We build AI-powered automation systems that help your business respond faster, stay organised, and provide a better customer experience. From handling conversations to scheduling appointments and nurturing leads, our automation solutions work around the clock so your business never misses an opportunity.",
      deliverables: [
        "WhatsApp Automation",
        "WhatsApp Business API Integration",
        "Instagram Automation",
        "Email Automation",
        "AI Voice Agents",
        "Appointment Booking Automation",
        "Lead Qualification",
        "Automated Follow-ups",
        "Customer Support Automation",
        "CRM Integration",
        "Workflow Automation",
        "Business Process Automation",
      ],
    },
    {
      id: "websites",
      title: "Website Design & Development",
      subtitle: "Build a Strong Digital Presence",
      icon: Code,
      description:
        "Your website is often the first impression someone has of your business. It should build trust, clearly communicate what you do, and make it easy for customers to take the next step. We design and develop modern, high-performing websites that are fast, mobile-friendly, secure, and built around your business goals. Whether you need a business website, landing page, or e-commerce store, every website is designed to create a seamless experience for your customers.",
      deliverables: [
        "Business Websites",
        "Corporate Websites",
        "Landing Pages",
        "E-commerce Websites",
        "Custom Website Development",
        "Responsive Design",
        "CMS Integration",
        "Website Maintenance",
        "Performance Optimisation",
      ],
    },
    {
      id: "search",
      title: "SEO • AEO • GEO",
      subtitle: "Help Customers Find Your Business",
      icon: Search,
      description:
        "Having a great website is only the beginning. Your customers need to be able to find you. Today's customers search in different ways. Some use Google, others ask ChatGPT, Gemini, or AI-powered search tools before making a decision. That's why we optimise your digital presence for both traditional search engines and the next generation of AI search experiences.",
      specialSearchTypes: [
        {
          name: "Search Engine Optimisation (SEO)",
          desc: "Improve your visibility on Google through technical optimisation, keyword strategy, local SEO, and ongoing website improvements.",
        },
        {
          name: "Answer Engine Optimisation (AEO)",
          desc: "Structure your website so it can appear in AI Overviews, featured snippets, voice search, and direct answers.",
        },
        {
          name: "Generative Engine Optimisation (GEO)",
          desc: "Help your business become more discoverable across AI platforms like ChatGPT, Gemini, Perplexity, and other generative search engines.",
        },
      ],
      deliverables: [
        "Technical SEO Audits",
        "Keyword & Intent Strategy",
        "Local SEO Optimisation",
        "AI Search Visibility",
        "Schema & Structured Data",
        "Content & Answer Structuring",
      ],
    },
  ];

  return (
    <section className="py-24 bg-brand-cream border-b border-brand-gray-border relative" id="services">
      <div className="absolute inset-0 bg-grid-pattern pointer-events-none opacity-20" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="mb-20 text-left max-w-3xl">
          <span className="text-[10px] font-bold uppercase tracking-widest text-brand-gold flex items-center gap-2 mb-3">
            <span className="w-4 h-[1px] bg-brand-gold"></span> OUR SOLUTIONS
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-brand-navy uppercase leading-tight">
            Everything Your Business Needs to Grow.
          </h2>
          <p className="text-sm md:text-base text-brand-navy-light/70 mt-4 leading-relaxed">
            Every business wants more customers, smoother operations, and sustainable growth. Our solutions are designed to make that happen.
          </p>
        </div>

        {/* 2x2 Bento Grid for Solutions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {solutions.map((solution, idx) => {
            const Icon = solution.icon;
            // Define different bouncy hover physics for each card to satisfy "bounce easily and differently"
            const bounceVariations = [
              { y: -10, scale: 1.03, rotate: -1, stiffness: 400, damping: 10 }, // Card 1: Upward spring & subtle left tilt
              { y: -8, scale: 1.04, rotate: 1.5, stiffness: 350, damping: 8 },  // Card 2: Bouncy right wobble
              { y: -12, scale: 1.025, rotate: 0, stiffness: 450, damping: 12 },  // Card 3: Deep vertical spring hop
              { y: -7, scale: 1.035, rotate: -1.5, stiffness: 320, damping: 9 }  // Card 4: Elastic float bounce
            ];
            const currentBounce = bounceVariations[idx % bounceVariations.length];

            return (
              <AnimatedSection key={solution.id} delay={idx * 0.1} direction="up">
                <motion.div
                  className="group h-full flex flex-col justify-between p-8 md:p-10 bg-brand-gray-light border border-brand-gray-border hover:border-brand-gold/60 transition-all duration-300 rounded-sm relative cursor-pointer"
                  id={`solution-card-${solution.id}`}
                  whileHover={{
                    y: currentBounce.y,
                    scale: currentBounce.scale,
                    rotate: currentBounce.rotate,
                    boxShadow: "0 20px 40px rgba(176,141,87,0.15)",
                    transition: {
                      type: "spring",
                      stiffness: currentBounce.stiffness,
                      damping: currentBounce.damping
                    }
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Top glowing accent line */}
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-transparent group-hover:bg-brand-gold transition-colors duration-300" />
                  
                  <div>
                    {/* Header */}
                    <div className="flex items-start gap-4 mb-6">
                      <motion.div
                        className="w-12 h-12 rounded-sm bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center text-brand-gold group-hover:bg-brand-gold group-hover:text-white transition-all duration-300 shrink-0 shadow-inner"
                        whileHover={{ rotate: 360, scale: 1.15 }}
                        transition={{ type: "spring", stiffness: 300, damping: 10 }}
                      >
                        <Icon className="w-6 h-6" />
                      </motion.div>
                      <div>
                        <span className="text-[10px] font-extrabold tracking-wider text-brand-gold uppercase block mb-1">
                          {solution.subtitle}
                        </span>
                        <h3 className="font-serif text-2xl font-extrabold tracking-tight text-brand-navy">
                          {solution.title}
                        </h3>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-xs md:text-sm text-brand-navy-light/80 leading-relaxed mb-8">
                      {solution.description}
                    </p>

                    {/* Special Search Types for SEO / AEO / GEO */}
                    {solution.specialSearchTypes && (
                      <div className="mb-8 space-y-4 bg-brand-cream/60 border border-brand-gray-border p-5 rounded-sm">
                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-brand-gold flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5" /> Search Optimisation Architecture
                        </h4>
                        <div className="space-y-3">
                          {solution.specialSearchTypes.map((st, sIdx) => (
                            <motion.div
                              key={sIdx}
                              className="space-y-1 p-2 rounded-sm hover:bg-white/50 transition-colors"
                              whileHover={{ x: 6, scale: 1.01 }}
                              transition={{ type: "spring", stiffness: 400 }}
                            >
                              <h5 className="text-xs font-bold text-brand-navy">{st.name}</h5>
                              <p className="text-[11px] text-brand-navy-light/70 leading-normal">{st.desc}</p>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Deliverables Grid */}
                  <div className="border-t border-brand-gray-border pt-6 mt-auto">
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-brand-navy-light/40 mb-4">
                      What We Deliver
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6">
                      {solution.deliverables.map((item, dIdx) => (
                        <motion.div
                          key={dIdx}
                          className="flex items-center gap-2 text-xs text-brand-navy-light/85 p-1 rounded-sm cursor-pointer"
                          whileHover={{
                            x: 5,
                            scale: 1.03,
                            color: "#B08D57",
                            transition: { type: "spring", stiffness: 450, damping: 10 }
                          }}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-gold shrink-0" />
                          <span>{item}</span>
                        </motion.div>
                      ))}
                    </div>

                    <motion.button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.dispatchEvent(
                          new CustomEvent("open_quote_modal", {
                            detail: { service: solution.title },
                          })
                        );
                      }}
                      className="w-full py-2.5 px-4 bg-brand-cream border border-brand-gold/40 hover:bg-brand-gold hover:text-white text-brand-navy font-bold text-xs uppercase tracking-wider rounded-sm flex items-center justify-center gap-2 cursor-pointer transition-all duration-200"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span>Get Custom Quote</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </motion.button>
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
