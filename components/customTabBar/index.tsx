import {FontFamily} from '@/constants/Fonts';
import {useTheme} from '@/services';
import {platformSelect, useScreenLayout} from '@programmer1zero1/expo-responsive-window';
import {Ionicons} from '@expo/vector-icons';
import {memo, useMemo} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type TabBarProps = {
  state: any;
  descriptors: any;
  navigation: any;
};

const TAB_ICONS: Record<string, keyof typeof Ionicons.glyphMap> = {
  home: 'sparkles-outline',
  projects: 'rocket-outline',
  skills: 'layers-outline',
  contact: 'chatbubble-ellipses-outline',
};

/**
 * Tab bar chrome must not use raw `scaledHeight` on tall viewports (e.g. Nexus-style
 * 2560px height): height scale explodes and the bar dominates the screen.
 * Width-based scale is plateau-capped — `min(h, w)` keeps touch targets sane on phones
 * and large tablets/web.
 */
function barMetric(
  scaledHeight: (n: number) => number,
  scaledWidth: (n: number) => number,
  designPx: number,
) {
  return Math.min(scaledHeight(designPx), scaledWidth(designPx));
}

function CustomTabBar({state, descriptors, navigation}: TabBarProps) {
  const {colors} = useTheme();
  const insets = useSafeAreaInsets();
  const {
    contentMaxWidth,
    scaledHeight,
    scaledWidth,
    tabletOnly,
    isDesktop,
  } = useScreenLayout();

  /**
   * Wide layouts: still use height-capped metrics (tall viewports) but **do not** shrink the
   * row to a centered cluster — tabs stay `flex: 1` so they span the bar like `space-between`.
   */
  const wideLayout = tabletOnly || isDesktop;

  const paddingBottom = useMemo(
    () =>
      platformSelect({
        ios: wideLayout
          ? Math.max(barMetric(scaledHeight, scaledWidth, 10), insets.bottom)
          : Math.max(barMetric(scaledHeight, scaledWidth, 12), insets.bottom),
        default: Math.max(
          insets.bottom,
          barMetric(scaledHeight, scaledWidth, 8),
        ),
      }),
    [scaledHeight, scaledWidth, insets.bottom, wideLayout],
  );

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          borderTopWidth: StyleSheet.hairlineWidth,
          borderTopColor: colors.darkTransparent,
        },
        row: {
          flexDirection: 'row',
          alignItems: 'center',
          width: '100%',
          paddingTop: wideLayout
            ? barMetric(scaledHeight, scaledWidth, 8)
            : barMetric(scaledHeight, scaledWidth, 10),
          paddingHorizontal: wideLayout ? scaledWidth(12) : scaledWidth(4),
          minHeight: wideLayout
            ? barMetric(scaledHeight, scaledWidth, 52)
            : barMetric(scaledHeight, scaledWidth, 56),
        },
        tab: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          gap: barMetric(scaledHeight, scaledWidth, 4),
          minWidth: 0,
          paddingHorizontal: scaledWidth(4),
        },
        label: {
          fontSize: scaledWidth(wideLayout ? 12 : 11),
          fontFamily: FontFamily.interSemiBold,
        },
      }),
    [
      colors.darkTransparent,
      scaledHeight,
      wideLayout,
      scaledWidth,
    ],
  );

  return (
    <View
      style={[
        styles.container,
        {
          paddingBottom,
          backgroundColor: colors.brand2,
        },
      ]}>
      <View
        style={{
          width: '100%',
          maxWidth: contentMaxWidth,
          alignSelf: 'center',
        }}>
      <View style={styles.row}>
        {state.routes.map((route: any, index: number) => {
          const {options} = descriptors[route.key];
          const label =
            options.tabBarLabel ?? options.title ?? route.name ?? 'Tab';
          const isFocused = state.index === index;
          const iconName = TAB_ICONS[route.name] ?? 'ellipse-outline';

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? {selected: true} : {}}
              onPress={onPress}
              style={styles.tab}
              activeOpacity={0.85}>
              <Ionicons
                name={iconName}
                size={scaledWidth(wideLayout ? 24 : 22)}
                color={isFocused ? colors.white : colors.grey3}
              />
              <Text
                style={[
                  styles.label,
                  {color: isFocused ? colors.white : colors.grey3},
                ]}
                numberOfLines={1}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      </View>
    </View>
  );
}

export default memo(CustomTabBar);
