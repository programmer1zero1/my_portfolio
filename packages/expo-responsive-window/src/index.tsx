/**
 * @programmer1zero1/expo-responsive-window
 *
 * Two parallel APIs share the same maths. Pick the right one:
 *
 *  - REACTIVE (re-renders on rotation / resize):
 *      `useScreenLayout`, `useResponsivePick`, `<ScreenContentInsets/>`
 *
 *  - SNAPSHOT (one-shot read, safe in worklets / event handlers / module scope):
 *      `getScreenLayoutSnapshot`, `scaledWidthDetached`,
 *      standalone `windowWidthPct`/`windowHeightPct`, `pickByBreakpoint`
 *
 * See README "Reactive vs snapshot" for the full guide.
 */
import {
  createContext,
  memo,
  useContext,
  useMemo,
  type ReactNode,
} from 'react';
import type {StyleProp, ViewStyle} from 'react-native';
import {
  Dimensions,
  PixelRatio,
  Platform,
  useWindowDimensions,
  View,
} from 'react-native';

/** Layout band from window width vs breakpoints (`tablet` excludes desktop). */
export type ResponsiveBreakpoint = 'phone' | 'tablet' | 'desktop';

/**
 * Numeric tuning for breakpoints, design reference size, gutters, and how much
 * vertical spacing shrinks on tablet/desktop. Pass partial overrides to
 * `ScreenLayoutSettingsProvider` or per-call via scale options.
 */
export type ScreenLayoutSettings = {
  breakpointTablet: number;
  breakpointDesktop: number;
  scalePlateauWidth: number;
  scaleMax: number;
  designWidth: number;
  designHeight: number;
  widthClampMin: number;
  gutterPhone: number;
  gutterTablet: number;
  gutterDesktop: number;
  tabletVerticalCompact: number;
  desktopVerticalCompact: number;
};

/** Default layout preset (430 × 932 design, standard gutters). */
export const DEFAULT_SCREEN_LAYOUT: ScreenLayoutSettings = {
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
};

export type UnaryScaleOptions = {
  /** Merge over context/default settings for this call only */
  mergeSettings?: Partial<ScreenLayoutSettings>;
};

function mergeSettings(
  partial?: Partial<ScreenLayoutSettings>,
): ScreenLayoutSettings {
  return {...DEFAULT_SCREEN_LAYOUT, ...partial};
}

function mergedLayoutSettings(
  base: ScreenLayoutSettings,
  unary?: UnaryScaleOptions,
): ScreenLayoutSettings {
  return unary?.mergeSettings
    ? {...base, ...unary.mergeSettings}
    : base;
}

function widthBaseScaleForWindow(
  windowW: number,
  settings: ScreenLayoutSettings,
): number {
  const widthForScale = Math.min(
    Math.max(windowW, settings.widthClampMin),
    settings.scalePlateauWidth,
  );
  return Math.min(widthForScale / settings.designWidth, settings.scaleMax);
}

function deriveScales(
  windowW: number,
  windowH: number,
  settings: ScreenLayoutSettings,
) {
  const isTablet = windowW >= settings.breakpointTablet;
  const isDesktop = windowW >= settings.breakpointDesktop;

  const widthBaseScale = widthBaseScaleForWindow(windowW, settings);
  const heightBaseScale = windowH / settings.designHeight;

  const horizontalGutter = isDesktop
    ? settings.gutterDesktop
    : isTablet
      ? settings.gutterTablet
      : settings.gutterPhone;

  const verticalCompactionFactor =
    isTablet && !isDesktop
      ? settings.tabletVerticalCompact
      : isDesktop
        ? settings.desktopVerticalCompact
        : 1;

  const breakpoint: ResponsiveBreakpoint = isDesktop
    ? 'desktop'
    : isTablet
      ? 'tablet'
      : 'phone';

  return {
    widthBaseScale,
    heightBaseScale,
    isTablet,
    isDesktop,
    isPhone: !isTablet,
    tabletOnly: isTablet && !isDesktop,
    breakpoint,
    horizontalGutter,
    verticalCompactionFactor,
  };
}

export type ScreenLayoutMetrics = {
  windowWidth: number;
  windowHeight: number;
  screenWidth: number;
  screenHeight: number;
  /** Current `Platform.OS` (ios | android | web | …). */
  os: typeof Platform.OS;
  isPortrait: boolean;
  isPhone: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  /** `isTablet && !isDesktop` — common “wide but not desktop” layout. */
  tabletOnly: boolean;
  breakpoint: ResponsiveBreakpoint;

  /** Full window width — side padding typically comes from `horizontalGutter` + `ScreenContentInsets`. */
  contentMaxWidth: number;

  /** Horizontal inset for the active breakpoint (phone / tablet / desktop). */
  horizontalGutter: number;

  /**
   * Vertical density factor: **1** on phone, **`tabletVerticalCompact`** on tablet-only,
   * **`desktopVerticalCompact`** on desktop. Used inside `verticalSpacing`; exposed for debugging.
   */
  verticalCompactionFactor: number;

  /**
   * Vertical margins / padding / gaps that get **denser on tablet & desktop** (design px vs `designHeight`).
   * For vertical spacing **without** compaction, use **`scaledHeight`**.
   */
  verticalSpacing: (designPx: number, opts?: UnaryScaleOptions) => number;

  /** Fraction of **current window width**, as px (updates on resize). */
  windowWidthPct: (percentage: number) => number;

  /** Fraction of **current window height**, as px. */
  windowHeightPct: (percentage: number) => number;

  /**
   * Horizontal sizes and width-ramped typography: radii, horizontal padding/gaps,
   * **`fontSize`**, icon sizes — scales from **`designWidth`**, clamped (`scalePlateauWidth`, `scaleMax`).
   */
  scaledWidth: (designPx: number, opts?: UnaryScaleOptions) => number;

  /** Vertical sizes from **`designHeight`**, **without** tablet/desktop compaction. */
  scaledHeight: (designPx: number, opts?: UnaryScaleOptions) => number;

  /**
   * `scaledWidth` using **design px per breakpoint** (desktop falls back tablet → phone).
   * Prefer this over sprinkling `tabletOnly ? scaledWidth(a) : scaledWidth(b)` in screens.
   */
  scaledWidthAt: (
    values: BreakpointPick<number>,
    opts?: UnaryScaleOptions,
  ) => number;

  /** `scaledHeight` with per-breakpoint design px. */
  scaledHeightAt: (
    values: BreakpointPick<number>,
    opts?: UnaryScaleOptions,
  ) => number;

  /**
   * `verticalSpacing` with per-breakpoint design px (tablet/desktop compaction on every band).
   */
  verticalSpacingAt: (
    values: BreakpointPick<number>,
    opts?: UnaryScaleOptions,
  ) => number;

  /**
   * **Phone:** `scaledHeight(phone)`. **Tablet/desktop:** `verticalSpacing` from the picked design px.
   * Matches common scroll padding / gaps: tighter vertical rhythm on wide layouts without per-screen `if`s.
   */
  adaptiveSpacingAt: (
    values: BreakpointPick<number>,
    opts?: UnaryScaleOptions,
  ) => number;
};

const ScreenLayoutContext = createContext<ScreenLayoutSettings>(
  DEFAULT_SCREEN_LAYOUT,
);

export type ScreenLayoutSettingsProviderProps = {
  children: ReactNode;
  /** Merge over `DEFAULT_SCREEN_LAYOUT` (breakpoints, gutters, design size, etc.) */
  settings?: Partial<ScreenLayoutSettings>;
};

export const ScreenLayoutSettingsProvider = memo(
  function ScreenLayoutSettingsProvider({
    children,
    settings,
  }: ScreenLayoutSettingsProviderProps) {
    const stableKey = settings ? JSON.stringify(settings) : '';
    const merged = useMemo(() => mergeSettings(settings), [stableKey]);
    return (
      <ScreenLayoutContext.Provider value={merged}>
        {children}
      </ScreenLayoutContext.Provider>
    );
  },
);

/** % of window width → px (standalone; pass `windowWidth` to freeze for a snapshot). */
export function windowWidthPct(percentage: number, windowWidth?: number): number {
  const w = windowWidth ?? Dimensions.get('window').width;
  return (w * percentage) / 100;
}

/** % of window height → px (optional `windowHeight` override same as width). */
export function windowHeightPct(percentage: number, windowHeight?: number): number {
  const h = windowHeight ?? Dimensions.get('window').height;
  return (h * percentage) / 100;
}

/**
 * Like `Platform.select`, **`default` is required** so every platform resolves to a value.
 */
export function platformSelect<T>(map: {
  ios?: T;
  android?: T;
  web?: T;
  windows?: T;
  macos?: T;
  native?: T;
  default: T;
}): T {
  const {default: d, ...rest} = map;
  const pick = Platform.select({...rest, default: d});
  return pick !== undefined && pick !== null ? pick : d;
}

export type BreakpointPick<T> = {
  phone: T;
  tablet?: T;
  desktop?: T;
};

/**
 * Choose a value by breakpoint (desktop → `desktop` ?? `tablet` ?? `phone`).
 * Use inside components with `useScreenLayout()` or pass flags from `getScreenLayoutSnapshot`.
 */
export function pickByBreakpoint<T>(
  breakpoint: ResponsiveBreakpoint,
  values: BreakpointPick<T>,
): T {
  if (breakpoint === 'desktop') {
    return values.desktop ?? values.tablet ?? values.phone;
  }
  if (breakpoint === 'tablet') {
    return values.tablet ?? values.phone;
  }
  return values.phone;
}

/** Hook: `pickByBreakpoint` bound to live layout metrics. */
export function useResponsivePick<T>(values: BreakpointPick<T>): T {
  const {breakpoint} = useScreenLayout();
  return useMemo(
    () => pickByBreakpoint(breakpoint, values),
    [breakpoint, values.desktop, values.phone, values.tablet],
  );
}

/**
 * Snapshot of layout maths without subscribing to resize (e.g. worklets, one-off layouts).
 * Re-read `Dimensions` yourself if you need fresh numbers after orientation changes.
 */
export function getScreenLayoutSnapshot(
  options?: Partial<{
    settings: Partial<ScreenLayoutSettings>;
    windowWidth: number;
    windowHeight: number;
    screenWidth: number;
    screenHeight: number;
  }>,
): ScreenLayoutMetrics {
  const win =
    options?.windowWidth !== undefined &&
    options?.windowHeight !== undefined
      ? {width: options.windowWidth, height: options.windowHeight}
      : Dimensions.get('window');
  const scr =
    options?.screenWidth !== undefined && options?.screenHeight !== undefined
      ? {width: options.screenWidth, height: options.screenHeight}
      : Dimensions.get('screen');

  const settings = mergeSettings(options?.settings);
  return buildScreenLayoutMetrics(
    win.width,
    win.height,
    scr.width,
    scr.height,
    settings,
  );
}

/**
 * One-shot width-based scale (same ramp as `useScreenLayout().scaledWidth`), no resize subscription.
 * Second arg may be **`windowWidth` (number)** (legacy) or **`{ windowWidth?, mergeSettings? }`**.
 */
export function scaledWidthDetached(
  designPx: number,
  windowWidthOrOptions?:
    | number
    | {windowWidth?: number; mergeSettings?: Partial<ScreenLayoutSettings>},
): number {
  const options =
    typeof windowWidthOrOptions === 'number'
      ? {windowWidth: windowWidthOrOptions}
      : windowWidthOrOptions;
  const w =
    options?.windowWidth ?? Dimensions.get('window').width;
  const settings = mergeSettings(options?.mergeSettings);
  const scale = widthBaseScaleForWindow(w, settings);
  return Math.round(PixelRatio.roundToNearestPixel(designPx * scale));
}

function buildScreenLayoutMetrics(
  windowWidth: number,
  windowHeight: number,
  screenWidth: number,
  screenHeight: number,
  baseSettings: ScreenLayoutSettings,
): ScreenLayoutMetrics {
  const derivedFor = (opts?: UnaryScaleOptions) => {
    const s = mergedLayoutSettings(baseSettings, opts);
    return deriveScales(windowWidth, windowHeight, s);
  };

  const base = derivedFor();

  const scaledWidth = (designPx: number, opts?: UnaryScaleOptions) => {
    const d = derivedFor(opts);
    return Math.round(
      PixelRatio.roundToNearestPixel(designPx * d.widthBaseScale),
    );
  };

  const scaledHeight = (designPx: number, opts?: UnaryScaleOptions) => {
    const d = derivedFor(opts);
    return Math.round(
      PixelRatio.roundToNearestPixel(designPx * d.heightBaseScale),
    );
  };

  const verticalSpacing = (designPx: number, opts?: UnaryScaleOptions) => {
    const d = derivedFor(opts);
    return Math.max(
      4,
      Math.round(
        PixelRatio.roundToNearestPixel(
          designPx * d.heightBaseScale * d.verticalCompactionFactor,
        ),
      ),
    );
  };

  const scaledWidthAt = (
    values: BreakpointPick<number>,
    opts?: UnaryScaleOptions,
  ) => scaledWidth(pickByBreakpoint(base.breakpoint, values), opts);

  const scaledHeightAt = (
    values: BreakpointPick<number>,
    opts?: UnaryScaleOptions,
  ) => scaledHeight(pickByBreakpoint(base.breakpoint, values), opts);

  const verticalSpacingAt = (
    values: BreakpointPick<number>,
    opts?: UnaryScaleOptions,
  ) => verticalSpacing(pickByBreakpoint(base.breakpoint, values), opts);

  const adaptiveSpacingAt = (
    values: BreakpointPick<number>,
    opts?: UnaryScaleOptions,
  ) => {
    if (base.breakpoint === 'phone') {
      return scaledHeight(values.phone, opts);
    }
    const px =
      base.breakpoint === 'desktop'
        ? (values.desktop ?? values.tablet ?? values.phone)
        : (values.tablet ?? values.phone);
    return verticalSpacing(px, opts);
  };

  return {
    windowWidth,
    windowHeight,
    screenWidth,
    screenHeight,
    os: Platform.OS,
    isPortrait: windowHeight > windowWidth,
    isPhone: base.isPhone,
    isTablet: base.isTablet,
    isDesktop: base.isDesktop,
    tabletOnly: base.tabletOnly,
    breakpoint: base.breakpoint,
    contentMaxWidth: windowWidth,
    horizontalGutter: base.horizontalGutter,
    verticalCompactionFactor: base.verticalCompactionFactor,
    verticalSpacing,
    windowWidthPct: percentage => windowWidthPct(percentage, windowWidth),
    windowHeightPct: percentage => windowHeightPct(percentage, windowHeight),
    scaledWidth,
    scaledHeight,
    scaledWidthAt,
    scaledHeightAt,
    verticalSpacingAt,
    adaptiveSpacingAt,
  };
}

export function useScreenLayout(): ScreenLayoutMetrics {
  const settings = useContext(ScreenLayoutContext);
  const {width: windowWidth, height: windowHeight} = useWindowDimensions();

  const screen = useMemo(
    () => Dimensions.get('screen'),
    [windowWidth, windowHeight],
  );

  return useMemo(
    () =>
      buildScreenLayoutMetrics(
        windowWidth,
        windowHeight,
        screen.width,
        screen.height,
        settings,
      ),
    [windowWidth, windowHeight, screen.width, screen.height, settings],
  );
}

export type ScreenContentInsetsProps = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  /** Replace computed `horizontalGutter` for this container only */
  horizontalGutterOverride?: number;
  /**
   * Merges `gap` via `adaptiveSpacingAt` (phone `scaledHeight`, tablet/desktop `verticalSpacing`).
   * Ignores `verticalGapAtBands` when both are set.
   */
  adaptiveGap?: BreakpointPick<number>;
  /**
   * Merges `gap` via `verticalSpacingAt` on every breakpoint.
   * Used only when `adaptiveGap` is omitted.
   */
  verticalGapAtBands?: BreakpointPick<number>;
};

/**
 * **`width: 100%`** + **`maxWidth` = window width** + horizontal padding from breakpoints (`horizontalGutter`).
 */
export function ScreenContentInsets(props: ScreenContentInsetsProps) {
  const {
    children,
    style,
    horizontalGutterOverride,
    adaptiveGap,
    verticalGapAtBands,
  } = props;
  const {
    contentMaxWidth,
    horizontalGutter,
    adaptiveSpacingAt,
    verticalSpacingAt,
  } = useScreenLayout();
  const pad =
    horizontalGutterOverride !== undefined
      ? horizontalGutterOverride
      : horizontalGutter;

  const mergedGapStyle: ViewStyle | undefined =
    adaptiveGap !== undefined
      ? {gap: adaptiveSpacingAt(adaptiveGap)}
      : verticalGapAtBands !== undefined
        ? {gap: verticalSpacingAt(verticalGapAtBands)}
        : undefined;

  return (
    <View
      style={[
        {
          width: '100%',
          maxWidth: contentMaxWidth,
          alignSelf: 'center',
          paddingHorizontal: pad,
        },
        mergedGapStyle,
        style,
      ]}>
      {children}
    </View>
  );
}
