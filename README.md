# Quorum

A 15-hour rebuild of [Fathom](https://fathom.video) — AI meeting notes — for the 8x assignment.

**Capture is stubbed.** There is no Zoom/Meet/Teams bot. Meetings are seeded. A “Record” flow plays a sped-up two-minute 1:1, then opens the finished call.

The live site has **no login**. That is required: a stranger must open the link.

## What to click (walkthrough, under 5 minutes)

1. Home is a week of work, not an empty list. Open **Q3 launch review — go or no-go** (8 people, 62 minutes).
2. Press play. Click a transcript line around 28:34 (Dana: unanimous no-go). Player and transcript stay locked.
3. Switch summary templates: Product review → BANT → Stand-up. The copy changes.
4. Hover a line, press **+**, mark a highlight, **share**. Open the clip URL in a private window.
5. Search `Latticework` or `empty state`. Land on the utterance.
6. Calendar is a fixture. Record is the fake 2-minute capture.

Say the bot is stubbed in the first thirty seconds.

## Stack

Next.js App Router, TypeScript, Tailwind v4. Seed data in `src/data`. Highlights you add live in `localStorage`. No env vars.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Capture is stubbed. The empty list is impossible.

## Assignment logs

`.agent-logs/` is committed. See `CAPTURE-TEST.md`.
