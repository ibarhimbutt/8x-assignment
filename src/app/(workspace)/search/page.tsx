"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useMemo, useState } from "react";
import { meetings } from "@/data/meetings";
import { person } from "@/data/people";
import { formatClock, formatWhen } from "@/lib/format";

type Hit = {
  kind: string;
  meetingId: string;
  meetingTitle: string;
  t: number;
  who: string;
  snippet: string;
};

function snippetAround(text: string, q: string): string {
  const i = text.toLowerCase().indexOf(q);
  if (i < 0) return text.slice(0, 140);
  const start = Math.max(0, i - 42);
  const end = Math.min(text.length, i + q.length + 72);
  return `${start > 0 ? "…" : ""}${text.slice(start, end)}${end < text.length ? "…" : ""}`;
}

function searchAll(query: string): Hit[] {
  const q = query.trim().toLowerCase();
  if (q.length < 2) return [];
  const hits: Hit[] = [];
  for (const m of meetings) {
    if (m.title.toLowerCase().includes(q) || (m.tag ?? "").toLowerCase().includes(q)) {
      hits.push({
        kind: "meeting",
        meetingId: m.id,
        meetingTitle: m.title,
        t: 0,
        who: m.attendeeIds.map((id) => person(id).name).join(", "),
        snippet: m.summaries[m.defaultTemplate]?.headline ?? m.title,
      });
    }
    for (const id of m.attendeeIds) {
      if (person(id).name.toLowerCase().includes(q)) {
        hits.push({
          kind: "person",
          meetingId: m.id,
          meetingTitle: m.title,
          t: 0,
          who: person(id).name,
          snippet: `Attended ${m.title}`,
        });
        break;
      }
    }
    for (const u of m.utterances) {
      if (!u.text.toLowerCase().includes(q)) continue;
      hits.push({
        kind: "transcript",
        meetingId: m.id,
        meetingTitle: m.title,
        t: u.start,
        who: person(u.speakerId).name,
        snippet: snippetAround(u.text, q),
      });
    }
    for (const a of m.actionItems) {
      if (a.text.toLowerCase().includes(q) || person(a.ownerId).name.toLowerCase().includes(q)) {
        hits.push({
          kind: "action",
          meetingId: m.id,
          meetingTitle: m.title,
          t: 0,
          who: person(a.ownerId).name,
          snippet: a.text,
        });
      }
    }
    for (const h of m.highlights) {
      if (h.title.toLowerCase().includes(q)) {
        hits.push({
          kind: "highlight",
          meetingId: m.id,
          meetingTitle: m.title,
          t: h.start,
          who: h.type,
          snippet: h.title,
        });
      }
    }
  }
  return hits.slice(0, 50);
}

function SearchInner() {
  const sp = useSearchParams();
  const initial = sp.get("q") ?? "";
  const [q, setQ] = useState(initial);
  const hits = useMemo(() => searchAll(q), [q]);

  return (
    <div>
      <p className="font-mono text-[11px] tracking-[0.16em] text-brass uppercase">Search</p>
      <h1 className="mt-2 font-display text-4xl italic">{q ? `“${q}”` : "Find a moment"}</h1>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="pricing, Latticework, Maya, empty state"
        className="mt-5 w-full max-w-xl rounded-full border border-line bg-ink-2 px-4 py-2 text-[14px] outline-none focus:border-brass/50"
      />
      <p className="mt-3 text-[14px] text-paper-dim">
        {q ? `${hits.length} hits across meetings, transcript, people, actions, highlights.` : "Try pricing, waitlist, or October 14."}
      </p>
      <ul className="mt-8 divide-y divide-line border-y border-line">
        {hits.map((hit, i) => (
          <li key={`${hit.kind}-${hit.meetingId}-${hit.t}-${i}`}>
            <Link href={`/meetings/${hit.meetingId}?t=${Math.floor(hit.t)}`} className="block py-4">
              <p className="font-mono text-[11px] text-paper-dim">
                {hit.kind} · {hit.meetingTitle} · {formatWhen(meetings.find((m) => m.id === hit.meetingId)?.startedAt ?? "")}{" "}
                · {formatClock(hit.t)} · {hit.who}
              </p>
              <p className="mt-1 text-[15px] leading-relaxed">{hit.snippet}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense>
      <SearchInner />
    </Suspense>
  );
}
