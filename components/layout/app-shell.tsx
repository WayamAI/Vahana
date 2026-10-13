import type { ReactNode } from "react";
import { Sidebar } from "@/components/layout/sidebar";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-app-bg">
      <Sidebar />
      <main className="min-w-0 flex-1 overflow-y-auto bg-app-bg">{children}</main>
    </div>
  );
}
