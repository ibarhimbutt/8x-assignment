"use client";

import { useState } from "react";
import { upcoming } from "@/data/meetings";
import { person } from "@/data/people";
import { formatDuration, formatWhen, platformLabel } from "@/lib/format";
import { AvatarStack } from "@/components/Avatar";
import { loadCalendar, saveCalendar, type CalendarState } from "@/lib/local";
import { useEffect } from "react";

export default function CalendarPage() {
  const [cal, setCal] = useState<CalendarState>({ google: false, microsoft: false });
  const [busy, setBusy] = useState<string | null>(null);
  const [on, setOn] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(upcoming.map((u) => [u.id, u.capture])),
  );

  useEffect(() => setCal(loadCalendar()), []);

  function connect(which: "google" | "microsoft") {
    setBusy(which);
    window.setTimeout(() => {
      const next = { ...loadCalendar(), [which]: true };
      saveCalendar(next);
      setCal(next);
      setBusy(null);
    }, 900);
  }

  return (
    <div>
      <p className="font-mono text-[11px] tracking-[0.16em] text-brass uppercase">Calendar · simulated OAuth</p>
      <h1 className="mt-2 font-display text-4xl italic">Upcoming</h1>
      <p className="mt-2 max-w-xl text-[14px] leading-relaxed text-paper-dim">
        No Google or Outlook tokens in this build. Connect is a convincing stub — the same shape real OAuth would fill. Quorum does not join Zoom.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <ConnectBtn
          label="Google Calendar"
          on={cal.google}
          busy={busy === "google"}
          onClick={() => connect("google")}
        />
        <ConnectBtn
          label="Microsoft Calendar"
          on={cal.microsoft}
          busy={busy === "microsoft"}
          onClick={() => connect("microsoft")}
        />
      </div>
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

function ConnectBtn({
  label,
  on,
  busy,
  onClick,
}: {
  label: string;
  on: boolean;
  busy: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={on || busy}
      className="rounded-full border border-line px-4 py-2 text-[13px] disabled:opacity-70"
    >
      {on ? `${label} connected` : busy ? "Connecting…" : `Connect ${label}`}
    </button>
  );
}
