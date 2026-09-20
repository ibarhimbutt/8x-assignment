import Link from "next/link";
import type { ReactNode } from "react";
import { Logo } from "@/components/Logo";

export function AuthCard({ title, sub, children }: { title: string; sub: string; children: ReactNode }) {
  return (
    <div className="starfield min-h-full">
      <div className="mx-auto grid min-h-full max-w-5xl items-center gap-10 px-5 py-12 lg:grid-cols-2">
        <div className="mx-auto w-full max-w-md rounded-3xl border border-white/10 bg-card p-7">
          <Logo />
          <h1 className="mt-8 font-display text-[28px] font-semibold tracking-tight">{title}</h1>
          <p className="mt-2 text-[14px] text-paper-dim">{sub}</p>
          <div className="mt-7">{children}</div>
        </div>
        <blockquote className="hidden lg:block">
          <p className="font-display text-3xl font-medium leading-snug tracking-tight text-paper-dim">
            “Work smarter, not harder,” they said.
            <span className="mt-2 block text-paper">Quorum took it personally.</span>
          </p>
        </blockquote>
      </div>
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
        className="mt-1 w-full rounded-xl border border-line bg-elevated px-3 py-2.5 outline-none focus:border-cyan/50"
      />
    </label>
  );
}
