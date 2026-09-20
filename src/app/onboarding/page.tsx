import { finishOnboardingAction } from "@/app/actions";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function OnboardingPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  return (
    <div className="mx-auto max-w-lg px-5 py-16">
      <p className="font-display text-[28px] italic">Quorum</p>
      <p className="mt-8 font-mono text-[11px] tracking-[0.16em] text-brass uppercase">Welcome · 4 steps</p>
      <h1 className="mt-2 font-display text-4xl italic">Hi {session.name.split(" ")[0]}. Let’s set the room.</h1>
      <ol className="mt-8 space-y-5 text-[14px] leading-relaxed">
        <li>
          <span className="font-mono text-[11px] text-brass">01 </span>
          You have a workspace. Capture is stubbed — we fake the recording bot on purpose.
        </li>
        <li>
          <span className="font-mono text-[11px] text-brass">02 </span>
          Calendar connect is a simulation. You’ll toggle Google or Microsoft on the Calendar page.
        </li>
        <li>
          <span className="font-mono text-[11px] text-brass">03 </span>
          Default template is General. Switch per meeting: Sales, CS, Interview, One-on-one.
        </li>
        <li>
          <span className="font-mono text-[11px] text-brass">04 </span>
          Ten seeded meetings are already here, including a 62-minute eight-person strategy review.
        </li>
      </ol>
      <form action={finishOnboardingAction} className="mt-10">
        <button type="submit" className="rounded-full bg-brass px-5 py-2.5 text-[14px] font-medium text-ink">
          Open the workspace
        </button>
      </form>
    </div>
  );
}
