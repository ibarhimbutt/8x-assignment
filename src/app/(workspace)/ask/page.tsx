"use client";

import Link from "next/link";
import { useState } from "react";
import { askAction } from "@/app/actions";
import type { AskResult } from "@/lib/ai";
import { formatClock } from "@/lib/format";

const SUGGESTIONS = [
  "What customers mentioned onboarding problems?",
  "What pricing objections came up this month?",
  "What decisions were made about October 14?",
  "What action items are assigned to Maya?",
];

export default function AskPage() {
  const [result, setResult] = useState<AskResult | null>(null);
  const [pending, setPending] = useState(false);
  const [q, setQ] = useState("");

  async function run(question: string) {
    setQ(question);
    setPending(true);
    const fd = new FormData();
    fd.set("q", question);
    const next = await askAction(fd);
    setResult(next);
    setPending(false);
  }

  return (
    <div className="max-w-2xl">
      <p className="font-mono text-[11px] tracking-[0.16em] text-cyan uppercase">Ask your meetings</p>
      <h1 className="mt-2 font-display text-4xl font-medium tracking-tight">What did we already decide?</h1>
      <p className="mt-2 text-[14px] text-paper-dim">
        If a Gemini key is present, answers go through the model. Otherwise this is deterministic over the seeded corpus — still the questions a buyer would ask.
      </p>
      <form
        className="mt-6"
        onSubmit={(e) => {
          e.preventDefault();
          if (q.trim()) void run(q);
        }}
      >
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Ask about pricing, onboarding, owners…"
          className="w-full rounded-full border border-line bg-ink-2 px-4 py-2.5 text-[14px] outline-none focus:border-cyan/50"
        />
      </form>
      <div className="mt-4 flex flex-wrap gap-2">
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => void run(s)}
            className="rounded-full border border-line px-3 py-1 text-[12px] text-paper-dim hover:text-paper"
          >
            {s}
          </button>
        ))}
      </div>
      {pending && <p className="mt-8 text-[14px] text-paper-dim">Looking through the calls…</p>}
      {result && !pending && (
        <div className="mt-8 rounded-2xl border border-line p-5">
          <p className="font-mono text-[10px] uppercase text-cyan">
            {result.source === "agent-router" ? "Agent Router" : result.source === "gemini" ? "Gemini" : "Seeded corpus"}
          </p>
          <p className="mt-3 text-[15px] leading-relaxed">{result.answer}</p>
          <ul className="mt-5 space-y-2 text-[13px]">
            {result.citations.map((c) => (
              <li key={`${c.meetingId}-${c.t}`}>
                <Link href={`/meetings/${c.meetingId}?t=${Math.floor(c.t)}`} className="text-cyan">
                  {c.title} · {formatClock(c.t)}
                </Link>
                <p className="text-paper-dim">{c.excerpt}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
