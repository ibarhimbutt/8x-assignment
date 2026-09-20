"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, type FormEvent, type ReactNode } from "react";
import type { SessionUser } from "@/lib/auth";
import { logoutAction } from "@/app/actions";

const nav = [
  { href: "/dashboard", label: "Overview" },
  { href: "/meetings", label: "My meetings" },
  { href: "/shared", label: "Shared with me" },
  { href: "/action-items", label: "Action items" },
  { href: "/highlights", label: "Highlights" },
  { href: "/search", label: "Search" },
  { href: "/ask", label: "Ask meetings" },
  { href: "/calendar", label: "Calendar" },
  { href: "/capture", label: "Capture" },
  { href: "/settings", label: "Settings" },
];

export function AppShell({ user, children }: { user: SessionUser; children: ReactNode }) {
  const path = usePathname();
  const router = useRouter();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);

  function onSearch(e: FormEvent) {
    e.preventDefault();
    const next = q.trim();
    if (!next) return;
    router.push(`/search?q=${encodeURIComponent(next)}`);
    setOpen(false);
  }

  const first = user.name.split(" ")[0];

  const links = (
    <nav className="flex flex-col gap-0.5 text-[13.5px]">
      {nav.map((item) => {
        const on = path === item.href || (item.href !== "/dashboard" && path.startsWith(item.href));
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setOpen(false)}
            className={`rounded-lg px-3 py-2 ${on ? "bg-white/8 text-paper" : "text-paper-dim hover:bg-white/4 hover:text-paper"}`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <div className="min-h-full lg:grid lg:grid-cols-[240px_minmax(0,1fr)]">
      <aside className="hidden border-r border-line bg-ink-2/80 lg:flex lg:flex-col">
        <div className="px-5 py-5">
          <Link href="/dashboard" className="font-display text-[26px] italic leading-none">
            Quorum
          </Link>
          <p className="mt-2 font-mono text-[10px] tracking-[0.16em] text-brass uppercase">Demo workspace</p>
        </div>
        <div className="flex-1 px-3">{links}</div>
        <div className="border-t border-line p-4">
          <p className="text-[13px]">{user.name}</p>
          <p className="truncate font-mono text-[11px] text-paper-dim">{user.email}</p>
          <form action={logoutAction} className="mt-3">
            <button type="submit" className="text-[12px] text-paper-dim hover:text-paper">
              Log out
            </button>
          </form>
        </div>
      </aside>

      <div className="flex min-h-full flex-col">
        <header className="sticky top-0 z-20 border-b border-line bg-[color-mix(in_oklab,var(--ink)_90%,transparent)] backdrop-blur-md">
          <div className="flex items-center gap-3 px-4 py-3">
            <button
              type="button"
              className="rounded-lg border border-line px-2 py-1 text-[13px] lg:hidden"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
            >
              Menu
            </button>
            <Link href="/dashboard" className="font-display text-[20px] italic lg:hidden">
              Quorum
            </Link>
            <form onSubmit={onSearch} className="ml-auto flex min-w-0 flex-1 justify-end">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search meetings, people, words"
                className="w-full max-w-md rounded-full border border-line bg-ink-2 px-4 py-1.5 text-[13px] outline-none placeholder:text-paper-dim/70 focus:border-brass/50"
              />
            </form>
            <span className="hidden text-[13px] text-paper-dim sm:inline">{first}</span>
          </div>
        </header>
        <main className="mx-auto w-full max-w-[1200px] flex-1 px-4 py-6 sm:px-6">{children}</main>
      </div>

      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button type="button" className="absolute inset-0 bg-black/50" aria-label="Close menu" onClick={() => setOpen(false)} />
          <div className="relative flex h-full w-[min(280px,86vw)] flex-col bg-ink-2 p-4">
            <p className="mb-4 font-display text-[22px] italic">Quorum</p>
            {links}
            <form action={logoutAction} className="mt-auto">
              <button type="submit" className="text-[13px] text-paper-dim">
                Log out
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
