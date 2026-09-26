# Software Factory — SDLC Skill Set

This project defines a full **software development lifecycle (SDLC) skill set** for Claude Code.
Each phase of building an application — from an idea to a running, secured, monitored product —
has a dedicated skill under `.claude/skills/`. Together they act as a "software factory": a
repeatable pipeline Claude Code can run through for any application (including KisanLog).

## Purpose

Give Claude Code a consistent, high-quality process for every stage of building software, so
that requirement gathering, design, coding, testing, security, and deployment all follow the
same rigor regardless of who starts the conversation or which feature is being built.

## How this works

- Each skill lives in its own folder: `.claude/skills/<skill-name>/SKILL.md`.
- Skills are self-contained: each one explains its purpose, when to trigger, its process/checklist,
  expected deliverables, and which other skills it hands off to.
- Skills are meant to be **chained** in roughly the order below, but any skill can be invoked
  standalone (e.g. just "run a security review" on existing code).
- Deliverables produced by a skill (requirements docs, design docs, test plans, etc.) should be
  saved into the project (e.g. `docs/`) rather than left only in chat, so later phases can read
  them back.

## SDLC pipeline and skill catalog

| Order | Phase | Skill folder | What it produces |
|---|---|---|---|
| 1 | Requirement gathering | [`requirements-gathering`](.claude/skills/requirements-gathering/SKILL.md) | User stories, acceptance criteria, PRD |
| 2 | Design | [`system-design`](.claude/skills/system-design/SKILL.md) | Architecture, data model, API contracts, ADRs |
| 3 | Coding | [`coding-implementation`](.claude/skills/coding-implementation/SKILL.md) | Working code following project conventions |
| 4 | Code review | [`code-review`](.claude/skills/code-review/SKILL.md) | Reviewed, cleaned-up diffs |
| 5 | Testing | [`testing-qa`](.claude/skills/testing-qa/SKILL.md) | Test plan, automated tests, coverage report |
| 6 | Security | [`security-review`](.claude/skills/security-review/SKILL.md) | Threat model, vulnerability findings, fixes |
| 7 | Deployment | [`deployment-cicd`](.claude/skills/deployment-cicd/SKILL.md) | CI/CD pipeline, release, rollback plan |
| 8 | Documentation | [`documentation`](.claude/skills/documentation/SKILL.md) | READMEs, API docs, runbooks |
| 9 | Monitoring & observability | [`monitoring-observability`](.claude/skills/monitoring-observability/SKILL.md) | Dashboards, alerts, SLOs |
| 10 | Maintenance & support | [`maintenance-support`](.claude/skills/maintenance-support/SKILL.md) | Bug triage, tech-debt plan, patches |

Typical flow: **requirements → design → coding → code review → testing → security → deployment
→ documentation → monitoring → maintenance**, looping back to requirements for the next
feature/increment.

## Ground rules

- Don't skip requirement gathering or design for anything beyond a trivial change — ask
  clarifying questions before writing code when the ask is ambiguous.
- Every non-trivial feature should leave behind: a short requirements note, a design note (if it
  touches architecture), tests, and a security pass — not necessarily as separate long documents,
  but the thinking should be visible and reviewable.
- Security and testing are not "phases at the end" — apply their checklists continuously as code
  is written, then do a final pass before deployment.
- Keep documentation and runbooks up to date as part of the same change, not a follow-up task.
- When uncertain which skill applies, or how to scope a request, ask the user rather than
  guessing — especially for requirement gathering and design decisions with real trade-offs.

## Folder structure

```
CLAUDE.md                        -- this file
.claude/skills/                  -- one folder per SDLC phase
  requirements-gathering/SKILL.md
  system-design/SKILL.md
  coding-implementation/SKILL.md
  code-review/SKILL.md
  testing-qa/SKILL.md
  security-review/SKILL.md
  deployment-cicd/SKILL.md
  documentation/SKILL.md
  monitoring-observability/SKILL.md
  maintenance-support/SKILL.md
docs/                            -- (created as needed) requirements, design docs, ADRs, runbooks
```
