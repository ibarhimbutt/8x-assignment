"use client";

import { motion } from "framer-motion";
import { Mark } from "@/components/Logo";

/* ------------------------------------------------------------------ */
/*  Inline brand-coloured icons — no external URLs to 404             */
/* ------------------------------------------------------------------ */
function GoogleMeetIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0">
      <path d="M5 5h10v14H5z" fill="#00832d" />
      <path d="M15 9.5l4-3v11l-4-3z" fill="#00ac47" />
      <path d="M5 5h10v4H5z" fill="#ffbc00" />
      <path d="M5 15h10v4H5z" fill="#0066da" />
      <path d="M15 5h4v4l-4 .5z" fill="#ea4335" />
      <path d="M15 15l4 .5V19h-4z" fill="#00832d" />
    </svg>
  );
}

function ZoomIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0">
      <rect width="24" height="24" rx="5" fill="#2D8CFF" />
      <path d="M5 8.5a1.5 1.5 0 011.5-1.5h7a1.5 1.5 0 011.5 1.5v7a1.5 1.5 0 01-1.5 1.5h-7A1.5 1.5 0 015 15.5v-7z" fill="#fff" />
      <path d="M15 10l4-2v8l-4-2z" fill="#fff" />
    </svg>
  );
}

function GmailIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0">
      <path d="M2 6l10 7 10-7v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" fill="#fff" />
      <path d="M22 6l-10 7L2 6h20z" fill="#ea4335" />
      <path d="M2 6v12l6-6z" fill="#fbbc05" />
      <path d="M22 6v12l-6-6z" fill="#34a853" />
      <path d="M2 6l10 7 10-7" fill="none" stroke="#c5221f" strokeWidth="0.5" />
    </svg>
  );
}

function SlackIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0">
      <path d="M6 15a2 2 0 01-2-2 2 2 0 012-2h2v2a2 2 0 01-2 2z" fill="#e01e5a" />
      <path d="M9 15a2 2 0 002-2V6a2 2 0 10-4 0v7a2 2 0 002 2z" fill="#e01e5a" />
      <path d="M9 4a2 2 0 012 2 2 2 0 01-2 2H7V6a2 2 0 012-2z" fill="#36c5f0" />
      <path d="M9 9a2 2 0 00-2 2v7a2 2 0 104 0v-7a2 2 0 00-2-2z" fill="#36c5f0" />
      <path d="M18 11a2 2 0 012 2 2 2 0 01-2 2h-2v-2a2 2 0 012-2z" fill="#2eb67d" />
      <path d="M15 11a2 2 0 00-2 2v7a2 2 0 104 0v-7a2 2 0 00-2-2z" fill="#2eb67d" />
      <path d="M15 22a2 2 0 01-2-2 2 2 0 012-2h2v2a2 2 0 01-2 2z" fill="#ecb22e" />
      <path d="M15 17a2 2 0 002-2V8a2 2 0 10-4 0v7a2 2 0 002 2z" fill="#ecb22e" />
    </svg>
  );
}

function TeamsIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0">
      <rect width="24" height="24" rx="4" fill="#5059C9" />
      <circle cx="17" cy="8" r="2.5" fill="#7B83EB" />
      <rect x="14" y="10" width="6" height="8" rx="1" fill="#7B83EB" />
      <circle cx="10" cy="7" r="3" fill="#fff" />
      <rect x="6" y="10" width="8" height="9" rx="1.5" fill="#fff" />
    </svg>
  );
}

function AsanaIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0">
      <circle cx="12" cy="7" r="4" fill="#f06a6a" />
      <circle cx="5.5" cy="16" r="4" fill="#f06a6a" />
      <circle cx="18.5" cy="16" r="4" fill="#f06a6a" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Integration pill data — positions as % from the reference image   */
/* ------------------------------------------------------------------ */
const INTEGRATIONS = [
  { name: "Google Meet", Icon: GoogleMeetIcon, top: "22%", left: "18%" },
  { name: "Zoom",        Icon: ZoomIcon,       top: "48%", left: "10%" },
  { name: "Gmail",       Icon: GmailIcon,      top: "74%", left: "20%" },
  { name: "Slack",       Icon: SlackIcon,       top: "14%", left: "72%" },
  { name: "Microsoft Teams", Icon: TeamsIcon,   top: "48%", left: "76%" },
  { name: "Asana",       Icon: AsanaIcon,       top: "74%", left: "68%" },
];

/* ------------------------------------------------------------------ */
/*  SVG overlay — grid, triangles, lines                              */
/* ------------------------------------------------------------------ */
function DiagramSVG() {
  const cx = 500;
  const cy = 300;

  // Pill centers (matching the % positions above, mapped to a 1000×600 viewBox)
  const pills = [
    { x: 210, y: 132 },  // Google Meet
    { x: 130, y: 288 },  // Zoom
    { x: 230, y: 444 },  // Gmail
    { x: 750, y: 84 },   // Slack
    { x: 800, y: 288 },  // Microsoft Teams
    { x: 720, y: 444 },  // Asana
  ];

  // Two offset triangles — round to 2dp to avoid SSR/client float mismatch
  const tri = (r: number, offset: number) => {
    const pts = [0, 1, 2].map((i) => {
      const a = ((i * 120 + offset - 90) * Math.PI) / 180;
      return `${Math.round((cx + Math.cos(a) * r) * 100) / 100},${Math.round((cy + Math.sin(a) * r) * 100) / 100}`;
    });
    return pts.join(" ");
  };

  return (
    <svg
      viewBox="0 0 1000 600"
      preserveAspectRatio="xMidYMid meet"
      className="absolute inset-0 h-full w-full"
    >
      <defs>
        {/* Grid pattern */}
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
        </pattern>
        {/* Radial fade so grid fades at edges */}
        <radialGradient id="gridFade" cx="50%" cy="50%" r="40%">
          <stop offset="0%" stopColor="white" stopOpacity="1" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <mask id="gridMask">
          <rect width="1000" height="600" fill="url(#gridFade)" />
        </mask>
      </defs>

      {/* Subtle grid behind the hub */}
      <rect width="1000" height="600" fill="url(#grid)" mask="url(#gridMask)" />

      {/* Orange accent triangles */}
      <polygon points={tri(155, 0)} fill="none" stroke="#c84a10" strokeWidth="1.8" opacity="0.5" />
      <polygon points={tri(155, 60)} fill="none" stroke="#e05520" strokeWidth="1.5" opacity="0.35" />

      {/* Connecting lines from center to each pill */}
      {pills.map((p, i) => (
        <g key={i}>
          <line
            x1={cx} y1={cy} x2={p.x} y2={p.y}
            stroke="rgba(255,255,255,0.18)"
            strokeWidth="1.2"
          />
          {/* Small dot at pill end */}
          <circle cx={p.x} cy={p.y} r="3.5" fill="rgba(255,255,255,0.45)" />
        </g>
      ))}

      {/* Extra subtle radial lines for depth — round to 2dp to avoid SSR/client float mismatch */}
      {Array.from({ length: 18 }).map((_, i) => {
        const a = ((i * 20) * Math.PI) / 180;
        const cos = Math.round(Math.cos(a) * 100) / 100;
        const sin = Math.round(Math.sin(a) * 100) / 100;
        return (
          <line
            key={`r-${i}`}
            x1={cx + cos * 30}
            y1={cy + sin * 30}
            x2={cx + cos * 340}
            y2={cy + sin * 340}
            stroke="rgba(255,255,255,0.025)"
            strokeWidth="0.5"
          />
        );
      })}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                    */
/* ------------------------------------------------------------------ */
export function IntegrationsSection() {
  return (
    <section className="relative z-10 w-full py-24 md:py-36">
      {/* Top text */}
      <div className="mx-auto max-w-[1280px] px-6 text-center">
        <p className="text-[14px] font-medium italic text-[#00beff] tracking-wide">
          ✦ Zero friction, maximum flexibility.
        </p>
        <h2 className="mt-4 font-display text-[36px] font-medium leading-[1.1] tracking-tight text-white md:text-[52px] italic">
          Works where you meet
        </h2>
      </div>

      {/* Hub diagram */}
      <div className="relative mx-auto mt-10 aspect-[5/3] w-full max-w-[900px]">
        {/* SVG background layer (grid + triangles + lines) */}
        <DiagramSVG />

        {/* Center hub — large dark circle with logo */}
        <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
          {/* Outer glow */}
          <div className="absolute -inset-8 rounded-full bg-[radial-gradient(circle,rgba(0,0,0,0.7)_0%,transparent_70%)]" />
          {/* Dark circle */}
          <div className="relative flex h-[140px] w-[140px] items-center justify-center rounded-full bg-gradient-to-b from-[#1a1a2e] to-[#0a0a15] shadow-[0_0_80px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.05)] md:h-[180px] md:w-[180px]">
            <Mark className="h-16 w-16 md:h-20 md:w-20" />
          </div>
        </div>

        {/* Integration pills */}
        {INTEGRATIONS.map((item, i) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: i * 0.07, ease: "easeOut" }}
            className="absolute z-30 flex items-center gap-2.5 rounded-full bg-white px-4 py-2 shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
            style={{
              top: item.top,
              left: item.left,
              transform: "translate(-50%, -50%)",
            }}
          >
            <item.Icon />
            <span className="whitespace-nowrap text-[13px] font-semibold text-[#1a1a1a]">
              {item.name}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Bottom text */}
      <div className="mx-auto mt-10 max-w-[1280px] px-6 text-center">
        <h3 className="font-display text-[32px] font-medium leading-[1.15] tracking-tight text-white md:text-[48px]">
          Quorum adapts to your workflow,
          <br />
          not the other way around.
        </h3>
      </div>
    </section>
  );
}
