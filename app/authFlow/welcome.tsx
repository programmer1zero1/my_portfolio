import {Button, MainWrapper, ParentWrapper} from '@/components';
import {FontFamily} from '@/constants/Fonts';
import {profile} from '@/constants/cvData';
import {useTheme} from '@/services';
import {ScreenContentInsets, useScreenLayout} from '@programmer1zero1/expo-responsive-window';
import {LinearGradient} from 'expo-linear-gradient';
import {router} from 'expo-router';
import {StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export default function WelcomeScreen() {
  const {colors} = useTheme();
  const {scaledHeight, scaledWidth, windowWidthPct} = useScreenLayout();
  const insets = useSafeAreaInsets();

  return (
    <ParentWrapper backgroundColor="transparent" barBackgroundColor="transparent">
      <MainWrapper>
        <LinearGradient
          colors={[colors.linearGradient2, colors.brand, colors.brand3]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={styles.flex}>
          <ScreenContentInsets
            style={{
              flex: 1,
              justifyContent: 'space-between',
              paddingTop: scaledHeight(28),
              paddingBottom: insets.bottom + scaledHeight(24),
            }}>
            <View style={{gap: scaledHeight(8)}}>
              <View
                style={{
                  alignSelf: 'flex-start',
                  paddingHorizontal: scaledWidth(12),
                  paddingVertical: scaledHeight(6),
                  borderRadius: scaledWidth(999),
                  backgroundColor: colors.darkTransparent,
                }}>
                <Text
                  style={{
                    color: colors.brand5,
                    fontFamily: FontFamily.interSemiBold,
                    fontSize: scaledWidth(12),
                    letterSpacing: 1.2,
                  }}>
                  PORTFOLIO · EXPO 54
                </Text>
              </View>
              <Text
                style={{
                  color: colors.white,
                  fontFamily: FontFamily.displayBold,
                  fontSize: scaledWidth(40),
                  lineHeight: scaledWidth(44),
                }}>
                {profile.name.split(' ')[0]}
                {'\n'}
                <Text style={{color: colors.brand5}}>{profile.name.split(' ')[1]}</Text>
              </Text>
              <Text
                style={{
                  color: colors.brand5,
                  fontFamily: FontFamily.interMedium,
                  fontSize: scaledWidth(17),
                }}>
                {profile.title}
              </Text>
              <Text
                style={{
                  color: colors.white,
                  fontFamily: FontFamily.interRegular,
                  fontSize: scaledWidth(14),
                  lineHeight: scaledWidth(21),
                  opacity: 0.92,
                  maxWidth: windowWidthPct(92),
                }}>
                {profile.tagline}
              </Text>
            </View>

            <View style={{gap: scaledHeight(12)}}>
              <View
                style={{
                  height: scaledHeight(1),
                  width: windowWidthPct(22),
                  backgroundColor: colors.brand4,
                  opacity: 0.6,
                }}
              />
              <Text
                style={{
                  color: colors.brand5,
                  fontFamily: FontFamily.interRegular,
                  fontSize: scaledWidth(13),
                }}>
                TX Dynamics · React Native · Node integrations
              </Text>
            </View>

            <Button
              label="Enter portfolio"
              variant="brand"
              onPress={() => router.replace('/appFlow/home')}
            />
          </ScreenContentInsets>
        </LinearGradient>
      </MainWrapper>
    </ParentWrapper>
  );
}

const styles = StyleSheet.create({
  flex: {flex: 1},
});
