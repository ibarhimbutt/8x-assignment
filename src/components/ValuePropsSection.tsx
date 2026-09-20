"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const FEATURES = [
  {
    id: "clarity",
    title: "Clarity",
    subtitle: "Unforgettable meetings...quite literally",
    description:
      "Shockingly accurate transcripts, instant summaries, and action items with consistent quality across every call – delivered straight to your inbox, like magic.",
    image:
      "https://cdn.prod.website-files.com/6899da9beccbdbe92be49b5d/6a906c491bbe02afa291076c_68af24c8426102223d4dc07d_Clarity%20(1).avif",
  },
  {
    id: "momentum",
    title: "Momentum",
    subtitle: "Keep work moving after the call",
    description:
      "Turn every conversation into next steps that actually get done. Action items, owners, and follow-ups stay in sync so deals and projects keep moving forward.",
    image:
      "https://cdn.prod.website-files.com/6899da9beccbdbe92be49b5d/6a906c48b3e42699c4ee99cc_68af24c75a93098d39e593bc_momentum%20(1).avif",
  },
  {
    id: "ease",
    title: "Ease",
    subtitle: "Works where you already work",
    description:
      "Capture notes in Google Meet, Zoom, or Teams without changing how you run the meeting. Quorum stays out of the way — then delivers the recap like magic.",
    image:
      "https://cdn.prod.website-files.com/6899da9beccbdbe92be49b5d/6a906c480231df670de23c91_68af24c74058daeed897b226_ease%20(1).avif",
  },
] as const;

export function ValuePropsSection() {
  const pinRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      ticking = false;
      const el = pinRef.current;
      if (!el) return;

      const total = el.offsetHeight - window.innerHeight;
      if (total <= 0) return;

      const scrolled = Math.min(total, Math.max(0, -el.getBoundingClientRect().top));
      const next = Math.min(
        FEATURES.length - 1,
        Math.floor((scrolled / total) * FEATURES.length + 0.001)
      );

      setActiveIndex((prev) => (prev === next ? prev : next));
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const scrollToFeature = (index: number) => {
    const el = pinRef.current;
    if (!el) return;
    const total = el.offsetHeight - window.innerHeight;
    const start = window.scrollY + el.getBoundingClientRect().top;
    window.scrollTo({
      top: start + ((index + 0.12) / FEATURES.length) * total,
      behavior: "smooth",
    });
  };

  return (
    <section ref={pinRef} className="relative z-10 h-[320vh] w-full shrink-0">
      <div className="sticky top-0 flex h-svh w-full items-center overflow-hidden">
        {/* Right: pink/purple disc + product shot */}
        <div className="pointer-events-none absolute inset-0 hidden lg:block">
          <div className="absolute right-[-3%] top-1/2 -translate-y-1/2">
            {/* Invisible sizer so the disc can hug the artwork exactly */}
            <img
              src={FEATURES[0].image}
              alt=""
              aria-hidden
              className="h-[min(90vh,880px)] w-auto max-w-none opacity-0"
            />

            <div className="gradient-pink-purple" />

            {FEATURES.map((feature, index) => (
              <img
                key={feature.id}
                src={feature.image}
                alt={feature.title}
                className={cn(
                  "absolute inset-0 z-10 h-full w-full object-contain transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  index === activeIndex
                    ? "translate-x-0 scale-100 opacity-100"
                    : "translate-x-6 scale-[0.97] opacity-0"
                )}
              />
            ))}
          </div>
        </div>

        {/* Left: stacked titles */}
        <div className="relative z-20 w-full max-w-[620px] px-6 md:px-12 lg:pl-16 xl:pl-24">
          <div className="relative mb-10 h-[38vh] w-full lg:hidden">
            <div className="gradient-pink-purple" />
            {FEATURES.map((feature, index) => (
              <img
                key={`${feature.id}-sm`}
                src={feature.image}
                alt=""
                className={cn(
                  "absolute inset-0 z-10 h-full w-full object-contain object-left transition-opacity duration-700",
                  index === activeIndex ? "opacity-100" : "opacity-0"
                )}
              />
            ))}
          </div>

          {FEATURES.map((feature, index) => {
            const isActive = index === activeIndex;
            return (
              <div key={feature.id} className="flex flex-col">
                <button
                  type="button"
                  onClick={() => scrollToFeature(index)}
                  className={cn(
                    "w-fit text-left font-display text-[40px] font-medium leading-[1.1] tracking-tight transition-colors duration-500 md:text-[52px] lg:text-[60px]",
                    isActive ? "text-white" : "text-white/30 hover:text-white/55"
                  )}
                >
                  {feature.title}
                </button>

                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      key={`${feature.id}-copy`}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="max-w-[430px] pb-10 pt-4">
                        <p className="flex items-center gap-2 text-[15px] font-medium text-[#00beff]">
                          <Sparkles size={14} className="fill-[#00beff] text-[#00beff]" />
                          {feature.subtitle}
                        </p>
                        <p className="mt-4 text-[17px] leading-[1.45] text-white/70">
                          {feature.description}
                        </p>
                        <Button
                          asChild
                          variant="default"
                          size="lg"
                          className="mt-7 bg-[#00beff] text-black"
                        >
                          <Link href="/signup">GET STARTED. IT&apos;S FREE.</Link>
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
