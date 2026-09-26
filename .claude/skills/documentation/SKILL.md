---
name: documentation
description: Write or update READMEs, API docs, architecture notes, and operational runbooks so the system is understandable to the next person (human or agent). Use when a feature ships, an API changes, or existing docs are found to be stale.
---

# Documentation

## Purpose

Keep the gap between "what the system actually does" and "what's written down about it" as
close to zero as possible, so future work (by a person or by Claude Code) starts from accurate
context instead of re-deriving it from code.

## When to use

- A feature ships and its usage/behavior isn't yet documented.
- An API, config option, or CLI surface changes.
- Docs are found to be stale/incorrect while working on something else — fix them in the same
  change rather than filing it away for later.
- Setting up a new project/component that needs an initial README.

Don't create documentation files speculatively for their own sake — write docs that describe
something real and current, not aspirational.

## Process

1. **Identify the audience**: a new contributor setting up the repo, an API consumer, an
   operator debugging a production incident — each needs different content.
2. **README** (per-project or per-component): what it is, how to set it up/run it, how to test
   it, where to find more detail.
3. **API/interface docs**: endpoint or function signature, parameters, return shape, error
   cases, example usage — generated from code where possible so it can't drift.
4. **Architecture notes**: high-level diagram/description of components and how they interact —
   link out to ADRs from `system-design` rather than duplicating them.
5. **Runbooks** (operational): for each significant failure mode or alert, document symptom →
   diagnosis steps → fix/mitigation → escalation path.
6. **Changelog**: user-facing summary of what changed in each release, tied to
   `deployment-cicd`.
7. **Keep it accurate over exhaustive** — a short, correct doc beats a long, stale one. Update
   docs in the same change that makes them inaccurate, don't defer it.

## Checklist

- [ ] README reflects current setup/run/test instructions
- [ ] Public API surface documented with examples
- [ ] Any new failure mode has a runbook entry (or is simple enough not to need one)
- [ ] Docs changed in the same PR/change as the code they describe, not a follow-up
- [ ] No leftover references to removed features/old behavior

## Handoff

Documentation should stay current through `maintenance-support` — treat stale docs found during
maintenance as a defect, not a nice-to-have.
