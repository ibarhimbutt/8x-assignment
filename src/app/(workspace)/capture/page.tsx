"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { addCaptured } from "@/lib/local";
import { talk } from "@/data/talk";
import type { Meeting } from "@/data/types";
import { formatClock } from "@/lib/format";

const STEPS = [
  "Preparing meeting…",
  "Recording…",
  "Transcribing…",
  "Generating summary…",
  "Complete.",
];

function buildMeeting(): Meeting {
  const id = `cap-${Date.now()}`;
  return {
    id,
    title: "Maya / Jordan — capture demo",
    startedAt: new Date().toISOString(),
    duration: 128,
    platform: "zoom",
    attendeeIds: ["maya", "jordan"],
    defaultTemplate: "oneonone",
    tag: "Internal",
    utterances: talk("cap", [
      { s: "maya", t: 3, text: "This is the fake capture. Are we still saying the bot is stubbed?" },
      { s: "jordan", t: 18, text: "First thirty seconds of the walkthrough. This flow is the same shape a real recording would take." },
      { s: "maya", t: 52, text: "Good. Drop us into the finished meeting when you're done pretending." },
      { s: "jordan", t: 84, text: "Notes will be in Quorum in about twenty seconds, which is the idea." },
    ]),
    summaries: {
      oneonone: {
        template: "oneonone",
        headline: "Demo capture finished. Bot remains stubbed. Meeting intelligence is the product.",
        sections: [{ title: "Notes", bullets: ["Simulated pipeline: prepare → record → transcribe → summarize.", "No Zoom SDK in the diff."] }],
      },
    },
    actionItems: [
      { id: `${id}-a1`, text: "Keep capture stubbed in the walkthrough.", ownerId: "jordan", due: "Today" },
    ],
    highlights: [
      { id: `${id}-h1`, type: "decision", title: "Same shape as a real recording", start: 18, end: 50, utteranceId: "cap-2" },
    ],
  };
}

export default function CapturePage() {
  const router = useRouter();
  const [step, setStep] = useState(-1);
  const [t, setT] = useState(0);

  function start() {
    setStep(0);
    setT(0);
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setT(i);
      if (i === 6) setStep(1);
      if (i === 14) setStep(2);
      if (i === 20) setStep(3);
      if (i >= 26) {
        window.clearInterval(id);
        setStep(4);
        const meeting = buildMeeting();
        addCaptured(meeting);
        window.setTimeout(() => router.push(`/meetings/${meeting.id}`), 700);
      }
    }, 180);
  }

  return (
    <div className="max-w-xl">
      <p className="font-mono text-[11px] tracking-[0.16em] text-brass uppercase">Fake capture</p>
      <h1 className="mt-2 font-display text-4xl italic">Start capture</h1>
      <p className="mt-3 text-[14px] leading-relaxed text-paper-dim">
        Demo capture mode — recording infrastructure is simulated for this prototype. Press start and we walk prepare → record → transcribe → summary, then drop you into a finished meeting.
      </p>
      <div className="mt-8 rounded-2xl border border-line p-5">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[13px]">{formatClock(t)} </span>
          {step < 0 ? (
            <button type="button" onClick={start} className="rounded-full bg-ember px-4 py-2 text-[13px] text-paper">
              Start fake recording
            </button>
          ) : (
            <span className="text-[13px] text-ember">{STEPS[Math.min(step, STEPS.length - 1)]}</span>
          )}
        </div>
        <ol className="mt-6 space-y-2 text-[13px] text-paper-dim">
          {STEPS.map((s, i) => (
            <li key={s} className={i <= step ? "text-paper" : ""}>
              {i <= step ? "●" : "○"} {s}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
