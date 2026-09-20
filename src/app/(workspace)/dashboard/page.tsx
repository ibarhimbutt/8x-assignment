import Link from "next/link";
import { getSession } from "@/lib/auth";
import { meetings, upcoming } from "@/data/meetings";
import { person } from "@/data/people";
import { formatDuration, formatWhen } from "@/lib/format";
import { AvatarStack } from "@/components/Avatar";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) redirect("/login");
  const first = session.name.split(" ")[0];
  const hour = new Date().getUTCHours();
  const hello = hour < 16 ? "Good morning" : hour < 21 ? "Good afternoon" : "Good evening";
  const openActions = meetings.reduce((n, m) => n + m.actionItems.length, 0);
  const highlights = meetings.reduce((n, m) => n + m.highlights.length, 0);
  const hours = Math.round(meetings.reduce((n, m) => n + m.duration, 0) / 3600);
  const recent = meetings.slice(0, 4);

  return (
    <div>
      <p className="text-[11px] font-semibold tracking-[0.16em] text-cyan uppercase">Home</p>
      <h1 className="mt-2 font-display text-4xl font-medium tracking-tight">
        {hello}, {first}
      </h1>
      <p className="mt-2 max-w-xl text-[14px] text-paper-dim">
        {meetings.length} meetings · {hours}h captured · {openActions} action items · {highlights} highlights
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link href="/capture" className="cta px-4 py-2 text-[13px]">
          Start live notes
        </Link>
        <Link href="/calendar" className="rounded-full border border-line px-4 py-2 text-[13px]">
          Calendar status
        </Link>
      </div>

      <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-[14px]">
        <Stat k="Meetings" v={String(meetings.length)} />
        <Stat k="Captured" v={`${hours}h`} />
        <Stat k="Action items" v={String(openActions)} href="/action-items" />
        <Stat k="Highlights" v={String(highlights)} href="/highlights" />
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <section>
          <h2 className="text-[11px] font-semibold tracking-[0.16em] text-cyan uppercase">Upcoming meetings</h2>
          <ul className="mt-3 divide-y divide-line border-y border-line">
            {upcoming.map((e) => (
              <li key={e.id} className="py-4">
                <p className="font-mono text-[11px] text-paper-dim">
                  {formatWhen(e.startsAt)} · {formatDuration(e.duration)}
                </p>
                <p className="mt-1 font-display text-[20px] font-medium tracking-tight">{e.title}</p>
                <div className="mt-2 flex flex-wrap items-center gap-3">
                  <AvatarStack people={e.attendeeIds.map(person)} />
                  <Link
                    href={`/live/${e.id}?title=${encodeURIComponent(e.title)}${e.meetingUrl ? `&url=${encodeURIComponent(e.meetingUrl)}` : ""}`}
                    className="text-[13px] text-cyan"
                  >
                    Start live notes
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h2 className="text-[11px] font-semibold tracking-[0.16em] text-cyan uppercase">Recent meetings</h2>
          <ul className="mt-3 divide-y divide-line border-y border-line">
            {recent.map((m) => (
              <li key={m.id}>
                <Link href={`/meetings/${m.id}`} className="block py-4">
                  <p className="font-mono text-[11px] text-paper-dim">
                    {formatWhen(m.startedAt)} · {formatDuration(m.duration)}
                  </p>
                  <p className="mt-1 font-display text-[20px] font-medium tracking-tight">{m.title}</p>
                  <p className="mt-1 line-clamp-2 text-[13px] text-paper-dim">
                    {m.summaries[m.defaultTemplate]?.headline}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/meetings" className="mt-3 inline-block text-[13px] text-cyan">
            All meetings
          </Link>
        </section>
      </div>
    </div>
  );
}

function Stat({ k, v, href }: { k: string; v: string; href?: string }) {
  const inner = (
    <>
      <p className="font-display text-2xl font-semibold tracking-tight">{v}</p>
      <p className="text-[12px] text-paper-dim">{k}</p>
    </>
  );
  return href ? (
    <Link href={href} className="min-w-[88px]">
      {inner}
    </Link>
  ) : (
    <div className="min-w-[88px]">{inner}</div>
  );
}
