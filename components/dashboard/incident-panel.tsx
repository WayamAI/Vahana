import { MapPin, TriangleAlert } from "lucide-react";
import { incident } from "@/lib/placeholder-data";
import { StatusBadge } from "@/components/ui/status-badge";
import { MetricCard } from "@/components/ui/metric-card";
import { DriverCard } from "@/components/ui/driver-card";

export function IncidentPanel() {
  return (
    <aside className="hidden lg:flex w-[320px] flex-shrink-0 flex-col border-l border-border bg-surface-1 p-4 overflow-y-auto">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-medium text-text-primary">
          {incident.id}: {incident.title}
        </h2>
        <StatusBadge severity={incident.severity} />
      </div>

      <div className="mt-2 flex items-start gap-1.5 text-xs text-text-secondary">
        <MapPin size={13} className="mt-0.5 flex-shrink-0 text-text-muted" />
        {incident.location}
      </div>

      <div className="mt-3 flex h-32 items-center justify-center rounded-md border border-border bg-surface-2 text-xs text-text-muted">
        Vehicle preview
      </div>

      <div className="mt-4">
        <div className="mb-1.5 text-[11px] uppercase tracking-wide text-text-muted">Driver</div>
        <DriverCard name={incident.driver.name} aiConciergeActive={incident.driver.aiConciergeActive} />
      </div>

      <div className="mt-4">
        <div className="mb-1.5 text-[11px] uppercase tracking-wide text-text-muted">
          Telemetry Data
        </div>

        <div className="flex items-start gap-1.5 rounded-md border border-critical-bg bg-critical-bg px-3 py-2 text-xs text-critical">
          <TriangleAlert size={13} className="mt-0.5 flex-shrink-0" />
          <div>
            <div className="font-medium">Primary Issue</div>
            <div className="mt-0.5 text-text-secondary">{incident.primaryIssue}</div>
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
          className="rounded-md bg-text-primary py-2 text-sm font-medium text-background transition-opacity duration-200 hover:opacity-90"
        >
          Confirm Evacuation
        </button>
        <div className="flex gap-2">
          <button
            type="button"
            className="flex-1 rounded-md border border-border py-2 text-xs font-medium text-text-secondary transition-colors duration-200 hover:bg-surface-2"
          >
            View Profile
          </button>
          <button
            type="button"
            className="flex-1 rounded-md border border-border py-2 text-xs font-medium text-text-secondary transition-colors duration-200 hover:bg-surface-2"
          >
            Insurance Claim
          </button>
        </div>
      </div>
    </aside>
  );
}
