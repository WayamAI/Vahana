import { Sidebar } from "@/components/dashboard/sidebar";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { MapStage } from "@/components/dashboard/map-stage";
import { HealthScoreCard } from "@/components/dashboard/health-score-card";
import { ActionQueue } from "@/components/dashboard/action-queue";
import { IncidentPanel } from "@/components/dashboard/incident-panel";

export function DashboardShell() {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <Sidebar />

      <main className="flex-1 overflow-y-auto">
        <DashboardHeader />

        <div className="flex flex-col gap-4 px-6 pb-6">
          <div className="relative">
            <MapStage>
              <HealthScoreCard />
            </MapStage>
          </div>

          <ActionQueue />
        </div>
      </main>

      <IncidentPanel />
    </div>
  );
}
