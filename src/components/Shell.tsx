"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

const nav = [
  { href: "/", label: "Calls" },
  { href: "/calendar", label: "Calendar" },
  { href: "/live", label: "Record" },
];

export function Shell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const router = useRouter();
  const [q, setQ] = useState("");
  const hide = path.startsWith("/s/");

  function onSearch(e: FormEvent) {
    e.preventDefault();
    const next = q.trim();
    if (!next) return;
    router.push(`/search?q=${encodeURIComponent(next)}`);
  }

  if (hide) return <>{children}</>;

  return (
    <div className="relative z-10 min-h-full">
      <header className="sticky top-0 z-20 border-b border-line bg-[color-mix(in_oklab,var(--ink)_88%,transparent)] backdrop-blur-md">
        <div className="mx-auto flex max-w-[1280px] items-center gap-6 px-5 py-3">
          <Link href="/" className="shrink-0 font-display text-[22px] italic leading-none tracking-tight">
            Quorum
          </Link>
          <nav className="flex items-center gap-4 text-[13px] text-paper-dim">
            {nav.map((item) => {
              const on = path === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={on ? "text-paper" : "hover:text-paper"}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <form onSubmit={onSearch} className="ml-auto flex min-w-0 flex-1 justify-end">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search meetings, people, words"
              className="w-full max-w-md rounded-full border border-line bg-ink-2 px-4 py-1.5 text-[13px] outline-none placeholder:text-paper-dim/70 focus:border-brass/50"
            />
          </form>
        </div>
      </header>
      <main className="mx-auto w-full max-w-[1280px] px-5 py-6">{children}</main>
    </div>
  );
}
