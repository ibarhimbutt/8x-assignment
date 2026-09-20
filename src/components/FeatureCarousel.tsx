"use client";

import * as React from "react";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const CAROUSEL_SLIDES = [
  {
    id: 0,
    title: "Q3 Strategy + Planning",
    tab: "Summary",
    images: [
      { name: "Lily", url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop" },
      { name: "Jordan", url: "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?q=80&w=800&auto=format&fit=crop" }
    ],
    avatars: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=150&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop"
    ],
    content: (
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
    )
  },
  {
    id: 1,
    title: "Project check-in",
    tab: "Action items",
    images: [
      { name: "Alex", url: "https://images.unsplash.com/photo-1537511446984-935f663eb1f4?q=80&w=800&auto=format&fit=crop" },
      { name: "Sam", url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop" }
    ],
    avatars: [
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop"
    ],
    content: (
      <div className="mt-5 flex-1 space-y-4 text-[13px] leading-relaxed text-paper-dim">
        <div className="flex items-center justify-between mb-2">
          <span className="text-paper font-medium text-[13px]">Enhanced Summary</span>
          <span className="bg-white/10 px-2 py-0.5 rounded text-[10px] flex items-center gap-1"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg> Customize</span>
        </div>
        <p>The team reviewed progress, timelines, and upcoming milestones...</p>
        <ul className="space-y-3 list-disc pl-4 marker:text-paper-dim/50">
          <li><span className="text-paper">The project is progressing as planned, with core work completed.</span></li>
          <li><span className="text-paper">Teams aligned on current status, remaining tasks, and deadlines.</span></li>
          <li><span className="text-paper">A dependency on an internal security review was identified.</span></li>
        </ul>
      </div>
    )
  },
  {
    id: 2,
    title: "Weekly Sync",
    tab: "Comments",
    images: [
      { name: "Taylor", url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop" },
      { name: "Morgan", url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop" }
    ],
    avatars: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop"
    ],
    content: (
      <div className="mt-5 flex-1 space-y-4 text-[13px] leading-relaxed text-paper-dim">
        <p className="opacity-40">Weekly catch-up to discuss blockers and wins.</p>
        <ul className="space-y-3 list-disc pl-4 marker:text-paper-dim/50">
          <li><span className="text-paper">Marketing campaign launch is on track for next Tuesday.</span></li>
          <li><span className="text-paper">Engineering needs more time for the database migration.</span></li>
          <li><span className="text-paper">Design handoff scheduled for Friday afternoon.</span></li>
        </ul>
      </div>
    )
  },
  {
    id: 3,
    title: "Client Discovery",
    tab: "Summary",
    images: [
      { name: "Casey", url: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop" },
      { name: "Riley", url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop" }
    ],
    avatars: [
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=150&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop"
    ],
    content: (
      <div className="mt-5 flex-1 space-y-4 text-[13px] leading-relaxed text-paper-dim">
        <p className="opacity-40">Initial call with Acme Corp to understand their needs.</p>
        <ul className="space-y-3 list-disc pl-4 marker:text-paper-dim/50">
          <li><span className="text-paper">Client is looking for a scalable CRM solution.</span></li>
          <li><span className="text-paper">Current pain points include data silos and slow reporting.</span></li>
          <li><span className="text-paper">Budget is approved for Q4 implementation.</span></li>
        </ul>
      </div>
    )
  }
];

export function FeatureCarousel() {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = React.useState(0);

  const scrollTo = (index: number) => {
    if (scrollRef.current) {
      const slide = scrollRef.current.children[index] as HTMLElement;
      if (slide) {
        const containerCenter = scrollRef.current.clientWidth / 2;
        const slideCenter = slide.offsetLeft + slide.clientWidth / 2;
        const scrollPosition = slideCenter - containerCenter;
        scrollRef.current.scrollTo({ left: scrollPosition, behavior: 'smooth' });
      }
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const slideWidth = scrollRef.current.children[0].clientWidth;
      const gap = window.innerWidth >= 768 ? 32 : 24;
      const totalSlideWidth = slideWidth + gap;
      const newIndex = Math.round(scrollLeft / totalSlideWidth);
      if (newIndex !== activeIndex && newIndex >= 0 && newIndex < CAROUSEL_SLIDES.length) {
        setActiveIndex(newIndex);
      }
    }
  };

  return (
    <section className="relative z-10 w-full flex flex-col items-center pt-24 pb-32">
      <h2 className="text-[32px] md:text-[40px] font-display font-medium text-center text-paper max-w-3xl leading-[1.15] px-4">
        Capture notes your way — <strong className="font-semibold">bot or no bot</strong> —<br />
        so you can stay focused on the meeting
      </h2>

      {/* Carousel */}
      <div className="relative mt-16 w-full max-w-[100vw] overflow-hidden">
        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto snap-x snap-mandatory gap-6 md:gap-8 px-[5vw] md:px-[calc(50vw-390px)] pb-8 no-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {CAROUSEL_SLIDES.map((slide, index) => {
            const isActive = index === activeIndex;
            return (
              <div 
                key={slide.id}
                className={cn(
                  "flex flex-col md:flex-row gap-4 shrink-0 w-[90vw] md:w-[780px] snap-center transition-all duration-500",
                  isActive ? "opacity-100 scale-100" : "opacity-40 scale-[0.98]"
                )}
              >
                {/* Left: Video Feeds */}
                <div className="flex flex-col gap-4 w-full md:w-[340px]">
                  {slide.images.map((img, i) => (
                    <div key={i} className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-zinc-900 border border-white/10 shadow-lg">
                      <img src={img.url} alt={img.name} className="object-cover w-full h-full" />
                      <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-[11px] font-medium text-white">{img.name}</div>
                    </div>
                  ))}
                </div>

                {/* Right: Notes Panel */}
                <div className="flex-1 bg-[#0a0a0a] border border-white/10 rounded-[20px] p-6 shadow-2xl flex flex-col">
                  {/* Header */}
                  <div className="flex justify-between items-center">
                    <h3 className="text-[17px] font-semibold text-paper tracking-tight">{slide.title}</h3>
                    <div className="flex -space-x-2">
                      {slide.avatars.map((avatar, i) => (
                        <img key={i} src={avatar} className="w-7 h-7 rounded-full border-2 border-[#0a0a0a] object-cover" alt="User" />
                      ))}
                    </div>
                  </div>

                  {/* Tabs */}
                  <div className="flex gap-6 border-b border-white/10 pb-2 mt-6 text-[13px]">
                    <div className="flex items-center gap-1.5 text-cyan font-medium relative">
                      <Sparkles size={14} />
                      {slide.tab}
                      <div className="absolute -bottom-[9px] left-0 right-0 h-[2px] bg-cyan" />
                    </div>
                    <div className="flex items-center gap-1.5 text-paper-dim hover:text-paper transition-colors cursor-pointer">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
                      Scratchpad
                    </div>
                  </div>

                  {/* Content */}
                  {slide.content}

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
            );
          })}
        </div>
      </div>

      {/* Carousel Controls */}
      <div className="mt-8 flex items-center gap-5">
        <button 
          onClick={() => scrollTo(Math.max(0, activeIndex - 1))}
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-full bg-[#fce38a] text-black transition-all",
            activeIndex === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-[#fce38a]/90 hover:scale-105"
          )}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        </button>
        <div className="flex gap-2.5">
          {CAROUSEL_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollTo(idx)}
              className={cn(
                "h-2 w-2 rounded-full transition-colors",
                activeIndex === idx ? "bg-[#fce38a]" : "bg-white/20 hover:bg-white/40"
              )}
            />
          ))}
        </div>
        <button 
          onClick={() => scrollTo(Math.min(CAROUSEL_SLIDES.length - 1, activeIndex + 1))}
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-full bg-[#fce38a] text-black transition-all",
            activeIndex === CAROUSEL_SLIDES.length - 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-[#fce38a]/90 hover:scale-105"
          )}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </button>
      </div>
    </section>
  );
}
