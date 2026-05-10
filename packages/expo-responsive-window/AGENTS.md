# AGENTS.md — @programmer1zero1/expo-responsive-window

Rules for AI coding agents (Cursor, Claude Code, Copilot, etc.) working with this package. **Always follow these.**

---

## Imports

- Always import from `'@programmer1zero1/expo-responsive-window'`. There are no submodule paths.
- Canonical import line for screens:

  ```ts
  import {
    ScreenContentInsets,
    useScreenLayout,
    useResponsivePick,
  } from '@programmer1zero1/expo-responsive-window';
  ```

- Canonical import line for non-React contexts (worklets, handlers, modules):

  ```ts
  import {
    getScreenLayoutSnapshot,
    scaledWidthDetached,
    pickByBreakpoint,
  } from '@programmer1zero1/expo-responsive-window';
  ```

---

## Public exports (the only names you may use)

**Hooks (reactive):** `useScreenLayout`, `useResponsivePick`

**Components:** `ScreenLayoutSettingsProvider`, `ScreenContentInsets`

**Reactive scalers (destructured from `useScreenLayout()`):**
`scaledWidth`, `scaledHeight`, `verticalSpacing`,
`scaledWidthAt`, `scaledHeightAt`, `verticalSpacingAt`, `adaptiveSpacingAt`,
`windowWidthPct`, `windowHeightPct`

**Reactive flags / metrics (destructured from `useScreenLayout()`):**
`windowWidth`, `windowHeight`, `screenWidth`, `screenHeight`, `os`,
`isPortrait`, `isPhone`, `isTablet`, `isDesktop`, `tabletOnly`, `breakpoint`,
`contentMaxWidth`, `horizontalGutter`, `verticalCompactionFactor`

**Snapshot / non-reactive helpers:**
`getScreenLayoutSnapshot`, `scaledWidthDetached`,
`windowWidthPct`, `windowHeightPct` (standalone forms),
`pickByBreakpoint`

**Settings / types / utilities:**
`DEFAULT_SCREEN_LAYOUT`, `ScreenLayoutSettings`, `ScreenLayoutMetrics`,
`ResponsiveBreakpoint`, `BreakpointPick<T>`, `UnaryScaleOptions`,
`platformSelect`

> **Do not invent names.** In particular, **`scaledFont` does not exist** — use `scaledWidth` for `fontSize` and icon sizes. There is also no `scaledFontDetached` — use `scaledWidthDetached`.

---

## Style-prop → helper mapping (use exactly these)

| React Native style prop / use case | Helper |
|---|---|
| `fontSize` | `scaledWidth(px)` |
| Icon `size` (`<Ionicons size={...} />`) | `scaledWidth(px)` |
| `lineHeight` | `scaledWidth(px)` |
| `borderRadius`, `borderWidth` | `scaledWidth(px)` |
| `paddingHorizontal`, `marginHorizontal`, horizontal `gap`, horizontal `width` | `scaledWidth(px)` |
| Header / bar / divider `height` | `scaledHeight(px)` |
| Screen scroll `paddingTop` / `paddingBottom` | `verticalSpacing(px)` |
| Vertical stack `gap` between cards | `verticalSpacing(px)` |
| Tab-bar `paddingBottom` | `verticalSpacing(px)` |
| `width` / `maxWidth` as a fraction of window | `windowWidthPct(percent)` |
| Per-breakpoint number (numeric design px) | `scaledWidthAt` / `scaledHeightAt` / `verticalSpacingAt` / `adaptiveSpacingAt` |
| Per-breakpoint non-numeric value | `useResponsivePick` |
| Boolean branching | `isPhone` / `isTablet` / `isDesktop` / `tabletOnly` / `isPortrait` |

Tie-breakers:

- `scaledHeight` is for **fixed bars** (header height, divider height).
- `verticalSpacing` is for **rhythm** (scroll padding, list/card gaps, tab-bar padding) — it compacts on tablet/desktop.

---

## Reactive vs snapshot

| Context | API to use |
|---|---|
| React component / screen render | `useScreenLayout()`, `useResponsivePick()`, `<ScreenContentInsets/>` |
| Reanimated worklet, gesture callback, event handler, plain function, non-React module | `getScreenLayoutSnapshot()`, `scaledWidthDetached()`, `pickByBreakpoint()` |
| Module-scope `StyleSheet.create({...})` | **None** — refactor styles into the component |

Anything containing `Detached` or `Snapshot` in the name is a one-shot read and **will not** update on rotation.

---

## Hard rules (do these)

1. **Use `scaledWidth` for `fontSize`, icon sizes, and all horizontal sizing.**
2. **Use `verticalSpacing` (not `scaledHeight`) for scroll padding and vertical gaps between cards.**
3. **Use `scaledHeight` only for fixed-height vertical things** (header height, divider, image with a fixed aspect).
4. **Use the `*At` helpers instead of `if (isTablet) ... else ...`** when only the design-px number changes.
5. **Wrap screens in `<ScreenContentInsets/>`** when you want consistent gutters; do not add `paddingHorizontal` on a child of it.
6. **Always provide at least `phone`** in any `BreakpointPick<T>` (`useResponsivePick`, `scaledWidthAt`, etc.). `tablet` and `desktop` are optional and fall back to `phone` (and `desktop` falls back to `tablet`).
7. **Per-call settings override** uses `helper(designPx, { mergeSettings: { ... } })`.
8. **Wrap the app once** in `<ScreenLayoutSettingsProvider settings={...}>` if you need to change defaults globally; otherwise omit it.

---

## Anti-patterns (do not do these)

```tsx
// ❌ scaledFont does not exist
const { scaledFont } = useScreenLayout();

// ✅ use scaledWidth for typography
const { scaledWidth } = useScreenLayout();
<Text style={{ fontSize: scaledWidth(16) }} />
```

```tsx
// ❌ module-scope StyleSheet.create freezes scaled values forever
const styles = StyleSheet.create({
  box: { padding: scaledWidthDetached(16) },
});

// ✅ compute inside the component
function Box() {
  const { scaledWidth } = useScreenLayout();
  return <View style={{ padding: scaledWidth(16) }} />;
}
```

```tsx
// ❌ hand-rolled breakpoint ladder
const radius = isDesktop ? scaledWidth(20) : isTablet ? scaledWidth(16) : scaledWidth(12);

// ✅ use *At helpers
const radius = scaledWidthAt({ phone: 12, tablet: 16, desktop: 20 });
```

```tsx
// ❌ calling the hook in a worklet
const handler = () => {
  const { scaledWidth } = useScreenLayout();
};

// ✅ snapshot helpers outside React
const handler = () => {
  const px = scaledWidthDetached(16);
};
```

```tsx
// ❌ double padding inside <ScreenContentInsets/>
<ScreenContentInsets>
  <View style={{ paddingHorizontal: scaledWidth(16) }}>…</View>
</ScreenContentInsets>

// ✅ let the wrapper handle it
<ScreenContentInsets>
  <View>…</View>
</ScreenContentInsets>
```

---

## Decision flow

When asked to size something:

1. Is the value a `fontSize` / icon / radius / horizontal length? → `scaledWidth` (or `scaledWidthAt` if it varies by breakpoint).
2. Is it a vertical fixed-bar height? → `scaledHeight` (or `scaledHeightAt`).
3. Is it vertical rhythm (scroll padding, list/card gap, tab-bar padding)? → `verticalSpacing` (or `verticalSpacingAt`, or `adaptiveSpacingAt` for the phone-uses-`scaledHeight` / wide-uses-`verticalSpacing` blend).
4. Is it a fraction of the window? → `windowWidthPct` / `windowHeightPct`.
5. Is the value not a number (a string, a component, a count)? → `useResponsivePick`.
6. Are you outside React? → corresponding `*Detached` / `Snapshot` / `pickByBreakpoint` helpers.

---

## Examples (canonical, copy these patterns)

### Card with breakpoint-aware padding & radius

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

### Scrollable section list

```tsx
const { verticalSpacing } = useScreenLayout();

<ScrollView
  contentContainerStyle={{
    paddingTop: verticalSpacing(20),
    paddingBottom: verticalSpacing(40),
    rowGap: verticalSpacing(16),
  }}>
  …
</ScrollView>
```

### Header with fixed bar height + scaled type

```tsx
const { scaledHeight, scaledWidth } = useScreenLayout();

<View style={{ height: scaledHeight(56), paddingHorizontal: scaledWidth(16) }}>
  <Text style={{ fontSize: scaledWidth(18), lineHeight: scaledWidth(24) }}>Title</Text>
</View>
```

### Two-column on tablet, single on phone

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

### One-off scale outside React

```tsx
import { scaledWidthDetached, getScreenLayoutSnapshot } from '@programmer1zero1/expo-responsive-window';

function onLongPress() {
  const px = scaledWidthDetached(14);
  const snap = getScreenLayoutSnapshot();
  if (snap.isTablet) { /* … */ }
}
```

---

## Default settings (informational)

```ts
{
  breakpointTablet: 768,
  breakpointDesktop: 1024,
  scalePlateauWidth: 820,
  scaleMax: 1.78,
  designWidth: 430,
  designHeight: 932,
  widthClampMin: 300,
  gutterPhone: 14,
  gutterTablet: 18,
  gutterDesktop: 20,
  tabletVerticalCompact: 0.72,
  desktopVerticalCompact: 0.92,
}
```

Override globally via `<ScreenLayoutSettingsProvider settings={{ ... }}>` or per-call via `helper(px, { mergeSettings: { ... } })`.

---

## Build & monorepo

- This is a Yarn workspace: do **not** run `npm install` inside the package directory.
- Build: `yarn build:responsive-window` (from the repo root).
- Source of truth: `src/index.tsx`. Generated output: `dist/`.
