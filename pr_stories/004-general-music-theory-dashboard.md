# PR Story: Add a modern music-theory learning dashboard

## User Problem and Context

The repository had learning-product proposals and contributor tooling, but no application interface. A learner had no welcoming place to orient themselves or choose a first topic. This change establishes the first browser UI without implying that lessons, learner accounts, or saved progress already exist.

## Solution and Design

The new Cadence dashboard uses a responsive navigation shell, an editorial welcome panel with a decorative interval-circle motif, three clearly labeled topic cards, and a short explanation of the listening-first learning approach. Intervals is the only available path; harmony and rhythm are explicitly marked as coming soon. The visible links navigate to sections on the same page, and the page contains no fabricated progress, persistence, or account controls.

The app uses React 19.2, TypeScript, Vite, pnpm 12.6.0, and React Compiler. Styling is plain CSS with responsive breakpoints and reduced-motion support; fonts use local system stacks rather than remote requests. The CI workflow and `Taskfile.yml` quality task now use the pnpm lockfile, run the frontend tests and production build, and retain Markdown validation.

## Files Changed

| File | Change |
|------|--------|
| `.gitignore` | Excludes installed dependencies, build output, coverage, and TypeScript build metadata. |
| `.github/workflows/ci.yml` | Sets up pinned pnpm and Node actions, installs from the lockfile, and runs tests, build, and Markdown validation. |
| `.plans/general-app-shell/00-overview.md` | Records the approved app-shell scope and implementation decisions. |
| `index.html` | Adds the app entry point, title, description, and theme metadata. |
| `package.json` | Defines the React 19.2 app and pnpm scripts and dependencies. |
| `pnpm-lock.yaml` | Locks the approved dependency graph, including React 19.2.8 and matching 19.2 type packages. |
| `pnpm-workspace.yaml` | Allows the esbuild install script required by the Vite toolchain. |
| `public/favicon.svg` | Adds a small Cadence brand mark. |
| `src/App.tsx` | Implements the responsive dashboard content, accessible navigation, topic cards, and decorative illustrations. |
| `src/App.test.tsx` | Covers the dashboard heading, starting path, upcoming paths, landmarks, and skip link. |
| `src/main.tsx` | Mounts the app under React StrictMode. |
| `src/styles.css` | Defines the visual system, responsive layouts, focus states, contrast-conscious text, and reduced-motion behavior. |
| `src/test/setup.ts` | Configures Testing Library cleanup and matchers for Vitest. |
| `Taskfile.yml` | Switches `quality` from npm to pnpm while preserving build, test, and Markdown checks. |
| `tsconfig.json` | Defines the TypeScript project references. |
| `tsconfig.app.json` | Enables strict checking for browser code. |
| `tsconfig.node.json` | Enables strict checking for Vite configuration. |
| `vite.config.ts` | Configures React Compiler, Vite, Vitest, and the isolated CSS pipeline. |
| `pr_stories/004-general-music-theory-dashboard.md` | Documents this implementation and its actual verification. |

## Verification

### Automated

- **Command:** `task quality`
- **Result:** Passed. Vitest reported 3 tests passed; TypeScript and Vite production build succeeded; Markdown validation passed for 18 files.
- **Command:** `pnpm audit --audit-level high`
- **Result:** No known vulnerabilities found.
- **Command:** `pnpm list react react-dom @types/react @types/react-dom --depth 0`
- **Result:** React and React DOM are 19.2.8; the React type packages are 19.2.x.

### Browser or manual checks

- Reviewed the dashboard at 1440 x 1000 and 390 x 844, including its landmarks and accessible names in the browser snapshot.
- At 390 px, document width matched viewport width and topic badges remained inside their cards.
- A 1 px overflow was observed at 722 px due to the decorative approach-section rings. Those rings are now hidden below the tablet breakpoint; a browser rerun at that exact width was not available after the adjustment.

## Security (when relevant)

`pnpm audit --audit-level high` reported no known vulnerabilities. CI actions are pinned by commit SHA. The UI has no network calls, remote font imports, user input, or persisted learner data.
