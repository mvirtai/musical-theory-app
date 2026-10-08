# Project Agent Guidance

This repository is an initially browser-first music-theory learning application. Treat TypeScript and React 19.2 with React Compiler as the frontend baseline when those technologies are present. Do not assume that a server, Go backend, database, API, CSS framework, localization system, or test runner exists until the repository configuration confirms it.

## Working Practices

- Inspect the current worktree and repository instructions before editing. Preserve unrelated changes.
- For a feature, inspect the existing code and conventions, present a concrete implementation plan, and wait for approval before changing application code.
- Prefer existing project scripts and automation. If a `Taskfile.yml` defines the relevant task, use that task; do not invent Task names or claim that a task exists. The app tasks are `task dev`, `task build`, `task test`, `task lint`, `task typecheck`, `task markdown` and `task check` (runs all of them; CI runs the same). Otherwise use the commands defined by the actual package manifest, CI configuration, or documented project setup.
- Keep changes scoped to the request. Do not add backend or framework scaffolding unless explicitly needed and approved.
- Write code comments, docstrings, and comments in configuration/code files in English. User-facing copy should follow the repository's actual localization conventions.
- Report only checks actually run and results actually observed.

## React 19.2 and React Compiler

When working on React code:

- Do not use `useEffect` to mirror props, derive render state, or synchronize React state with browser or URL state. Compute derived values during render; use `useSyncExternalStore` for external stores such as browser state when a subscription is needed.
- Reserve effects for synchronization with external imperative systems that cannot be expressed through rendering, events, or React actions.
- Use React actions such as `useActionState` and form `action` handlers for suitable asynchronous form workflows; do not force them onto interactions that do not benefit from the action model.
- Prefer declarative state transitions, including a keyed child when a changed identity should reset that child's local state.
- Let React Compiler handle routine memoization. Add manual memoization only when required by an API contract or supported by measured evidence.
- Keep rendering pure and do not duplicate state that can be derived from existing props or state.

## Pull Request Stories and Security

- Keep PR Stories fact-based: reconcile claims and the changed-files list with the actual diff; distinguish automated results from browser/manual verification.
- Include zero to three diagrams, only when they clarify a real architectural or behavioral challenge.
- Perform a focused security review for changes involving untrusted input/rendering, browser storage, authentication, network/API boundaries, sensitive data, or dependency changes.
