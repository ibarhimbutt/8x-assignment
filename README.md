# Quorum

A 15-hour rebuild of [Fathom](https://fathom.video) — AI meeting notes — for the 8x assignment.

Live: [temporary-turbo-nova-hkrr4kc.vercel.app](https://temporary-turbo-nova-hkrr4kc.vercel.app)  
Repo: [github.com/ibarhimbutt/8x-assignment](https://github.com/ibarhimbutt/8x-assignment)

**The capture layer uses explicit browser tab audio (`getDisplayMedia`) rather than an autonomous meeting bot.** That is an intentional product decision: the assignment allows stubbing capture; this build goes further with user-granted Meet/tab audio, live transcription when an STT key is present, and live AI notes.

The live site has a public landing page. The workspace requires an account. **Share clips stay public** — no login to watch a moment.

## Test account

```
email:    maya@quorum.demo
password: quorum-demo
```

Or click **Open demo workspace** / **Continue as Maya**.

## What to click (walkthrough, under 5 minutes)

1. Land, continue as Maya. Home is a week of work, not an empty list.
2. Open **Q3 Product Strategy** (8 people, ~62 minutes). Play. Click Dana at 28:34.
3. Calendar → Connect Google Calendar (real OAuth if keys are set; otherwise sample events labeled Demo).
4. **Start live notes** — share a Google Meet tab with audio. Live transcript + AI notes. Stop → processed meeting.
5. Hover a line, mark a highlight, share. Open `/share/…` logged out.
6. Search `pricing`. Ask meetings: “What pricing objections came up this month?”

## Architecture

- **Auth:** HMAC-signed httpOnly cookies. Signup stores a few users in a signed cookie so the demo boots with zero required env vars.
- **Google Calendar:** OAuth (`calendar.readonly`). Tokens in an httpOnly cookie. Meet links detected from `hangoutLink` / conference data. Token refresh included.
- **Capture:** User shares a tab. Audio chunks go to `/api/stt`. If no STT key, browser speech recognition, then a clearly labeled demo transcript while audio is still captured.
- **AI:** Agent Router if configured, else Gemini, else deterministic extraction from the transcript. Ask Meetings is grounded in stored evidence.
- **Share:** HMAC-free self-describing clip tokens. Public `/share/[token]`.
- **Data:** Seeded corpus in `src/data` (10 meetings, including 62-minute / 8-person Q3). Captured meetings persist in localStorage. Optional audio blob stays in-memory for the tab session.

## Stack

Next.js App Router, TypeScript, Tailwind v4, Lucide.

## Local

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env.local` as needed.

Google redirect URI: `http://localhost:3000/api/google/callback` (and the production origin equivalent).

## Honest limitations

- No Zoom/Meet/Teams bot that auto-joins.
- Tab audio requires Chrome (or another browser that can share tab audio) and the user to enable Share tab audio.
- Cloud STT and Agent Router need API keys. Without them, capture still works; notes fall back to heuristics / demo mode.
- Cookie sessions are not a multi-device user database. Supabase placeholders are in `.env.example`.
- Seeded meetings use a clock player, not Zoom media files. Live captures can play recorded audio in the same browser session.

## Assignment logs

`.agent-logs/` is committed. See `CAPTURE-TEST.md`.
