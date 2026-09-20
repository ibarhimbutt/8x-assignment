"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { meetings as seed } from "@/data/meetings";
import { person } from "@/data/people";
import { formatDuration, formatWhen, platformLabel } from "@/lib/format";
import { AvatarStack } from "@/components/Avatar";
import { loadCaptured } from "@/lib/local";
import type { Meeting } from "@/data/types";

export function MeetingExplorer({ title = "My meetings" }: { title?: string }) {
  const [q, setQ] = useState("");
  const [tag, setTag] = useState("all");
  const [platform, setPlatform] = useState("all");
  const [extra, setExtra] = useState<Meeting[]>([]);

  useEffect(() => {
    setExtra(loadCaptured());
  }, []);

  const all = useMemo(() => {
    const map = new Map<string, Meeting>();
    for (const m of [...extra, ...seed]) map.set(m.id, m);
    return [...map.values()].sort((a, b) => (a.startedAt < b.startedAt ? 1 : -1));
  }, [extra]);

  const tags = ["all", ...Array.from(new Set(all.map((m) => m.tag).filter(Boolean) as string[]))];

  const shown = all.filter((m) => {
    if (tag !== "all" && m.tag !== tag) return false;
    if (platform !== "all" && m.platform !== platform) return false;
    if (q.trim()) {
      const s = q.toLowerCase();
      const hit =
        m.title.toLowerCase().includes(s) ||
        (m.tag ?? "").toLowerCase().includes(s) ||
        m.attendeeIds.some((id) => person(id).name.toLowerCase().includes(s));
      if (!hit) return false;
    }
    return true;
  });

  return (
    <div>
      <p className="font-mono text-[11px] tracking-[0.16em] text-cyan uppercase">Library</p>
      <h1 className="mt-2 font-display text-4xl font-medium tracking-tight">{title}</h1>
      <div className="mt-5 flex flex-wrap gap-2">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Filter by title or person"
          className="rounded-full border border-line bg-ink-2 px-3 py-1.5 text-[13px] outline-none focus:border-cyan/50"
        />
        <select
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          className="rounded-full border border-line bg-ink-2 px-3 py-1.5 text-[13px]"
        >
          {tags.map((t) => (
            <option key={t} value={t}>
              {t === "all" ? "All types" : t}
            </option>
          ))}
        </select>
        <select
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
          className="rounded-full border border-line bg-ink-2 px-3 py-1.5 text-[13px]"
        >
          <option value="all">All platforms</option>
          <option value="zoom">Zoom</option>
          <option value="meet">Google Meet</option>
          <option value="teams">Teams</option>
        </select>
      </div>
      <ul className="mt-6 divide-y divide-line border-y border-line">
        {shown.map((m) => {
          const people = m.attendeeIds.map(person);
          return (
            <li key={m.id}>
              <Link href={`/meetings/${m.id}`} className="flex flex-col gap-3 py-5 sm:flex-row sm:items-center">
                <div className="min-w-0 flex-1">
                  <p className="font-mono text-[11px] text-paper-dim">
                    {formatWhen(m.startedAt)} · {formatDuration(m.duration)} · {platformLabel(m.platform)}
                    {m.tag && (
                      <span className="ml-2 rounded-full border border-line px-2 py-0.5 text-cyan-2">{m.tag}</span>
                    )}
                    <span className="ml-2">
                      {m.actionItems.length} actions · {m.highlights.length} highlights
                    </span>
                  </p>
                  <h2 className="mt-1 font-display text-[22px] font-medium tracking-tight leading-snug">{m.title}</h2>
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
      {shown.length === 0 && (
        <p className="mt-8 text-[14px] text-paper-dim">
          No meetings match. Connect a calendar or run a fake capture.
        </p>
      )}
    </div>
  );
}
