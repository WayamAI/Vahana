"use client";

import { useState } from "react";
import { AppIcon } from "@/components/ui/app-icon";
import { incident } from "@/lib/placeholder-data";
import { StatusBadge } from "@/components/ui/status-badge";
import { MetricCard } from "@/components/ui/metric-card";
import { DriverCard } from "@/components/ui/driver-card";

export function IncidentPanel() {
  const [evacuationConfirmed, setEvacuationConfirmed] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [claimRef, setClaimRef] = useState<string | null>(null);

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

      <div className="mt-3 flex h-32 items-center justify-center rounded-md border border-muted bg-raised text-body-sm text-tertiary">
        Vehicle preview
      </div>

      <div className="mt-4">
        <div className="mb-1.5 text-caption uppercase tracking-wide text-tertiary">Driver</div>
        <DriverCard name={incident.driver.name} aiConciergeActive={incident.driver.aiConciergeActive} />

        {showProfile && (
          <div className="mt-2 rounded-md border border-muted bg-raised px-3 py-2 text-body-sm text-secondary">
            <div className="flex justify-between py-0.5">
              <span className="text-tertiary">Driver</span>
              <span className="text-primary">{incident.driver.name}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-tertiary">AI Concierge</span>
              <span className="text-primary">
                {incident.driver.aiConciergeActive ? "Active" : "Inactive"}
              </span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-tertiary">Incident</span>
              <span className="text-primary">{incident.id}</span>
            </div>
            <p className="mt-1.5 text-caption text-tertiary">
              Demo profile — not connected to a driver records system.
            </p>
          </div>
        )}
      </div>

      <div className="mt-4">
        <div className="mb-1.5 text-caption uppercase tracking-wide text-tertiary">
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
        {claimRef && (
          <div className="rounded-md border border-success-subtle bg-success-subtle px-3 py-2 text-body-sm text-success">
            Claim submitted (demo) — reference {claimRef}
          </div>
        )}

        <button
          type="button"
          disabled={evacuationConfirmed}
          onClick={() => setEvacuationConfirmed(true)}
          className="rounded-md bg-action-primary py-2 text-label-md font-medium text-action-primary-content transition-opacity duration-200 enabled:hover:opacity-90 disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-container"
        >
          {evacuationConfirmed ? "Evacuation Confirmed" : "Confirm Evacuation"}
        </button>
        <div className="flex gap-2">
          <button
            type="button"
            aria-pressed={showProfile}
            onClick={() => setShowProfile((v) => !v)}
            className="flex-1 rounded-md border border-muted py-2 text-label-sm text-secondary transition-colors duration-200 hover:bg-raised focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
          >
            {showProfile ? "Hide Profile" : "View Profile"}
          </button>
          <button
            type="button"
            disabled={!!claimRef}
            onClick={() => setClaimRef(`WAY-${Math.floor(100000 + Math.random() * 900000)}`)}
            className="flex-1 rounded-md border border-muted py-2 text-label-sm text-secondary transition-colors duration-200 enabled:hover:bg-raised disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
          >
            {claimRef ? "Claim Submitted" : "Insurance Claim"}
          </button>
        </div>
      </div>
    </aside>
  );
}
