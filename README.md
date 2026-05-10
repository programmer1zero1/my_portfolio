# MyPortfolio

A small portfolio app built as a **proof-of-concept**: one React Native + Expo codebase that targets phones, browsers, and (in progress) the desktop shell with Electron. It is intentionally minimal—it shows how layout and navigation can stay shared while delivery changes per platform.

## Demo

Add **`docs/demo.mp4`** (screen recording of web/tablet or simulator rotation) and push to **`main`** so the embed below resolves. Fallback if the file is missing or the branch name differs:

<video src="https://raw.githubusercontent.com/programmer1zero1/my_portfolio/main/docs/demo.mp4" controls muted playsinline width="100%" style="max-width:720px"></video>

[Open demo file on GitHub](https://github.com/programmer1zero1/my_portfolio/blob/main/docs/demo.mp4) · Keep clips short or use Git LFS / YouTube for heavy media.

## Responsive layout

This project uses [**@programmer1zero1/expo-responsive-window**](https://www.npmjs.com/package/@programmer1zero1/expo-responsive-window) for breakpoints, scaled design pixels, safe gutters, and window-aware helpers so the UI adapts across phone, tablet, and wider web/desktop-style widths. Imports use the scoped package name: `@programmer1zero1/expo-responsive-window`.

## Where you can run it

| Target | Notes |
|--------|--------|
| **Expo Go** | After `yarn start`, scan the QR code (Android / iOS) or use the Dev Tools connection. Same JS bundle behavior as typical Expo apps. |
| **Android / iOS (dev builds)** | Use `yarn android` or `yarn ios` when you need a native run with `expo run:*` (requires local SDK / Xcode setup as per Expo docs). |
| **Web** | `yarn web` starts the app in the browser via Expo’s web target. |
| **Electron** | Desktop packaging is **in progress**. Scripts such as `yarn electron:dev`, `yarn electron`, and `yarn electron:preview` wire a local Electron window to the exported or dev web build—useful as the MVP path toward a downloadable desktop build (`electron:pack` / `electron:dist` build static web assets first, then Electron Builder runs). |

## Prerequisites

- Node.js (LTS recommended)
- [Yarn](https://classic.yarnpkg.com/) (this repo uses Yarn 1 lockfile)

Install dependencies:

```bash
yarn install
```

## Common commands

```bash
yarn start          # Expo dev server (Expo Go, simulators, web from the CLI UI)
yarn web            # Web only
yarn android        # Native Android via expo run:android
yarn ios            # Native iOS via expo run:ios
yarn electron:dev   # Electron pointing at dev (see project Electron setup)
```

## What this MVP is meant to demonstrate

Rather than maintaining separate apps for each surface, this repo keeps **one** UI codebase and swaps **how** it is hosted: native shell, browser, or an Electron wrapper around the exported web bundle. Responsive behavior is centralized in **`@programmer1zero1/expo-responsive-window`**, which keeps breakpoints and scaling consistent as the window grows or rotates.

---

Author and package metadata are in `package.json`.
