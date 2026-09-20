# Quorum

A 15-hour rebuild of [Fathom](https://fathom.video) — AI meeting notes — for the 8x assignment.

Repo: [github.com/ibarhimbutt/8x-assignment](https://github.com/ibarhimbutt/8x-assignment)

**The meeting capture/recording layer is simulated for this assignment.** This was an intentional product decision: spend the time on meeting intelligence and product experience, not a Zoom/Meet/Teams bot.

The live site has a public landing page. The workspace requires an account. **Share clips stay public** — no login to watch a moment.

## Test account

```
email:    maya@quorum.demo
password: quorum-demo
```

Or click **See how it works** / **Continue as Maya**.

## What to click (walkthrough, under 5 minutes)

1. Land, continue as Maya. Overview is a week of work, not an empty list.
2. Open **Q3 Product Strategy** (8 people, ~62 minutes).
3. Press play. Click Dana at 28:34 (unanimous no-go). Player and transcript stay locked. Switch templates.
4. Hover a line, press **+**, mark a highlight, **share**. Open the `/share/…` link in a private window.
5. Search `pricing` or `Latticework`. Ask meetings: “What pricing objections came up this month?”
6. Calendar connect is a simulation. Capture runs a fake pipeline, then opens a finished call.

Say the bot is stubbed in the first thirty seconds.

## Features

- Email/password auth, demo login, onboarding, protected workspace
- Dashboard, meetings library (filters), 10 seeded meetings
- Player + transcript lock, templates, action items, highlights
- Search across transcript / people / actions / highlights
- Ask meetings (Gemini if `GEMINI_API_KEY`, otherwise seeded answers)
- Public `/share/[token]` clips
- Simulated calendar OAuth and capture pipeline
- Settings stored locally

## Stack

Next.js App Router, TypeScript, Tailwind v4. Seed data in `src/data`. No database required to boot.

Auth is HMAC-signed httpOnly cookies (not Supabase). Signup persists a few users in a signed cookie so the demo deploys with **zero required env vars**. Swap in Supabase using the placeholders in `.env.example` when you have a project.

## Local

```bash
npm install
npm run dev
```

Optional `.env.local`:

```
AUTH_SECRET=
GEMINI_API_KEY=
```

## Mocked on purpose

- Zoom / Meet / Teams recording bot
- Google / Microsoft calendar OAuth
- Multi-device user database (cookie session)
- Real video files (the player is a clock)

## Assignment logs

`.agent-logs/` is committed. See `CAPTURE-TEST.md`.
