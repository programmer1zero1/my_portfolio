import {MainWrapper, ParentWrapper} from '@/components';
import {FontFamily} from '@/constants/Fonts';
import {profile} from '@/constants/cvData';
import {useTheme} from '@/services';
import {ScreenContentInsets, useScreenLayout} from '@programmer1zero1/expo-responsive-window';
import * as Linking from 'expo-linking';
import {useMemo} from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export default function ContactTab() {
  const {colors, theme} = useTheme();
  const {scaledWidth, scaledWidthAt, adaptiveSpacingAt} = useScreenLayout();
  const insets = useSafeAreaInsets();

  const screenBg = theme === 'dark' ? colors.black : colors.grey5;
  const cardBg = theme === 'dark' ? colors.darkGrey : colors.white;
  const border = theme === 'dark' ? colors.grey1 : colors.lightGrey;

  const styles = useMemo(
    () =>
      StyleSheet.create({
        h1: {
          fontFamily: FontFamily.displayBold,
          fontSize: scaledWidth(28),
          color: theme === 'dark' ? colors.white : colors.black,
        },
        body: {
          fontFamily: FontFamily.interRegular,
          fontSize: scaledWidth(15),
          lineHeight: scaledWidth(22),
          color: theme === 'dark' ? colors.grey5 : colors.darkGrey,
        },
        label: {
          fontFamily: FontFamily.interSemiBold,
          fontSize: scaledWidth(11),
          letterSpacing: 0.6,
          color: colors.grey,
        },
        value: {
          fontFamily: FontFamily.interBold,
          fontSize: scaledWidth(16),
          color: theme === 'dark' ? colors.brand5 : colors.brand,
        },
      }),
    [colors.black, colors.brand, colors.brand5, colors.darkGrey, colors.grey, colors.grey5, colors.white, scaledWidth, theme],
  );

  return (
    <ParentWrapper backgroundColor={screenBg} barBackgroundColor={screenBg}>
      <MainWrapper>
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{
          paddingTop: adaptiveSpacingAt({phone: 16, tablet: 12}),
          paddingBottom: insets.bottom + adaptiveSpacingAt({phone: 28, tablet: 20}),
          alignItems: 'center',
          width: '100%',
        }}>
      <ScreenContentInsets
        style={{gap: adaptiveSpacingAt({phone: 16, tablet: 12})}}>
      <Text style={styles.h1}>Let’s build</Text>
      <Text style={styles.body}>
        Open to mobile contracts, product teams, and founder-led builds where React Native and Node meet shipping
        pressure.
      </Text>

      <View
        style={{
          borderRadius: scaledWidthAt({phone: 18, tablet: 14}),
          padding: scaledWidthAt({phone: 16, tablet: 12}),
          backgroundColor: cardBg,
          borderWidth: StyleSheet.hairlineWidth,
          borderColor: border,
          gap: adaptiveSpacingAt({phone: 14, tablet: 10}),
        }}>
        <View style={{gap: 4}}>
          <Text style={styles.label}>EMAIL</Text>
          <Pressable onPress={() => Linking.openURL(`mailto:${profile.email}`)}>
            <Text style={styles.value}>{profile.email}</Text>
          </Pressable>
        </View>
        <View style={{gap: 4}}>
          <Text style={styles.label}>PHONE</Text>
          <Pressable onPress={() => Linking.openURL(`tel:${profile.phone.replace(/\s/g, '')}`)}>
            <Text style={styles.value}>{profile.phone}</Text>
          </Pressable>
        </View>
        <View style={{gap: 4}}>
          <Text style={styles.label}>GITHUB</Text>
          <Pressable onPress={() => Linking.openURL(profile.github)}>
            <Text style={styles.value}>{profile.github}</Text>
          </Pressable>
        </View>
        <View style={{gap: 4}}>
          <Text style={styles.label}>BASE</Text>
          <Text style={[styles.body, {color: theme === 'dark' ? colors.white : colors.black, fontFamily: FontFamily.interSemiBold}]}>
            {profile.location}
          </Text>
        </View>
      </View>
      </ScreenContentInsets>
      </ScrollView>
      </MainWrapper>
    </ParentWrapper>
  );
}
