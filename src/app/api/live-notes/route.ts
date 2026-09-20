import { NextResponse } from "next/server";
import { updateLiveNotes } from "@/lib/aiRouter";
import { emptyLiveNotes, type LiveNotes } from "@/data/types";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const body = (await req.json()) as {
    title?: string;
    transcriptDelta?: string;
    previous?: LiveNotes;
  };
  const transcript = (body.transcriptDelta ?? "").trim();
  if (transcript.length < 8) {
    return NextResponse.json({ notes: body.previous ?? emptyLiveNotes(), source: "none" });
  }
  const result = await updateLiveNotes({
    title: body.title || "Live meeting",
    transcriptDelta: transcript,
    previous: body.previous ?? emptyLiveNotes(),
  });
  return NextResponse.json(result);
}
