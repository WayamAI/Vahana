import type { ReactNode } from "react";
import { FleetMap } from "@/components/dashboard/fleet-map";

export function MapStage({ children }: { children?: ReactNode }) {
  return (
    <div className="relative z-0 h-[320px] w-full overflow-hidden rounded-lg border border-muted bg-raised">
      <FleetMap />
      <p className="pointer-events-none absolute right-4 bottom-3 z-[1000] rounded bg-container/80 px-2 py-1 text-caption text-tertiary backdrop-blur-sm">
        Simulated positions — not live telemetry
      </p>
      {children}
    </div>
  );
}
