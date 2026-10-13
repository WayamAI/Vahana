import type { ButtonHTMLAttributes } from "react";
import { AppIcon, type IconSize } from "@/components/ui/app-icon";
import type { IconName } from "@/lib/icons";

const CONTAINER_SIZE: Record<"sm" | "md" | "lg", string> = {
  sm: "h-8 w-8",
  md: "h-9 w-9",
  lg: "h-10 w-10",
};

const DEFAULT_ICON_SIZE: Record<"sm" | "md" | "lg", IconSize> = {
  sm: "sm",
  md: "md",
  lg: "lg",
};

const VARIANT_CLASS: Record<"ghost" | "subtle" | "inverse", string> = {
  ghost:
    "bg-transparent text-icon-tertiary hover:bg-action-tertiary-hover hover:text-icon-secondary active:bg-action-tertiary-active active:text-icon-primary",
  subtle: "bg-action text-icon-secondary hover:bg-raised hover:text-icon-primary",
  inverse: "bg-action-primary text-icon-on-color",
};

interface IconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "aria-label"> {
  icon: IconName;
  label: string;
  variant?: "ghost" | "subtle" | "inverse";
  size?: "sm" | "md" | "lg";
  iconSize?: IconSize;
  /** "rounded" (8-10px, standard toolbar/control) or "circle" (sidebar items). */
  shape?: "rounded" | "circle";
}

export function IconButton({
  icon,
  label,
  variant = "ghost",
  size = "md",
  iconSize,
  shape = "rounded",
  className = "",
  ...props
}: IconButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={`inline-flex flex-shrink-0 items-center justify-center transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-page ${shape === "circle" ? "rounded-full" : "rounded-[10px]"} ${CONTAINER_SIZE[size]} ${VARIANT_CLASS[variant]} ${className}`}
      {...props}
    >
      <AppIcon name={icon} size={iconSize ?? DEFAULT_ICON_SIZE[size]} aria-hidden />
    </button>
  );
}
