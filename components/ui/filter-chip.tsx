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
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-label-sm transition-colors duration-200 ${
        active
          ? "border-transparent bg-action-primary text-on-color"
          : "border-muted bg-action text-tertiary hover:border-default hover:bg-raised-2"
      }`}
    >
      {label}
      <span className="tabular-nums opacity-70">{count}</span>
    </button>
  );
}
