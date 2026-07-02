import React from "react";
import { Agent } from "../types";
import { Linkedin, Ticket, MessageSquare, ArrowRight, Bot, LogIn, UserPlus } from "lucide-react";
import { motion } from "motion/react";

interface AgentCardProps {
  key?: string | number;
  agent: Agent;
  onChatClick: (agentId: string) => void;
  onBookClick: (agentId: string) => void;
}

export default function AgentCard({ agent, onChatClick, onBookClick }: AgentCardProps) {
  const getThemeClasses = (theme: string) => {
    switch (theme) {
      case "periwinkle":
        return "editorial-gradient-periwinkle text-bark";
      case "sage":
        return "editorial-gradient-sage text-bark";
      case "moss":
        return "editorial-gradient-moss text-bark";
      case "slate-blue":
        return "editorial-gradient-slate-blue text-bark";
      default:
        return "bg-bone-mist border border-ash text-bark";
    }
  };

  const getDeeperTextHue = (theme: string) => {
    switch (theme) {
      case "periwinkle":
        return "text-hue-periwinkle";
      case "sage":
        return "text-hue-sage";
      case "moss":
        return "text-hue-moss";
      case "slate-blue":
        return "text-hue-slate-blue";
      default:
        return "text-slate";
    }
  };

  const getThemeBadgeClasses = (theme: string) => {
    switch (theme) {
      case "periwinkle":
        return "bg-paper-white/35 text-bark border-paper-white/40";
      case "sage":
        return "bg-paper-white/35 text-bark border-paper-white/40";
      case "moss":
        return "bg-paper-white/35 text-bark border-paper-white/40";
      case "slate-blue":
        return "bg-paper-white/35 text-bark border-paper-white/40";
      default:
        return "bg-ash text-bark border-ash";
    }
  };

  const getAgentIcon = (iconName: string) => {
    switch (iconName) {
      case "Linkedin":
        return <Linkedin className="h-6 w-6 text-bark" />;
      case "Ticket":
        return <Ticket className="h-6 w-6 text-bark" />;
      default:
        return <Bot className="h-6 w-6 text-bark" />;
    }
  };

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`relative flex flex-col justify-between p-6 sm:p-8 rounded-[24px] shadow-none ${getThemeClasses(
        agent.colorTheme
      )}`}
    >
      <div>
        {/* Header Icon & Status */}
        <div className="flex items-center justify-between mb-6">
          <div className="p-3 bg-paper-white rounded-xl shadow-none inline-flex">
            {getAgentIcon(agent.iconName)}
          </div>

        </div>

        {/* Card title in 32-40px Bark inside the gradient zone */}
        <h3 className="text-3xl font-sans font-medium tracking-[-1.2px] leading-[1.05] text-bark mb-3">
          {agent.name}
        </h3>
        
        {/* Supporting text in deeper version of the gradient hue */}
        <p className={`text-sm leading-relaxed mb-6 font-sans ${getDeeperTextHue(agent.colorTheme)}`}>
          {agent.description}
        </p>
      </div>

      {/* Inset Product-Screenshot Tile (White Card) */}
      <div className="bg-paper-white rounded-2xl p-5 border border-ash/10 mt-2 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between border-b border-ash/40 pb-3 mb-4">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-bark/30 inline-block"></span>
              <span className="text-[10px] font-mono text-slate tracking-wide uppercase">SANDBOX ENGINE v3</span>
            </div>
            <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full">
              ID: {agent.id.toUpperCase()}
            </span>
          </div>

          <div className="mb-4 text-left">
            {agent.id === "vouchers" ? (
              <div className="space-y-3">
                {/* Header Offer Row */}
                <div className="flex items-center justify-between bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/20 dark:border-emerald-500/30 p-3 rounded-xl">
                  <span className="text-sm font-bold font-sans text-bark">LinkedIn AI Agent</span>
                  <span className="text-xs font-mono font-bold bg-emerald-600 text-white dark:bg-emerald-500 px-2.5 py-1 rounded-full shadow-sm">
                    ₹2,000 OFF
                  </span>
                </div>
                {/* Items List */}
                <div className="space-y-2 bg-bone-mist/50 dark:bg-bone-mist/20 p-3 rounded-xl border border-ash">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-sans font-medium text-slate">LinkedIn Premium</span>
                    <span className="font-mono font-semibold text-bark">₹1,000/mo</span>
                  </div>
                  <div className="h-[1px] bg-ash" />
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-sans font-medium text-slate">Sales Navigator Core</span>
                    <span className="font-mono font-semibold text-bark">₹2,300/mo</span>
                  </div>
                </div>
              </div>
            ) : agent.id === "linkedin" ? (
              <div className="space-y-3">
                {/* Header Pricing Row */}
                <div className="flex items-center justify-between bg-zinc-500/10 dark:bg-zinc-500/15 border border-ash p-3 rounded-xl">
                  <span className="text-sm font-bold font-sans text-bark">LinkedIn AI Agent</span>
                  <span className="text-xs font-mono font-bold bg-bark text-paper-white px-2.5 py-1 rounded-full shadow-sm">
                    ₹5,000/mo
                  </span>
                </div>
                {/* Features List */}
                <div className="space-y-2 bg-bone-mist/50 dark:bg-bone-mist/20 p-3 rounded-xl border border-ash">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-sans font-medium text-slate">Personalized Outreach</span>
                    <span className="font-mono font-semibold text-bark">100% Autopilot</span>
                  </div>
                  <div className="h-[1px] bg-ash" />
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-sans font-medium text-slate">Appointment Setting</span>
                    <span className="font-mono font-semibold text-bark">Included</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-xl font-bold font-sans text-bark tracking-tight">{agent.price}</div>
            )}
          </div>
        </div>

        {/* Action CTAs - PILL non-negotiable! */}
        {agent.id === "vouchers" ? (
          <div className="pt-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onBookClick(agent.id)}
              className="w-full flex items-center justify-center gap-2 bg-bark hover:opacity-90 text-paper-white text-xs font-semibold py-3.5 px-4 rounded-full transition-all duration-150 cursor-pointer focus:outline-none"
            >
              <span>Grab Now</span>
              <ArrowRight className="h-3.5 w-3.5 text-chartreuse-pop" />
            </motion.button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 pt-2">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                window.open("https://intellitech.187.127.187.153.sslip.io/dashboard.html", "_blank");
              }}
              className="flex items-center justify-center gap-2 bg-bark hover:opacity-90 text-paper-white text-xs font-semibold py-3 px-4 rounded-full transition-all duration-150 cursor-pointer focus:outline-none"
            >
              <LogIn className="h-3.5 w-3.5 text-chartreuse-pop" />
              <span>Sign In</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                window.open("https://intellitech.187.127.187.153.sslip.io/dashboard.html", "_blank");
              }}
              className="flex items-center justify-center gap-1.5 bg-bone-mist hover:bg-ash/50 text-bark border border-ash text-xs font-semibold py-3 px-4 rounded-full transition-all duration-150 cursor-pointer focus:outline-none"
            >
              <span>Sign Up</span>
              <UserPlus className="h-3.5 w-3.5 text-slate" />
            </motion.button>
          </div>
        )}
      </div>
    </motion.div>
  );
}

