---
name: requirements-gathering
description: Turn a vague feature idea, bug report, or stakeholder ask into clear, testable requirements before any design or code is written. Use at the start of new features, epics, or when the ask is ambiguous, underspecified, or has conflicting stakeholder needs.
---

# Requirements Gathering

## Purpose

Convert an ambiguous request ("add a way for farmers to track their crop yields") into a
concrete, testable specification the rest of the SDLC can build against. Bad or missing
requirements are the most expensive defects to fix later — this skill exists to catch them early.

## When to use

- A new feature or epic is being kicked off.
- The user's ask is vague, underspecified, or could be interpreted multiple ways.
- Stakeholders (or parts of the same request) seem to want different things.
- Before starting `system-design` on anything non-trivial.

Skip formal requirements gathering for tiny, unambiguous changes (typo fixes, one-line config
tweaks) — go straight to `coding-implementation`.

## Process

1. **Restate the problem** in your own words and confirm it with the user before proposing
   solutions. Don't jump to implementation.
2. **Identify the actors** — who uses this (end user, admin, external system, cron job)?
3. **Elicit functional requirements** — what must the system do? Ask about:
   - Primary ("happy path") flow
   - Edge cases and error states
   - Data inputs/outputs and where data comes from or goes
   - Existing systems/integrations this touches
4. **Elicit non-functional requirements** — performance, scale, availability, offline support,
   localization (relevant for something like KisanLog, which may target low-connectivity rural
   users), accessibility, compliance/data-privacy constraints.
5. **Surface constraints and assumptions explicitly** — don't silently assume; write them down
   and confirm.
6. **Write acceptance criteria** — testable statements ("Given X, when Y, then Z") that later
   define "done" for `testing-qa`.
7. **Flag open questions** rather than guessing on anything with real cost-of-being-wrong (data
   model shape, security/privacy boundaries, who can see what).
8. **Prioritize** — call out must-have vs. nice-to-have if scope is larger than one iteration.

Use `AskUserQuestion`-style clarification liberally in this phase — it's cheap here and expensive
after code exists.

## Deliverable

A short requirements note (save under `docs/requirements/<feature-name>.md` if the project has a
`docs/` folder, otherwise summarize in chat and offer to save it):

```markdown
# <Feature Name> — Requirements

**Problem**: What user/business problem this solves, in one or two sentences.

**Actors**: Who is involved.

**Functional requirements**:
- ...

**Non-functional requirements**:
- ...

**Out of scope**: What this explicitly does NOT cover.

**Acceptance criteria**:
- Given ..., when ..., then ...

**Open questions**: Anything still unresolved.
```

## Handoff

Once requirements are confirmed, move to `system-design` for anything touching architecture,
data model, or multiple components; otherwise go straight to `coding-implementation` for small,
well-scoped changes.
