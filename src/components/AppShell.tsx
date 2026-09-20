"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import type { SessionUser } from "@/lib/auth";
import { logoutAction } from "@/app/actions";
import { Logo } from "@/components/Logo";
import {
  CalendarDays,
  CheckSquare,
  Home,
  Mic,
  Search,
  Settings,
  Sparkles,
  Video,
  Highlighter,
} from "lucide-react";

const nav = [
  { href: "/dashboard", label: "Home", icon: Home },
  { href: "/meetings", label: "Meetings", icon: Video },
  { href: "/calendar", label: "Calendar", icon: CalendarDays },
  { href: "/action-items", label: "Actions", icon: CheckSquare },
  { href: "/highlights", label: "Highlights", icon: Highlighter },
  { href: "/search", label: "Search", icon: Search },
  { href: "/ask", label: "Ask AI", icon: Sparkles },
  { href: "/capture", label: "Capture", icon: Mic },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function AppShell({ user, children }: { user: SessionUser; children: ReactNode }) {
  const path = usePathname();
  const router = useRouter();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [cmd, setCmd] = useState(false);
  const live = path.startsWith("/live");

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCmd(true);
      }
      if (e.key === "Escape") setCmd(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function onSearch(e: FormEvent) {
    e.preventDefault();
    const next = q.trim();
    if (!next) return;
    setCmd(false);
    router.push(`/search?q=${encodeURIComponent(next)}`);
  }

  const links = (
    <nav className="flex flex-col gap-0.5 text-[13.5px]">
      {nav.map((item) => {
        const on = path === item.href || (item.href !== "/dashboard" && path.startsWith(item.href));
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setOpen(false)}
            className={`flex items-center gap-2.5 rounded-lg px-3 py-2 ${
              on ? "bg-cyan/10 text-cyan" : "text-paper-dim hover:bg-white/4 hover:text-paper"
            }`}
          >
            <Icon size={16} />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );

  if (live) {
    return (
      <div className="min-h-full bg-bg">
        <header className="flex items-center gap-3 border-b border-line px-4 py-3">
          <Logo href="/dashboard" size="sm" />
          <span className="ml-auto text-[13px] text-paper-dim">{user.name}</span>
        </header>
        <main className="px-4 py-2 sm:px-6">{children}</main>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-bg lg:grid lg:grid-cols-[248px_minmax(0,1fr)]">
      <aside className="hidden border-r border-line bg-bg-2 lg:flex lg:flex-col">
        <div className="px-5 py-5">
          <Logo href="/dashboard" />
        </div>
        <div className="flex-1 px-3">{links}</div>
        <div className="border-t border-line p-4">
          <p className="text-[13px]">{user.name}</p>
          <p className="truncate text-[11px] text-paper-dim">{user.email}</p>
          <form action={logoutAction} className="mt-3">
            <button type="submit" className="text-[12px] text-paper-dim hover:text-paper">
              Log out
            </button>
          </form>
        </div>
      </aside>

      <div className="flex min-h-full flex-col">
        <header className="sticky top-0 z-20 border-b border-line bg-[color-mix(in_oklab,var(--bg)_88%,transparent)] backdrop-blur-md">
          <div className="flex items-center gap-3 px-4 py-3">
            <button
              type="button"
              className="rounded-lg border border-line px-2 py-1 text-[13px] lg:hidden"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
            >
              Menu
            </button>
            <span className="lg:hidden">
              <Logo href="/dashboard" size="sm" />
            </span>
            <form onSubmit={onSearch} className="ml-auto flex min-w-0 flex-1 justify-end">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search meetings  ·  ⌘K"
                className="w-full max-w-md rounded-full border border-line bg-card px-4 py-1.5 text-[13px] outline-none placeholder:text-muted focus:border-cyan/50"
              />
            </form>
          </div>
        </header>
        <main className="mx-auto w-full max-w-[1200px] flex-1 px-4 py-6 sm:px-6">{children}</main>
        <nav className="sticky bottom-0 z-20 grid grid-cols-5 border-t border-line bg-bg-2 px-1 py-2 text-[10px] text-paper-dim lg:hidden">
          {nav.slice(0, 5).map((item) => {
            const Icon = item.icon;
            const on = path === item.href || path.startsWith(item.href);
            return (
              <Link key={item.href} href={item.href} className={`flex flex-col items-center gap-1 ${on ? "text-cyan" : ""}`}>
                <Icon size={16} />
                {item.label.split(" ")[0]}
              </Link>
            );
          })}
        </nav>
      </div>

      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button type="button" className="absolute inset-0 bg-black/60" aria-label="Close menu" onClick={() => setOpen(false)} />
          <div className="relative flex h-full w-[min(280px,86vw)] flex-col bg-bg-2 p-4">
            <Logo href="/dashboard" />
            <div className="mt-6">{links}</div>
            <form action={logoutAction} className="mt-auto">
              <button type="submit" className="text-[13px] text-paper-dim">
                Log out
              </button>
            </form>
          </div>
        </div>
      )}

      {cmd && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 p-4 pt-[12vh]">
          <form onSubmit={onSearch} className="w-full max-w-lg rounded-2xl border border-line bg-card p-3">
            <input
              autoFocus
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search meetings, people, words"
              className="w-full bg-transparent px-3 py-2 text-[15px] outline-none"
            />
            <p className="px-3 pb-2 text-[11px] text-muted">Enter to search · Esc to close</p>
          </form>
        </div>
      )}
    </div>
  );
}
