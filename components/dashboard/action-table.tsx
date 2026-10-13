import type { ActionRow } from "@/lib/placeholder-data";
import { StatusBadge } from "@/components/ui/status-badge";

export function ActionTable({ rows }: { rows: ActionRow[] }) {
  return (
    <div className="overflow-x-auto border-t border-border">
      <table className="w-full min-w-[720px] text-left text-sm">
        <thead>
          <tr className="border-b border-border text-[11px] uppercase tracking-wide text-text-muted">
            <th className="w-10 px-4 py-2.5">
              <input
                type="checkbox"
                className="h-3.5 w-3.5 rounded-sm border-border-strong bg-surface-2"
              />
            </th>
            <th className="px-2 py-2.5 font-medium">Priority</th>
            <th className="px-2 py-2.5 font-medium">Asset</th>
            <th className="px-2 py-2.5 font-medium">Description</th>
            <th className="px-2 py-2.5 font-medium">Time</th>
            <th className="px-2 py-2.5 font-medium">Driver</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.id}
              className="border-b border-border transition-colors duration-150 hover:bg-surface-2"
            >
              <td className="px-4 py-2.5">
                <input
                  type="checkbox"
                  className="h-3.5 w-3.5 rounded-sm border-border-strong bg-surface-2"
                />
              </td>
              <td className="px-2 py-2.5">
                <StatusBadge severity={row.severity} />
              </td>
              <td className="px-2 py-2.5 text-text-primary">{row.asset}</td>
              <td className="px-2 py-2.5 text-text-secondary">{row.description}</td>
              <td className="px-2 py-2.5 tabular-nums text-text-secondary">{row.time}</td>
              <td className="px-2 py-2.5 text-text-secondary">{row.driver}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
