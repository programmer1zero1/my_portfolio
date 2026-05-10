import {useTheme} from '@/services';
import {StatusBar} from 'expo-status-bar';
import {memo, type ReactNode} from 'react';
import type {ColorValue} from 'react-native';
import {StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export type ParentWrapperProps = {
  children: ReactNode;
  /** Root fill color (full screen behind status strip). */
  backgroundColor?: ColorValue;
  /** Status-bar strip behind notch; defaults to `backgroundColor`. */
  barBackgroundColor?: ColorValue;
  /** Reserve top safe-area height under the status bar overlay. */
  enableTopInset?: boolean;
};

/**
 * Outer screen shell (Retailerz `ParentWrapper` pattern): flex root and status bar handling
 * (replaces standalone `StatusBarInset`). Bottom safe area stays on scroll/list content.
 */
const ParentWrapper = memo(function ParentWrapper({
  children,
  backgroundColor,
  barBackgroundColor,
  enableTopInset = true,
}: ParentWrapperProps) {
  const {theme} = useTheme();
  const insets = useSafeAreaInsets();
  const resolvedBg = backgroundColor ?? 'transparent';
  const resolvedBarBg = barBackgroundColor ?? resolvedBg;
  const barStyle = theme === 'dark' ? 'light' : 'dark';

  return (
    <View style={[styles.root, {backgroundColor: resolvedBg}]}>
      <View
        style={{
          paddingTop: enableTopInset ? insets.top : 0,
          backgroundColor: resolvedBarBg,
        }}>
        <StatusBar style={barStyle} />
      </View>
      {children}
    </View>
  );
});

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

export default ParentWrapper;
