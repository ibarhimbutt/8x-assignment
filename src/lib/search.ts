import { meetings } from "@/data/meetings";
import { person } from "@/data/people";
import type { Meeting, Utterance } from "@/data/types";

export type SearchHit = {
  meeting: Meeting;
  utterance: Utterance;
  speakerName: string;
  snippet: string;
};

function snippetAround(text: string, q: string): string {
  const i = text.toLowerCase().indexOf(q);
  if (i < 0) return text.slice(0, 140);
  const start = Math.max(0, i - 42);
  const end = Math.min(text.length, i + q.length + 72);
  const prefix = start > 0 ? "…" : "";
  const suffix = end < text.length ? "…" : "";
  return prefix + text.slice(start, end) + suffix;
}

export function searchMeetings(query: string): SearchHit[] {
  const q = query.trim().toLowerCase();
  if (q.length < 2) return [];
  const hits: SearchHit[] = [];
  for (const meeting of meetings) {
    if (meeting.title.toLowerCase().includes(q) || (meeting.tag ?? "").toLowerCase().includes(q)) {
      const first = meeting.utterances[0];
      if (first) {
        hits.push({
          meeting,
          utterance: first,
          speakerName: person(first.speakerId).name,
          snippet: meeting.title,
        });
      }
    }
    for (const utterance of meeting.utterances) {
      if (!utterance.text.toLowerCase().includes(q)) continue;
      hits.push({
        meeting,
        utterance,
        speakerName: person(utterance.speakerId).name,
        snippet: snippetAround(utterance.text, q),
      });
    }
  }
  return hits.slice(0, 40);
}
