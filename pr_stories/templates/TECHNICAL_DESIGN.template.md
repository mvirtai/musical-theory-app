# Technical Design: [Feature name]

> **Status:** [Draft / Approved / In progress / Complete]
>
> **Owner:** [Name or team]
>
> **Updated:** [YYYY-MM-DD]

## Problem and scope

Describe the current user-facing problem, its impact, and the boundaries of this proposal.

## Current repository context

List the existing components, state, browser APIs, tests, and project conventions the proposal builds on. Link to actual repository paths.

## Proposed solution

Describe behavior, component responsibilities, state ownership, relevant browser APIs, and accessibility considerations. Assume a browser-first application unless requirements demonstrate a need for a server or persistent backend.

Add a diagram only when it clarifies a meaningful flow or structure.

## Alternatives and trade-offs

| Option | Benefits | Costs or risks | Decision |
|--------|----------|----------------|----------|
| [Option A] | [Benefits] | [Costs/risks] | [Reason] |
| [Option B] | [Benefits] | [Costs/risks] | [Reason] |

## React 19.2 and Compiler considerations

Explain derived state, external-store subscriptions, effect usage, and whether React Actions fit any asynchronous form workflow. Include only patterns relevant to this feature.

## Delivery and verification

List the repository-defined checks and manual browser scenarios that will verify the feature. Mark checks that do not yet exist in the repository as prerequisites or follow-up work.

## Risks and rollback

Describe user-visible failure modes, risk mitigations, and how the feature can be disabled or reverted if needed. Do not invent deployment or data-migration steps for a client-only change.
