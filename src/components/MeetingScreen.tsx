"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getMeeting } from "@/data/meetings";
import { person } from "@/data/people";
import type { Meeting } from "@/data/types";
import { formatDuration, formatWhen, platformLabel } from "@/lib/format";
import { AvatarStack } from "@/components/Avatar";
import { MeetingView } from "@/components/MeetingView";
import { loadCaptured } from "@/lib/local";

export function MeetingScreen({ id, initialTime }: { id: string; initialTime: number }) {
  const seeded = getMeeting(id);
  const [meeting, setMeeting] = useState<Meeting | undefined>(seeded);

  useEffect(() => {
    if (seeded) return;
    setMeeting(loadCaptured().find((m) => m.id === id));
  }, [id, seeded]);

  if (!meeting) {
    return (
      <div>
        <p className="font-display text-3xl italic">This meeting isn’t here.</p>
        <Link href="/meetings" className="mt-4 inline-block text-brass">
          Back to meetings
        </Link>
      </div>
    );
  }

  const people = meeting.attendeeIds.map(person);
  return (
    <div>
      <Link href="/meetings" className="font-mono text-[11px] text-paper-dim hover:text-paper">
        ← Meetings
      </Link>
      <div className="mt-3 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="font-mono text-[11px] text-paper-dim">
            {formatWhen(meeting.startedAt)} · {formatDuration(meeting.duration)} · {platformLabel(meeting.platform)} ·{" "}
            {people.length} people
          </p>
          <h1 className="mt-1 font-display text-4xl italic leading-tight tracking-tight">{meeting.title}</h1>
        </div>
        <AvatarStack people={people} max={8} />
      </div>
      <div className="mt-6">
        <MeetingView meeting={meeting} initialTime={initialTime} />
      </div>
    </div>
  );
}
