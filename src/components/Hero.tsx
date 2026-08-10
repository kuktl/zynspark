import { createElement } from "react";
import { 
  ArrowRight, 
  ShieldCheck, 
  Megaphone, 
  KeyRound, 
  Zap, 
  Cpu, 
  Sliders, 
  Terminal, 
  TrendingUp, 
  Infinity, 
  Chrome 
} from "lucide-react";

// The hero is the largest above-the-fold region. Keep its interactions in CSS
// so the animation runtime is not part of the critical JavaScript bundle.
const withoutAnimationProps = ({
  initial,
  animate,
  transition,
  whileHover,
  whileTap,
  ...props
}: Record<string, unknown>) => props;
const motion = {
  div: (props: Record<string, unknown>) => createElement("div", withoutAnimationProps(props)),
  button: (props: Record<string, unknown>) => createElement("button", withoutAnimationProps(props)),
  a: (props: Record<string, unknown>) => createElement("a", withoutAnimationProps(props)),
};

// Lucide icon helper map for type safety
const iconMap = {
  Megaphone,
  KeyRound,
  Zap,
  ShieldCheck,
  Cpu,
  Sliders,
  Terminal,
  TrendingUp,
  Infinity,
  Chrome
};

const leftStickers = [
  {
    id: "meta-ads",
    text: "META ADS",
    icon: "Megaphone",
    className: "bg-[#3B1D16] text-spark border border-spark-dim -rotate-12",
    top: "14%",
    left: "5%",
    scale: 1.05
  },
  {
    id: "c-api",
    text: "SERVER C-API",
    icon: "KeyRound",
    className: "bg-[#132B32] text-volt border border-volt-dim rotate-12",
    top: "32%",
    left: "12%",
    scale: 0.95
  },
  {
    id: "attribution",
    type: "stamp-attribution", // Rotating stamp
    className: "bg-panel text-paper",
    top: "48%",
    left: "3%",
    scale: 1
  },
  {
    id: "fast-pages",
    text: "FAST PAGES",
    icon: "Zap",
    className: "bg-[#132B32] text-volt border border-volt-dim rotate-6",
    top: "66%",
    left: "11%",
    scale: 1.1
  },
  {
    id: "strict-nda",
    text: "STRICT NDAs",
    icon: "ShieldCheck",
    className: "bg-panel-2 text-paper border border-line -rotate-12",
    top: "80%",
    left: "4%",
    scale: 1
  }
];

const rightStickers = [
  {
    id: "crm-sync",
    text: "CRM SYNC",
    icon: "Cpu",
    className: "bg-[#3B1D16] text-spark border border-spark-dim rotate-12",
    top: "15%",
    right: "5%",
    scale: 1.05
  },
  {
    id: "ab-testing",
    text: "A/B TESTING",
    icon: "Sliders",
    className: "bg-[#132B32] text-volt border border-volt-dim -rotate-6",
    top: "34%",
    right: "12%",
    scale: 0.95
  },
  {
    id: "lead-engine",
    type: "stamp-seal", // Scalloped seal
    text: "FUNNEL ENGINE",
    className: "bg-panel text-paper",
    top: "50%",
    right: "3%",
    scale: 1
  },
  {
    id: "custom-code",
    text: "CUSTOM CODE",
    icon: "Terminal",
    className: "bg-[#132B32] text-volt border border-volt-dim -rotate-12",
    top: "68%",
    right: "11%",
    scale: 1.1
  },
  {
    id: "growth-scale",
    text: "GROWTH SCALE",
    icon: "TrendingUp",
    className: "bg-[#3B1D16] text-spark border border-spark-dim rotate-12",
    top: "82%",
    right: "4%",
    scale: 1
  }
];

export default function Hero() {
  return (
    <section
      className="relative pt-16 pb-16 md:pt-24 md:pb-20 bg-brand-cream border-b border-brand-gray-border overflow-hidden select-none"
      id="hero"
    >
      {/* Subtle glowing architectural grid background */}
      <div className="absolute inset-0 bg-grid-pattern pointer-events-none opacity-40" />
      
      {/* Absolute Decorative Grid Guides */}
      <div className="absolute top-0 left-12 w-[1px] h-full bg-brand-gray-border/30 hidden xl:block" />
      <div className="absolute top-0 right-12 w-[1px] h-full bg-brand-gray-border/30 hidden xl:block" />
      
      {/* Central relative outer wrapper */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative">
        
        {/* =========================================================
            DESKTOP STICKERS (LEFT) - Absolute floating layouts
            ========================================================= */}
        <div className="hidden lg:block">
          {leftStickers.map((sticker, idx) => {
            if (sticker.type === "stamp-attribution") {
              return (
                <motion.div
                  key={sticker.id}
                  className="absolute z-20 pointer-events-auto"
                  style={{ top: sticker.top, left: sticker.left }}
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ 
                    opacity: 1, 
                    scale: sticker.scale, 
                    y: [0, -8, 0]
                  }}
                  transition={{
                    opacity: { duration: 0.5, delay: idx * 0.1 },
                    scale: { duration: 0.5, delay: idx * 0.1 },
                    y: {
                      repeat: Infinity,
                      duration: 4.5,
                      ease: "easeInOut",
                      delay: 0.5
                    }
                  }}
                  whileHover={{ 
                    scale: 1.12, 
                    rotate: 0,
                    zIndex: 40
                  }}
                >
                  <div className="w-24 h-24 bg-panel rounded-full flex items-center justify-center relative shadow-xl p-1 border border-brand-gray-border">
                    <svg viewBox="0 0 100 100" className="w-full h-full animate-spin" style={{ animationDuration: '24s' }}>
                      <path id="attributionPath" d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" fill="none" />
                      <text className="text-[7.2px] font-bold font-mono tracking-[0.24em] fill-black uppercase">
                        <textPath href="#attributionPath" startOffset="0%">
                          • PRECISION ATTRIBUTION • SECURED •
                        </textPath>
                      </text>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-brand-cream text-brand-gold flex items-center justify-center border border-brand-gray-border shadow-inner">
                        <ShieldCheck className="w-4.5 h-4.5 text-brand-gold" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            }
            
            const IconComponent = iconMap[sticker.icon || "Zap"];
            return (
              <motion.div
                key={sticker.id}
                className={`absolute z-20 pointer-events-auto px-4 py-2.5 rounded-xl font-bold text-[10px] tracking-wider uppercase flex items-center gap-1.5 shadow-lg border border-brand-gray-border/10 cursor-pointer ${sticker.className}`}
                style={{ top: sticker.top, left: sticker.left }}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ 
                  opacity: 1, 
                  scale: sticker.scale, 
                  y: [0, -6, 0]
                }}
                transition={{
                  opacity: { duration: 0.5, delay: idx * 0.1 },
                  scale: { duration: 0.5, delay: idx * 0.1 },
                  y: {
                    repeat: Infinity,
                    duration: 3.5 + (idx % 2) * 1.5,
                    ease: "easeInOut",
                    delay: idx * 0.2
                  }
                }}
                whileHover={{ 
                  scale: sticker.scale * 1.12, 
                  rotate: 0,
                  zIndex: 40
                }}
              >
                <IconComponent className="w-3.5 h-3.5" />
                <span>{sticker.text}</span>
              </motion.div>
            );
          })}
        </div>

        {/* =========================================================
            CENTRAL APP-LIKE CONTENT (STRICTLY CENTERED AS REFERENCE)
            ========================================================= */}
        <div className="max-w-4xl mx-auto text-center relative z-10">
          
          {/* Glowing Geometric Brand Square Logo Mark at top center */}
          <div className="flex justify-center mb-5">
            <div className="w-12 h-12 rounded-2xl bg-brand-gray-light border border-brand-gray-border flex items-center justify-center shadow-xl relative group overflow-hidden">
              <div className="absolute inset-0 bg-grid-pattern opacity-20 group-hover:opacity-40 transition-opacity duration-300" />
              <div className="absolute w-5 h-5 rounded-full bg-brand-gold/15 blur-lg group-hover:bg-brand-gold/25 transition-all duration-500" />
              
              {/* Geometric spark vector icon */}
              <svg viewBox="0 0 24 24" className="w-6 h-6 text-brand-gold relative z-10 filter drop-shadow-[0_0_8px_rgba(255,107,44,0.35)] transition-transform duration-500 group-hover:scale-110" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" fill="currentColor" className="opacity-15" />
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
            </div>
          </div>

          {/* High-Impact Centered Headlines */}
          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-black tracking-tight text-brand-navy leading-[1.18] mb-4 uppercase max-w-3xl mx-auto">
            Helping Businesses Grow with Better Websites, Smarter Marketing & <span className="text-volt">AI Automation</span>.
          </h1>

          {/* Subheading / Tagline */}
          <p className="font-serif text-sm sm:text-base md:text-lg font-extrabold text-brand-gold tracking-wide mb-3">
            Running a business is challenging enough. Growing it online shouldn't be.
          </p>

          {/* Description */}
          <p className="font-sans text-xs sm:text-sm font-normal text-brand-navy-light/80 max-w-2xl mx-auto mb-6 leading-relaxed">
            Whether you're looking to attract more customers, build a stronger online presence, or save time through automation, Zynspark brings everything together under one roof. We combine strategy, technology, and AI to help businesses grow with solutions that work together—not separately.
          </p>

          {/* Core CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-8">
            <motion.button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent("open_quote_modal"))}
              className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 bg-brand-gold text-paper border border-brand-gold font-extrabold text-xs tracking-widest uppercase rounded-xl shadow-xl shadow-brand-gold/15 font-sans gap-2 cursor-pointer"
              id="hero-primary-cta"
              whileHover={{
                scale: 1.08,
                y: -6,
                boxShadow: "0 15px 35px rgba(255,107,44,0.35)",
                transition: { type: "spring", stiffness: 450, damping: 10 },
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Get Quick Quote</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
            
            <motion.a
              href="#services"
              className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 bg-brand-gray-light border border-brand-gray-border text-brand-navy font-bold text-xs tracking-widest uppercase rounded-xl cursor-pointer"
              id="hero-secondary-cta"
              whileHover={{
                scale: 1.06,
                y: -5,
                borderColor: "#B8531F",
                color: "#FF6B2C",
                transition: { type: "spring", stiffness: 400, damping: 12 },
              }}
              whileTap={{ scale: 0.95 }}
            >
              Explore Our Solutions
            </motion.a>
          </div>

          {/* =========================================================
              MOBILE/TABLET PILL CLOUD (Only visible on screens < lg)
              ========================================================= */}
          <div className="lg:hidden flex flex-wrap justify-center gap-2 px-2 max-w-2xl mx-auto mb-10 relative z-20">
            {leftStickers.map((sticker) => {
              if (sticker.type === "stamp-attribution") {
                return (
                  <span key={sticker.id} className="inline-flex items-center gap-1.5 px-3 py-2 text-[9px] font-extrabold tracking-wider bg-panel text-paper border border-brand-gray-border rounded-full font-mono">
                    <ShieldCheck className="w-3.5 h-3.5 text-brand-gold" />
                    PRECISION ATTRIBUTION
                  </span>
                );
              }
              const IconComponent = iconMap[sticker.icon || 'Zap'];
              return (
                <span key={sticker.id} className={`inline-flex items-center gap-1.5 px-3 py-2 text-[9px] font-extrabold tracking-wider rounded-full ${sticker.className.split(' ').filter(c => !c.includes('rotate') && !c.includes('scale')).join(' ')}`}>
                  <IconComponent className="w-3.5 h-3.5" />
                  {sticker.text}
                </span>
              );
            })}
            {rightStickers.map((sticker) => {
              if (sticker.type === "stamp-seal") {
                return (
                  <span key={sticker.id} className="inline-flex items-center gap-1.5 px-3 py-2 text-[9px] font-extrabold tracking-wider bg-panel text-paper border border-brand-gray-border rounded-full font-mono">
                    <TrendingUp className="w-3.5 h-3.5 text-brand-gold" />
                    FUNNEL ENGINE
                  </span>
                );
              }
              const IconComponent = iconMap[sticker.icon || 'Zap'];
              return (
                <span key={sticker.id} className={`inline-flex items-center gap-1.5 px-3 py-2 text-[9px] font-extrabold tracking-wider rounded-full ${sticker.className.split(' ').filter(c => !c.includes('rotate') && !c.includes('scale')).join(' ')}`}>
                  <IconComponent className="w-3.5 h-3.5" />
                  {sticker.text}
                </span>
              );
            })}
          </div>

          {/* =========================================================
              "TRUSTED BY BUSINESS OWNERS" BOX (Bottom of Hero)
              ========================================================= */}
          <motion.div
            className="border border-brand-gray-border bg-brand-gray-light rounded-2xl p-8 md:p-10 max-w-4xl mx-auto shadow-2xl relative overflow-hidden text-left cursor-pointer"
            id="trusted-business-box"
            whileHover={{
              y: -8,
              scale: 1.02,
              borderColor: "rgba(255,107,44,0.5)",
              boxShadow: "0 20px 40px rgba(255,107,44,0.15)",
              transition: { type: "spring", stiffness: 350, damping: 14 },
            }}
          >
            <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
            
            <div className="relative z-10">
              <span className="text-[10px] font-extrabold tracking-widest text-brand-gold uppercase block mb-2">
                Trusted By Business Owners
              </span>
              <h2 className="font-serif text-xl md:text-2xl font-extrabold text-brand-navy mb-4 leading-snug">
                Growing a business isn't about doing more. It's about doing the right things consistently.
              </h2>
              <p className="text-xs md:text-sm text-brand-navy-light/80 leading-relaxed mb-6">
                At Zynspark, we help businesses build the right digital foundation, reach the right customers, and create systems that continue working long after the workday ends.
              </p>
              <div className="p-4 bg-brand-cream border border-brand-gray-border rounded-xl flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-brand-gold shrink-0 animate-pulse" />
                <p className="text-xs font-semibold text-brand-navy">
                  Instead of hiring multiple agencies for different needs, you get <strong className="text-brand-gold font-bold">one team focused on helping your business grow.</strong>
                </p>
              </div>
            </div>
          </motion.div>

        </div>

        {/* =========================================================
            DESKTOP STICKERS (RIGHT) - Absolute floating layouts
            ========================================================= */}
        <div className="hidden lg:block">
          {rightStickers.map((sticker, idx) => {
            if (sticker.type === "stamp-seal") {
              return (
                <motion.div
                  key={sticker.id}
                  className="absolute z-20 pointer-events-auto"
                  style={{ top: sticker.top, right: sticker.right }}
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ 
                    opacity: 1, 
                    scale: sticker.scale, 
                    y: [0, -8, 0]
                  }}
                  transition={{
                    opacity: { duration: 0.5, delay: idx * 0.1 },
                    scale: { duration: 0.5, delay: idx * 0.1 },
                    y: {
                      repeat: Infinity,
                      duration: 4.2,
                      ease: "easeInOut",
                      delay: 0.3
                    }
                  }}
                  whileHover={{ 
                    scale: 1.12, 
                    rotate: 0,
                    zIndex: 40
                  }}
                >
                  <div className="w-24 h-24 bg-panel rounded-full flex items-center justify-center relative shadow-xl border-4 border-double border-line">
                    <div className="absolute inset-1.5 border border-dashed border-line rounded-full flex flex-col items-center justify-center p-1 text-center">
                      <span className="text-[8px] font-mono font-black tracking-tight text-paper leading-none mb-1">FUNNEL</span>
                      <TrendingUp className="w-4 h-4 text-brand-gold my-0.5" />
                      <span className="text-[7.5px] font-mono font-black tracking-widest text-paper leading-none mt-1">ENGINE</span>
                    </div>
                  </div>
                </motion.div>
              );
            }
            
            const IconComponent = iconMap[sticker.icon || "Zap"];
            return (
              <motion.div
                key={sticker.id}
                className={`absolute z-20 pointer-events-auto px-4 py-2.5 rounded-xl font-bold text-[10px] tracking-wider uppercase flex items-center gap-1.5 shadow-lg border border-brand-gray-border/10 cursor-pointer ${sticker.className}`}
                style={{ top: sticker.top, right: sticker.right }}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ 
                  opacity: 1, 
                  scale: sticker.scale, 
                  y: [0, -6, 0]
                }}
                transition={{
                  opacity: { duration: 0.5, delay: idx * 0.1 },
                  scale: { duration: 0.5, delay: idx * 0.1 },
                  y: {
                    repeat: Infinity,
                    duration: 3.5 + (idx % 2) * 1.5,
                    ease: "easeInOut",
                    delay: idx * 0.2
                  }
                }}
                whileHover={{ 
                  scale: sticker.scale * 1.12, 
                  rotate: 0,
                  zIndex: 40
                }}
              >
                <IconComponent className="w-3.5 h-3.5" />
                <span>{sticker.text}</span>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
