import Link from "next/link";
import { searchMeetings } from "@/lib/search";
import { formatClock, formatWhen } from "@/lib/format";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string | string[] }>;
}) {
  const sp = await searchParams;
  const q = typeof sp.q === "string" ? sp.q : "";
  const hits = searchMeetings(q);

  return (
    <div>
      <p className="font-mono text-[11px] tracking-[0.18em] text-brass uppercase">Search</p>
      <h1 className="mt-2 font-display text-4xl italic">
        {q ? `“${q}”` : "Find a moment"}
      </h1>
      <p className="mt-2 text-[14px] text-paper-dim">
        {q ? `${hits.length} hits across seeded calls.` : "Try waitlist, Latticework, empty state, October 14."}
      </p>
      <ul className="mt-8 divide-y divide-line border-y border-line">
        {hits.map((hit, i) => (
          <li key={`${hit.meeting.id}-${hit.utterance.id}-${i}`}>
            <Link
              href={`/meetings/${hit.meeting.id}?t=${Math.floor(hit.utterance.start)}`}
              className="block py-4"
            >
              <p className="font-mono text-[11px] text-paper-dim">
                {hit.meeting.title} · {formatWhen(hit.meeting.startedAt)} · {formatClock(hit.utterance.start)} · {hit.speakerName}
              </p>
              <p className="mt-1 text-[15px] leading-relaxed">{hit.snippet}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
