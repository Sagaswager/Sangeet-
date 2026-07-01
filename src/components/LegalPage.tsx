import React, { useEffect } from "react";
import { motion } from "motion/react";
import { X, Printer, ShieldCheck, FileText, RotateCcw, Calendar, Check } from "lucide-react";

interface LegalPageProps {
  pageType: "privacy" | "refund" | "terms";
  onClose: () => void;
}

export function LegalPage({ pageType, onClose }: LegalPageProps) {
  // Prevent body scrolling when the legal page is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const renderContent = () => {
    switch (pageType) {
      case "privacy":
        return (
          <div className="space-y-8 font-sans text-slate leading-relaxed text-sm md:text-base">
            <section>
              <h3 className="text-lg font-sans font-semibold text-bark mb-3 tracking-tight">1. Scope and Commitment</h3>
              <p>
                At Intellitech AI Labs, we are committed to safeguarding the privacy and digital assets of our enterprise partners and B2B customers. This Privacy Policy outlines our strict protocols regarding the collection, transmission, containment, and utilization of business-related metadata, lead pipelines, and integrated database credentials across our specialized B2B outreach agents (including the LinkedIn AI Agent and customer deal routing channels).
              </p>
            </section>

            <section>
              <h3 className="text-lg font-sans font-semibold text-bark mb-3 tracking-tight">2. Information Containment & Collection</h3>
              <p>
                To calibrate and deploy B2B agent blueprints, we process only the strictly necessary business inputs. This may include:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2 text-slate/90">
                <li>Corporate profile metadata and public business registration identifiers.</li>
                <li>Authorized target lead parameters and outreach messaging criteria.</li>
                <li>Temporary CRM authorization credentials, securely stored inside encrypted runtime containers.</li>
                <li>Bespoke pilot scheduling metadata (including names, emails, and corporate alignment notes).</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-sans font-semibold text-bark mb-3 tracking-tight">3. Live Gateway Data Pipeline & Security</h3>
              <p>
                All telemetry data, outreach payloads, and model prompts routed through our active gateways are encrypted end-to-end utilizing TLS 1.3 encryption protocols. We enforce strict data-handling policies:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2 text-slate/90">
                <li><strong>No Model Training:</strong> We explicitly opt out of third-party frontier model training pipelines. Your business outreach copy and custom enterprise logs remain strictly proprietary and are never used to train global generative architectures.</li>
                <li><strong>Zero-Retention Database Sandboxes:</strong> Sandbox logs created for debugging are automatically flushed every 48 hours to minimize any lingering digital footprint.</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-sans font-semibold text-bark mb-3 tracking-tight">4. Third-Party Integrations & Consent</h3>
              <p>
                Our B2B agents interface with external communication nodes (such as official professional networking portals, B2C discount deal systems, and calendar tools) strictly on behalf of and as directed by the customer. We never share, trade, or distribute your corporate database pipelines or target lists to unauthorized brokers or competitive entities.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-sans font-semibold text-bark mb-3 tracking-tight">5. Contact and Compliance Node</h3>
              <p>
                For data compliance requests, deletion mandates, or encryption key updates, please contact our lead security coordinator directly at <span className="font-semibold text-bark">ayushmalhotra1703@gmail.com</span>.
              </p>
            </section>
          </div>
        );

      case "refund":
        return (
          <div className="space-y-8 font-sans text-slate leading-relaxed text-sm md:text-base">
            <section>
              <h3 className="text-lg font-sans font-semibold text-bark mb-3 tracking-tight">1. Enterprise Setup Calibration Fees</h3>
              <p>
                Bespoke B2B agent deployments require extensive manual integration, testing, pipeline connection, and system engineering. Consequently:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2 text-slate/90">
                <li>Custom orchestration setup fees, customized sandbox deployments, and diagnostic calibration procedures are non-refundable once engineering sprints have commenced.</li>
                <li>Standard monthly agent runtime subscription costs (for example, our LinkedIn AI Agent starts at ₹5,000 per month) are eligible for a prorated adjustment under specific service level agreement (SLA) conditions.</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-sans font-semibold text-bark mb-3 tracking-tight">2. SLA Subscriptions & Trial Nodes</h3>
              <p>
                If an integrated agent delivery node fails to perform as specified inside your customized pilot SLA due to underlying technical server downtime or direct framework errors:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2 text-slate/90">
                <li>A full refund of the current billing month's subscription runtime fee will be issued if the service interruption exceeds a cumulative 72 hours within any single billing cycle.</li>
                <li>Alternatively, customers may choose to receive equivalent runtime service credits to offset future agency renewals.</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-sans font-semibold text-bark mb-3 tracking-tight">3. Cancellation Protocol</h3>
              <p>
                Subscriptions can be paused, terminated, or adjusted at any point during your active billing billing cycle. To prevent automated renewal billing, cancellations must be registered through your designated lab liaison or emailed directly to <span className="font-semibold text-bark">ayushmalhotra1703@gmail.com</span> at least 3 business days before the next automated renewal sweep.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-sans font-semibold text-bark mb-3 tracking-tight">4. Processing Timelines</h3>
              <p>
                Approved refunds are processed immediately and routed back to the original source of corporate funding within 5 to 7 business days, depending on localized banking gateways in South Delhi and international routing networks.
              </p>
            </section>
          </div>
        );

      case "terms":
        return (
          <div className="space-y-8 font-sans text-slate leading-relaxed text-sm md:text-base">
            <section>
              <h3 className="text-lg font-sans font-semibold text-bark mb-3 tracking-tight">1. Service Alignment & Acceptance</h3>
              <p>
                By commissioning, calibrating, or interacting with agent blueprints hosted by Intellitech AI Labs, you explicitly agree to adhere to these Terms and Conditions. These terms govern all subscription nodes, custom prototyping sandboxes, CRM connections, and B2B consultative delivery sprints.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-sans font-semibold text-bark mb-3 tracking-tight">2. Permitted Use & Safety Thresholds</h3>
              <p>
                Intellitech AI Labs provides powerful digital labor tools designed to optimize professional relationship management. You agree to utilize these agents strictly under ethical, legal operational bounds:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2 text-slate/90">
                <li><strong>Compliance with Platform Rules:</strong> You must configure target agent messaging speeds, volumetric caps, and lead prospecting templates in absolute compliance with localized regulations (such as CAN-SPAM, GDPR, and target professional network user agreements).</li>
                <li><strong>No Malicious Spoofing:</strong> Agents must not be calibrated to deliberately impersonate real human identities for fraudulent, illegal, or deceptive purposes. All outbound agents must accurately represent the sponsoring corporate entity.</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-sans font-semibold text-bark mb-3 tracking-tight">3. Intelectual Property Safeguards</h3>
              <p>
                The underlying software engine architectures, natural language pipeline configurations, vector databases, and interactive laboratory frontends developed by Intellitech AI Labs are protected by intellectual property laws. Customers receive an exclusive, non-transferable, revocable license to operate their assigned runtime agents during the active paid subscription term.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-sans font-semibold text-bark mb-3 tracking-tight">4. Disclaimer of Model Guarantees</h3>
              <p>
                Since AI models process dynamic inputs based on third-party generative architectures (including frontier models), Intellitech AI Labs does not guarantee absolute mathematical correctness or specific business conversion rates. Customers are highly encouraged to operate in a "human-in-the-loop" capacity during initial pilot integrations to review critical outbound payloads.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-sans font-semibold text-bark mb-3 tracking-tight">5. Venue of Resolution</h3>
              <p>
                These Terms are governed by and construed in accordance with the regulatory frameworks of New Delhi, India. Any disputes arising from these services shall be subject to the exclusive jurisdiction of the competent courts in New Delhi, India.
              </p>
            </section>
          </div>
        );
    }
  };

  const getPageHeader = () => {
    switch (pageType) {
      case "privacy":
        return {
          title: "Privacy Policy Document",
          tag: "COMPLIANCE STACK",
          icon: <ShieldCheck className="h-6 w-6 text-sage" />
        };
      case "refund":
        return {
          title: "Refund & Cancellation Policy",
          tag: "SUBSCRIPTION SLA",
          icon: <RotateCcw className="h-6 w-6 text-[#cccc25]" />
        };
      case "terms":
        return {
          title: "Terms and Conditions Node",
          tag: "LEGAL INFRASTRUCTURE",
          icon: <FileText className="h-6 w-6 text-periwinkle-wash" />
        };
    }
  };

  const header = getPageHeader();

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 15 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="fixed inset-0 z-50 bg-bone-mist/95 backdrop-blur-md flex flex-col overflow-hidden"
    >
      {/* Top action bar */}
      <div className="bg-paper-white border-b border-ash py-4 px-6 md:px-12 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-bone-mist border border-ash/50 flex items-center justify-center">
            {header.icon}
          </div>
          <div>
            <span className="text-[10px] font-mono font-bold tracking-widest text-slate block leading-none">
              {header.tag}
            </span>
            <h2 className="text-sm md:text-base font-classic font-semibold text-bark mt-1">
              Intellitech Labs — Legal Registry
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePrint}
            title="Print Document"
            className="p-2.5 rounded-xl text-slate hover:text-bark bg-bone-mist hover:bg-ash/40 border border-ash/70 transition cursor-pointer flex items-center justify-center focus:outline-none"
          >
            <Printer className="h-4 w-4" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            title="Close Portal"
            className="p-2.5 rounded-xl text-slate hover:text-bark bg-bark text-paper-white hover:opacity-90 border border-bark transition cursor-pointer flex items-center justify-center focus:outline-none"
          >
            <X className="h-4 w-4" />
          </motion.button>
        </div>
      </div>

      {/* Main text content scroll container */}
      <div className="flex-1 overflow-y-auto px-6 py-12 md:py-20 max-w-4xl mx-auto w-full">
        <div className="bg-paper-white p-8 md:p-14 rounded-3xl border border-ash shadow-none relative overflow-hidden">
          {/* Subtle watermark stamp */}
          <div className="absolute top-4 right-4 pointer-events-none opacity-5">
            <span className="text-7xl font-mono font-black select-none uppercase tracking-tighter">
              LABS
            </span>
          </div>

          <div className="border-b border-ash pb-6 mb-8">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-bone-mist border border-ash text-slate text-[10px] font-mono">
              <Calendar className="h-3 w-3" />
              <span>Calibrated: June 2026</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-classic font-semibold tracking-tight text-bark mt-4">
              {header.title}
            </h1>
            <p className="text-xs font-mono text-slate/60 mt-2">
              ID: LAW-REG-{pageType.toUpperCase()}-v3.5 • SECURE COMPLIANCE RECORD
            </p>
          </div>

          {renderContent()}

          <div className="mt-12 pt-8 border-t border-ash/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate/50">
            <div>
              <span>INTELLITECH AI LABS • LEGAL REPOSITORIES</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-[#cccc25]" />
              <span>CRYPTOGRAPHICALLY ASSIGNED NODE</span>
            </div>
          </div>
        </div>

        {/* Bottom clean visual margin spacer */}
        <div className="h-16" />
      </div>
    </motion.div>
  );
}
