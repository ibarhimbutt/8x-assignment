"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { addCaptured } from "@/lib/local";
import { stashRecording } from "@/lib/recordings";
import { DEMO_LIVE_SCRIPT } from "@/lib/demo-transcript";
import { formatClock } from "@/lib/format";
import type { LiveNotes, Meeting, Utterance } from "@/data/types";
import { emptyLiveNotes } from "@/data/types";

type Line = { id: string; speaker: string; t: number; text: string; interim?: boolean };

function pickMime(): string {
  const types = ["audio/webm;codecs=opus", "audio/webm", "audio/mp4"];
  for (const t of types) {
    if (typeof MediaRecorder !== "undefined" && MediaRecorder.isTypeSupported(t)) return t;
  }
  return "audio/webm";
}

export function LiveMeeting({
  meetingId,
  title,
  meetUrl,
}: {
  meetingId: string;
  title: string;
  meetUrl?: string;
}) {
  const router = useRouter();
  const [phase, setPhase] = useState<"idle" | "live" | "processing" | "error">("idle");
  const [error, setError] = useState("");
  const [elapsed, setElapsed] = useState(0);
  const [lines, setLines] = useState<Line[]>([]);
  const [notes, setNotes] = useState<LiveNotes>(emptyLiveNotes());
  const [sharing, setSharing] = useState("");
  const [mode, setMode] = useState<"stt" | "browser" | "demo">("stt");
  const [level, setLevel] = useState(0);
  const [step, setStep] = useState("");
  const [consent, setConsent] = useState(false);

  const streamRef = useRef<MediaStream | null>(null);
  const recRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const startRef = useRef(0);
  const lastNotesAt = useRef(0);
  const linesRef = useRef<Line[]>([]);
  const notesRef = useRef<LiveNotes>(emptyLiveNotes());
  const transcriptBox = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    linesRef.current = lines;
  }, [lines]);
  useEffect(() => {
    notesRef.current = notes;
  }, [notes]);
  useEffect(() => {
    transcriptBox.current?.scrollTo({ top: transcriptBox.current.scrollHeight, behavior: "smooth" });
  }, [lines]);

  useEffect(() => {
    if (phase !== "live") return;
    const id = window.setInterval(() => setElapsed(Math.floor((Date.now() - startRef.current) / 1000)), 250);
    return () => window.clearInterval(id);
  }, [phase]);

  useEffect(() => {
    return () => stopTracks();
  }, []);

  function stopTracks() {
    recRef.current?.state === "recording" && recRef.current.stop();
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
  }

  function pushLine(speaker: string, text: string, t = Math.floor((Date.now() - startRef.current) / 1000)) {
    const clean = text.trim();
    if (!clean) return;
    setLines((prev) => {
      const last = prev[prev.length - 1];
      if (last && last.speaker === speaker && t - last.t < 8) {
        const next = [...prev.slice(0, -1), { ...last, text: `${last.text} ${clean}`.trim() }];
        linesRef.current = next;
        return next;
      }
      const row: Line = { id: `${meetingId}-${prev.length + 1}`, speaker, t, text: clean };
      const next = [...prev, row];
      linesRef.current = next;
      return next;
    });
  }

  async function refreshNotes(force = false) {
    const now = Date.now();
    if (!force && now - lastNotesAt.current < 28000) return;
    lastNotesAt.current = now;
    const delta = linesRef.current
      .slice(-12)
      .map((l) => `${l.speaker}: ${l.text}`)
      .join("\n");
    if (delta.length < 20) return;
    try {
      const res = await fetch("/api/live-notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, transcriptDelta: delta, previous: notesRef.current }),
      });
      const json = (await res.json()) as { notes?: LiveNotes };
      if (json.notes) setNotes(json.notes);
    } catch {
      /* keep previous */
    }
  }

  function startDemoScript() {
    setMode("demo");
    DEMO_LIVE_SCRIPT.forEach((row) => {
      window.setTimeout(() => {
        if (streamRef.current) pushLine(row.speaker, row.text, row.t);
        void refreshNotes();
      }, row.t * 1000);
    });
  }

  function startBrowserSpeech() {
    const SR = (window as Window & { webkitSpeechRecognition?: new () => SpeechRecognition }).webkitSpeechRecognition
      || (window as Window & { SpeechRecognition?: new () => SpeechRecognition }).SpeechRecognition;
    if (!SR) {
      startDemoScript();
      return;
    }
    setMode("browser");
    const rec = new SR();
    rec.continuous = true;
    rec.interimResults = true;
    rec.lang = "en-US";
    rec.onresult = (ev: SpeechRecognitionEvent) => {
      let final = "";
      for (let i = ev.resultIndex; i < ev.results.length; i++) {
        if (ev.results[i].isFinal) final += ev.results[i][0].transcript;
      }
      if (final) {
        pushLine("you", final);
        void refreshNotes();
      }
    };
    rec.onerror = () => startDemoScript();
    try {
      rec.start();
    } catch {
      startDemoScript();
    }
  }

  async function start() {
    setError("");
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: { frameRate: 8, width: 1280, height: 720 },
        audio: true,
      });
      const audio = stream.getAudioTracks();
      if (!audio.length) {
        stream.getTracks().forEach((t) => t.stop());
        setError("No audio track. Select the Google Meet tab and enable Share tab audio.");
        setPhase("error");
        return;
      }
      streamRef.current = stream;
      setSharing(audio[0].label || "Shared tab audio");
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        void videoRef.current.play();
      }

      const ctx = new AudioContext();
      const source = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);
      const data = new Uint8Array(analyser.frequencyBinCount);
      const meter = window.setInterval(() => {
        analyser.getByteFrequencyData(data);
        const avg = data.reduce((n, v) => n + v, 0) / data.length;
        setLevel(avg / 255);
      }, 120);

      stream.getVideoTracks()[0]?.addEventListener("ended", () => {
        window.clearInterval(meter);
        if (phase === "live") void stopAndFinish();
      });

      chunksRef.current = [];
      let rec: MediaRecorder | null = null;
      try {
        rec = new MediaRecorder(stream, { mimeType: pickMime() });
      } catch {
        // Some streams (e.g. screen-only without real audio codec) can't create a MediaRecorder
        rec = null;
      }
      recRef.current = rec;
      if (rec) {
        rec.ondataavailable = async (e) => {
          if (e.data.size < 400) return;
          chunksRef.current.push(e.data);
          try {
            const fd = new FormData();
            fd.set("audio", e.data, "chunk.webm");
            const res = await fetch("/api/stt", { method: "POST", body: fd });
            const json = (await res.json()) as { text?: string; configured?: boolean };
            if (json.text) {
              setMode("stt");
              pushLine("speaker", json.text);
              void refreshNotes();
            } else if (json.configured === false && mode !== "browser" && linesRef.current.length === 0) {
              startBrowserSpeech();
            }
          } catch {
            /* next chunk */
          }
        };
        try {
          rec.start(2800);
        } catch {
          // MediaRecorder.start() can throw if the stream has no usable audio
          recRef.current = null;
        }
      }
      startRef.current = Date.now();
      lastNotesAt.current = Date.now();
      setPhase("live");
      setElapsed(0);
      window.setTimeout(() => {
        if (linesRef.current.length === 0) startBrowserSpeech();
      }, 8000);
    } catch (err) {
      setPhase("error");
      setError(err instanceof Error ? err.message : "Permission was denied. Nothing was recorded.");
    }
  }

  async function stopAndFinish() {
    setPhase("processing");
    setStep("Stopping capture…");
    try {
      recRef.current?.state === "recording" && recRef.current.stop();
    } catch {
      /* already stopped */
    }
    await new Promise((r) => setTimeout(r, 400));
    const blob = new Blob(chunksRef.current, { type: chunksRef.current[0]?.type || "audio/webm" });
    if (blob.size > 1000) stashRecording(meetingId, blob);
    stopTracks();

    setStep("Transcription complete");
    await refreshNotes(true);
    await new Promise((r) => setTimeout(r, 500));
    setStep("Generating summary…");
    await new Promise((r) => setTimeout(r, 400));
    setStep("Extracting action items…");
    await new Promise((r) => setTimeout(r, 350));
    setStep("Generating highlights…");

    const utterances: Utterance[] = linesRef.current.map((l, i) => ({
      id: `${meetingId}-${i + 1}`,
      speakerId: l.speaker === "you" ? "you" : l.speaker,
      start: l.t,
      end: (linesRef.current[i + 1]?.t ?? l.t + 6),
      text: l.text,
    }));
    const n = notesRef.current;
    const duration = Math.max(elapsed, utterances.at(-1)?.end ?? elapsed, 8);
    const meeting: Meeting = {
      id: meetingId,
      title,
      startedAt: new Date(startRef.current || Date.now()).toISOString(),
      duration,
      platform: "meet",
      attendeeIds: Array.from(new Set(["you", ...utterances.map((u) => u.speakerId)])),
      utterances:
        utterances.length > 0
          ? utterances
          : [
              {
                id: `${meetingId}-1`,
                speakerId: "you",
                start: 2,
                end: 10,
                text: "Capture ended without a transcript. Cloud STT was not configured and browser speech did not return text.",
              },
            ],
      defaultTemplate: "general",
      summaries: {
        general: {
          template: "general",
          headline: n.keyPoints[0] || "Live notes from this capture.",
          sections: [
            { title: "Key points", bullets: n.keyPoints.length ? n.keyPoints : ["No key points extracted."] },
            { title: "Decisions", bullets: n.decisions.length ? n.decisions : ["No explicit decisions captured."] },
            { title: "Questions", bullets: n.questions },
            { title: "Topics", bullets: n.topics },
          ].filter((s) => s.bullets.length > 0),
        },
      },
      actionItems: n.actionItems.map((text, i) => ({
        id: `${meetingId}-a${i + 1}`,
        text,
        ownerId: "you",
        due: "This week",
      })),
      highlights: utterances.slice(0, 3).map((u, i) => ({
        id: `${meetingId}-h${i + 1}`,
        type: i === 0 ? "decision" : "quote",
        title: u.text.slice(0, 52),
        start: u.start,
        end: u.end,
        utteranceId: u.id,
      })),
      tag: "Captured",
      meetingUrl: meetUrl,
      audioAvailable: blob.size > 1000,
    };
    addCaptured(meeting);
    setStep("Complete");
    window.setTimeout(() => router.push(`/meetings/${meetingId}`), 500);
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col">
      <header className="flex flex-wrap items-center gap-3 border-b border-line px-1 py-3">
        <div className="min-w-0 flex-1">
          <p className="text-[12px] text-paper-dim">Live notes</p>
          <h1 className="truncate font-display text-2xl font-semibold tracking-tight">{title}</h1>
        </div>
        {phase === "live" && (
          <p className="flex items-center gap-2 font-mono text-[13px] text-paper">
            <span className="live-dot inline-block h-2.5 w-2.5 rounded-full bg-ember" />
            LIVE {formatClock(elapsed)}
          </p>
        )}
        {phase === "live" ? (
          <button type="button" onClick={() => void stopAndFinish()} className="cta px-4 py-2 text-[13px]">
            Stop recording
          </button>
        ) : null}
      </header>

      {phase === "idle" || phase === "error" ? (
        <div className="mx-auto mt-10 max-w-xl rounded-2xl border border-line bg-card p-6">
          <h2 className="font-display text-2xl font-semibold tracking-tight">Start live notes</h2>
          <p className="mt-3 text-[14px] leading-relaxed text-paper-dim">
            Your browser will ask permission to share a tab. Pick the Google Meet tab and turn on{" "}
            <strong className="text-paper">Share tab audio</strong>. Quorum does not join the meeting as a bot.
          </p>
          {meetUrl && (
            <a href={meetUrl} target="_blank" rel="noreferrer" className="mt-4 inline-block text-[13px] text-cyan">
              Open meeting in a new tab
            </a>
          )}
          <label className="mt-5 flex items-start gap-2 text-[13px] text-paper-dim">
            <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-1" />
            I understand this records tab audio I explicitly share, and I am responsible for attendee consent.
          </label>
          {error && <p className="mt-3 text-[13px] text-ember">{error}</p>}
          <button
            type="button"
            disabled={!consent}
            onClick={() => void start()}
            className="cta mt-6 w-full py-2.5 text-[14px] disabled:opacity-40"
          >
            Start live notes
          </button>
        </div>
      ) : null}

      {phase === "processing" && (
        <div className="mx-auto mt-16 max-w-md text-center">
          <p className="font-mono text-[12px] tracking-[0.16em] text-cyan uppercase">Processing meeting</p>
          <p className="mt-3 font-display text-3xl font-semibold">{step}</p>
        </div>
      )}

      {phase === "live" && (
        <div className="mt-4 grid flex-1 gap-4 lg:grid-cols-[220px_minmax(0,1fr)_280px]">
          <aside className="space-y-4">
            <div className="overflow-hidden rounded-2xl border border-line bg-card">
              <video ref={videoRef} muted playsInline className="aspect-video w-full bg-black object-cover" />
            </div>
            <div className="rounded-2xl border border-line bg-card p-4 text-[13px]">
              <p className="text-paper-dim">You’re sharing audio from</p>
              <p className="mt-1 text-paper">{sharing || "Google Meet"}</p>
              <p className="mt-3 text-paper-dim">Live transcription {mode === "stt" ? "active" : mode === "browser" ? "via microphone" : "demo mode"}</p>
              {mode === "demo" && (
                <p className="mt-2 text-[12px] text-warn">Demo capture mode. Cloud STT is not configured; tab audio is still captured.</p>
              )}
              <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
                <div className="h-full bg-cyan" style={{ width: `${Math.min(100, level * 140)}%` }} />
              </div>
            </div>
          </aside>

          <section ref={transcriptBox} className="max-h-[70vh] overflow-y-auto rounded-2xl border border-line bg-card p-4">
            {lines.length === 0 && (
              <p className="text-[14px] text-paper-dim">Waiting for speech… keep talking in the shared tab.</p>
            )}
            <ol className="space-y-4">
              {lines.map((row) => (
                <li key={row.id}>
                  <p className="font-mono text-[11px] text-cyan">{formatClock(row.t)}</p>
                  <p className="text-[12px] text-paper-dim">{row.speaker === "you" ? "You" : "Speaker"}</p>
                  <p className="mt-1 text-[15px] leading-relaxed">{row.text}</p>
                </li>
              ))}
            </ol>
          </section>

          <aside className="space-y-4">
            <NotesCard title="Key points" items={notes.keyPoints} />
            <NotesCard title="Decisions" items={notes.decisions} />
            <NotesCard title="Action items" items={notes.actionItems} />
            <NotesCard title="Questions" items={notes.questions} />
          </aside>
        </div>
      )}
    </div>
  );
}

function NotesCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-2xl border border-line bg-card p-4">
      <h3 className="text-[11px] font-semibold tracking-[0.14em] text-cyan uppercase">{title}</h3>
      {items.length === 0 ? (
        <p className="mt-2 text-[13px] text-paper-dim">Listening…</p>
      ) : (
        <ul className="mt-2 space-y-1.5 text-[13px] leading-relaxed text-paper-dim">
          {items.map((item) => (
            <li key={item}>• {item}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  onresult: ((ev: SpeechRecognitionEvent) => void) | null;
  onerror: ((ev: Event) => void) | null;
}
interface SpeechRecognitionEvent extends Event {
  resultIndex: number;
  results: { length: number; [i: number]: { isFinal: boolean; 0: { transcript: string } } };
}
