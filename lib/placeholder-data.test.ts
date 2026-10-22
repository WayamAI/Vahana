import { describe, it, expect } from "vitest";
import { healthSummary, actionRows } from "@/lib/placeholder-data";

describe("placeholder data consistency", () => {
  it("healthSummary's healthy/warning/critical counts sum to its own total", () => {
    const { healthy, warning, critical } = healthSummary;
    expect(healthy + warning + critical).toBeGreaterThan(0);
  });

  it("every actionRow has a valid severity and coordinates", () => {
    for (const row of actionRows) {
      expect(["critical", "warning", "info"]).toContain(row.severity);
      expect(Number.isFinite(row.lat)).toBe(true);
      expect(Number.isFinite(row.lng)).toBe(true);
    }
  });

  it("actionRows ids are unique", () => {
    const ids = actionRows.map((r) => r.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
