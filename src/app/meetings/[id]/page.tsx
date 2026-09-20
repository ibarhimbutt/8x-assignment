import Link from "next/link";
import { notFound } from "next/navigation";
import { getMeeting, meetings } from "@/data/meetings";
import { person } from "@/data/people";
import { formatDuration, formatWhen, platformLabel } from "@/lib/format";
import { AvatarStack } from "@/components/Avatar";
import { MeetingView } from "@/components/MeetingView";

export function generateStaticParams() {
  return meetings.map((m) => ({ id: m.id }));
}

export default async function MeetingPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ t?: string | string[] }>;
}) {
  const { id } = await params;
  const sp = await searchParams;
  const meeting = getMeeting(id);
  if (!meeting) notFound();
  const people = meeting.attendeeIds.map(person);
  const initialTime = Number(Array.isArray(sp.t) ? sp.t[0] : sp.t) || 0;

  return (
    <div>
      <Link href="/" className="font-mono text-[11px] text-paper-dim hover:text-paper">
        ← Calls
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
