"use client";

import { useState } from "react";
import { upcoming } from "@/data/meetings";
import { person } from "@/data/people";
import { formatDuration, formatWhen, platformLabel } from "@/lib/format";
import { AvatarStack } from "@/components/Avatar";

export default function CalendarPage() {
  const [on, setOn] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(upcoming.map((u) => [u.id, u.capture])),
  );

  return (
    <div>
      <p className="font-mono text-[11px] tracking-[0.18em] text-brass uppercase">Calendar · stub</p>
      <h1 className="mt-2 font-display text-4xl italic">Upcoming</h1>
      <p className="mt-2 max-w-xl text-[14px] leading-relaxed text-paper-dim">
        No Google or Outlook OAuth. This is a fixture. Toggle capture the way a connected calendar would — Quorum does not actually join Zoom.
      </p>
      <ul className="mt-8 divide-y divide-line border-y border-line">
        {upcoming.map((event) => {
          const people = event.attendeeIds.map(person);
          return (
            <li key={event.id} className="flex flex-wrap items-center gap-4 py-5">
              <div className="min-w-0 flex-1">
                <p className="font-mono text-[11px] text-paper-dim">
                  {formatWhen(event.startsAt)} · {formatDuration(event.duration)} · {platformLabel(event.platform)}
                </p>
                <h2 className="mt-1 font-display text-2xl italic">{event.title}</h2>
                <div className="mt-2">
                  <AvatarStack people={people} />
                </div>
              </div>
              <label className="flex items-center gap-2 text-[13px] text-paper-dim">
                <input
                  type="checkbox"
                  checked={!!on[event.id]}
                  onChange={() => setOn((s) => ({ ...s, [event.id]: !s[event.id] }))}
                />
                Quorum will “join”
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
