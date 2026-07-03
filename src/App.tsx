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
  Zap, Calendar, Clock, HeartHandshake, RefreshCw, MessageCircle, Mic, Database, 
  Target, Linkedin
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
      "[SYSTEM] Routing telemetry report to South Delhi, Chatarpur office gateway.",
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

  const renderRoadmapCard = (item: RoadmapItem, keyPrefix: string) => {
    const isVoted = votedIds.includes(item.id);
    const getRoadmapIcon = (name: string) => {
      switch (name) {
        case "WhatsApp API":
          return (
            <svg className="h-6 w-6 text-emerald-500" fill="currentColor" viewBox="0 0 16 16">
              <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
            </svg>
          );
        case "AI Voice Bots":
          return <Mic className="h-6 w-6 text-indigo-500" />;
        case "Data Scraper":
          return <Database className="h-6 w-6 text-amber-500" />;
        case "Lead Generator":
          return <Target className="h-6 w-6 text-rose-500" />;
        case "LinkedIn AI Agent Pro":
          return <Linkedin className="h-6 w-6 text-blue-500" />;
        default:
          return <Sparkles className="h-6 w-6 text-slate-500" />;
      }
    };

    return (
      <div
        key={`${keyPrefix}-${item.id}`}
        className="bg-paper-white border border-ash/75 p-8 rounded-[24px] flex flex-col justify-between shadow-none hover:bg-bone-mist/5 transition-shadow w-[350px] sm:w-[420px] shrink-0 text-left"
      >
        <div>
          {/* Icon & Tag Row */}
          <div className="flex items-center justify-between mb-4">
            <div className="p-2.5 bg-bone-mist/50 dark:bg-zinc-800/40 rounded-xl border border-ash/10 inline-flex">
              {getRoadmapIcon(item.name)}
            </div>
            <span className="inline-block text-sm font-mono font-bold bg-bark text-paper-white px-2.5 py-1 rounded-full">
              {item.tag}
            </span>
          </div>
          <h4 className="text-xl font-sans font-semibold text-bark mb-2 leading-snug">{item.name}</h4>
          <p className="text-base text-slate leading-relaxed mb-6 font-sans">{item.description}</p>
        </div>

        <div className="border-t border-ash/50 pt-4 flex items-center justify-between mt-auto">
          <div className="flex items-center gap-1.5 text-base text-slate font-mono">
            <TrendingUp className="h-4.5 w-4.5 text-sage" />
            <span>{item.upvotes} votes</span>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleVote(item.id)}
            disabled={isVoted}
            className={`p-2.5 rounded-full transition cursor-pointer focus:outline-none ${
              isVoted
                ? "bg-sage/10 text-sage"
                : "bg-bone-mist hover:bg-ash/40 text-bark"
            }`}
            title={isVoted ? "Upvoted!" : "Upvote Feature"}
          >
            <Check className="h-4.5 w-4.5" />
          </motion.button>
        </div>
      </div>
    );
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
  }
  // Hero section custom staggered animations
  const heroContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const heroItemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const heroBgVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 0.9, transition: { duration: 1.5 } }
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
        <section className="relative overflow-hidden min-h-[calc(100vh-100px)] flex flex-col items-center justify-center py-16 border-b border-zinc-800 bg-[#0a0a0c]">
          <motion.div
            variants={heroBgVariants}
            initial="hidden"
            animate="visible"
            className="absolute inset-0 z-0 pointer-events-none"
          >
            <TubesBackground className="opacity-90 h-full w-full" />
          </motion.div>
          
          <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex flex-col justify-between min-h-[calc(100vh-220px)]">
            
            {/* Top row: Left block and Right block overlapping */}
            <div 
              className="relative" 
              style={{
                width: '1400px',
                height: '500px',
                borderRadius: '0px',
                margin: 0,
                padding: 0,
                fontFamily: 'Inter, sans-serif',
                fontSize: '16px',
                lineHeight: '24px',
                fontWeight: 400,
                letterSpacing: 'normal',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              
              {/* Centered block */}
              <div className="relative z-10 flex flex-col items-center text-center pointer-events-auto">
                <span style={{ fontFamily: 'Sora, sans-serif', fontSize: '160px', lineHeight: '160px', fontWeight: 500, letterSpacing: '-6.4px', color: '#FFFFFF', width: '414.25px', height: '160px', borderRadius: '0px', display: 'block' }}>
                  Build
                </span>
                <h1 className="text-6xl" style={{ fontFamily: '"Bodoni Moda", serif', fontSize: '160px', lineHeight: '160px', fontWeight: 500, letterSpacing: '-6.4px', color: '#FFFFFF', width: '419.85px', height: '160px', borderRadius: '0px', margin: 0, padding: 0, display: 'block' }}>
                  Brands
                </h1>
                <span className="text-sm" style={{ fontFamily: '"Bodoni Moda", serif', fontSize: '20px', lineHeight: '28px', fontWeight: 500, letterSpacing: '8px', color: '#FFFFFF', width: '70.5px', height: '28px', borderRadius: '0px', marginTop: '16px', marginBottom: '-8px', padding: 0, display: 'block' }}>
                  with
                </span>
              </div>

              {/* Right block (absolute-right, vertically matching height, top and bottom aligned) */}
              <div className="absolute right-0 top-0 bottom-0 flex items-center justify-end select-none pointer-events-none z-0">
                <span className="text-[12rem]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '448px', lineHeight: '448px', fontWeight: 500, letterSpacing: '-22.4px', color: '#FFFFFF', width: '394.888px', height: '448px', borderRadius: '0px', margin: 0, padding: 0, display: 'flex', alignItems: 'center' }}>
                  AI
                </span>
              </div>
            </div>

            {/* Bottom block: Subheading + Button centered column */}
            <div className="w-full flex flex-col items-center text-center mt-auto space-y-8 z-10">
              
              {/* Subheading: "Hire AI agents that Grows you." */}
              <h2 className="text-2xl sm:text-[32px] lg:text-[36px] text-white font-sans tracking-tight leading-snug">
                <span className="font-normal">Hire </span>
                <span className="font-bold">AI agents</span>
                <span className="font-normal"> that Grows you.</span>
              </h2>

              {/* Pill-shaped button: "BOOK DEMO CALL" */}
              <motion.div className="w-full sm:w-[280px]">
                <motion.button
                  whileHover={{ scale: 1.03, y: -3 }}
                  whileTap={{ scale: 0.94 }}
                  transition={{ type: "spring", stiffness: 500, damping: 18 }}
                  onClick={() => setIsDemoModalOpen(true)}
                  className="group w-full bg-white hover:bg-zinc-100 hover:shadow-[0_0_30px_rgba(255,255,255,0.25)] text-black text-center font-semibold text-sm tracking-[0.15em] py-4.5 px-8 rounded-full transition-all duration-150 cursor-pointer focus:outline-none flex items-center justify-center gap-2"
                >
                  <span>BOOK DEMO CALL</span>
                  <ArrowRight className="h-4.5 w-4.5 transition-transform duration-200 group-hover:translate-x-1.5" />
                </motion.button>
              </motion.div>
            </div>
            
          </div>
        </section>

        {/* SPECIALIZED AGENT TEAMS */}
        <section id="agents" className="pt-14 pb-8 lg:pt-16 lg:pb-10 border-b border-ash bg-paper-white">
          <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Roster Introduction */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center mb-10 flex flex-col items-center"
            >
              <h2 className="heading-editorial text-4xl sm:text-5xl lg:text-[54px] tracking-[-1.5px] leading-[1.05] text-bark">
                AI Agent <span className="font-classic italic text-slate-blue/90">Teams</span>
              </h2>
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
        <section id="roadmap" className="pt-14 pb-20 lg:pt-14 lg:pb-28 border-b border-ash bg-bone-mist">
          <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
            
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
              <h2 className="heading-editorial text-4xl sm:text-5xl lg:text-[54px] tracking-[-1.5px] leading-[1.1] text-bark mt-4">
                {siteContent.roadmap.heading}
              </h2>
              <p className="text-sm sm:text-base text-slate leading-relaxed mt-3 max-w-xl mx-auto font-sans">
                {siteContent.roadmap.subheading}
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="w-full overflow-hidden relative flex gap-8 py-4"
            >
              {/* First loop container */}
              <div className="animate-marquee flex gap-8 shrink-0 hover:[animation-play-state:paused] py-2">
                {roadmapItems.map((item) => renderRoadmapCard(item, "set1"))}
                {roadmapItems.map((item) => renderRoadmapCard(item, "set2"))}
              </div>

              {/* Second loop container (duplicate) */}
              <div className="animate-marquee flex gap-8 shrink-0 hover:[animation-play-state:paused] py-2" aria-hidden="true">
                {roadmapItems.map((item) => renderRoadmapCard(item, "set3"))}
                {roadmapItems.map((item) => renderRoadmapCard(item, "set4"))}
              </div>
            </motion.div>

          </div>
        </section>

        {/* WHY CHOOSE US */}
        <section id="why-us" className="py-14 lg:py-16 border-b border-ash bg-paper-white overflow-hidden">
          
          {/* Header */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h2 className="heading-editorial flex flex-col items-center gap-3">
                <span className="text-lg sm:text-xl lg:text-[22px] font-mono font-bold tracking-[0.02em] text-bark uppercase">
                  AI is changing fast in 2026
                </span>
                <span className="text-6xl sm:text-8xl lg:text-[100px] font-sans font-black tracking-[-4px] leading-[0.95] text-bark mt-1">
                  Are you?
                </span>
              </h2>
            </motion.div>
          </div>

          {/* Full-bleed Edge-to-Edge Logo Marquee */}
          <div className="w-full overflow-hidden py-0 bg-transparent mb-14 relative flex gap-0">
            <div className="animate-marquee flex gap-0 shrink-0">
              <img src="/ai-logos.png" alt="AI Product Logos" className="h-16 sm:h-20 object-contain shrink-0 opacity-90 dark:opacity-85" />
              <img src="/ai-logos.png" alt="AI Product Logos" className="h-16 sm:h-20 object-contain shrink-0 opacity-90 dark:opacity-85" />
            </div>
            <div className="animate-marquee flex gap-0 shrink-0" aria-hidden="true">
              <img src="/ai-logos.png" alt="AI Product Logos" className="h-16 sm:h-20 object-contain shrink-0 opacity-90 dark:opacity-85" />
              <img src="/ai-logos.png" alt="AI Product Logos" className="h-16 sm:h-20 object-contain shrink-0 opacity-90 dark:opacity-85" />
            </div>
          </div>

          {/* Bento Grid Containers */}
          <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
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
                  className="p-10 rounded-[24px] bg-bone-mist/40 border border-ash flex flex-col justify-between hover:bg-bone-mist/10 transition-shadow duration-200 shadow-none"
                >
                  <div className="mb-6">
                    <div className="h-12 w-12 rounded-full bg-bark text-chartreuse-pop flex items-center justify-center mb-6 shadow-none">
                      {index === 0 ? <Zap className="h-6 w-6" /> : index === 1 ? <Shield className="h-6 w-6" /> : <Star className="h-6 w-6" />}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-sans font-bold text-bark mb-3">{point.title}</h3>
                    <p className="text-base text-slate leading-relaxed font-sans">{point.description}</p>
                  </div>

                </motion.div>
              ))}
            </motion.div>

          </div>
        </section>

        <section id="contact" className="py-20 lg:py-28 border-b border-ash bg-bone-mist">
          <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
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
                  <span className="text-sm font-sans font-medium uppercase tracking-[0.071em] text-bark">
                    {siteContent.contact.eyebrow}
                  </span>
                  <h2 className="heading-editorial text-4xl sm:text-5xl lg:text-[54px] tracking-[-1.5px] leading-[1.1] text-bark mt-4 mb-6">
                    {siteContent.contact.heading}
                  </h2>
                  <p className="text-base text-slate leading-relaxed max-w-md mb-8 font-sans">
                    Let's collaborate on enterprise-grade integrations. Visit our regional office in Delhi or connect via our digital channels.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center gap-4 p-5 bg-paper-white border border-ash rounded-[20px] shadow-none">
                    <div className="h-12 w-12 rounded-full bg-bark/5 border border-ash flex items-center justify-center shrink-0">
                      <Mail className="h-6 w-6 text-bark" />
                    </div>
                    <div>
                      <p className="text-xs font-mono text-slate uppercase">EMAIL GATEWAY</p>
                      <a href={`mailto:${siteContent.contact.email}`} className="text-base font-sans font-semibold text-bark hover:underline">
                        {siteContent.contact.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-5 bg-paper-white border border-ash rounded-[20px] shadow-none">
                    <div className="h-12 w-12 rounded-full bg-bark/5 border border-ash flex items-center justify-center shrink-0">
                      <Phone className="h-6 w-6 text-bark" />
                    </div>
                    <div>
                      <p className="text-xs font-mono text-slate uppercase">CALL CENTER DIRECT</p>
                      <a href={`tel:${siteContent.contact.phone.replace(/\s+/g, '')}`} className="text-base font-sans font-semibold text-bark hover:underline">
                        {siteContent.contact.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-5 bg-paper-white border border-ash rounded-[20px] shadow-none">
                    <div className="h-12 w-12 rounded-full bg-bark/5 border border-ash flex items-center justify-center shrink-0">
                      <MapPin className="h-6 w-6 text-bark" />
                    </div>
                    <div>
                      <p className="text-xs font-mono text-slate uppercase">REGIONAL BASE</p>
                      <span className="text-base font-sans font-semibold text-bark">
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
                <h3 className="text-3xl font-sans font-bold text-bark mb-1.5 tracking-tight">
                  {siteContent.customCta.heading}
                </h3>
                <p className="text-base text-slate mb-6 font-sans">
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
                      <label className="block text-xs font-sans font-semibold text-bark uppercase tracking-wider mb-1">
                        YOUR NAME
                      </label>
                      <input
                        type="text"
                        required
                        value={consultName}
                        onChange={(e) => setConsultName(e.target.value)}
                        placeholder="Ayush Malhotra"
                        className="w-full bg-bone-mist/50 border border-ash/70 rounded-full px-6 py-4 text-base focus:outline-none focus:border-bark text-bark"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-sans font-semibold text-bark uppercase tracking-wider mb-1">
                        BUSINESS EMAIL
                      </label>
                      <input
                        type="email"
                        required
                        value={consultEmail}
                        onChange={(e) => setConsultEmail(e.target.value)}
                        placeholder="ayushmalhotra1703@gmail.com"
                        className="w-full bg-bone-mist/50 border border-ash/70 rounded-full px-6 py-4 text-base focus:outline-none focus:border-bark text-bark"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-sans font-semibold text-bark uppercase tracking-wider mb-1">
                      PHONE NUMBER
                    </label>
                    <input
                      type="tel"
                      required
                      value={consultPhone}
                      onChange={(e) => setConsultPhone(e.target.value)}
                      placeholder="+91 93113 74477"
                      className="w-full bg-bone-mist/50 border border-ash/70 rounded-full px-6 py-4 text-base focus:outline-none focus:border-bark text-bark"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-sans font-semibold text-bark uppercase tracking-wider mb-1">
                      CAMPAIGN / CUSTOM AGENT REQUIREMENTS
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={consultDetails}
                      onChange={(e) => setConsultDetails(e.target.value)}
                      placeholder="Specify your WhatsApp endpoint rules, CRM integrations or custom outreach lists..."
                      className="w-full bg-bone-mist/50 border border-ash/70 rounded-2xl px-6 py-4 text-base focus:outline-none focus:border-bark text-bark resize-none"
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    type="submit"
                    disabled={isConsultSubmitting}
                    className="w-full bg-bark hover:bg-bark/90 text-paper-white disabled:opacity-50 text-sm font-semibold py-4 px-6 rounded-full shadow-none transition flex items-center justify-center gap-2 cursor-pointer focus:outline-none"
                  >
                    {isConsultSubmitting ? (
                      <>
                        <RefreshCw className="h-5 w-5 animate-spin" />
                        <span>Queuing blueprint...</span>
                      </>
                    ) : (
                      <>
                        <HeartHandshake className="h-5 w-5 text-[#cccc25]" />
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

      {/* Floating WhatsApp Widget */}
      <motion.a
        href="https://wa.me/919811374477?text=Hi%2C%20I%20want%20to%20know%20more"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 1 }}
        whileHover={{ scale: 1.1, y: -4 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 z-50 p-4 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.4)] transition-colors duration-200 cursor-pointer focus:outline-none flex items-center justify-center border border-white/10"
        title="Chat with us on WhatsApp"
      >
        <svg className="w-6 h-6 fill-white" viewBox="0 0 448 512">
          <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3 18.7-68.1-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
        </svg>
      </motion.a>

    </div>
  );
}
