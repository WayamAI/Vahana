# Vahana — Known Limitations

Current as of commit `8967784`. This is a frontend-only client-presentation build. Scope was
explicitly confirmed with the project owner on 2026-10-22: **frontend only, no backend work**.

## What this is

A polished, deployed Next.js demo of a connected-fleet dashboard UI, backed entirely by a
hardcoded fixture file (`lib/placeholder-data.ts`). It is suitable for a client walkthrough of
the interface and interaction design. It is not a working telematics platform.

## What does not exist

- No backend, API, or database of any kind.
- No authentication, authorization, or multi-tenancy.
- No live telemetry ingestion — no MQTT, Kafka, or vehicle-gateway connectivity.
- No persistence — nothing a user does in the UI is saved anywhere.
- No integration with Snowflake, Databricks, or any data platform.
- No customer-cloud deployment model.

Confirmed by direct inspection: zero `fetch(`, `process.env`, or `NEXT_PUBLIC` references
anywhere in `app/`, `components/`, or `lib/`.

## What the UI shows instead

Every number, table row, map marker, and status badge comes from `lib/placeholder-data.ts` —
a 300-asset `healthSummary` aggregate and a separate 6-row `actionRows` array. The scale
mismatch between these two is disclosed in the UI itself (Vehicles page, Health Score card
tooltip) rather than hidden.

Incident actions (Confirm Evacuation / View Profile / Insurance Claim) are demo behaviors —
no network call, no backend record created.

## If/when backend work is approved

`docs/ARCHITECTURE.md` describes a possible future backend architecture as a **design
reference only** — nothing in it has been built, and provisioning any part of it (a database,
a hosting account, etc.) requires explicit owner approval before it's started.
