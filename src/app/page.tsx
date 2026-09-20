"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Logo } from "@/components/Logo";
import { ChevronDown, Lock, Mic, ArrowUp, Sparkles, CheckCircle2 } from "lucide-react";

import { StarsBackground } from "@/components/StarsBackground";

export default function LandingPage() {
  return (
    <StarsBackground className="min-h-screen overflow-x-hidden flex flex-col">
      {/* Header */}
      <header className="mx-auto flex w-full max-w-[1280px] items-center justify-between px-6 py-6">
        <Logo size="lg" />
        
        <nav className="hidden items-center gap-8 text-[14px] font-medium text-paper-dim md:flex">
          <Link href="#overview" className="hover:text-paper transition-colors">Overview</Link>
          <button className="flex items-center gap-1 hover:text-paper transition-colors">
            Solutions <ChevronDown size={14} className="opacity-70" />
          </button>
          <button className="flex items-center gap-1 hover:text-paper transition-colors">
            Integrations <ChevronDown size={14} className="opacity-70" />
          </button>
          <button className="flex items-center gap-1 hover:text-paper transition-colors">
            Resources <ChevronDown size={14} className="opacity-70" />
          </button>
          <Link href="#pricing" className="hover:text-paper transition-colors">Pricing</Link>
        </nav>

        <div className="flex items-center gap-6 text-[14px] font-medium">
          <Link href="/demo" className="hidden text-paper hover:text-cyan transition-colors sm:block">
            Book a Demo
          </Link>
          <Link href="/login" className="hidden text-paper hover:text-cyan transition-colors sm:block">
            Log In
          </Link>
          <Link href="/signup" className="cta-outline-blue px-5 py-2 text-[13px] tracking-wide uppercase">
            SIGN UP FREE
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="mx-auto flex w-full max-w-[1280px] flex-1 flex-col justify-center px-6 py-12 lg:flex-row lg:items-center lg:py-20">
        {/* Left Content */}
        <div className="z-10 max-w-[540px] lg:w-1/2">
          <h1 className="font-display text-[56px] font-medium leading-[1.05] tracking-tight text-paper sm:text-[72px]">
            AI notetaking that is<br />out of this world
          </h1>
          <p className="mt-6 text-[18px] leading-relaxed text-paper-dim">
            Quorum summarizes your meetings so you can focus on the<br />
            conversation. <strong className="text-paper font-semibold">Now available bot-free.</strong>
          </p>
          <div className="mt-10">
            <Link href="/signup" className="cta px-8 py-3.5 text-[14px] tracking-wide uppercase">
              GET STARTED - FREE FOREVER
            </Link>
          </div>
          <div className="mt-8 flex items-center gap-2 text-[12px] text-paper-dim font-medium tracking-wide">
            <Lock size={12} className="opacity-70" />
            <span>SOC 2 Type II | GDPR | HIPAA Compliant | SSO / SCIM</span>
          </div>
        </div>

        {/* Right Content - Floating Pills */}
        <div className="relative mt-16 h-[500px] w-full lg:mt-0 lg:w-1/2">
          <div className="absolute inset-0 flex items-center justify-center">
            
            {/* Top Left: Dropdown Pill */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="border-gradient-orange absolute left-[5%] top-[10%] z-20 w-[240px] rounded-[32px] p-4 shadow-2xl"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="flex -space-x-1.5">
                  <div className="h-5 w-5 rounded-full bg-[#f97316] border border-[#0a0a0a]" />
                  <div className="h-5 w-5 rounded-full bg-[#3b82f6] border border-[#0a0a0a]" />
                  <div className="h-5 w-5 rounded-full bg-[#a855f7] border border-[#0a0a0a]" />
                </div>
                <span className="text-[12px] font-medium text-paper-dim">Project check-in</span>
              </div>
              <div className="space-y-2 text-[12px] text-paper-dim">
                <div className="flex items-center gap-2 px-2 py-1">
                  <div className="h-3 w-3 rounded-sm border border-paper-dim/50" />
                  <span>Audio & video</span>
                </div>
                <div className="flex items-center gap-2 rounded-lg bg-white/10 px-2 py-1.5 text-paper">
                  <Mic size={12} />
                  <span>Audio <span className="text-[9px] bg-white/20 px-1 rounded uppercase tracking-wider ml-1">BOT-FREE</span></span>
                </div>
                <div className="flex items-center gap-2 px-2 py-1">
                  <div className="h-3 w-3 rounded-sm border border-paper-dim/50" />
                  <span>Transcript only <span className="text-[9px] bg-white/10 px-1 rounded uppercase tracking-wider ml-1">BOT-FREE</span></span>
                </div>
                <div className="flex items-center gap-2 px-2 py-1">
                  <div className="h-3 w-3 rounded-full border border-paper-dim/50" />
                  <span>Capture off</span>
                </div>
              </div>
            </motion.div>

            {/* Top Right: Ask Pill */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="border-gradient-white absolute right-[5%] top-[15%] z-10 flex items-center gap-2 rounded-[32px] px-6 py-4 shadow-2xl"
            >
              <Sparkles size={16} className="text-paper" />
              <span className="text-[14px] font-semibold tracking-widest text-paper uppercase">ASK QUORUM</span>
            </motion.div>

            {/* Center Left: Astronaut Illustration */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="border-gradient-white absolute left-[-5%] top-[40%] z-10 flex h-[140px] w-[220px] items-center justify-center rounded-[40px] shadow-2xl overflow-hidden"
            >
              {/* Simplified Astronaut SVG representation */}
              <svg viewBox="0 0 200 120" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M60 90 C60 70 80 50 110 50 C140 50 160 70 160 90 L160 120 L60 120 Z" fill="#ffffff" />
                <circle cx="110" cy="65" r="25" fill="#000000" stroke="#ffffff" strokeWidth="4" />
                <path d="M110 65 C120 65 130 75 130 85" stroke="#18c8f4" strokeWidth="2" strokeLinecap="round" />
                <rect x="40" y="70" width="45" height="35" rx="4" fill="#d4d4d8" />
                <path d="M35 105 L90 105 L85 110 L40 110 Z" fill="#a1a1aa" />
                <path d="M110 90 L110 120" stroke="#e4e4e7" strokeWidth="2" />
                <path d="M140 90 C150 100 145 115 135 120" stroke="#18c8f4" strokeWidth="6" strokeLinecap="round" />
                <path d="M80 90 C70 100 75 115 85 120" stroke="#18c8f4" strokeWidth="6" strokeLinecap="round" />
              </svg>
            </motion.div>

            {/* Center Right: Chat Pill */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="border-gradient-purple absolute right-[-2%] top-[42%] z-30 w-[340px] rounded-[32px] p-5 shadow-2xl"
            >
              <div className="absolute -top-4 right-6 flex gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#10a37f] border-2 border-[#0a0a0a]">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.073zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.8956zm16.0993 3.8558L12.5973 8.3829l2.0343-1.1733a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.3879-.6765zM8.5178 8.1503 12.5973 5.795l-2.0296-1.1733a.0757.0757 0 0 0-.071 0l-4.8303 2.7865a4.4944 4.4944 0 0 0 .6765 8.1042V9.8353a.79.79 0 0 1 .3879-.6765zm4.7423-1.2843-3.0238-1.7456V2.7865a.0757.0757 0 0 1 .0332-.0615l4.8303-2.7865a4.4992 4.4992 0 0 1 3.2418 7.6612l-4.783-2.7582a.7712.7712 0 0 0-.7806 0z"/></svg>
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f97316] border-2 border-[#0a0a0a]">
                  <Sparkles size={14} className="text-white" />
                </div>
              </div>
              <p className="mt-2 text-[14px] leading-relaxed text-paper-dim">
                Quorum, what follow-ups did I commit to in my meetings this week?
              </p>
              <div className="mt-4 flex items-center gap-3 rounded-full bg-white/5 px-3 py-2">
                <span className="text-paper-dim text-[18px] leading-none">+</span>
                <div className="flex items-center gap-1 rounded-full bg-white/10 px-2 py-0.5 text-[11px] text-paper">
                  <span className="text-cyan">▶</span> Quorum
                </div>
                <div className="ml-auto flex gap-2 text-paper-dim">
                  <Mic size={14} />
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20 text-paper">
                    <ArrowUp size={12} />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Bottom Left: Summary Pill */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="border-gradient-blue absolute bottom-[5%] left-[15%] z-20 w-[260px] rounded-[32px] p-5 shadow-2xl"
            >
              <p className="text-[12px] font-medium text-paper-dim mb-3">Project check-in</p>
              <div className="flex -space-x-1.5 mb-4">
                <div className="h-6 w-6 rounded-full bg-[#f97316] border border-[#0a0a0a]" />
                <div className="h-6 w-6 rounded-full bg-[#3b82f6] border border-[#0a0a0a]" />
                <div className="h-6 w-6 rounded-full bg-[#a855f7] border border-[#0a0a0a]" />
              </div>
              <div className="flex gap-6 border-b border-white/10 pb-2 text-[13px]">
                <div className="flex items-center gap-1 text-cyan font-medium relative">
                  <Sparkles size={12} />
                  Summary
                  <div className="absolute -bottom-[9px] left-0 right-0 h-[2px] bg-cyan" />
                </div>
                <div className="flex items-center gap-1 text-paper-dim">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
                  Scratchpad
                </div>
              </div>
            </motion.div>

            {/* Bottom Right: Planet */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="absolute bottom-[8%] right-[10%] z-10 flex h-[80px] w-[80px] items-center justify-center rounded-full border border-white/20 shadow-[0_0_30px_rgba(24,200,244,0.3)] overflow-hidden"
            >
              <div className="w-full h-full bg-[radial-gradient(circle_at_30%_30%,#21d4fd,#000000)]" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.4'/%3E%3C/svg%3E"), radial-gradient(circle at 30% 30%, #21d4fd, #087ea4, #000000)`
              }} />
            </motion.div>

          </div>
        </div>
      </main>

      {/* Feature Carousel Section */}
      <section className="relative z-10 w-full flex flex-col items-center pt-24 pb-32">
        <h2 className="text-[32px] md:text-[40px] font-display font-medium text-center text-paper max-w-3xl leading-[1.15]">
          Capture notes your way — <strong className="font-semibold">bot or no bot</strong> —<br />
          so you can stay focused on the meeting
        </h2>

        {/* Carousel */}
        <div className="relative mt-16 w-full max-w-[1400px] mx-auto overflow-hidden px-4">
          <div className="flex items-center gap-6 md:gap-8 transition-transform duration-500 translate-x-0 md:translate-x-[5%] lg:translate-x-[12%]">
            
            {/* Center Active Item (Composite) */}
            <div className="flex flex-col md:flex-row gap-4 shrink-0 w-[90vw] md:w-[780px]">
              {/* Left: Video Feeds */}
              <div className="flex flex-col gap-4 w-full md:w-[340px]">
                <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-zinc-900 border border-white/10 shadow-lg">
                  <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop" alt="Lily" className="object-cover w-full h-full" />
                  <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-[11px] font-medium text-white">Lily</div>
                </div>
                <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-zinc-900 border border-white/10 shadow-lg">
                  <img src="https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?q=80&w=800&auto=format&fit=crop" alt="Jordan" className="object-cover w-full h-full" />
                  <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-[11px] font-medium text-white">Jordan</div>
                </div>
              </div>

              {/* Right: Notes Panel */}
              <div className="flex-1 bg-[#0a0a0a] border border-white/10 rounded-[20px] p-6 shadow-2xl flex flex-col">
                {/* Header */}
                <div className="flex justify-between items-center">
                  <h3 className="text-[17px] font-semibold text-paper tracking-tight">Q3 Strategy + Planning</h3>
                  <div className="flex -space-x-2">
                    <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop" className="w-7 h-7 rounded-full border-2 border-[#0a0a0a] object-cover" alt="User" />
                    <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=150&auto=format&fit=crop" className="w-7 h-7 rounded-full border-2 border-[#0a0a0a] object-cover" alt="User" />
                    <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop" className="w-7 h-7 rounded-full border-2 border-[#0a0a0a] object-cover" alt="User" />
                  </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-6 border-b border-white/10 pb-2 mt-6 text-[13px]">
                  <div className="flex items-center gap-1.5 text-cyan font-medium relative">
                    <Sparkles size={14} />
                    Summary
                    <div className="absolute -bottom-[9px] left-0 right-0 h-[2px] bg-cyan" />
                  </div>
                  <div className="flex items-center gap-1.5 text-paper-dim hover:text-paper transition-colors cursor-pointer">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
                    Scratchpad
                  </div>
                </div>

                {/* Content */}
                <div className="mt-5 flex-1 space-y-4 text-[13px] leading-relaxed text-paper-dim">
                  <p className="opacity-40">planning, aligning on key priorities, existing goals, and outlining next steps to drive execution</p>
                  <ul className="space-y-3 list-disc pl-4 marker:text-paper-dim/50">
                    <li><span className="text-paper">Lily outlined top Q3 priorities, focusing on growth targets and key initiatives.</span></li>
                    <li><span className="text-paper">Jordan raised concerns around resourcing and timeline feasibility.</span></li>
                    <ul className="list-disc pl-4 mt-2 space-y-2 marker:text-paper-dim/50">
                      <li><span className="text-cyan font-medium">@Lily</span> <span className="text-paper">to follow-up with Jordan about additional outside resources.</span></li>
                    </ul>
                    <li><span className="text-paper">Jordan suggested reallocating budget to support higher-impact projects.</span></li>
                  </ul>
                </div>

                {/* Footer */}
                <div className="mt-8 pt-4 flex items-center justify-between">
                  <div className="text-[13px] text-paper-dim">Listening ...</div>
                  <div className="flex items-center gap-4">
                    {/* Audio wave */}
                    <div className="flex items-center gap-[3px] h-4">
                      <div className="w-[3px] bg-cyan rounded-full h-2 animate-pulse" />
                      <div className="w-[3px] bg-cyan rounded-full h-4 animate-pulse delay-75" />
                      <div className="w-[3px] bg-cyan rounded-full h-3 animate-pulse delay-150" />
                      <div className="w-[3px] bg-cyan rounded-full h-1 animate-pulse delay-200" />
                      <div className="w-[3px] bg-cyan rounded-full h-3 animate-pulse delay-300" />
                    </div>
                    {/* End button */}
                    <button className="flex items-center gap-1.5 rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-[12px] font-medium text-red-500 hover:bg-red-500/20 transition-colors">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><rect x="9" y="9" width="6" height="6" fill="currentColor"/></svg>
                      End
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Inactive Item (Partial) */}
            <div className="hidden md:flex flex-col shrink-0 w-[420px] bg-[#0a0a0a] border border-white/10 rounded-[20px] p-6 opacity-50 scale-[0.98] transition-all">
              {/* Header */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-[17px] font-semibold text-paper tracking-tight">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                  Project check-in
                </div>
                <div className="flex -space-x-2">
                  <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop" className="w-7 h-7 rounded-full border-2 border-[#0a0a0a] object-cover" alt="User" />
                  <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop" className="w-7 h-7 rounded-full border-2 border-[#0a0a0a] object-cover" alt="User" />
                </div>
              </div>
              {/* Tabs */}
              <div className="flex gap-4 border-b border-white/10 pb-2 mt-6 text-[12px]">
                <div className="flex items-center gap-1 text-cyan font-medium relative bg-cyan/10 px-2 py-1 rounded">
                  <Sparkles size={12} />
                  Summary
                </div>
                <div className="flex items-center gap-1 text-paper-dim px-2 py-1">
                  Action items <span className="bg-white/10 px-1.5 rounded-full text-[10px]">3</span>
                </div>
                <div className="flex items-center gap-1 text-paper-dim px-2 py-1">
                  Comments
                </div>
              </div>
              {/* Content Mock */}
              <div className="mt-5 space-y-4 text-[12px] text-paper-dim">
                <div className="flex items-center justify-between">
                  <span className="text-paper font-medium text-[13px]">Enhanced Summary</span>
                  <span className="bg-white/10 px-2 py-0.5 rounded text-[10px] flex items-center gap-1"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg> Customize</span>
                </div>
                <p>The team reviewed progress, timelines, and upcoming milestones...</p>
                <ul className="space-y-2 list-disc pl-4 marker:text-paper-dim/50">
                  <li><span className="text-paper">The project is progressing as planned, with core work...</span></li>
                  <li><span className="text-paper">Teams aligned on current status, remaining tasks...</span></li>
                  <li><span className="text-paper">A dependency on an internal security review was ident...</span></li>
                </ul>
              </div>
            </div>

          </div>
        </div>

        {/* Carousel Controls */}
        <div className="mt-12 flex items-center gap-5">
          <button className="flex h-9 w-9 items-center justify-center rounded-full bg-[#fce38a] text-black hover:bg-[#fce38a]/90 transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          </button>
          <div className="flex gap-2.5">
            <div className="h-2 w-2 rounded-full bg-[#fce38a]"></div>
            <div className="h-2 w-2 rounded-full bg-white/20"></div>
            <div className="h-2 w-2 rounded-full bg-white/20"></div>
            <div className="h-2 w-2 rounded-full bg-white/20"></div>
          </div>
          <button className="flex h-9 w-9 items-center justify-center rounded-full bg-[#fce38a] text-black hover:bg-[#fce38a]/90 transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>
      </section>

      {/* Bottom Gradient */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-[800px] bg-[radial-gradient(ellipse_at_bottom,_#084d6e_0%,_transparent_60%)] opacity-80 z-0" />

      {/* Bottom Bar */}
      <footer className="mt-auto w-full border-t border-white/10 bg-[#000000]/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-6 px-6 py-6 md:flex-row">
          
          {/* G2 Rating */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded bg-white text-black font-bold text-xl">
              G<span className="text-red-500 text-sm align-top">2</span>
            </div>
            <div>
              <div className="flex items-center gap-1 text-[#ffb15c]">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                <span className="ml-1 text-[13px] font-semibold text-paper">5.0/5.0</span>
              </div>
              <p className="text-[11px] text-paper-dim">#1 rated - 6,500+ reviews</p>
            </div>
          </div>

          {/* Users */}
          <div className="text-[12px] text-paper-dim leading-tight">
            Used at<br />
            <strong className="text-paper">300K+</strong><br />
            companies
          </div>

          {/* Logos */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-paper-dim">
            <div className="flex h-12 w-28 items-center justify-center rounded-lg bg-white/5 px-4 hover:bg-white/10 hover:text-paper transition-colors">
              <span className="font-bold text-[16px] tracking-tight">HubSpot</span>
            </div>
            <div className="flex h-12 w-20 items-center justify-center rounded-lg bg-white/5 px-4 hover:bg-white/10 hover:text-paper transition-colors">
              <span className="font-bold text-[20px]">A</span>
              <span className="ml-1 text-[10px] font-medium leading-none">Adobe</span>
            </div>
            <div className="flex h-12 w-28 items-center justify-center rounded-lg bg-white/5 px-4 hover:bg-white/10 hover:text-paper transition-colors">
              <span className="font-bold text-[18px] tracking-tighter">_zapier</span>
            </div>
            <div className="flex h-12 w-28 items-center justify-center rounded-lg bg-white/5 px-4 hover:bg-white/10 hover:text-paper transition-colors gap-1">
              <span className="font-bold text-[16px] tracking-tight">GRUBHUB</span>
            </div>
            <div className="flex h-12 w-20 items-center justify-center rounded-lg bg-white/5 px-4 hover:bg-white/10 hover:text-paper transition-colors">
              <span className="font-bold text-[18px] tracking-widest">EA</span>
            </div>
            <div className="flex h-12 w-28 items-center justify-center rounded-lg bg-white/5 px-4 hover:bg-white/10 hover:text-paper transition-colors gap-1">
              <span className="font-bold text-[16px] tracking-tight">Calendly</span>
            </div>
          </div>
        </div>
      </footer>
    </StarsBackground>
  );
}
