import type { Person } from "./types";

export const people: Record<string, Person> = {
  maya: { id: "maya", name: "Maya Chen", role: "Product", initials: "MC", hue: 28 },
  jordan: { id: "jordan", name: "Jordan Hale", role: "Eng lead", initials: "JH", hue: 198 },
  priya: { id: "priya", name: "Priya Nair", role: "Design", initials: "PN", hue: 328 },
  sam: { id: "sam", name: "Sam Okonkwo", role: "Backend", initials: "SO", hue: 152 },
  elena: { id: "elena", name: "Elena Voss", role: "Frontend", initials: "EV", hue: 48 },
  chris: { id: "chris", name: "Chris Park", role: "Customer success", initials: "CP", hue: 268 },
  riley: { id: "riley", name: "Riley Cho", role: "Sales", initials: "RC", hue: 12 },
  dana: { id: "dana", name: "Dana Whitfield", role: "CEO", initials: "DW", hue: 220 },
  you: { id: "you", name: "You", role: "Host", initials: "YO", hue: 38 },
  alex: { id: "alex", name: "Alex Mbeki", role: "Account exec", initials: "AM", hue: 175 },
  noor: { id: "noor", name: "Noor Rahman", role: "Founder, Latticework", initials: "NR", hue: 210 },
  kit: { id: "kit", name: "Kit Alvarez", role: "Engineer", initials: "KA", hue: 90 },
};

export function person(id: string): Person {
  const p = people[id];
  if (p) return p;
  const hue = [...id].reduce((n, c) => n + c.charCodeAt(0), 0) % 360;
  const label = id.startsWith("speaker")
    ? id.replace(/^speaker-?/, "Speaker ").trim() || "Speaker"
    : id === "you"
      ? "You"
      : id.replace(/[-_]/g, " ");
  return {
    id,
    name: label.charAt(0).toUpperCase() + label.slice(1),
    role: "Participant",
    initials: label
      .split(" ")
      .map((w) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase(),
    hue,
  };
}
