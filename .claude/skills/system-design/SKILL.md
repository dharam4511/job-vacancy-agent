---
name: system-design
description: Translate confirmed requirements into an architecture and technical design — components, data model, API contracts, and key trade-offs — before code is written. Use for new services/features, significant refactors, or any change that affects data model, API shape, or system boundaries.
---

# System / Technical Design

## Purpose

Bridge requirements and code. Decide *how* the system will satisfy the requirements before
committing to an implementation, so expensive structural mistakes (wrong data model, tight
coupling, unscalable approach) are caught on paper, not in a PR.

## When to use

- After `requirements-gathering` for anything non-trivial: new service, new data model, new
  integration, or a change to an existing API/schema.
- Significant refactors that change component boundaries.
- Whenever there is more than one reasonable way to build something and the choice has real
  trade-offs (cost, complexity, performance, maintainability).

Skip for changes that clearly fit existing patterns in the codebase — reuse the existing design
rather than re-deriving it.

## Process

1. **Read the existing codebase/architecture first.** Prefer extending established patterns over
   introducing new ones. Use `Explore`/`grep` to understand what's already there before proposing
   something new.
2. **Sketch the high-level architecture** — components/services involved, how they communicate,
   what's new vs. reused.
3. **Design the data model** — entities, relationships, storage choice, migration approach if
   schema changes are involved.
4. **Define interfaces/contracts** — API endpoints (method, path, request/response shape, error
   codes), event schemas, or function signatures for internal boundaries.
5. **Consider non-functional requirements from `requirements-gathering`**: expected load,
   latency budget, offline/sync behavior, multi-tenancy, data retention.
6. **Identify failure modes** — what happens when a dependency is down, input is malformed, or
   concurrent writes race? Note this now so `testing-qa` and `security-review` can target it.
7. **List alternatives considered and why rejected** for any non-obvious choice — this is the
   most valuable part of a design doc for future readers.
8. **Call out risks and open questions** and get user sign-off on anything with a real cost of
   being wrong (schema shape, public API contract, third-party dependency) before coding starts.

## Deliverable

A short design doc, or an Architecture Decision Record (ADR) for a single decision:

```markdown
# <Feature Name> — Design

**Summary**: One paragraph — what's being built and why this approach.

**Architecture**: Components involved and how they interact (diagram optional, prose is fine).

**Data model**: Entities, fields, relationships, migrations needed.

**API / interface contracts**: Endpoints or function signatures, request/response shapes, errors.

**Alternatives considered**: Option, and why it was rejected.

**Risks / open questions**:

**Non-functional considerations**: performance, scale, security touchpoints, offline behavior.
```

For a single focused decision, use a lighter ADR format:
```markdown
# ADR: <Decision title>
**Status**: proposed | accepted
**Context**: What forces are at play.
**Decision**: What was chosen.
**Consequences**: Trade-offs accepted.
```

## Handoff

Once the design is confirmed, move to `coding-implementation`. Flag anything with security
implications (auth boundaries, PII, external-facing input) for an early look from
`security-review` rather than waiting until the end.
