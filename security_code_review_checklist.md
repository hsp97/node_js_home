# Security Code Review Checklist
File: security_code_review_checklist.md

Use this checklist during code review and final verification.
Each item should be marked only after the reviewer has actually checked it.

---

# 1. Authentication and Authorization

- [ ] Protected routes require authentication.
- [ ] Role or permission checks exist where required.
- [ ] Resource ownership checks exist where required.
- [ ] No privilege escalation path is introduced.
- [ ] Admin-only functionality is properly restricted.

---

# 2. Input Validation

- [ ] All external inputs are validated.
- [ ] Type, length, format, and range checks are applied where needed.
- [ ] Enum / allowlist validation is used where possible.
- [ ] Invalid input paths fail safely.
- [ ] File upload inputs are validated.

---

# 3. Injection Prevention

- [ ] Prepared statements or safe ORM/query-builder patterns are used.
- [ ] No raw SQL concatenation with external input exists.
- [ ] No command execution uses unsanitized external input.
- [ ] No unsafe template or HTML rendering path is introduced.

---

# 4. XSS, CSRF, and Output Safety

- [ ] Output encoding or escaping is applied for untrusted content.
- [ ] HTML sanitization is used where raw HTML rendering is needed.
- [ ] CSRF protection exists for cookie-authenticated state-changing requests.
- [ ] CSP or equivalent browser protections are configured where appropriate.

---

# 5. File Handling and Path Safety

- [ ] Upload extension allowlist is enforced.
- [ ] MIME validation is performed where needed.
- [ ] File size limits are enforced.
- [ ] Uploaded files use randomized names.
- [ ] Uploaded files are stored in a safe location.
- [ ] Path traversal risk has been checked.
- [ ] Archive extraction paths are validated if archive files are handled.

---

# 6. Secrets and Configuration

- [ ] No hardcoded secrets or credentials exist in code.
- [ ] Secrets are loaded from approved configuration sources.
- [ ] `.env` or secret files are not committed.
- [ ] Debug-only or unsafe production settings were not introduced.

---

# 7. API and External Integration Security

- [ ] Rate limiting is applied where abuse is possible.
- [ ] CORS is restricted to trusted origins.
- [ ] Security headers are configured where relevant.
- [ ] Error responses do not leak internal details.
- [ ] External URL fetch behavior has been checked for SSRF risk.
- [ ] Webhook signature verification exists where applicable.

---

# 8. Data Integrity and Concurrency

- [ ] Multi-step writes were checked for transaction needs.
- [ ] Race condition or duplicate submission risk was reviewed.
- [ ] Idempotency requirements were considered where relevant.
- [ ] Breaking API or schema impact was reviewed.

---

# 9. Logging and Monitoring

- [ ] Sensitive data is excluded or masked in logs.
- [ ] Authentication failures are logged appropriately.
- [ ] Admin or security-sensitive actions generate audit logs where required.
- [ ] Monitoring or alerting impact was considered for critical changes.

---

# 10. Dependency and Release Safety

- [ ] Newly added dependencies are justified.
- [ ] Known vulnerable or abandoned packages were not introduced.
- [ ] Required rollback or migration risk was reviewed.
- [ ] Required manual verification or test scenarios were identified.
