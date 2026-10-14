"use client";

import { useState } from "react";
import { SidebarItem } from "@/components/layout/sidebar-item";
import { IconButton } from "@/components/ui/icon-button";
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
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/brand/wayam-icon.svg" alt="Wayam AI" className="mb-6 h-8 w-8 rounded-lg" />

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
        <IconButton
          icon="theme"
          label="Light mode (coming soon)"
          variant="subtle"
          shape="circle"
          iconSize="lg"
          disabled
          className="cursor-not-allowed opacity-40"
        />
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
