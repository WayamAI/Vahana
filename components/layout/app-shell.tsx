import type { ReactNode } from "react";
import { Sidebar } from "@/components/layout/sidebar";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-page">
      <Sidebar />
      <main className="flex min-w-0 flex-1 overflow-hidden bg-page">{children}</main>
    </div>
  );
}
