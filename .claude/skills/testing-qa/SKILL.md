---
name: testing-qa
description: Design and write a test strategy and automated tests (unit, integration, end-to-end) that verify requirements are actually met, and run them to confirm a change works. Use alongside or right after implementation, and before deployment.
---

# Testing & QA

## Purpose

Prove the code satisfies the acceptance criteria from `requirements-gathering` and doesn't break
existing behavior — not just that it "runs," but that it's correct under realistic and edge-case
conditions.

## When to use

- Alongside `coding-implementation` (write tests as you build, not only after).
- Before `deployment-cicd` — nothing ships without its acceptance criteria verified.
- When asked to verify, QA, or "make sure this works."

## Process

1. **Map acceptance criteria to test cases.** Every "Given/When/Then" from requirements should
   have a corresponding test.
2. **Choose the right level for each check**:
   - **Unit tests** — pure logic, single function/module, fast and isolated.
   - **Integration tests** — multiple components together (DB, API layer, external service
     boundary with a real or realistic fake).
   - **End-to-end tests** — full user flow through the real system/UI, for critical paths only
     (they're slow and brittle — don't overuse).
3. **Cover edge cases explicitly**: empty/null input, boundary values, concurrent access,
   malformed input, network/dependency failure, permission-denied paths.
4. **Cover regression risk**: if this change touches shared code, add/extend tests for existing
   callers, not just the new path.
5. **Run the full relevant test suite**, not just the new tests — confirm nothing else broke.
6. **For UI/frontend changes**: actually exercise the feature in a browser (or simulator) —
   golden path and edge cases — rather than relying on type-checking alone. State explicitly if
   UI verification wasn't possible.
7. **Report results honestly** — passing type checks or unit tests verifies code correctness, not
   necessarily feature correctness; say so if end-to-end verification wasn't done.

## Test plan template

```markdown
# <Feature Name> — Test Plan

**Acceptance criteria covered**:
- [criterion] → [test name/location]

**Edge cases covered**:
- ...

**Out of scope for automated testing** (and why, if anything):

**Manual/exploratory checks performed**:
```

## Checklist

- [ ] Every acceptance criterion has a corresponding test
- [ ] Edge cases and failure modes are tested, not just the happy path
- [ ] Existing test suite still passes (no regressions)
- [ ] UI changes verified interactively when applicable
- [ ] Flaky or skipped tests are called out, not silently ignored

## Handoff

Once tests pass, proceed to `security-review` for anything security-sensitive, then
`deployment-cicd`. Gaps found here that trace back to unclear requirements go back to
`requirements-gathering`.
