import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/layout/page-header";
import { ActionQueue } from "@/components/dashboard/action-queue";

export default function AlertsPage() {
  return (
    <AppShell>
      <div className="h-full w-full overflow-y-auto">
        <PageHeader title="Alerts" />
        <div className="px-6 pb-6">
          <ActionQueue />
        </div>
      </div>
    </AppShell>
  );
}
