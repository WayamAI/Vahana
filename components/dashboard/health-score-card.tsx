import { AppIcon } from "@/components/ui/app-icon";
import { healthSummary } from "@/lib/placeholder-data";

export function HealthScoreCard() {
  const { score, trendLabel, healthy, warning, critical } = healthSummary;
  const total = healthy + warning + critical;

  return (
    <div className="absolute left-4 top-4 w-[260px] rounded-lg border border-muted bg-container/90 p-4 backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-label-sm text-secondary">
          Health Score
          <AppIcon name="info" size="xs" tone="text-icon-tertiary" aria-hidden />
        </div>
        <button
          type="button"
          className="flex items-center gap-1 rounded-md border border-muted px-2 py-1 text-caption text-secondary hover:bg-raised"
        >
          Today
          <AppIcon name="chevronDown" size="xs" aria-hidden />
        </button>
      </div>

      <div className="mt-2 flex items-baseline gap-2">
        <span className="font-display text-display-metric text-primary tabular-nums">
          {score}%
        </span>
        <span className="flex items-center gap-0.5 text-label-sm text-success">
          <AppIcon name="arrowUp" size="xs" aria-hidden />
          {trendLabel}
        </span>
      </div>

      <div className="mt-3 flex h-1.5 w-full overflow-hidden rounded-full bg-raised-2">
        <div className="bg-success" style={{ width: `${(healthy / total) * 100}%` }} />
        <div className="bg-warning" style={{ width: `${(warning / total) * 100}%` }} />
        <div className="bg-error" style={{ width: `${(critical / total) * 100}%` }} />
      </div>

      <div className="mt-3 flex items-center justify-between text-caption text-secondary">
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-success" />
          Healthy: <span className="tabular-nums text-primary">{healthy}</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-warning" />
          Warning: <span className="tabular-nums text-primary">{warning}</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-error" />
          Critical: <span className="tabular-nums text-primary">{critical}</span>
        </span>
      </div>

      <button
        type="button"
        className="mt-3 w-full rounded-md border border-muted py-1.5 text-label-sm text-secondary transition-colors duration-200 hover:bg-raised hover:text-primary"
      >
        See all assets
      </button>
    </div>
  );
}
