"use server";

import { redirect } from "next/navigation";
import { authenticate, clearSession, markOnboarded, register, writeSession } from "@/lib/auth";
import { askMeetings, type AskResult } from "@/lib/ai";

export async function loginAction(
  _prev: { error?: string } | null,
  formData: FormData,
): Promise<{ error?: string }> {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "/dashboard");
  const result = await authenticate(email, password);
  if ("error" in result) return { error: result.error };
  await writeSession(result);
  redirect(result.onboarded ? next || "/dashboard" : "/onboarding");
}

export async function demoLoginAction(): Promise<void> {
  const result = await authenticate("maya@quorum.demo", "quorum-demo");
  if ("error" in result) throw new Error(result.error);
  await writeSession(result);
  redirect("/dashboard");
}

export async function signupAction(
  _prev: { error?: string } | null,
  formData: FormData,
): Promise<{ error?: string }> {
  const result = await register(
    String(formData.get("name") ?? ""),
    String(formData.get("email") ?? ""),
    String(formData.get("password") ?? ""),
  );
  if ("error" in result) return { error: result.error };
  await writeSession(result);
  redirect("/onboarding");
}

export async function logoutAction() {
  await clearSession();
  redirect("/");
}

export async function finishOnboardingAction() {
  await markOnboarded();
  redirect("/dashboard");
}

export async function askAction(formData: FormData): Promise<AskResult> {
  const q = String(formData.get("q") ?? "").trim();
  if (q.length < 4) {
    return {
      source: "seed",
      answer: "Ask a full question — try pricing, onboarding, or October 14.",
      citations: [],
    };
  }
  return askMeetings(q);
}
