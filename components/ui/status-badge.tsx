import type { Severity } from "@/lib/placeholder-data";

const DOT_CLASS: Record<Severity, string> = {
  critical: "bg-critical",
  warning: "bg-warning",
  info: "bg-info",
};

const TEXT_CLASS: Record<Severity, string> = {
  critical: "text-critical",
  warning: "text-warning",
  info: "text-info",
};

export function StatusBadge({ severity, label }: { severity: Severity; label?: string }) {
  const text = label ?? severity[0].toUpperCase() + severity.slice(1);
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-medium">
      <span className={`h-1.5 w-1.5 rounded-full ${DOT_CLASS[severity]}`} />
      <span className={TEXT_CLASS[severity]}>{text}</span>
    </span>
  );
}
