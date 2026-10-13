"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { FilterChip } from "@/components/ui/filter-chip";
import { filterChips, actionRows } from "@/lib/placeholder-data";
import { ActionTable } from "@/components/dashboard/action-table";

export function ActionQueue() {
  const [activeFilter, setActiveFilter] = useState("All");
  const total = filterChips.find((f) => f.label === "All")?.count ?? actionRows.length;

  return (
    <section className="rounded-lg border border-border bg-surface-1">
      <div className="flex items-center justify-between px-4 py-3.5">
        <h2 className="text-sm font-medium text-text-primary">
          Action Needed Queue{" "}
          <span className="tabular-nums text-text-muted">({total})</span>
        </h2>
        <button
          type="button"
          aria-label="Search"
          className="flex h-8 w-8 items-center justify-center rounded-md text-text-muted transition-colors duration-200 hover:bg-surface-2 hover:text-text-secondary"
        >
          <Search size={15} />
        </button>
      </div>

      <div className="flex flex-wrap gap-2 px-4 pb-3.5">
        {filterChips.map((chip) => (
          <FilterChip
            key={chip.label}
            label={chip.label}
            count={chip.count}
            active={activeFilter === chip.label}
            onClick={() => setActiveFilter(chip.label)}
          />
        ))}
      </div>

      <ActionTable rows={actionRows} />
    </section>
  );
}
