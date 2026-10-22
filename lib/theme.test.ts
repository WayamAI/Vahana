import { describe, it, expect, beforeEach } from "vitest";
import { getStoredTheme, setTheme } from "@/lib/theme";

describe("theme persistence", () => {
  beforeEach(() => {
    document.documentElement.removeAttribute("data-theme");
    window.localStorage.clear();
  });

  it("defaults to dark when no theme is set", () => {
    expect(getStoredTheme()).toBe("dark");
  });

  it("setTheme applies the data-theme attribute", () => {
    setTheme("light");
    expect(document.documentElement.getAttribute("data-theme")).toBe("light");
    expect(getStoredTheme()).toBe("light");
  });

  it("setTheme persists to localStorage", () => {
    setTheme("light");
    expect(window.localStorage.getItem("vahana-theme")).toBe("light");
    setTheme("dark");
    expect(window.localStorage.getItem("vahana-theme")).toBe("dark");
  });
});
