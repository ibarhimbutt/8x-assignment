import type { Utterance } from "./types";

export function talk(
  prefix: string,
  rows: { s: string; t: number; d?: number; text: string }[],
): Utterance[] {
  return rows.map((row, i) => {
    const dur = row.d ?? Math.min(42, Math.max(8, Math.round(row.text.length / 12)));
    return {
      id: `${prefix}-${i + 1}`,
      speakerId: row.s,
      start: row.t,
      end: row.t + dur,
      text: row.text,
    };
  });
}
