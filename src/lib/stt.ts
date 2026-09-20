export type SttResult = {
  text: string;
  provider: "deepgram" | "openai" | "gemini" | "agent-router" | "none";
  error?: string;
};

function env(name: string): string | undefined {
  const v = process.env[name];
  return v && v.trim() ? v.trim() : undefined;
}

export function sttConfigured(): boolean {
  return Boolean(
    env("DEEPGRAM_API_KEY") ||
      env("STT_API_KEY") ||
      env("OPENAI_API_KEY") ||
      env("GEMINI_API_KEY") ||
      (env("AGENT_ROUTER_API_KEY") && env("AGENT_ROUTER_BASE_URL")),
  );
}

export async function transcribeAudio(bytes: ArrayBuffer, mime: string): Promise<SttResult> {
  const deepgram = env("DEEPGRAM_API_KEY") || env("STT_API_KEY");
  if (deepgram) {
    const res = await fetch("https://api.deepgram.com/v1/listen?model=nova-2&smart_format=true", {
      method: "POST",
      headers: {
        Authorization: `Token ${deepgram}`,
        "Content-Type": mime || "audio/webm",
      },
      body: bytes,
    });
    if (!res.ok) return { text: "", provider: "deepgram", error: "Deepgram rejected the audio chunk." };
    const json = (await res.json()) as {
      results?: { channels?: { alternatives?: { transcript?: string }[] }[] };
    };
    return {
      text: json.results?.channels?.[0]?.alternatives?.[0]?.transcript?.trim() ?? "",
      provider: "deepgram",
    };
  }

  const openai = env("OPENAI_API_KEY");
  if (openai) {
    const fd = new FormData();
    fd.set("model", "whisper-1");
    fd.set("file", new Blob([bytes], { type: mime || "audio/webm" }), "chunk.webm");
    const res = await fetch("https://api.openai.com/v1/audio/transcriptions", {
      method: "POST",
      headers: { Authorization: `Bearer ${openai}` },
      body: fd,
    });
    if (!res.ok) return { text: "", provider: "openai", error: "Whisper rejected the audio chunk." };
    const json = (await res.json()) as { text?: string };
    return { text: json.text?.trim() ?? "", provider: "openai" };
  }

  const gemini = env("GEMINI_API_KEY");
  if (gemini) {
    const b64 = Buffer.from(bytes).toString("base64");
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${gemini}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: "Transcribe this meeting audio. Return only the spoken words, no commentary." },
                { inline_data: { mime_type: mime || "audio/webm", data: b64 } },
              ],
            },
          ],
        }),
      },
    );
    if (!res.ok) return { text: "", provider: "gemini", error: "Gemini could not transcribe this chunk." };
    const json = (await res.json()) as {
      candidates?: { content?: { parts?: { text?: string }[] } }[];
    };
    return {
      text: json.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ?? "",
      provider: "gemini",
    };
  }

  const routerKey = env("AGENT_ROUTER_API_KEY");
  const routerBase = env("AGENT_ROUTER_BASE_URL");
  if (routerKey && routerBase) {
    const fd = new FormData();
    fd.set("model", env("AGENT_ROUTER_STT_MODEL") || "whisper-1");
    fd.set("file", new Blob([bytes], { type: mime || "audio/webm" }), "chunk.webm");
    const res = await fetch(`${routerBase.replace(/\/$/, "")}/audio/transcriptions`, {
      method: "POST",
      headers: { Authorization: `Bearer ${routerKey}` },
      body: fd,
    });
    if (res.ok) {
      const json = (await res.json()) as { text?: string };
      return { text: json.text?.trim() ?? "", provider: "agent-router" };
    }
  }

  return {
    text: "",
    provider: "none",
    error: "No speech-to-text key is configured.",
  };
}
