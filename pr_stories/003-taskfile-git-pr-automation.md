# PR Story: Taskfile for Git and PR automation

## User Problem and Context

The repository had no single, discoverable entry point for the Git and GitHub pull-request steps contributors repeat on every change (branching, committing, pushing, opening/merging PRs, checking CI status). Contributors had to remember raw `git` and `gh` invocations and their flags, which is error-prone and inconsistent across sessions. This change adds a `Taskfile.yml` so these operations are named, discoverable, and guarded consistently.

## Solution and Design

- Added `Taskfile.yml` (go-task v3) at the repository root with two namespaces:
  - `git:*` — `status`, `branches`, `log`, `fetch`, `pull` (fast-forward-only, blocked if the worktree is dirty), `branch` (validates the ref name before creating it), `commit`, `push` (sets upstream on the current branch).
  - `pr:*` — `list`, `create` / `create-draft` (require `TITLE`/`BODY`), `view` / `diff` / `checks` (optional `NUMBER`, defaults to the PR for the current branch), `checkout` (requires `NUMBER`), `ready` / `draft`, `merge` (requires `NUMBER` and `METHOD`, restricted to `merge`/`squash`/`rebase`).
- Added a `quality` task that mirrors `.github/workflows/ci.yml` exactly: `npm test`, `npm run build` (which runs `tsc --noEmit` then `vite build`), then `python3 .github/scripts/check_markdown.py`.
- `pr:create*` tasks fail fast with a clear message if the `gh` CLI is missing.
- `default` task runs `task --list` so `task` alone is self-documenting.
- This PR intentionally contains only `Taskfile.yml`. Other untracked/modified files already present in the worktree (the interval-lesson app scaffold, its CI job, and the in-progress `pr_stories/002` story) belong to separate, already-planned work and are left untouched.

## Files Changed

| File | Change |
|------|--------|
| `Taskfile.yml` | New: `git:*`, `pr:*`, `quality`, and `default` tasks wrapping `git` and `gh` operations with input validation and guards. |

## Verification

### Automated

- **Command:** `task --list-all`
- **Result:** All 20 tasks parsed and listed without error (initial version failed to parse on an unquoted `desc` containing `feat:`; fixed by quoting the string).
- **Command:** `task --dry pr:merge NUMBER=123 METHOD=squash` / `task --dry pr:merge NUMBER=123 METHOD=bogus`
- **Result:** Valid method renders `gh pr merge 123 --squash`; invalid method exits 1 with `METHOD must be one of: merge, squash, rebase`.
- **Command:** `task --dry pr:create TITLE="feat: add practice mode" BODY="Closes #12"`
- **Result:** Renders `gh pr create --base "main" --title "feat: add practice mode" --body "Closes #12"`.
- **Command:** `task --dry pr:view` (no `NUMBER`) and `task --dry pr:view NUMBER=5`
- **Result:** Both render correctly; `NUMBER` is optional as intended (an earlier `requires.allow-empty` attempt incorrectly made it mandatory and was removed).
- **Command:** `task --dry pr:checkout` (no `NUMBER`)
- **Result:** Correctly cancelled: `missing required variables: NUMBER`.
- **Command:** `task quality`
- **Result:** `npm test` — 7 passed; `npm run build` — typecheck and Vite build succeeded; `check_markdown.py` — passed for 16 files.

### Browser or manual checks

- Not applicable; this change only adds build/automation tooling, no UI.

## Security (when relevant)

Not applicable. No new network calls, dependencies, or handling of untrusted input; the file only wraps existing local `git`/`gh` commands the developer already has access to run.
