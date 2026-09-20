"use client";

import { useEffect, useState } from "react";
import { loadSettings, saveSettings, type SettingsState } from "@/lib/local";

export default function SettingsPage() {
  const [s, setS] = useState<SettingsState | null>(null);
  const [saved, setSaved] = useState(false);
  const [google, setGoogle] = useState<{ connected?: boolean; configured?: boolean; email?: string }>({});

  useEffect(() => {
    setS(loadSettings());
    void fetch("/api/google/status")
      .then((r) => r.json())
      .then(setGoogle);
  }, []);
  if (!s) return <p className="text-paper-dim">Loading preferences…</p>;

  function update(patch: Partial<SettingsState>) {
    const next = { ...s!, ...patch };
    setS(next);
    saveSettings(next);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1200);
  }

  return (
    <div className="max-w-xl">
      <p className="text-[11px] font-semibold tracking-[0.16em] text-cyan uppercase">Account</p>
      <h1 className="mt-2 font-display text-4xl font-medium tracking-tight">Settings</h1>
      {saved && <p className="mt-2 text-[13px] text-moss">Saved</p>}

      <section className="mt-8 border-t border-line pt-6">
        <h2 className="text-[11px] font-semibold tracking-[0.16em] text-cyan uppercase">Profile</h2>
        <p className="mt-2 text-[14px] text-paper-dim">Name and email live on the signed session. Demo user is Maya Chen.</p>
      </section>

      <section className="mt-8 border-t border-line pt-6 space-y-3">
        <h2 className="text-[11px] font-semibold tracking-[0.16em] text-cyan uppercase">Calendar</h2>
        <p className="text-[14px] text-paper-dim">
          {google.connected
            ? `Google Calendar connected${google.email ? ` (${google.email})` : ""}.`
            : google.configured === false
              ? "Google Calendar is not configured on this deployment."
              : "Google Calendar is disconnected."}
        </p>
        <a href="/calendar" className="text-[13px] text-cyan">
          Manage calendar
        </a>
      </section>

      <section className="mt-8 border-t border-line pt-6 space-y-3">
        <h2 className="text-[11px] font-semibold tracking-[0.16em] text-cyan uppercase">Recording</h2>
        <Toggle label="Auto-capture upcoming meetings" on={s.autoCapture} onChange={(v) => update({ autoCapture: v })} />
        <Toggle label="Capture confirmation before sharing audio" on={s.consent} onChange={(v) => update({ consent: v })} />
        <label className="block text-[13px]">
          Transcript language
          <input
            value={s.language}
            onChange={(e) => update({ language: e.target.value })}
            className="mt-1 w-full rounded-xl border border-line bg-elevated px-3 py-2"
          />
        </label>
        <p className="text-[12px] text-paper-dim">Audio source is the tab you share in the browser. Nothing is captured silently.</p>
      </section>

      <section className="mt-8 border-t border-line pt-6">
        <h2 className="text-[11px] font-semibold tracking-[0.16em] text-cyan uppercase">AI</h2>
        <p className="mt-2 text-[14px] text-paper-dim">
          Agent Router if AGENT_ROUTER_API_KEY is set, otherwise Gemini, otherwise deterministic notes from the transcript.
        </p>
      </section>

      <section className="mt-8 border-t border-line pt-6 space-y-3">
        <h2 className="text-[11px] font-semibold tracking-[0.16em] text-cyan uppercase">Preferences</h2>
        <label className="block text-[13px]">
          Timezone
          <input
            value={s.timezone}
            onChange={(e) => update({ timezone: e.target.value })}
            className="mt-1 w-full rounded-xl border border-line bg-elevated px-3 py-2"
          />
        </label>
      </section>

      <section className="mt-8 border-t border-line pt-6 space-y-2">
        <h2 className="text-[11px] font-semibold tracking-[0.16em] text-cyan uppercase">Notifications</h2>
        <Toggle label="Summary ready" on={s.summaryNotify} onChange={(v) => update({ summaryNotify: v })} />
        <Toggle label="Action item reminders" on={s.actionReminders} onChange={(v) => update({ actionReminders: v })} />
      </section>

      <section className="mt-8 border-t border-line pt-6">
        <h2 className="text-[11px] font-semibold tracking-[0.16em] text-cyan uppercase">Privacy</h2>
        <p className="mt-2 text-[14px] text-paper-dim">
          Private meetings require a session. Public share links are explicit. Capture always asks the browser for permission.
        </p>
      </section>
    </div>
  );
}

function Toggle({ label, on, onChange }: { label: string; on: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-center justify-between gap-3 text-[14px]">
      {label}
      <input type="checkbox" checked={on} onChange={(e) => onChange(e.target.checked)} />
    </label>
  );
}
