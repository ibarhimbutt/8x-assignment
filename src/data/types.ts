export type Platform = "zoom" | "meet" | "teams";

export type Person = {
  id: string;
  name: string;
  role: string;
  initials: string;
  hue: number;
};

export type Utterance = {
  id: string;
  speakerId: string;
  start: number;
  end: number;
  text: string;
};

export type ActionStatus = "open" | "progress" | "done";

export type ActionItem = {
  id: string;
  text: string;
  ownerId: string;
  due?: string;
  utteranceId?: string;
  status?: ActionStatus;
};

export type HighlightType = "decision" | "quote" | "risk" | "wow";

export type Highlight = {
  id: string;
  type: HighlightType;
  title: string;
  start: number;
  end: number;
  utteranceId: string;
};

export type SummaryTemplateId =
  | "general"
  | "standup"
  | "bant"
  | "product"
  | "cs"
  | "interview"
  | "oneonone"
  | "retro";

export const TEMPLATE_LABELS: Record<SummaryTemplateId, string> = {
  general: "General",
  standup: "Project update",
  bant: "Sales",
  product: "Product",
  cs: "Customer success",
  interview: "Interview",
  oneonone: "One-on-one",
  retro: "Retrospective",
};

export type Summary = {
  template: SummaryTemplateId;
  headline: string;
  sections: { title: string; bullets: string[] }[];
};

export type Meeting = {
  id: string;
  title: string;
  startedAt: string;
  duration: number;
  platform: Platform;
  attendeeIds: string[];
  utterances: Utterance[];
  summaries: Partial<Record<SummaryTemplateId, Summary>>;
  defaultTemplate: SummaryTemplateId;
  actionItems: ActionItem[];
  highlights: Highlight[];
  tag?: string;
  meetingUrl?: string;
  audioAvailable?: boolean;
};

export type CaptureStatus = "scheduled" | "ready" | "recording" | "processing" | "completed";

export type Upcoming = {
  id: string;
  title: string;
  startsAt: string;
  duration: number;
  platform: Platform;
  attendeeIds: string[];
  capture: boolean;
  meetingUrl?: string;
  attendees?: { email: string; name?: string }[];
  status?: CaptureStatus;
  source?: "google" | "demo";
};

export type LiveNotes = {
  keyPoints: string[];
  decisions: string[];
  actionItems: string[];
  questions: string[];
  topics: string[];
};

export function emptyLiveNotes(): LiveNotes {
  return { keyPoints: [], decisions: [], actionItems: [], questions: [], topics: [] };
}

export type CalendarEvent = {
  id: string;
  title: string;
  startsAt: string;
  duration: number;
  platform: Platform | "none";
  meetingUrl?: string;
  attendees: { email: string; name?: string }[];
  status: CaptureStatus;
  source: "google" | "demo";
};
