import type { Severity } from "@/lib/placeholder-data";

const BADGE_CLASS: Record<Severity, string> = {
  critical: "bg-error-badge text-badge",
  warning: "bg-warning-badge text-badge",
  info: "bg-info-badge text-badge",
};

export function StatusBadge({ severity, label }: { severity: Severity; label?: string }) {
  const text = label ?? severity[0].toUpperCase() + severity.slice(1);
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-caption font-medium ${BADGE_CLASS[severity]}`}
    >
      {text}
    </span>
  );
}
