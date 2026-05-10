import {FontFamily} from '@/constants/Fonts';
import {useTheme} from '@/services';
import {useScreenLayout} from 'expo-responsive-window';
import {memo} from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

export type ButtonVariant = 'brand' | 'outline' | 'ghost';

type ButtonProps = {
  label: string;
  onPress?: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
};

const Button = memo(function Button({
  label,
  onPress,
  variant = 'brand',
  disabled,
  loading,
  style,
}: ButtonProps) {
  const {colors} = useTheme();
  const {scaledFont, scaledWidth, scaledHeight} = useScreenLayout();

  const palette =
    variant === 'brand'
      ? {bg: colors.white, fg: colors.brand, border: 'transparent' as const, bw: 0}
      : variant === 'outline'
        ? {
            bg: 'transparent' as const,
            fg: colors.white,
            border: colors.brand5 as string,
            bw: Math.max(1, StyleSheet.hairlineWidth * 2),
          }
        : {
            bg: colors.darkTransparent,
            fg: colors.white,
            border: 'transparent' as const,
            bw: 0,
          };

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      disabled={disabled || loading}
      onPress={onPress}
      style={({pressed}) => [
        {
          borderRadius: scaledWidth(16),
          paddingVertical: scaledHeight(16),
          paddingHorizontal: scaledWidth(24),
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: palette.bg,
          borderWidth: palette.bw,
          borderColor: palette.border,
          opacity: pressed && !disabled && !loading ? 0.92 : disabled ? 0.5 : 1,
        },
        style,
      ]}>
      {loading ? (
        <ActivityIndicator color={palette.fg} />
      ) : (
        <Text
          style={{
            color: palette.fg,
            fontFamily: FontFamily.interBold,
            fontSize: scaledFont(16),
          }}>
          {label}
        </Text>
      )}
    </Pressable>
  );
});

export default Button;
