export type DemoLine = { t: number; speaker: "you" | "speaker"; text: string };

export const DEMO_LIVE_SCRIPT: DemoLine[] = [
  { t: 2, speaker: "you", text: "Thanks for hopping on — I have live notes running in Quorum." },
  { t: 8, speaker: "speaker", text: "Perfect. Let's start with onboarding. Activation is still the bottleneck." },
  { t: 16, speaker: "you", text: "Sixty-two percent of trials never invite a second person. That's the empty-home problem." },
  { t: 24, speaker: "speaker", text: "If we ship a seeded workspace this week, sales can stop discounting the bot." },
  { t: 32, speaker: "you", text: "Agreed. I'll send the waitlist copy by Friday and we delay the public launch." },
  { t: 40, speaker: "speaker", text: "Decision: no October 14 public launch. Private walkthrough for Latticework instead." },
  { t: 48, speaker: "you", text: "Chris will send the Northwind clip today. No pricing conversation until they watch it." },
  { t: 56, speaker: "speaker", text: "Any risk I should flag? Engineering still needs the calendar gate removed." },
  { t: 64, speaker: "you", text: "That's the work. I'll file the ticket after this call." },
  { t: 72, speaker: "speaker", text: "Great. Recap: seeded home, clip share, launch delay, Latticework Friday." },
];
