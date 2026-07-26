# MCPserver.in - Risk Register
**Last Updated:** 2026-07-25

---

## In-Scope Risks (Accepted for MVP)

| Risk ID | Description | Probability | Impact | Mitigation | Status |
|---------|-------------|-------------|--------|------------|--------|
| R-001 | Security vulnerabilities (unscanned dependencies, missing headers) | Medium | High | Use trusted dependencies; plan security audit in P13 | Accepted |
| R-002 | Accessibility non-compliance (WCAG) | High | Medium | Will be addressed in P14 accessibility workstream | Accepted |
| R-003 | Performance bottlenecks (large bundle, no caching) | Medium | Medium | Bundle optimization planned for P14; acceptable for MVP traffic | Accepted |
| R-004 | No automated CI/CD (manual deploy) | Medium | Medium | Manual process documented; CI to be added in P15 | Accepted |
| R-005 | Lack of full-text search | High | Low | MVP uses client-side filtering; full search in P14 | Accepted |
| R-006 | Rate limiting in-memory (not distributed) | Low | Low | Single-server MVP; Redis-based limit for multi-instance later | Accepted |
| R-007 | File-based data limits scalability | Medium | Medium | Data volume small; DB migration planned for P14 if needed | Accepted |
| R-008 | Evidence not fully populated for all entities | Medium | Low | Content population is separate phase (P14); directory structure ready | Accepted |

---

## Out-of-Scope Risks (Not Applicable to MVP)

- Multi-tenancy isolation failures (MVP is single-tenant)
- MCP protocol implementation defects (MVP is a directory, not an MCP server)
- Deployment rollback failures (deployment process simple; git revert sufficient)
- Observability gaps (basic logging only; structured logs in P15)
- GDPR/DPDP violation (privacy policy exists; no PII collected)

---

## Conclusion

All identified risks are either mitigated or accepted as known limitations for the MVP. No showstopper risks prevent launch.
