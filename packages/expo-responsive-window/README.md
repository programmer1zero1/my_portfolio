# expo-responsive-window

Helpers for **Expo / React Native** layouts: breakpoints, gutters, scaled “design px”, and tighter **vertical rhythm** on tablet/desktop.  
Unofficial package — not from the Expo team. Prefer a **scoped npm name** (e.g. `@you/expo-responsive-window`) when publishing.

## Conceptual model

Everything starts from **`useScreenLayout()`** (live `Dimensions` subscription). Helpers take **numbers as if measured on your design canvas** (`designWidth` × `designHeight`, default **430 × 932**).

| Symbol | Meaning |
|--------|--------|
| **`scaledWidth(px)`** | Horizontal distances: padding, margins, widths, radii — scales by **window width**, clamped (`scalePlateauWidth`, `scaleMax`). |
| **`scaledHeight(px)`** | Vertical distances **without** tablet/desktop compaction — use when height should track screen height only. |
| **`scaledFont(px)`** | Typography (and optional icon sizes) — same width-based ramp as **`scaledWidth`**. |
| **`verticalSpacing(px)`** | Like **`scaledHeight`**, but multiplied by **`verticalCompactionFactor`** on tablet/desktop so lists/cards feel **denser** and more fits above tab bars. |
| **`windowWidthPct` / `windowHeightPct`** | Current window **% → px** (reactive). Same names exist as **standalone** functions with an optional width/height argument for one-off maths. |
| **`horizontalGutter`**, **`contentMaxWidth`**, **`isTablet`**, **`isDesktop`** | Breakpoint-aware gutters and flags. |

**When to choose `verticalSpacing` vs `scaledHeight`**

- Use **`verticalSpacing`** for scroll padding, stack gaps between cards/sections, and tab bar paddings where you want **less vertical air** on tablet/desktop.
- Use **`scaledHeight`** for bar heights/dividers/fonts’ line heights when compaction would feel wrong.

**`ScreenContentInsets`**

Wrap main scroll body: **`width: 100%`**, **`maxWidth: contentMaxWidth`**, **`paddingHorizontal: horizontalGutter`**. Mirrors what **`useScreenLayout()`** computes so every screen aligns.

**`ScreenLayoutSettingsProvider`**

Optional root wrapper: **`settings={{ gutterPhone: 16, breakpointTablet: 744 }}`** merged over **`DEFAULT_SCREEN_LAYOUT`**.

## Install

Peers: **`react`**, **`react-native`**.

```bash
npm install expo-responsive-window
yarn add expo-responsive-window
```

## Usage

```tsx
import {
  DEFAULT_SCREEN_LAYOUT,
  ScreenContentInsets,
  ScreenLayoutSettingsProvider,
  scaledFontDetached,
  useScreenLayout,
} from 'expo-responsive-window';

export default function Root() {
  return (
    <ScreenLayoutSettingsProvider settings={{breakpointTablet: 744}}>
      <App />
    </ScreenLayoutSettingsProvider>
  );
}

function Profile() {
  const {
    scaledFont,
    scaledWidth,
    scaledHeight,
    verticalSpacing,
    windowWidthPct,
    isTablet,
    horizontalGutter,
  } = useScreenLayout();

  const tabletUi = isTablet; // or combine with !isDesktop in your product

  return (
    <ScreenContentInsets style={{gap: tabletUi ? verticalSpacing(12) : scaledHeight(14)}}>
      <Text style={{fontSize: scaledFont(15), marginTop: scaledWidth(8)}}>...</Text>
      <Text style={{maxWidth: windowWidthPct(90)}}>...</Text>
    </ScreenContentInsets>
  );
}
```

**One-off font scale (no hook):** `scaledFontDetached(14)` — same default ramp as `scaledFont`, but does not re-run on resize.

## Monorepo (Yarn workspaces)

This repo links the package via **`workspaces: ["packages/*"]`**. Do **not** run `npm install` inside `packages/expo-responsive-window` (nested `react` → invalid hook calls).

After clone:

```bash
yarn build:responsive-window
```

## Publish

MIT — set `repository` / `author` in `packages/expo-responsive-window/package.json`, then:

```bash
cd packages/expo-responsive-window
npm run build
npm publish --access public
```

Implementation: **`src/index.tsx`** (single module you can vendor).
