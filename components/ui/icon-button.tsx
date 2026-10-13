import type { ReactNode, ButtonHTMLAttributes } from "react";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  active?: boolean;
}

export function IconButton({ children, active, className = "", ...props }: IconButtonProps) {
  return (
    <button
      type="button"
      className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors duration-200 ${
        active
          ? "bg-surface-3 text-text-primary"
          : "text-text-muted hover:bg-surface-2 hover:text-text-secondary"
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
