import { NextResponse } from "next/server";
import { sttConfigured, transcribeAudio } from "@/lib/stt";

export const runtime = "nodejs";

export async function POST(req: Request) {
  if (!sttConfigured()) {
    return NextResponse.json({
      text: "",
      provider: "none",
      configured: false,
      error: "No speech-to-text key is configured. Use browser speech or demo capture mode.",
    });
  }
  const form = await req.formData();
  const file = form.get("audio");
  if (!(file instanceof Blob) || file.size < 200) {
    return NextResponse.json({ text: "", provider: "none", configured: true });
  }
  const bytes = await file.arrayBuffer();
  const result = await transcribeAudio(bytes, file.type || "audio/webm");
  return NextResponse.json({ ...result, configured: true });
}
