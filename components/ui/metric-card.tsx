import type { Severity } from "@/lib/placeholder-data";

const VALUE_CLASS: Record<Severity, string> = {
  critical: "text-error",
  warning: "text-warning",
  info: "text-primary",
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
    <div className="rounded-md border border-muted bg-raised px-3 py-2.5">
      <div className="text-caption uppercase tracking-wide text-tertiary">{label}</div>
      <div className={`mt-1 text-body-sm font-semibold tabular-nums ${VALUE_CLASS[severity]}`}>
        {value}
      </div>
    </div>
  );
}
