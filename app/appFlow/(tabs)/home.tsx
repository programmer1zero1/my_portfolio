import {MainWrapper, ParentWrapper} from '@/components';
import {FontFamily} from '@/constants/Fonts';
import {
  dayInLife,
  education,
  experience,
  expertise,
  languages,
  profile,
  profileBullets,
  strengths,
} from '@/constants/cvData';
import {useTheme} from '@/services';
import {
  platformSelect,
  ScreenContentInsets,
  useScreenLayout,
} from '@programmer1zero1/expo-responsive-window';
import {router} from 'expo-router';
import {LinearGradient} from 'expo-linear-gradient';
import type {ReactNode} from 'react';
import {useMemo} from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export default function HomeTab() {
  const {colors, theme, setThemeManually} = useTheme();
  const {
    scaledHeight,
    verticalSpacing,
    scaledWidth,
    windowWidthPct,
    tabletOnly,
  } = useScreenLayout();
  const insets = useSafeAreaInsets();
  const screenBg = theme === 'dark' ? colors.black : colors.grey5;
  const cardBg = theme === 'dark' ? colors.darkGrey : colors.white;
  const cardBorder = theme === 'dark' ? colors.grey1 : colors.lightGrey;

  const styles = useMemo(
    () =>
      StyleSheet.create({
        h1: {
          fontFamily: FontFamily.displayBold,
          fontSize: scaledWidth(26),
          color: colors.black,
        },
        sectionTitle: {
          fontFamily: FontFamily.interBold,
          fontSize: scaledWidth(18),
          color: colors.black,
        },
        body: {
          fontFamily: FontFamily.interRegular,
          fontSize: scaledWidth(14),
          lineHeight: scaledWidth(21),
          color: colors.darkGrey,
        },
        meta: {
          fontFamily: FontFamily.interMedium,
          fontSize: scaledWidth(12),
          color: colors.grey,
        },
        bullet: {
          fontFamily: FontFamily.interRegular,
          fontSize: scaledWidth(14),
          lineHeight: scaledWidth(20),
          color: colors.darkGrey,
        },
        chip: {
          fontFamily: FontFamily.interMedium,
          fontSize: scaledWidth(11),
        },
      }),
    [colors.black, colors.darkGrey, colors.grey, colors.grey1, scaledWidth],
  );

  return (
    <ParentWrapper backgroundColor={screenBg} barBackgroundColor={screenBg}>
      <MainWrapper>
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{
          paddingTop: tabletOnly ? verticalSpacing(8) : scaledHeight(10),
          paddingBottom: insets.bottom + (tabletOnly ? verticalSpacing(20) : scaledHeight(28)),
          alignItems: 'center',
          width: '100%',
        }}
        showsVerticalScrollIndicator={false}>
      <ScreenContentInsets
        style={{
          gap: tabletOnly ? verticalSpacing(12) : scaledHeight(16),
        }}>
      <LinearGradient
        colors={[colors.brand2, colors.brand3]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={{
          borderRadius: scaledWidth(tabletOnly ? 14 : 20),
          padding: scaledWidth(tabletOnly ? 12 : 18),
          gap: tabletOnly ? verticalSpacing(8) : verticalSpacing(12),
          flexDirection: tabletOnly ? 'row' : 'column',
          alignItems: tabletOnly ? 'stretch' : undefined,
        }}>
        <View
          style={{
            flex: tabletOnly ? 1 : undefined,
            gap: tabletOnly ? verticalSpacing(6) : undefined,
            minWidth: tabletOnly ? scaledWidth(220) : undefined,
          }}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View
            style={{
              width: scaledWidth(tabletOnly ? 42 : 52),
              height: scaledWidth(tabletOnly ? 42 : 52),
              borderRadius: scaledWidth(tabletOnly ? 12 : 16),
              backgroundColor: colors.darkTransparent,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: colors.white,
                fontFamily: FontFamily.interBold,
                fontSize: scaledWidth(18),
              }}>
              MR
            </Text>
          </View>
          <Pressable
            onPress={() =>
              setThemeManually(theme === 'light' ? 'dark' : 'light')
            }
            style={{
              paddingHorizontal: scaledWidth(12),
              paddingVertical: tabletOnly ? verticalSpacing(6) : scaledHeight(8),
              borderRadius: scaledWidth(999),
              backgroundColor: colors.darkTransparent,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: colors.white,
                fontFamily: FontFamily.interSemiBold,
                fontSize: scaledWidth(12),
                lineHeight: scaledWidth(16),
                textAlign: 'center',
                ...platformSelect({
                  android: {includeFontPadding: false},
                  default: {},
                }),
              }}>
              {theme === 'dark' ? 'Light UI' : 'Dark UI'}
            </Text>
          </Pressable>
        </View>
        <Text style={{color: colors.white, fontFamily: FontFamily.interBold, fontSize: scaledWidth(22)}}>
          {profile.name}
        </Text>
        <Text style={{color: colors.brand5, fontFamily: FontFamily.interMedium, fontSize: scaledWidth(15)}}>
          {profile.title}
        </Text>
        <Text style={{color: colors.white, opacity: 0.95, fontFamily: FontFamily.interRegular, fontSize: scaledWidth(13), lineHeight: scaledWidth(19)}}>
          {profile.location} · {profile.phone}
        </Text>
        {!tabletOnly ? (
        <Pressable
          onPress={() => router.push('/appFlow/resume')}
          style={{
            marginTop: verticalSpacing(4),
            alignSelf: 'flex-start',
            paddingHorizontal: scaledWidth(14),
            paddingVertical: scaledHeight(10),
            borderRadius: scaledWidth(12),
            backgroundColor: colors.white,
          }}>
          <Text style={{color: colors.brand, fontFamily: FontFamily.interBold, fontSize: scaledWidth(13)}}>
            Full résumé view
          </Text>
        </Pressable>
        ) : null}
        </View>
        {tabletOnly ? (
          <View
            style={{
              justifyContent: 'center',
              paddingLeft: scaledWidth(10),
            }}>
            <Pressable
              onPress={() => router.push('/appFlow/resume')}
              style={{
                paddingHorizontal: scaledWidth(14),
                paddingVertical: verticalSpacing(8),
                borderRadius: scaledWidth(12),
                backgroundColor: colors.white,
              }}>
              <Text style={{color: colors.brand, fontFamily: FontFamily.interBold, fontSize: scaledWidth(13)}}>
                Full résumé view
              </Text>
            </Pressable>
          </View>
        ) : null}
      </LinearGradient>

      <Card bg={cardBg} border={cardBorder} tabletOnly={tabletOnly} theme={theme}>
        <Text style={[styles.sectionTitle, theme === 'dark' && {color: colors.white}]}>
          Profile
        </Text>
        {profileBullets.map((line, i) => (
          <Text key={i} style={[styles.bullet, theme === 'dark' && {color: colors.grey5}]}>
            • {line}
          </Text>
        ))}
      </Card>

      <View style={{gap: tabletOnly ? verticalSpacing(6) : scaledHeight(8)}}>
        <Text style={[styles.sectionTitle, {color: theme === 'dark' ? colors.white : colors.black}]}>
          Key expertise
        </Text>
        {tabletOnly ? (
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: scaledWidth(8),
            }}>
            {expertise.map(item => (
              <View
                key={item}
                style={{
                  paddingHorizontal: scaledWidth(10),
                  paddingVertical: verticalSpacing(6),
                  borderRadius: scaledWidth(999),
                  backgroundColor: colors.brand7,
                  maxWidth: windowWidthPct(48),
                }}>
                <Text style={[styles.chip, {color: colors.brand}]} numberOfLines={2}>
                  {item}
                </Text>
              </View>
            ))}
          </View>
        ) : (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{gap: scaledWidth(8), paddingVertical: 2}}>
          {expertise.map(item => (
            <View
              key={item}
              style={{
                paddingHorizontal: scaledWidth(12),
                paddingVertical: scaledHeight(8),
                borderRadius: scaledWidth(999),
                backgroundColor: colors.brand7,
                maxWidth: windowWidthPct(85),
              }}>
              <Text style={[styles.chip, {color: colors.brand}]} numberOfLines={2}>
                {item}
              </Text>
            </View>
          ))}
        </ScrollView>
        )}
      </View>

      <Card bg={cardBg} border={cardBorder} tabletOnly={tabletOnly} theme={theme}>
        <Text style={[styles.sectionTitle, theme === 'dark' && {color: colors.white}]}>
          Experience
        </Text>
        {experience.map(exp => (
          <View key={exp.id} style={{marginTop: tabletOnly ? verticalSpacing(10) : scaledHeight(12), gap: tabletOnly ? verticalSpacing(4) : scaledHeight(6)}}>
            <Text style={[styles.h1, {fontSize: scaledWidth(17)}, theme === 'dark' && {color: colors.white}]}>
              {exp.role}
            </Text>
            <Text style={styles.meta}>
              {exp.company} · {exp.period} · {exp.location}
            </Text>
            {exp.points.map((p, i) => (
              <Text key={i} style={[styles.bullet, theme === 'dark' && {color: colors.grey5}]}>
                • {p}
              </Text>
            ))}
          </View>
        ))}
      </Card>

      <Card bg={cardBg} border={cardBorder} tabletOnly={tabletOnly} theme={theme}>
        <Text style={[styles.sectionTitle, theme === 'dark' && {color: colors.white}]}>
          A day of my life
        </Text>
        {dayInLife.map(row => (
          <View key={row.label} style={{marginTop: tabletOnly ? verticalSpacing(7) : scaledHeight(10)}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: tabletOnly ? verticalSpacing(3) : scaledHeight(4)}}>
              <Text style={[styles.meta, {flex: 1, paddingRight: 8}, theme === 'dark' && {color: colors.grey3}]}>
                {row.label}
              </Text>
              <Text style={[styles.meta, {fontFamily: FontFamily.interBold}, theme === 'dark' && {color: colors.brand5}]}>
                {row.pct}%
              </Text>
            </View>
            <View
              style={{
                height: tabletOnly ? verticalSpacing(6) : scaledHeight(8),
                borderRadius: scaledWidth(999),
                backgroundColor: theme === 'dark' ? colors.black : colors.lightGrey,
                overflow: 'hidden',
              }}>
              <View
                style={{
                  width: `${row.pct}%`,
                  height: '100%',
                  borderRadius: scaledWidth(999),
                  backgroundColor: colors.brand3,
                }}
              />
            </View>
          </View>
        ))}
      </Card>

      <Card bg={cardBg} border={cardBorder} tabletOnly={tabletOnly} theme={theme}>
        <Text style={[styles.sectionTitle, theme === 'dark' && {color: colors.white}]}>
          Education
        </Text>
        {education.map(ed => (
          <View key={ed.id} style={{marginTop: tabletOnly ? verticalSpacing(8) : scaledHeight(10), gap: tabletOnly ? verticalSpacing(3) : scaledHeight(4)}}>
            <Text style={[styles.h1, {fontSize: scaledWidth(16)}, theme === 'dark' && {color: colors.white}]}>
              {ed.degree}
            </Text>
            <Text style={styles.meta}>
              {ed.school} · {ed.period}
            </Text>
            {'note' in ed && ed.note ? (
              <Text style={[styles.body, theme === 'dark' && {color: colors.grey5}]}>{ed.note}</Text>
            ) : null}
          </View>
        ))}
      </Card>

      <Card bg={cardBg} border={cardBorder} tabletOnly={tabletOnly} theme={theme}>
        <Text style={[styles.sectionTitle, theme === 'dark' && {color: colors.white}]}>
          Languages
        </Text>
        {languages.map(lang => (
          <View
            key={lang.name}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: tabletOnly ? verticalSpacing(7) : scaledHeight(10),
            }}>
            <Text style={[styles.body, theme === 'dark' && {color: colors.grey5}]}>{lang.name}</Text>
            <View style={{flexDirection: 'row', gap: 4}}>
              {Array.from({length: 5}).map((_, i) => (
                <View
                  key={i}
                  style={{
                    width: scaledWidth(8),
                    height: scaledWidth(8),
                    borderRadius: scaledWidth(99),
                    backgroundColor:
                      i < lang.dots ? colors.brand3 : colors.grey2,
                  }}
                />
              ))}
            </View>
          </View>
        ))}
      </Card>

      <Card bg={cardBg} border={cardBorder} tabletOnly={tabletOnly} theme={theme}>
        <Text style={[styles.sectionTitle, theme === 'dark' && {color: colors.white}]}>
          Strengths
        </Text>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: scaledWidth(8),
            marginTop: tabletOnly ? verticalSpacing(6) : scaledHeight(8),
          }}>
          {strengths.map(s => (
            <View
              key={s}
              style={{
                paddingHorizontal: scaledWidth(12),
                paddingVertical: tabletOnly ? verticalSpacing(5) : scaledHeight(8),
                borderRadius: scaledWidth(12),
                backgroundColor: colors.brand5,
              }}>
              <Text style={[styles.chip, {color: colors.brand}]}>{s}</Text>
            </View>
          ))}
        </View>
      </Card>
      </ScreenContentInsets>
      </ScrollView>
      </MainWrapper>
    </ParentWrapper>
  );
}

function Card({
  children,
  bg,
  border,
  tabletOnly,
  theme,
}: {
  children: ReactNode;
  bg: string;
  border: string;
  tabletOnly: boolean;
  theme: 'light' | 'dark' | 'custom';
}) {
  const {verticalSpacing, scaledWidth} = useScreenLayout();
  const pad = tabletOnly ? verticalSpacing(11) : scaledWidth(16);
  return (
    <View
      style={{
        borderRadius: tabletOnly ? scaledWidth(12) : scaledWidth(16),
        padding: pad,
        backgroundColor: bg,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: border,
        shadowColor: theme === 'light' ? '#000' : 'transparent',
        shadowOpacity: theme === 'light' ? 0.06 : 0,
        shadowRadius: tabletOnly ? 8 : 12,
        shadowOffset: {width: 0, height: tabletOnly ? 2 : 4},
        elevation: theme === 'light' ? 2 : 0,
      }}>
      {children}
    </View>
  );
}
