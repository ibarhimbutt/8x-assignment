"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { upcoming } from "@/data/meetings";
import { person } from "@/data/people";
import { formatDuration, formatWhen, platformLabel } from "@/lib/format";
import { AvatarStack } from "@/components/Avatar";
import type { CalendarEvent } from "@/data/types";

type Status = { connected: boolean; configured?: boolean; email?: string; error?: string };

export default function CalendarPage() {
  const [status, setStatus] = useState<Status | null>(null);
  const [events, setEvents] = useState<CalendarEvent[] | null>(null);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("google");
    if (q === "not_configured") {
      setErr("Google Calendar OAuth is not configured. Add GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET, then reconnect.");
    }
    if (q === "denied") setErr("Google authorization was cancelled.");
    if (q === "error") setErr("Google authorization failed. Try again.");
    void (async () => {
      try {
        const s = (await fetch("/api/google/status").then((r) => r.json())) as Status;
        setStatus(s);
        if (s.connected) {
          const ev = (await fetch("/api/google/events").then((r) => r.json())) as {
            events?: CalendarEvent[];
            error?: string;
          };
          setEvents(ev.events ?? []);
          if (ev.error) setErr(ev.error);
        } else {
          setEvents(
            upcoming.map((e) => ({
              id: e.id,
              title: e.title,
              startsAt: e.startsAt,
              duration: e.duration,
              platform: e.platform,
              meetingUrl: e.meetingUrl,
              attendees: e.attendeeIds.map((id) => ({ email: `${id}@quorum.demo`, name: person(id).name })),
              status: e.status ?? (e.capture ? "ready" : "scheduled"),
              source: "demo" as const,
            })),
          );
        }
      } catch {
        setErr("Could not reach the calendar service.");
        setEvents(
          upcoming.map((e) => ({
            id: e.id,
            title: e.title,
            startsAt: e.startsAt,
            duration: e.duration,
            platform: e.platform,
            meetingUrl: e.meetingUrl,
            attendees: e.attendeeIds.map((id) => ({ email: `${id}@quorum.demo`, name: person(id).name })),
            status: e.status ?? (e.capture ? "ready" : "scheduled"),
            source: "demo" as const,
          })),
        );
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const connected = Boolean(status?.connected);

  return (
    <div>
      <p className="text-[11px] font-semibold tracking-[0.16em] text-cyan uppercase">Calendar</p>
      <h1 className="mt-2 font-display text-4xl font-medium tracking-tight">Upcoming</h1>
      <p className="mt-2 max-w-xl text-[14px] leading-relaxed text-paper-dim">
        {connected
          ? `Connected to Google Calendar${status?.email ? ` as ${status.email}` : ""}. Google Meet links are detected automatically.`
          : status?.configured === false
            ? "Google OAuth keys are not set on this deployment. Sample events below are labeled Demo — not a fake connection."
            : "Connect Google Calendar to pull real upcoming events and Meet links."}
      </p>
      {err && <p className="mt-3 text-[13px] text-ember">{err}</p>}

      <div className="mt-6 flex flex-wrap gap-3">
        {connected ? (
          <span className="rounded-full border border-moss/40 bg-moss/10 px-4 py-2 text-[13px] text-moss">
            Google Calendar · Connected
          </span>
        ) : (
          <a href="/api/google/connect?next=/calendar" className="cta px-4 py-2 text-[13px]">
            Connect Google Calendar
          </a>
        )}
        {connected && (
          <button
            type="button"
            className="rounded-full border border-line px-4 py-2 text-[13px]"
            onClick={async () => {
              await fetch("/api/google/status", { method: "DELETE" });
              window.location.reload();
            }}
          >
            Disconnect
          </button>
        )}
      </div>

      <ul className="mt-8 divide-y divide-line border-y border-line">
        {loading && <li className="py-5 text-[14px] text-paper-dim">Loading calendar…</li>}
        {(events ?? []).map((event) => (
          <li key={event.id} className="flex flex-wrap items-center gap-4 py-5">
            <div className="min-w-0 flex-1">
              <p className="font-mono text-[11px] text-paper-dim">
                {formatWhen(event.startsAt)} · {formatDuration(event.duration)} ·{" "}
                {event.platform === "none" ? "No conference link" : platformLabel(event.platform)}
                {event.source === "demo" ? " · Demo" : ""}
              </p>
              <h2 className="mt-1 font-display text-2xl font-medium tracking-tight">{event.title}</h2>
              <p className="mt-1 text-[12px] capitalize text-cyan">{event.status}</p>
              {event.attendees.length > 0 && (
                <div className="mt-2">
                  <AvatarStack
                    people={event.attendees.map((a, i) => ({
                      id: a.email,
                      name: a.name || a.email,
                      role: a.email,
                      initials: (a.name || a.email).slice(0, 2).toUpperCase(),
                      hue: (i * 40) % 360,
                    }))}
                  />
                </div>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {event.meetingUrl && (
                <a
                  href={event.meetingUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-line px-3 py-1.5 text-[13px]"
                >
                  Open meeting
                </a>
              )}
              <Link
                href={`/live/${encodeURIComponent(event.id)}?title=${encodeURIComponent(event.title)}${
                  event.meetingUrl ? `&url=${encodeURIComponent(event.meetingUrl)}` : ""
                }`}
                className="cta px-3 py-1.5 text-[13px]"
              >
                Start live notes
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
