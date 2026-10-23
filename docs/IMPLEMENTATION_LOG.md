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
