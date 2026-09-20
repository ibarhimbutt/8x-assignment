import Link from "next/link";
import { notFound } from "next/navigation";
import { getMeeting } from "@/data/meetings";
import { person } from "@/data/people";
import { formatClock } from "@/lib/format";
import { decodeClip } from "@/lib/share";

export default async function ShareTokenPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const clip = decodeClip(decodeURIComponent(token));
  if (!clip) notFound();
  const meeting = getMeeting(clip.meetingId);
  if (!meeting) notFound();
  const highlight = clip.highlightId
    ? meeting.highlights.find((h) => h.id === clip.highlightId)
    : undefined;
  const utterance =
    meeting.utterances.find((u) => u.id === highlight?.utteranceId) ??
    meeting.utterances.find((u) => u.start <= clip.start && u.end >= clip.start) ??
    meeting.utterances.find((u) => Math.abs(u.start - clip.start) < 20);
  const speaker = utterance ? person(utterance.speakerId) : null;
  const i = utterance ? meeting.utterances.findIndex((u) => u.id === utterance.id) : -1;
  const around = i >= 0 ? meeting.utterances.slice(Math.max(0, i - 1), i + 2) : [];

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <p className="font-mono text-[11px] tracking-[0.18em] text-cyan uppercase">
        Quorum clip · no account needed
      </p>
      <h1 className="mt-4 font-display text-4xl font-medium tracking-tight leading-tight">{clip.title}</h1>
      <p className="mt-2 font-mono text-[12px] text-paper-dim">
        {meeting.title} · {formatClock(clip.start)}–{formatClock(clip.end)} · shared from the workspace
      </p>
      {utterance && (
        <blockquote className="mt-10 border-l-2 border-cyan pl-5 font-display text-[26px] leading-snug italic">
          “{utterance.text}”
          {speaker && (
            <footer className="mt-3 font-sans text-[14px] not-italic text-paper-dim">— {speaker.name}</footer>
          )}
        </blockquote>
      )}
      <ol className="mt-10 space-y-3 text-[14px] text-paper-dim">
        {around.map((row) => (
          <li key={row.id} className={row.id === utterance?.id ? "text-paper" : ""}>
            <span className="font-mono text-[11px] text-cyan">{formatClock(row.start)} </span>
            <span className="text-paper-dim">{person(row.speakerId).name}: </span>
            {row.text}
          </li>
        ))}
      </ol>
      <Link
        href={`/meetings/${meeting.id}?t=${Math.floor(clip.start)}`}
        className="mt-10 inline-flex rounded-full bg-cyan px-4 py-2 text-[13px] font-medium text-ink"
      >
        Watch the full meeting
      </Link>
    </div>
  );
}
