# Capture test — 8x assignment

Automatic prompt/response logging is working in this repo. Two Agent sessions, same project, two log files.

## How it works

Cursor hooks in `.cursor/hooks.json` run `python3 .cursor/hooks/capture.py` on:

- `beforeSubmitPrompt` — writes the user prompt
- `afterAgentResponse` / `stop` — writes the final assistant reply only (no tool calls, no thinking)

Logs land in `.agent-logs/` as one markdown file per session. Author is `ibrahimbutt`.

## Canaries

| Session | File | Prompt | Result |
|---|---|---|---|
| 1 `1297fe50` | `.agent-logs/2026-09-20_06-24-46_1297fe50-7097-4685-9795-92298de1488f.md` | `CAPTURE TEST — 8x assignment, Muhammad Ibrahim` | Prompt + matching response written |
| 2 `baf18b67` | `.agent-logs/2026-09-20_06-27-32_baf18b67-9efe-4523-9690-9b1a77148aaf.md` | `CAPTURE TEST 2 — 8x assignment, Muhammad Ibrahim` | Prompt written at send; this reply is the matching response |

Session 2 is a **new** conversation, not a continuation of session 1. Same hook, different `session_id`, new file. Capture is not session-local.

## Pass

- [x] Prompt appears in `.agent-logs/` immediately after send
- [x] Final assistant text is appended when the turn ends
- [x] A second Agent chat in this repo produces a second log file
- [x] Intermediate tool calls are not logged

Do not start product code until this file is in the repo. After that, say **go**.
