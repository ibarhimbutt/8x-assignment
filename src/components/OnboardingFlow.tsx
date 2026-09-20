"use client";

import { useState } from "react";
import { finishOnboardingAction } from "@/app/actions";
import { Logo } from "@/components/Logo";

const DEPTS = ["Product", "Engineering", "Sales", "Customer success", "Design", "Founder"];
const ROLES = ["Individual contributor", "Manager", "Director", "Executive"];

export function OnboardingFlow({ name }: { name: string }) {
  const [step, setStep] = useState(0);
  const [usage, setUsage] = useState<"self" | "team" | "">("");
  const [dept, setDept] = useState("");
  const [role, setRole] = useState("");
  const [notesOn, setNotesOn] = useState("All meetings in my calendar");
  const [shareWith, setShareWith] = useState("All attendees");
  const [consent, setConsent] = useState(false);

  const first = name.split(" ")[0];

  return (
    <div className="starfield min-h-full">
      <div className="mx-auto max-w-2xl px-5 py-16 text-center">
        <Logo href={null} />
        {step === 0 && (
          <div className="mt-16">
            <p className="text-[12px] tracking-[0.16em] text-muted uppercase">Personalize your account</p>
            <h1 className="mt-3 font-display text-3xl font-medium tracking-tight">How are you planning to use Quorum?</h1>
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <Choice
                title="By myself"
                sub="Summaries and action items for your meetings."
                on={usage === "self"}
                onClick={() => setUsage("self")}
              />
              <Choice
                title="With my team"
                sub="Share and organize meetings in one place."
                on={usage === "team"}
                onClick={() => setUsage("team")}
              />
            </div>
            <button type="button" disabled={!usage} onClick={() => setStep(1)} className="cta mt-10 px-8 py-2.5 disabled:opacity-40">
              Continue
            </button>
          </div>
        )}

        {step === 1 && (
          <div className="mt-16">
            <p className="text-[12px] tracking-[0.16em] text-muted uppercase">Tell us about yourself</p>
            <h1 className="mt-3 font-display text-3xl font-medium tracking-tight">
              I work in{" "}
              <select value={dept} onChange={(e) => setDept(e.target.value)} className="rounded-lg border border-line bg-elevated px-2 py-1 text-[18px]">
                <option value="">Select department</option>
                {DEPTS.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>{" "}
              as{" "}
              <select value={role} onChange={(e) => setRole(e.target.value)} className="rounded-lg border border-line bg-elevated px-2 py-1 text-[18px]">
                <option value="">Select your role</option>
                {ROLES.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>
            </h1>
            <button type="button" disabled={!dept || !role} onClick={() => setStep(2)} className="cta mt-10 px-8 py-2.5 disabled:opacity-40">
              Continue
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="mt-16">
            <p className="text-[12px] tracking-[0.16em] text-muted uppercase">Set up your preferences</p>
            <h1 className="mt-3 font-display text-3xl font-medium tracking-tight">
              Take notes on{" "}
              <select value={notesOn} onChange={(e) => setNotesOn(e.target.value)} className="rounded-lg border border-line bg-elevated px-2 py-1 text-[18px]">
                <option>All meetings in my calendar</option>
                <option>Only meetings I start notes for</option>
                <option>Never automatically</option>
              </select>{" "}
              and share with{" "}
              <select value={shareWith} onChange={(e) => setShareWith(e.target.value)} className="rounded-lg border border-line bg-elevated px-2 py-1 text-[18px]">
                <option>All attendees</option>
                <option>Only me</option>
              </select>
            </h1>
            <label className="mx-auto mt-10 flex max-w-md items-start gap-2 text-left text-[13px] text-paper-dim">
              <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-1" />
              I understand I’m responsible for collecting attendee consent for recording and transcription, in accordance with applicable laws.
            </label>
            <button type="button" disabled={!consent} onClick={() => setStep(3)} className="cta mt-8 px-8 py-2.5 disabled:opacity-40">
              Continue
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="mt-16">
            <p className="text-[12px] tracking-[0.16em] text-muted uppercase">Hi {first}</p>
            <h1 className="mt-3 font-display text-3xl font-medium tracking-tight">Connect Google Calendar</h1>
            <p className="mx-auto mt-3 max-w-md text-[14px] text-paper-dim">
              Real OAuth if Google keys are configured. Otherwise you’ll see a clear setup message — we won’t fake a connection.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a href="/api/google/connect?next=/onboarding" className="cta px-5 py-2.5 text-[14px]">
                Connect Google Calendar
              </a>
              <form action={finishOnboardingAction}>
                <button type="submit" className="rounded-full border border-line px-5 py-2.5 text-[14px]">
                  Skip for now
                </button>
              </form>
            </div>
            <form action={finishOnboardingAction} className="mt-6">
              <button type="submit" className="text-[13px] text-cyan">
                Open the workspace
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

function Choice({ title, sub, on, onClick }: { title: string; sub: string; on: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-2xl border p-6 text-left ${on ? "border-cyan bg-cyan/10" : "border-line bg-card"}`}
    >
      <p className="text-[16px] font-medium">{title}</p>
      <p className="mt-2 text-[13px] text-paper-dim">{sub}</p>
    </button>
  );
}
