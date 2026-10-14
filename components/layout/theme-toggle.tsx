"use client";

import { IconButton } from "@/components/ui/icon-button";
import { getStoredTheme, setTheme } from "@/lib/theme";

export function ThemeToggle() {
  return (
    <IconButton
      icon="theme"
      label="Toggle light / dark mode"
      variant="subtle"
      shape="circle"
      iconSize="lg"
      onClick={() => {
        const current = getStoredTheme();
        setTheme(current === "dark" ? "light" : "dark");
      }}
    />
  );
}
