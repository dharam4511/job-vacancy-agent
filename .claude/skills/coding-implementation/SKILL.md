---
name: coding-implementation
description: Write production code that implements a confirmed requirement/design, following existing project conventions, without over-engineering. Use for any feature build, bug fix, or refactor once scope is clear.
---

# Coding / Implementation

## Purpose

Turn a confirmed requirement (and, for non-trivial work, a confirmed design) into working,
maintainable code that fits naturally into the existing codebase.

## When to use

- Implementing a feature or fix once requirements are clear (and design is confirmed, for
  anything non-trivial).
- Do not start coding on ambiguous asks — go back to `requirements-gathering` first.

## Process

1. **Re-read the relevant existing code** before writing anything new. Match existing patterns:
   naming, file layout, error handling style, framework idioms already used in the project.
2. **Scope tightly to the requirement.** Don't add speculative abstractions, config flags, or
   "while I'm here" refactors beyond what was asked — see project-wide rule against
   over-engineering.
3. **Write the smallest correct implementation first**, then iterate. Prefer straightforward code
   (three similar lines) over a premature abstraction for a pattern used only once or twice.
4. **Handle errors at boundaries, not everywhere.** Validate untrusted input (user input, external
   API responses); trust internal code and framework guarantees.
5. **Add tests as you go** (see `testing-qa`) — don't treat testing as a separate phase that
   happens after all code is "done."
6. **Self-review the diff** before calling it finished: re-read your own changes as if reviewing
   someone else's PR (see `code-review`).
7. **No dead code, no commented-out code, no unused variables/flags.** If something is unused,
   delete it rather than working around it with renames or compatibility shims.
8. **Comment only the non-obvious "why"** (a hidden constraint, a workaround, a subtle invariant)
   — not what the code does; well-named identifiers should cover that.

## Checklist before considering a change done

- [ ] Matches existing code style/conventions in this repo
- [ ] No unused code, commented-out blocks, or leftover debug statements
- [ ] Input validated at system boundaries; internal calls trust their callers
- [ ] Errors are handled or explicitly propagated, not swallowed silently
- [ ] Secrets/credentials are never hardcoded
- [ ] Tests added or updated for the new/changed behavior
- [ ] Diff self-reviewed for correctness, not just "it runs"

## Handoff

Once implementation is complete, run `code-review`, then `testing-qa`, and — for anything
touching auth, user input, external data, or sensitive data — `security-review` before merging
or deploying.
