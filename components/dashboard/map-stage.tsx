import type { ReactNode } from "react";

export function MapStage({ children }: { children?: ReactNode }) {
  return (
    <div className="relative h-[320px] w-full overflow-hidden rounded-lg border border-muted bg-[radial-gradient(circle_at_30%_20%,#17191a,#0c0d0e)]">
      <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:28px_28px]" />
      <p className="absolute right-4 bottom-3 text-caption text-tertiary">
        Live map view not yet connected
      </p>
      {children}
    </div>
  );
}
