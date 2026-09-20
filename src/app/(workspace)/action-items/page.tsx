"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { meetings } from "@/data/meetings";
import { person } from "@/data/people";
import type { ActionStatus } from "@/data/types";
import { loadActionStatus, saveActionStatus } from "@/lib/local";

const cycle: Record<ActionStatus, ActionStatus> = {
  open: "progress",
  progress: "done",
  done: "open",
};

export default function ActionItemsPage() {
  const [status, setStatus] = useState<Record<string, ActionStatus>>({});
  useEffect(() => setStatus(loadActionStatus()), []);

  const rows = useMemo(
    () =>
      meetings.flatMap((m) =>
        m.actionItems.map((a) => ({
          ...a,
          meetingId: m.id,
          meetingTitle: m.title,
          status: status[a.id] ?? a.status ?? "open",
        })),
      ),
    [status],
  );

  return (
    <div>
      <p className="font-mono text-[11px] tracking-[0.16em] text-cyan uppercase">Work</p>
      <h1 className="mt-2 font-display text-4xl font-medium tracking-tight">Action items</h1>
      <p className="mt-2 text-[14px] text-paper-dim">{rows.filter((r) => r.status !== "done").length} open · click status to cycle</p>
      <ul className="mt-8 divide-y divide-line border-y border-line">
        {rows.map((row) => {
          const owner = person(row.ownerId);
          return (
            <li key={row.id} className="flex flex-wrap items-start justify-between gap-3 py-4">
              <div className="min-w-0">
                <p className={row.status === "done" ? "text-paper-dim line-through" : ""}>{row.text}</p>
                <p className="mt-1 font-mono text-[11px] text-paper-dim">
                  {owner.name}
                  {row.due ? ` · ${row.due}` : ""} ·{" "}
                  <Link href={`/meetings/${row.meetingId}`} className="text-cyan">
                    {row.meetingTitle}
                  </Link>
                </p>
              </div>
              <button
                type="button"
                onClick={() => setStatus(saveActionStatus(row.id, cycle[row.status]))}
                className="rounded-full border border-line px-3 py-1 font-mono text-[11px] uppercase"
              >
                {row.status === "progress" ? "in progress" : row.status}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
