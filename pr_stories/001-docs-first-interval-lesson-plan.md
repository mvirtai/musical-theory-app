# PR Story: Plan the first interval lesson

## User Problem and Context

The first lesson needs to teach intervals as relationships between pitches through listening and experimentation, not as labels to memorize before the learner understands them. It also needs to answer why intervals matter: how they help a learner reason about melodic movement, later chord construction, and the relationship between pitch and frequency.

The repository currently contains project guidance, CI for Markdown integrity, and documentation templates, but no application source, frontend scaffold, package manifest, Taskfile, or test runner. This change is a proposal only. It does not implement the lesson, add application code, choose or install dependencies, or bypass the repository's approval-before-implementation workflow.

## Solution and Design

The Finnish technical plan proposes the learning loop **hear → do → notice → name → apply**. It stages unison, octave, and perfect fifth before later introducing thirds, fourths, and an optional mathematics explanation. It specifies an SVG pitch-class clock, separate register information, accessible native keyboard controls, and user-initiated Web Audio playback with replay and stop controls.

The plan keeps a visible boundary between the 12-tone equal-temperament model and other tuning systems: seven semitones give `2^(7/12) ≈ 1.4983`, compared with the pure-fifth ratio `3:2 = 1.5`. It also avoids treating pitch class as frequency or interval names as derivable from chromatic distance alone. Vite is recorded as a build-tool proposal, not an existing repository fact or a dependency introduced by this change. The proposed React 19.2 / React Compiler practices, implementation sequence, open decisions, risks, and future verification are documented for a later, separately approved implementation.

## Files Changed

| File | Change |
|------|--------|
| `.plans/first-interval-lesson/00-overview.md` | Adds the Finnish implementation proposal: learning objectives and scope, verified repository context, staged lesson content, clock/audio behavior, tuning and naming accuracy, proposed modules and React practices, delivery sequence, example exercise, trade-offs, risks, and future verification. |
| `pr_stories/001-docs-first-interval-lesson-plan.md` | Adds this English PR Story, recording the documentation-only scope and actual checks. |

## Verification

### Automated

- **Command:** `python3 .github/scripts/check_markdown.py`
- **Result:** Passed; the repository Markdown integrity checker scanned 15 Markdown files for malformed front matter delimiters and broken local links.
- **Command:** `git diff --check`
- **Result:** Passed with no whitespace errors.

### Browser or manual checks

- No application or browser checks were run: this PR adds documentation only, and the repository has no application UI.
- The Markdown headings, local links, and Mermaid flowchart source were reviewed manually. The Mermaid diagram describes only the proposed learning loop; it does not represent implemented application behavior.
