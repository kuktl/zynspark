import { createElement, FormEvent, ReactNode, useEffect, useState } from "react";
import {
  X,
  Sparkles,
  Zap,
  Phone,
  CheckCircle2,
  Send,
  ShieldCheck,
  MessageSquare,
} from "lucide-react";

// The modal opens on demand; CSS transitions are sufficient here and avoid
// loading an animation engine on the initial mobile render.
const withoutAnimationProps = ({
  initial,
  animate,
  exit,
  transition,
  whileHover,
  whileTap,
  ...props
}: Record<string, unknown>) => props;
const motion = {
  div: (props: Record<string, unknown>) => createElement("div", withoutAnimationProps(props)),
  button: (props: Record<string, unknown>) => createElement("button", withoutAnimationProps(props)),
};
const AnimatePresence = ({ children }: { children: ReactNode }) => <>{children}</>;

const FORMCARRY_ENDPOINT = "https://formcarry.com/s/cWVBr3t_5Lr";

export default function QuoteModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"quick" | "whatsapp">("quick");

  // Form fields strictly focused on user requirements:
  // Full Name, WhatsApp Number, Email ID, Requirement
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [requirement, setRequirement] = useState("");

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Listen for custom open events across the app
  useEffect(() => {
    const handleOpen = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail?.service) {
        setRequirement(customEvent.detail.service);
      }
      if (customEvent.detail?.tab === "whatsapp") {
        setActiveTab("whatsapp");
      } else {
        setActiveTab("quick");
      }
      setIsOpen(true);
      setSubmitted(false);
    };

    window.addEventListener("open_consultation_popup", handleOpen);
    window.addEventListener("open_quote_modal", handleOpen);
    window.addEventListener("open_quote_popup", handleOpen);

    return () => {
      window.removeEventListener("open_consultation_popup", handleOpen);
      window.removeEventListener("open_quote_modal", handleOpen);
      window.removeEventListener("open_quote_popup", handleOpen);
    };
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Please enter your name.");
      return;
    }
    if (!phone.trim() && !email.trim()) {
      alert("Please enter at least one contact method (WhatsApp/Phone or Email).");
      return;
    }

    setIsSubmitting(true);

    const payload = {
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      requirement: requirement.trim() || "General Growth Consultation",
      submittedAt: new Date().toISOString(),
    };

    // Backup to local storage
    try {
      const existing = JSON.parse(localStorage.getItem("zynspark_quotes") || "[]");
      existing.push(payload);
      localStorage.setItem("zynspark_quotes", JSON.stringify(existing));
    } catch {
      // ignore storage errors
    }

    // Submit to Formcarry endpoint if configured
    const endpoint =
      localStorage.getItem("zynspark_formcarry_endpoint") ||
      (import.meta as any).env?.VITE_FORMCARRY_ENDPOINT ||
      FORMCARRY_ENDPOINT;
    if (endpoint.trim()) {
      let url = endpoint.trim();
      if (!url.startsWith("http")) {
        url = `https://formcarry.com/s/${url}`;
      }
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(payload),
        });
        if (!response.ok) {
          throw new Error(`Form submission failed with status ${response.status}`);
        }
      } catch (err) {
        console.warn("Formcarry dispatch warning:", err);
        alert("We couldn't send your request right now. Please try again or contact us on WhatsApp.");
        setIsSubmitting(false);
        return;
      }
    }

    setIsSubmitting(false);
    setSubmitted(true);
  };

  const openWhatsAppDirect = () => {
    const text = encodeURIComponent(
      `Hello Zynspark! I would like to request a quote.\n\n*Name:* ${name || "Client"}\n*WhatsApp/Phone:* ${phone || "N/A"}\n*Email:* ${email || "N/A"}\n*Requirement:* ${requirement || "General Inquiry"}`
    );
    window.open(`https://wa.me/917893932843?text=${text}`, "_blank");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-brand-navy/60 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 380, damping: 24 }}
            className="relative w-full max-w-lg bg-brand-gray-light border-2 border-brand-gold/60 rounded-xl shadow-2xl overflow-hidden z-10 my-auto"
            id="quote-request-modal"
          >
            {/* Header */}
            <div className="bg-brand-section text-brand-navy p-6 relative border-b border-brand-gray-border">
              <motion.button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 p-2 text-brand-navy-light/70 hover:text-brand-navy bg-black/5 hover:bg-brand-gold/20 rounded-full transition-colors cursor-pointer"
                whileHover={{ scale: 1.2, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Close modal"
                id="close-quote-modal-btn"
              >
                <X className="w-5 h-5" />
              </motion.button>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-gold/15 border border-brand-gold/40 rounded-full text-[10px] font-extrabold uppercase tracking-widest text-brand-gold mb-2">
                <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
                Quick Quote Request
              </div>

              <h3 className="font-serif text-2xl font-extrabold text-brand-navy">
                Get Your Project Proposal
              </h3>
              <p className="text-xs text-brand-navy-light/80 mt-1 leading-relaxed">
                Fill in your contact details and requirement for a fast turnaround.
              </p>

              {/* Toggle Tabs */}
              <div className="flex gap-2 mt-5 pt-3 border-t border-brand-gray-border">
                {[
                  { id: "quick", label: "Quick Quote", icon: Zap },
                  { id: "whatsapp", label: "WhatsApp Direct", icon: Phone },
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <motion.button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`flex-1 py-2 px-3 rounded-md text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                        isActive
                          ? "bg-brand-gold text-paper shadow-md font-extrabold"
                          : "bg-brand-cream text-brand-navy hover:bg-brand-cream/80 border border-brand-gray-border"
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{tab.label}</span>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 bg-brand-gray-light">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-6"
                >
                  <div className="w-14 h-14 bg-green-500/10 text-green-600 border border-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h4 className="font-serif text-xl font-extrabold text-brand-navy mb-1.5">
                    Request Submitted!
                  </h4>
                  <p className="text-xs text-brand-navy-light max-w-sm mx-auto leading-relaxed mb-5">
                    Thank you, <span className="font-bold text-brand-navy">{name}</span>. Our growth specialist will reach out to you directly shortly.
                  </p>

                  <div className="bg-brand-cream border border-brand-gray-border rounded-lg p-4 max-w-sm mx-auto text-left text-xs mb-5 space-y-2">
                    <div className="text-[10px] font-extrabold uppercase tracking-widest text-brand-navy-light/60 border-b border-brand-gray-border pb-1">
                      Submitted Details
                    </div>
                    <div><strong className="text-brand-navy">Name:</strong> {name}</div>
                    {phone && <div><strong className="text-brand-navy">WhatsApp / Phone:</strong> {phone}</div>}
                    {email && <div><strong className="text-brand-navy">Email:</strong> {email}</div>}
                    {requirement && <div><strong className="text-brand-navy">Requirement:</strong> {requirement}</div>}
                  </div>

                  <motion.button
                    onClick={() => setIsOpen(false)}
                    className="px-6 py-2.5 bg-brand-gold text-paper rounded-sm font-bold text-xs uppercase tracking-widest cursor-pointer shadow-md"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Close
                  </motion.button>
                </motion.div>
              ) : activeTab === "quick" ? (
                /* Quick Quote Form */
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-extrabold text-brand-navy uppercase tracking-wider mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. John Doe"
                      className="w-full bg-brand-cream border border-brand-gray-border px-3.5 py-2.5 text-xs text-brand-navy placeholder:text-brand-navy-light/40 focus:outline-none focus:border-brand-gold rounded-sm"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-extrabold text-brand-navy uppercase tracking-wider mb-1">
                        WhatsApp / Phone Number *
                      </label>
                      <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full bg-brand-cream border border-brand-gray-border px-3.5 py-2.5 text-xs text-brand-navy placeholder:text-brand-navy-light/40 focus:outline-none focus:border-brand-gold rounded-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-extrabold text-brand-navy uppercase tracking-wider mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@company.com"
                        className="w-full bg-brand-cream border border-brand-gray-border px-3.5 py-2.5 text-xs text-brand-navy placeholder:text-brand-navy-light/40 focus:outline-none focus:border-brand-gold rounded-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-extrabold text-brand-navy uppercase tracking-wider mb-1">
                      Requirement / Project Scope *
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={requirement}
                      onChange={(e) => setRequirement(e.target.value)}
                      placeholder="Describe what you need (e.g. Website redesign, AI automation, Google Ads setup)..."
                      className="w-full bg-brand-cream border border-brand-gray-border px-3.5 py-2.5 text-xs text-brand-navy placeholder:text-brand-navy-light/40 focus:outline-none focus:border-brand-gold rounded-sm resize-none"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 bg-brand-gold text-paper font-extrabold text-xs tracking-widest uppercase rounded-sm shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isSubmitting ? (
                      <span>Sending Request...</span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Submit Quick Quote Request</span>
                      </>
                    )}
                  </motion.button>
                </form>
              ) : (
                /* Direct WhatsApp */
                <div className="space-y-4 py-2">
                  <div className="text-center">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: -5 }}
                      className="w-14 h-14 bg-green-500/10 text-green-600 border border-green-500/30 rounded-full flex items-center justify-center mx-auto mb-2"
                    >
                      <MessageSquare className="w-7 h-7" />
                    </motion.div>
                    <h4 className="font-serif text-lg font-extrabold text-brand-navy">
                      Direct WhatsApp Quote
                    </h4>
                    <p className="text-xs text-brand-navy-light leading-relaxed max-w-xs mx-auto mb-4">
                      Chat directly with our strategist on WhatsApp for an immediate response.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-[10px] font-extrabold text-brand-navy uppercase tracking-wider mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your Name"
                        className="w-full bg-brand-cream border border-brand-gray-border px-3.5 py-2 text-xs text-brand-navy placeholder:text-brand-navy-light/40 focus:outline-none focus:border-brand-gold rounded-sm"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[10px] font-extrabold text-brand-navy uppercase tracking-wider mb-1">
                          WhatsApp / Phone
                        </label>
                        <input
                          type="text"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+91 98765 43210"
                          className="w-full bg-brand-cream border border-brand-gray-border px-3.5 py-2 text-xs text-brand-navy placeholder:text-brand-navy-light/40 focus:outline-none focus:border-brand-gold rounded-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-extrabold text-brand-navy uppercase tracking-wider mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Your Email"
                          className="w-full bg-brand-cream border border-brand-gray-border px-3.5 py-2 text-xs text-brand-navy placeholder:text-brand-navy-light/40 focus:outline-none focus:border-brand-gold rounded-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-extrabold text-brand-navy uppercase tracking-wider mb-1">
                        Requirement / Scope
                      </label>
                      <input
                        type="text"
                        value={requirement}
                        onChange={(e) => setRequirement(e.target.value)}
                        placeholder="e.g. Website design, AI Bot..."
                        className="w-full bg-brand-cream border border-brand-gray-border px-3.5 py-2 text-xs text-brand-navy placeholder:text-brand-navy-light/40 focus:outline-none focus:border-brand-gold rounded-sm"
                      />
                    </div>
                  </div>

                  <motion.button
                    onClick={openWhatsAppDirect}
                    className="w-full py-3.5 bg-green-600 hover:bg-green-700 text-paper font-extrabold text-xs tracking-widest uppercase rounded-sm shadow-md flex items-center justify-center gap-2 cursor-pointer mt-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Phone className="w-4 h-4" />
                    <span>Directly Open WhatsApp</span>
                  </motion.button>
                </div>
              )}

              <div className="mt-4 pt-3 border-t border-brand-gray-border flex items-center justify-between text-[10px] text-brand-navy-light/60">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-brand-gold" /> 100% Confidential
                </span>
                <span className="text-brand-navy-light/50">
                  Zynspark Digital Studio
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
