# AI Development Root Governance
File: claude.md

This document defines the root workflow and mandatory operating rules for AI-assisted development.
Its purpose is to reduce hallucination, prevent context loss, preserve project consistency, and block insecure changes.

All AI-driven development must follow this document.

---

# 1. Purpose

This document establishes the mandatory workflow and behavior rules for AI.

The AI must:

- follow a structured development process
- reference the real project context before coding
- comply with security requirements
- avoid hallucinated implementations
- explain impact before making risky changes

This document is the **root workflow governance document** for AI development tasks.

---

# 2. Document Priority

When multiple documents exist, apply them in the following order:

1. `project_context.md` — real project facts and constraints
2. `claude.md` — workflow and operating rules
3. `web_api_security_manual.md` — security standards
4. `security_code_review_checklist.md` — review checklist
5. `ai_pr_security_review.md` — final PR review format

If a workflow rule conflicts with real project facts, the AI must follow `project_context.md` and explicitly explain the conflict.

---

# 3. AI Operating Principles

The AI must follow these principles at all times:

1. Do not hallucinate missing information.
2. If required information is missing, explicitly state that it is unknown.
3. Always inspect existing code and structure before coding.
4. Do not invent APIs, database schemas, routes, events, or system behavior.
5. Prefer targeted edits over full-file rewrites.
6. Maintain existing architecture and coding style unless the user explicitly requests structural change.
7. Preserve backward compatibility unless a breaking change is requested and explained.
8. Treat security, authorization, and data integrity issues as release-blocking risks.

---

# 4. Required Context Files

Before starting a development task, the AI must load and understand the following documents when present:

- `claude.md`
- `project_context.md`
- `web_api_security_manual.md`
- `security_code_review_checklist.md`
- `ai_pr_security_review.md`

If a required document is missing, the AI must notify the user and continue only within the limits of verified information.

---

# 5. Mandatory Workflow

All development must follow the workflow below.
Skipping a step is not allowed.

---

## 5.1 Context Review Stage

Before planning or coding, the AI must determine:

- project purpose
- relevant modules and files
- framework and language constraints
- security-sensitive areas
- database and API impact zones

No code should be written during this stage.

---

## 5.2 Planning Stage

Before implementation, the AI must define:

- development objective
- scope of implementation
- files likely to change
- modules that may be affected
- known risks or unknowns

The goal is to avoid unnecessary duplication, system disruption, and risky assumptions.

---

## 5.3 Implementation Stage

Development must proceed based on the reviewed context and plan.

All code written during this stage must:

- follow existing project patterns
- comply with `web_api_security_manual.md`
- avoid unrelated refactoring
- preserve compatibility where possible

---

## 5.4 Verification Stage

After implementation, the AI must review the impact across the project.

The AI must check for:

- integration issues
- dependency conflicts
- runtime risks
- API contract changes
- database migration impact
- unintended behavior changes

If issues are detected, the process must return to Stage 5.2 or 5.3.

---

## 5.5 Security Review Stage

The AI must perform a security review using:

- `web_api_security_manual.md`
- `security_code_review_checklist.md`

All relevant security risks must be checked.
If security risks are detected, the process must return to Stage 5.2 or 5.3.

---

## 5.6 Final PR Review Stage

Before finalizing the work, the AI must review the changes using:

- `ai_pr_security_review.md`

If blocking issues are detected during PR review, the process must return to Stage 5.3.

---

# 6. Code Modification Policy

When modifying code, the AI must follow these rules:

1. Avoid rewriting entire files unless necessary.
2. Maintain existing coding style, naming patterns, and architecture.
3. Preserve backward compatibility unless explicitly instructed otherwise.
4. Avoid unnecessary refactoring during feature development or bug fixes.
5. Reuse existing helpers, services, validators, and patterns when available.
6. Do not add dependencies unless clearly justified.

---

# 7. Risk Detection Rule

If any of the following risks are detected, development must stop and be reported clearly:

- security vulnerability
- breaking change
- authentication or authorization risk
- data integrity risk
- destructive migration risk
- unsafe external integration behavior

The AI must explain the risk before continuing.

---

# 8. Mandatory Output Requirements

Before coding, the AI should summarize:

- objective
- referenced files or modules
- expected changes
- known unknowns or risks

After coding, the AI must provide a change report using the structure below.

---

# 9. Change Report Format

The final change report must include:

- Objective
- Referenced files
- Modified files
- Newly created files
- Reason for each change
- API impact
- Database impact
- Security impact
- Breaking change risk
- Required tests or verification items
- Rollback notes if relevant

---

# 10. Forbidden Actions

The AI must NOT perform the following actions:

- invent non-existent APIs, routes, tables, or events
- assume a database schema without verification
- bypass authentication or authorization checks
- remove or weaken existing security mechanisms without explicit instruction
- hardcode secrets or credentials
- ignore the workflow defined in this document
- mix unrelated refactoring into focused tasks without clear justification

---

# 11. Enforcement

All AI development tasks must comply with this document.
If another instruction conflicts with this document, the AI must follow the document priority defined in Section 2 and explicitly note any conflict.
