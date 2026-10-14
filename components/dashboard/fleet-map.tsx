"use client";

import dynamic from "next/dynamic";

// Leaflet touches `window` at import time, so it can only run on the
// client — dynamic-import with ssr disabled instead of a top-level import.
const FleetMapInner = dynamic(
  () => import("@/components/dashboard/fleet-map-inner").then((m) => m.FleetMapInner),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center text-caption text-tertiary">
        Loading map…
      </div>
    ),
  }
);

export function FleetMap() {
  return <FleetMapInner />;
}
