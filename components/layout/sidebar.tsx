"use client";

import { useState } from "react";
import { SidebarItem } from "@/components/layout/sidebar-item";
import type { IconName } from "@/lib/icons";

const NAV_ITEMS: { icon: IconName; label: string }[] = [
  { icon: "dashboard", label: "Dashboard" },
  { icon: "vehicle", label: "Vehicles" },
  { icon: "warning", label: "Alerts" },
  { icon: "calendar", label: "Calendar" },
  { icon: "maintenance", label: "Maintenance" },
  { icon: "document", label: "Documents" },
];

export function Sidebar() {
  const [active, setActive] = useState(0);

  return (
    <aside className="flex h-full w-[68px] flex-shrink-0 flex-col items-center border-r border-muted bg-container py-4">
      <div
        aria-hidden
        className="mb-6 h-8 w-8 rounded-lg bg-gradient-to-br from-white/20 to-white/5"
      />

      <nav className="flex flex-1 flex-col items-center gap-2">
        {NAV_ITEMS.map((item, i) => (
          <SidebarItem
            key={item.label}
            icon={item.icon}
            label={item.label}
            active={active === i}
            onClick={() => setActive(i)}
          />
        ))}
      </nav>

      <div className="flex flex-col items-center gap-2">
        <SidebarItem icon="theme" label="Theme" />
        <SidebarItem icon="settings" label="Settings" />
      </div>
    </aside>
  );
}
