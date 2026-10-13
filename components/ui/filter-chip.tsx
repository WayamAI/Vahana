export function FilterChip({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count: number;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors duration-200 ${
        active
          ? "border-border-strong bg-surface-3 text-text-primary"
          : "border-border bg-surface-1 text-text-secondary hover:bg-surface-2"
      }`}
    >
      {label}
      <span className="tabular-nums text-text-muted">{count}</span>
    </button>
  );
}
