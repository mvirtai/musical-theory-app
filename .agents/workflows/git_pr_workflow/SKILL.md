---
name: Git PR Workflow
description: Guides feature-branch verification, fact-based PR Stories, and pull-request preparation using only repository-defined automation.
---

# Git PR Workflow

Use this guide when preparing a change for review. Inspect the current worktree and repository instructions first. Follow a repository-defined `Taskfile.yml` task when one applies; otherwise derive checks from the actual manifests, CI, and documented setup. Do not invent tasks or assume a backend, test framework, or PR automation.

For new features, complete the [feature planning workflow](../plan_feature.md) before editing application code. Before opening or updating a PR, verify the [PR Story](../verify-pr-story.md), and run a focused [security review](../make-security-review.md) when the changed surfaces warrant one. Keep PR documentation aligned with the final diff and report only checks that were actually performed.
