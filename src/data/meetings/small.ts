import type { Meeting } from "../types";
import { talk } from "../talk";

export const twoMinute: Meeting = {
  id: "self-call",
  title: "Maya / Jordan — 1:1, two minutes",
  startedAt: "2026-09-19T08:04:00.000Z",
  duration: 128,
  platform: "zoom",
  attendeeIds: ["maya", "jordan"],
  defaultTemplate: "oneonone",
  tag: "Internal",
  utterances: talk("s", [
    { s: "maya", t: 3, text: "Just two minutes. Are we still saying the bot is stubbed in the walkthrough?" },
    { s: "jordan", t: 18, text: "First thirty seconds. If I bury it, it looks like we failed to build it. If I lead with it, it looks like a choice." },
    { s: "maya", t: 42, text: "Good. I'll highlight that line after we hang up and send it to Dana." },
    { s: "jordan", t: 64, text: "Do it. Then I'm writing the script tonight. Home, search, clip, incognito." },
    { s: "maya", t: 88, text: "That's the call. Thanks." },
    { s: "jordan", t: 102, text: "Thanks. Quorum in a minute." },
  ]),
  summaries: {
    oneonone: {
      template: "oneonone",
      headline: "Bot stub is a line in the first thirty seconds of the walkthrough, not a footnote.",
      sections: [
        { title: "Today", bullets: ["Jordan writes the five-minute camera-on script.", "Maya highlights the stub line and sends it to Dana."] },
        { title: "Stuck", bullets: ["None."] },
      ],
    },
    standup: {
      template: "standup",
      headline: "Bot stub is a line in the first thirty seconds of the walkthrough, not a footnote.",
      sections: [
        { title: "Today", bullets: ["Jordan writes the five-minute camera-on script.", "Maya highlights the stub line and sends it to Dana."] },
        { title: "Stuck", bullets: ["None."] },
      ],
    },
    general: {
      template: "general",
      headline: "Short 1:1 confirming the walkthrough leads with the stubbed capture layer.",
      sections: [{ title: "Notes", bullets: ["Lead with the stub so it reads as a product choice.", "Demo path: home, search, clip, incognito."] }],
    },
  },
  actionItems: [
    { id: "s-a1", text: "Write the walkthrough script. Lead with the stub.", ownerId: "jordan", due: "Tonight", utteranceId: "s-4" },
    { id: "s-a2", text: "Highlight the stub line and send to Dana.", ownerId: "maya", due: "Today", utteranceId: "s-3" },
  ],
  highlights: [
    { id: "s-h1", type: "decision", title: "Lead with the stub", start: 18, end: 41, utteranceId: "s-2" },
  ],
};

export const standup: Meeting = {
  id: "eng-standup",
  title: "Engineering standup",
  startedAt: "2026-09-19T13:15:00.000Z",
  duration: 540,
  platform: "meet",
  attendeeIds: ["jordan", "sam", "elena", "kit"],
  defaultTemplate: "standup",
  tag: "Engineering",
  utterances: talk("st", [
    { s: "jordan", t: 4, text: "Standup. Yesterday, today, stuck. Sam first." },
    { s: "sam", t: 18, text: "Seed pack is a TypeScript module. Seven meetings. Deployed a preview last night with no env vars. It boots." },
    { s: "elena", t: 48, text: "Player locks to the transcript on the hour-long call. Seeking 41:12 lands on Dana's no-go. Waveform is generated, not a media file." },
    { s: "kit", t: 88, text: "I paired on search. 'Latticework' and 'empty state' both hit. I'm slower on the highlight plus-button, that's Elena." },
    { s: "jordan", t: 122, text: "Good. Nobody is building the bot. If I see a Zoom SDK in the diff I'm reverting it." },
    { s: "sam", t: 152, text: "No SDK. Calendar page is a fixture. Upcoming events with a capture toggle that doesn't call anyone." },
    { s: "elena", t: 188, text: "Blocked on nothing. I'll finish clip share this afternoon so Riley can send Latticework a link." },
    { s: "jordan", t: 224, text: "That's the meeting. Don't make it longer than this." },
  ]),
  summaries: {
    standup: {
      template: "standup",
      headline: "Seed deploys with no env. Player lock works at 41:12. Clip share is this afternoon. Bot stays out of the diff.",
      sections: [
        { title: "Done", bullets: ["Sam: seed + preview, zero env.", "Elena: hour-long seek works.", "Kit: keyword search hits."] },
        { title: "Today", bullets: ["Elena: public clip page for Riley.", "Nobody: Zoom bot."] },
        { title: "Stuck", bullets: ["None. Zoom SDK is a revert."] },
      ],
    },
    general: {
      template: "general",
      headline: "Engineering is on the meeting page and seed. Capture remains stubbed on purpose.",
      sections: [{ title: "Notes", bullets: ["Preview boots without secrets.", "Calendar is a fixture with a capture toggle."] }],
    },
  },
  actionItems: [
    { id: "st-a1", text: "Finish public clip share this afternoon.", ownerId: "elena", due: "Today", utteranceId: "st-7" },
  ],
  highlights: [
    { id: "st-h1", type: "decision", title: "Zoom SDK is a revert", start: 122, end: 150, utteranceId: "st-5" },
  ],
};

export const latticework: Meeting = {
  id: "latticework-discovery",
  title: "Latticework discovery — Noor Rahman",
  startedAt: "2026-09-16T16:30:00.000Z",
  duration: 1510,
  platform: "zoom",
  attendeeIds: ["riley", "maya", "noor", "alex"],
  defaultTemplate: "bant",
  tag: "Sales",
  utterances: talk("lw", [
    { s: "riley", t: 6, text: "Noor, thanks for the time. Maya's here from product. We wanted to hear how Latticework runs customer calls today." },
    { s: "noor", t: 32, text: "We record Zoom because we have to. Nobody watches the hour. My VP asked for the three minutes where the customer agreed to migrate. I sent the whole file. She didn't open it." },
    { s: "maya", t: 78, text: "That's exactly the hole. Clip share — a link to the moment, not the meeting." },
    { s: "noor", t: 108, text: "If my VP can watch three minutes instead of sixty, you'll get the seat. I'm not buying another bot that sits in the waiting room." },
    { s: "alex", t: 152, text: "Budget-wise, they have forty-eight thousand left in the enablement line this year. Unused Gong seats are being clawed back." },
    { s: "noor", t: 198, text: "Gong is fine for managers. It's heavy for CS. I need search that a success manager will actually use on a Thursday." },
    { s: "riley", t: 244, text: "Authority — you and your VP. Timeline?" },
    { s: "noor", t: 268, text: "Before year end or we lose the budget. I'd do a private Friday if the clip link works in an incognito window. I will check." },
    { s: "maya", t: 318, text: "It will. No login. That's a requirement on our side too." },
    { s: "noor", t: 348, text: "Need is simple. We run eight-person customer reviews that go an hour. If your product only looks good on a two-minute 1:1, it's a toy." },
    { s: "riley", t: 402, text: "We'll seed an hour-long eight-person call and send you a clip from a launch review. Friday." },
    { s: "noor", t: 444, text: "Send it. If I can forward it to Lina without creating her an account, we're in a real conversation." },
    { s: "maya", t: 488, text: "You shouldn't need an account to watch a clip. That's the whole point." },
    { s: "noor", t: 524, text: "Good. I have to jump. Riley, Friday. Don't bring a bot." },
  ]),
  summaries: {
    bant: {
      template: "bant",
      headline: "Latticework will buy if a VP can watch a three-minute clip without an account, before year end, against $48k leftover enablement budget.",
      sections: [
        { title: "Budget", bullets: ["$48,000 left in enablement this year.", "Gong seats being clawed back — they will spend it somewhere."] },
        { title: "Authority", bullets: ["Noor (founder) plus VP Lina, who will not sit through a sixty-minute file."] },
        { title: "Need", bullets: ["Clip of the moment, not the meeting.", "Search a CS manager will use.", "Must feel true on an eight-person hour-long review, not a 1:1."] },
        { title: "Timeline", bullets: ["Before year end or the budget disappears.", "Private Friday demo if incognito clip share works."] },
      ],
    },
    general: {
      template: "general",
      headline: "Noor will evaluate Quorum on clip-share and the hour-long call. Do not bring a bot to Friday.",
      sections: [
        { title: "What they said", bullets: ["Nobody watches the hour.", "Gong is for managers, too heavy for CS.", "A login wall on a clip is a no."] },
        { title: "Next", bullets: ["Riley sends a clip from the launch review.", "Friday private walkthrough."] },
      ],
    },
    product: {
      template: "product",
      headline: "Discovery confirms the share page and the eight-person marathon are the product. Capture bot is a liability in this deal.",
      sections: [
        { title: "Jobs to be done", bullets: ["Forward a moment to a VP.", "Find an agreement in an hour-long customer review."] },
        { title: "Anti-jobs", bullets: ["Another waiting-room bot.", "Creating accounts for viewers."] },
      ],
    },
  },
  actionItems: [
    { id: "lw-a1", text: "Send Latticework a public clip from the launch review before Friday.", ownerId: "riley", due: "Thu", utteranceId: "lw-11" },
    { id: "lw-a2", text: "Private Friday walkthrough. No bot.", ownerId: "riley", due: "Fri", utteranceId: "lw-14" },
  ],
  highlights: [
    { id: "lw-h1", type: "quote", title: "Three minutes instead of sixty", start: 108, end: 150, utteranceId: "lw-4" },
    { id: "lw-h2", type: "wow", title: "$48k leftover budget", start: 152, end: 196, utteranceId: "lw-5" },
    { id: "lw-h3", type: "decision", title: "Friday, no bot, incognito clip", start: 268, end: 316, utteranceId: "lw-8" },
  ],
};

export const csEscalation: Meeting = {
  id: "northwind-escalation",
  title: "Northwind CS escalation",
  startedAt: "2026-09-17T11:00:00.000Z",
  duration: 1260,
  platform: "teams",
  attendeeIds: ["chris", "maya", "alex"],
  defaultTemplate: "cs",
  tag: "Customer success",
  utterances: talk("cs", [
    { s: "chris", t: 5, text: "Northwind's success manager is angry. They think we recorded a call and then sent them an empty workspace. Which, to be fair, we did." },
    { s: "maya", t: 42, text: "The summary hit the inbox and the home was blank. That's the bug Dana quoted in the launch review." },
    { s: "alex", t: 78, text: "They're on annual. I can keep the seat if we show them a living home this week and a clip of the migration date from their last review." },
    { s: "chris", t: 128, text: "Migration date was March 3. It's in the transcript. They just couldn't find it because search was a filter on titles, not utterances." },
    { s: "maya", t: 176, text: "That's on us. Keyword search across lines, jump to the timestamp. I'll make sure the seed has 'migration' in it." },
    { s: "chris", t: 220, text: "I'll call them after this and send the moment, not an apology essay." },
  ]),
  summaries: {
    cs: {
      template: "cs",
      headline: "Northwind almost churned on an empty home. Keep the seat by sending the March 3 migration clip and shipping utterance search.",
      sections: [
        { title: "Issue", bullets: ["Empty workspace after a recorded call.", "Could not find the migration date because search was title-only."] },
        { title: "Save path", bullets: ["Send the moment, not a long apology.", "Show a living home this week."] },
      ],
    },
    general: {
      template: "general",
      headline: "Northwind almost churned on an empty home. Keep the seat by sending the March 3 migration clip and shipping utterance search.",
      sections: [
        { title: "Issue", bullets: ["Empty workspace after a recorded call.", "Could not find the migration date because search was title-only."] },
        { title: "Save path", bullets: ["Send the moment, not a long apology.", "Show a living home this week."] },
      ],
    },
  },
  actionItems: [
    { id: "cs-a1", text: "Call Northwind and send the March 3 migration moment.", ownerId: "chris", due: "Today", utteranceId: "cs-6" },
  ],
  highlights: [
    { id: "cs-h1", type: "risk", title: "Empty home after a recorded call", start: 5, end: 40, utteranceId: "cs-1" },
  ],
};

export const critique: Meeting = {
  id: "share-page-critique",
  title: "Share page critique",
  startedAt: "2026-09-15T15:45:00.000Z",
  duration: 980,
  platform: "meet",
  attendeeIds: ["priya", "elena", "maya"],
  defaultTemplate: "product",
  tag: "Design",
  utterances: talk("cr", [
    { s: "priya", t: 7, text: "The share page cannot look like a logged-in app with the nav chopped off. It's a postcard. One moment, one waveform, two lines of context." },
    { s: "elena", t: 48, text: "I'll drop the app chrome. Type is Newsreader for the quote, IBM Plex Mono for the timestamp. Brass play button." },
    { s: "maya", t: 88, text: "If this page asks you to sign in, we failed the assignment. Failed the product, too." },
    { s: "priya", t: 122, text: "Incognito test is the QA. Send the link to yourself in an anonymous window before you send it to Riley." },
  ]),
  summaries: {
    product: {
      template: "product",
      headline: "Share page is a postcard, not a cropped app. Incognito is the QA.",
      sections: [
        { title: "Direction", bullets: ["No app chrome.", "Quote + waveform + two lines of context.", "Sign-in on this page is a ship-blocker."] },
      ],
    },
    general: {
      template: "general",
      headline: "Design locked the clip page as a public postcard with an incognito QA bar.",
      sections: [{ title: "Notes", bullets: ["Newsreader for the quote.", "Riley doesn't get the link until incognito works."] }],
    },
  },
  actionItems: [
    { id: "cr-a1", text: "QA clip links in an anonymous window before sending to sales.", ownerId: "elena", due: "Thu", utteranceId: "cr-4" },
  ],
  highlights: [
    { id: "cr-h1", type: "decision", title: "Sign-in on the share page is a fail", start: 88, end: 118, utteranceId: "cr-3" },
  ],
};

export const hiring: Meeting = {
  id: "hiring-loop-kit",
  title: "Hiring loop — Kit Alvarez",
  startedAt: "2026-09-12T10:00:00.000Z",
  duration: 2100,
  platform: "zoom",
  attendeeIds: ["jordan", "elena", "kit"],
  defaultTemplate: "interview",
  tag: "Interview",
  utterances: talk("hr", [
    { s: "jordan", t: 10, text: "Kit, thanks for coming back. We want someone who will delete a Zoom SDK, not add one." },
    { s: "kit", t: 38, text: "I ripped a bot out of a previous job. The meeting page is the product. Capture is a hose. Most teams drown in the hose." },
    { s: "elena", t: 78, text: "How would you keep an hour-long eight-person transcript snappy?" },
    { s: "kit", t: 104, text: "Don't mount sixty minutes of video. Virtualize the list. The active line is a number, not a DOM of two thousand spans." },
    { s: "jordan", t: 148, text: "That's the offer conversation, not this one, but yes. We'd have you on search and the meeting list first." },
    { s: "kit", t: 188, text: "I'm in. I already don't want to build the bot." },
  ]),
  summaries: {
    interview: {
      template: "interview",
      headline: "Kit understands the product: the meeting page, not the hose. Strong yes from Jordan and Elena.",
      sections: [
        { title: "Signal", bullets: ["Has removed a recording bot in production.", "Talked about virtualizing the transcript, not decorating it."] },
        { title: "Next", bullets: ["Offer conversation separately.", "First work: search and the meeting list."] },
      ],
    },
    general: {
      template: "general",
      headline: "Kit understands the product: the meeting page, not the hose. Strong yes from Jordan and Elena.",
      sections: [
        { title: "Signal", bullets: ["Has removed a recording bot in production.", "Talked about virtualizing the transcript, not decorating it."] },
        { title: "Next", bullets: ["Offer conversation separately.", "First work: search and the meeting list."] },
      ],
    },
  },
  actionItems: [
    { id: "hr-a1", text: "Move Kit to an offer conversation.", ownerId: "jordan", due: "This week", utteranceId: "hr-5" },
  ],
  highlights: [
    { id: "hr-h1", type: "quote", title: "Capture is a hose", start: 38, end: 76, utteranceId: "hr-2" },
  ],
};
