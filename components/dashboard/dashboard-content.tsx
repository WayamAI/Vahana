import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { MapStage } from "@/components/dashboard/map-stage";
import { HealthScoreCard } from "@/components/dashboard/health-score-card";
import { ActionQueue } from "@/components/dashboard/action-queue";
import { IncidentPanel } from "@/components/dashboard/incident-panel";

// Mounted inside AppShell's <main> (components/layout/app-shell.tsx), which
// already provides the sidebar. This renders the content area's own
// internal split: a scrollable main column plus the fixed-width incident
// panel, mirroring Chronos's app-shell.tsx main/ContextPanel structure.
export function DashboardContent() {
  return (
    <div className="flex h-full w-full overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        <DashboardHeader />

        <div className="flex flex-col gap-4 px-6 pb-6">
          <div className="relative">
            <MapStage>
              <HealthScoreCard />
            </MapStage>
          </div>

          <ActionQueue />
        </div>
      </div>

      <IncidentPanel />
    </div>
  );
}
