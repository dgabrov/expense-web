# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**expense-web** is a web application for tracking personal expenses with automatic categorization. Currently on the `feature/design` branch. The UI mockups (static HTML in `docs/design/`) are done, and a React + TypeScript + Vite application has been scaffolded in `src/` with a placeholder `App` component. The main branch is `main`.

## Technology Stack

- **Frontend**: React 19 + TypeScript + Vite 8 (scaffolded from the Vite React-TS template). Plain CSS in `src/index.css`. ESLint 10 flat config.
- **Backend**: To be implemented
- **Dev tooling**: `.mcp.json` registers a local JetBrains IDE MCP server (`idea`, `http://127.0.0.1:64342/stream`); `.claude/settings.local.json` enables it.

## Architecture Notes

- **Multi-user system**
- **Authentication** required (login page already designed in `docs/design/index.html`)
- **Pages planned/designed** (from `docs/design/` and `docs/todo.md`): login, transactions (list, edit, delete confirm), categories (list, edit, delete confirm), accounts (list, edit, delete confirm), cash, reports, CSV upload, cash upload (+ confirm). Reports and both upload pages are still TODO.
- **Specs**: `docs/specs/spec01.md` holds the login-page styling/responsive requirements (step 1–3: collapsible menu on small screens, "not logged in" always visible on the right, left-aligned logo on desktop, no `<table>` layout, rounded light-gray inputs with 3–5 mm padding).

## Development Setup

Frontend (run from repo root; requires Node.js and npm, `node_modules` is git-ignored):
- Install: `npm install`
- Dev server: `npm run dev` (Vite default port 5173; not overridden in `vite.config.ts`)
- Build: `npm run build` (runs `tsc -b` then `vite build`, output to `dist/`)
- Preview build: `npm run preview`
- Lint: `npm run lint` (`eslint .`)
- Tests: none configured yet

Backend/API config: not yet defined

## File Structure

- `docs/design/` — Static HTML/CSS/JS UI mockups (`index.html` login, `transactions.html`, `edittransaction.html`, `cdeltransaction.html`, `categories.html`, `accounts.html`, `cash.html`, `csv.html`, `reports.html`), shared `style/style.css` and `script/menu.js`
- `docs/specs/` — Written requirements (`spec01.md`)
- `docs/todo.md` — Page-by-page progress checklist
- `src/` — React app: `main.tsx` (entry, StrictMode, mounts `#root`), `App.tsx` (placeholder), `index.css` (global styles: resets, CSS variables, header/layout classes), `assets/` (sample images/SVGs from the template)
- `public/` — `favicon.svg`, `icons.svg`
- `index.html` — Vite HTML entry (title `expense-app`)
- `vite.config.ts`, `eslint.config.js`, `tsconfig*.json`, `package.json` (name `expense-app`)
- `README.md` — Vite React-TS template readme (not project-specific)
- `/` — Application code (to be built out beyond the placeholder)

## Another general
- don't tell me what you did at the end of the exercise, just say you are ready, only provide details when asked
