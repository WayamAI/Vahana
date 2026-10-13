import { Info, ChevronDown, ArrowUpRight } from "lucide-react";
import { healthSummary } from "@/lib/placeholder-data";

export function HealthScoreCard() {
  const { score, trendLabel, healthy, warning, critical } = healthSummary;
  const total = healthy + warning + critical;

  return (
    <div className="absolute left-4 top-4 w-[260px] rounded-lg border border-border bg-surface-1/90 p-4 backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs font-medium text-text-secondary">
          Health Score
          <Info size={12} className="text-text-muted" />
        </div>
        <button
          type="button"
          className="flex items-center gap-1 rounded-md border border-border px-2 py-1 text-[11px] text-text-secondary hover:bg-surface-2"
        >
          Today
          <ChevronDown size={12} />
        </button>
      </div>

      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-3xl font-semibold tabular-nums text-text-primary">{score}%</span>
        <span className="flex items-center gap-0.5 text-xs font-medium text-success">
          <ArrowUpRight size={12} />
          {trendLabel}
        </span>
      </div>

      <div className="mt-3 flex h-1.5 w-full overflow-hidden rounded-full bg-surface-3">
        <div className="bg-success" style={{ width: `${(healthy / total) * 100}%` }} />
        <div className="bg-warning" style={{ width: `${(warning / total) * 100}%` }} />
        <div className="bg-critical" style={{ width: `${(critical / total) * 100}%` }} />
      </div>

      <div className="mt-3 flex items-center justify-between text-[11px] text-text-secondary">
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-success" />
          Healthy: <span className="tabular-nums text-text-primary">{healthy}</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-warning" />
          Warning: <span className="tabular-nums text-text-primary">{warning}</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-critical" />
          Critical: <span className="tabular-nums text-text-primary">{critical}</span>
        </span>
      </div>

      <button
        type="button"
        className="mt-3 w-full rounded-md border border-border py-1.5 text-xs font-medium text-text-secondary transition-colors duration-200 hover:bg-surface-2 hover:text-text-primary"
      >
        See all assets
      </button>
    </div>
  );
}
