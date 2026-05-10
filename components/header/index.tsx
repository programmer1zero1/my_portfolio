import {FontFamily} from '@/constants/Fonts';
import {useTheme} from '@/services';
import {useScreenLayout} from '@programmer1zero1/expo-responsive-window';
import {router} from 'expo-router';
import {memo} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

export type HeaderProps = {
  title?: string;
  onBackPress?: () => void;
  backLabel?: string;
};

const Header = memo(function Header({
  title,
  onBackPress,
  backLabel = '← Back',
}: HeaderProps) {
  const {colors, theme} = useTheme();
  const {scaledWidth} = useScreenLayout();

  const handleBack = () => {
    if (onBackPress) onBackPress();
    else router.back();
  };

  return (
    <View style={styles.row}>
      <Pressable onPress={handleBack} hitSlop={12} accessibilityRole="button">
        <Text
          style={{
            color: colors.brand,
            fontFamily: FontFamily.interBold,
            fontSize: scaledWidth(14),
          }}>
          {backLabel}
        </Text>
      </Pressable>
      {title ? (
        <Text
          numberOfLines={1}
          style={{
            flex: 1,
            marginLeft: scaledWidth(12),
            color: theme === 'dark' ? colors.white : colors.black,
            fontFamily: FontFamily.displayBold,
            fontSize: scaledWidth(18),
          }}>
          {title}
        </Text>
      ) : null}
    </View>
  );
});

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
});

export default Header;
