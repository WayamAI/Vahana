import type { Severity } from "@/lib/placeholder-data";

const VALUE_CLASS: Record<Severity, string> = {
  critical: "text-critical",
  warning: "text-warning",
  info: "text-text-primary",
};

export function MetricCard({
  label,
  value,
  severity = "info",
}: {
  label: string;
  value: string;
  severity?: Severity;
}) {
  return (
    <div className="rounded-md border border-border bg-surface-2 px-3 py-2.5">
      <div className="text-[11px] uppercase tracking-wide text-text-muted">{label}</div>
      <div className={`mt-1 text-sm font-semibold tabular-nums ${VALUE_CLASS[severity]}`}>
        {value}
      </div>
    </div>
  );
}
