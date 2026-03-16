# AI PR Security Review Workflow
File: ai_pr_security_review.md

## Purpose

This document defines the **final PR review workflow and output format** for AI-generated or AI-modified code.

Its purpose is to ensure that each PR is reviewed consistently for:

- security risks
- logic correctness
- architecture consistency
- performance concerns
- release and rollback risk

This file is used at the **final review stage**.
It does not replace the detailed security rules in `web_api_security_manual.md`.

---

# 1. When to Use This Document

Use this document when:

- implementation is complete
- verification is complete
- security checklist review is complete
- the AI is preparing a final approval or rejection decision

---

# 2. Review Principles

During PR review, the AI must:

1. review the actual changed behavior, not only the changed lines
2. consider project context before judging architecture or design
3. treat security, authorization, and data integrity issues as blocking issues
4. distinguish required fixes from optional improvements
5. avoid approving code that depends on unverified assumptions

---

# 3. PR Review Workflow

## Step 1. Understand the Change

Determine:

- what the change does
- which files and modules are affected
- what inputs and outputs are involved
- what systems are touched

Examples of touched systems:

- database
- API layer
- authentication and authorization
- file system
- external services
- queues or schedulers

## Step 2. Security Review

Review the change using `web_api_security_manual.md` and `security_code_review_checklist.md`.

Check for:

- missing authentication or authorization
- IDOR / ownership risks
- injection risks
- XSS / CSRF risks
- secret exposure
- unsafe file handling
- SSRF / webhook validation issues
- unsafe error handling

## Step 3. Logic Validation

Verify:

- conditions are correct
- edge cases are handled
- null / empty states are handled
- failure paths are safe
- existing behavior is not unintentionally broken

## Step 4. Architecture Validation

Verify:

- the change follows existing project structure
- responsibilities are placed in the correct layer or module
- unrelated refactoring was not mixed in without reason
- reusable patterns already present in the codebase were respected

## Step 5. Performance and Operational Review

Check for:

- N+1 queries
- unnecessary loops or repeated work
- missing transaction boundaries where needed
- heavy synchronous work in request paths
- logging or monitoring gaps for critical flows

## Step 6. Release Risk Review

Check for:

- API contract changes
- migration risk
- rollback difficulty
- environment-specific risk
- dependency risk

---

# 4. Severity Levels

Use the following severity levels in findings:

## Critical

Must be fixed before approval.
Examples:

- auth bypass
- data exposure
- destructive behavior with no guard
- severe injection risk

## High

Should block approval unless explicitly accepted by the user.
Examples:

- missing ownership check
- unsafe file upload path
- breaking API change without coordination

## Medium

Should usually be fixed, but may be accepted with explanation.
Examples:

- weak validation
- performance issue in non-critical path
- incomplete audit logging on sensitive action

## Low

Non-blocking improvement.
Examples:

- naming clarity
- maintainability issue
- minor code organization issue

---

# 5. Approval Rules

The AI must **reject or request changes** when any of the following apply:

- Critical issue exists
- High-severity security issue exists
- authorization or ownership checks are missing
- change depends on invented or unverified assumptions
- release risk is high and not explained

The AI may **approve with changes requested** when:

- blocking issues do not exist
- medium or low issues remain
- required follow-up actions are clearly listed

The AI may **approve** only when:

- no blocking security or logic issue exists
- project structure is respected
- release risk is understood and acceptable

---

# 6. Required PR Review Output Format

Every final review should follow this structure:

## Summary

- short explanation of what the PR changes

## Files Reviewed

- list of key files or modules reviewed

## Security Findings

- severity + issue
- `None` if no issues found

## Logic Findings

- issue list or `None`

## Architecture Findings

- issue list or `None`

## Performance / Operations Findings

- issue list or `None`

## Breaking Change Risk

- None / Low / Medium / High
- explain why

## Required Fixes

- blocking items only
- `None` if no blocking fixes required

## Optional Improvements

- non-blocking suggestions
- `None` if no suggestions

## Final Verdict

Choose one:

- Approve
- Approve with changes
- Reject

Include a one-line reason for the verdict.

---

# 7. Standards Reference

The final review should align with:

- project rules in `project_context.md`
- workflow rules in `claude.md`
- security rules in `web_api_security_manual.md`
- review checks in `security_code_review_checklist.md`
