---
name: security-review
description: Review code and design for security vulnerabilities (OWASP Top 10, auth/access-control flaws, secrets handling, insecure data flow) and threat-model new features. Use before deployment, for any change touching auth, user input, external data, payments, or sensitive/personal data, and when explicitly asked for a security review.
---

# Security Review

## Purpose

Find and fix vulnerabilities before they ship — both design-level (threat modeling) and
code-level (specific bug classes) — rather than relying on catching them in production.

## When to use

- Before any deployment (`deployment-cicd`) of user-facing or externally-reachable code.
- Any change touching: authentication/authorization, user input handling, file
  uploads/downloads, external API calls, payments, PII/sensitive data (e.g. farmer personal or
  location data in a project like KisanLog), or admin/privileged operations.
- When explicitly asked for a security review — prefer the project's dedicated `security-review`
  slash-command skill if available for a full automated pass; use this checklist for manual
  review or design-time threat modeling.

## Process

1. **Threat model early** (ideally during `system-design`): who could abuse this, what's the
   worst case if they do, what data/actions are exposed at each boundary?
2. **Review data flow**: where does untrusted input enter, where is it validated/sanitized, where
   does it get used in a way that matters (DB query, shell command, file path, rendered HTML,
   external request)?
3. **Check authentication & authorization** on every new/changed endpoint or action: is the actor
   verified, and are they allowed to do *this specific* thing to *this specific* resource
   (not just "logged in")?
4. **Check for common vulnerability classes** (OWASP Top 10 and friends):
   - Injection: SQL, command, template, log injection
   - XSS: unescaped output rendered as HTML/JS
   - Broken access control: missing or client-side-only authorization checks
   - Insecure deserialization / unsafe file parsing
   - SSRF: server making requests to attacker-influenced URLs
   - Sensitive data exposure: secrets in logs, PII over unencrypted channels, secrets in code/VCS
   - Insecure defaults/misconfiguration
   - Broken cryptography: weak/home-rolled crypto, hardcoded keys
   - Rate limiting / abuse: missing throttling on sensitive or costly operations
5. **Check secrets handling**: no hardcoded credentials/API keys/tokens; secrets loaded from
   environment/secret manager, not committed to the repo.
6. **Check dependencies**: any newly added library with known CVEs or that's unmaintained?
7. **Report findings with severity and a concrete exploit scenario** ("an attacker who controls
   X can do Y"), not vague warnings.

## Checklist

- [ ] All new inputs validated/sanitized at the boundary where they're used
- [ ] Authorization checked server-side for every sensitive action, per-resource
- [ ] No secrets, keys, or credentials in code, logs, or error messages
- [ ] Output correctly encoded for its context (HTML, SQL, shell, URL)
- [ ] New/changed dependencies checked for known vulnerabilities
- [ ] Sensitive data (PII, location, financial) encrypted in transit and at rest where applicable
- [ ] No destructive or high-privilege action reachable without explicit confirmation/authorization

## Deliverable

Findings ranked by severity, each with: location, vulnerability class, concrete exploit
scenario, and a recommended fix. Apply fixes only after reporting, unless asked to fix inline.

## Handoff

Confirmed vulnerabilities go back to `coding-implementation` for a fix, then back through
`testing-qa` (add a regression test for the specific exploit) before `deployment-cicd`.
