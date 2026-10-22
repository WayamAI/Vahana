import type { Metadata } from "next";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/layout/page-header";
import { actionRows } from "@/lib/placeholder-data";

export const metadata: Metadata = {
  title: "Calendar | Vahana",
};

export default function CalendarPage() {
  const agenda = [...actionRows].sort((a, b) => a.time.localeCompare(b.time));

  return (
    <AppShell>
      <div className="h-full w-full overflow-y-auto">
        <PageHeader title="Calendar" />

        <div className="px-6 pb-6">
          <section className="rounded-lg border border-muted bg-container">
            <div className="border-b border-muted px-4 py-3.5 text-heading-sm text-primary">
              Today&apos;s activity
            </div>
            <ol className="divide-y divide-[var(--stroke-muted)]">
              {agenda.map((row) => (
                <li key={row.id} className="flex items-start gap-3 px-4 py-3">
                  <span className="w-12 flex-shrink-0 tabular-nums text-caption text-tertiary">
                    {row.time}
                  </span>
                  <div>
                    <div className="text-body-sm text-primary">{row.asset}</div>
                    <div className="text-body-sm text-tertiary">{row.description}</div>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </div>
    </AppShell>
  );
}
