import type { LucideIcon } from "lucide-react";

export function SidebarItem({
  icon: Icon,
  active,
  onClick,
  label,
}: {
  icon: LucideIcon;
  active?: boolean;
  onClick?: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors duration-200 ${
        active
          ? "bg-surface-3 text-text-primary"
          : "text-text-muted hover:bg-surface-2 hover:text-text-secondary"
      }`}
    >
      <Icon size={18} strokeWidth={1.75} />
    </button>
  );
}
