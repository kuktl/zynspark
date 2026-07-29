import { useState, FormEvent } from "react";
import { Mail, Phone, Clock, MapPin, Send, CheckCircle2, ArrowRight, AlertCircle, Shield } from "lucide-react";
import { motion } from "motion/react";
import { ContactFormInput } from "../types";

const FORMCARRY_ENDPOINT = "https://formcarry.com/s/cWVBr3t_5Lr";

export default function ContactFooter() {
  const [formInput, setFormInput] = useState<ContactFormInput>({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "Website Design & Development",
    message: "",
    region: "Global",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Formcarry integrations state
  const [formcarryEndpoint, setFormcarryEndpoint] = useState<string>(() => {
    return localStorage.getItem("zynspark_formcarry_endpoint") || (import.meta as any).env?.VITE_FORMCARRY_ENDPOINT || FORMCARRY_ENDPOINT;
  });
  const [formcarryReturnUrl, setFormcarryReturnUrl] = useState<string>(() => {
    return localStorage.getItem("zynspark_formcarry_return_url") || (import.meta as any).env?.VITE_FORMCARRY_RETURN_URL || "";
  });
  const [isFormcarryEnabled, setIsFormcarryEnabled] = useState<boolean>(() => {
    const saved = localStorage.getItem("zynspark_formcarry_enabled");
    if (saved !== null) return saved === "true";
    return true;
  });
  const [formError, setFormError] = useState<string | null>(null);

  // Hidden Honeypot for silent background bot protection
  const [honeypotValue, setHoneypotValue] = useState("");

  const getNormalizedEndpoint = (val: string) => {
    if (!val) return "";
    const trimmed = val.trim();
    if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
      return trimmed;
    }
    return `https://formcarry.com/s/${trimmed}`;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError(null);

    // 1. Cooldown Rate-Limiting Protection (Silent background check)
    const lastSubmitTime = localStorage.getItem("zynspark_last_submit_time");
    if (lastSubmitTime) {
      const diff = Date.now() - parseInt(lastSubmitTime, 10);
      const cooldown = 30 * 1000; // 30-second cooldown
      if (diff < cooldown) {
        const secondsLeft = Math.ceil((cooldown - diff) / 1000);
        setFormError(`Please wait ${secondsLeft} seconds before submitting another request.`);
        setIsSubmitting(false);
        return;
      }
    }

    // 2. Honeypot Bot-Detection Shield (Silent background check)
    if (honeypotValue.trim()) {
      console.warn("Security Alert: Honeypot form element filled by automated bot agent.");
      // Drop silently for bots
      setIsSubmitting(false);
      setIsSubmitted(true);
      return;
    }

    // 3. Input Length & Sanity Validation
    if (formInput.name.trim().length < 2 || formInput.name.trim().length > 80) {
      setFormError("Please enter a valid full name (2-80 characters).");
      setIsSubmitting(false);
      return;
    }
    if (formInput.message.trim().length > 2000) {
      setFormError("Project description exceeds maximum length limit of 2000 characters.");
      setIsSubmitting(false);
      return;
    }

    // 4. Heavy Injection & Code Scanning Protections (Silent background filter)
    const htmlCodeRegex = /<[^>]*>|javascript:|eval\(|onload=/i;
    const sqlInjectionKeywords = /\b(select|union|drop|insert|delete|update|truncate)\b/i;

    const inputValues = [formInput.name, formInput.email, formInput.phone || "", formInput.message];
    for (const val of inputValues) {
      if (htmlCodeRegex.test(val) || sqlInjectionKeywords.test(val)) {
        setFormError("Special execution scripts or code blocks are not permitted in the contact form.");
        setIsSubmitting(false);
        return;
      }
    }

    // 5. Fraud & Spam Word Filtering
    const bannedWords = ["wire transfer", "western union", "crypto", "bitcoin", "lottery", "gift card", "viagra", "casino", "poker", "free cash", "earn money"];
    for (const val of inputValues) {
      for (const word of bannedWords) {
        if (val.toLowerCase().includes(word)) {
          setFormError(`Inquiry contained prohibited advertising keywords ("${word}"). Submission rejected.`);
          setIsSubmitting(false);
          return;
        }
      }
    }

    const endpoint = formcarryEndpoint.trim();
    const useFormcarry = isFormcarryEnabled && endpoint;

    if (useFormcarry) {
      const targetUrl = getNormalizedEndpoint(endpoint);
      try {
        const response = await fetch(targetUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            ...formInput,
            _next: formcarryReturnUrl.trim() || undefined
          })
        });

        if (response.ok) {
          localStorage.setItem("zynspark_last_submit_time", Date.now().toString());
          try {
            const existingInquiries = JSON.parse(localStorage.getItem("zynspark_inquiries") || "[]");
            existingInquiries.push({
              ...formInput,
              submittedAt: new Date().toISOString(),
              sentToFormcarry: true,
            });
            localStorage.setItem("zynspark_inquiries", JSON.stringify(existingInquiries));
          } catch (err) {
            console.error("Local save error:", err);
          }
          setIsSubmitted(true);

          if (formcarryReturnUrl.trim()) {
            setTimeout(() => {
              window.location.href = formcarryReturnUrl.trim();
            }, 1000);
          }
        } else {
          const result = await response.json().catch(() => ({}));
          throw new Error(result.message || `Formcarry returned status ${response.status}`);
        }
      } catch (err: any) {
        console.error("Formcarry submission failed:", err);
        setFormError(err?.message || "Failed to submit form. Please check your Endpoint/ID and connection.");
      } finally {
        setIsSubmitting(false);
      }
    } else {
      // Direct clean submission flow
      setTimeout(() => {
        localStorage.setItem("zynspark_last_submit_time", Date.now().toString());
        try {
          const existingInquiries = JSON.parse(localStorage.getItem("zynspark_inquiries") || "[]");
          existingInquiries.push({
            ...formInput,
            submittedAt: new Date().toISOString(),
            sentToFormcarry: false,
          });
          localStorage.setItem("zynspark_inquiries", JSON.stringify(existingInquiries));
        } catch (err) {
          console.error("Failed to save inquiry to localStorage", err);
        }

        setIsSubmitting(false);
        setIsSubmitted(true);
      }, 800);
    }
  };

  const servicesList = [
    "Full-Funnel Retainer (Recommended)",
    "Website Design & Development",
    "Performance Ad Management",
    "Workflow & Lead Automation",
    "Custom Consulting Audit",
  ];

  const budgetRanges = [
    "Under $2,500 / month",
    "$2,500 - $10,000 / month",
    "$10,000 - $30,000 / month",
    "$30,000+ / month",
  ];

  return (
    <section className="bg-brand-cream border-t border-brand-gray-border relative" id="contact">
      <div className="absolute inset-0 bg-grid-pattern pointer-events-none opacity-20" />
      
      {/* Contact Form Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Plain Contact Info */}
          <div className="lg:col-span-5" id="contact-info">
            <span className="text-[10px] font-bold uppercase tracking-widest text-brand-gold flex items-center gap-2 mb-3">
              <span className="w-4 h-[1px] bg-brand-gold"></span> LET'S TALK
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-brand-navy uppercase leading-tight mb-6">
              Ready to Grow Your Business?
            </h2>
            <p className="text-sm md:text-base text-brand-navy-light/80 leading-relaxed mb-10">
              Let's discuss how better websites, smarter marketing, and AI automation can work together for your business.
            </p>

            {/* Direct listings with bouncy hover */}
            <div className="space-y-6 border-t border-brand-gray-border pt-8" id="direct-contact-channels">
              {/* Email */}
              <motion.div
                className="flex items-start gap-4 p-3 rounded-sm hover:bg-brand-gray-light/60 border border-transparent hover:border-brand-gray-border transition-all cursor-pointer"
                whileHover={{ y: -5, scale: 1.02, x: 4 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="w-12 h-12 rounded-sm bg-brand-gray-light border border-brand-gray-border flex items-center justify-center text-brand-gold shrink-0 shadow-inner">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold tracking-widest uppercase text-brand-navy-light/40">
                    Email
                  </h4>
                  <a
                    href="mailto:hello@zynspark.com"
                    className="text-sm font-extrabold text-brand-navy hover:text-brand-gold transition-colors duration-200"
                  >
                    hello@zynspark.com
                  </a>
                </div>
              </motion.div>

              {/* Phone */}
              <motion.div
                className="flex items-start gap-4 p-3 rounded-sm hover:bg-brand-gray-light/60 border border-transparent hover:border-brand-gray-border transition-all cursor-pointer"
                whileHover={{ y: -5, scale: 1.02, x: 4 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="w-12 h-12 rounded-sm bg-brand-gray-light border border-brand-gray-border flex items-center justify-center text-brand-gold shrink-0 shadow-inner">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold tracking-widest uppercase text-brand-navy-light/40">
                    Phone / WhatsApp
                  </h4>
                  <div className="flex flex-col gap-1.5 mt-1">
                    <a
                      href="tel:+917893932843"
                      className="text-sm font-extrabold text-brand-navy hover:text-brand-gold transition-colors duration-200 flex items-center gap-2"
                    >
                      +91 78939 32843
                    </a>
                  </div>
                </div>
              </motion.div>

              {/* Business Hours */}
              <motion.div
                className="flex items-start gap-4 p-3 rounded-sm hover:bg-brand-gray-light/60 border border-transparent hover:border-brand-gray-border transition-all cursor-pointer"
                whileHover={{ y: -5, scale: 1.02, x: 4 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="w-12 h-12 rounded-sm bg-brand-gray-light border border-brand-gray-border flex items-center justify-center text-brand-gold shrink-0 shadow-inner">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold tracking-widest uppercase text-brand-navy-light/40">
                    Office Hours
                  </h4>
                  <p className="text-sm font-extrabold text-brand-navy mt-1">
                    Mon — Fri, 10:00 AM — 7:00 PM <span className="text-xs text-brand-navy-light/40 font-semibold ml-1">(IST)</span>
                  </p>
                </div>
              </motion.div>

              {/* Office Locations */}
              <motion.div
                className="flex items-start gap-4 p-3 rounded-sm hover:bg-brand-gray-light/60 border border-transparent hover:border-brand-gray-border transition-all cursor-pointer"
                whileHover={{ y: -5, scale: 1.02, x: 4 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="w-12 h-12 rounded-sm bg-brand-gray-light border border-brand-gray-border flex items-center justify-center text-brand-gold shrink-0 shadow-inner">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold tracking-widest uppercase text-brand-navy-light/40">
                    Headquarters
                  </h4>
                  <p className="text-sm font-extrabold text-brand-navy mt-1">
                    Hyderabad, India <span className="text-xs text-brand-navy-light/50 font-normal">(Serving Clients Globally)</span>
                  </p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right Column: Interactive Form or Success State */}
          <div className="lg:col-span-7 bg-brand-gray-light border border-brand-gray-border p-8 md:p-12 rounded-sm shadow-sm" id="contact-form-container">
            {isSubmitted ? (
              <div className="text-left py-4" id="success-card">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-green-500/10 text-green-500 border border-green-500/20 rounded-full mb-6">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-2xl font-extrabold text-brand-navy mb-3">
                  Thank You! Your Request Has Been Received.
                </h3>
                <p className="text-sm text-brand-navy-light/70 leading-relaxed mb-8">
                  We have received your message regarding <strong className="text-brand-navy font-bold">{formInput.service}</strong> with a budget of <strong className="text-brand-navy font-bold">{formInput.budget}</strong>. Our team will review your details and respond shortly.
                </p>

                {/* Checklist of next steps */}
                <div className="border-t border-brand-gray-border pt-8 space-y-4">
                  <h4 className="text-[9px] font-bold tracking-widest text-brand-navy-light/40 uppercase">
                    What Happens Next
                  </h4>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3 text-xs text-brand-navy-light/85">
                      <span className="w-6 h-6 rounded-full bg-brand-gold text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">1</span>
                      <div>
                        <strong>Discovery Review:</strong> Our team will analyze your requirements and existing online presence.
                      </div>
                    </li>
                    <li className="flex items-start gap-3 text-xs text-brand-navy-light/85">
                      <span className="w-6 h-6 rounded-full bg-brand-gold text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">2</span>
                      <div>
                        <strong>Consultation Call:</strong> We'll reach out to schedule an initial discussion about your goals.
                      </div>
                    </li>
                    <li className="flex items-start gap-3 text-xs text-brand-navy-light/85">
                      <span className="w-6 h-6 rounded-full bg-brand-gold text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">3</span>
                      <div>
                        <strong>Actionable Proposal:</strong> We'll present a clear, custom strategy tailored to your growth objectives.
                      </div>
                    </li>
                  </ul>
                </div>

                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormInput({
                      name: "",
                      email: "",
                      company: "",
                      service: "Full-Funnel Retainer (Recommended)",
                      budget: "Under $2,500 / month",
                      message: "",
                      region: "Global",
                    });
                  }}
                  className="mt-10 text-xs font-bold text-brand-navy hover:text-brand-gold flex items-center gap-2 group transition-colors cursor-pointer"
                >
                  Send another message
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-brand-gold" />
                </button>
              </div>
            ) : (
              <div>
                {formError && (
                  <div className="mb-6 p-4 bg-red-500/10 border border-red-500/25 text-red-500 text-xs rounded-sm flex items-start gap-3">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-500" />
                    <div>{formError}</div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6" id="consultation-form">
                  {/* Invisible Honeypot Field */}
                  <div style={{ position: "absolute", left: "-9999px", top: "-9999px", opacity: 0, width: 0, height: 0, overflow: "hidden" }} aria-hidden="true">
                    <input
                      type="text"
                      name="website"
                      tabIndex={-1}
                      value={honeypotValue}
                      onChange={(e) => setHoneypotValue(e.target.value)}
                      autoComplete="off"
                      placeholder="Do not fill this field"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div>
                      <label htmlFor="name" className="block text-[10px] font-bold text-brand-navy uppercase mb-2 tracking-wider">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={formInput.name}
                        onChange={(e) => setFormInput({ ...formInput, name: e.target.value })}
                        placeholder="e.g. Alex Morgan"
                        className="w-full bg-brand-cream text-brand-navy placeholder:text-brand-navy-light/30 border border-brand-gray-border px-4 py-3.5 text-sm focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/20 rounded-sm"
                      />
                    </div>

                    {/* WhatsApp / Phone Number */}
                    <div>
                      <label htmlFor="phone" className="block text-[10px] font-bold text-brand-navy uppercase mb-2 tracking-wider">
                        WhatsApp / Phone Number *
                      </label>
                      <input
                        type="text"
                        id="phone"
                        required
                        value={formInput.phone || ""}
                        onChange={(e) => setFormInput({ ...formInput, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full bg-brand-cream text-brand-navy placeholder:text-brand-navy-light/30 border border-brand-gray-border px-4 py-3.5 text-sm focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/20 rounded-sm"
                      />
                    </div>
                  </div>

                  <div>
                    {/* Work Email */}
                    <label htmlFor="email" className="block text-[10px] font-bold text-brand-navy uppercase mb-2 tracking-wider">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formInput.email}
                      onChange={(e) => setFormInput({ ...formInput, email: e.target.value })}
                      placeholder="e.g. alex@company.com"
                      className="w-full bg-brand-cream text-brand-navy placeholder:text-brand-navy-light/30 border border-brand-gray-border px-4 py-3.5 text-sm focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/20 rounded-sm"
                    />
                  </div>

                  {/* Service Needed */}
                  <div>
                    <label htmlFor="service" className="block text-[10px] font-bold text-brand-navy uppercase mb-2 tracking-wider">
                      Desired Service *
                    </label>
                    <div className="relative">
                      <select
                        id="service"
                        value={formInput.service}
                        onChange={(e) => setFormInput({ ...formInput, service: e.target.value })}
                        className="w-full bg-brand-cream text-brand-navy border border-brand-gray-border px-4 py-3.5 text-sm focus:outline-none focus:border-brand-gold rounded-sm appearance-none cursor-pointer"
                      >
                        {servicesList.map((s) => (
                          <option key={s} value={s} className="bg-brand-cream text-brand-navy">
                            {s}
                          </option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-brand-navy/50">
                        ↓
                      </div>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-[10px] font-bold text-brand-navy uppercase mb-2 tracking-wider">
                      Brief Project Details *
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      required
                      value={formInput.message}
                      onChange={(e) => setFormInput({ ...formInput, message: e.target.value })}
                      placeholder="Tell us about your business, growth goals, current website, or automation needs..."
                      className="w-full bg-brand-cream text-brand-navy placeholder:text-brand-navy-light/30 border border-brand-gray-border px-4 py-3.5 text-sm focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/20 rounded-sm resize-none"
                    />
                  </div>

                  {/* Submit button with bouncy spring animation */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center py-4 bg-brand-gold text-white border border-brand-gold font-bold text-[11px] tracking-widest uppercase rounded-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-md shadow-brand-gold/10"
                    id="submit-form-button"
                    whileHover={{
                      scale: 1.05,
                      y: -5,
                      boxShadow: "0 15px 30px rgba(176,141,87,0.35)",
                      transition: { type: "spring", stiffness: 450, damping: 10 },
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isSubmitting ? (
                      "Sending Message..."
                    ) : (
                      <>
                        Get Started / Contact Us
                        <Send className="ml-2.5 w-3.5 h-3.5" />
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer Area */}
      <div className="bg-brand-cream border-t border-brand-gray-border py-16 md:py-24 relative" id="agency-footer">
        <div className="absolute inset-0 bg-grid-pattern pointer-events-none opacity-25" />
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            
            {/* Logo Wordmark column */}
            <div className="md:col-span-1">
              <a href="#" className="flex items-center gap-2 mb-5">
                <span className="w-8 h-8 rounded-sm bg-brand-gold text-white flex items-center justify-center font-serif font-black text-lg tracking-wider">
                  Z
                </span>
                <span className="font-serif text-xl font-extrabold tracking-tight text-brand-navy uppercase">
                  ZYNSPARK<span className="text-brand-gold">.</span>
                </span>
              </a>
              <p className="text-xs text-brand-navy-light/50 leading-relaxed max-w-xs">
                A classic, full-funnel digital growth agency engineering custom high-conversion websites, targeted paid advertising campaigns, and seamless marketing workflow automations.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h5 className="text-[11px] font-bold tracking-widest text-brand-navy mb-5 uppercase">
                Capabilities
              </h5>
              <ul className="space-y-3.5 text-xs text-brand-navy-light/60">
                <li>
                  <a href="#services" className="hover:text-brand-gold transition-colors duration-200">
                    Engineered Websites
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-brand-gold transition-colors duration-200">
                    Performance Ads
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-brand-gold transition-colors duration-200">
                    Workflow Automation
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-brand-gold transition-colors duration-200">
                    Consulting Audits
                  </a>
                </li>
              </ul>
            </div>

            {/* Methodologies */}
            <div>
              <h5 className="text-[11px] font-bold tracking-widest text-brand-navy mb-5 uppercase">
                Methodologies
              </h5>
              <ul className="space-y-3.5 text-xs text-brand-navy-light/60">
                <li>
                  <a href="#why" className="hover:text-brand-gold transition-colors duration-200">
                    Philosophy
                  </a>
                </li>
                <li>
                  <a href="#process" className="hover:text-brand-gold transition-colors duration-200">
                    5-Stage Blueprint
                  </a>
                </li>
                <li>
                  <a href="#faq" className="hover:text-brand-gold transition-colors duration-200">
                    Technical FAQ
                  </a>
                </li>
              </ul>
            </div>

            {/* Business Registrations */}
            <div>
              <h5 className="text-[11px] font-bold tracking-widest text-brand-navy mb-5 uppercase">
                Confidentiality Trust
              </h5>
              <p className="text-xs text-brand-navy-light/50 leading-relaxed mb-4">
                All client metrics, source codes, and campaign configurations are protected under strict legal-grade master services agreements (MSAs) and strict non-disclosure contracts.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="inline-block text-[8px] font-mono tracking-widest text-brand-navy-light/55 bg-brand-gray-light border border-brand-gray-border px-3 py-1.5 uppercase rounded-sm font-bold">
                  NDA GUARDED
                </span>
                <span className="inline-block text-[8px] font-mono tracking-widest text-brand-navy-light/55 bg-brand-gray-light border border-brand-gray-border px-3 py-1.5 uppercase rounded-sm font-bold">
                  VETTING CERTIFIED
                </span>
              </div>
            </div>
          </div>

          {/* Copyright row */}
          <div className="border-t border-brand-gray-border pt-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-brand-navy-light/40" id="footer-copyright-row">
            <p>© {new Date().getFullYear()} Zynspark Digital Group. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-brand-gold transition-colors duration-200">
                Privacy Agreement
              </a>
              <a href="#" className="hover:text-brand-gold transition-colors duration-200">
                Terms of Service
              </a>
              <a href="#" className="hover:text-white transition-colors duration-200">
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
