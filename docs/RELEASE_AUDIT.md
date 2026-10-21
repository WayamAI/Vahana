# Vahana — Release Audit

Consolidated acceptance checklist, evidence-based. Full narrative history of individual prompts and fixes lives in `docs/SYSTEM-DESIGN.md`; this file is the final-state scorecard, kept current as of commit `c113fd6`.

No backend exists for this project. Every item below is scoped to the frontend-only demo described in `docs/SYSTEM-DESIGN.md` — nothing here claims a live API, live telemetry, or a real evacuation/claims/CRM integration.

## Production deployment

**Live production URL: https://vahana-virid.vercel.app** (also aliased at `https://vahana-arka-s-team.vercel.app`)

- Vercel project: `arka-s-team/vahana`, deployment `dpl_EBLrVig7pR4D9kp39Dxgk5HDSV72`, status confirmed `● Ready` via `vercel inspect` (not just CLI stdout) on 2026-10-21.
- Deployed via `vercel --prod` CLI (the authenticated account is `arkabera2004-6898`). No environment variables required or set — this app has no backend.
- **GitHub auto-deploy is not connected.** `vercel git connect` fails with "Failed to connect WayamAI/Vahana to project" — the authenticated Vercel account does not have the GitHub App authorized on the `WayamAI` GitHub org. This is an account-authorization blocker, not a code or config problem: a human with admin access to the `WayamAI` GitHub org needs to install/authorize the Vercel GitHub App, after which `vercel git connect` (or the Vercel dashboard's "Connect Git Repository") will enable deploy-on-push. Until then, production deploys require manually running `vercel --prod` from this repo.
- Live-verified in a browser against the production URL (not just curl): homepage, `/vehicles` navigation, light/dark theme toggle, and "Confirm Evacuation" all tested and working, zero console errors, all OpenStreetMap tile and static-asset requests returned 200.
- `curl` status checks: `/`, `/vehicles`, `/alerts`, `/calendar`, `/maintenance`, `/documents`, `/icon.svg`, `/brand/wayam-icon.svg` — all 200.

## Final acceptance checklist

| Item | Status | Evidence |
|---|---|---|
| Correct repo/branch verified | ✅ | `main`, synced with `origin/main`, clean tree at each step |
| Existing work and 5 design prompts preserved | ✅ | No history rewrite; `docs/SYSTEM-DESIGN.md` prompt log untouched |
| Requirements mapped to implementation | ✅ | Traceability matrix + post-5-prompt section in `docs/SYSTEM-DESIGN.md` |
| All expected routes work | ✅ | `/`, `/vehicles`, `/alerts`, `/calendar`, `/maintenance`, `/documents` — all build, all live-navigated with zero console errors |
| Navigation + browser history work repeatedly | ✅ | Live-tested: sidebar cycling through all 6 routes, plus browser back/forward through Dashboard↔Documents, against a production build — map and layout intact every time, zero console errors |
| Dashboard values internally consistent | ⚠️ partially fixed | `healthSummary` (300 simulated assets) and `actionRows` (6-row alert queue) are two separate placeholder datasets reused across Dashboard/Vehicles/Calendar/Maintenance. Vehicles now discloses the scale mismatch (`753f726`); Calendar/Maintenance already self-scope via their own framing ("today's activity", maintenance-only filter) and don't claim totality |
| Major visible controls behave meaningfully | ✅ | Dead-control audit (subagent, this session) found zero silent no-ops; "Today" health-score filter and Settings are explicitly disabled rather than inert; "See all assets" is a real link |
| Incident actions honest about demo vs backend | ✅ | Confirm Evacuation / View Profile / Insurance Claim all labeled or behave as demo-only (generated reference number, no network call) |
| Fleet map renders/remounts/resizes/navigates reliably | ✅ | Root cause of the prior remount crash (`cacheComponents`/`partialPrefetching` flags) removed in `ba9244f`; re-verified this session with repeated navigation + browser back/forward against a production build |
| Map data/markers consistent with source | ✅ | Markers plot `actionRows` 1:1, popups show the same asset/description/driver as the table |
| Simulated telemetry never misrepresented as live | ✅ | Map caption: "Simulated positions — not live telemetry"; incident actions marked "(demo)" |
| Light/dark themes work and persist | ✅ | Verified via `localStorage` persistence across a full reload, no hydration error (`suppressHydrationWarning` is paired with a pre-hydration inline script, not used to mask a real bug) |
| Focus indicators visible | ✅ | `--stroke-focus` bug (defined-nowhere token) fixed in `bcab5fe` for both themes |
| Wayam AI branding used correctly | ✅ (with 1 note) | `wayam-icon.svg` verified real and wired to sidebar + favicon (byte-identical to `app/icon.svg`). The two wordmark SVGs are real files in `public/brand/` but unreferenced in code — correctly so, since no full-wordmark surface (login/footer) exists yet; not a defect |
| Desktop/tablet/mobile widths work | ⚠️ blocked (tooling) | See "Known blocker" below |
| Search, filters, sorting, forms work | ✅ | Live-tested: search-then-clear preserves row selection, 3-state sort preserves selection, filter chips scoped correctly per route |
| Loading/empty/error/unavailable states handled | ✅ | Empty state on zero-match table filter; Documents route is an honest "no data source" state rather than a fake list |
| Accessibility issues from audit addressed | ✅ | Checkboxes have `aria-label`; icon-only buttons require a `label` prop at the type level; text-labeled buttons don't need `aria-label` |
| Regression tests cover significant defects | ❌ not done | No test framework exists in this repo (`package.json` has no test script). Adding one (Vitest/RTL + jsdom + Leaflet mocking) is a real framework-introduction decision, not a small atomic fix — flagged for a deliberate choice rather than done silently. See "Known blocker." |
| Type checking passes | ✅ | `npx tsc --noEmit` clean |
| Lint passes | ✅ | `npm run lint` (ESLint) clean |
| Automated tests pass | N/A | None exist — see above |
| Production build passes | ✅ | `npm run build` clean, all 6 routes + `/_not-found` + `/icon.svg` statically generated |
| Final code verified after last change | ✅ | All three checks re-run after the last commit this session |
| Changes committed atomically | ✅ | One logical change per commit, see `git log` |
| Remote push verified | ✅ | `git push origin main` confirmed, `origin/main` matches local |
| Deployment status verified | ✅ deployed | Live at https://vahana-virid.vercel.app, verified `● Ready` via `vercel inspect` and live-tested in a browser — see "Production deployment" above |
| Remaining limitations documented | ✅ | This file + `docs/SYSTEM-DESIGN.md` |

## Known blockers (not silently skipped)

1. **Mobile/tablet visual verification.** This session's browser-automation tooling cannot actually change the rendered viewport — `resize_window` reports success but `window.innerWidth` never changes in the controlled tab, a tool-level limitation observed and reproduced, not an app bug. Mitigation taken: every responsive class was audited directly in source (`overflow-x-auto` wrappers, `flex-wrap` on filter chips, `hidden lg:flex` on the incident panel, the Health Score card's `max-w-[calc(100%-2rem)]` cap) and the one real overflow bug found that way was fixed (`0753b9b`, prior session). Verify at 1024×768 / 768×1024 / 390×844 / 320×700 with the browser's own DevTools device toolbar — not something this session can self-certify further.
2. **No automated regression tests.** Introducing a test framework (Vitest + React Testing Library, most likely, given Next 16 + Turbopack) is itself an architectural addition, not a drive-by fix, and risks violating "don't introduce a large new framework without a strong reason." Recommend doing this as its own deliberate task rather than bundling it into an audit pass.
3. **GitHub auto-deploy not connected.** The app *is* deployed (see above), but only via manual `vercel --prod` CLI runs — `vercel git connect` fails because the authenticated Vercel account isn't authorized on the `WayamAI` GitHub org. Needs a `WayamAI` org admin to install/authorize the Vercel GitHub App; this is an account-permission action, not something fixable from this repo.

## Commands run for this audit (all against commit `c113fd6` or earlier in this session)

```
npm run lint        # clean
npx tsc --noEmit     # clean
npm run build        # clean, 6 routes + _not-found + icon.svg
npm run start         # production server, live-tested in Chrome
```
