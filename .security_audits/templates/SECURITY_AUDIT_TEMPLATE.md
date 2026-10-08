# Security Review — [Change or Feature]

- **Review ID:** `[SEC-YYYY-MM-DD-NNN]`
- **Target:** `[branch/commit/PR]`
- **Date:** `YYYY-MM-DD`
- **Reviewer:** `[name or tool]`
- **Status:** `[No actionable findings / Action required / Incomplete]`

## Scope and approach

Describe the changed files and trust boundaries reviewed. Identify attacker-controlled inputs, their validation, and the sensitive operations or data they can reach. Record what was not in scope.

## Findings summary

| ID | Severity | Location | Finding | Status |
|----|----------|----------|---------|--------|
| SEC-001 | [Critical/High/Medium/Low/Informational] | `path:line` | [Concise, evidence-based title] | [Open/Fixed/Accepted] |

Severity should reflect a credible exploit path and impact. Include CVSS only when a defensible score and vector are available; do not manufacture a score for an informational observation.

## Detailed findings

### [SEC-001] [Finding title]

- **Severity:** [level; optional CVSS score/vector when justified]
- **Location:** `path/to/file.ts:line`
- **Evidence and attack path:** [Describe the reachable input, vulnerable operation, prerequisites, and impact.]
- **Recommendation:** [Specific mitigation.]
- **Status and verification:** [Open/fixed/accepted; checks actually performed and observed result.]

## Checks performed

| Check | Command/tool | Result |
|-------|--------------|--------|
| [Dependency/source/manual review] | [Exact command or method] | [Observed outcome] |

List only checks actually performed. Note unavailable scanners, missing configuration, or other limitations; absence of a scan is not evidence of no vulnerabilities.

## Conclusion

[Summarize residual risk and whether action is required before merge. Do not claim the change is safe based solely on the absence of findings in a limited review.]
