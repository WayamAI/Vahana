import { AppIcon } from "@/components/ui/app-icon";

export function DriverCard({ name, aiConciergeActive }: { name: string; aiConciergeActive?: boolean }) {
  return (
    <div className="flex items-center gap-3 rounded-md border border-muted bg-raised px-3 py-2.5">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-raised-2 text-icon-secondary">
        <AppIcon name="user" size="md" aria-hidden />
      </div>
      <div className="flex-1">
        <div className="text-body-sm font-medium text-primary">{name}</div>
        {aiConciergeActive && (
          <div className="flex items-center gap-1.5 text-caption text-success">
            <span className="h-1.5 w-1.5 rounded-full bg-success" />
            AI Concierge is active
          </div>
        )}
      </div>
    </div>
  );
}
