# Web & API Security Development Manual
File: web_api_security_manual.md

## Overview

This document defines the security standards that must be applied during the full lifecycle of web and API development.

Security must follow the **Security by Design** principle and be considered from architecture and implementation through testing and production operations.

Development stages:

1. Design
2. Implementation
3. Testing and verification
4. Operations

---

# 1. Security Principles

## 1.1 Least Privilege

Grant only the minimum permissions required for users, services, and operators.

Examples:

- separate admin permissions from user permissions
- separate database accounts by role when possible
- restrict service accounts to only required actions

## 1.2 Security by Design

Security must be considered during architecture planning, not only after implementation.

Examples:

- authentication design
- authorization model
- encryption strategy
- audit logging design
- API exposure rules

## 1.3 Defense in Depth

Do not rely on a single security control.

Example layered defense:

WAF -> application validation -> authorization checks -> database constraints -> logging and monitoring

## 1.4 Secure Defaults

When a secure and an insecure default are possible, choose the secure default.

Examples:

- deny by default for protected resources
- strict CORS by default
- minimal error messages by default

---

# 2. Design Phase Security

## 2.1 Authentication

Recommended methods:

- session authentication
- JWT with expiration and validation
- OAuth2 / OIDC when needed

Avoid:

- plaintext tokens
- tokens in URLs
- custom auth design without strong justification

## 2.2 Authorization

Use a clear authorization model such as RBAC or permission-based access control.

Required checks:

- authentication status
- role or permission verification
- resource ownership verification where applicable

## 2.3 IDOR Prevention

Never rely only on object identifiers from the client.

Unsafe example:

```text
GET /api/order/1001
```

Required validation:

- verify the requester owns the resource or has permission to access it

## 2.4 Data Classification

Classify sensitive data before implementation.

Examples:

- passwords
- tokens
- personal identifiers
- financial data
- internal admin data

Define for each category:

- storage rule
- masking rule
- logging rule
- encryption requirement

## 2.5 Threat-Sensitive Flows

Identify high-risk flows during design.

Examples:

- login and password reset
- admin actions
- payments and balance changes
- file upload and download
- webhook ingestion
- external callback endpoints

---

# 3. Implementation Phase Security

## 3.1 Input Validation

All external input must be validated.

Validation requirements:

- type validation
- length validation
- format validation
- range validation
- enum / allowlist validation when possible

Input sources include:

- query parameters
- headers
- request body
- path parameters
- cookies
- file uploads
- webhook payloads

## 3.2 SQL Injection Prevention

Always use prepared statements, parameter binding, or safe ORM/query-builder patterns.

Rules:

- never concatenate raw user input into SQL
- avoid dynamic SQL unless strictly necessary
- review raw expressions carefully

## 3.3 Command Injection Prevention

Never pass unsanitized external input into shell commands, process spawns, or system utilities.

Rules:

- avoid shell execution when safer APIs exist
- separate command arguments rather than concatenating strings
- validate or allowlist user-controlled values

## 3.4 XSS Prevention

Escape or encode output based on rendering context.

Rules:

- do not render raw untrusted HTML unless sanitized
- use framework-safe templating defaults where possible
- apply CSP where appropriate

## 3.5 CSRF Protection

Apply CSRF protection to state-changing requests when using cookie-based authentication.

Affected methods typically include:

- POST
- PUT
- PATCH
- DELETE

## 3.6 File Upload Security

Required controls:

- extension allowlist
- MIME validation
- file size limits
- randomized filenames
- storage outside web root when possible
- execution disabled for uploaded files
- malware scanning if required by risk level

## 3.7 Path Traversal Prevention

Do not trust file paths, filenames, or archive contents from external input.

Rules:

- normalize and validate paths
- restrict access to approved base directories
- do not directly join user input into file paths without checks
- validate zip extraction paths before writing files

## 3.8 SSRF Prevention

Do not allow arbitrary server-side requests to attacker-controlled destinations.

Rules:

- use allowlists for internal integrations when possible
- restrict protocols and ports
- block access to internal metadata and local network endpoints where applicable
- validate callback and fetch URLs carefully

## 3.9 Secret Management

Never store secrets in source code.

Use:

- environment variables
- secret managers
- CI/CD secret stores

Rules:

- do not log secrets
- do not expose secrets in client responses
- rotate compromised secrets immediately

## 3.10 Open Redirect Prevention

Do not redirect users to arbitrary destinations from untrusted input.

Rule:

- use internal route names or approved allowlists

## 3.11 Unsafe Deserialization and Parsing

Treat complex parsers and deserializers as high-risk.

Rules:

- avoid unsafe deserialization formats or libraries
- disable dangerous parser features when possible
- validate structure and type before processing

## 3.12 Transaction and Race Condition Safety

Multi-step writes must be evaluated for transaction and concurrency safety.

Examples:

- balance changes
- stock or quota updates
- duplicate form submissions
- state transitions

Rules:

- use transactions where atomicity is required
- use locking or idempotency controls where needed
- verify retry safety for external side effects

---

# 4. API Security Standards

## 4.1 Authentication and Authorization

All protected APIs must enforce:

- authentication checks
- authorization checks
- ownership checks where applicable

## 4.2 Rate Limiting

Apply rate limiting where abuse is possible.

Examples:

- login
- password reset
- OTP verification
- public APIs
- file upload endpoints

## 4.3 CORS Policy

Allow only trusted origins.

Rules:

- avoid wildcard origins in production
- review credentialed requests carefully
- align allowed methods and headers with real needs

## 4.4 Security Headers

Recommended headers include:

- HSTS
- Content-Security-Policy
- X-Frame-Options or frame-ancestors via CSP
- X-Content-Type-Options
- Referrer-Policy

## 4.5 Error Handling

Applications must:

- hide internal errors from end users
- avoid exposing stack traces and SQL details
- log useful internal diagnostics securely

## 4.6 Webhook Security

Inbound webhooks must verify authenticity.

Required controls:

- signature verification
- timestamp / replay validation where supported
- source validation where appropriate
- idempotency handling for repeated delivery

---

# 5. Data Security

## 5.1 Password Storage

Use strong password hashing.

Recommended:

- bcrypt
- argon2

Avoid:

- MD5
- SHA1
- custom password hashing

## 5.2 Sensitive Data Encryption

Encrypt sensitive data at rest when business or compliance requirements demand it.

Examples:

- personal identifiers
- financial information
- recovery tokens

## 5.3 Transport Security

All communications must use HTTPS with modern TLS settings in production.

## 5.4 Data Minimization

Store and expose only the data required for the feature.

Rules:

- do not over-return fields from APIs
- do not persist unnecessary sensitive values
- review admin export endpoints carefully

---

# 6. Infrastructure and Configuration Security

## 6.1 Admin Security

Admin interfaces should apply stronger controls where appropriate.

Examples:

- MFA
- IP restrictions
- session hardening
- audit logging

## 6.2 Configuration Protection

Block external access to:

- `.env`
- config files
- private keys
- build artifacts containing secrets

## 6.3 Dependency Security

Dependencies must be maintained and reviewed.

Rules:

- avoid vulnerable packages when fixes are available
- remove unused dependencies
- review transitive risk for critical libraries

## 6.4 Environment Separation

Separate development, staging, and production configuration.

Rules:

- do not enable debug in production
- do not reuse production secrets in lower environments
- document environment-specific security controls

---

# 7. Logging, Monitoring, and Audit

## 7.1 Sensitive Data Protection in Logs

Do not log:

- passwords
- tokens
- API keys
- raw personal identifiers unless explicitly required and protected

Mask sensitive fields when logging is necessary.

## 7.2 Audit Logging

Security-sensitive actions should generate audit events.

Examples:

- login failures
- permission changes
- admin actions
- deletions and restorations
- secret or credential changes

## 7.3 Monitoring and Alerting

Monitor for:

- repeated authentication failures
- unusual admin activity
- traffic spikes or abuse patterns
- repeated webhook failures
- abnormal error rates

## 7.4 Log Retention

Define retention based on operational and compliance needs.

Retention rules must specify:

- retention period
- access control
- redaction requirements
- deletion policy

---

# 8. Testing and Verification Expectations

Before release, verify security-sensitive changes for:

- auth and authorization coverage
- input validation behavior
- error handling behavior
- file upload restrictions
- external integration safety
- regression risk on protected routes

Security validation should include both expected success cases and failure cases.
