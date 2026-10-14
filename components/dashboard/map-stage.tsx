import type { ReactNode } from "react";

export function MapStage({ children }: { children?: ReactNode }) {
  return (
    <div className="relative h-[320px] w-full overflow-hidden rounded-lg border border-muted bg-raised">
      <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(var(--stroke-muted)_1px,transparent_1px),linear-gradient(90deg,var(--stroke-muted)_1px,transparent_1px)] [background-size:28px_28px]" />
      <p className="absolute right-4 bottom-3 text-caption text-tertiary">
        Live map view not yet connected
      </p>
      {children}
    </div>
  );
}
