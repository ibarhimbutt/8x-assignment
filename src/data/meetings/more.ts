import type { Meeting } from "../types";
import { talk } from "../talk";

export const sprint: Meeting = {
  id: "sprint-planning",
  title: "Sprint planning — week of Sept 22",
  startedAt: "2026-09-19T15:00:00.000Z",
  duration: 1680,
  platform: "meet",
  attendeeIds: ["jordan", "sam", "elena", "kit", "maya"],
  defaultTemplate: "standup",
  tag: "Engineering",
  utterances: talk("sp", [
    { s: "jordan", t: 5, text: "Capacity first. Kit is ramping. Nobody is taking capture work. If it shows up in planning it gets cut." },
    { s: "maya", t: 38, text: "Product wants the share token live before Friday's Latticework walkthrough. That's the sprint goal, not a nice-to-have." },
    { s: "elena", t: 78, text: "I'll take share tokens and the meeting-page lock. I can split the highlight plus-button with Kit." },
    { s: "kit", t: 118, text: "I'll take search ranking — title hits first, then transcript, then action items. No embeddings." },
    { s: "sam", t: 158, text: "Seed stays TypeScript. If we add a table this week we will miss Friday." },
    { s: "jordan", t: 198, text: "Retro note: last sprint we almost pulled a Zoom SDK. Don't do that again." },
    { s: "maya", t: 238, text: "Demo script is Jordan's. Camera on, under five, stub in the first thirty seconds." },
    { s: "jordan", t: 278, text: "I'll time it tonight. That's the plan. Keep the board boring." },
  ]),
  summaries: {
    standup: {
      template: "standup",
      headline: "Sprint goal is public clip tokens before Friday. Capture stays out of the board.",
      sections: [
        { title: "Today", bullets: ["Elena: share tokens + player lock.", "Kit: search ranking.", "Jordan: walkthrough script."] },
        { title: "Stuck", bullets: ["None. Zoom SDK is still a revert."] },
      ],
    },
    retro: {
      template: "retro",
      headline: "Last sprint almost grew a recording bot. This sprint is share, search, and an honest stub.",
      sections: [
        { title: "Went well", bullets: ["Seed boots with no env.", "Hour-long seek works."] },
        { title: "Change", bullets: ["Keep capture off the board.", "Protect Friday as a date, not a vibe."] },
      ],
    },
    general: {
      template: "general",
      headline: "Engineering committed share tokens, search, and a five-minute walkthrough. No bot.",
      sections: [{ title: "Notes", bullets: ["Sprint goal is Latticework-ready clip share.", "Kit ramps on search, not capture."] }],
    },
  },
  actionItems: [
    { id: "sp-a1", text: "Ship share tokens before Friday.", ownerId: "elena", due: "Thu", utteranceId: "sp-3" },
    { id: "sp-a2", text: "Time the five-minute walkthrough tonight.", ownerId: "jordan", due: "Tonight", utteranceId: "sp-8" },
  ],
  highlights: [
    { id: "sp-h1", type: "decision", title: "Sprint goal is clip tokens, not capture", start: 38, end: 76, utteranceId: "sp-2" },
  ],
};

export const leadership: Meeting = {
  id: "leadership-sync",
  title: "Leadership sync",
  startedAt: "2026-09-18T11:00:00.000Z",
  duration: 1320,
  platform: "zoom",
  attendeeIds: ["dana", "maya", "riley", "jordan"],
  defaultTemplate: "general",
  tag: "Internal",
  utterances: talk("ld", [
    { s: "dana", t: 4, text: "I need a one-line for the board. Are we launching October 14 or not." },
    { s: "maya", t: 28, text: "Not. Waitlist. Private Latticework on Friday. That's the sentence." },
    { s: "riley", t: 58, text: "Sales can live with a waitlist if I can still demo a living home. I cannot demo an empty list." },
    { s: "jordan", t: 98, text: "Engineering will not sign October 14. The bot is not the reason. The empty state is." },
    { s: "dana", t: 138, text: "Fine. I'll tell the board we delayed to protect conversion, not because we failed to build a bot." },
    { s: "maya", t: 178, text: "Please use those words. 'We didn't ship a Zoom bot' sounds like a miss. 'We refused an empty home' sounds like taste." },
    { s: "riley", t: 228, text: "If Latticework says yes on Friday I want permission to paper a pilot without waiting for public launch." },
    { s: "dana", t: 268, text: "You have it. One pilot. No custom work. They use the same seeded workspace the rest of us will ship." },
  ]),
  summaries: {
    general: {
      template: "general",
      headline: "Board line: delay October 14 to protect conversion. Riley may paper one Latticework pilot on the same product.",
      sections: [
        { title: "Decisions", bullets: ["Public launch is a waitlist.", "One pilot, no custom work.", "Frame the delay as taste, not a missing bot."] },
      ],
    },
    product: {
      template: "product",
      headline: "Leadership backed the empty-state diagnosis. Pilot is the same workspace, not a fork.",
      sections: [{ title: "Implications", bullets: ["No one-off Latticework build.", "Seeded home is the product we sell."] }],
    },
  },
  actionItems: [
    { id: "ld-a1", text: "Board note: delayed to protect conversion, not because the bot is missing.", ownerId: "dana", due: "Today", utteranceId: "ld-5" },
    { id: "ld-a2", text: "Paper a Latticework pilot on the same seeded workspace if Friday lands.", ownerId: "riley", due: "Fri", utteranceId: "ld-8" },
  ],
  highlights: [
    { id: "ld-h1", type: "quote", title: "Refused an empty home", start: 178, end: 226, utteranceId: "ld-6" },
    { id: "ld-h2", type: "decision", title: "One pilot, no custom work", start: 268, end: 310, utteranceId: "ld-8" },
  ],
};

export const oneOnOne: Meeting = {
  id: "maya-chris-1on1",
  title: "Maya / Chris — 1:1",
  startedAt: "2026-09-17T16:30:00.000Z",
  duration: 900,
  platform: "teams",
  attendeeIds: ["maya", "chris"],
  defaultTemplate: "oneonone",
  tag: "Internal",
  utterances: talk("oo", [
    { s: "maya", t: 6, text: "How's Northwind, really." },
    { s: "chris", t: 18, text: "They're still mad, but they're mad in a useful way. They want the March 3 clip, not a discount." },
    { s: "maya", t: 52, text: "Good. Don't trade price for a product bug. Send the moment today." },
    { s: "chris", t: 82, text: "I will. Also: CS is going to live in search. If 'churn' and 'empty home' don't hit, I look like I don't know my book." },
    { s: "maya", t: 124, text: "They hit. Try them after this. Anything I should take off your plate this week?" },
    { s: "chris", t: 154, text: "The trial email. I'll draft it, you can tone-check. I don't want it to sound like we vanished." },
    { s: "maya", t: 192, text: "Send me the draft tonight. You're doing the hard customer work. I won't add a bot-shaped project on top." },
  ]),
  summaries: {
    oneonone: {
      template: "oneonone",
      headline: "Chris keeps Northwind with a clip, not a discount. Trial email tonight; search is how CS will work.",
      sections: [
        { title: "Support", bullets: ["Maya stays off extra projects so CS can save the seat."] },
        { title: "Commitments", bullets: ["Chris: March 3 clip today, trial email tonight.", "Maya: tone-check the email."] },
      ],
    },
    general: {
      template: "general",
      headline: "Northwind wants the moment, not a discount. CS will live in search.",
      sections: [{ title: "Notes", bullets: ["Don't trade price for the empty-home bug.", "Trial email must not sound like we disappeared."] }],
    },
  },
  actionItems: [
    { id: "oo-a1", text: "Send Northwind the March 3 clip today. No discount.", ownerId: "chris", due: "Today", utteranceId: "oo-3" },
    { id: "oo-a2", text: "Draft the trial email for Maya to tone-check.", ownerId: "chris", due: "Tonight", utteranceId: "oo-6" },
  ],
  highlights: [
    { id: "oo-h1", type: "decision", title: "Clip, not a discount", start: 52, end: 80, utteranceId: "oo-3" },
  ],
};
