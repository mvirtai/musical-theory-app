# PR Story: Minimal app scaffold (Vite, React 19.2, React Compiler)

## User Problem and Context

The repository contained only documentation, planning files and a Taskfile for Git/PR automation. There was no runnable frontend, so the planned first interval lesson had nothing to build on and CI could only validate Markdown. This PR adds the smallest working scaffold and deliberately contains no lesson code.

## Solution and Design

- Stack: Vite 8, React and React DOM 19.2.8, TypeScript (strict), React Compiler via `babel-plugin-react-compiler` 1.0.0 applied with `@rolldown/plugin-babel` and `reactCompilerPreset()`, Vitest with jsdom and Testing Library, pnpm, plain CSS.
- `src/App.tsx` renders a single `<h1>Musical Theory App</h1>`; `src/App.test.tsx` is one smoke test for it.
- ESLint 10 flat config uses `typescript-eslint` recommended plus `eslint-plugin-react-hooks` flat recommended, which includes the React Compiler rules.
- `Taskfile.yml` gains `dev`, `build`, `test`, `lint`, `typecheck`, `markdown` and `check` (runs all). The old npm-based `quality` task is now an alias for `check`.
- CI gets an `app-check` job that installs pnpm, Node 24 and Task, runs `pnpm install --frozen-lockfile` and `task check`.
- Source and config files use TSConfig-style `/* ... */` docstring comments, in English.

Trade-offs and notes:

- TypeScript is pinned to `~6.0` because `typescript-eslint` 8.71.1 does not support TypeScript 7.
- `vite.config.ts` sets `css: { postcss: {} }` so a stray `postcss.config.cjs` in a parent directory (outside the repo) cannot leak into the build.

## Files Changed

| File | Change |
|------|--------|
| `.agents/AGENTS.md` | Names the concrete Taskfile tasks |
| `.github/workflows/ci.yml` | Adds `app-check` job (SHA-pinned actions, `contents: read`, `persist-credentials: false`) |
| `.gitignore` | Ignores `node_modules`, `dist`, `coverage`, `*.tsbuildinfo` |
| `Taskfile.yml` | Adds app tasks and `check`; `quality` aliases `check` |
| `eslint.config.js` | ESLint flat config with React hooks/Compiler rules |
| `index.html` | Vite entry document |
| `package.json` | Manifest, scripts, dependencies |
| `pnpm-lock.yaml` | Lockfile |
| `pr_stories/002-feat-app-scaffold.md` | This story |
| `src/App.tsx`, `src/App.test.tsx` | Heading component and smoke test |
| `src/index.css` | Plain CSS |
| `src/main.tsx` | React root |
| `src/test-setup.ts` | jest-dom setup for Vitest |
| `src/vite-env.d.ts` | Vite client types |
| `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json` | Strict TypeScript project config |
| `vite.config.ts` | Vite, React Compiler and Vitest configuration |

## Verification

### Automated

- **Command:** `task check`
- **Result:** typecheck, lint, test, build and markdown all succeed. Vitest: 1 file, 1 test passed. Build: 18 modules transformed. Markdown validation passed for 16 files (before this story was added).
- **Command:** `pnpm audit`
- **Result:** `No known vulnerabilities found`.
- **Command:** GitHub Advisory Database check of 12 direct dependencies at installed versions.
- **Result:** 0 vulnerable.
- **Compiler check:** the built bundle contains `memo_cache_sentinel`, showing the compiler output is applied. A temporary component calling setState in an effect was flagged by `react-hooks/set-state-in-effect`; it was removed and is not in the diff.
- **CI:** the workflow YAML parses; the new job has not yet run on GitHub at the time of writing.

### Browser or manual checks

- None performed. The dev server was not opened in a browser.

## Security

- Dependency vulnerabilities: none reported by `pnpm audit` or the GitHub Advisory Database check.
- Install scripts: `pnpm approve-builds` reported no packages awaiting approval, so no dependency build scripts are run.
- All dependencies are development-time tooling except `react` and `react-dom`; no runtime network access, secrets or user input handling is added.
- CI: actions are pinned to commit SHAs with version comments, top-level `permissions: {}`, job-level `contents: read`, and `persist-credentials: false`. `arduino/setup-task` receives the built-in `github.token` only to avoid API rate limits.
- Installs use `--frozen-lockfile`.
