# AI Project Context
File: project_context.md

## Purpose

This document provides the **real project context** that the AI must analyze before modifying or generating code.

The goal is to prevent:

- AI hallucination
- incorrect architectural assumptions
- breaking existing functionality
- modifying the wrong modules
- inconsistent implementation patterns

Before any code change, the AI must read and understand this file.

> This file must contain **actual project facts**.
> If a fact is unknown, write `Unknown` instead of guessing.

---

# 0. How to Use This File

Use this file as the **project-specific source of truth**.
When starting a new project, copy this template and update all fields marked:

- `[PROJECT-SPECIFIC]` → must be changed for each project
- `[OPTIONAL]` → fill only if relevant
- `[KEEP IF TRUE]` → keep only when it actually matches the project

Rules:

1. Do not leave misleading example values.
2. Replace examples with real values or `Unknown`.
3. Delete sections that do not apply if they create confusion.
4. If the repository contains multiple apps or services, document each service separately.
5. Keep this file updated when architecture, deployment, auth, or database behavior changes.

---

# 1. Project Identity

- Project name: `[PROJECT-SPECIFIC]`
- Repository name: `[PROJECT-SPECIFIC]`
- Primary service type: `[PROJECT-SPECIFIC]` (examples: monolith web app / backend API / frontend app / full-stack app / microservice)
- Main framework(s): `[PROJECT-SPECIFIC]`
- Default language(s): `[PROJECT-SPECIFIC]`
- Current status: `[PROJECT-SPECIFIC]` (examples: active development / maintenance / migration)
- Primary maintainers: `[PROJECT-SPECIFIC or Unknown]`

---

# 2. System Overview

Write one short paragraph describing the real system.

Recommended topics:

- what the system does
- who uses it
- major business domains
- critical workflows
- what must not break

Required fields:

- System summary: `[PROJECT-SPECIFIC]`
- Primary users: `[PROJECT-SPECIFIC]`
- Core business domains: `[PROJECT-SPECIFIC]`
- Critical workflows: `[PROJECT-SPECIFIC]`
- Non-negotiable behavior that must be preserved: `[PROJECT-SPECIFIC]`

---

# 3. Supported Technology Stack

Record only the technologies that are actually used in this project.

## 3.1 Languages and Frameworks

- Backend language: `[PROJECT-SPECIFIC or N/A]`
- Backend framework: `[PROJECT-SPECIFIC or N/A]`
- Frontend language: `[PROJECT-SPECIFIC or N/A]`
- Frontend framework: `[PROJECT-SPECIFIC or N/A]`
- Runtime: `[PROJECT-SPECIFIC]`
- Monorepo / polyrepo: `[PROJECT-SPECIFIC]`

## 3.2 Data and Infrastructure

- Primary database: `[PROJECT-SPECIFIC or N/A]`
- ORM / query builder: `[PROJECT-SPECIFIC or N/A]`
- Cache / queue: `[PROJECT-SPECIFIC or N/A]`
- Web server / proxy: `[PROJECT-SPECIFIC or Unknown]`
- Container / deployment: `[PROJECT-SPECIFIC or Unknown]`
- Cloud / hosting: `[PROJECT-SPECIFIC or Unknown]`
- File storage: `[PROJECT-SPECIFIC or Unknown]`

## 3.3 Tooling

- Package manager: `[PROJECT-SPECIFIC]`
- Test framework: `[PROJECT-SPECIFIC or Unknown]`
- Linter / formatter: `[PROJECT-SPECIFIC or Unknown]`
- Build tool: `[PROJECT-SPECIFIC or Unknown]`
- CI/CD: `[PROJECT-SPECIFIC or Unknown]`

Rules:

- The AI must not introduce a new language, framework, or library without clear justification.
- The AI must prefer the versions, tools, and patterns already used by the project.
- The AI must not assume an unused framework feature is already adopted.

---

# 4. Repository and Directory Structure

Document the real structure used by the repository.

## 4.1 Repository Layout

```text
[PROJECT ROOT]
  [replace with real top-level structure]
```

## 4.2 Important Directories and Files

Use the format below for each important path.

### Path Entry Template

- Path: `[PROJECT-SPECIFIC]`
- Purpose: `[PROJECT-SPECIFIC]`
- Typical contents: `[PROJECT-SPECIFIC]`
- Can AI modify it?: `Yes / No / Limited`
- Notes: `[PROJECT-SPECIFIC or None]`

Include at minimum:

- application source directories
- routes / API handlers
- database / schema / migrations
- tests
- config
- public assets
- background jobs / schedulers
- shared utilities
- infrastructure / deployment files

Rules:

- The AI must inspect real files before assuming a directory pattern.
- The AI must not create new folders or layers unless clearly justified.
- If some paths are generated or vendor-managed, mark them as not editable.

---

# 5. Architecture Rules

Describe the architecture patterns that the current project actually follows.

## 5.1 High-Level Pattern

- Primary architecture style: `[PROJECT-SPECIFIC]` (examples: MVC / layered / modular monolith / hexagonal / microservice)
- Business logic location: `[PROJECT-SPECIFIC]`
- Data access location: `[PROJECT-SPECIFIC]`
- Validation location: `[PROJECT-SPECIFIC]`
- Background job / async processing location: `[PROJECT-SPECIFIC or N/A]`
- Shared utility location: `[PROJECT-SPECIFIC]`

## 5.2 Layer Responsibilities

- Controller / route handler rule: `[PROJECT-SPECIFIC]`
- Service rule: `[PROJECT-SPECIFIC or N/A]`
- Repository / model rule: `[PROJECT-SPECIFIC or N/A]`
- DTO / request object rule: `[PROJECT-SPECIFIC or N/A]`
- Event / queue / job rule: `[PROJECT-SPECIFIC or N/A]`

## 5.3 Explicit Architecture Constraints

- Patterns the AI must preserve: `[PROJECT-SPECIFIC]`
- Anti-patterns the AI must avoid: `[PROJECT-SPECIFIC]`
- Approved extension points: `[PROJECT-SPECIFIC or Unknown]`

Rules:

- The AI must follow the **existing project pattern** first.
- The AI must not introduce a new architecture style in a partial task.
- If the project uses `Controller -> Service -> Repository`, business logic should stay out of controllers.
- If the project uses a different pattern, the AI must preserve that pattern instead of forcing a layered structure.

---

# 6. Authentication and Authorization Context

Document how authentication and authorization work in this project.

- Authentication method: `[PROJECT-SPECIFIC]`
- Session / token type: `[PROJECT-SPECIFIC]`
- Auth library or framework feature: `[PROJECT-SPECIFIC or Unknown]`
- Role model: `[PROJECT-SPECIFIC]`
- Permission model: `[PROJECT-SPECIFIC]`
- Ownership checks required for which resources: `[PROJECT-SPECIFIC]`
- Admin-only modules: `[PROJECT-SPECIFIC]`
- Sensitive actions requiring extra verification: `[PROJECT-SPECIFIC or None]`

Rules:

- The AI must not assume protected routes are public.
- The AI must verify role and ownership checks when modifying sensitive endpoints.
- The AI must preserve existing auth middleware, guards, policies, or interceptors unless explicitly approved.

---

# 7. API and Interface Conventions

Document the conventions already used by the project.

- API style: `[PROJECT-SPECIFIC]` (examples: REST / GraphQL / gRPC / internal RPC / SSR actions)
- Route naming pattern: `[PROJECT-SPECIFIC]`
- Request validation pattern: `[PROJECT-SPECIFIC]`
- Response format: `[PROJECT-SPECIFIC]`
- Error response format: `[PROJECT-SPECIFIC]`
- Pagination convention: `[PROJECT-SPECIFIC or N/A]`
- Versioning convention: `[PROJECT-SPECIFIC or None]`
- Serialization / transformation rule: `[PROJECT-SPECIFIC or None]`

Rules:

- The AI must preserve existing request/response contracts unless a breaking change is explicitly requested.
- The AI must not invent new response shapes when a project standard already exists.
- The AI must identify whether the project mixes web routes, API routes, SSR, or internal RPC before changing interfaces.

---

# 8. Database and Persistence Context

Describe how persistence works in this project.

- Primary database: `[PROJECT-SPECIFIC or N/A]`
- Secondary stores: `[PROJECT-SPECIFIC or None]`
- ORM / query builder / raw SQL policy: `[PROJECT-SPECIFIC]`
- Migration tool: `[PROJECT-SPECIFIC or N/A]`
- Seed / fixture approach: `[PROJECT-SPECIFIC or Unknown]`
- Transaction rules: `[PROJECT-SPECIFIC]`
- Soft delete rules: `[PROJECT-SPECIFIC or None]`
- Audit field rules: `[PROJECT-SPECIFIC or None]`
- High-risk tables / collections: `[PROJECT-SPECIFIC or None]`
- Concurrency-sensitive operations: `[PROJECT-SPECIFIC or None]`

Rules:

- Use ORM or query builder by default unless raw SQL is justified.
- Always use parameter binding.
- Schema changes must use migrations when migrations are part of the project.
- The AI must check transaction needs for multi-step writes.
- The AI must not assume foreign keys, constraints, triggers, or indexes exist without verification.

---

# 9. External Systems and Integration Points

List internal and external systems this project depends on.

For each system, record:

- System name: `[PROJECT-SPECIFIC]`
- Purpose: `[PROJECT-SPECIFIC]`
- Auth method: `[PROJECT-SPECIFIC or Unknown]`
- Timeout / retry rule: `[PROJECT-SPECIFIC or Unknown]`
- Failure handling rule: `[PROJECT-SPECIFIC or Unknown]`
- Idempotency rule: `[PROJECT-SPECIFIC or None]`
- Environment-specific notes: `[PROJECT-SPECIFIC or None]`

Examples:

- payment gateway
- object storage
- email provider
- external auth provider
- internal service APIs
- webhook providers
- analytics systems

Rules:

- The AI must verify integration points before modifying related code.
- The AI must not weaken signature validation, retry behavior, or timeout handling.
- The AI must identify whether a change touches external side effects before approving it.

---

# 10. Security Context

This project follows the standards described in:

- `web_api_security_manual.md`
- `security_code_review_checklist.md`
- `ai_pr_security_review.md`

Record project-specific security facts here.

- Protected data types: `[PROJECT-SPECIFIC]`
- Upload-sensitive modules: `[PROJECT-SPECIFIC or None]`
- Admin-sensitive modules: `[PROJECT-SPECIFIC or None]`
- Public attack surface: `[PROJECT-SPECIFIC]`
- Logging restrictions: `[PROJECT-SPECIFIC]`
- Encryption requirements: `[PROJECT-SPECIFIC or None]`
- Secret handling requirements: `[PROJECT-SPECIFIC]`
- Rate-limited endpoints: `[PROJECT-SPECIFIC or None]`
- High-risk flows: `[PROJECT-SPECIFIC]`

Rules:

- The AI must treat auth, ownership, upload handling, webhook handling, and admin actions as high-risk until verified.
- The AI must not expose stack traces, secrets, or protected identifiers.
- The AI must preserve masking, audit logging, and validation behavior where present.

---

# 11. Coding Standards

Record project-specific coding and style rules.

- Naming conventions: `[PROJECT-SPECIFIC]`
- File naming rules: `[PROJECT-SPECIFIC]`
- Folder placement rules: `[PROJECT-SPECIFIC]`
- Formatter rules: `[PROJECT-SPECIFIC or Unknown]`
- Test naming rules: `[PROJECT-SPECIFIC or Unknown]`
- Comment policy: `[PROJECT-SPECIFIC or Unknown]`
- Import policy: `[PROJECT-SPECIFIC or Unknown]`
- Error handling policy: `[PROJECT-SPECIFIC]`

Core rules:

- Follow existing code style.
- Do not rename files unnecessarily.
- Avoid large refactors unless requested.
- Keep changes local to the task.

---

# 12. Testing and Verification Strategy

Document how changes should be verified.

- Unit test framework: `[PROJECT-SPECIFIC or Unknown]`
- Integration test framework: `[PROJECT-SPECIFIC or Unknown]`
- API test approach: `[PROJECT-SPECIFIC or Unknown]`
- E2E test approach: `[PROJECT-SPECIFIC or Unknown]`
- Smoke test checklist: `[PROJECT-SPECIFIC]`
- Manual verification flow: `[PROJECT-SPECIFIC]`
- Minimum verification required before merge: `[PROJECT-SPECIFIC]`

Rules:

- The AI should describe what must be tested after code changes.
- The AI must highlight missing test coverage when it cannot verify behavior directly.
- The AI must distinguish between automated verification and manual-only verification.

---

# 13. Deployment and Environment Notes

Record environment-specific constraints.

- Environments: `[PROJECT-SPECIFIC]` (examples: local / dev / stage / prod)
- Config differences: `[PROJECT-SPECIFIC]`
- Secret source: `[PROJECT-SPECIFIC]`
- File storage differences: `[PROJECT-SPECIFIC or None]`
- Queue / scheduler differences: `[PROJECT-SPECIFIC or None]`
- Build / deployment pipeline summary: `[PROJECT-SPECIFIC or Unknown]`
- Rollback constraints: `[PROJECT-SPECIFIC or Unknown]`
- Deployment restrictions: `[PROJECT-SPECIFIC or None]`

Rules:

- The AI must not assume local behavior is identical to production.
- The AI must call out environment-specific risks when relevant.
- The AI must not assume debug, mock services, or local storage are valid in production.

---

# 14. Forbidden Changes

Record project-specific changes the AI must not make without explicit approval.

Examples:

- changing auth flow
- changing response contract
- changing table schema in a hot path
- replacing framework components
- changing storage paths
- disabling security middleware

Project-specific forbidden changes:

- `[PROJECT-SPECIFIC]`

---

# 15. AI Pre-Modification Checklist

Before editing any code, the AI must confirm:

- the project structure is understood
- the relevant modules are identified
- the existing architecture pattern is known
- authentication and authorization requirements are known
- database and API impacts are checked
- security requirements are known
- no sensitive data is introduced
- existing functionality is preserved as much as possible

If critical information is missing, the AI must explicitly state what is unknown.

---

# 16. What Must Be Updated When Reusing This File for Another Project

When you copy this file for a new project, you must review and update at least the following:

1. Project identity and system summary
2. Tech stack and runtime
3. Repository structure and editable paths
4. Architecture rules and layer responsibilities
5. Authentication and authorization model
6. API / interface conventions
7. Database rules and migration strategy
8. External integrations
9. Security-sensitive modules and protected data
10. Test strategy and deployment restrictions
11. Forbidden changes specific to that project

At minimum, do **not** reuse these fields without review:

- Project name
- Framework names
- Directory paths
- Auth method
- Database / ORM
- Route or API style
- External systems
- High-risk tables or modules
- Deployment notes

---

# 17. Maintenance Note

This file becomes effective only when it contains real project facts.
Replace placeholder labels with actual values and keep it updated when architecture or infrastructure changes.
