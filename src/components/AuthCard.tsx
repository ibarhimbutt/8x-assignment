import Link from "next/link";
import type { ReactNode } from "react";

export function AuthCard({ title, sub, children }: { title: string; sub: string; children: ReactNode }) {
  return (
    <div className="mx-auto flex min-h-full max-w-md flex-col justify-center px-5 py-16">
      <Link href="/" className="font-display text-[28px] italic">
        Quorum
      </Link>
      <h1 className="mt-8 font-display text-4xl italic">{title}</h1>
      <p className="mt-2 text-[14px] text-paper-dim">{sub}</p>
      <div className="mt-8">{children}</div>
    </div>
  );
}

export function Field({
  label,
  name,
  type,
  placeholder,
}: {
  label: string;
  name: string;
  type: string;
  placeholder?: string;
}) {
  return (
    <label className="block text-[13px]">
      <span className="text-paper-dim">{label}</span>
      <input
        name={name}
        type={type}
        required
        placeholder={placeholder}
        className="mt-1 w-full rounded-xl border border-line bg-ink-2 px-3 py-2 outline-none focus:border-brass/50"
      />
    </label>
  );
}
