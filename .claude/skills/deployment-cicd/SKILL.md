---
name: deployment-cicd
description: Get reviewed, tested code safely into production — CI/CD pipeline setup, release process, environment config, and rollback planning. Use when shipping a change, setting up or modifying a pipeline, or preparing a release.
---

# Deployment & CI/CD

## Purpose

Ship code safely and repeatably. Reduce deployment to a well-understood, low-risk, reversible
operation rather than a manual, error-prone event.

## When to use

- Shipping a completed, tested, reviewed change to any shared environment (staging, production).
- Setting up or modifying CI/CD pipeline configuration.
- Preparing a release (versioning, changelog, coordinated rollout).

Deployment/release actions are visible to others and often hard to reverse — treat them with the
same care as any other high-blast-radius action: confirm scope with the user before pushing to
shared infrastructure, modifying pipelines, or triggering a production deploy, unless already
explicitly authorized for this specific action.

## Process

1. **Confirm pre-deploy gates are green**: tests pass (`testing-qa`), code review done
   (`code-review`), security review done for sensitive changes (`security-review`).
2. **Environment parity**: ensure config/secrets differences between environments are
   intentional and documented, not accidental drift.
3. **Pipeline stages** (adapt to what the project actually has/needs):
   - Build (compile/bundle, deterministic and reproducible)
   - Automated tests (unit → integration → e2e, fail fast)
   - Static analysis / lint / security scan
   - Artifact/image build and versioning
   - Deploy to staging, smoke test
   - Deploy to production (manual approval gate for anything user-facing/irreversible, unless
     the user has pre-authorized automated prod deploys)
4. **Migrations**: database/schema migrations should be backward-compatible where possible
   (expand-then-contract) so rollback doesn't strand data or break the previous version.
5. **Feature flags / gradual rollout** for risky changes, where the project supports it, instead
   of an all-at-once flip.
6. **Define the rollback plan before deploying**, not after something breaks: what's the exact
   command/process to revert, and does it require a data migration rollback too?
7. **Monitor immediately after deploy** (hook into `monitoring-observability`) — watch error
   rates/latency for a defined window before considering the deploy "done."

## Checklist

- [ ] All tests passing; review and security sign-off obtained for sensitive changes
- [ ] Config/secrets correct for target environment (no dev secrets in prod, etc.)
- [ ] Migrations are backward-compatible or a migration rollback plan exists
- [ ] Rollback procedure is defined and quick to execute
- [ ] Deploy is observable (logs/metrics/alerts in place before traffic hits new code)
- [ ] User informed and has confirmed before any push to shared branches, pipeline changes, or
      production deploys not already pre-authorized

## Deliverable

A release note / deploy record:
```markdown
# Release: <version/date>
**Changes**: summary or changelog link
**Pre-deploy checks**: tests/review/security status
**Rollback plan**: exact steps to revert
**Post-deploy monitoring window**: what's being watched, for how long
```

## Handoff

After deploy, hand off to `monitoring-observability` to watch the release, and keep
`documentation` (runbooks, changelogs) in sync with what actually shipped.
