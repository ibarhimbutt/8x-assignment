"use client";

import Link from "next/link";
import { Suspense, useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { demoLoginAction, loginAction } from "@/app/actions";
import { AuthCard, Field } from "@/components/AuthCard";

function LoginForm() {
  const sp = useSearchParams();
  const [state, action, pending] = useActionState(loginAction, null);
  const next = sp.get("next") ?? "/dashboard";

  return (
    <AuthCard title="Welcome back" sub="Sign in to your workspace — or continue as Maya for the demo.">
      <form action={demoLoginAction} className="mb-3">
        <button type="submit" className="w-full rounded-xl border border-line py-2.5 text-[14px]">
          Continue as Maya (demo)
        </button>
      </form>
      <p className="my-4 text-center text-[12px] text-muted">or use email</p>
      <form action={action} className="space-y-3">
        <input type="hidden" name="next" value={next} />
        <Field label="Email" name="email" type="email" placeholder="maya@quorum.demo" />
        <Field label="Password" name="password" type="password" placeholder="At least 6 characters" />
        {state?.error && <p className="text-[13px] text-ember">{state.error}</p>}
        <button type="submit" disabled={pending} className="cta w-full py-2.5 text-[14px] disabled:opacity-60">
          {pending ? "Signing in…" : "Log in"}
        </button>
      </form>
      <p className="mt-5 text-center text-[13px] text-paper-dim">
        New here?{" "}
        <Link href="/signup" className="text-cyan">
          Create an account
        </Link>
      </p>
    </AuthCard>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
