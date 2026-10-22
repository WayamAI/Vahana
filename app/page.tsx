import type { Metadata } from "next";
import { AppShell } from "@/components/layout/app-shell";
import { DashboardContent } from "@/components/dashboard/dashboard-content";

export const metadata: Metadata = {
  title: "Dashboard | Vahana",
};

export default function Home() {
  return (
    <AppShell>
      <DashboardContent />
    </AppShell>
  );
}
