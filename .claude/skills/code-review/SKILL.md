---
name: code-review
description: Review a diff, PR, or branch for correctness bugs, missed edge cases, reuse/simplification opportunities, and adherence to project conventions before it merges. Use after implementation and before merge/deploy, or when explicitly asked to review code.
---

# Code Review

## Purpose

Catch correctness bugs, regressions, and quality issues before they reach tests or production —
a second, more skeptical pass over the diff than the one done while writing it.

## When to use

- After `coding-implementation` finishes a change, before it's merged.
- When explicitly asked to review a PR, branch, or diff.

If this project's Claude Code setup includes the `code-review` slash-command skill, prefer
invoking that for a full automated pass; use this skill's checklist for manual/inline review or
as the criteria that automated review should apply.

## Process

1. **Read the diff in full context**, not just the changed lines — check callers, related tests,
   and anything the change could break elsewhere.
2. **Check correctness first**: does the code do what it claims for all realistic inputs,
   including edge cases (empty input, nulls, concurrent access, network failure, boundary
   values)?
3. **Check for regressions**: does this change silently alter behavior relied on elsewhere?
4. **Check simplicity**: is there unnecessary abstraction, duplicated logic that could be shared,
   or complexity not justified by the requirement?
5. **Check consistency**: does it match the codebase's existing patterns, naming, and structure?
6. **Check tests**: do they actually exercise the new behavior and its edge cases, not just the
   happy path?
7. **Flag, don't silently fix, anything uncertain** — note the specific failure scenario (concrete
   input/state → wrong output) rather than a vague "this could be an issue."
8. **Rank findings by severity** — correctness/security bugs first, then simplification/style.

## Review checklist

- [ ] Logic is correct for stated requirements and edge cases
- [ ] No regressions to existing behavior/callers
- [ ] Error handling is present where needed, absent where unnecessary
- [ ] No security-sensitive issues missed (see `security-review` for a dedicated pass)
- [ ] Tests cover the new/changed behavior, including edge cases
- [ ] No leftover debug code, TODOs without tracking, or dead code
- [ ] Naming and structure match the rest of the codebase
- [ ] No unnecessary abstraction or premature generalization

## Deliverable

A findings list, most severe first, each with: file/line, what's wrong, and a concrete failure
scenario. If asked to also fix, apply fixes after reporting and note which findings were
addressed.

## Handoff

Findings that reveal missing test coverage go back through `testing-qa`. Findings with security
implications go to `security-review`. Once clean, proceed to `testing-qa` (if not already done)
and then `deployment-cicd`.
