import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/layout/page-header";
import { AppIcon } from "@/components/ui/app-icon";

export default function DocumentsPage() {
  return (
    <AppShell>
      <div className="h-full w-full overflow-y-auto">
        <PageHeader title="Documents" />

        <div className="px-6 pb-6">
          <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-muted bg-container px-6 py-16 text-center">
            <AppIcon name="document" size="2xl" tone="text-icon-tertiary" aria-hidden />
            <div className="text-body-md text-secondary">No documents connected</div>
            <p className="max-w-sm text-body-sm text-tertiary">
              This workspace isn&apos;t wired to a document store yet — there&apos;s no data source
              to show here.
            </p>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
