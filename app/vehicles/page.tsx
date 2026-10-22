import type { Metadata } from "next";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/layout/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import { actionRows } from "@/lib/placeholder-data";

export const metadata: Metadata = {
  title: "Vehicles | Vahana",
};

export default function VehiclesPage() {
  return (
    <AppShell>
      <div className="h-full w-full overflow-y-auto">
        <PageHeader
          title="Vehicles"
          subtitle={`Showing ${actionRows.length} vehicles with recent activity — not the full fleet shown in Health Score.`}
        />

        <div className="px-6 pb-6">
          <section className="overflow-x-auto rounded-lg border border-muted bg-container">
            <h2 className="sr-only">Vehicle list</h2>
            <table className="w-full min-w-[640px] text-left text-body-sm">
              <thead>
                <tr className="border-b border-muted bg-container text-caption uppercase tracking-[0.08em] text-tertiary">
                  <th className="px-4 py-2.5 font-medium">Status</th>
                  <th className="px-2 py-2.5 font-medium">Asset</th>
                  <th className="px-2 py-2.5 font-medium">Driver</th>
                  <th className="px-2 py-2.5 font-medium">Last update</th>
                </tr>
              </thead>
              <tbody>
                {actionRows.map((row) => (
                  <tr key={row.id} className="border-b border-muted last:border-0">
                    <td className="px-4 py-3">
                      <StatusBadge severity={row.severity} />
                    </td>
                    <td className="px-2 py-3 text-primary">{row.asset}</td>
                    <td className="px-2 py-3 text-secondary">{row.driver}</td>
                    <td className="px-2 py-3 tabular-nums text-tertiary">{row.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>
      </div>
    </AppShell>
  );
}
