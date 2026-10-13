import { AppShell } from "@/components/layout/app-shell";

// Prompt 2 scope: app shell + sidebar only. The full dashboard content
// built in Prompt 1 (components/dashboard/dashboard-shell.tsx) is kept
// on disk and will be re-mounted once a later system design prompt
// calls for it again (see docs/SYSTEM-DESIGN.md).
export default function Home() {
  return (
    <AppShell>
      <h1 className="px-6 pt-6 font-display text-display-page text-primary">Dashboard</h1>
    </AppShell>
  );
}
