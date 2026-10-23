"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AppIcon } from "@/components/ui/app-icon";
import type { IconName } from "@/lib/icons";

export function SidebarNavLink({
  href,
  icon,
  label,
}: {
  href: string;
  icon: IconName;
  label: string;
}) {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Link
      href={href}
      aria-label={label}
      aria-current={active ? "page" : undefined}
      title={label}
      className={`inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-page ${
        active
          ? "bg-action-primary text-icon-on-color"
          : "bg-action text-icon-secondary hover:bg-raised hover:text-icon-primary"
      }`}
    >
      <AppIcon name={icon} size="lg" aria-hidden />
    </Link>
  );
}
