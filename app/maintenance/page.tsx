import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/layout/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import { actionRows } from "@/lib/placeholder-data";

export default function MaintenancePage() {
  const maintenanceRows = actionRows.filter((r) =>
    r.description.toLowerCase().includes("maintenance")
  );

  return (
    <AppShell>
      <div className="h-full w-full overflow-y-auto">
        <PageHeader title="Maintenance" />

        <div className="px-6 pb-6">
          {maintenanceRows.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-1.5 rounded-lg border border-muted bg-container px-6 py-12 text-center">
              <div className="text-body-md text-tertiary">No maintenance windows scheduled</div>
            </div>
          ) : (
            <section className="divide-y divide-[var(--stroke-muted)] rounded-lg border border-muted bg-container">
              {maintenanceRows.map((row) => (
                <div key={row.id} className="flex items-center justify-between gap-3 px-4 py-3.5">
                  <div>
                    <div className="text-body-md text-primary">{row.asset}</div>
                    <div className="text-body-sm text-tertiary">{row.description}</div>
                  </div>
                  <StatusBadge severity={row.severity} />
                </div>
              ))}
            </section>
          )}
        </div>
      </div>
    </AppShell>
  );
}
