"use client";

import { useMemo, useState } from "react";
import type { ActionRow, Severity } from "@/lib/placeholder-data";
import { AppIcon } from "@/components/ui/app-icon";

const DOT_TONE: Record<Severity, string> = {
  critical: "bg-error",
  warning: "bg-warning",
  info: "bg-info",
};

type SortKey = "asset" | "time";
type SortDirection = "asc" | "desc";

const SORTABLE_COLUMNS: { key: SortKey; label: string }[] = [
  { key: "asset", label: "Asset" },
  { key: "time", label: "Time" },
];

export function ActionTable({ rows }: { rows: ActionRow[] }) {
  const [sort, setSort] = useState<{ key: SortKey; direction: SortDirection } | null>(null);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const sortedRows = useMemo(() => {
    if (!sort) return rows;
    const copy = [...rows];
    copy.sort((a, b) => {
      const result = a[sort.key].localeCompare(b[sort.key]);
      return sort.direction === "asc" ? result : -result;
    });
    return copy;
  }, [rows, sort]);

  const toggleSort = (key: SortKey) => {
    setSort((current) => {
      if (current?.key !== key) return { key, direction: "desc" };
      if (current.direction === "desc") return { key, direction: "asc" };
      return null;
    });
  };

  const toggleRow = (id: string) => {
    setSelected((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const allSelected = rows.length > 0 && selected.size === rows.length;
  const someSelected = selected.size > 0 && !allSelected;

  const toggleAll = () => {
    setSelected(allSelected ? new Set() : new Set(rows.map((r) => r.id)));
  };

  if (rows.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-1.5 border-t border-muted px-6 py-10 text-center">
        <div className="text-body-md text-tertiary">No rows match this filter</div>
        <div className="text-body-sm text-quaternary">Try a different filter or search term.</div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto border-t border-muted">
      <table className="w-full min-w-[720px] text-left text-body-sm">
        <thead>
          <tr className="sticky top-0 z-10 border-b border-muted bg-container text-caption uppercase tracking-[0.08em] text-quaternary">
            <th className="w-10 px-4 py-2.5">
              <input
                type="checkbox"
                checked={allSelected}
                ref={(el) => {
                  if (el) el.indeterminate = someSelected;
                }}
                onChange={toggleAll}
                aria-label="Select all rows"
                className="h-3.5 w-3.5 rounded-sm border-default bg-raised"
              />
            </th>
            <th className="px-2 py-2.5 font-medium">Priority</th>
            {SORTABLE_COLUMNS.map((col) => (
              <th key={col.key} className="px-2 py-2.5 font-medium">
                <button
                  type="button"
                  onClick={() => toggleSort(col.key)}
                  className="inline-flex items-center gap-1 hover:text-secondary"
                >
                  {col.label}
                  {sort?.key === col.key && (
                    <AppIcon
                      name={sort.direction === "asc" ? "chevronUp" : "chevronDown"}
                      size="xs"
                      aria-hidden
                    />
                  )}
                </button>
              </th>
            ))}
            <th className="px-2 py-2.5 font-medium">Description</th>
            <th className="px-2 py-2.5 font-medium">Driver</th>
          </tr>
        </thead>
        <tbody>
          {sortedRows.map((row) => (
            <tr
              key={row.id}
              className={`border-b border-muted transition-colors duration-150 hover:bg-raised ${
                selected.has(row.id) ? "bg-raised" : ""
              }`}
            >
              <td className="px-4 py-2.5">
                <input
                  type="checkbox"
                  checked={selected.has(row.id)}
                  onChange={() => toggleRow(row.id)}
                  aria-label={`Select ${row.asset}`}
                  className="h-3.5 w-3.5 rounded-sm border-default bg-raised"
                />
              </td>
              <td className="px-2 py-2.5">
                <span className="inline-flex items-center gap-1.5">
                  <span className={`h-1.5 w-1.5 rounded-full ${DOT_TONE[row.severity]}`} />
                  <span className="text-secondary">
                    {row.severity[0].toUpperCase() + row.severity.slice(1)}
                  </span>
                </span>
              </td>
              <td className="px-2 py-2.5 text-primary">{row.asset}</td>
              <td className="px-2 py-2.5 tabular-nums text-secondary">{row.time}</td>
              <td className="px-2 py-2.5 text-secondary">{row.description}</td>
              <td className="px-2 py-2.5 text-secondary">{row.driver}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
