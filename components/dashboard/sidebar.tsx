"use client";

import { useState } from "react";
import {
  LayoutGrid,
  Truck,
  MapPin,
  Activity,
  Bell,
  Settings,
  CircleUserRound,
} from "lucide-react";
import { SidebarItem } from "@/components/ui/sidebar-item";

const NAV_ITEMS = [
  { icon: LayoutGrid, label: "Dashboard" },
  { icon: Truck, label: "Fleet" },
  { icon: MapPin, label: "Map" },
  { icon: Activity, label: "Telemetry" },
  { icon: Bell, label: "Alerts" },
];

export function Sidebar() {
  const [active, setActive] = useState(0);

  return (
    <aside className="hidden md:flex w-[72px] flex-col items-center border-r border-border bg-surface-1 py-4">
      <div className="mb-6 h-8 w-8 rounded-lg bg-surface-3" aria-hidden />

      <nav className="flex flex-1 flex-col items-center gap-1.5">
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

      <div className="flex flex-col items-center gap-1.5">
        <SidebarItem icon={Settings} label="Settings" />
        <SidebarItem icon={CircleUserRound} label="Account" />
      </div>
    </aside>
  );
}
