import Link from "next/link";
import { meetings } from "@/data/meetings";
import { person } from "@/data/people";
import { formatDuration, formatWhen, platformLabel } from "@/lib/format";
import { AvatarStack } from "@/components/Avatar";

export default function HomePage() {
  return (
    <div>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-[11px] tracking-[0.18em] text-brass uppercase">Demo workspace · no login</p>
          <h1 className="mt-2 font-display text-4xl italic tracking-tight">Calls</h1>
          <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-paper-dim">
            Capture is stubbed. These meetings are seeded on purpose — including a 62-minute, eight-person launch review, because that is the case that actually matters.
          </p>
        </div>
        <Link
          href="/live"
          className="rounded-full bg-brass px-4 py-2 text-[13px] font-medium text-ink hover:bg-brass-2"
        >
          Fake a 2-min recording
        </Link>
      </div>
      <ul className="divide-y divide-line border-y border-line">
        {meetings.map((m) => {
          const people = m.attendeeIds.map(person);
          return (
            <li key={m.id}>
              <Link href={`/meetings/${m.id}`} className="flex flex-col gap-3 py-5 sm:flex-row sm:items-center">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono text-paper-dim">
                    <span>{formatWhen(m.startedAt)}</span>
                    <span>·</span>
                    <span>{formatDuration(m.duration)}</span>
                    <span>·</span>
                    <span>{platformLabel(m.platform)}</span>
                    {m.tag && (
                      <span className="rounded-full border border-line px-2 py-0.5 text-brass-2">{m.tag}</span>
                    )}
                  </div>
                  <h2 className="mt-1 font-display text-[22px] leading-snug italic">{m.title}</h2>
                  <p className="mt-1 line-clamp-2 text-[13px] text-paper-dim">
                    {m.summaries[m.defaultTemplate]?.headline}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  <AvatarStack people={people} />
                  <span className="font-mono text-[12px] text-paper-dim">{people.length}</span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
