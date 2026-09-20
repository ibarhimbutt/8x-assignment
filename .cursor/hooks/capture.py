#!/usr/bin/env python3
"""Automatic prompt/response capture for the 8x assignment.

Fires from Cursor hooks (beforeSubmitPrompt, afterAgentResponse, stop).
Writes only the user prompt and the final assistant response — nothing
in between — to .agent-logs/ in the repo root.
"""

from __future__ import annotations

import fcntl
import json
import os
import re
import sys
import tempfile
from datetime import datetime, timezone

AUTHOR = "ibrahimbutt"
TOOL = "cursor"
PROJECT = "8x-assignment"

REPO_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
LOG_DIR = os.path.join(REPO_ROOT, ".agent-logs")
STATE_DIR = os.path.join(tempfile.gettempdir(), "8x-agent-capture")
DEBUG_PATH = os.path.join(tempfile.gettempdir(), "8x-capture-hook-events.jsonl")


def utc_now() -> datetime:
    return datetime.now(timezone.utc)


def iso_ms(dt: datetime) -> str:
    return dt.strftime("%Y-%m-%dT%H:%M:%S.") + f"{dt.microsecond // 1000:03d}Z"


def file_stamp(dt: datetime) -> str:
    return dt.strftime("%Y-%m-%d_%H-%M-%S")


def debug(event: dict) -> None:
    try:
        with open(DEBUG_PATH, "a", encoding="utf-8") as fh:
            fh.write(json.dumps(event, ensure_ascii=False) + "\n")
    except OSError:
        pass


def short_session(session_id: str) -> str:
    if not session_id:
        return "unknown"
    return session_id.split("-")[0]


def model_name(payload: dict) -> str:
    return (
        payload.get("model")
        or payload.get("model_id")
        or "unknown"
    )


def load_json(path: str) -> dict:
    try:
        with open(path, encoding="utf-8") as fh:
            return json.load(fh)
    except (OSError, json.JSONDecodeError):
        return {}


def save_json(path: str, data: dict) -> None:
    os.makedirs(os.path.dirname(path), exist_ok=True)
    tmp = path + ".tmp"
    with open(tmp, "w", encoding="utf-8") as fh:
        json.dump(data, fh, indent=2, ensure_ascii=False)
        fh.write("\n")
    os.replace(tmp, path)


def state_path(session_id: str) -> str:
    os.makedirs(STATE_DIR, exist_ok=True)
    safe = re.sub(r"[^a-zA-Z0-9._-]", "_", session_id or "unknown")
    return os.path.join(STATE_DIR, f"{safe}.json")


def lock_path() -> str:
    os.makedirs(STATE_DIR, exist_ok=True)
    return os.path.join(STATE_DIR, "capture.lock")


FRONTMATTER_RE = re.compile(r"\A---\n.*?\n---\n", re.DOTALL)


def render_frontmatter(state: dict) -> str:
    return (
        "---\n"
        f"session_id: {state['session_id']}\n"
        f"date: {state['date']}\n"
        f"author: {AUTHOR}\n"
        f"model: {state.get('model') or 'unknown'}\n"
        f"tool: {TOOL}\n"
        f"project: {PROJECT}\n"
        f"total_exchanges: {state.get('total_exchanges', 0)}\n"
        f"first_prompt_time: {state.get('first_prompt_time') or ''}\n"
        f"last_prompt_time: {state.get('last_prompt_time') or ''}\n"
        "---\n"
    )


def session_banner(state: dict) -> str:
    sid = short_session(state["session_id"])
    return (
        f"\n# Session Log - {state['date']}\n"
        f"\n"
        f"Session: `{sid}` | Project: `{PROJECT}` | Author: `{AUTHOR}`\n"
        f"\n"
        f"---\n"
        f"\n"
    )


def ensure_log(state: dict, now: datetime) -> None:
    os.makedirs(LOG_DIR, exist_ok=True)
    path = state.get("log_path")
    if path and os.path.isfile(path):
        return
    stamp = file_stamp(now)
    path = os.path.join(LOG_DIR, f"{stamp}_{state['session_id']}.md")
    state["log_path"] = path
    state["date"] = now.strftime("%Y-%m-%d")
    body = render_frontmatter(state) + session_banner(state)
    with open(path, "w", encoding="utf-8") as fh:
        fh.write(body)


def rewrite_frontmatter(state: dict) -> None:
    path = state["log_path"]
    with open(path, encoding="utf-8") as fh:
        text = fh.read()
    header = render_frontmatter(state)
    if FRONTMATTER_RE.match(text):
        text = FRONTMATTER_RE.sub(header, text, count=1)
    else:
        text = header + text
    with open(path, "w", encoding="utf-8") as fh:
        fh.write(text)


def append_entry(state: dict, entry: str) -> None:
    with open(state["log_path"], "a", encoding="utf-8") as fh:
        fh.write(entry)
        if not entry.endswith("\n"):
            fh.write("\n")


def prompt_entry(num: int, session_id: str, ts: str, model: str, prompt: str) -> str:
    sid = short_session(session_id)
    body = prompt if prompt.endswith("\n") else prompt + "\n"
    return (
        f"[LOG_ENTRY type=PROMPT num={num} session={sid}]\n"
        f"timestamp: {ts}\n"
        f"model: {model}\n"
        f"\n"
        f"{body}"
        f"\n"
    )


def response_entry(num: int, session_id: str, ts: str, model: str, text: str) -> str:
    sid = short_session(session_id)
    body = text if text.endswith("\n") else text + "\n"
    return (
        f"[LOG_ENTRY type=RESPONSE num={num} session={sid}]\n"
        f"timestamp: {ts}\n"
        f"model: {model}\n"
        f"\n"
        f"{body}"
        f"\n"
    )


def write_prompt(state: dict, payload: dict, now: datetime) -> None:
    gen = payload.get("generation_id") or f"prompt-{state.get('total_exchanges', 0) + 1}"
    written = state.setdefault("prompt_gens", {})
    if gen in written:
        return
    prompt = payload.get("prompt")
    if prompt is None:
        prompt = ""
    if not isinstance(prompt, str):
        prompt = json.dumps(prompt, ensure_ascii=False)
    ts = iso_ms(now)
    model = model_name(payload)
    ensure_log(state, now)
    num = int(state.get("total_exchanges", 0)) + 1
    state["total_exchanges"] = num
    if not state.get("first_prompt_time"):
        state["first_prompt_time"] = ts
    state["last_prompt_time"] = ts
    state["model"] = model
    state["current_generation"] = gen
    written[gen] = num
    rewrite_frontmatter(state)
    append_entry(state, prompt_entry(num, state["session_id"], ts, model, prompt))


def flush_response(state: dict, gen: str, now: datetime, model: str | None = None) -> None:
    pending = state.get("pending_responses") or {}
    text = pending.get(gen)
    if text is None:
        return
    written = state.setdefault("response_gens", {})
    if gen in written:
        return
    prompts = state.get("prompt_gens") or {}
    num = prompts.get(gen)
    if not num:
        return
    ts = iso_ms(now)
    model = model or state.get("model") or "unknown"
    append_entry(state, response_entry(num, state["session_id"], ts, model, text))
    written[gen] = num
    pending.pop(gen, None)
    state["pending_responses"] = pending
    if model:
        state["model"] = model
        rewrite_frontmatter(state)


def handle_after_response(state: dict, payload: dict, now: datetime) -> None:
    gen = payload.get("generation_id") or state.get("current_generation")
    if not gen:
        return
    text = payload.get("text")
    if text is None:
        return
    if not isinstance(text, str):
        text = json.dumps(text, ensure_ascii=False)
    pending = state.setdefault("pending_responses", {})
    pending[gen] = text
    # If stop already ran for this generation, this is the final text — write it.
    if gen in (state.get("stopped_gens") or {}):
        flush_response(state, gen, now, model_name(payload))


def last_assistant_text(transcript_path: str) -> str | None:
    """Final user-visible assistant text only — skip tool calls and thinking."""
    if not transcript_path or not os.path.isfile(transcript_path):
        return None
    last = None
    try:
        with open(transcript_path, encoding="utf-8") as fh:
            for raw in fh:
                line = raw.strip()
                if not line:
                    continue
                try:
                    obj = json.loads(line)
                except json.JSONDecodeError:
                    continue
                if obj.get("role") != "assistant":
                    continue
                message = obj.get("message") or {}
                content = message.get("content") or obj.get("content") or []
                texts: list[str] = []
                if isinstance(content, str) and content.strip():
                    texts.append(content)
                elif isinstance(content, list):
                    for part in content:
                        if not isinstance(part, dict):
                            continue
                        if part.get("type") == "text" and part.get("text"):
                            texts.append(part["text"])
                if texts:
                    last = "\n".join(texts)
    except OSError:
        return None
    return last


def in_scope(payload: dict) -> bool:
    cwd = os.path.abspath(os.getcwd())
    if cwd == REPO_ROOT:
        return True
    for root in payload.get("workspace_roots") or []:
        if os.path.abspath(root) == REPO_ROOT:
            return True
    return False


def handle_stop(state: dict, payload: dict, now: datetime) -> None:
    gen = payload.get("generation_id") or state.get("current_generation")
    if not gen:
        return
    stopped = state.setdefault("stopped_gens", {})
    stopped[gen] = True
    pending = state.setdefault("pending_responses", {})
    if gen not in pending:
        fallback = last_assistant_text(payload.get("transcript_path") or "")
        if fallback:
            pending[gen] = fallback
    flush_response(state, gen, now, model_name(payload))


def handle(payload: dict) -> dict:
    event = payload.get("hook_event_name") or ""
    if event in {"beforeSubmitPrompt", "afterAgentResponse", "stop"} and not in_scope(payload):
        debug({"event": event, "skipped": "out_of_scope", "cwd": os.getcwd()})
        if event == "beforeSubmitPrompt":
            return {"continue": True}
        return {}
    session_id = (
        payload.get("conversation_id")
        or payload.get("session_id")
        or "unknown"
    )
    now = utc_now()
    spath = state_path(session_id)
    os.makedirs(LOG_DIR, exist_ok=True)
    lock_file = open(lock_path(), "a+", encoding="utf-8")
    try:
        fcntl.flock(lock_file.fileno(), fcntl.LOCK_EX)
        state = load_json(spath)
        state["session_id"] = session_id
        if event == "beforeSubmitPrompt":
            write_prompt(state, payload, now)
        elif event == "afterAgentResponse":
            handle_after_response(state, payload, now)
        elif event == "stop":
            handle_stop(state, payload, now)
        save_json(spath, state)
    finally:
        fcntl.flock(lock_file.fileno(), fcntl.LOCK_UN)
        lock_file.close()

    debug(
        {
            "ts": iso_ms(now),
            "event": event,
            "session_id": session_id,
            "generation_id": payload.get("generation_id"),
            "model": model_name(payload),
            "prompt_len": len(payload.get("prompt") or "") if isinstance(payload.get("prompt"), str) else None,
            "text_len": len(payload.get("text") or "") if isinstance(payload.get("text"), str) else None,
            "log_dir": LOG_DIR,
        }
    )
    if event == "beforeSubmitPrompt":
        return {"continue": True}
    return {}


def self_test() -> int:
    """Smallest check that fails if prompt/response capture format breaks."""
    import shutil

    global LOG_DIR, STATE_DIR, DEBUG_PATH, REPO_ROOT
    tmp = tempfile.mkdtemp(prefix="8x-capture-test-")
    old_log, old_state, old_debug, old_root = LOG_DIR, STATE_DIR, DEBUG_PATH, REPO_ROOT
    LOG_DIR = os.path.join(tmp, ".agent-logs")
    STATE_DIR = os.path.join(tmp, "state")
    DEBUG_PATH = os.path.join(tmp, "debug.jsonl")
    os.makedirs(LOG_DIR, exist_ok=True)
    try:
        sid = "3f9c1a20-77bd-4e51-9a0e-1c2f83b4de77"
        gen = "gen-1"
        handle(
            {
                "hook_event_name": "beforeSubmitPrompt",
                "conversation_id": sid,
                "generation_id": gen,
                "model": "cursor-grok-4.6",
                "prompt": "CAPTURE TEST — 8x assignment, canary",
                "workspace_roots": [old_root],
            }
        )
        handle(
            {
                "hook_event_name": "afterAgentResponse",
                "conversation_id": sid,
                "generation_id": gen,
                "model": "cursor-grok-4.6",
                "text": "canary response body",
                "workspace_roots": [old_root],
            }
        )
        handle(
            {
                "hook_event_name": "stop",
                "conversation_id": sid,
                "generation_id": gen,
                "model": "cursor-grok-4.6",
                "status": "completed",
                "workspace_roots": [old_root],
            }
        )
        files = [f for f in os.listdir(LOG_DIR) if f.endswith(".md")]
        assert files, "no log file written"
        text = open(os.path.join(LOG_DIR, files[0]), encoding="utf-8").read()
        assert "type=PROMPT num=1" in text, text
        assert "CAPTURE TEST — 8x assignment, canary" in text, text
        assert "type=RESPONSE num=1" in text, text
        assert "canary response body" in text, text
        assert "author: ibrahimbutt" in text, text
        print("self-test ok:", files[0])
        return 0
    finally:
        LOG_DIR, STATE_DIR, DEBUG_PATH, REPO_ROOT = old_log, old_state, old_debug, old_root
        shutil.rmtree(tmp, ignore_errors=True)


def main() -> int:
    if len(sys.argv) > 1 and sys.argv[1] == "--self-test":
        return self_test()
    raw = sys.stdin.read()
    if not raw.strip():
        return 0
    try:
        payload = json.loads(raw)
    except json.JSONDecodeError:
        debug({"event": "parse_error", "raw_len": len(raw)})
        return 0
    if not isinstance(payload, dict):
        return 0
    out = handle(payload)
    if out:
        sys.stdout.write(json.dumps(out))
        sys.stdout.write("\n")
    return 0


if __name__ == "__main__":
    try:
        sys.exit(main())
    except Exception as exc:  # fail open — never block the agent
        debug({"event": "crash", "error": str(exc)})
        sys.exit(0)
