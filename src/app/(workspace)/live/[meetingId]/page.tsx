import { LiveMeeting } from "@/components/LiveMeeting";

export default async function LivePage({
  params,
  searchParams,
}: {
  params: Promise<{ meetingId: string }>;
  searchParams: Promise<{ title?: string; url?: string }>;
}) {
  const { meetingId } = await params;
  const sp = await searchParams;
  return (
    <LiveMeeting
      meetingId={meetingId}
      title={sp.title || "Live meeting"}
      meetUrl={sp.url}
    />
  );
}
