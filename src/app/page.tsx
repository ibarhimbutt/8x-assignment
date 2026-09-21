"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "@/components/Logo";
import { ChevronDown, Lock, Mic, ArrowUp, Sparkles, CheckCircle2 } from "lucide-react";

import { StarsBackground } from "@/components/StarsBackground";
import { FeatureCarousel } from "@/components/FeatureCarousel";
import { TeamsSection } from "@/components/TeamsSection";
import { ValuePropsSection } from "@/components/ValuePropsSection";
import { IntegrationsSection } from "@/components/IntegrationsSection";
import { Button } from "@/components/ui/button";

function NavDropdown({ title, items }: { title: string, items: string[] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button className="flex items-center gap-1 hover:text-paper transition-colors py-2">
        {title} 
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={14} className="opacity-70" />
        </motion.div>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute left-0 top-full mt-1 w-48 rounded-xl border border-white/10 bg-[#0a0a0a]/95 backdrop-blur-md p-2 shadow-xl z-50"
          >
            {items.map((item, i) => (
              <Link 
                key={i} 
                href="#" 
                className="block px-3 py-2 text-sm text-paper-dim hover:text-paper hover:bg-white/5 rounded-lg transition-colors"
              >
                {item}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function LandingPage() {
  return (
    <StarsBackground className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="mx-auto flex w-full max-w-[1280px] items-center justify-between px-6 py-6">
        <Logo size="lg" />
        
        <nav className="hidden items-center gap-8 text-[14px] font-medium text-paper-dim md:flex">
          <Link href="#overview" className="hover:text-paper transition-colors py-2">Overview</Link>
          <NavDropdown title="Solutions" items={["For Sales", "For Customer Success", "For Engineering", "For Product"]} />
          <NavDropdown title="Integrations" items={["HubSpot", "Salesforce", "Slack", "Zoom", "Google Meet"]} />
          <NavDropdown title="Resources" items={["Blog", "Help Center", "Community", "API Docs"]} />
          <Link href="#pricing" className="hover:text-paper transition-colors py-2">Pricing</Link>
        </nav>

        <div className="flex items-center gap-6 text-[14px] font-medium">
          <Link href="/demo" className="hidden text-paper hover:text-cyan transition-colors sm:block">
            Book a Demo
          </Link>
          <Link href="/login" className="hidden text-paper hover:text-cyan transition-colors sm:block">
            Log In
          </Link>
          <Button asChild variant="outlineBlue" size="sm" className="tracking-wide uppercase text-[13px]">
            <Link href="/signup">SIGN UP FREE</Link>
          </Button>
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
            <Button asChild variant="default" size="lg" hoverScale={1.03} tapScale={0.97}>
              <Link href="/signup">GET STARTED - FREE FOREVER</Link>
            </Button>
          </div>
          <div className="mt-8 flex items-center gap-2 text-[12px] text-paper-dim font-medium tracking-wide">
            <Lock size={12} className="opacity-70" />
            <span>SOC 2 Type II | GDPR | HIPAA Compliant | SSO / SCIM</span>
          </div>
        </div>

        {/* Right Content - Floating Image */}
        <div className="relative mt-16 h-[500px] w-full lg:mt-0 lg:w-1/2 flex items-center justify-center">
          <motion.img 
            initial={{ opacity: 0, scale: 0.95, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            src="https://cdn.prod.website-files.com/6899da9beccbdbe92be49b5d/6a906aae186955014cec4283_69decfaf990e574c8859da7e_hero%20(1).avif" 
            alt="Quorum Interface" 
            className="w-[120%] max-w-[800px] h-auto object-contain drop-shadow-2xl translate-x-[10%]"
          />
        </div>
      </main>

      <FeatureCarousel />
      <TeamsSection />
      <ValuePropsSection />
      <IntegrationsSection />

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
