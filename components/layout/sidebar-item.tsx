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
          ? "bg-[#f1f1f1] text-[#151515]"
          : "bg-white/[0.06] text-white/50 hover:bg-white/[0.1] hover:text-white/70"
      }`}
    >
      <Icon size={17} strokeWidth={1.75} />
    </button>
  );
}
