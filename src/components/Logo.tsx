import Link from "next/link";

export function Mark({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <circle cx="16" cy="16" r="14.5" fill="none" stroke="#18C8F4" strokeWidth="2.2" />
      <path
        d="M8.5 18.5c2.2-5.2 4.4-7.8 7.5-7.8s5.3 2.6 7.5 7.8"
        fill="none"
        stroke="#18C8F4"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <circle cx="16" cy="16" r="2.4" fill="#18C8F4" />
    </svg>
  );
}

export function Logo({ href = "/", size = "md" }: { href?: string | null; size?: "sm" | "md" | "lg" }) {
  const text = size === "lg" ? "text-[22px]" : size === "sm" ? "text-[16px]" : "text-[18px]";
  const mark = size === "lg" ? "h-8 w-8" : size === "sm" ? "h-6 w-6" : "h-7 w-7";
  const inner = (
    <span className="inline-flex items-center gap-2">
      <Mark className={mark} />
      <span className={`${text} font-semibold tracking-tight text-paper`}>Quorum</span>
    </span>
  );
  if (!href) return inner;
  return (
    <Link href={href} className="inline-flex items-center">
      {inner}
    </Link>
  );
}
