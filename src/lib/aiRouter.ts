import type { LiveNotes } from "@/data/types";
import { emptyLiveNotes } from "@/data/types";

function env(name: string): string | undefined {
  const v = process.env[name];
  return v && v.trim() ? v.trim() : undefined;
}

export type ChatResult = { text: string; source: "agent-router" | "gemini" | "none" };

export function aiConfigured(): boolean {
  return Boolean(
    (env("AGENT_ROUTER_API_KEY") && env("AGENT_ROUTER_BASE_URL")) || env("GEMINI_API_KEY"),
  );
}

async function chat(system: string, user: string): Promise<ChatResult> {
  const routerKey = env("AGENT_ROUTER_API_KEY");
  const routerBase = env("AGENT_ROUTER_BASE_URL");
  const model = env("AGENT_ROUTER_MODEL") || "gpt-4o-mini";

  if (routerKey && routerBase) {
    try {
      const res = await fetch(`${routerBase.replace(/\/$/, "")}/chat/completions`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${routerKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model,
          temperature: 0.2,
          messages: [
            { role: "system", content: system },
            { role: "user", content: user },
          ],
        }),
      });
      if (res.ok) {
        const json = (await res.json()) as {
          choices?: { message?: { content?: string } }[];
        };
        const text = json.choices?.[0]?.message?.content?.trim();
        if (text) return { text, source: "agent-router" };
      }
    } catch {
      /* fall through */
    }
  }

  const gemini = env("GEMINI_API_KEY");
  if (gemini) {
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${gemini}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: `${system}\n\n${user}` }] }],
          }),
        },
      );
      if (res.ok) {
        const json = (await res.json()) as {
          candidates?: { content?: { parts?: { text?: string }[] } }[];
        };
        const text = json.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
        if (text) return { text, source: "gemini" };
      }
    } catch {
      /* fall through */
    }
  }

  return { text: "", source: "none" };
}

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((x): x is string => typeof x === "string").map((s) => s.trim()).filter(Boolean);
}

export function emptyNotes(): LiveNotes {
  return emptyLiveNotes();
}

export function parseLiveNotes(raw: string, fallback: LiveNotes): LiveNotes {
  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}");
  if (start < 0 || end <= start) return fallback;
  try {
    const json = JSON.parse(raw.slice(start, end + 1)) as Record<string, unknown>;
    return {
      keyPoints: asStringArray(json.keyPoints),
      decisions: asStringArray(json.decisions),
      actionItems: asStringArray(json.actionItems),
      questions: asStringArray(json.questions),
      topics: asStringArray(json.topics),
    };
  } catch {
    return fallback;
  }
}

export function heuristicNotes(transcript: string, previous: LiveNotes): LiveNotes {
  const lines = transcript
    .split(/\n|(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 18);
  const actionItems = lines.filter((s) => /\b(i'll|we'll|will|let's|can you|please|follow up|send|schedule)\b/i.test(s)).slice(0, 6);
  const decisions = lines.filter((s) => /\b(decid|agreed|going with|won't|will not|unanimous|ship|cut)\b/i.test(s)).slice(0, 5);
  const questions = lines.filter((s) => s.includes("?")).slice(0, 5);
  const keyPoints = lines.slice(0, 6);
  const topics = Array.from(
    new Set(
      transcript
        .toLowerCase()
        .match(/\b(onboarding|pricing|roadmap|activation|launch|budget|security|hiring|design|engineering)\b/g) ?? [],
    ),
  );
  return {
    keyPoints: unique([...previous.keyPoints, ...keyPoints]).slice(-8),
    decisions: unique([...previous.decisions, ...decisions]).slice(-6),
    actionItems: unique([...previous.actionItems, ...actionItems]).slice(-8),
    questions: unique([...previous.questions, ...questions]).slice(-6),
    topics: unique([...previous.topics, ...topics]).slice(-8),
  };
}

function unique(items: string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const item of items) {
    const k = item.toLowerCase();
    if (seen.has(k)) continue;
    seen.add(k);
    out.push(item);
  }
  return out;
}

const NOTES_SYSTEM = `You extract meeting intelligence. Return JSON only:
{"keyPoints":[],"decisions":[],"actionItems":[],"questions":[],"topics":[]}
Rules: only facts present in the transcript. No invented names, dates, or numbers. Keep bullets short.`;

export async function updateLiveNotes(opts: {
  transcriptDelta: string;
  previous: LiveNotes;
  title: string;
}): Promise<{ notes: LiveNotes; source: ChatResult["source"] }> {
  const fallback = heuristicNotes(opts.transcriptDelta, opts.previous);
  const result = await chat(
    NOTES_SYSTEM,
    `Meeting: ${opts.title}\nPrevious notes: ${JSON.stringify(opts.previous)}\nNew transcript:\n${opts.transcriptDelta.slice(-4000)}`,
  );
  if (!result.text) return { notes: fallback, source: "none" };
  return { notes: parseLiveNotes(result.text, fallback), source: result.source };
}

export async function generateSummary(transcript: string, title: string, template: string): Promise<string> {
  const result = await chat(
    `Write a ${template} meeting summary as JSON: {"headline":"","sections":[{"title":"","bullets":[""]}]}. Ground every bullet in the transcript. No invention.`,
    `Title: ${title}\nTranscript:\n${transcript.slice(-8000)}`,
  );
  return result.text;
}

export async function answerMeetingQuestion(question: string, context: string): Promise<ChatResult> {
  return chat(
    "Answer only from the provided meeting evidence. If it is not in the evidence, say so. Be concise.",
    `Evidence:\n${context}\n\nQuestion: ${question}`,
  );
}
