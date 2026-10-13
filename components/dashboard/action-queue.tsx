"use client";

import { useMemo, useState } from "react";
import { AppIcon } from "@/components/ui/app-icon";
import { FilterChip } from "@/components/ui/filter-chip";
import { actionRows, type Severity } from "@/lib/placeholder-data";
import { ActionTable } from "@/components/dashboard/action-table";

type FilterValue = "all" | Severity;

export function ActionQueue() {
  const [activeFilter, setActiveFilter] = useState<FilterValue>("all");
  const [query, setQuery] = useState("");

  // Chip counts are derived from the actual row data below rather than
  // hardcoded, so they can never drift out of sync with what the table
  // actually shows — placeholder data, but an honest count of it.
  const filters: { value: FilterValue; label: string; count: number }[] = useMemo(
    () => [
      { value: "all", label: "All", count: actionRows.length },
      {
        value: "critical",
        label: "Critical",
        count: actionRows.filter((r) => r.severity === "critical").length,
      },
      {
        value: "warning",
        label: "Warning",
        count: actionRows.filter((r) => r.severity === "warning").length,
      },
      {
        value: "info",
        label: "Info",
        count: actionRows.filter((r) => r.severity === "info").length,
      },
    ],
    []
  );

  const visibleRows = useMemo(() => {
    return actionRows.filter((row) => {
      const matchesFilter = activeFilter === "all" || row.severity === activeFilter;
      const q = query.trim().toLowerCase();
      const matchesQuery =
        q.length === 0 ||
        row.asset.toLowerCase().includes(q) ||
        row.description.toLowerCase().includes(q) ||
        row.driver.toLowerCase().includes(q);
      return matchesFilter && matchesQuery;
    });
  }, [activeFilter, query]);

  return (
    <section className="rounded-lg border border-muted bg-container">
      <div className="flex items-center justify-between gap-3 px-4 py-3.5">
        <h2 className="min-w-0 flex-shrink truncate text-heading-sm text-primary">
          Action Needed Queue{" "}
          <span className="tabular-nums text-tertiary">({actionRows.length})</span>
        </h2>
        <div className="relative w-full max-w-[12rem] flex-shrink-0">
          <AppIcon
            name="search"
            size="xs"
            tone="text-icon-tertiary"
            aria-hidden
            className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search"
            aria-label="Search action queue"
            className="h-8 w-full rounded-full border border-muted bg-action py-1 pr-3 pl-8 text-label-sm text-secondary placeholder:text-tertiary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 px-4 pb-3.5">
        {filters.map((filter) => (
          <FilterChip
            key={filter.value}
            label={filter.label}
            count={filter.count}
            active={activeFilter === filter.value}
            onClick={() => setActiveFilter(filter.value)}
          />
        ))}
      </div>

      <ActionTable rows={visibleRows} />
    </section>
  );
}
