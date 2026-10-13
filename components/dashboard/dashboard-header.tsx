import { AppIcon } from "@/components/ui/app-icon";

export function DashboardHeader() {
  return (
    <header className="px-6 pt-6 pb-4">
      <div className="flex items-center gap-1.5 text-caption text-quaternary">
        <AppIcon name="home" size="xs" aria-hidden />
        <AppIcon name="chevronRight" size="xs" aria-hidden />
        <span>Dashboard</span>
      </div>
      <h1 className="mt-2 font-display text-display-page text-primary">Dashboard</h1>
    </header>
  );
}
