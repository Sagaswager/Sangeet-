import React, { useState, useRef, useEffect } from "react";
import { Message, Agent } from "../types";
import { X, Send, Bot, Terminal, ShieldAlert, User, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface AgentChatDrawerProps {
  agent: Agent | null;
  customName?: string;
  customPrompt?: string;
  onClose: () => void;
}

export default function AgentChatDrawer({
  agent,
  customName,
  customPrompt,
  onClose,
}: AgentChatDrawerProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeName = agent?.id === "custom" ? customName || "Custom Agent" : agent?.name || "AI Agent";
  const activeDesc = agent?.id === "custom" ? "User customized agent profile" : agent?.description;
  const activePrompt = agent?.id === "custom" ? customPrompt : undefined;

  // Initial welcome message and prompt suggestions
  useEffect(() => {
    if (!agent) return;
    
    let welcomeText = "";
    if (agent.id === "linkedin") {
      welcomeText = `Hello! I am your specialized LinkedIn Outreach AI Agent. I help B2B teams draft outbound sequences, handle objections, and secure high-value appointments. Ask me to write a pitch or handle a tricky objection!`;
    } else if (agent.id === "vouchers") {
      welcomeText = `Hi there! I am your AI Vouchers & deals concierge. I'm engineered to scan for discounts, compute compound deal math, and curate exclusive promo sequences across major B2C brands. What brand are you shopping for today?`;
    } else {
      welcomeText = `System fully initialized. I am "${activeName}", your newly prototyped agent. Custom prompt parameters successfully loaded. How can I assist you in your B2B campaign today?`;
    }

    setMessages([
      {
        id: "m-welcome",
        role: "assistant",
        content: welcomeText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
    setErrorMsg(null);
  }, [agent, customName, customPrompt]);

  // Scroll to bottom whenever messages list changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Predefined prompt suggestions
  const getSuggestions = () => {
    if (agent?.id === "linkedin") {
      return [
        "Draft a LinkedIn invite for a SaaS CEO",
        "How do I answer: 'We have no budget'?",
        "Compose a B2B outbound follow-up template"
      ];
    }
    if (agent?.id === "vouchers") {
      return [
        "Find best mock deals for Nike sneakers",
        "Generate a Starbucks promo code simulation",
        "Explain how to compound grocery discounts"
      ];
    }
    return [
      "Introduce yourself and demonstrate your capabilities",
      "Draft a basic greeting message"
    ];
  };

  const handleSend = async (textToSend: string) => {
    const trimmed = textToSend.trim();
    if (!trimmed) return;

    // Create and append user message
    const userMsg: Message = {
      id: `m-${Date.now()}`,
      role: "user",
      content: trimmed,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);
    setErrorMsg(null);

    try {
      const response = await fetch("/api/agents/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          agentId: agent?.id,
          messages: updatedMessages,
          customPrompt: agent?.id === "custom" ? customPrompt : undefined,
          customName: agent?.id === "custom" ? customName : undefined,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to contact B2B agent gateway.");
      }

      const data = await response.json();
      
      const assistantMsg: Message = {
        id: `m-${Date.now() + 1}`,
        role: "assistant",
        content: data.text || "No reply was received from the agent sandbox.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      console.error(err);
      if (err.message?.includes("GEMINI_API_KEY") || err.message?.includes("key is missing")) {
        setErrorMsg("API_KEY_MISSING");
      } else {
        setErrorMsg(err.message || "An unexpected error occurred while communicating with the agent.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-bark cursor-pointer"
      />

      {/* Sliding Panel */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 26, stiffness: 220 }}
          className="w-screen max-w-md bg-paper-white shadow-none flex flex-col h-full border-l border-ash"
        >
            {/* Terminal Header */}
            <div className="bg-bark text-paper-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-paper-white/10 p-2 rounded-full text-paper-white">
                  <Terminal className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-sans font-semibold text-sm leading-none">{activeName}</h3>
                    <span className="inline-flex items-center rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-mono font-bold tracking-wider text-emerald-400 uppercase">
                      ● ACTIVE
                    </span>
                  </div>
                  <p className="text-[11px] font-sans text-ash/70 mt-1.5 truncate max-w-[240px]">
                    {activeDesc}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-ash/60 hover:text-paper-white p-1.5 rounded-full hover:bg-ash/10 transition cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Architectural Prompt Disclosure */}
            <div className="bg-bone-mist border-b border-ash p-3 px-4">
              <div className="flex items-start gap-2.5">
                <Bot className="h-4 w-4 text-slate mt-0.5" />
                <div className="text-xs text-slate font-sans">
                  <span className="font-semibold text-bark">System Gateway Prompt:</span>{" "}
                  <p className="font-mono mt-1 text-[11px] bg-paper-white border border-ash/70 p-2 rounded-xl max-h-24 overflow-y-auto whitespace-pre-wrap leading-relaxed text-bark">
                    {agent?.id === "linkedin"
                      ? "LinkedIn outreach persona, specialized in B2B sequences & calendar setting."
                      : agent?.id === "vouchers"
                      ? "Voucher discounts concierge, specialized in deals & coupon computations."
                      : `Custom Instruction: "${activePrompt || "Not specified"}"`}
                  </p>
                </div>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-bone-mist/35">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex gap-3 max-w-[85%] ${
                    m.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                  }`}
                >
                  <div
                    className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 text-xs font-sans font-semibold ${
                      m.role === "user"
                        ? "bg-bark text-paper-white"
                        : "bg-ash text-bark"
                    }`}
                  >
                    {m.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                  </div>

                  <div className="flex flex-col">
                    <div
                      className={`p-3.5 rounded-[20px] text-sm leading-relaxed ${
                        m.role === "user"
                           ? "bg-bark text-paper-white rounded-tr-none"
                           : "bg-paper-white border border-ash rounded-tl-none text-bark shadow-none"
                      }`}
                    >
                      <p className="whitespace-pre-line font-sans">{m.content}</p>
                    </div>
                    <span className={`text-[10px] font-mono text-slate mt-1 ${m.role === "user" ? "text-right" : ""}`}>
                      {m.timestamp}
                    </span>
                  </div>
                </div>
              ))}

              {/* Loading Thinking State */}
              {isLoading && (
                <div className="flex gap-3 max-w-[85%] mr-auto">
                  <div className="h-8 w-8 rounded-full bg-ash text-bark flex items-center justify-center shrink-0">
                    <RefreshCw className="h-4 w-4 animate-spin" />
                  </div>
                  <div className="bg-paper-white border border-ash rounded-[20px] rounded-tl-none p-4 shadow-none text-sm text-slate">
                    <span className="font-mono text-[10px] text-bark block mb-1 font-bold uppercase tracking-wider animate-pulse">
                      AGENT THINKING...
                    </span>
                    <span className="text-xs">Computing optimal model strategy on server node</span>
                  </div>
                </div>
              )}

              {/* Secure Error Banner */}
              {errorMsg && (
                <div className="bg-red-50 border border-red-200 rounded-[20px] p-4 text-bark shadow-none">
                  <div className="flex gap-2.5 items-start">
                    <ShieldAlert className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-red-800 font-sans">
                        {errorMsg === "API_KEY_MISSING"
                          ? "AI Studio Environment Key Required"
                          : "Agent Communication Failure"}
                      </h4>
                      <p className="text-xs text-red-700 mt-1 leading-relaxed font-sans">
                        {errorMsg === "API_KEY_MISSING" ? (
                          <>
                            The backend Gemini API requires a secure key. Open the **Settings &gt; Secrets** panel on the top right bar of AI Studio, then declare the variable <code className="font-mono bg-red-100 px-1 rounded text-red-900">GEMINI_API_KEY</code> with your real key. No app recompile is needed once set!
                          </>
                        ) : (
                          `Error Details: ${errorMsg}`
                        )}
                      </p>
                      {errorMsg === "API_KEY_MISSING" && (
                        <button
                          onClick={() => handleSend("Test initialization again")}
                          className="mt-3 bg-red-800 hover:bg-red-900 text-white text-xs font-semibold px-4 py-2 rounded-full transition cursor-pointer focus:outline-none"
                        >
                          Try Again
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions */}
            {messages.length < 3 && !isLoading && !errorMsg && (
              <div className="p-4 bg-bone-mist/50 border-t border-ash">
                <p className="text-[11px] font-mono text-slate mb-2.5 font-bold tracking-wider uppercase">
                  SUGGESTED ACTIONS:
                </p>
                <div className="flex flex-col gap-2">
                  {getSuggestions().map((suggestion, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSend(suggestion)}
                      className="text-left text-xs bg-paper-white hover:bg-ash/25 border border-ash/70 p-3 rounded-full transition duration-150 font-medium text-bark cursor-pointer focus:outline-none"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Message Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(input);
              }}
              className="p-4 border-t border-ash bg-paper-white flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={isLoading ? "Agent is busy..." : "Issue outreach commands..."}
                disabled={isLoading}
                className="flex-1 bg-bone-mist border border-ash/75 rounded-full px-5 py-3 text-sm focus:outline-none focus:border-bark disabled:opacity-50 text-bark font-sans"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-bark text-paper-white p-3.5 rounded-full hover:opacity-90 transition duration-150 disabled:opacity-40 cursor-pointer focus:outline-none"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
  );
}

