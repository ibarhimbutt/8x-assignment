import type { ActionStatus, Highlight, Meeting } from "@/data/types";

const ACTIONS = "quorum.actions";
const CAL = "quorum.calendar";
const SETTINGS = "quorum.settings";
const CAPTURED = "quorum.captured";

export type CalendarState = { google: boolean; microsoft: boolean };

export type SettingsState = {
  timezone: string;
  language: string;
  defaultTemplate: string;
  autoCapture: boolean;
  consent: boolean;
  summaryNotify: boolean;
  actionReminders: boolean;
};

const defaultSettings: SettingsState = {
  timezone: "America/Los_Angeles",
  language: "en",
  defaultTemplate: "general",
  autoCapture: true,
  consent: true,
  summaryNotify: true,
  actionReminders: true,
};

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function loadActionStatus(): Record<string, ActionStatus> {
  return read(ACTIONS, {});
}

export function saveActionStatus(id: string, status: ActionStatus): Record<string, ActionStatus> {
  const next = { ...loadActionStatus(), [id]: status };
  write(ACTIONS, next);
  return next;
}

export function loadCalendar(): CalendarState {
  return read(CAL, { google: false, microsoft: false });
}

export function saveCalendar(state: CalendarState) {
  write(CAL, state);
}

export function loadSettings(): SettingsState {
  return { ...defaultSettings, ...read(SETTINGS, {}) };
}

export function saveSettings(state: SettingsState) {
  write(SETTINGS, state);
}

export function loadCaptured(): Meeting[] {
  return read(CAPTURED, []);
}

export function saveCaptured(meetings: Meeting[]) {
  write(CAPTURED, meetings);
}

export function addCaptured(meeting: Meeting): Meeting[] {
  const next = [meeting, ...loadCaptured().filter((m) => m.id !== meeting.id)];
  saveCaptured(next);
  return next;
}

export function allLocalHighlights(meetingIds: string[]): { meetingId: string; highlight: Highlight }[] {
  const out: { meetingId: string; highlight: Highlight }[] = [];
  if (typeof window === "undefined") return out;
  for (const id of meetingIds) {
    try {
      const raw = localStorage.getItem(`quorum.highlights.${id}`);
      if (!raw) continue;
      const parsed = JSON.parse(raw) as Highlight[];
      for (const h of parsed) out.push({ meetingId: id, highlight: h });
    } catch {
      /* ignore */
    }
  }
  return out;
}
