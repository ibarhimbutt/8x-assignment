"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { formatClock } from "@/lib/format";

const LINES = [
  { t: 3, who: "Maya", text: "Just two minutes. Are we still saying the bot is stubbed in the walkthrough?" },
  { t: 18, who: "Jordan", text: "First thirty seconds. If I bury it, it looks like we failed to build it." },
  { t: 42, who: "Maya", text: "Good. I'll highlight that line after we hang up." },
  { t: 64, who: "Jordan", text: "Do it. Home, search, clip, incognito." },
  { t: 88, who: "Maya", text: "That's the call." },
];

export default function LivePage() {
  const router = useRouter();
  const [t, setT] = useState(0);
  const [live, setLive] = useState(false);

  useEffect(() => {
    if (!live) return;
    const id = setInterval(() => {
      setT((x) => {
        if (x >= 118) {
          clearInterval(id);
          router.push("/meetings/self-call");
          return 118;
        }
        return x + 1;
      });
    }, 80);
    return () => clearInterval(id);
  }, [live, router]);

  const shown = LINES.filter((l) => l.t <= t);

  return (
    <div className="mx-auto max-w-2xl">
      <p className="font-mono text-[11px] tracking-[0.18em] text-brass uppercase">Fake capture</p>
      <h1 className="mt-2 font-display text-4xl italic">A two-minute call with yourself</h1>
      <p className="mt-3 text-[14px] leading-relaxed text-paper-dim">
        There is no Zoom bot. Press start and we play a sped-up 1:1, then drop you into the finished meeting — the same path a real recording would take.
      </p>
      <div className="mt-8 rounded-2xl border border-line p-5">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[13px]">{formatClock(t)} / 2:00</span>
          {!live ? (
            <button
              type="button"
              onClick={() => setLive(true)}
              className="rounded-full bg-ember px-4 py-2 text-[13px] text-paper"
            >
              Start fake recording
            </button>
          ) : (
            <span className="text-[13px] text-ember">Recording…</span>
          )}
        </div>
        <ul className="mt-6 space-y-3">
          {shown.map((l) => (
            <li key={l.t}>
              <span className="font-mono text-[11px] text-brass">{formatClock(l.t)} </span>
              <span className="text-paper-dim">{l.who}: </span>
              {l.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
