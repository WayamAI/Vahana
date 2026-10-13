"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  Car,
  TriangleAlert,
  CalendarDays,
  Wrench,
  FileText,
  Settings,
  SunMoon,
} from "lucide-react";
import { SidebarItem } from "@/components/layout/sidebar-item";

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: "Dashboard" },
  { icon: Car, label: "Vehicles" },
  { icon: TriangleAlert, label: "Alerts" },
  { icon: CalendarDays, label: "Calendar" },
  { icon: Wrench, label: "Maintenance" },
  { icon: FileText, label: "Documents" },
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
        <SidebarItem icon={SunMoon} label="Theme" />
        <SidebarItem icon={Settings} label="Settings" />
      </div>
    </aside>
  );
}
