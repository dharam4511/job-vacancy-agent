---
name: maintenance-support
description: Triage bug reports and production incidents, fix root causes (not just symptoms), and manage technical debt over time. Use when a bug is reported, an incident occurs, or when assessing/paying down accumulated tech debt.
---

# Maintenance & Support

## Purpose

Keep a shipped system healthy over time: fix real problems at their root cause, and manage the
tech debt that accumulates from real-world usage and changing requirements — the phase that
closes the loop back to `requirements-gathering` for the next iteration.

## When to use

- A bug is reported (by a user, monitoring alert, or found incidentally).
- A production incident is happening or just occurred (needs a postmortem).
- Periodic tech-debt review, or when working in an area and noticing debt that's actively
  slowing things down.

## Process

### Bug triage
1. **Reproduce first.** Don't fix what you can't confirm — get exact repro steps, expected vs.
   actual behavior.
2. **Assess severity/impact**: how many users/how much data affected, is there a workaround.
3. **Find the root cause**, not just the symptom — use `git blame`/`git log` and the surrounding
   code/tests to understand why it broke, not just where.
4. **Fix the cause**, add a regression test that would have caught it (`testing-qa`), and check
   whether the same class of bug exists elsewhere in the codebase.

### Incident response
1. **Stabilize first** (mitigate/rollback per `deployment-cicd`'s rollback plan) before doing a
   deep root-cause investigation, if user impact is ongoing.
2. **Timeline**: what happened, when, what was the trigger, what was the detection lag.
3. **Root cause analysis**: the technical cause, and the process gap that let it reach
   production (missing test, missing alert, missing review step).
4. **Blameless postmortem write-up** with concrete action items, each with an owner — not just
   "be more careful."
5. **Feed action items back** into the relevant skill (missing test → `testing-qa`, missing
   alert → `monitoring-observability`, missing review step → `code-review`).

### Tech debt
1. **Name it concretely**: what's the debt, what does it cost (slower changes, bug-prone area,
   scaling ceiling), not just "this code is ugly."
2. **Prioritize by cost × how often that area changes** — debt in a frequently-touched file
   matters more than debt in dead-but-unremoved code (which should just be deleted).
3. **Pay down incrementally**, ideally alongside feature work that touches the same area, rather
   than as large standalone rewrites unless justified.

## Checklist

- [ ] Bug reproduced before attempting a fix
- [ ] Fix addresses root cause, not just the reported symptom
- [ ] Regression test added
- [ ] Related occurrences of the same bug class checked elsewhere in the codebase
- [ ] Incidents get a blameless postmortem with owned action items
- [ ] Tech debt tracked with concrete cost, not vague complaints

## Handoff

Fixes go through `coding-implementation` → `code-review` → `testing-qa` →
(`security-review` if relevant) → `deployment-cicd` like any other change. Recurring patterns of
bugs/incidents in one area may indicate a design flaw — loop back to `system-design`.
