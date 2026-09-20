"use client";

import * as React from "react";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const CAROUSEL_SLIDES = [
  {
    id: 0,
    image: "https://cdn.prod.website-files.com/6899da9beccbdbe92be49b5d/6a906aaede7376e9ec5c6b3d_69de69257342cfaefbbaa833_carousel-1%20(1).avif"
  },
  {
    id: 1,
    image: "https://cdn.prod.website-files.com/6899da9beccbdbe92be49b5d/6a906aada78e00c5b32a3be5_69de69251b2c5b7bf83e2782_carousel-2%20(1).avif"
  },
  {
    id: 2,
    image: "https://cdn.prod.website-files.com/6899da9beccbdbe92be49b5d/6a906aad2bc1acfbab6c28e3_69de69250339682ae143b06f_2fea00bf2345f814c9c9ae7e9c945e9a_carousel-3%20(1).avif"
  },
  {
    id: 3,
    image: "https://cdn.prod.website-files.com/6899da9beccbdbe92be49b5d/6a906aad65aea1ac0ef96998_69de69257d2e8b183dfdb058_carousel-4%20(1).avif"
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
    <section className="relative z-10 w-full flex flex-col items-center pt-24 pb-16">
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
                  "flex shrink-0 w-[90vw] md:w-[780px] snap-center transition-all duration-500 items-center justify-center",
                  isActive ? "opacity-100 scale-100" : "opacity-40 scale-[0.98]"
                )}
              >
                <img 
                  src={slide.image} 
                  alt={`Carousel slide ${index + 1}`} 
                  className="w-full h-auto object-contain rounded-2xl shadow-2xl"
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Carousel Controls */}
      <div className="mt-8 flex items-center gap-5">
        <Button 
          onClick={() => scrollTo(Math.max(0, activeIndex - 1))}
          variant="default"
          size="icon"
          className={cn(
            "rounded-full bg-[#fce38a] text-black hover:bg-[#fce38a]/90",
            activeIndex === 0 ? "opacity-50 pointer-events-none" : ""
          )}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        </Button>
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
        <Button 
          onClick={() => scrollTo(Math.min(CAROUSEL_SLIDES.length - 1, activeIndex + 1))}
          variant="default"
          size="icon"
          className={cn(
            "rounded-full bg-[#fce38a] text-black hover:bg-[#fce38a]/90",
            activeIndex === CAROUSEL_SLIDES.length - 1 ? "opacity-50 pointer-events-none" : ""
          )}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </Button>
      </div>
    </section>
  );
}
