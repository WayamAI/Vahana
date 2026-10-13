# Chronos Reference Inventory

Source: `/Users/arkabera/Desktop/mriganko da/Chronos` (read-only reference, never modified). Compiled by exploring the actual source code, not screenshots or README descriptions.

Chronos and Vahana independently converged on the **same 2-tier token architecture** (ref palette → semantic tokens → Tailwind `@theme inline`) and the same Michroma-display/Geist-UI font split — this made adopting its patterns straightforward rather than a rewrite.

## Stack

Next.js App Router, React 19, TypeScript, Tailwind CSS v4 (CSS-first, no `tailwind.config.js`), `lucide-react` icons, `recharts`, React context for state. Vahana differs intentionally: Font Awesome (Prompt 5's explicit source) instead of Lucide — not changed to match Chronos, since Vahana's icon system is an approved requirement.

## Components studied, purpose, and reuse decision

| Component (Chronos path) | Purpose | Reused in Vahana? | Target screen |
|---|---|---|---|
| `components/ui/data-table.tsx` | Generic sortable/searchable/paginated table with container-query responsive card fallback | **Yes, pattern adapted** | Action Needed Queue (`components/dashboard/action-table.tsx`) |
| `components/ui/primitives.tsx` (`Panel`, `StatusBadge`, `EmptyState`) | Bordered card shell, tone-based status pill, centered empty state | **Yes, pattern adapted** | Health Score card, incident panel, table empty state |
| `components/layout/sidebar.tsx` | Icon rail layout, active/hover states | Already equivalent in Vahana (built independently in Prompts 2-5) | — |
| `components/rcm/*` (claim-lifecycle, work-board, command-palette, evidence drawer) | Domain-specific RCM widgets | **No** — different domain (claims vs. fleet telemetry), would be copying unrelated business logic | — |

## Table pattern adopted in Vahana's Action Needed Queue

Chronos's `data-table.tsx` is far larger in scope (column drag-reorder, CSV export, `localStorage` column persistence, container-query card collapse) than what Vahana's 6-row placeholder table needs today. Adopted the proportionate subset:

- **Sticky header**: `sticky top-0 z-10 bg-container`, `text-caption uppercase tracking-[0.08em] text-quaternary` — matches Chronos's header styling almost exactly (Vahana already had `text-[11px] uppercase` from Prompt 1; now uses the real `text-caption` semantic type token from Prompt 4 instead).
- **Row hover/selected**: `hover:bg-raised`, `transition-colors duration-150` — identical values to Chronos.
- **Sort**: clickable column headers cycling unsorted → desc → asc, with a small up/down `AppIcon` next to the active column label — same 3-state interaction as Chronos's inline header sort, simplified (no separate "Sort" dropdown menu, not needed at this row count).
- **Search**: pill input, `h-8 rounded-full border-muted bg-action`, search icon absolutely positioned left — matches Chronos's search input almost verbatim.
- **Filter chips**: Vahana already had these from Prompt 1 (`FilterChip`); now wired to actually filter the row set client-side, matching Chronos's `FilterChips` active/inactive styling (`bg-action-primary text-on-color` active, `bg-action text-tertiary` inactive).
- **Empty state**: centered `EmptyState`-style block (title + detail, `text-body-md text-tertiary` / `text-body-sm text-quaternary`) shown when a filter/search yields zero rows.

**Not adopted** (out of proportion for this dataset / no backend to justify it yet): column visibility menu, drag-to-reorder columns, CSV export, `localStorage` persistence, container-query card-view collapse (Vahana's table instead uses simple `overflow-x-auto`, consistent with the rest of the app's "desktop priority" responsive approach established in Prompt 1). Pagination also not added — the placeholder dataset is small (6 rows); would be real scope creep against "only implement interactions required for this table and supported by the data."

## Design tokens — confirms, doesn't change, Vahana's existing system

Chronos's ref/semantic token names overlap heavily with Vahana's own (`--surface-container`, `--surface-raised`, `--text-primary/secondary/tertiary/quaternary`, `--stroke-muted/default`, feedback `content/icon/stroke/background` per tone). No token changes were needed in Vahana as a result of this study — it validated the architecture from Prompts 3-4 rather than requiring a rework.

## Typography

Chronos's semantic type names (`display-page`, `display-metric`, `heading-lg/md/sm`, `body-lg/md/sm`, `label-md/sm`, `caption`) are the same names Vahana already implemented in Prompt 4. Confirms the type scale, no changes required.

## Intentional differences from Chronos (documented, not silently copied)

1. **Icon library**: Font Awesome (Vahana, per Prompt 5) vs. Lucide (Chronos). Vahana's explicit system design requirement takes precedence.
2. **No command palette, evidence drawer, or claim-lifecycle widgets**: Chronos's RCM domain (insurance/claims) has no equivalent in Vahana's fleet-telemetry domain; not copied.
3. **No column drag-reorder / CSV export / localStorage column persistence**: disproportionate to Vahana's current 6-row placeholder dataset and lack of a real backend; flagged as a future addition once real telemetry data and column-count justify it, not implemented preemptively.
4. **No container-query responsive card view for the table**: Vahana's existing responsive strategy (desktop-first, `overflow-x-auto` fallback) was established in Prompt 1 and preserved rather than replaced.
