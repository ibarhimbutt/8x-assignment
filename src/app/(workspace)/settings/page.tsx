"use client";

import { useEffect, useState } from "react";
import { loadSettings, saveSettings, type SettingsState } from "@/lib/local";
import { getMeeting } from "@/data/meetings";

export default function SettingsPage() {
  const [s, setS] = useState<SettingsState | null>(null);
  const [saved, setSaved] = useState(false);
  useEffect(() => setS(loadSettings()), []);
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
      <p className="font-mono text-[11px] tracking-[0.16em] text-brass uppercase">Account</p>
      <h1 className="mt-2 font-display text-4xl italic">Settings</h1>
      {saved && <p className="mt-2 text-[13px] text-moss">Saved</p>}

      <section className="mt-8 border-t border-line pt-6">
        <h2 className="font-mono text-[11px] tracking-[0.16em] text-brass uppercase">Profile</h2>
        <p className="mt-2 text-[14px] text-paper-dim">Name and email live on the session. Demo user is Maya Chen.</p>
      </section>

      <section className="mt-8 border-t border-line pt-6 space-y-3">
        <h2 className="font-mono text-[11px] tracking-[0.16em] text-brass uppercase">Preferences</h2>
        <label className="block text-[13px]">
          Timezone
          <input
            value={s.timezone}
            onChange={(e) => update({ timezone: e.target.value })}
            className="mt-1 w-full rounded-xl border border-line bg-ink-2 px-3 py-2"
          />
        </label>
        <label className="block text-[13px]">
          Default summary template
          <select
            value={s.defaultTemplate}
            onChange={(e) => update({ defaultTemplate: e.target.value })}
            className="mt-1 w-full rounded-xl border border-line bg-ink-2 px-3 py-2"
          >
            <option value="general">General</option>
            <option value="bant">Sales</option>
            <option value="cs">Customer success</option>
            <option value="product">Product</option>
          </select>
        </label>
      </section>

      <section className="mt-8 border-t border-line pt-6 space-y-2">
        <h2 className="font-mono text-[11px] tracking-[0.16em] text-brass uppercase">Recording</h2>
        <Toggle label="Auto-capture upcoming meetings" on={s.autoCapture} onChange={(v) => update({ autoCapture: v })} />
        <Toggle label="Consent notification in the room" on={s.consent} onChange={(v) => update({ consent: v })} />
        <p className="text-[12px] text-paper-dim">These flags are stored locally. There is still no real Zoom bot.</p>
      </section>

      <section className="mt-8 border-t border-line pt-6 space-y-2">
        <h2 className="font-mono text-[11px] tracking-[0.16em] text-brass uppercase">Notifications</h2>
        <Toggle label="Summary ready" on={s.summaryNotify} onChange={(v) => update({ summaryNotify: v })} />
        <Toggle label="Action item reminders" on={s.actionReminders} onChange={(v) => update({ actionReminders: v })} />
      </section>

      <section className="mt-8 border-t border-line pt-6">
        <h2 className="font-mono text-[11px] tracking-[0.16em] text-brass uppercase">Integrations</h2>
        <p className="mt-2 text-[14px] text-paper-dim">
          Google Calendar, Microsoft Calendar, Zoom, Meet, and Teams are listed as future sockets. Calendar connect is simulated on the Calendar page. {getMeeting("q3-launch-review") ? "Seed data does not require them." : ""}
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
