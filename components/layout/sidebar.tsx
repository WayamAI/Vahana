"use client";

import { SidebarNavLink } from "@/components/layout/sidebar-nav-link";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { IconButton } from "@/components/ui/icon-button";
import type { IconName } from "@/lib/icons";

const NAV_ITEMS: { icon: IconName; label: string; href: string }[] = [
  { icon: "dashboard", label: "Dashboard", href: "/" },
  { icon: "vehicle", label: "Vehicles", href: "/vehicles" },
  { icon: "warning", label: "Alerts", href: "/alerts" },
  { icon: "calendar", label: "Calendar", href: "/calendar" },
  { icon: "maintenance", label: "Maintenance", href: "/maintenance" },
  { icon: "document", label: "Documents", href: "/documents" },
];

export function Sidebar() {
  return (
    <aside className="flex h-full w-[68px] flex-shrink-0 flex-col items-center border-r border-muted bg-container py-4">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/brand/wayam-icon.svg" alt="Wayam AI" className="mb-6 h-8 w-8 rounded-lg" />

      <nav className="flex flex-1 flex-col items-center gap-2">
        {NAV_ITEMS.map((item) => (
          <SidebarNavLink key={item.href} href={item.href} icon={item.icon} label={item.label} />
        ))}
      </nav>

      <div className="flex flex-col items-center gap-2">
        <ThemeToggle />
        <IconButton
          icon="settings"
          label="Settings (coming soon)"
          variant="subtle"
          shape="circle"
          iconSize="lg"
          disabled
          className="cursor-not-allowed opacity-40"
        />
      </div>
    </aside>
  );
}
