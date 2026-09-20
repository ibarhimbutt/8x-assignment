import Link from "next/link";
import { meetings } from "@/data/meetings";
import { formatClock } from "@/lib/format";

export default function HighlightsPage() {
  const rows = meetings.flatMap((m) =>
    m.highlights.map((h) => ({ ...h, meetingId: m.id, meetingTitle: m.title })),
  );

  return (
    <div>
      <p className="font-mono text-[11px] tracking-[0.16em] text-cyan uppercase">Moments</p>
      <h1 className="mt-2 font-display text-4xl font-medium tracking-tight">Highlights</h1>
      <p className="mt-2 text-[14px] text-paper-dim">{rows.length} seeded moments. Add more from a transcript line.</p>
      <ul className="mt-8 grid gap-3 sm:grid-cols-2">
        {rows.map((h) => (
          <li key={`${h.meetingId}-${h.id}`} className="rounded-2xl border border-line p-4">
            <p className="font-mono text-[10px] uppercase text-cyan">{h.type}</p>
            <h2 className="mt-1 font-display text-[22px] font-medium tracking-tight">{h.title}</h2>
            <p className="mt-2 font-mono text-[11px] text-paper-dim">
              {h.meetingTitle} · {formatClock(h.start)}
            </p>
            <Link
              href={`/meetings/${h.meetingId}?t=${Math.floor(h.start)}`}
              className="mt-3 inline-block text-[13px] text-cyan"
            >
              Jump to moment
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
