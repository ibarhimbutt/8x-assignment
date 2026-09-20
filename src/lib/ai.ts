import { meetings } from "@/data/meetings";
import { person } from "@/data/people";
import { formatClock } from "@/lib/format";
import { answerMeetingQuestion } from "@/lib/aiRouter";

export type AskCitation = {
  meetingId: string;
  title: string;
  t: number;
  excerpt: string;
};

export type AskResult = {
  answer: string;
  citations: AskCitation[];
  source: "gemini" | "seed" | "agent-router";
};

function seedAsk(question: string): AskResult {
  const q = question.toLowerCase();
  const citations: AskCitation[] = [];
  const push = (meetingId: string, t: number, excerpt: string) => {
    const m = meetings.find((x) => x.id === meetingId);
    if (!m) return;
    citations.push({ meetingId, title: m.title, t, excerpt });
  };

  if (q.includes("onboard") || q.includes("empty")) {
    push("q3-launch-review", 112, "62 percent of trial workspaces never invite a second person.");
    push("northwind-escalation", 5, "They think we recorded a call and then sent them an empty workspace.");
    return {
      source: "seed",
      citations,
      answer:
        "Onboarding and empty home are the conversion bug. Chris reported 62% of trials never invite a second person; three-quarters of those die on an empty meetings list. Northwind almost churned for the same reason. The team cut calendar-as-a-gate and is shipping a seeded home instead.",
    };
  }
  if (q.includes("pric") || q.includes("budget") || q.includes("48")) {
    push("latticework-discovery", 152, "Forty-eight thousand left in the enablement line this year.");
    push("latticework-discovery", 108, "If my VP can watch three minutes instead of sixty, you'll get the seat.");
    return {
      source: "seed",
      citations,
      answer:
        "Pricing objections this month are really clip-share objections. Latticework has $48k leftover enablement; Gong seats are being clawed back. Noor’s buy condition is a VP watching three minutes without an account — not a cheaper bot.",
    };
  }
  if (q.includes("decision") || q.includes("october") || q.includes("launch")) {
    push("q3-launch-review", 1714, "That's a unanimous no-go on October 14.");
    push("leadership-sync", 28, "Not. Waitlist. Private Latticework on Friday.");
    return {
      source: "seed",
      citations,
      answer:
        "October 14 public launch is a no-go. Dana called it in leadership, the eight-person review made it unanimous, and the board line is ‘delayed to protect conversion.’ Latticework gets a private Friday; Riley may paper one pilot on the same seeded workspace.",
    };
  }
  if (q.includes("sarah") || q.includes("maya") || q.includes("assigned") || q.includes("action")) {
    const items = meetings.flatMap((m) =>
      m.actionItems.filter((a) => a.ownerId === "maya" || a.ownerId === "chris").map((a) => ({ m, a })),
    );
    for (const row of items.slice(0, 4)) {
      push(row.m.id, 0, `${person(row.a.ownerId).name}: ${row.a.text}`);
    }
    return {
      source: "seed",
      citations,
      answer:
        "Open work on Maya: waitlist copy by Friday. On Chris: Northwind’s March 3 clip today, trial email tonight — clip, not a discount. Riley owns Latticework rebook and the decision clip.",
    };
  }
  if (q.includes("mobile") || q.includes("app")) {
    push("q3-launch-review", 2316, "Don't hide the transcript in a tab on a phone — that's the product.");
    return {
      source: "seed",
      citations,
      answer:
        "No decision to build a native mobile app. The meeting page must stack on small screens: player, summary, transcript — transcript stays visible, not buried in a tab.",
    };
  }

  push("q3-launch-review", 2464, "Search, clip, template, transcript. That's the product.");
  return {
    source: "seed",
    citations,
    answer:
      "I don't have a model in the path, so this is the seeded corpus. Try ‘onboarding’, ‘pricing’, ‘October 14’, or ‘action items for Maya’. Those are the questions this workspace was built to answer.",
  };
}

export async function askMeetings(question: string): Promise<AskResult> {
  const fallback = seedAsk(question);
  const context = fallback.citations.map((c) => `${c.title} @ ${formatClock(c.t)}: ${c.excerpt}`).join("\n");
  const result = await answerMeetingQuestion(question, context);
  if (!result.text) return fallback;
  const source = result.source === "agent-router" ? "agent-router" : result.source === "gemini" ? "gemini" : "seed";
  return { ...fallback, answer: result.text, source };
}

export function generateMeetingSummary() {
  return meetings[0]?.summaries.general ?? null;
}

export function generateActionItems() {
  return meetings.flatMap((m) => m.actionItems);
}
