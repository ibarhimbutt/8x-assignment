import Link from "next/link";
import { notFound } from "next/navigation";
import { getMeeting, meetings } from "@/data/meetings";
import { person } from "@/data/people";
import { formatClock } from "@/lib/format";
import { LocalClip } from "@/components/LocalClip";

export function generateStaticParams() {
  return meetings.flatMap((m) =>
    m.highlights.map((h) => ({ meetingId: m.id, highlightId: h.id })),
  );
}

export default async function ClipPage({
  params,
}: {
  params: Promise<{ meetingId: string; highlightId: string }>;
}) {
  const { meetingId, highlightId } = await params;
  const meeting = getMeeting(meetingId);
  if (!meeting) notFound();
  const highlight = meeting.highlights.find((h) => h.id === highlightId);
  if (!highlight) {
    return <LocalClip meetingId={meetingId} highlightId={highlightId} />;
  }

  const utterance = meeting.utterances.find((u) => u.id === highlight.utteranceId);
  const speaker = utterance ? person(utterance.speakerId) : null;
  const i = utterance ? meeting.utterances.findIndex((u) => u.id === utterance.id) : -1;
  const around = i >= 0 ? meeting.utterances.slice(Math.max(0, i - 1), i + 2) : [];

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
        href={`/meetings/${meeting.id}?t=${Math.floor(highlight.start)}`}
        className="mt-10 inline-flex rounded-full bg-cyan px-4 py-2 text-[13px] font-medium text-ink"
      >
        Watch the full meeting
      </Link>
    </div>
  );
}
