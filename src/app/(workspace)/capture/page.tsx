"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CapturePage() {
  const router = useRouter();
  const [title, setTitle] = useState("Live Google Meet");
  const [url, setUrl] = useState("");

  function go() {
    const id = `live-${Date.now()}`;
    const q = new URLSearchParams({ title: title.trim() || "Live meeting" });
    if (url.trim()) q.set("url", url.trim());
    router.push(`/live/${id}?${q.toString()}`);
  }

  return (
    <div className="max-w-xl">
      <p className="text-[11px] font-semibold tracking-[0.16em] text-cyan uppercase">Capture</p>
      <h1 className="mt-2 font-display text-4xl font-medium tracking-tight">Start live notes</h1>
      <p className="mt-3 text-[14px] leading-relaxed text-paper-dim">
        Open Google Meet in another tab, then start notes here. Your browser will ask to share that tab — enable{" "}
        <strong className="text-paper">Share tab audio</strong>. There is no silent bot.
      </p>
      <div className="mt-8 space-y-3 rounded-2xl border border-line bg-card p-5">
        <label className="block text-[13px]">
          Meeting title
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 w-full rounded-xl border border-line bg-elevated px-3 py-2 outline-none focus:border-cyan/50"
          />
        </label>
        <label className="block text-[13px]">
          Google Meet URL (optional)
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://meet.google.com/…"
            className="mt-1 w-full rounded-xl border border-line bg-elevated px-3 py-2 outline-none focus:border-cyan/50"
          />
        </label>
        <button type="button" onClick={go} className="cta mt-2 w-full py-2.5 text-[14px]">
          Start live notes
        </button>
      </div>
    </div>
  );
}
