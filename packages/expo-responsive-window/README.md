# @programmer1zero1/expo-responsive-window

Window-aware breakpoints, scaled design pixels, and gutters for **Expo / React Native**. Live on rotation & resize. Includes README + AGENTS.md.

> Unofficial package — not from the Expo team.

---

## Install

```bash
npm install @programmer1zero1/expo-responsive-window
# or
yarn add @programmer1zero1/expo-responsive-window
```

Peer dependencies: `react >=18`, `react-native >=0.71`.

```ts
import { useScreenLayout, ScreenContentInsets } from '@programmer1zero1/expo-responsive-window';
```

---

## Table of contents

1. [Why this package](#why-this-package)
2. [Mental model in 30 seconds](#mental-model-in-30-seconds)
3. [Reactive vs snapshot — read this first](#reactive-vs-snapshot--read-this-first)
4. [Quick reference: which helper for which style prop?](#quick-reference-which-helper-for-which-style-prop)
5. [API by use case](#api-by-use-case)
   - [Read live layout in a screen](#read-live-layout-in-a-screen)
   - [Scale a single value](#scale-a-single-value)
   - [Pick a value per breakpoint](#pick-a-value-per-breakpoint)
   - [Wrap screen content](#wrap-screen-content)
   - [Configure defaults globally](#configure-defaults-globally)
   - [Outside React (worklets / handlers / module scope)](#outside-react-worklets--handlers--module-scope)
6. [Gotchas](#gotchas)
7. [Settings reference](#settings-reference)
8. [Recipes](#recipes)
9. [Monorepo & publish](#monorepo--publish)
10. [Explore and learn more →](#explore-and-learn-more-)

---

## Why this package

You design at one canvas (default **430 × 932**) and ship across phone, tablet, foldable, web, and desktop. Three things go wrong:

- **Fonts and icons explode** when scaled by raw `windowWidth / 430` on a tablet.
- **Vertical lists feel sparse** on wide screens because spacing was tuned for phones.
- **`StyleSheet.create({...})` at module scope freezes** any scaled value forever — rotation does nothing.

This package gives you one hook (`useScreenLayout`) whose helpers fix all three.

---

## Mental model in 30 seconds

You hand the helpers **design pixels** (numbers from your design canvas). The hook returns **real, current pixels** for the live window.

| Concept | What it does |
|---|---|
| **width-based ramp** (`scaledWidth`) | Grows with window width up to `scalePlateauWidth`, capped at `scaleMax`. Stops fonts blowing up. |
| **height-based ramp** (`scaledHeight`) | Pure ratio against `designHeight`. No clamp. |
| **vertical compaction** (`verticalSpacing`) | Height ramp × `verticalCompactionFactor` (≈ 0.72 tablet, 0.92 desktop). Lists feel denser on wide screens. |
| **breakpoints** | `phone`, `tablet`, `desktop` — derived from `breakpointTablet` / `breakpointDesktop`. |

The hook subscribes to `useWindowDimensions()`, so anything you read from it re-renders on rotation, split view, foldable folds, and web resize.

---

## Reactive vs snapshot — read this first

The same maths is exposed twice. Pick the wrong one and your screen will not update on rotation.

| You're inside… | Use the **reactive** API | Avoid (will not update) |
|---|---|---|
| A React component / screen | `useScreenLayout()`, `useResponsivePick()`, `<ScreenContentInsets/>` | `getScreenLayoutSnapshot()`, `scaledWidthDetached()` |
| Event handler, Reanimated worklet, plain function, non-React module | `getScreenLayoutSnapshot()`, `scaledWidthDetached()`, `pickByBreakpoint()` | `useScreenLayout()` (hooks rule) |
| **Module-scope `StyleSheet.create({...})`** | None — move styles into the component | All scalers freeze here |

**Naming rule:** anything containing **`Detached`** or **`Snapshot`** is a one-shot read.

---

## Quick reference: which helper for which style prop?

If you know the React Native style property, this table tells you which helper to call.

| Style property / use case | Helper | Why |
|---|---|---|
| `fontSize` | `scaledWidth(px)` | Width ramp is plateau-clamped, so type stays readable on tablets. |
| Icon size (`<Ionicons size={...} />`) | `scaledWidth(px)` | Same ramp as type — they should grow together. |
| `lineHeight` | `scaledWidth(px)` | Tracks the font ramp so leading stays proportional. |
| `borderRadius`, `borderWidth` | `scaledWidth(px)` | Visually horizontal; should not stretch tall on landscape. |
| `paddingHorizontal`, `marginHorizontal`, `gap` (in a row), horizontal `width` | `scaledWidth(px)` | Width-driven. |
| `height` of a header / bar / divider | `scaledHeight(px)` | Should track screen height, no compaction. |
| `paddingTop` / `paddingBottom` of the **screen scroll** | `verticalSpacing(px)` | Compacts on tablet/desktop so more content fits. |
| `gap` in a vertical stack of cards | `verticalSpacing(px)` | Same reasoning — denser rhythm on wide. |
| `paddingBottom` of a tab bar | `verticalSpacing(px)` | Avoids a chunky bar on iPad. |
| `maxWidth` / `width` as a fraction of window | `windowWidthPct(percent)` | Always live. |
| Different design px on phone vs tablet vs desktop | `scaledWidthAt({ phone, tablet, desktop })` (or `scaledHeightAt`, `verticalSpacingAt`, `adaptiveSpacingAt`) | One call, no `if` ladders. |
| Pick **any** value (number, string, component) per breakpoint | `useResponsivePick({ phone, tablet, desktop })` | Returns the value for the live breakpoint. |
| Toggle layout based on size class | `isPhone`, `isTablet`, `isDesktop`, `tabletOnly`, `isPortrait` | Plain booleans on the hook. |

If you're unsure between `scaledHeight` and `verticalSpacing`: a header height is `scaledHeight`, a list gap is `verticalSpacing`.

---

## API by use case

### Read live layout in a screen

```tsx
import { useScreenLayout } from '@programmer1zero1/expo-responsive-window';

function ProfileCard() {
  const {
    scaledWidth,
    scaledHeight,
    verticalSpacing,
    isTablet,
  } = useScreenLayout();

  return (
    <View
      style={{
        padding: scaledWidth(16),
        borderRadius: scaledWidth(12),
        gap: isTablet ? verticalSpacing(12) : scaledHeight(14),
      }}>
      <Text style={{ fontSize: scaledWidth(15), lineHeight: scaledWidth(22) }}>
        Hi
      </Text>
    </View>
  );
}
```

**When to use:** the default. Any component that renders something whose size depends on the window.

### Scale a single value

| You want to scale… | Call |
|---|---|
| One pixel value, width/typography/icon | `scaledWidth(designPx)` |
| One pixel value, vertical, no compaction | `scaledHeight(designPx)` |
| One pixel value, vertical, with compaction | `verticalSpacing(designPx)` |
| All scalers also accept `(px, { mergeSettings: { ... } })` | per-call override |

```tsx
const { scaledWidth } = useScreenLayout();

scaledWidth(16);                                    // normal
scaledWidth(16, { mergeSettings: { scaleMax: 1.4 }}); // tighter cap, this call only
```

### Pick a value per breakpoint

Three flavours, depending on what you're picking.

```tsx
// Numeric design px → scaled px (use the right ramp for the property)
const radius   = scaledWidthAt({ phone: 12, tablet: 16, desktop: 20 });
const barH     = scaledHeightAt({ phone: 56, tablet: 64 });
const listGap  = verticalSpacingAt({ phone: 16, tablet: 12, desktop: 12 });
const sectionGap = adaptiveSpacingAt({ phone: 24, tablet: 18 }); // phone uses scaledHeight, wide uses verticalSpacing

// Any non-numeric value
import { useResponsivePick } from '@programmer1zero1/expo-responsive-window';

const columns       = useResponsivePick({ phone: 1, tablet: 2, desktop: 3 });
const headerVariant = useResponsivePick({ phone: 'compact', tablet: 'spacious' });
```

**Fallback rule:** desktop falls back to tablet, tablet falls back to phone. You only have to provide `phone`.

### Wrap screen content

`<ScreenContentInsets/>` is `width: 100%` + `maxWidth: contentMaxWidth` + `paddingHorizontal: horizontalGutter` (the right gutter for the live breakpoint).

```tsx
import { ScreenContentInsets } from '@programmer1zero1/expo-responsive-window';

<ScreenContentInsets adaptiveGap={{ phone: 16, tablet: 12 }}>
  <Card />
  <Card />
  <Card />
</ScreenContentInsets>
```

| Prop | Effect |
|---|---|
| `adaptiveGap` | Sets a `gap` via `adaptiveSpacingAt` (phone → `scaledHeight`, wide → `verticalSpacing`). |
| `verticalGapAtBands` | Sets a `gap` via `verticalSpacingAt` on every breakpoint. Used only when `adaptiveGap` is omitted. |
| `horizontalGutterOverride` | Forces a specific horizontal padding for this container. |
| `style` | Standard `ViewStyle`, merged last. |

**Don't** add `paddingHorizontal` on a child of `ScreenContentInsets` — you'll inset twice.

### Configure defaults globally

Wrap once near the root if you want different breakpoints, gutters, or design canvas across the whole app.

```tsx
import { ScreenLayoutSettingsProvider } from '@programmer1zero1/expo-responsive-window';

<ScreenLayoutSettingsProvider
  settings={{ breakpointTablet: 744, gutterPhone: 16, scaleMax: 1.5 }}>
  <App />
</ScreenLayoutSettingsProvider>
```

Anything you don't pass is filled from `DEFAULT_SCREEN_LAYOUT`. Per-call `{ mergeSettings: ... }` still wins on individual calls.

### Outside React (worklets / handlers / module scope)

These do **not** subscribe to dimension changes.

```tsx
import {
  getScreenLayoutSnapshot,
  scaledWidthDetached,
  pickByBreakpoint,
  windowWidthPct,
} from '@programmer1zero1/expo-responsive-window';

// One-off scaled px (single Dimensions read)
const px = scaledWidthDetached(14);

// Full metrics object, no subscription
const snap = getScreenLayoutSnapshot();
if (snap.isTablet) { /* ... */ }

// Pick a value by an explicit breakpoint
const cols = pickByBreakpoint(snap.breakpoint, { phone: 1, tablet: 2, desktop: 3 });

// Width % with explicit window width (frozen value)
const half = windowWidthPct(50, snap.windowWidth);
```

**When to use:** Reanimated worklets, gesture callbacks, analytics, or anywhere you can't legally call a hook.

---

## Gotchas

- **`StyleSheet.create({...})` at module scope freezes scaled values forever.** This is a React Native pitfall, not a bug here.

  ```tsx
  // bad — runs once at import time, never updates on rotation
  const styles = StyleSheet.create({
    box: { padding: scaledWidthDetached(16) },
  });

  // good — recomputed each render
  function Box() {
    const { scaledWidth } = useScreenLayout();
    return <View style={{ padding: scaledWidth(16) }} />;
  }
  ```

- **One API for layout and type:** use `scaledWidth` for `fontSize`, icon sizes, and horizontal spacing — there is no separate `scaledFont`.
- **`scaledHeight` vs `verticalSpacing`:** `scaledHeight` for fixed bars (header height, divider), `verticalSpacing` for rhythm (scroll padding, list gaps, tab-bar padding).
- **`windowWidthPct` has two forms.** Reactive (from the hook) closes over the live width. Standalone (imported directly) is a one-shot snapshot — pass an explicit `windowWidth` if you want to freeze it.
- **`<ScreenContentInsets>` already pads horizontally.** Don't double-pad children.

---

## Settings reference

`DEFAULT_SCREEN_LAYOUT` ships with sensible values; override only what you need.

| Field | Default | Purpose |
|---|---|---|
| `breakpointTablet` | `768` | `windowWidth >= this` → `isTablet`. |
| `breakpointDesktop` | `1024` | `windowWidth >= this` → `isDesktop`. |
| `scalePlateauWidth` | `820` | Width at which the width-ramp stops growing. |
| `scaleMax` | `1.78` | Hard cap on the width-ramp. |
| `designWidth` | `430` | Reference canvas width. |
| `designHeight` | `932` | Reference canvas height. |
| `widthClampMin` | `300` | Lower clamp before computing the width-ramp. |
| `gutterPhone` | `14` | `horizontalGutter` on phone. |
| `gutterTablet` | `18` | `horizontalGutter` on tablet. |
| `gutterDesktop` | `20` | `horizontalGutter` on desktop. |
| `tabletVerticalCompact` | `0.72` | `verticalCompactionFactor` on tablet-only. |
| `desktopVerticalCompact` | `0.92` | `verticalCompactionFactor` on desktop. |

---

## Recipes

**Card with breakpoint-aware padding & radius**

```tsx
const { scaledWidth, scaledWidthAt, verticalSpacingAt } = useScreenLayout();

<View
  style={{
    padding: scaledWidth(16),
    borderRadius: scaledWidthAt({ phone: 12, tablet: 16 }),
    gap: verticalSpacingAt({ phone: 12, tablet: 10 }),
  }}>
  …
</View>
```

**Scrollable section list**

```tsx
const { verticalSpacing, scaledHeight } = useScreenLayout();

<ScrollView
  contentContainerStyle={{
    paddingTop: verticalSpacing(20),
    paddingBottom: verticalSpacing(40),
    rowGap: verticalSpacing(16),
  }}>
  …
</ScrollView>
```

**Header with fixed bar height + scaled type**

```tsx
const { scaledHeight, scaledWidth } = useScreenLayout();

<View style={{ height: scaledHeight(56), paddingHorizontal: scaledWidth(16) }}>
  <Text style={{ fontSize: scaledWidth(18), lineHeight: scaledWidth(24) }}>Title</Text>
</View>
```

**Two-column on tablet, single on phone**

```tsx
const columns = useResponsivePick({ phone: 1, tablet: 2, desktop: 3 });

<View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
  {items.map(item => (
    <View key={item.id} style={{ width: `${100 / columns}%` }}>
      <Card item={item} />
    </View>
  ))}
</View>
```

---

## Monorepo & publish

This repo links the package via `workspaces: ["packages/*"]`. Do **not** run `npm install` inside `packages/expo-responsive-window` — a nested `react` will cause invalid hook calls.

```bash
yarn build:responsive-window     # build dist/ from src/
```

To publish:

```bash
cd packages/expo-responsive-window
npm run build
npm publish --access public      # MIT — set repository / author first
```

---

## Explore and learn more →

- **GitHub:** [github.com/programmer1zero1/expo-responsive-window](https://github.com/programmer1zero1/expo-responsive-window)
- **Source (single file you can vendor):** [`src/index.tsx`](./src/index.tsx)
- **Built output:** [`dist/`](./dist)
- **AI / agent rules:** [`AGENTS.md`](./AGENTS.md) — concise rules so Cursor/Claude/Copilot generate correct calls on the first try.
- **Issues & PRs:** [github.com/programmer1zero1/expo-responsive-window/issues](https://github.com/programmer1zero1/expo-responsive-window/issues) — the goal is one place that covers `fontSize`, layout, vertical rhythm, and breakpoints without sprinkling `if (isTablet)` through your code.
