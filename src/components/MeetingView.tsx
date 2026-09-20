"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Highlight, HighlightType, Meeting, SummaryTemplateId, Utterance } from "@/data/types";
import { TEMPLATE_LABELS } from "@/data/types";
import { person } from "@/data/people";
import { formatClock } from "@/lib/format";
import { loadLocalHighlights, newHighlight, saveLocalHighlight } from "@/lib/highlights";
import { Avatar } from "./Avatar";

const TYPES: HighlightType[] = ["decision", "quote", "risk", "wow"];

function typeClass(t: HighlightType): string {
  if (t === "decision") return "text-brass";
  if (t === "quote") return "text-paper";
  if (t === "risk") return "text-risk";
  return "text-moss";
}

function barsFor(id: string, n = 96): number[] {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 33 + id.charCodeAt(i)) >>> 0;
  const out: number[] = [];
  for (let i = 0; i < n; i++) {
    h = (h * 16807 + 7) % 2147483647;
    const v = 0.18 + ((h % 1000) / 1000) * 0.82;
    out.push(v);
  }
  return out;
}

export function MeetingView({ meeting, initialTime = 0 }: { meeting: Meeting; initialTime?: number }) {
  const [time, setTime] = useState(initialTime);
  const [playing, setPlaying] = useState(false);
  const [template, setTemplate] = useState<SummaryTemplateId>(meeting.defaultTemplate);
  const [localHi, setLocalHi] = useState<Highlight[]>([]);
  const [pending, setPending] = useState<Utterance | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const activeRef = useRef<HTMLButtonElement | null>(null);
  const last = useRef<number | null>(null);

  useEffect(() => {
    setLocalHi(loadLocalHighlights(meeting.id));
  }, [meeting.id]);

  useEffect(() => {
    setTime(initialTime);
  }, [initialTime]);

  useEffect(() => {
    if (!playing) {
      last.current = null;
      return;
    }
    let raf = 0;
    const tick = (now: number) => {
      if (last.current == null) last.current = now;
      const dt = (now - last.current) / 1000;
      last.current = now;
      setTime((t) => {
        const next = t + dt;
        if (next >= meeting.duration) {
          setPlaying(false);
          return meeting.duration;
        }
        return next;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing, meeting.duration]);

  const highlights = useMemo(
    () => [...meeting.highlights, ...localHi].sort((a, b) => a.start - b.start),
    [meeting.highlights, localHi],
  );

  const active = useMemo(() => {
    const u = meeting.utterances;
    let found = u[0];
    for (const row of u) {
      if (row.start <= time) found = row;
      else break;
    }
    return found;
  }, [meeting.utterances, time]);

  useEffect(() => {
    activeRef.current?.scrollIntoView({ block: "center", behavior: "smooth" });
  }, [active?.id]);

  const summary = meeting.summaries[template] ?? meeting.summaries[meeting.defaultTemplate];
  const templates = (Object.keys(meeting.summaries) as SummaryTemplateId[]).filter(
    (k) => meeting.summaries[k],
  );
  const wave = useMemo(() => barsFor(meeting.id), [meeting.id]);

  function seek(s: number) {
    setTime(Math.min(meeting.duration, Math.max(0, s)));
  }

  function addHighlight(type: HighlightType, utterance: Utterance) {
    const title = utterance.text.slice(0, 48) + (utterance.text.length > 48 ? "…" : "");
    const hi = newHighlight({
      type,
      title,
      start: utterance.start,
      end: utterance.end,
      utteranceId: utterance.id,
    });
    setLocalHi(saveLocalHighlight(meeting.id, hi));
    setPending(null);
  }

  async function copyClip(h: Highlight) {
    const url = `${window.location.origin}/s/${meeting.id}/${h.id}`;
    await navigator.clipboard.writeText(url);
    setCopied(h.id);
    setTimeout(() => setCopied(null), 1600);
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
      <div>
        <Wave
          duration={meeting.duration}
          time={time}
          bars={wave}
          highlights={highlights}
          playing={playing}
          onToggle={() => setPlaying((p) => !p)}
          onSeek={seek}
        />
        <ol className="mt-6 space-y-1">
          {meeting.utterances.map((row) => {
            const speaker = person(row.speakerId);
            const on = active?.id === row.id;
            const marked = highlights.find((h) => h.utteranceId === row.id);
            return (
              <li key={row.id} className="group relative">
                <button
                  ref={on ? activeRef : undefined}
                  type="button"
                  onClick={() => seek(row.start)}
                  className={`flex w-full scroll-mt-24 gap-3 rounded-lg px-2 py-2 text-left transition ${
                    on ? "bg-white/5" : "hover:bg-white/[0.03]"
                  }`}
                >
                  <span className="w-12 shrink-0 pt-1 font-mono text-[11px] text-paper-dim">
                    {formatClock(row.start)}
                  </span>
                  <Avatar person={speaker} />
                  <span className="min-w-0">
                    <span className="block text-[12px] text-paper-dim">
                      {speaker.name}
                      {marked && (
                        <span className={`ml-2 font-mono text-[10px] uppercase ${typeClass(marked.type)}`}>
                          {marked.type}
                        </span>
                      )}
                    </span>
                    <span className={`block text-[14.5px] leading-relaxed ${on ? "text-paper" : "text-paper-dim"}`}>
                      {row.text}
                    </span>
                  </span>
                </button>
                <button
                  type="button"
                  aria-label="Highlight this moment"
                  onClick={() => setPending(row)}
                  className="absolute left-0 top-2 flex h-6 w-6 -translate-x-1 items-center justify-center rounded-full border border-line bg-ink text-brass opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
                >
                  +
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      <aside className="lg:sticky lg:top-20 lg:self-start">
        <div className="rounded-2xl border border-line bg-ink-2/70 p-4">
          <div className="flex gap-1 overflow-x-auto pb-3">
            {templates.map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => setTemplate(id)}
                className={`shrink-0 rounded-full px-3 py-1 text-[12px] ${
                  template === id ? "bg-brass text-ink" : "border border-line text-paper-dim"
                }`}
              >
                {TEMPLATE_LABELS[id]}
              </button>
            ))}
          </div>
          {summary && (
            <div>
              <p className="font-display text-[22px] leading-snug italic">{summary.headline}</p>
              {summary.sections.map((sec) => (
                <section key={sec.title} className="mt-4">
                  <h3 className="font-mono text-[10px] tracking-[0.16em] text-brass uppercase">{sec.title}</h3>
                  <ul className="mt-2 space-y-1.5 text-[13px] leading-relaxed text-paper-dim">
                    {sec.bullets.map((b) => (
                      <li key={b} className="pl-3" style={{ textIndent: "-0.65rem" }}>
                        <span className="text-brass">· </span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          )}
        </div>

        <div className="mt-4 rounded-2xl border border-line p-4">
          <h3 className="font-mono text-[10px] tracking-[0.16em] text-brass uppercase">Action items</h3>
          <ul className="mt-3 space-y-3">
            {meeting.actionItems.map((item) => {
              const owner = person(item.ownerId);
              const u = meeting.utterances.find((x) => x.id === item.utteranceId);
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    className="w-full text-left"
                    onClick={() => u && seek(u.start)}
                  >
                    <p className="text-[13.5px] leading-snug">{item.text}</p>
                    <p className="mt-1 font-mono text-[11px] text-paper-dim">
                      {owner.name}
                      {item.due ? ` · ${item.due}` : ""}
                    </p>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="mt-4 rounded-2xl border border-line p-4">
          <h3 className="font-mono text-[10px] tracking-[0.16em] text-brass uppercase">Highlights</h3>
          <ul className="mt-3 space-y-2">
            {highlights.map((h) => (
              <li key={h.id} className="flex items-start justify-between gap-2">
                <button type="button" className="min-w-0 text-left" onClick={() => seek(h.start)}>
                  <span className={`font-mono text-[10px] uppercase ${typeClass(h.type)}`}>{h.type}</span>
                  <p className="text-[13px] leading-snug">{h.title}</p>
                  <p className="font-mono text-[11px] text-paper-dim">{formatClock(h.start)}</p>
                </button>
                <button
                  type="button"
                  onClick={() => copyClip(h)}
                  className="shrink-0 rounded-full border border-line px-2 py-0.5 font-mono text-[10px] text-paper-dim hover:text-paper"
                >
                  {copied === h.id ? "copied" : "share"}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {pending && (
        <div className="fixed inset-0 z-30 flex items-end justify-center bg-black/50 p-4 sm:items-center">
          <div className="w-full max-w-sm rounded-2xl border border-line bg-ink p-4">
            <p className="font-display text-xl italic">Mark this moment</p>
            <p className="mt-2 line-clamp-3 text-[13px] text-paper-dim">{pending.text}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {TYPES.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => addHighlight(t, pending)}
                  className={`rounded-full border border-line px-3 py-1 text-[12px] capitalize ${typeClass(t)}`}
                >
                  {t}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setPending(null)}
              className="mt-4 text-[12px] text-paper-dim"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Wave({
  duration,
  time,
  bars,
  highlights,
  playing,
  onToggle,
  onSeek,
}: {
  duration: number;
  time: number;
  bars: number[];
  highlights: Highlight[];
  playing: boolean;
  onToggle: () => void;
  onSeek: (s: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  function at(clientX: number) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = Math.min(1, Math.max(0, (clientX - r.left) / r.width));
    onSeek(x * duration);
  }
  return (
    <div className="rounded-2xl border border-line bg-ink-2/50 p-4">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onToggle}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-brass text-ink"
          aria-label={playing ? "Pause" : "Play"}
        >
          {playing ? "❚❚" : "▶"}
        </button>
        <span className="font-mono text-[13px] tabular-nums">
          {formatClock(time)}
          <span className="text-paper-dim"> / {formatClock(duration)}</span>
        </span>
        <span className="ml-auto text-[12px] text-paper-dim">Stubbed capture · clock, not a Zoom file</span>
      </div>
      <div
        ref={ref}
        role="slider"
        aria-valuemin={0}
        aria-valuemax={duration}
        aria-valuenow={time}
        tabIndex={0}
        onClick={(e) => at(e.clientX)}
        className="relative mt-4 flex h-16 cursor-pointer items-end gap-[2px]"
      >
        {bars.map((b, i) => {
          const on = i / bars.length <= time / duration;
          return (
            <span
              key={i}
              className="flex-1 rounded-sm"
              style={{
                height: `${b * 100}%`,
                background: on ? "var(--brass)" : "rgba(243,238,228,0.18)",
              }}
            />
          );
        })}
        {highlights.map((h) => (
          <span
            key={h.id}
            className="absolute top-0 h-full w-px bg-ember"
            style={{ left: `${(h.start / duration) * 100}%` }}
          />
        ))}
      </div>
    </div>
  );
}
