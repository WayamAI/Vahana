# Vahana — System Design Requirements Log

This document is the running record of all system design prompts supplied for Vahana, their requirements, conflicts, and implementation status. Updated after every prompt per project rules established 2026-10-13.

No reference screenshots have been attached to any prompt so far (Prompt 1 or Prompt 2). All visual work is derived from written specs only. This is a standing limitation, not a resolved issue — flag again if a future prompt also omits its image.

---

## Prompt 1 of 5 — Dashboard visual foundation (received first, retroactively logged)

**Scope:** Full dashboard shell — sidebar, header, map placeholder + Health Score card overlay, Action Needed filter queue + table, right incident detail panel. Static placeholder data only.

**Status:** Implemented in commit `34a25c8`.

**Key decisions:**
- Stack: Next.js App Router, TypeScript, Tailwind v4 (CSS-first `@theme inline` tokens), lucide-react, no additional UI library.
- Sidebar nav icons (Prompt 1): Dashboard, Fleet, Map, Telemetry, Alerts + Settings/Account utility icons.
- Components under `components/dashboard/` (page-specific) and `components/ui/` (primitives): `sidebar.tsx`, `sidebar-item.tsx`, `dashboard-header.tsx`, `map-stage.tsx`, `health-score-card.tsx`, `action-queue.tsx`, `action-table.tsx`, `incident-panel.tsx`, `filter-chip.tsx`, `status-badge.tsx`, `metric-card.tsx`, `driver-card.tsx`, `icon-button.tsx`.
- Design tokens in `app/globals.css`: `--background`, `--surface-1/2/3`, `--surface-hover`, `--border`, `--border-strong`, `--text-primary/secondary/muted`, severity colors (critical/warning/info/success) with `-bg` variants, radii, shadows.
- `lib/placeholder-data.ts` holds all mock data, explicitly labeled as non-production.

**Verification:** `npm run build`, `npm run lint` pass. Visually confirmed in browser at desktop width (1440px). Narrow-viewport behavior relies on standard Tailwind responsive classes (`hidden md:flex`, `hidden lg:flex`, `overflow-x-auto`), not live-screenshot-verified due to a browser-automation resize limitation.

---

## Prompt 2 of 5 — App shell + sidebar only

**Scope:** Rebuild ONLY the full-screen app shell and left sidebar, matching a (not-attached) reference screenshot. Main content area must stay empty except a temporary "Dashboard" heading. Explicitly excludes: Health Score card, map, table, filters, incident panel, telemetry cards, recent activity — i.e. everything Prompt 1 built into the main content area.

**Conflict identified (per no-silent-resolution rule) — resolved per user decision 2026-10-13:**
1. **Content conflict:** Prompt 1 fully populated the main content area; Prompt 2 requires it empty for this pass. **Resolution (user-approved):** existing dashboard components (`components/dashboard/*`, `components/ui/*` from Prompt 1) are preserved on disk, untouched, but no longer rendered from `app/page.tsx`. They are reactivatable once a later prompt calls for full dashboard content again.
2. **Sidebar nav list conflict:** Prompt 1 nav = Dashboard, Fleet, Map, Telemetry, Alerts. Prompt 2 nav = Dashboard, Vehicles, Alerts, Calendar, Maintenance, Documents. **Resolution (user-approved):** Prompt 2's nav list is the current source of truth. The new sidebar lives in `components/layout/` (per Prompt 2's suggested structure) rather than overwriting `components/dashboard/sidebar.tsx`, so Prompt 1's sidebar is preserved for potential future reuse alongside its dashboard content.

**New structure (per Prompt 2):**
```
components/layout/
  app-shell.tsx
  sidebar.tsx
  sidebar-item.tsx
```
`app/page.tsx` now renders `<AppShell>` with a temporary "Dashboard" heading instead of `<DashboardShell>`.

**New/adjusted design tokens:** `--app-bg`, `--sidebar-bg` added alongside (not replacing) Prompt 1's `--background`/`--surface-*` tokens, since the dashboard components still depend on the latter for their future reactivation.

**Status:** In progress this session.

---

## Requirement Traceability Matrix

| Req | Source | Module | Status | Verification |
|---|---|---|---|---|
| Dark design tokens | Prompt 1 | `app/globals.css` | Complete | Build + visual |
| Icon sidebar (Prompt-1 nav) | Prompt 1 | `components/dashboard/sidebar.tsx` | Complete, preserved but unmounted | Visual (desktop) |
| Dashboard header | Prompt 1 | `components/dashboard/dashboard-header.tsx` | Complete, preserved but unmounted | Visual |
| Map placeholder + Health Score overlay | Prompt 1 | `components/dashboard/map-stage.tsx`, `health-score-card.tsx` | Complete, preserved but unmounted | Visual |
| Action Needed queue + table | Prompt 1 | `components/dashboard/action-queue.tsx`, `action-table.tsx` | Complete, preserved but unmounted | Visual + interaction (filter click) |
| Incident detail panel | Prompt 1 | `components/dashboard/incident-panel.tsx` | Complete, preserved but unmounted | Visual |
| Full-screen app shell (100vh, no body scroll) | Prompt 2 | `components/layout/app-shell.tsx` | Pending | — |
| Sidebar (Prompt-2 nav, 64-72px, circular active state) | Prompt 2 | `components/layout/sidebar.tsx`, `sidebar-item.tsx` | Pending | — |
| Main content container (empty + temp heading) | Prompt 2 | `app/page.tsx` | Pending | — |
| Logo placeholder (30-36px, abstract) | Prompt 2 | `components/layout/sidebar.tsx` | Pending | — |

## Implementation Checklist (current)

- [x] Prompt 1 dashboard foundation
- [x] Document Prompt 1 + Prompt 2 retroactively/live, log conflicts
- [ ] Build `components/layout/app-shell.tsx`
- [ ] Build `components/layout/sidebar-item.tsx` (Prompt-2 sizing/color spec)
- [ ] Build `components/layout/sidebar.tsx` (Prompt-2 nav list + logo placeholder)
- [ ] Add `--app-bg`/`--sidebar-bg` tokens
- [ ] Update `app/page.tsx` to render `AppShell` with temp heading only
- [ ] Verify build/lint/visual
- [ ] Configure `origin` remote to `https://github.com/WayamAI/Vahana.git` and push
- [ ] Await Prompts 3, 4, 5 before any further consolidation or "complete" claims
