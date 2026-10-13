import { IconButton } from "@/components/ui/icon-button";
import type { IconName } from "@/lib/icons";

interface SidebarItemProps {
  icon: IconName;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

export function SidebarItem({ icon, label, active, onClick }: SidebarItemProps) {
  return (
    <IconButton
      icon={icon}
      label={label}
      onClick={onClick}
      variant={active ? "inverse" : "subtle"}
      shape="circle"
      iconSize="lg"
    />
  );
}
