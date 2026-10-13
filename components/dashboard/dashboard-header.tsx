import { Home, ChevronRight } from "lucide-react";

export function DashboardHeader() {
  return (
    <header className="px-6 pt-6 pb-4">
      <div className="flex items-center gap-1.5 text-xs text-text-muted">
        <Home size={13} />
        <ChevronRight size={12} />
        <span>Dashboard</span>
      </div>
      <h1 className="mt-2 text-2xl font-medium text-text-primary">Dashboard</h1>
    </header>
  );
}
