import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icons, type IconName } from "@/lib/icons";

const ICON_SIZE_VAR = {
  xs: "var(--icon-size-xs)",
  sm: "var(--icon-size-sm)",
  md: "var(--icon-size-md)",
  lg: "var(--icon-size-lg)",
  xl: "var(--icon-size-xl)",
  "2xl": "var(--icon-size-2xl)",
  "3xl": "var(--icon-size-3xl)",
} as const;

export type IconSize = keyof typeof ICON_SIZE_VAR;

interface AppIconProps {
  name: IconName;
  size?: IconSize;
  className?: string;
  /** Icon color, e.g. "text-icon-secondary" or a feedback tone like "text-error-icon". */
  tone?: string;
  "aria-hidden"?: boolean;
  "aria-label"?: string;
}

export function AppIcon({
  name,
  size = "md",
  className = "",
  tone,
  "aria-hidden": ariaHidden,
  "aria-label": ariaLabel,
}: AppIconProps) {
  const dimension = ICON_SIZE_VAR[size];

  return (
    <FontAwesomeIcon
      icon={icons[name]}
      className={`inline-flex flex-shrink-0 ${tone ?? ""} ${className}`}
      style={{ width: dimension, height: dimension }}
      aria-hidden={ariaHidden}
      aria-label={ariaLabel}
    />
  );
}
