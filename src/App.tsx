import React, { useState, useEffect } from "react";
import { siteContent } from "./data";
import { Agent, RoadmapItem, DemoBooking, ConsultationRequest } from "./types";
import Navigation from "./components/Navigation";
import AgentCard from "./components/AgentCard";
import AgentChatDrawer from "./components/AgentChatDrawer";
import DemoModal from "./components/DemoModal";
import AdminPanel from "./components/AdminPanel";
import { LegalPage } from "./components/LegalPage";
import { 
  Bot, Sparkles, Terminal, ArrowRight, ChevronRight, Mail, Phone, MapPin, 
  Plus, Check, TrendingUp, PlusCircle, CheckCircle, HelpCircle, Star, Shield, 
  Zap, Calendar, Clock, HeartHandshake, RefreshCw
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import TubesBackground from "./components/TubesBackground";

export default function App() {
  // Dark Mode state (Always forced to true for dark mode only app)
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("isDarkMode", String(isDarkMode));
  }, [isDarkMode]);

  // Modal states
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [preselectedAgent, setPreselectedAgent] = useState("LinkedIn AI Agent");

  // Chat Drawer states
  const [activeChatAgent, setActiveChatAgent] = useState<Agent | null>(null);

  // Legal page overlay state
  const [currentPolicyPage, setCurrentPolicyPage] = useState<"privacy" | "refund" | "terms" | null>(null);

  // Administrative / CRM state
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [crmTrigger, setCrmTrigger] = useState(0); // Tick to reload leads inside AdminPanel

  // Interactive local states for Custom Prototyping agent
  const [customAgents, setCustomAgents] = useState<Agent[]>([]);
  const [customAgentName, setCustomAgentName] = useState("");
  const [customAgentPrompt, setCustomAgentPrompt] = useState("");
  const [customAgentTheme, setCustomAgentTheme] = useState<"periwinkle" | "moss" | "slate-blue" | "sage">("periwinkle");
  const [isCustomCreated, setIsCustomCreated] = useState(false);

  // Roadmap voting states
  const [roadmapItems, setRoadmapItems] = useState<RoadmapItem[]>(siteContent.roadmap.items);
  const [votedIds, setVotedIds] = useState<string[]>([]);

  // Inline Consultation Request state
  const [consultName, setConsultName] = useState("");
  const [consultEmail, setConsultEmail] = useState("");
  const [consultPhone, setConsultPhone] = useState("");
  const [consultDetails, setConsultDetails] = useState("");
  const [isConsultSubmitting, setIsConsultSubmitting] = useState(false);
  const [isConsultSuccess, setIsConsultSuccess] = useState(false);
  const [consultError, setConsultError] = useState<string | null>(null);

  // Live Terminal Logs Simulator inside the Hero block
  const [simulatedLogs, setSimulatedLogs] = useState<string[]>([
    "[SYSTEM] Initiating campaign gateway node 34...",
    "[LINKEDIN_AGENT] Standard search filter applied: Title=CEO Location=US",
  ]);

  useEffect(() => {
    const logsTemplates = [
      "[LINKEDIN_AGENT] Personalized invitation compiled for VP of Growth at Stripe.",
      "[VOUCHERS_CONCIERGE] Composite calculation complete: Starbucks 15% + coupon hold.",
      "[LINKEDIN_AGENT] Outbound pipeline updated. Checked 14 profiles.",
      "[SYSTEM] Routing telemetry report toSouth Delhi, Chatarpur office gateway.",
      "[VOUCHERS_CONCIERGE] Curating exclusive 2026 winter deals for Nike store locator.",
      "[LINKEDIN_AGENT] Appointment booked successfully: Friday at 2:00 PM EST.",
      "[SYSTEM] CPU utilization stable. 100% agent operational health.",
    ];

    const interval = setInterval(() => {
      const randomLine = logsTemplates[Math.floor(Math.random() * logsTemplates.length)];
      setSimulatedLogs((prev) => {
        const next = [...prev, `[${new Date().toLocaleTimeString()}] ${randomLine}`];
        if (next.length > 5) return next.slice(1);
        return next;
      });
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  // Handle upvoting Roadmap
  const handleVote = (id: string) => {
    if (votedIds.includes(id)) return;
    setRoadmapItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, upvotes: item.upvotes + 1 } : item))
    );
    setVotedIds((prev) => [...prev, id]);
  };

  // Launch prefilled Book Demo Modal
  const handleDeployAgentClick = (agentName: string) => {
    setPreselectedAgent(agentName);
    setIsDemoModalOpen(true);
  };

  // Handle Custom Agent form creation
  const handleCreateCustomAgent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customAgentName || !customAgentPrompt) return;

    const newAgent: Agent = {
      id: "custom",
      name: customAgentName,
      description: customAgentPrompt,
      price: "Bespoke Blueprint pricing",
      link: "/linkedin-agent",
      colorTheme: customAgentTheme,
      iconName: "Bot",
    };

    setCustomAgents([newAgent]); // Supports one custom prototyped agent at a time
    setIsCustomCreated(true);
    
    // Auto launch prompt feedback
    setTimeout(() => {
      setIsCustomCreated(false);
    }, 3000);
  };

  // Submit Bespoke Consultation
  const handleConsultSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consultName || !consultEmail || !consultDetails || !consultPhone) return;

    setIsConsultSubmitting(true);
    setConsultError(null);

    try {
      const res = await fetch("/api/consultation/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: consultName,
          email: consultEmail,
          phone: consultPhone,
          details: consultDetails,
        }),
      });

      if (!res.ok) {
        throw new Error("Could not register your B2B campaign parameters.");
      }

      setIsConsultSuccess(true);
      setCrmTrigger((prev) => prev + 1); // Trigger Admin lead list update

      // Reset
      setConsultName("");
      setConsultEmail("");
      setConsultPhone("");
      setConsultDetails("");
    } catch (err: any) {
      setConsultError(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setIsConsultSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans antialiased text-bark bg-bone-mist selection:bg-periwinkle-wash/35">
      
      {/* Sticky Header Navigation */}
      <Navigation 
        onBookDemoClick={() => setIsDemoModalOpen(true)}
        isAdminMode={isAdminMode}
        onToggleAdminMode={() => setIsAdminMode(!isAdminMode)}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
      />

      {/* Main Container */}
      <main className="flex-grow">
        
        {/* COLLAPSIBLE LAB ADMIN PANEL */}
        <AnimatePresence>
          {isAdminMode && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-[#0a0a0c] border-b border-zinc-800"
            >
              <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                <AdminPanel onBookingUpdateTrigger={crmTrigger} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* HERO SECTION */}
        <section className="relative overflow-visible py-20 lg:py-28 border-b border-zinc-800 bg-[#0a0a0c]">
          <TubesBackground className="opacity-90 h-[calc(100%+120px)]" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Text Blocks */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="lg:col-span-8 lg:col-start-3 flex flex-col items-center text-center"
              >
                <div className="inline-flex items-center gap-2 mb-4">
                  <span className="text-[13px] font-sans font-medium uppercase tracking-[0.071em] text-zinc-400">
                    {siteContent.hero.eyebrow}
                  </span>
                </div>

                <h1 className="heading-display text-4xl sm:text-5xl lg:text-[72px] tracking-[-2.88px] leading-[1.02] text-white mb-6 text-center">
                  {siteContent.hero.heading}
                </h1>

                <p className="text-base sm:text-lg text-zinc-300 leading-relaxed max-w-2xl mb-8 font-sans text-center mx-auto">
                  {siteContent.hero.subheading}
                </p>

                 {/* Two stacked pill buttons: white first, chartreuse second — never place them side by side */}
                <div className="flex flex-col gap-3 w-full sm:w-[320px] mx-auto">
                  <motion.button
                    whileHover={{ scale: 1.03, y: -3 }}
                    whileTap={{ scale: 0.94 }}
                    transition={{ type: "spring", stiffness: 500, damping: 18 }}
                    onClick={() => setIsDemoModalOpen(true)}
                    className="group bg-white hover:bg-zinc-100 hover:shadow-[0_0_30px_rgba(255,255,255,0.25)] text-black text-center font-medium text-base py-4.5 px-8 rounded-full transition-all duration-150 cursor-pointer focus:outline-none"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <span>{siteContent.hero.primaryCta.toUpperCase()}</span>
                      <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1.5" />
                    </span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.03, y: -3 }}
                    whileTap={{ scale: 0.94 }}
                    transition={{ type: "spring", stiffness: 500, damping: 18 }}
                    onClick={() => {
                      document.getElementById("agents")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="group bg-[#cccc25] hover:bg-[#cccc25]/95 hover:shadow-[0_0_30px_rgba(204,204,37,0.35)] text-black text-center font-medium text-base py-4.5 px-8 rounded-full transition-all duration-150 cursor-pointer focus:outline-none"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <span>{siteContent.hero.secondaryCta.toUpperCase()}</span>
                      <Sparkles className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110 text-black/80" />
                    </span>
                  </motion.button>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* SPECIALIZED AGENT TEAMS */}
        <section id="agents" className="py-20 lg:py-28 border-b border-ash bg-paper-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Roster Introduction */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center mb-16"
            >
              <span className="text-[13px] font-sans font-medium uppercase tracking-[0.071em] text-bark">
                {siteContent.agentTeams.eyebrow}
              </span>
              <h2 className="heading-editorial text-3xl sm:text-4xl lg:text-[40px] tracking-[-1.5px] leading-[1.1] text-bark mt-4">
                {siteContent.agentTeams.heading}
              </h2>
              <p className="text-sm sm:text-base text-slate leading-relaxed mt-3 max-w-xl mx-auto font-sans">
                {siteContent.agentTeams.subheading}
              </p>
            </motion.div>

            {/* Standard Agent Cards Grid */}
            <motion.div 
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
            >
              {siteContent.agentTeams.agents.map((agent) => (
                <AgentCard
                  key={agent.id}
                  agent={agent}
                  onChatClick={(id: string) => setActiveChatAgent(agent)}
                  onBookClick={(id: string) => handleDeployAgentClick(agent.name)}
                />
              ))}

              {/* Prototyped Custom Agent Card (if built) */}
              {customAgents.map((agent, index) => (
                <motion.div
                  key={`custom-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="md:col-span-2"
                >
                  <div className="p-6 bg-periwinkle-wash/10 border-2 border-dashed border-periwinkle-wash/40 rounded-3xl mb-4 text-center">
                    <span className="inline-block text-xs font-mono bg-periwinkle-wash text-bark px-2.5 py-1 rounded-full font-bold mb-2">
                      CUSTOM EXPERIMENTAL BUILD REGISTERED
                    </span>
                    <h4 className="text-sm font-bold text-bark">Your prototyped blueprint is ready for deployment.</h4>
                  </div>
                  <AgentCard
                    agent={agent}
                    onChatClick={(id: string) => setActiveChatAgent(agent)}
                    onBookClick={(id: string) => handleDeployAgentClick(agent.name)}
                  />
                </motion.div>
              ))}
            </motion.div>

          </div>
        </section>

        {/* PRODUCT ROADMAP / COMING SOON */}
        <section id="roadmap" className="py-20 lg:py-28 border-b border-ash bg-bone-mist">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Header */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center mb-16"
            >
              <span className="text-[13px] font-sans font-medium uppercase tracking-[0.071em] text-bark">
                {siteContent.roadmap.eyebrow}
              </span>
              <h2 className="heading-editorial text-3xl sm:text-4xl lg:text-[40px] tracking-[-1.5px] leading-[1.1] text-bark mt-4">
                {siteContent.roadmap.heading}
              </h2>
              <p className="text-sm sm:text-base text-slate leading-relaxed mt-3 max-w-xl mx-auto font-sans">
                {siteContent.roadmap.subheading}
              </p>
            </motion.div>

            {/* Timeline Cards Grid */}
            <motion.div 
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6"
            >
              {roadmapItems.map((item) => {
                const isVoted = votedIds.includes(item.id);
                return (
                  <motion.div
                    key={item.id}
                    whileHover={{ y: -4, scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                    className="bg-paper-white border border-ash/75 p-6 rounded-[24px] flex flex-col justify-between shadow-none hover:bg-bone-mist/5 transition-shadow"
                  >
                    <div>
                      <span className="inline-block text-[10px] font-mono font-bold bg-bark text-paper-white px-2.5 py-1 rounded-full mb-4">
                        {item.tag}
                      </span>
                      <h4 className="text-base font-sans font-semibold text-bark mb-2 leading-snug">{item.name}</h4>
                      <p className="text-xs text-slate leading-relaxed mb-6 font-sans">{item.description}</p>
                    </div>

                    <div className="border-t border-ash/50 pt-4 flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-1 text-xs text-slate font-mono">
                        <TrendingUp className="h-3.5 w-3.5 text-sage" />
                        <span>{item.upvotes} votes</span>
                      </div>
                      
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleVote(item.id)}
                        disabled={isVoted}
                        className={`p-2 rounded-full transition cursor-pointer focus:outline-none ${
                          isVoted
                            ? "bg-sage/10 text-sage"
                            : "bg-bone-mist hover:bg-ash/40 text-bark"
                        }`}
                        title={isVoted ? "Upvoted!" : "Upvote Feature"}
                      >
                        <Check className="h-4 w-4" />
                      </motion.button>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

          </div>
        </section>

        {/* WHY CHOOSE US */}
        <section id="why-us" className="py-20 lg:py-28 border-b border-ash bg-paper-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center mb-16"
            >
              <span className="text-[13px] font-sans font-medium uppercase tracking-[0.071em] text-bark">
                WHY INTELLITECH
              </span>
              <h2 className="heading-editorial text-3xl sm:text-4xl lg:text-[40px] tracking-[-1.5px] leading-[1.1] text-bark mt-4">
                {siteContent.whyUs.heading}
              </h2>
              <p className="text-sm sm:text-base text-slate leading-relaxed mt-3 max-w-xl mx-auto font-sans">
                {siteContent.whyUs.subheading}
              </p>
            </motion.div>

            {/* Bento Grid layout */}
            <motion.div 
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {siteContent.whyUs.points.map((point, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5, scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                  className="p-8 rounded-[24px] bg-bone-mist/40 border border-ash flex flex-col justify-between hover:bg-bone-mist/10 transition-shadow duration-200 shadow-none"
                >
                  <div className="mb-6">
                    <div className="h-10 w-10 rounded-full bg-bark text-chartreuse-pop flex items-center justify-center mb-6 shadow-none">
                      {index === 0 ? <Zap className="h-5 w-5" /> : index === 1 ? <Shield className="h-5 w-5" /> : <Star className="h-5 w-5" />}
                    </div>
                    <h3 className="text-lg font-sans font-semibold text-bark mb-3">{point.title}</h3>
                    <p className="text-sm text-slate leading-relaxed font-sans">{point.description}</p>
                  </div>

                  <span className="text-[10px] font-mono text-slate/60 font-bold uppercase tracking-widest mt-6">
                    PILLAR 0{index + 1} • INTEL
                  </span>
                </motion.div>
              ))}
            </motion.div>

          </div>
        </section>

        {/* CONTACT / BESPOKE CONSULTATION */}
        <section id="contact" className="py-20 lg:py-28 border-b border-ash bg-bone-mist">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              
              {/* Contact Information Cards */}
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7 }}
                className="lg:col-span-5 flex flex-col justify-between"
              >
                <div>
                  <span className="text-[13px] font-sans font-medium uppercase tracking-[0.071em] text-bark">
                    {siteContent.contact.eyebrow}
                  </span>
                  <h2 className="heading-editorial text-3xl sm:text-4xl lg:text-[40px] tracking-[-1.5px] leading-[1.1] text-bark mt-4 mb-6">
                    {siteContent.contact.heading}
                  </h2>
                  <p className="text-sm text-slate leading-relaxed max-w-sm mb-8 font-sans">
                    Let's collaborate on enterprise-grade integrations. Visit our regional office in Delhi or connect via our digital channels.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center gap-4 p-4.5 bg-paper-white border border-ash rounded-[20px] shadow-none">
                    <div className="h-10 w-10 rounded-full bg-bark/5 border border-ash flex items-center justify-center shrink-0">
                      <Mail className="h-5 w-5 text-bark" />
                    </div>
                    <div>
                      <p className="text-[10px] font-mono text-slate uppercase">EMAIL GATEWAY</p>
                      <a href={`mailto:${siteContent.contact.email}`} className="text-sm font-sans font-semibold text-bark hover:underline">
                        {siteContent.contact.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4.5 bg-paper-white border border-ash rounded-[20px] shadow-none">
                    <div className="h-10 w-10 rounded-full bg-bark/5 border border-ash flex items-center justify-center shrink-0">
                      <Phone className="h-5 w-5 text-bark" />
                    </div>
                    <div>
                      <p className="text-[10px] font-mono text-slate uppercase">CALL CENTER DIRECT</p>
                      <a href={`tel:${siteContent.contact.phone.replace(/\s+/g, '')}`} className="text-sm font-sans font-semibold text-bark hover:underline">
                        {siteContent.contact.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4.5 bg-paper-white border border-ash rounded-[20px] shadow-none">
                    <div className="h-10 w-10 rounded-full bg-bark/5 border border-ash flex items-center justify-center shrink-0">
                      <MapPin className="h-5 w-5 text-bark" />
                    </div>
                    <div>
                      <p className="text-[10px] font-mono text-slate uppercase">REGIONAL BASE</p>
                      <span className="text-sm font-sans font-semibold text-bark">
                        {siteContent.contact.base}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Consultation Input Form */}
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7 }}
                className="lg:col-span-7 bg-paper-white p-8 sm:p-10 rounded-[24px] border border-ash shadow-none"
              >
                <h3 className="text-2xl font-sans font-semibold text-bark mb-1.5 tracking-tight">
                  {siteContent.customCta.heading}
                </h3>
                <p className="text-sm text-slate mb-6 font-sans">
                  {siteContent.customCta.subheading}
                </p>

                <form onSubmit={handleConsultSubmit} className="space-y-4">
                  {isConsultSuccess && (
                    <div className="bg-sage/10 text-bark text-xs p-4 rounded-xl border border-sage/20 flex items-center gap-2 font-sans">
                      <CheckCircle className="h-4 w-4 text-sage shrink-0" />
                      <span>Consultation blueprint successfully registered. Our lab coordinator has queued your workflow!</span>
                    </div>
                  )}

                  {consultError && (
                    <div className="bg-red-50 text-red-800 text-xs p-4 rounded-xl border border-red-200 font-sans">
                      {consultError}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-sans font-semibold text-bark uppercase tracking-wider mb-1">
                        YOUR NAME
                      </label>
                      <input
                        type="text"
                        required
                        value={consultName}
                        onChange={(e) => setConsultName(e.target.value)}
                        placeholder="Ayush Malhotra"
                        className="w-full bg-bone-mist/50 border border-ash/70 rounded-full px-5 py-3.5 text-sm focus:outline-none focus:border-bark text-bark"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-sans font-semibold text-bark uppercase tracking-wider mb-1">
                        BUSINESS EMAIL
                      </label>
                      <input
                        type="email"
                        required
                        value={consultEmail}
                        onChange={(e) => setConsultEmail(e.target.value)}
                        placeholder="ayushmalhotra1703@gmail.com"
                        className="w-full bg-bone-mist/50 border border-ash/70 rounded-full px-5 py-3.5 text-sm focus:outline-none focus:border-bark text-bark"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-sans font-semibold text-bark uppercase tracking-wider mb-1">
                      PHONE NUMBER
                    </label>
                    <input
                      type="tel"
                      required
                      value={consultPhone}
                      onChange={(e) => setConsultPhone(e.target.value)}
                      placeholder="+91 93113 74477"
                      className="w-full bg-bone-mist/50 border border-ash/70 rounded-full px-5 py-3.5 text-sm focus:outline-none focus:border-bark text-bark"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-sans font-semibold text-bark uppercase tracking-wider mb-1">
                      CAMPAIGN / CUSTOM AGENT REQUIREMENTS
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={consultDetails}
                      onChange={(e) => setConsultDetails(e.target.value)}
                      placeholder="Specify your WhatsApp endpoint rules, CRM integrations or custom outreach lists..."
                      className="w-full bg-bone-mist/50 border border-ash/70 rounded-2xl px-5 py-3.5 text-sm focus:outline-none focus:border-bark text-bark resize-none"
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    type="submit"
                    disabled={isConsultSubmitting}
                    className="w-full bg-white hover:bg-zinc-100 disabled:opacity-50 text-black text-xs font-semibold py-4.5 px-6 rounded-full shadow-none transition flex items-center justify-center gap-2 cursor-pointer focus:outline-none"
                  >
                    {isConsultSubmitting ? (
                      <>
                        <RefreshCw className="h-4 w-4 animate-spin" />
                        <span>Queuing blueprint...</span>
                      </>
                    ) : (
                      <>
                        <HeartHandshake className="h-4 w-4 text-[#cccc25]" />
                        <span>{siteContent.customCta.cta.toUpperCase()}</span>
                      </>
                    )}
                  </motion.button>
                </form>
              </motion.div>

            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="bg-[#0a0a0c] text-zinc-400 border-t border-zinc-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-white/5 pb-8 mb-8">
            <div className="flex items-center gap-3">
              <span className="text-base font-classic font-semibold tracking-tight text-white">
                {siteContent.navigation.logo}
              </span>
            </div>
            
            <p className="text-xs font-mono text-zinc-400">
              {siteContent.footer.tagline}
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-zinc-400 mt-4 border-t border-white/5 pt-8">
            <p className="hover:text-white transition duration-200">{siteContent.footer.copyright}</p>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              <button onClick={() => setCurrentPolicyPage("privacy")} className="hover:text-chartreuse-pop transition cursor-pointer focus:outline-none">
                Privacy Policy
              </button>
              <button onClick={() => setCurrentPolicyPage("refund")} className="hover:text-chartreuse-pop transition cursor-pointer focus:outline-none">
                Refund Policy
              </button>
              <button onClick={() => setCurrentPolicyPage("terms")} className="hover:text-chartreuse-pop transition cursor-pointer focus:outline-none">
                Terms & Conditions
              </button>
              <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="hover:text-chartreuse-pop transition cursor-pointer focus:outline-none">
                Back to Top
              </button>
            </div>
            <div className="flex items-center gap-1.5 font-mono text-[10px] text-zinc-300">
              <span className="h-1.5 w-1.5 rounded-full bg-chartreuse-pop animate-pulse" />
              <span>Delhi, India • Global Agent Delivery Node</span>
            </div>
          </div>
        </div>
      </footer>

      {/* MODALS & DRAWERS OVERLAYS */}
      
      {/* 1. Live Chat Playground Drawer */}
      <AnimatePresence mode="wait">
        {activeChatAgent && (
          <AgentChatDrawer
            agent={activeChatAgent}
            customName={activeChatAgent.id === "custom" ? customAgentName : undefined}
            customPrompt={activeChatAgent.id === "custom" ? customAgentPrompt : undefined}
            onClose={() => setActiveChatAgent(null)}
          />
        )}
      </AnimatePresence>

      {/* 2. Book Demo Modal Dialog */}
      <DemoModal
        isOpen={isDemoModalOpen}
        preselectedAgent={preselectedAgent}
        onClose={() => setIsDemoModalOpen(false)}
        onSuccess={() => {
          setCrmTrigger((prev) => prev + 1); // Trigger Admin lead list update
        }}
      />

      {/* 3. Legal Document Overlay Screen */}
      <AnimatePresence mode="wait">
        {currentPolicyPage && (
          <LegalPage
            pageType={currentPolicyPage}
            onClose={() => setCurrentPolicyPage(null)}
          />
        )}
      </AnimatePresence>

    </div>
  );
}
