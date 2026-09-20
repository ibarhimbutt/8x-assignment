import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { OnboardingFlow } from "@/components/OnboardingFlow";

export default async function OnboardingPage() {
  const session = await getSession();
  if (!session) redirect("/login");
  return <OnboardingFlow name={session.name} />;
}
