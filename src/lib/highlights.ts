import type { Highlight, HighlightType } from "@/data/types";

const key = (meetingId: string) => `quorum.highlights.${meetingId}`;

export function loadLocalHighlights(meetingId: string): Highlight[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(key(meetingId));
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Highlight[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveLocalHighlight(meetingId: string, highlight: Highlight): Highlight[] {
  const next = [...loadLocalHighlights(meetingId), highlight];
  localStorage.setItem(key(meetingId), JSON.stringify(next));
  return next;
}

export function newHighlight(opts: {
  type: HighlightType;
  title: string;
  start: number;
  end: number;
  utteranceId: string;
}): Highlight {
  return {
    id: `local-${Date.now()}`,
    ...opts,
  };
}
