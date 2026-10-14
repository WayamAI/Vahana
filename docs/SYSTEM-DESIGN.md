# Vahana — System Design Requirements Log

This document is the running record of all system design prompts supplied for Vahana, their requirements, conflicts, and implementation status. Updated after every prompt per project rules established 2026-10-13.

No reference screenshots have been attached to any prompt so far (Prompts 1 through 5). All visual work is derived from written specs only. This is a standing limitation, not a resolved issue — flag again if a future prompt also omits its image.

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

## Prompt 3 of 5 — 2-tier color token architecture

**Scope:** Replace scattered/hardcoded colors with a structured Tier 1 (reference) → Tier 2 (semantic) → component token system, integrated with Tailwind v4's `@theme inline`. Dark-mode-first; semantic names chosen so light mode can be added later without touching components. Update only the currently-mounted layout pieces (AppShell, Sidebar, SidebarItem, page.tsx); do not redesign layout or add dashboard content.

**No reference screenshots attached** (same as Prompts 1 and 2). Proceeded from the written spec, consistent with the user's standing direction on this point.

**Implementation:**
- `app/globals.css` rewritten with Tier 1 reference tokens (`--ref-gray-0..1000`, `--ref-{green,blue,orange,red,yellow}-{400,500}`) and Tier 2 semantic tokens (page, surface ×7, text ×7, icon ×6, stroke ×5, action ×8, feedback ×9).
- Prompt 1/2's legacy var names (`--background`, `--surface-1/2/3`, `--border`, `--critical`, etc.) kept as **aliases** onto the new semantic tokens, so the preserved-but-unmounted dashboard components (`components/dashboard/*`, most of `components/ui/*`) keep rendering correctly with zero edits — they're just now backed by the 2-tier system instead of their own literal values.
- New Tailwind utilities added: `bg-page`, `bg-surface-primary/secondary/tertiary/elevated`, `text-primary/secondary/tertiary/muted`, `border-subtle/default/strong`, `bg-action-primary(-hover/-active)`, `text-action-primary-text`, `bg-action-secondary(-hover)`, existing `text-critical/warning/success/info` now sourced from the new feedback tokens.
- `components/layout/app-shell.tsx`, `sidebar.tsx`, `sidebar-item.tsx`, and `app/page.tsx` migrated onto the new semantic utilities, replacing the Prompt 2 `bg-app-bg`/`bg-sidebar-bg`/`border-border` aliases and SidebarItem's literal `bg-[#f1f1f1]`, `text-white/50`, etc.

**Known tradeoff:** Tailwind v4 generates `bg-*`/`text-*`/`border-*`/`ring-*` together from every `--color-*` token, so e.g. `--color-primary` (for the `text-primary` utility) also produces unused `bg-primary`/`border-primary` aliases. Harmless, but worth knowing before reaching for an unfamiliar utility name.

**Remaining hardcoded colors (intentionally not touched):**
1. `components/layout/sidebar.tsx:32` — logo placeholder gradient (`from-white/20 to-white/5`). Decorative one-off mark, not a semantic UI surface; same reasoning as Prompt 2.
2. `components/dashboard/map-stage.tsx:5-6` — radial-gradient hex + rgba grid-line texture. Unmounted Prompt 1 component, out of this prompt's scope (only mounted layout pieces were in scope); still uses the legacy `border-border` alias, not yet migrated to `border-subtle`.

**Status: implemented, build/lint/typecheck clean, audited for hardcoded colors. Safe to proceed to Prompt 4.**

## Prompt 4 of 5 — color architecture v2, semantic tokens, typography system

**Scope:** Full reference palette (gray 16-step + 10 color families), a richer semantic layer (text/icon/stroke/surface/action-surface/feedback, each following Object → Role → Element → State), and a two-typeface system (Michroma for display/identity, Geist for functional UI) with a semantic type scale. Update only AppShell, Sidebar, SidebarItem, and global typography — no layout or dashboard-content changes.

**No reference screenshots attached** (4th prompt in a row without one). Proceeded from the written spec, consistent with the user's standing direction.

**Conflict identified — Prompt 4 explicitly supersedes Prompt 3's token architecture, not an ambiguous conflict requiring a decision:** Prompt 4's own "FINAL MIGRATION" section instructs searching for and migrating hardcoded/legacy values, and its "Part I/II" headers fully re-specify the reference palette and semantic surface/action naming that Prompt 3 introduced one prompt earlier (e.g. `surface.primary/secondary/tertiary/elevated` → `surface.container/raised/raised-x2/action`; `--ref-gray-0..1000` 16-step scale → a differently-stepped 16-step scale; `stroke.subtle/default/strong` → `stroke.muted/default/active`). Treated as an intentional, explicit replacement and proceeded without blocking, per the project's "continue phase by phase" instruction — logged here rather than silently absorbed.
- Prompt 3's token values/names are fully replaced in `app/globals.css`.
- Prompt 3's shorter utility aliases that nothing outside `components/layout/*` depended on (`bg-surface-primary/secondary/tertiary/elevated`, `border-subtle/default/strong` as previously defined) were removed rather than kept alongside the new system, since keeping two parallel "new" systems would recreate exactly the scattered-token problem both prompts are trying to eliminate.
- Prompt 1/2's legacy var names (`--background`, `--surface-1/2/3`, `--border`, `--critical`, etc.) are still preserved as aliases, now pointing at the Prompt 4 tokens, so the unmounted dashboard components keep rendering unchanged.
- Per Prompt 4's explicit "FEEDBACK COLOR USAGE" mapping, the legacy "Info" severity (previously a neutral gray in Prompt 1) now resolves to `feedback.info` (blue) — a visible color change for the unmounted `StatusBadge`/`action-table` "Info" rows whenever that code is reactivated.

**Implementation:**
- `app/layout.tsx`: added Michroma via `next/font/google` (weight 400 only), reused the existing Geist loading. `body` now uses `bg-page text-primary font-sans`.
- `app/globals.css`: full Tier 1 reference palette + Tier 2 semantic tokens (text ×5, icon ×5, stroke ×5, surface ×6, action-surface primary/secondary/tertiary ×4 states each, feedback ×5 categories ×4 properties) + semantic type scale (`display-page`, `display-metric(-xl)`, `heading-lg/md/sm`, `body-lg/md/sm`, `label-md/sm`, `caption`) as Tailwind `text-*` size tokens pairing with `font-display`/`font-sans`.
- `components/layout/sidebar.tsx`: `bg-page` → `bg-container`, `border-subtle` → `border-muted`.
- `components/layout/sidebar-item.tsx`: inactive `bg-surface-secondary`/`text-secondary` → `bg-action`/`text-icon-tertiary`; hover `bg-surface-elevated`/`text-primary` → `bg-raised`/`text-icon-secondary`; active icon `text-action-primary-text` → `text-icon-on-color`.
- `app/page.tsx`: temp heading now `font-display text-display-page text-primary` — the exact example given in the prompt.

**Known gap — icon utilities aren't literally named `icon-primary` etc.:** Tailwind has no bare "icon" utility category; the requested `icon-primary/secondary/tertiary/quaternary` tokens are implemented as dedicated `--color-icon-*` CSS variables, applied in components via the generated `text-icon-*` utilities (SVGs inherit via `currentColor`). Functionally equivalent, but the class name in JSX reads `text-icon-tertiary`, not `icon-tertiary`.

**Status: implemented, build/lint/typecheck clean, visually verified (page essentially black, sidebar barely elevated, active nav = light-gray/dark-icon, hover = subtle raised, Michroma renders distinctly from Geist). Safe to proceed to Prompt 5.**

## Prompt 5 of 5 — Iconography system

**Scope:** Central icon registry on Font Awesome, an `AppIcon` primitive, an `IconButton` with ghost/subtle/inverse variants, an icon size scale, and migrating AppShell/Sidebar/SidebarItem/utility buttons off ad hoc icon imports. No layout, typography, or color-architecture changes except where needed to consume existing semantic icon tokens.

**No reference screenshot attached** (5th prompt in a row without one). Proceeded from the written spec.

**Conflict/constraint identified — Font Awesome Free has no usable thin/light outline style for most needed glyphs:** the brief asks for "thin outlined" icons and names Font Awesome as the source, but Free's "regular" style (the only non-solid free style) only covers ~160 glyphs — mostly literal objects (house, bell, calendar, file, envelope, cloud, map, trash-can) — and has no equivalent for gauge, car, wrench, arrows, chevrons, magnifying-glass, or most of this registry's other needs. True thin/light/duotone weight is Pro-only. Per the brief's own rule 12 ("visual consistency is more important" than matching a literal weight when a style isn't available everywhere), the registry standardizes on **solid** throughout rather than mixing solid and regular and producing inconsistent icon weight. Documented in `lib/icons.ts` and here rather than silently picking regular-where-available.

**Implementation:**
- Installed `@fortawesome/fontawesome-svg-core`, `@fortawesome/free-solid-svg-icons`, `@fortawesome/free-regular-svg-icons` (installed for completeness/future use, not currently consumed), `@fortawesome/react-fontawesome`. Font Awesome wasn't previously installed.
- `lib/icons.ts`: named-import-only registry (50 semantic names), `IconName = keyof typeof icons` for autocomplete/type safety.
- `app/globals.css`: `--icon-size-xs..3xl` (12-28px) scale; new `bg-action-tertiary-hover`/`-active` Tailwind aliases (the ghost `IconButton` variant needed CSS vars Prompt 4 defined but never exposed to Tailwind).
- `components/ui/app-icon.tsx`: the `AppIcon` primitive — `name`/`size`/`className`/`tone`/`aria-hidden`/`aria-label`, `inline-flex flex-shrink-0` for optical alignment.
- `components/ui/icon-button.tsx`: rebuilt from scratch (the old children-based version had zero call sites anywhere in the codebase, so nothing broke) with `icon`/`label`/`variant`(ghost\|subtle\|inverse)/`size`(sm 32\|md 36\|lg 40)/`iconSize`/`shape`(rounded 10px\|circle).
- `components/layout/sidebar-item.tsx`: now a thin `IconButton` wrapper (`variant=inverse` active / `subtle` inactive, `shape=circle`, `iconSize=lg`) instead of reimplementing button styling.
- `components/layout/sidebar.tsx`: nav list now references semantic icon names instead of importing Lucide components directly. "Alerts" → `warning`, "Documents" → `document`, per the spec's suggested sidebar mapping.

**Status: implemented, build/lint/typecheck clean, visually verified (consistent solid weight, active/inactive/hover states correct, theme-toggle glyph renders). Lucide is now fully absent from mounted code — confined to the still-unmounted Prompt 1 dashboard components. Last of the 5 prompts — see the consolidated summary below.**

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
| Main content container (empty + temp heading) | Prompt 2 | `app/page.tsx` | Complete | Visual |
| Logo placeholder (30-36px, abstract) | Prompt 2 | `components/layout/sidebar.tsx` | Complete | Visual |
| Tier 1 reference tokens | Prompt 3 | `app/globals.css` | Complete | Build + grep audit |
| Tier 2 semantic tokens (page/surface/text/icon/stroke/action/feedback) | Prompt 3 | `app/globals.css` | Complete | Build + grep audit |
| Tailwind semantic utility integration | Prompt 3 | `app/globals.css` (`@theme inline`) | Complete | Build |
| Migrate AppShell/Sidebar/SidebarItem/page.tsx off hardcoded colors | Prompt 3 | `components/layout/*`, `app/page.tsx` | Complete | grep audit (0 remaining in mounted code) |
| Migrate unmounted Prompt 1 dashboard components to new tokens | Prompt 3/4 (deferred) | `components/dashboard/*` | Not started — out of scope until reactivated | — |
| Full reference palette (11 families) | Prompt 4 | `app/globals.css` | Complete | Build + grep audit |
| Semantic tokens: text/icon/stroke/surface/action-surface/feedback | Prompt 4 | `app/globals.css` | Complete | Build + grep audit |
| Michroma font loading | Prompt 4 | `app/layout.tsx` | Complete | Build + visual |
| Geist confirmed as functional UI font | Prompt 4 | `app/layout.tsx` (pre-existing) | Complete | Visual |
| Semantic type scale (display/heading/body/label/caption) | Prompt 4 | `app/globals.css` | Complete | Build; only `display-page` applied so far (temp heading) |
| Migrate AppShell/Sidebar/SidebarItem/page.tsx to Prompt 4 tokens | Prompt 4 | `components/layout/*`, `app/page.tsx` | Complete | grep audit (0 hardcoded colors in mounted code) |
| Font Awesome install + icon registry | Prompt 5 | `lib/icons.ts` | Complete | Build + node existence checks |
| AppIcon primitive | Prompt 5 | `components/ui/app-icon.tsx` | Complete | Build + visual |
| IconButton (ghost/subtle/inverse) | Prompt 5 | `components/ui/icon-button.tsx` | Complete | Build + visual (sidebar uses subtle/inverse) |
| Icon size scale | Prompt 5 | `app/globals.css` | Complete | Build |
| Migrate Sidebar/SidebarItem off Lucide | Prompt 5 | `components/layout/sidebar.tsx`, `sidebar-item.tsx` | Complete | grep audit (0 Lucide imports in mounted code) |
| Migrate unmounted Prompt 1 components to AppIcon/Font Awesome | Prompt 5 (deferred) | `components/dashboard/*`, `components/ui/{driver,status-badge,metric}-card.tsx`, `components/ui/sidebar-item.tsx` (the other one) | Not started — out of scope until reactivated | — |

## Consolidated status after all 5 prompts (superseded — see Chronos/branding pass below)

All 5 system design prompts have now been reviewed and implemented in sequence. Summary:
- **Mounted UI** (`AppShell`, `Sidebar`, `SidebarItem`, `app/page.tsx`): fully implements Prompts 2-5 — app shell, sidebar, 2-tier color tokens (now on the Prompt 4 palette), Michroma/Geist typography, and the Font Awesome icon system. Zero hardcoded colors, zero Lucide imports, zero emoji.
- **Unmounted dashboard content** (`components/dashboard/*`, most of `components/ui/*`): Prompt 1's full dashboard (map, health score, action table, incident panel) is preserved on disk but not rendered, per the Prompt 2 decision. It still uses Lucide icons, the Prompt 1 token names (now aliased through to Prompt 4's palette, so it still renders correctly if reactivated), and hasn't been migrated to the new type scale or icon system.
- **No prompt has had a reference screenshot attached** — every visual decision across all 5 prompts was made from written specs alone.
- **Next step, if dashboard content is to return:** migrate `components/dashboard/*` and the remaining `components/ui/*` files onto the Prompt 4 token names and Prompt 5 icon system directly (rather than relying on the legacy alias chain), then re-mount `<DashboardShell>` (or its successor) from `app/page.tsx`.

---

## Chronos study + Wayam AI branding + dashboard reactivation (post-5-prompt pass)

This pass completed the "next step" above: the full Prompt 1 dashboard was migrated onto the current (Prompt 4/5) token and icon system and reactivated, Chronos (`/Users/arkabera/Desktop/mriganko da/Chronos`) was studied as a structural/visual reference (full inventory in `docs/CHRONOS-REFERENCE.md`), and official Wayam AI branding was integrated.

**Branding assets** (sourced from `/Users/arkabera/Desktop/Wayam AI/AIDLC Wayam All assets`, the canonical shared brand folder — identified by inspecting actual SVG fill colors, not filenames, since several similarly-named files existed across other Wayam AI product folders):
- `public/brand/wayam-icon.svg` — icon-only mark, used as the sidebar brand icon (`components/layout/sidebar.tsx`) and the browser favicon (`app/icon.svg`, Next.js metadata-file convention, confirmed served at `/icon.svg` in the build output).
- `public/brand/wayam-wordmark-dark-bg.svg` / `wayam-wordmark-light-bg.svg` — full wordmark variants, copied for completeness but not yet placed anywhere (no login screen, footer, or other full-wordmark-sized surface exists yet in Vahana's current single-page shell).
- Page metadata (`app/layout.tsx`) now reads "Vahana | Wayam AI" — Vahana is not renamed.
- Verified at runtime: `npm run build` + `npm run start`, confirmed `/brand/wayam-icon.svg` returns 200/304 in the network log, zero console errors, tab title shows the branded title.

**Dashboard reactivation**: all of Prompt 1's dashboard components (`DashboardHeader`, `MapStage`, `HealthScoreCard`, `ActionQueue`/`ActionTable`, `IncidentPanel`, `StatusBadge`, `MetricCard`, `DriverCard`) migrated off Lucide onto `AppIcon`/Font Awesome and off the Prompt 1 legacy token names onto the Prompt 4 semantic tokens and type scale, then re-mounted from `app/page.tsx` inside the existing `AppShell`. The duplicate Prompt 1 sidebar (`components/dashboard/sidebar.tsx`, `components/ui/sidebar-item.tsx`) was deleted as dead code, fully superseded by `components/layout/*` since Prompt 2.

**Honesty fix**: the `filterChips` array had hardcoded counts (All 54, Critical 1, Warning 25, Info 23, Open 48, In Progress 1, Today 49) describing a dataset far larger than the 6 actual placeholder rows, with no underlying fields for the Open/In Progress/Today filters. Replaced with chip counts computed live from the actual row data, and dropped the filters with no backing field — avoids wiring "real" interactions against numbers that would never have matched what the table shows.

**Real (not decorative) interactions added**: search (filters by asset/description/driver), severity filter chips (now actually filter the row set), column sort (Asset/Time, 3-state cycle with a chevron indicator), row selection (individual + select-all with indeterminate state), and a real empty state when a filter/search yields zero rows. All operate on the existing mock `actionRows` array — genuinely functional frontend behavior, clearly scoped to placeholder data since no backend exists yet (see `lib/placeholder-data.ts`'s header comment).

**Verification**: `npm run build`, `npm run lint`, `npx tsc --noEmit` all pass. Visually verified in both dev and production (`next start`) builds — search, sort, and filter interactions tested live in-browser and confirmed working. Grep audit across `components/` and `app/`: zero Lucide imports, zero emoji, zero hardcoded colors outside `MapStage`'s deliberately-exempted placeholder texture gradient.

**Not done / explicitly out of scope**: no backend exists, so no real API integration was attempted — all data remains clearly-labeled placeholder. Pagination and the column-visibility/drag-reorder/CSV-export features from Chronos's full `data-table.tsx` were not added (disproportionate to a 6-row placeholder dataset, flagged in `docs/CHRONOS-REFERENCE.md` as a future addition once real data justifies it). No login/auth screen exists in Vahana yet, so the wordmark variants aren't placed anywhere beyond being copied into `public/brand/`.

---

## Post-reactivation functionality pass (navigation, map, theme, release audit)

Driven by user feedback that everything besides the dashboard content was non-functional (dead sidebar nav, dead incident-panel buttons, placeholder map grid) and a request for light mode and mobile verification. Commits `36d0869`..`ba9244f`, then this release audit.

**Light/dark theme**: the Tier 2 token architecture already anticipated a `:root[data-theme="light"]` override block (per the Prompt 3 comment); this pass actually wrote it — full remap of text/icon/stroke/surface/action/feedback onto the same Tier 1 palette — and wired a real toggle (`lib/theme.ts`, `components/layout/theme-toggle.tsx`), persisted to `localStorage`, applied pre-hydration via an inline script in `app/layout.tsx` to avoid a flash of the wrong theme (`suppressHydrationWarning` on `<html>` since that script intentionally changes `data-theme` before React hydrates — the standard pattern).

**Bug found while wiring light mode**: `--stroke-focus` was referenced by the `ring-focus` Tailwind utility (added in the earlier a11y commits, `f780372`) but never actually defined anywhere — every focus ring from that pass was rendering invisible. Fixed in both themes.

**Real fleet map**: replaced `MapStage`'s static grid texture with `react-leaflet` + standard OpenStreetMap tiles (the dark CARTO tileset now requires an API key), inverted via CSS in dark theme to match. Plots each `actionRows` entry at a simulated lat/lng, colored by severity, with a popup. Caption reads "Simulated positions — not live telemetry" — never represented as real GPS.

**Real sidebar navigation**: the sidebar previously only toggled a local "active" highlight with no routing underneath — none of Vehicles/Alerts/Calendar/Maintenance/Documents went anywhere. Added real routes (`app/vehicles`, `app/alerts`, `app/calendar`, `app/maintenance`, `app/documents`), each `AppShell`-wrapped and built from the existing `actionRows` placeholder data (Alerts reuses `ActionQueue` directly), with `next/link` + `usePathname` driving active state (`components/layout/sidebar-nav-link.tsx`). Documents has no backing data source, so it's an honest empty state rather than a fake list.

**Incident panel buttons made functional**: Confirm Evacuation / View Profile / Insurance Claim were static buttons with no handler. Now real client-side demo interactions (toggle-to-confirmed state, inline profile expansion, generated demo claim reference) — explicitly labeled as demo since no backend exists to actually evacuate anyone or file a claim.

**Production-breaking bug found and fixed**: adding the map surfaced a crash — navigating away from the Dashboard route and back threw a Leaflet runtime error (`Cannot read properties of undefined (reading 'appendChild')`) inside `TileLayer`, reproduced in a production build (`next build && next start`), not just dev. Root cause was `cacheComponents`/`partialPrefetching` (Next 16 experimental flags) in `next.config.ts` interfering with how the map's DOM is torn down and rebuilt across client-side navigation. Neither flag was needed by anything in this app; removed. Verified via repeated Dashboard → other route → Dashboard cycling against a production build with a clean console both times.

**Verification this pass**: `npm run lint`, `npx tsc --noEmit`, `npm run build` all pass. Live-tested in a production build: all 6 routes navigate and render real data, table search/sort/selection (including selection surviving a search-then-clear and a sort) all confirmed working, theme toggle persists correctly across a full page reload with no hydration error, network tab shows zero failed requests (all map tiles, fonts, and brand assets 200/304) across the whole session. Chronos-pattern and branding-asset claims from the prior section were independently spot-checked against the actual Chronos source and Vahana's `action-table.tsx`/`app-shell.tsx` — sort-cycle, sticky header, and row-hover styling are genuinely matched; the two wordmark SVGs remain copied into `public/brand/` but unreferenced in code, consistent with what the branding section above already says (no surface exists yet that needs a full wordmark).

**Known limitation, unchanged from before**: mobile/tablet viewport behavior still can't be verified through this session's browser automation — `resize_window` reports success but `window.innerWidth` never actually changes, a tool-level limitation, not an app bug. Responsive classes were instead audited directly in the component source (table `overflow-x-auto`, filter-chip `flex-wrap`, incident panel `hidden lg:flex`, Health Score card capped at `max-w-[calc(100%-2rem)]`) and one real overflow bug found that way was fixed (`0753b9b`). Verify narrow widths with the browser's own DevTools device toolbar.

## Requirement Traceability Matrix

## Implementation Checklist (current)

- [x] Prompt 1 dashboard foundation
- [x] Document Prompt 1 + Prompt 2 retroactively/live, log conflicts
- [x] Build `components/layout/app-shell.tsx`
- [x] Build `components/layout/sidebar-item.tsx` (Prompt-2 sizing/color spec)
- [x] Build `components/layout/sidebar.tsx` (Prompt-2 nav list + logo placeholder)
- [x] Add `--app-bg`/`--sidebar-bg` tokens
- [x] Update `app/page.tsx` to render `AppShell` with temp heading only
- [x] Verify build/lint/visual (desktop, 1440px — confirmed matches Prompt 2 intent)
- [ ] Configure `origin` remote to `https://github.com/WayamAI/Vahana.git` and push
- [ ] Await Prompts 3, 4, 5 before any further consolidation or "complete" claims

**Prompt 2 status: implemented, verified on desktop, committed. Safe to proceed to Prompt 3.**
