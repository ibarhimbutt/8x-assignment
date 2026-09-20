"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Rocket, Search, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export function TeamsSection() {
  const [activeTab, setActiveTab] = useState<"teams" | "individuals">("teams");

  return (
    <section className="relative z-10 w-full flex flex-col items-center pt-16 pb-24 overflow-hidden">
      {/* Marquee */}
      <div className="w-full overflow-hidden whitespace-nowrap flex items-center mb-20 relative">
        {/* Left/Right Fade Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
        
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="flex items-center gap-12 text-[50px] md:text-[90px] font-display font-medium tracking-tight"
        >
          {/* Group 1 */}
          <div className="flex items-center gap-12 shrink-0">
            <span className="text-white">faster</span>
            <img src="https://cdn.prod.website-files.com/6899da9beccbdbe92be49b5d/69baa80e836a5b6fa12a55d5_ship_image.svg" alt="Ship" className="h-[50px] md:h-[90px] object-contain -rotate-12" />
            <span className="text-white">Move <span className="text-[#f97316]">work</span> forward</span>
          </div>
          {/* Group 2 */}
          <div className="flex items-center gap-12 shrink-0">
            <span className="text-white">faster</span>
            <img src="https://cdn.prod.website-files.com/6899da9beccbdbe92be49b5d/69baa80e836a5b6fa12a55d5_ship_image.svg" alt="Ship" className="h-[50px] md:h-[90px] object-contain -rotate-12" />
            <span className="text-white">Move <span className="text-[#f97316]">work</span> forward</span>
          </div>
          {/* Group 3 */}
          <div className="flex items-center gap-12 shrink-0">
            <span className="text-white">faster</span>
            <img src="https://cdn.prod.website-files.com/6899da9beccbdbe92be49b5d/69baa80e836a5b6fa12a55d5_ship_image.svg" alt="Ship" className="h-[50px] md:h-[90px] object-contain -rotate-12" />
            <span className="text-white">Move <span className="text-[#f97316]">work</span> forward</span>
          </div>
          {/* Group 4 */}
          <div className="flex items-center gap-12 shrink-0">
            <span className="text-white">faster</span>
            <img src="https://cdn.prod.website-files.com/6899da9beccbdbe92be49b5d/69baa80e836a5b6fa12a55d5_ship_image.svg" alt="Ship" className="h-[50px] md:h-[90px] object-contain -rotate-12" />
            <span className="text-white">Move <span className="text-[#f97316]">work</span> forward</span>
          </div>
        </motion.div>
      </div>

      {/* Heading */}
      <h2 className="text-[36px] md:text-[56px] font-display font-medium text-center text-paper max-w-4xl leading-[1.15] mb-16 z-10 px-4">
        Whether you're a team of 1 or 1,000, Quorum's got your back
      </h2>

      {/* Content Area */}
      <div className="relative w-full max-w-[1280px] mx-auto px-6 min-h-[600px] flex items-center justify-end">
        
        {/* Globe Video (Left/Background) */}
        <div className="absolute left-[-10%] md:left-[2%] top-1/2 -translate-y-1/2 w-[350px] h-[350px] md:w-[550px] md:h-[550px] z-0 mix-blend-screen pointer-events-none opacity-90">
          <video 
            src="https://wunderdogs.b-cdn.net/Fathom/planet-full-crf32.mp4" 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-contain"
          />
        </div>

        {/* Glassmorphism Card */}
        <div className="relative z-10 w-full md:w-[900px] bg-[#050505]/60 backdrop-blur-2xl border border-white/10 rounded-[32px] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          
          {/* Tabs */}
          <div className="flex w-full border-b border-white/10">
            <button 
              onClick={() => setActiveTab("teams")}
              className={cn(
                "flex-1 py-8 text-[20px] font-medium transition-colors relative",
                activeTab === "teams" ? "text-[#fce38a]" : "text-paper-dim hover:text-paper"
              )}
            >
              Quorum for teams
              {activeTab === "teams" && (
                <motion.div layoutId="teamsTab" className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#fce38a]" />
              )}
            </button>
            <button 
              onClick={() => setActiveTab("individuals")}
              className={cn(
                "flex-1 py-8 text-[20px] font-medium transition-colors relative",
                activeTab === "individuals" ? "text-[#fce38a]" : "text-paper-dim hover:text-paper"
              )}
            >
              Quorum for individuals
              {activeTab === "individuals" && (
                <motion.div layoutId="teamsTab" className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#fce38a]" />
              )}
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-10 md:p-14 min-h-[450px]">
            <AnimatePresence mode="wait">
              {activeTab === "teams" ? (
                <motion.div 
                  key="teams"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col md:flex-row gap-16"
                >
                  {/* Left Column */}
                  <div className="flex-1 space-y-6">
                    <h3 className="text-[26px] font-medium text-paper tracking-tight">Shared visibility. Smarter execution.</h3>
                    <p className="text-[15px] text-paper-dim leading-relaxed">
                      Quorum gives teams a shared source of truth across every customer conversation, internal sync, and strategy call — so decisions are visible, follow-through is consistent, and nothing gets lost between meetings.
                    </p>
                    <p className="text-[15px] text-paper-dim leading-relaxed">
                      Search conversations, spot patterns, and keep work moving without the manual work.
                    </p>
                  </div>
                  
                  {/* Right Column (Grid) */}
                  <div className="flex-1 grid grid-cols-2 gap-x-8 gap-y-10">
                    <div className="space-y-4">
                      <div className="text-[#3b82f6]"><Zap size={28} strokeWidth={1.5} /></div>
                      <p className="text-[13px] text-paper-dim leading-relaxed">Automatic notes, summaries, and updates reduce follow-ups and admin across the team.</p>
                    </div>
                    <div className="space-y-4">
                      <div className="text-[#3b82f6]"><Rocket size={28} strokeWidth={1.5} /></div>
                      <p className="text-[13px] text-paper-dim leading-relaxed">Turn conversations into clear next steps that move deals and projects forward.</p>
                    </div>
                    <div className="space-y-4">
                      <div className="text-[#3b82f6]"><Search size={28} strokeWidth={1.5} /></div>
                      <p className="text-[13px] text-paper-dim leading-relaxed">Keep decisions, commitments, and customer context searchable for everyone.</p>
                    </div>
                    <div className="space-y-4">
                      <div className="text-[#3b82f6]"><Sparkles size={28} strokeWidth={1.5} /></div>
                      <p className="text-[13px] text-paper-dim leading-relaxed">Spot patterns, risks, and opportunities across all your team's meetings.</p>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="individuals"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col md:flex-row gap-16"
                >
                  {/* Left Column */}
                  <div className="flex-1 space-y-6">
                    <h3 className="text-[26px] font-medium text-paper tracking-tight">Your personal AI assistant.</h3>
                    <p className="text-[15px] text-paper-dim leading-relaxed">
                      Quorum takes perfect notes so you can stay fully present in the conversation. Never worry about missing a detail or scrambling to write down an action item again.
                    </p>
                    <p className="text-[15px] text-paper-dim leading-relaxed">
                      Instantly recall any detail from any meeting with a simple search.
                    </p>
                  </div>
                  
                  {/* Right Column (Grid) */}
                  <div className="flex-1 grid grid-cols-2 gap-x-8 gap-y-10">
                    <div className="space-y-4">
                      <div className="text-[#3b82f6]"><Zap size={28} strokeWidth={1.5} /></div>
                      <p className="text-[13px] text-paper-dim leading-relaxed">Get instant summaries and action items the moment your meeting ends.</p>
                    </div>
                    <div className="space-y-4">
                      <div className="text-[#3b82f6]"><Rocket size={28} strokeWidth={1.5} /></div>
                      <p className="text-[13px] text-paper-dim leading-relaxed">Focus on the conversation, not your keyboard. Build better relationships.</p>
                    </div>
                    <div className="space-y-4">
                      <div className="text-[#3b82f6]"><Search size={28} strokeWidth={1.5} /></div>
                      <p className="text-[13px] text-paper-dim leading-relaxed">Find exactly what was said weeks ago with powerful semantic search.</p>
                    </div>
                    <div className="space-y-4">
                      <div className="text-[#3b82f6]"><Sparkles size={28} strokeWidth={1.5} /></div>
                      <p className="text-[13px] text-paper-dim leading-relaxed">Generate follow-up emails and project briefs automatically from your notes.</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
