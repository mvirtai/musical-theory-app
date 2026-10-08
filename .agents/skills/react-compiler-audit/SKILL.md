---
name: react-compiler-audit
description: Audits React 19.2 and React Compiler usage for pure rendering, correct state ownership, external-store subscriptions, and suitable React Actions.
---

# React 19.2 and React Compiler Audit Guide

Apply this guide to React code when it exists in the repository. Follow the installed React and compiler configuration rather than assuming package versions or lint rules.

## Core principles

### 1. Do not use effects for state synchronization

Do not use `useEffect` to mirror props, derive state, synchronize URL state, or subscribe to browser events. Derive values during render. Use `useSyncExternalStore` when React needs to subscribe to an external store such as browser navigation or shared browser state.

Effects remain appropriate for synchronization with imperative external systems when rendering, event handlers, and React actions are not a fit. Keep setup and cleanup symmetric.

### 2. Keep rendering pure and state minimal

Compute counts, filtered collections, and other values from current props/state during render instead of storing duplicate state. Do not mutate props, state, or external objects during render.

When a changed identity should reset local state, prefer an explicit keyed child over an effect that resets the state after rendering.

### 3. Use Actions where they fit

For asynchronous form submissions and transitions that fit React's action model, prefer `<form action={...}>`, `useActionState`, and related React 19 APIs over separate loading/error flags managed manually. Do not force form Actions onto unrelated interactions or add redundant flags when action state already represents the lifecycle.

### 4. Work with React Compiler

Avoid routine manual `useMemo`/`useCallback`/`memo` added solely to compensate for rerenders when the configured React Compiler can optimize the code. Keep components and hooks pure and follow compiler diagnostics. Retain manual memoization when required by a referential-identity contract, a library API, or measured performance evidence.

### 5. Respect repository conventions

Use existing component, styling, localization, accessibility, and test patterns. Do not assume Tailwind, a translation library, a particular directory layout, or a server/API. Keep code comments and docstrings in English.

## Review checklist

- No effect is being used to mirror React state, props, derived values, or browser/URL state.
- External mutable state uses a stable subscription/snapshot contract when a React subscription is needed.
- Derived values are not duplicated as state.
- Async form work uses Actions when suitable, without duplicated lifecycle state.
- Render and hook logic remain pure; memoization is justified.
- Verification uses the repository's actual configured checks and reports only results observed.
