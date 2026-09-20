import type { Person } from "@/data/types";

export function Avatar({ person, size = 28 }: { person: Person; size?: number }) {
  return (
    <span
      title={`${person.name} · ${person.role}`}
      className="inline-flex shrink-0 items-center justify-center rounded-full font-medium text-[11px] text-ink"
      style={{
        width: size,
        height: size,
        background: `hsl(${person.hue} 42% 72%)`,
      }}
    >
      {person.initials}
    </span>
  );
}

export function AvatarStack({ people, max = 5 }: { people: Person[]; max?: number }) {
  const shown = people.slice(0, max);
  const extra = people.length - shown.length;
  return (
    <span className="flex -space-x-1.5">
      {shown.map((p) => (
        <Avatar key={p.id} person={p} size={22} />
      ))}
      {extra > 0 && (
        <span className="inline-flex h-[22px] min-w-[22px] items-center justify-center rounded-full bg-ink-2 px-1 text-[10px] text-paper-dim">
          +{extra}
        </span>
      )}
    </span>
  );
}
