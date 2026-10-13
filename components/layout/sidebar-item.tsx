import type { LucideIcon } from "lucide-react";

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

export function SidebarItem({ icon: Icon, label, active, onClick }: SidebarItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors duration-200 ${
        active
          ? "bg-action-primary text-action-primary-text"
          : "bg-surface-secondary text-secondary hover:bg-surface-elevated hover:text-primary"
      }`}
    >
      <Icon size={17} strokeWidth={1.75} />
    </button>
  );
}
