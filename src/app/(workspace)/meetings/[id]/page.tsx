import { meetings } from "@/data/meetings";
import { MeetingScreen } from "@/components/MeetingScreen";

export function generateStaticParams() {
  return meetings.map((m) => ({ id: m.id }));
}

export default async function MeetingPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ t?: string | string[] }>;
}) {
  const { id } = await params;
  const sp = await searchParams;
  const initialTime = Number(Array.isArray(sp.t) ? sp.t[0] : sp.t) || 0;
  return <MeetingScreen id={id} initialTime={initialTime} />;
}
