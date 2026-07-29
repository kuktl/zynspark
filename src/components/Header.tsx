import { useState, useEffect } from "react";
import { Menu, X, ArrowRight, Sparkles } from "lucide-react";
import { motion } from "motion/react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openPopup = () => {
    window.dispatchEvent(new CustomEvent("open_consultation_popup"));
  };

  const navLinks = [
    { label: "Our Services", href: "#services" },
    { label: "Why Zynspark", href: "#why" },
    { label: "Our Process", href: "#process" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-brand-cream/90 backdrop-blur-md border-b border-brand-gray-border py-3.5 shadow-sm"
          : "bg-transparent py-5"
      }`}
      id="app-header"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo with Bouncy Hover */}
        <motion.a
          href="#"
          className="flex items-center gap-2 group cursor-pointer"
          id="logo-link"
          whileHover={{
            scale: 1.08,
            y: -2,
            transition: { type: "spring", stiffness: 450, damping: 10 },
          }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.span
            className="w-8 h-8 rounded-sm bg-brand-gold flex items-center justify-center text-white font-serif font-extrabold text-sm tracking-wider shadow-md"
            whileHover={{ rotate: 18, scale: 1.15 }}
            transition={{ type: "spring", stiffness: 400, damping: 8 }}
          >
            Z
          </motion.span>
          <span className="font-serif text-lg font-extrabold tracking-tight text-brand-navy">
            Zynspark<span className="text-brand-gold">.</span>
          </span>
        </motion.a>

        {/* Desktop Navigation with Bouncy Links */}
        <nav className="hidden md:flex items-center gap-7 text-[11px] font-bold uppercase tracking-widest text-brand-navy/60" id="desktop-nav">
          {navLinks.map((link, idx) => (
            <motion.a
              key={link.label}
              href={link.href}
              className="text-brand-navy/70 hover:text-brand-gold transition-colors relative py-1"
              whileHover={{
                y: -4,
                scale: 1.08,
                transition: { type: "spring", stiffness: 450, damping: 10 },
              }}
              whileTap={{ scale: 0.95 }}
            >
              {link.label}
            </motion.a>
          ))}
        </nav>

        {/* Right Actions: CTA with Bouncy Spring Animation */}
        <div className="hidden md:flex items-center gap-3">
          <motion.button
            onClick={openPopup}
            className="inline-flex items-center justify-center px-5 py-2.5 text-[10px] font-bold tracking-widest uppercase border border-brand-gold bg-brand-gold text-white rounded-sm cursor-pointer shadow-md shadow-brand-gold/15"
            id="header-cta"
            whileHover={{
              scale: 1.08,
              y: -4,
              boxShadow: "0 10px 25px rgba(176,141,87,0.3)",
              transition: { type: "spring", stiffness: 450, damping: 10 },
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Sparkles className="mr-1.5 w-3.5 h-3.5" />
            Get Quick Quote
          </motion.button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-brand-navy hover:text-brand-gold transition-colors focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
          id="mobile-menu-toggle"
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu Panel */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-x-0 top-[65px] bg-brand-gray-light border-b border-brand-gray-border shadow-2xl z-40 animate-fade-in-down"
          id="mobile-nav-panel"
        >
          <div className="px-6 py-8 flex flex-col gap-4 text-sm font-semibold tracking-wide">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-brand-navy/80 hover:text-brand-gold transition-colors py-1.5 border-b border-brand-gray-border"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <button
              className="inline-flex items-center justify-center px-5 py-3 text-xs font-bold tracking-widest uppercase bg-brand-gold text-white rounded-sm text-center mt-2 cursor-pointer"
              onClick={() => {
                setIsMobileMenuOpen(false);
                openPopup();
              }}
            >
              Get Quick Quote
              <ArrowRight className="ml-2 w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
