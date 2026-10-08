# General Music-Theory App Shell — Implementation Plan

> **Status:** Approved and implemented.
> **Updated:** 2026-10-08

## Goal

Create the first usable interface for the browser-first music-theory learning app: a welcoming, responsive home dashboard that helps a learner find a starting point without implying that lessons, progress tracking, or accounts already exist.

## Scope

- Add a minimal React 19.2 and TypeScript application scaffold, using Vite, pnpm, and React Compiler.
- Build one responsive learning dashboard with clear navigation, a prominent “start learning” entry point, and a small set of music-theory topic cards informed by the existing interval-lesson proposal.
- Establish a small CSS token set and a distinctive visual direction: warm off-white surfaces, deep ink typography, a restrained teal accent, clear type hierarchy, and generous spacing.
- Make all visible controls meaningful and keyboard accessible. Keep the first version as a client-only experience; do not add accounts, backend services, persistent progress, or lesson functionality.
- Add focused component or UI tests using a test runner selected during scaffold setup, and connect install/build/test validation to CI.
- Add an implementation PR Story after the code is built, with only verified claims and actual test results.

## Repository findings

- Before this implementation, the worktree contained no application source, package manifest, frontend framework, or test runner.
- `.agents/AGENTS.md` sets React 19.2 and React Compiler as the frontend baseline and requires approval of an implementation plan before application code changes.
- `.plans/first-interval-lesson/00-overview.md` proposes the initial interval-learning content; it is a proposal, not implemented UI.
- `Taskfile.yml` has a `quality` task; this implementation updates it to use pnpm for frontend checks. The actual GitHub Actions workflow previously ran only the Markdown checker.
- `pr_stories/` and `pr_stories/templates/PR_STORY.template.md` define the repository’s PR Story practice.

## Proposed implementation

1. Add the smallest Vite + React 19.2 + TypeScript scaffold using pnpm, matching the user-selected package manager. Enable React Compiler using the supported Vite integration and keep dependencies limited to the selected scaffold and test setup.
2. Build a single-page dashboard with a responsive navigation pattern, concise welcome/intro area, one clear first-step call to action, and topic cards for intervals, harmony, and rhythm. Use explanatory copy rather than invented learner statistics or claims of saved progress.
3. Define the layout and palette in plain CSS with reusable custom properties. Use semantic landmarks, visible focus styles, reduced-motion-safe transitions, and mobile layouts that preserve the same content and actions.
4. Keep UI data static and explicit. Derive presentation directly during render; do not use effects for derived or mirrored React state. Avoid adding manual memoization that React Compiler can handle.
5. Add focused tests for the dashboard’s rendered content and key navigation/action affordances. Update CI to install the lockfile dependencies and run the available frontend checks alongside Markdown validation.
6. Run the repository’s `task quality` after dependency installation and confirm responsive layouts; implement visible focus and reduced-motion behavior in CSS.
7. Create and review a PR Story against the actual diff and test output.

## Risks and choices

- No existing design system, app router, package manager lockfile, or test runner existed. The approved implementation uses pnpm, Vite, plain CSS, and a lightweight test setup to avoid unnecessary framework layers.
- The dashboard’s topic cards are navigation affordances only in this phase. They must not suggest that unimplemented lesson screens or tracked learner progress are already available.
- Browser rendering and accessibility checks cannot be assumed until the scaffold runs; automated tests alone do not prove responsive or assistive-technology usability.

## Validation

- `task quality` — passed with pnpm tests (3), TypeScript and production build, and Markdown validation.
- Browser/manual: reviewed the desktop and mobile layouts and semantic page snapshot. A tablet-width 1px overflow from decorative artwork was found; the artwork is now hidden at the tablet breakpoint.
- `pnpm audit --audit-level high` — no known vulnerabilities.
- PR Story review: compare every listed file, behavior, and check against the final diff and observed results.

## Implementation record

- Package manager: pnpm 12.6.0; React and React DOM are constrained to the 19.2 patch line.
- Test stack: Vitest, Testing Library, and jsdom. React Compiler is enabled through the Vite React plugin.
- Remote font imports were omitted; the dashboard uses local system font stacks.
- CI installs from `pnpm-lock.yaml`, runs tests and the production build, then checks Markdown.
- Automated results and browser observations are recorded in `pr_stories/004-general-music-theory-dashboard.md`.
