import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { TrendingUp, MessageSquare, Check, Zap, Users, ShieldAlert } from "lucide-react";

export default function ExplodedView() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress of the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Transforms for the Exploded Components
  // 1. Chart / Graph Card (flies Top-Left, then locks into final layout)
  const graphX = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [0, -160, -160, -80]);
  const graphY = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [0, -120, -120, 70]);
  const graphRotate = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [0, -12, -12, 0]);
  const graphScale = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [1, 1.05, 1.05, 0.95]);

  // 2. Chat Bubble (flies Top-Right, then locks)
  const chatX = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [0, 160, 160, 90]);
  const chatY = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [0, -130, -130, -80]);
  const chatRotate = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [0, 10, 10, 0]);

  // 3. Leads List (flies Bottom-Left, then locks)
  const leadsX = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [0, -180, -180, -90]);
  const leadsY = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [0, 130, 130, -80]);
  const leadsRotate = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [0, -6, -6, 0]);

  // 4. Stats counter (flies Bottom-Right, then locks)
  const statsX = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [0, 170, 170, 80]);
  const statsY = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [0, 110, 110, 80]);
  const statsRotate = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [0, 8, 8, 0]);

  // Text status shifts
  const step1Opacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const step2Opacity = useTransform(scrollYProgress, [0.25, 0.35, 0.65, 0.75], [0, 1, 1, 0]);
  const step3Opacity = useTransform(scrollYProgress, [0.75, 0.85], [0, 1]);

  // Background color morph (from dark blue-black to pure black)
  const bgGradient = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [
      "radial-gradient(circle at center, #0f121d 0%, #08080a 100%)",
      "radial-gradient(circle at center, #18111e 0%, #070709 100%)",
      "radial-gradient(circle at center, #0c1815 0%, #050608 100%)"
    ]
  );

  return (
    <div ref={containerRef} className="h-[300vh] relative select-none">
      {/* Sticky screen container */}
      <motion.div 
        style={{ background: bgGradient }}
        className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden border-b border-zinc-800"
      >
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/4 h-72 w-72 bg-periwinkle-wash/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-80 w-80 bg-chartreuse-pop/5 rounded-full blur-3xl" />

        {/* Narrative Spacing */}
        <div className="absolute top-16 md:top-20 z-20 text-center max-w-2xl px-6">
          <span className="text-[11px] font-sans font-semibold text-chartreuse-pop uppercase tracking-[0.15em] mb-2 block">
            Agent Mechanics
          </span>
          
          <div className="relative h-16 w-full flex items-center justify-center">
            {/* Step 1 Text */}
            <motion.div style={{ opacity: step1Opacity }} className="absolute inset-0 flex flex-col items-center justify-center">
              <h2 className="text-xl sm:text-2xl font-classic font-semibold text-white tracking-tight">
                1. Initializing System Base
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                The core target list and campaign configurations are queued.
              </p>
            </motion.div>

            {/* Step 2 Text */}
            <motion.div style={{ opacity: step2Opacity }} className="absolute inset-0 flex flex-col items-center justify-center">
              <h2 className="text-xl sm:text-2xl font-classic font-semibold text-white tracking-tight">
                2. Exploded Component Engine
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                Scrapers, LLM responders, and human gates work in perfect parallel pipelines.
              </p>
            </motion.div>

            {/* Step 3 Text */}
            <motion.div style={{ opacity: step3Opacity }} className="absolute inset-0 flex flex-col items-center justify-center">
              <h2 className="text-xl sm:text-2xl font-classic font-semibold text-white tracking-tight">
                3. Locked Integration
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                Sub-processes consolidate back into a single high-performance dashboard layout.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Outer Assembly Sandbox */}
        <div className="relative w-full max-w-lg md:max-w-xl aspect-square flex items-center justify-center mt-12 scale-[0.85] sm:scale-100">
          
          {/* CENTRAL ANCHOR: Base Core */}
          <div className="absolute w-[220px] md:w-[265px] aspect-square rounded-3xl bg-zinc-950/70 border border-zinc-800 p-6 flex flex-col justify-between shadow-2xl relative">
            {/* Central Glow Core */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="h-28 w-28 rounded-full bg-chartreuse-pop/10 blur-xl animate-pulse" />
              <div className="h-10 w-10 rounded-full border border-chartreuse-pop/30 flex items-center justify-center">
                <Zap className="h-5 w-5 text-chartreuse-pop" />
              </div>
            </div>
            
            <div className="flex justify-between items-start z-10">
              <span className="text-[10px] font-mono text-zinc-500">SYSTEM GATEWAY</span>
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
            </div>

            <div className="z-10">
              <h4 className="text-xs font-mono font-bold text-white tracking-wider">AI AGENT CORE</h4>
              <p className="text-[9px] font-mono text-zinc-400 mt-1">Delhi_Edge_Node // ACTIVE_PIPELINE</p>
            </div>
          </div>

          {/* EXPLODING LAYER 1: Graph Card */}
          <motion.div
            style={{
              x: graphX,
              y: graphY,
              rotate: graphRotate,
              scale: graphScale,
            }}
            className="absolute w-[160px] md:w-[190px] rounded-2xl bg-zinc-900/90 border border-zinc-800/80 p-4 shadow-xl z-20 backdrop-blur-md"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1 rounded-md bg-sky-500/10">
                <TrendingUp className="h-3.5 w-3.5 text-sky-400" />
              </div>
              <span className="text-[9px] font-mono text-zinc-400 font-bold">REPLY RATE</span>
            </div>
            <div className="text-lg font-bold text-white font-sans tracking-tight">41.8%</div>
            <div className="h-8 flex items-end gap-1.5 mt-2">
              <div className="w-full bg-sky-500/20 h-[30%] rounded-sm" />
              <div className="w-full bg-sky-500/30 h-[55%] rounded-sm" />
              <div className="w-full bg-sky-500/50 h-[45%] rounded-sm" />
              <div className="w-full bg-sky-500 h-[85%] rounded-sm" />
            </div>
          </motion.div>

          {/* EXPLODING LAYER 2: Live Chat Bubble */}
          <motion.div
            style={{
              x: chatX,
              y: chatY,
              rotate: chatRotate,
            }}
            className="absolute w-[170px] md:w-[200px] rounded-2xl bg-zinc-900/90 border border-zinc-800/80 p-3 shadow-xl z-30 backdrop-blur-md"
          >
            <div className="flex items-center gap-1.5 mb-2">
              <div className="p-1 rounded-md bg-purple-500/10">
                <MessageSquare className="h-3.5 w-3.5 text-purple-400" />
              </div>
              <span className="text-[9px] font-mono text-zinc-400 font-bold">RESPONSE ENGINE</span>
            </div>
            <div className="bg-zinc-950/60 p-2 rounded-lg border border-zinc-800/30">
              <p className="text-[9px] font-sans italic text-zinc-300 leading-snug">
                "Hi, checked your B2B model and configured..."
              </p>
            </div>
            <div className="flex justify-between items-center mt-1.5">
              <span className="text-[8px] font-mono text-purple-400">Confidence: 98%</span>
              <span className="text-[8px] font-mono text-zinc-500">SENT</span>
            </div>
          </motion.div>

          {/* EXPLODING LAYER 3: Target Leads List */}
          <motion.div
            style={{
              x: leadsX,
              y: leadsY,
              rotate: leadsRotate,
            }}
            className="absolute w-[180px] md:w-[210px] rounded-2xl bg-zinc-900/90 border border-zinc-800/80 p-3.5 shadow-xl z-10 backdrop-blur-md"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <div className="p-1 rounded-md bg-emerald-500/10">
                  <Users className="h-3.5 w-3.5 text-emerald-400" />
                </div>
                <span className="text-[9px] font-mono text-zinc-400 font-bold">TARGET BATCH</span>
              </div>
              <span className="text-[8px] font-mono text-emerald-400">VERIFIED</span>
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[9px] font-sans p-1 bg-zinc-950/40 rounded border border-zinc-800/10">
                <span className="text-zinc-300">Rohan S. (VP)</span>
                <Check className="h-2.5 w-2.5 text-emerald-400" />
              </div>
              <div className="flex items-center justify-between text-[9px] font-sans p-1 bg-zinc-950/40 rounded border border-zinc-800/10">
                <span className="text-zinc-300">Sneha M. (CEO)</span>
                <Check className="h-2.5 w-2.5 text-emerald-400" />
              </div>
            </div>
          </motion.div>

          {/* EXPLODING LAYER 4: Stats and Alert Counter */}
          <motion.div
            style={{
              x: statsX,
              y: statsY,
              rotate: statsRotate,
            }}
            className="absolute w-[160px] md:w-[180px] rounded-2xl bg-zinc-900/90 border border-zinc-800/80 p-3.5 shadow-xl z-25 backdrop-blur-md"
          >
            <div className="flex items-center gap-1.5 mb-2.5">
              <div className="p-1 rounded-md bg-chartreuse-pop/10">
                <ShieldAlert className="h-3.5 w-3.5 text-chartreuse-pop" />
              </div>
              <span className="text-[9px] font-mono text-zinc-400 font-bold">LIVETIME GATE</span>
            </div>
            <div className="text-xs font-mono font-bold text-white">12,480 / Day</div>
            <p className="text-[8px] font-mono text-zinc-500 mt-1">RATE LIMIT PROTECTION: OK</p>
          </motion.div>

        </div>

        {/* Bottom indicator hint */}
        <div className="absolute bottom-6 flex flex-col items-center gap-1.5 pointer-events-none">
          <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">
            Scroll to assembly
          </span>
          <div className="h-5 w-3.5 border border-zinc-700 rounded-full flex items-start justify-center p-0.5">
            <motion.div 
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="h-1.5 w-1 bg-chartreuse-pop rounded-full"
            />
          </div>
        </div>

      </motion.div>
    </div>
  );
}
