import type { Meeting, Upcoming } from "../types";
import q3Review from "./q3-review";
import {
  twoMinute,
  standup,
  latticework,
  csEscalation,
  critique,
  hiring,
} from "./small";

export const meetings: Meeting[] = [
  q3Review,
  twoMinute,
  standup,
  latticework,
  csEscalation,
  critique,
  hiring,
].sort((a, b) => (a.startedAt < b.startedAt ? 1 : -1));

export function getMeeting(id: string): Meeting | undefined {
  return meetings.find((m) => m.id === id);
}

export const upcoming: Upcoming[] = [
  {
    id: "up-latticework",
    title: "Latticework private walkthrough",
    startsAt: "2026-09-25T15:00:00.000Z",
    duration: 2700,
    platform: "zoom",
    attendeeIds: ["riley", "maya", "jordan", "noor"],
    capture: true,
  },
  {
    id: "up-waitlist",
    title: "Waitlist copy review",
    startsAt: "2026-09-22T09:30:00.000Z",
    duration: 1800,
    platform: "meet",
    attendeeIds: ["maya", "dana", "priya"],
    capture: true,
  },
  {
    id: "up-1on1",
    title: "Maya / Chris 1:1",
    startsAt: "2026-09-21T12:00:00.000Z",
    duration: 1500,
    platform: "teams",
    attendeeIds: ["maya", "chris"],
    capture: false,
  },
];
