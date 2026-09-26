---
name: monitoring-observability
description: Define and set up the logging, metrics, dashboards, and alerts needed to know a system is healthy in production, and to diagnose it quickly when it isn't. Use right after deployment of anything new, and whenever debugging a live issue with insufficient visibility.
---

# Monitoring & Observability

## Purpose

Make sure that when something goes wrong in production, it's noticed quickly and can be
diagnosed from logs/metrics/traces — instead of being discovered from a user complaint with no
way to reproduce it.

## When to use

- Right after `deployment-cicd` ships something new — confirm it's observable before calling the
  release "done."
- When debugging a live issue and realizing there isn't enough visibility to diagnose it.
- When setting up a new service/component that doesn't yet have baseline monitoring.

## Process

1. **Define what "healthy" means** for this component: key metrics (error rate, latency,
   throughput, queue depth, resource usage) and target thresholds (SLOs).
2. **Structured logging**: log meaningful events (request received, action taken, error
   occurred) with enough context (request ID, user/actor ID where appropriate, relevant params)
   to trace a single request/flow end-to-end — without logging secrets or sensitive personal
   data.
3. **Metrics**: instrument the key signals identified in step 1; prefer standard/existing
   conventions in the project over inventing new ones.
4. **Dashboards**: one view that answers "is this healthy right now" at a glance for the
   component being shipped.
5. **Alerts**: page/notify on symptoms that need human action (SLO breach, error spike), not on
   every anomaly — avoid alert fatigue. Each alert should point to a runbook (see
   `documentation`).
6. **Tracing** (for distributed/multi-service flows): ensure a single logical request can be
   followed across service boundaries.
7. **Post-deploy watch window**: after a release, actively check the dashboards/error rates for
   an appropriate window rather than assuming silence means success.

## Checklist

- [ ] Key health metrics identified and instrumented for new/changed components
- [ ] Logs are structured, traceable, and free of secrets/PII
- [ ] Dashboard exists (or is updated) to answer "is this healthy" at a glance
- [ ] Alerts exist for real actionable symptoms, each linked to a runbook
- [ ] New release actively watched post-deploy, not just assumed fine

## Handoff

Issues surfaced here feed into `maintenance-support` for triage and fixes, and gaps in
visibility feed back into this skill for the next iteration.
