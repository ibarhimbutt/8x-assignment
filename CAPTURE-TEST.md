# Capture test — 8x assignment

## 1. Tool and model

- **Tool:** Cursor
- **Model:** Cursor Grok 4.6 (hook payload slug: `cursor-grok-4.6-high-fast`). Same model plans and executes in these sessions.

## 2. Mechanism and config

Cursor native hooks, not a “remember to log” rule.

- Project config: [`.cursor/hooks.json`](.cursor/hooks.json)
- Script: [`.cursor/hooks/capture.py`](.cursor/hooks/capture.py)
- Also loaded from user config: `~/.cursor/hooks.json` (same script, absolute path)

Events:

- `beforeSubmitPrompt` — prompt, verbatim
- `afterAgentResponse` + `stop` — final assistant text only (no thinking, no tool calls)

Output directory: [`.agent-logs/`](.agent-logs/) (not gitignored).

## 3. Log files the canaries landed in

- Session 1: [`.agent-logs/2026-09-20_06-24-46_1297fe50-7097-4685-9795-92298de1488f.md`](.agent-logs/2026-09-20_06-24-46_1297fe50-7097-4685-9795-92298de1488f.md)
- Session 2: [`.agent-logs/2026-09-20_06-27-32_baf18b67-9efe-4523-9690-9b1a77148aaf.md`](.agent-logs/2026-09-20_06-27-32_baf18b67-9efe-4523-9690-9b1a77148aaf.md)

Session 2 is a new Agent chat in the same repo. Different `session_id`, new file. The hook is not session-local.

## 4. Canary entries, pasted raw

### Session 1 — prompt

```
[LOG_ENTRY type=PROMPT num=1 session=1297fe50]
timestamp: 2026-09-20T06:24:46.256Z
model: cursor-grok-4.6-high-fast

CAPTURE TEST — 8x assignment, Muhammad Ibrahim
```

### Session 1 — response

```
[LOG_ENTRY type=RESPONSE num=1 session=1297fe50]
timestamp: 2026-09-20T06:25:04.417Z
model: cursor-grok-4.6-high-fast

**CAPTURE TEST PASS (session 1)** — Muhammad Ibrahim.

The prompt is in `.agent-logs/2026-09-20_06-24-46_1297fe50-7097-4685-92298de1488f.md` as:

```
[LOG_ENTRY type=PROMPT num=1 session=1297fe50]
timestamp: 2026-09-20T06:24:46.256Z
model: cursor-grok-4.6-high-fast

CAPTURE TEST — 8x assignment, Muhammad Ibrahim
```

This reply is the matching response. When the turn ends, `afterAgentResponse` / `stop` should append it automatically.

**Next:** open a **new** Agent chat in this same `8x-assignment` repo (not this thread) and send:

`CAPTURE TEST 2 — 8x assignment, Muhammad Ibrahim`

That proves the hook is not session-local. I will then write `CAPTURE-TEST.md` and commit the logs. No Fathom work until that second canary lands.
```

### Session 2 — prompt

```
[LOG_ENTRY type=PROMPT num=1 session=baf18b67]
timestamp: 2026-09-20T06:27:32.475Z
model: cursor-grok-4.6-high-fast

CAPTURE TEST 2 — 8x assignment, Muhammad Ibrahim
```

### Session 2 — response

```
[LOG_ENTRY type=RESPONSE num=1 session=baf18b67]
timestamp: 2026-09-20T06:28:24.311Z
model: cursor-grok-4.6-high-fast

**CAPTURE TEST 2 PASS (session 2)** — Muhammad Ibrahim.

The hook is not session-local. This chat is a new conversation (`baf18b67`), and the prompt is already in `.agent-logs/2026-09-20_06-27-32_baf18b67-9efe-4523-9690-9b1a77148aaf.md`:

```
[LOG_ENTRY type=PROMPT num=1 session=baf18b67]
timestamp: 2026-09-20T06:27:32.475Z
model: cursor-grok-4.6-high-fast

CAPTURE TEST 2 — 8x assignment, Muhammad Ibrahim
```

This reply is the matching response. When the turn ends, `afterAgentResponse` / `stop` will append it automatically.

Evidence is in `CAPTURE-TEST.md`. Both session logs and that file are committed on `main` (`315ad24`).

No product code yet. Say **go** to start the Fathom rebuild (or tweak the plan: name, auth, real signup).
```

## 5. What failed first

1. First canary did not land. Cursor Hooks log: `Invalid user config: stop[0]: Hook script loop_limit must be a positive integer (use null for no limit)` and `Failed to parse project hooks configuration`. `loop_limit: 0` made the whole `hooks.json` fail to load, so `beforeSubmitPrompt` never ran.
2. Fix: remove `loop_limit` from project and user configs. After reload: `Loaded 3 project hook(s)` and `Loaded 3 user hook(s)` for `beforeSubmitPrompt`, `afterAgentResponse`, `stop`.
3. Resent session 1 canary; prompt + response both wrote. Session 2 canary then wrote a second file.

Checked before installing: [Cursor hooks docs](https://cursor.com/docs/hooks), create-hook skill, on-disk transcripts under `~/.cursor/projects/<workspace>/agent-transcripts/`. Did not fall back to a project rule that asks the model to log by hand.
