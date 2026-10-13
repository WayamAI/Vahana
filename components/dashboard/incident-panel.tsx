import { AppIcon } from "@/components/ui/app-icon";
import { incident } from "@/lib/placeholder-data";
import { StatusBadge } from "@/components/ui/status-badge";
import { MetricCard } from "@/components/ui/metric-card";
import { DriverCard } from "@/components/ui/driver-card";

export function IncidentPanel() {
  return (
    <aside className="hidden h-full lg:flex w-[320px] flex-shrink-0 flex-col border-l border-muted bg-container p-4 overflow-y-auto">
      <div className="flex items-center justify-between">
        <h2 className="text-heading-sm text-primary">
          {incident.id}: {incident.title}
        </h2>
        <StatusBadge severity={incident.severity} />
      </div>

      <div className="mt-2 flex items-start gap-1.5 text-body-sm text-secondary">
        <AppIcon name="map" size="xs" tone="text-icon-tertiary" aria-hidden className="mt-0.5" />
        {incident.location}
      </div>

      <div className="mt-3 flex h-32 items-center justify-center rounded-md border border-muted bg-raised text-body-sm text-quaternary">
        Vehicle preview
      </div>

      <div className="mt-4">
        <div className="mb-1.5 text-caption uppercase tracking-wide text-quaternary">Driver</div>
        <DriverCard name={incident.driver.name} aiConciergeActive={incident.driver.aiConciergeActive} />
      </div>

      <div className="mt-4">
        <div className="mb-1.5 text-caption uppercase tracking-wide text-quaternary">
          Telemetry Data
        </div>

        <div className="flex items-start gap-1.5 rounded-md border border-error-subtle bg-error-subtle px-3 py-2 text-body-sm text-error">
          <AppIcon name="warning" size="xs" aria-hidden className="mt-0.5" />
          <div>
            <div className="font-medium">Primary Issue</div>
            <div className="mt-0.5 text-secondary">{incident.primaryIssue}</div>
          </div>
        </div>

        <div className="mt-2 grid grid-cols-2 gap-2">
          {incident.metrics.map((m) => (
            <MetricCard key={m.label} label={m.label} value={m.value} severity={m.severity} />
          ))}
        </div>
      </div>

      <div className="mt-auto flex flex-col gap-2 pt-4">
        <button
          type="button"
          className="rounded-md bg-action-primary py-2 text-label-md font-medium text-action-primary-content transition-opacity duration-200 hover:opacity-90"
        >
          Confirm Evacuation
        </button>
        <div className="flex gap-2">
          <button
            type="button"
            className="flex-1 rounded-md border border-muted py-2 text-label-sm text-secondary transition-colors duration-200 hover:bg-raised"
          >
            View Profile
          </button>
          <button
            type="button"
            className="flex-1 rounded-md border border-muted py-2 text-label-sm text-secondary transition-colors duration-200 hover:bg-raised"
          >
            Insurance Claim
          </button>
        </div>
      </div>
    </aside>
  );
}
