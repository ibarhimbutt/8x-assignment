"use client";

import Link from "next/link";
import { useActionState } from "react";
import { signupAction } from "@/app/actions";
import { AuthCard, Field } from "@/components/AuthCard";

export default function SignupPage() {
  const [state, action, pending] = useActionState(signupAction, null);
  return (
    <AuthCard title="Create your workspace" sub="Email and a password. Then connect Google Calendar in onboarding.">
      <form action={action} className="space-y-3">
        <Field label="Name" name="name" type="text" placeholder="Maya Chen" />
        <Field label="Email" name="email" type="email" placeholder="you@company.com" />
        <Field label="Password" name="password" type="password" placeholder="At least 6 characters" />
        {state?.error && <p className="text-[13px] text-ember">{state.error}</p>}
        <button type="submit" disabled={pending} className="cta w-full py-2.5 text-[14px] disabled:opacity-60">
          {pending ? "Creating…" : "Get started free"}
        </button>
      </form>
      <p className="mt-5 text-center text-[13px] text-paper-dim">
        Already have an account?{" "}
        <Link href="/login" className="text-cyan">
          Log in
        </Link>
      </p>
    </AuthCard>
  );
}
