# Vahana — Implementation Roadmap

## Current phase: frontend only

Confirmed with the project owner on 2026-10-22: Vahana stays a frontend-only client-presentation
build for now. No backend repository, database, or infrastructure is being created.

## Done

- Deployed, working Next.js 16 frontend at `https://vahana-virid.vercel.app`.
- Lint, TypeScript, Vitest, and production build all pass; CI runs them on every push
  (`.github/workflows/ci.yml`, verified green on run `39751190113`).
- Data-integrity disclosures (Health Score vs. the 6-row action queue) in place across
  Dashboard and Vehicles.
- Design tokens/iconography already match the one real external reference (Chronos) — no
  changes needed there.

## Open, frontend-scoped (next, if picked up)

- Mobile/tablet viewport testing is still genuinely unverified — the browser-automation
  tooling available in this environment can't change the real rendered viewport width
  (confirmed twice now, see `docs/KNOWN_LIMITATIONS.md` history). Needs manual verification
  with real DevTools device emulation or a real device.
- GitHub → Vercel auto-deploy is not connected (needs a `WayamAI` org admin to authorize the
  Vercel GitHub App). Deploys currently go out via `vercel --prod` by hand.

## Not started — backend (future phase, owner approval required before any infra work)

See `docs/ARCHITECTURE.md` for the unbuilt reference architecture. None of this is scheduled;
it's here so a future session doesn't have to re-derive it from scratch:

1. Architecture decision + domain model finalization.
2. Backend repository scaffold (separate from this repo).
3. Database + migrations.
4. First vertical slice: vehicles CRUD, DB → API → frontend.
5. Telemetry ingestion (simulated source first).
6. Live updates, alerts, maintenance workflows.
7. Auth, multi-tenancy, security hardening.
8. Backend CI/CD and staging environment.
9. Production deployment alongside the existing frontend.

Each of these involves cost or infrastructure decisions (hosting, a database, credentials) that
need explicit sign-off before starting — see `docs/KNOWN_LIMITATIONS.md`.
