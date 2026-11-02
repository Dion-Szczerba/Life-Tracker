# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Life Tracker is a personal-use iPhone app built as a **PWA**: it is hosted as static files, installed through Safari's "Add to Home Screen", and works offline. All user data stays on the device (browser storage); there is no backend. Development happens on Windows with no Mac, so native iOS tooling isn't an option.

The owner is a CS graduate who writes the code themselves to gain experience with industry-standard tools. Default to explaining, guiding and reviewing rather than implementing. Write code or create files only when explicitly asked.

## Commands

```
npm run dev            # Vite dev server (add `-- --host` to open it from an iPhone on the same Wi-Fi)
npm run lint           # ESLint
npm run format         # Prettier, writes changes
npm run format:check   # Prettier, check only (used by CI)
npm run build          # tsc -b (type check), then vite build
npm run preview        # serve the production build
```

There is no test runner yet (Vitest + React Testing Library and Playwright are planned).

CI (`.github/workflows/ci.yml`) runs `npm ci`, lint, format:check and build on every PR and on every push to `main`. Run all three checks locally before pushing.

## Stack and configuration

- **React 19 + TypeScript + Vite.** TypeScript is pinned to `~6.0.x` on purpose: typescript-eslint doesn't support TypeScript 7 yet. Don't upgrade it until typescript-eslint's peer range allows it.
- **Path alias `@/` → `src/`** is defined in both `vite.config.ts` and the tsconfigs through `paths`. Don't add `baseUrl`; it is deprecated in TS 6 and fails the build.
- **Tailwind CSS v4** uses the `@tailwindcss/vite` plugin with CSS-first config. There is no `tailwind.config.js`; the theme lives in `src/index.css` (`@theme inline` plus CSS variables on `:root`/`.dark`). Keep all custom CSS inside `@layer` blocks, because unlayered CSS overrides Tailwind utilities whatever its specificity.
- **shadcn/ui** uses the `base-nova` style, which is built on `@base-ui/react`, not Radix (see `components.json`). Generated components live in `src/components/ui/`; leave them as generated so `shadcn add` updates still apply. ESLint turns off `react-refresh/only-export-components` for that folder. `cn()` comes from shadcn's `cn` package (`src/lib/utils.ts`), not clsx + tailwind-merge.
- **Prettier** uses `prettier-plugin-tailwindcss`, which sorts classes inside `className`, `cn()` and `cva()`. It formats YAML and Markdown too. `eslint-config-prettier` must stay the last entry in `eslint.config.js`.
- **Line endings are LF,** enforced by `.gitattributes`.
- `tsc` doesn't check side-effect imports (e.g. `import "./x.css"`). Only `vite build` catches a missing file.

## Workflow

- `main` is meant to be protected: all changes go through a feature branch and a PR, CI must pass, and PRs are merged with rebase-merge.
- Commit messages follow Conventional Commits (`feat:`, `fix:`, `chore:`, `ci:`, `style:`).

## Plans

- The app shell is still the template placeholder (`src/App.tsx`). The first screen to build is the home page; its design reference is the cyberpunk mockup canvas at https://claude.ai/artifact/XQTwohtyXqhy3VNZN96hK2. It shows a header, today's date, a day-progress ruler, a streak meter, habits left today (each with its own run of days), the to-do list and this week's stats, and uses a bottom tab bar (Home, Calendar, Stats, Settings).
- Themes: the home screen exists in three themes (Neon, Red HUD, Blend). **Blend is the chosen default**; the others are kept for a future theme picker. All design tokens, organised by role so new themes can be added, are in `design/themes.md`; mockup sources are in `design/mockups/` (excluded from Prettier). Build themes as CSS variables selected by a `data-theme` attribute rather than hard-coding colours in components.
- Planned data model: `Habit`, a record per habit completion (`habitId` + date), and `Todo`. Streaks and stats are derived from these records, not stored. Dates are keyed as local `YYYY-MM-DD` strings (not `toISOString()`, which converts to UTC).
- Libraries planned as needed: React Router (screens), Dexie/IndexedDB (storage), date-fns (dates), Zustand (state), and vite-plugin-pwa (manifest + service worker). A JSON export/import backup is needed, since the data exists only on the device.
- Hosting will be static HTTPS (GitHub Pages or Cloudflare Pages). iPhone details to handle: safe-area insets (`viewport-fit=cover` + `env(safe-area-inset-*)`), `apple-touch-icon`, and tap targets of at least 44 px.
