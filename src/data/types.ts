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

export type ActionItem = {
  id: string;
  text: string;
  ownerId: string;
  due?: string;
  utteranceId?: string;
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

export type SummaryTemplateId = "general" | "standup" | "bant" | "product";

export const TEMPLATE_LABELS: Record<SummaryTemplateId, string> = {
  general: "General recap",
  standup: "Stand-up",
  bant: "Sales · BANT",
  product: "Product review",
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
};

export type Upcoming = {
  id: string;
  title: string;
  startsAt: string;
  duration: number;
  platform: Platform;
  attendeeIds: string[];
  capture: boolean;
};
