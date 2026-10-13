import { User } from "lucide-react";

export function DriverCard({ name, aiConciergeActive }: { name: string; aiConciergeActive?: boolean }) {
  return (
    <div className="flex items-center gap-3 rounded-md border border-border bg-surface-2 px-3 py-2.5">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-3 text-text-secondary">
        <User size={16} />
      </div>
      <div className="flex-1">
        <div className="text-sm font-medium text-text-primary">{name}</div>
        {aiConciergeActive && (
          <div className="flex items-center gap-1.5 text-[11px] text-success">
            <span className="h-1.5 w-1.5 rounded-full bg-success" />
            AI Concierge is active
          </div>
        )}
      </div>
    </div>
  );
}
