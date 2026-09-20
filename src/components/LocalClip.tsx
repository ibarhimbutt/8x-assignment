"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getMeeting } from "@/data/meetings";
import { person } from "@/data/people";
import type { Highlight } from "@/data/types";
import { formatClock } from "@/lib/format";
import { loadLocalHighlights } from "@/lib/highlights";

export function LocalClip({
  meetingId,
  highlightId,
}: {
  meetingId: string;
  highlightId: string;
}) {
  const meeting = getMeeting(meetingId);
  const [highlight, setHighlight] = useState<Highlight | null | undefined>(undefined);

  useEffect(() => {
    setHighlight(loadLocalHighlights(meetingId).find((h) => h.id === highlightId) ?? null);
  }, [meetingId, highlightId]);

  if (!meeting || highlight === null) {
    return (
      <div className="mx-auto max-w-xl px-6 py-20">
        <p className="font-display text-3xl font-medium tracking-tight">This clip isn’t here.</p>
        <Link href="/" className="mt-4 inline-block text-cyan">
          Open Quorum
        </Link>
      </div>
    );
  }

  if (highlight === undefined) {
    return <div className="mx-auto max-w-xl px-6 py-20 text-paper-dim">Loading clip…</div>;
  }

  const utterance = meeting.utterances.find((u) => u.id === highlight.utteranceId);
  const speaker = utterance ? person(utterance.speakerId) : null;

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <p className="font-mono text-[11px] tracking-[0.18em] text-cyan uppercase">
        Quorum clip · no account needed
      </p>
      <h1 className="mt-4 font-display text-4xl font-medium tracking-tight leading-tight">{highlight.title}</h1>
      <p className="mt-2 font-mono text-[12px] text-paper-dim">
        {meeting.title} · {formatClock(highlight.start)} · {highlight.type}
      </p>
      {utterance && (
        <blockquote className="mt-10 border-l-2 border-cyan pl-5 font-display text-[26px] leading-snug italic">
          “{utterance.text}”
          {speaker && (
            <footer className="mt-3 font-sans text-[14px] not-italic text-paper-dim">— {speaker.name}</footer>
          )}
        </blockquote>
      )}
      <Link
        href={`/meetings/${meeting.id}?t=${Math.floor(highlight.start)}`}
        className="mt-10 inline-flex rounded-full bg-cyan px-4 py-2 text-[13px] font-medium text-ink"
      >
        Watch the full meeting
      </Link>
    </div>
  );
}
