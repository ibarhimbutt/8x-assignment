import Link from "next/link";
import { meetings } from "@/data/meetings";
import { formatClock } from "@/lib/format";
import { encodeClip } from "@/lib/share";

export default function SharedPage() {
  const clips = meetings.flatMap((m) =>
    m.highlights.slice(0, 2).map((h) => ({
      ...h,
      meetingId: m.id,
      meetingTitle: m.title,
      token: encodeClip({
        meetingId: m.id,
        highlightId: h.id,
        start: h.start,
        end: h.end,
        title: h.title,
      }),
    })),
  );

  return (
    <div>
      <p className="font-mono text-[11px] tracking-[0.16em] text-brass uppercase">Inbox</p>
      <h1 className="mt-2 font-display text-4xl italic">Shared with me</h1>
      <p className="mt-2 max-w-xl text-[14px] text-paper-dim">
        Clips anyone can open without an account. These are the moments this workspace would have been sent.
      </p>
      <ul className="mt-8 divide-y divide-line border-y border-line">
        {clips.map((c) => (
          <li key={c.token} className="py-4">
            <p className="font-mono text-[11px] text-paper-dim">
              {c.type} · {c.meetingTitle} · {formatClock(c.start)}
            </p>
            <h2 className="mt-1 font-display text-[20px] italic">{c.title}</h2>
            <div className="mt-2 flex gap-4 text-[13px]">
              <Link href={`/share/${c.token}`} className="text-brass">
                Open public clip
              </Link>
              <Link href={`/meetings/${c.meetingId}?t=${Math.floor(c.start)}`} className="text-paper-dim">
                Full meeting
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
