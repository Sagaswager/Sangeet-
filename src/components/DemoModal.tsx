import React, { useState } from "react";
import { X, Calendar, CheckCircle, RefreshCw, Terminal } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedAgent?: string;
  onSuccess: () => void;
}

export default function DemoModal({
  isOpen,
  onClose,
  preselectedAgent = "LinkedIn AI Agent",
  onSuccess,
}: DemoModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [agentInterest, setAgentInterest] = useState(preselectedAgent);
  const [notes, setNotes] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !company || !phone) return;

    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      const res = await fetch("/api/demo/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          company,
          agentInterest,
          notes,
          phone,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to secure a demo booking slot.");
      }

      setIsSuccess(true);
      onSuccess();
    } catch (err: any) {
      setErrorMsg(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          {/* Dark backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-bark cursor-pointer"
          />

          {/* Modal content box */}
          <motion.div
            initial={{ scale: 0.95, y: 15, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 15, opacity: 0 }}
            className="relative bg-paper-white w-full max-w-lg p-8 rounded-3xl shadow-2xl border border-ash z-10 overflow-hidden"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-slate hover:text-bark p-1.5 hover:bg-bone-mist rounded-xl transition cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            {!isSuccess ? (
              <>
                {/* Title & Eyebrow */}
                <div className="mb-6">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-slate bg-ash/40 px-2 py-1 rounded">
                    PILOT BOOKING
                  </span>
                  <h3 className="text-2xl font-classic font-semibold tracking-tight text-bark mt-2">
                    Book a Live Lab Demo
                  </h3>
                  <p className="text-sm text-slate mt-1.5 leading-relaxed">
                    Join our research engineers for a live walkthrough of custom B2B outreach agent integrations.
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  {errorMsg && (
                    <div className="bg-red-50 text-red-800 text-xs p-3 rounded-xl border border-red-200">
                      {errorMsg}
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-mono font-semibold text-slate mb-1">
                      YOUR FULL NAME
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ayush Malhotra"
                      className="w-full bg-bone-mist border border-ash/70 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-bark"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono font-semibold text-slate mb-1">
                        BUSINESS EMAIL
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@company.com"
                        className="w-full bg-bone-mist border border-ash/70 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-bark"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono font-semibold text-slate mb-1">
                        COMPANY NAME
                      </label>
                      <input
                        type="text"
                        required
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="Acme Corp"
                        className="w-full bg-bone-mist border border-ash/70 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-bark"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-semibold text-slate mb-1">
                      PHONE NUMBER
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 9811734477"
                      className="w-full bg-bone-mist border border-ash/70 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-bark"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-semibold text-slate mb-1">
                      AGENT BLUEPRINT OF INTEREST
                    </label>
                    <select
                      value={agentInterest}
                      onChange={(e) => setAgentInterest(e.target.value)}
                      className="w-full bg-bone-mist border border-ash/70 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-bark text-bark"
                    >
                      <option value="LinkedIn AI Agent">LinkedIn AI Agent</option>
                      <option value="AI Vouchers Discount Deals">AI Vouchers Discount Deals</option>
                      <option value="Custom Prototyped Agent">Custom Prototyped Agent</option>
                      <option value="Bespoke Integration Request">Bespoke Integration Request</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-semibold text-slate mb-1">
                      ADDITIONAL WORKFLOW DETAILS (OPTIONAL)
                    </label>
                    <textarea
                      rows={2}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Mention custom systems, target channels, or specific timing guidelines..."
                      className="w-full bg-bone-mist border border-ash/70 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-bark resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-bark hover:opacity-90 disabled:opacity-50 text-paper-white font-semibold py-3 px-4 rounded-xl text-sm transition duration-150 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCw className="h-4 w-4 animate-spin" />
                        <span>Scheduling Node...</span>
                      </>
                    ) : (
                      <>
                        <Calendar className="h-4 w-4 text-chartreuse-pop" />
                        <span>Confirm Demo Schedule</span>
                      </>
                    )}
                  </button>
                </form>
              </>
            ) : (
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="text-center py-6"
              >
                <div className="flex justify-center mb-4">
                  <CheckCircle className="h-14 w-14 text-sage" />
                </div>
                <h3 className="text-2xl font-classic font-semibold text-bark">
                  Demo Reserved Successfully!
                </h3>
                <p className="text-sm text-slate mt-2 max-w-sm mx-auto leading-relaxed">
                  Thank you, <span className="font-semibold text-bark">{name}</span>! Our lead engineering lab coordinator, Ayush Malhotra, has queued your demo request. We've sent a calendar hold to <span className="font-semibold text-bark">{email}</span>.
                </p>


                <button
                  onClick={onClose}
                  className="mt-8 bg-bark text-paper-white font-semibold text-xs px-6 py-2.5 rounded-full hover:opacity-90 transition cursor-pointer"
                >
                  Close Portal
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
