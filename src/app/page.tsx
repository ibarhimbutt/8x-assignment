import Link from "next/link";
import { demoLoginAction } from "@/app/actions";

const features = [
  { k: "01", t: "AI summaries", d: "Templates for sales, CS, interviews, and product reviews — switch and the notes change." },
  { k: "02", t: "Searchable transcripts", d: "Keyword in, jump to the line. Player and transcript stay locked." },
  { k: "03", t: "Action items", d: "Owners pulled from who volunteered on the call. Click jumps to the moment." },
  { k: "04", t: "Highlights", d: "Decision, quote, risk, wow. Ticks on the waveform. Share as a public clip." },
  { k: "05", t: "Ask your meetings", d: "Pricing objections, onboarding bugs, who owns waitlist copy — answered from the corpus." },
  { k: "06", t: "Calendar", d: "Connect Google or Microsoft in a simulated flow. Upcoming meetings appear. Capture stays stubbed." },
];

export default function LandingPage() {
  return (
    <div className="min-h-full">
      <header className="mx-auto flex max-w-[1100px] items-center justify-between px-5 py-5">
        <p className="font-display text-[28px] italic leading-none">Quorum</p>
        <div className="flex items-center gap-3 text-[13px]">
          <Link href="/login" className="text-paper-dim hover:text-paper">
            Log in
          </Link>
          <Link href="/signup" className="rounded-full bg-brass px-4 py-2 font-medium text-ink">
            Get started free
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-[1100px] px-5 pb-16 pt-8 sm:pt-16">
        <p className="font-mono text-[11px] tracking-[0.18em] text-brass uppercase">The meeting after the meeting</p>
        <h1 className="mt-4 max-w-3xl font-display text-5xl italic leading-[1.05] tracking-tight sm:text-7xl">
          Your meetings, remembered.
        </h1>
        <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-paper-dim sm:text-[18px]">
          AI-powered meeting notes, transcripts, summaries, action items, and searchable conversations — automatically organized in one workspace.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/signup" className="rounded-full bg-brass px-5 py-2.5 text-[14px] font-medium text-ink">
            Get started free
          </Link>
          <form action={demoLoginAction}>
            <button type="submit" className="rounded-full border border-line px-5 py-2.5 text-[14px] text-paper">
              See how it works
            </button>
          </form>
        </div>
        <p className="mt-3 font-mono text-[11px] text-paper-dim">
          Demo · maya@quorum.demo / quorum-demo · capture is stubbed on purpose
        </p>

        <div className="mt-14 overflow-hidden rounded-2xl border border-line bg-ink-2/60 p-5 sm:p-8">
          <p className="font-mono text-[10px] tracking-[0.16em] text-brass uppercase">Product preview · Q3 Product Strategy</p>
          <p className="mt-3 font-display text-3xl italic">Unanimous no-go on October 14</p>
          <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-paper-dim">
            Eight people, sixty-two minutes. Dana at 28:34. Player, transcript, templates, and a clip you can open without an account.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {["8 speakers", "62 minutes", "Public clip share"].map((x) => (
              <div key={x} className="rounded-xl border border-line px-4 py-3 text-[13px]">
                {x}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="how" className="mx-auto max-w-[1100px] px-5 pb-20">
        <h2 className="font-display text-3xl italic">What Quorum actually does</h2>
        <ul className="mt-8 grid gap-6 sm:grid-cols-2">
          {features.map((f) => (
            <li key={f.k} className="border-t border-line pt-4">
              <p className="font-mono text-[11px] text-brass">{f.k}</p>
              <h3 className="mt-1 text-[17px] font-medium">{f.t}</h3>
              <p className="mt-1 text-[14px] leading-relaxed text-paper-dim">{f.d}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
