# Vahana — Implementation Log

Concise, chronological record of sessions and their commits. Full detail lives in `git log`;
this file is the quick index.

## 2026-10-22 — Design hardening, testing/CI, deployment, CI fix

- `d080dde` fix(data): disclose Health Score's 300-asset scope vs the 6-row action queue
- `82eb473` test: introduce Vitest + React Testing Library
- `2108425` test: cover theme persistence and placeholder-data consistency
- `69a46ae` test: cover Documents route's honest no-data-source state
- `9240c87` ci: add GitHub Actions workflow for lint/typecheck/test/build
- Deployed to `https://vahana-virid.vercel.app` via `vercel --prod`, verified live.
- `5b04088` fix(ci): generate Next.js route types before tsc --noEmit (CI failed on first
  real push — `LayoutProps` only exists after `next typegen`/build; local `.next` had masked
  the gap)
- `8967784` fix(ci): bump CI Node from 20 to 22 (CI still failed — `undici`/jsdom crash on
  Node 20's `DecompressionStream`); confirmed green on run `39751190113`
- Confirmed reference-repo research: only Chronos is an independent design system; Vahana's
  existing tokens/icons already match it, no changes made there.
- Project owner confirmed scope: **frontend only, no backend this phase.**
- `7977115`, `17ec17c`, `36b826c` docs: KNOWN_LIMITATIONS / ARCHITECTURE (unbuilt
  reference) / IMPLEMENTATION_ROADMAP added.

## 2026-10-23 — Security remediation (Next.js critical RCE advisories)

- `585911a` fix(security): upgrade Next.js 16.4.0 → 16.4.2, fixing three advisories affecting
  16.0.0–16.4.0: [GHSA-2464-fhr4-w9xw](https://github.com/advisories/GHSA-2464-fhr4-w9xw)
  (critical, unauthenticated RCE via SVG in the Image Optimization API),
  [GHSA-673q-mjm6-r5xr](https://github.com/advisories/GHSA-673q-mjm6-r5xr) (critical,
  unauthenticated RCE in `use cache` functions returning typed arrays), and
  [GHSA-p3m5-59mp-jv5r](https://github.com/advisories/GHSA-p3m5-59mp-jv5r) (high, DoS in
  App Router Server Actions). `eslint-config-next` bumped in lockstep to stay compatible.
  Confirmed via `npm audit` that `next` no longer appears as vulnerable; build no longer
  emits the prior security-advisory warning. CI green on run `39928746126`. Deployed to
  production via `vercel --prod` (manual deploy — see Known Limitations) and verified live.
- Did not touch unrelated pre-existing dev-tooling advisories (`vitest`/`@vitest/mocker`,
  `eslint-config-next`'s transitive `fast-glob`/`braces`/`micromatch`) — these require major
  version bumps, affect dev-only tooling never shipped to production, and were outside this
  remediation's scope.

## 2026-10-23 — Chronos design-parity pass (tokens, sidebar, badges)

Compared Vahana against `Chronos` (primary design reference) plus `Drishti-bridge-to-live`
and `sama-BOM_sync` (orange-branding/icon conventions), all on this machine, read-only.
Key finding that reshaped scope: **neither Chronos nor the secondary refs apply orange as a
general icon accent** — orange is reserved for `feedback-warning-*` semantic tokens and brand
marks only; icons stay neutral everywhere else. Vahana already followed this exact rule, so
no "orange icon migration" was performed — applying orange broadly would have actively
diverged from all three references.

- `64cde1b` style(badges): switched `StatusBadge` from tinted/subtle backgrounds to Chronos's
  solid-fill treatment (`--feedback-{x}-badge`, reusing the existing Tier-1 ramp which already
  matches Chronos hex-for-hex) + white text. Verified in both themes on Dashboard/Vehicles.
- `32cebc5` style(sidebar): sidebar nav icon puck 40px → 36px, matching Chronos's `size-9`.

### Deliberately not changed (evidence-based, documented here per Phase 8)
- **Icon library (Font Awesome solid → lucide stroke)**: Chronos uses lucide; Vahana uses
  Font Awesome Free solid, a decision already made and explicitly justified in
  `lib/icons.ts`'s header comment (Free's "regular"/outline style lacks required glyphs).
  Re-wiring the entire icon system is a large, high-risk rewrite with no reported defect
  behind it — a visual-weight preference, not a bug. Out of scope for this pass.
  `lib/icons.ts` was re-audited: all icons route through the one central registry, zero
  emoji/stray inline SVGs/bypassing imports found anywhere in the app.
- **Page title size** (`--text-display-page: 36px` vs Chronos's 18–22px): Vahana's large
  Michroma display-font page titles are an established, deliberate brand treatment used
  consistently across all 6 routes, not a bug. Halving it would be a significant unrequested
  redesign of the primary visual identity — explicitly out of scope ("do not perform an
  unrelated visual redesign").
- **Focus-ring color** (Vahana's blue `--stroke-focus` vs Chronos's low-contrast neutral
  `stroke-active`): Vahana's distinct, higher-contrast focus color was a deliberate a11y fix
  in a prior session (see `RELEASE_AUDIT.md`'s `bcab5fe`). Matching Chronos's dimmer neutral
  ring would risk reintroducing that regression — retained.
- **Page-header breadcrumb**: Chronos's `PageHeader` has none; Vahana's does. Retained as a
  genuine navigational/accessibility feature, not removed for parity's sake.
- Sidebar hover-state color gradation (Chronos: tertiary→secondary two-step; Vahana:
  secondary→primary) — cosmetic nuance, low confidence this is worth the diff; not changed.

CI green on both commits (`39930278371`, `39954178625`). Deployed via `vercel --prod`
(`dpl_2WDNJpUV4mZUFdFqtkDdUsWywD5c`), verified live on `/vehicles` in both themes.
