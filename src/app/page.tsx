import Link from "next/link";
import { demoLoginAction } from "@/app/actions";
import { Logo, Mark } from "@/components/Logo";

const nav = [
  { href: "#product", label: "Overview" },
  { href: "#capture", label: "Product" },
  { href: "#integrations", label: "Integrations" },
  { href: "#why", label: "Resources" },
];

export default function LandingPage() {
  return (
    <div className="starfield min-h-full overflow-x-hidden">
      <header className="mx-auto flex max-w-[1180px] items-center gap-6 px-5 py-5">
        <Logo />
        <nav className="hidden flex-1 items-center justify-center gap-1 rounded-full border border-white/10 bg-white/[0.03] px-2 py-1 text-[13px] text-paper-dim md:flex">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="rounded-full px-3 py-1.5 hover:text-paper">
              {item.label}
            </a>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-3 text-[13px]">
          <Link href="/login" className="hidden text-paper-dim hover:text-paper sm:inline">
            Log in
          </Link>
          <Link href="/signup" className="cta-outline px-4 py-1.5 text-[12px] tracking-wide uppercase">
            Sign up free
          </Link>
        </div>
      </header>

      <section className="mx-auto grid max-w-[1180px] items-center gap-10 px-5 pb-16 pt-8 lg:grid-cols-[1.05fr_1fr] lg:pt-14">
        <div>
          <h1 className="max-w-xl font-display text-[42px] font-medium leading-[1.05] tracking-tight text-paper sm:text-[58px]">
            AI notetaking that keeps up with you
          </h1>
          <p className="mt-5 max-w-lg text-[16px] leading-relaxed text-paper-dim sm:text-[18px]">
            Quorum summarizes your meetings so you can stay in the conversation. Connect Google Calendar, share a Meet tab, and watch live notes appear — no bot in the room.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/signup" className="cta px-6 py-2.5 text-[13px] tracking-wide uppercase">
              Get started — free
            </Link>
            <form action={demoLoginAction}>
              <button type="submit" className="rounded-full border border-white/15 px-5 py-2.5 text-[14px] text-paper hover:bg-white/5">
                Open demo workspace
              </button>
            </form>
          </div>
          <p className="mt-4 text-[12px] text-muted">SOC-inspired demo · GDPR-aware consent · maya@quorum.demo / quorum-demo</p>
        </div>
        <HeroStage />
      </section>

      <section id="capture" className="mx-auto max-w-[1180px] px-5 py-16 text-center">
        <h2 className="font-display text-[32px] font-medium tracking-tight sm:text-[40px]">
          Capture notes your way — bot or no bot —
          <span className="block text-paper-dim">so you can stay focused on the meeting</span>
        </h2>
        <div className="mx-auto mt-12 grid max-w-4xl gap-4 md:grid-cols-[1fr_280px]">
          <div className="glow-ring overflow-hidden rounded-[28px] border border-white/10 bg-card">
            <div className="grid grid-cols-2 gap-px bg-white/10">
              <div className="bg-[#1a1a1a] p-6">
                <div className="aspect-video rounded-xl bg-gradient-to-br from-[#2a3344] to-[#111] p-4 text-left">
                  <p className="text-[12px] text-cyan">Lily</p>
                  <p className="mt-6 text-[14px] text-paper-dim">Listening…</p>
                </div>
              </div>
              <div className="bg-[#1a1a1a] p-6">
                <div className="aspect-video rounded-xl bg-gradient-to-br from-[#243018] to-[#111] p-4 text-left">
                  <p className="text-[12px] text-cyan">Jordan</p>
                  <p className="mt-6 text-[14px] text-paper-dim">On camera</p>
                </div>
              </div>
            </div>
            <div className="border-t border-white/10 p-5 text-left">
              <p className="text-[13px] font-medium">Q3 Strategy + Planning</p>
              <p className="mt-2 text-[13px] leading-relaxed text-paper-dim">
                Lily outlined Q3 priorities. Jordan flagged resourcing. Follow-up: additional outside help for higher-impact work.
              </p>
            </div>
          </div>
          <div className="rounded-[28px] border border-white/10 bg-card p-5 text-left">
            <p className="text-[12px] font-medium text-cyan">Summary</p>
            <ul className="mt-3 space-y-2 text-[13px] leading-relaxed text-paper-dim">
              <li>Activation is the conversion bottleneck.</li>
              <li>Public launch slips; private walkthrough stays.</li>
              <li>Clip share unblocks the VP review.</li>
            </ul>
            <p className="mt-6 text-[12px] font-medium text-cyan">Action items</p>
            <p className="mt-2 text-[13px] text-paper-dim">Confirm waitlist copy by Friday</p>
          </div>
        </div>
      </section>

      <section id="product" className="mx-auto max-w-[1180px] px-5 py-16">
        <h2 className="text-center font-display text-[32px] font-medium tracking-tight sm:text-[40px]">
          Your meeting data, ready for the rest of your stack
        </h2>
        <div className="mx-auto mt-10 max-w-3xl rounded-[28px] border border-white/10 bg-card p-6">
          <p className="text-[13px] text-paper-dim">What follow-ups did I commit to this week?</p>
          <div className="mt-5 space-y-3 text-[14px] leading-relaxed">
            <p className="font-medium">Here is everything grounded in your meetings:</p>
            <p>
              <span className="text-cyan">Product / Demo</span> — Send updated pricing breakdown with enterprise tiers.
            </p>
            <p>
              <span className="text-cyan">Internal</span> — Confirm implementation timeline with the onboarding team.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1180px] px-5 py-16">
        <p className="text-center font-display text-[40px] font-medium tracking-tight sm:text-[56px]">
          faster <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(90deg,#fff,#18c8f4)" }}>Move work</span> forward
        </p>
        <p className="mx-auto mt-4 max-w-xl text-center text-[18px] text-paper-dim">
          Whether you are a team of 1 or 1,000, Quorum keeps decisions from disappearing after the call.
        </p>
        <div className="mx-auto mt-10 grid max-w-3xl gap-6 rounded-[28px] border border-white/10 bg-card p-8 md:grid-cols-2">
          <div>
            <p className="text-[13px] font-semibold text-cyan">Quorum for teams</p>
            <p className="mt-3 text-[15px] font-medium">Shared visibility. Sharper follow-through.</p>
            <p className="mt-2 text-[14px] leading-relaxed text-paper-dim">
              One source of truth across customer calls, standups, and strategy reviews — so nothing is lost between meetings.
            </p>
          </div>
          <div>
            <p className="text-[13px] font-semibold text-cyan">Quorum for individuals</p>
            <ul className="mt-3 space-y-3 text-[14px] text-paper-dim">
              <li>Automatic notes, summaries, and action items.</li>
              <li>Turn conversations into next steps that move deals forward.</li>
              <li>Spot patterns, risks, and decisions across your week.</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="why" className="mx-auto grid max-w-[1180px] items-center gap-10 px-5 py-16 lg:grid-cols-2">
        <div>
          <p className="text-[14px] text-muted">Clarity</p>
          <h2 className="mt-1 font-display text-4xl font-medium tracking-tight">Momentum</h2>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-paper-dim">
            Ask Quorum anything about your meetings — search everything, and get summaries tailored to how your team actually works.
          </p>
          <Link href="/signup" className="cta mt-6 px-5 py-2.5 text-[13px] uppercase tracking-wide">
            Get started. It’s free.
          </Link>
          <p className="mt-10 text-[14px] text-muted">Ease</p>
        </div>
        <div className="relative mx-auto h-[340px] w-[340px] rounded-full bg-[conic-gradient(from_200deg,#18c8f4,#7c3aed,#f472b6,#18c8f4)] p-[10px] sm:h-[400px] sm:w-[400px]">
          <div className="flex h-full w-full items-center justify-center rounded-full bg-[#0b0b0b] p-8">
            <div className="w-full rounded-2xl border border-white/10 bg-card p-4 text-left">
              <p className="text-[12px] tracking-[0.14em] text-paper-dim uppercase">Integrations</p>
              <ul className="mt-3 space-y-3 text-[13px]">
                <li>Slack — send highlights when you choose</li>
                <li>Google Calendar — real upcoming events</li>
                <li>Google Meet — tab audio you explicitly share</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f4f1ea] py-20 text-[#111]">
        <h2 className="text-center font-display text-[36px] font-medium tracking-tight sm:text-[48px]">
          Quorum teams
          <span className="block">work smarter</span>
        </h2>
        <div className="mx-auto mt-14 flex max-w-3xl flex-wrap items-end justify-center gap-4 px-5">
          <StatBubble color="#f97316" size="h-36 w-36" k="95%" d="say they stay present in meetings" />
          <StatBubble color="#f9a8d4" size="h-44 w-44" k="6+ hours" d="saved on follow-up each week" />
          <StatBubble color="#38bdf8" size="h-52 w-52" k="3× faster" d="from insight to next step" />
        </div>
      </section>

      <section id="integrations" className="mx-auto max-w-[900px] px-5 py-20 text-center">
        <h2 className="font-display text-[36px] font-medium tracking-tight">Works where you meet</h2>
        <div className="relative mx-auto mt-14 h-[320px] max-w-[520px]">
          <div className="absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-cyan/40 bg-card glow-ring">
            <Mark className="h-10 w-10" />
          </div>
          {["Google Meet", "Zoom", "Gmail", "Slack", "Microsoft Teams", "Calendar"].map((label, i) => {
            const angle = (i / 6) * Math.PI * 2 - Math.PI / 2;
            const x = 50 + Math.cos(angle) * 42;
            const y = 50 + Math.sin(angle) * 38;
            return (
              <span
                key={label}
                className="absolute rounded-full border border-white/10 bg-elevated px-3 py-1.5 text-[12px] text-paper"
                style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)" }}
              >
                {label}
              </span>
            );
          })}
        </div>
        <p className="mt-8 text-[18px] text-paper-dim">Quorum adapts to your workflow, not the other way around.</p>
      </section>

      <footer className="border-t border-white/10 px-5 py-10 text-center text-[13px] text-muted">
        <Logo />
        <p className="mt-4">An 8x assignment rebuild. Original product. Original copy. Capture uses explicit browser tab audio.</p>
      </footer>
    </div>
  );
}

function HeroStage() {
  return (
    <div className="relative mx-auto h-[420px] w-full max-w-[520px]">
      <div className="absolute right-0 top-6 w-[220px] rounded-3xl border border-white/10 bg-card/90 p-4 backdrop-blur glow-ring">
        <p className="text-[11px] text-paper-dim">Ask Quorum</p>
        <p className="mt-2 text-[13px]">What follow-ups did I commit to this week?</p>
      </div>
      <div className="absolute left-4 top-24 w-[240px] overflow-hidden rounded-3xl border border-white/10 bg-card glow-ring">
        <div className="h-28 bg-gradient-to-br from-[#1e3a5f] to-[#0b0b0b]" />
        <div className="p-3">
          <p className="text-[12px] font-medium">Weekly check-in</p>
          <p className="text-[11px] text-paper-dim">Audio + transcript</p>
        </div>
      </div>
      <div className="absolute bottom-4 right-8 w-[250px] rounded-3xl border border-white/10 bg-card p-4 glow-ring">
        <p className="text-[11px] text-cyan">Project check-in</p>
        <p className="mt-2 text-[13px] leading-relaxed text-paper-dim">Summary ready. Scratchpad stays with the call.</p>
      </div>
    </div>
  );
}

function StatBubble({ color, size, k, d }: { color: string; size: string; k: string; d: string }) {
  return (
    <div className={`${size} flex flex-col items-center justify-center rounded-full px-4 text-center text-[#111]`} style={{ background: color }}>
      <p className="text-[22px] font-semibold leading-none">{k}</p>
      <p className="mt-2 text-[11px] leading-snug">{d}</p>
    </div>
  );
}
