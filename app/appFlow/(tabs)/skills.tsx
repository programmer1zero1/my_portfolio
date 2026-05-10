import {MainWrapper, ParentWrapper} from '@/components';
import {FontFamily} from '@/constants/Fonts';
import {additionalUiProjects, skills as skillGroups, technicalSkills} from '@/constants/cvData';
import {useTheme} from '@/services';
import {ScreenContentInsets, useScreenLayout} from 'expo-responsive-window';
import {useMemo} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export default function SkillsTab() {
  const {colors, theme} = useTheme();
  const {
    scaledFont,
    scaledHeight,
    verticalSpacing,
    scaledWidth,
    tabletOnly,
  } = useScreenLayout();
  const insets = useSafeAreaInsets();

  const screenBg = theme === 'dark' ? colors.black : colors.grey5;
  const chipBg = theme === 'dark' ? colors.darkGrey : colors.white;
  const border = theme === 'dark' ? colors.grey1 : colors.lightGrey;

  const textPrimary = theme === 'dark' ? colors.white : colors.black;
  const textSecondary = theme === 'dark' ? colors.grey5 : colors.darkGrey;

  const styles = useMemo(
    () =>
      StyleSheet.create({
        h1: {
          fontFamily: FontFamily.displayBold,
          fontSize: scaledFont(26),
          color: textPrimary,
        },
        group: {
          fontFamily: FontFamily.interBold,
          fontSize: scaledFont(14),
          color: colors.brand,
          textTransform: 'uppercase',
          letterSpacing: 0.8,
        },
        chip: {
          fontFamily: FontFamily.interMedium,
          fontSize: scaledFont(12),
        },
        li: {
          fontFamily: FontFamily.interRegular,
          fontSize: scaledFont(13),
          color: textSecondary,
          lineHeight: scaledFont(19),
        },
      }),
    [colors.brand, scaledFont, textPrimary, textSecondary],
  );

  return (
    <ParentWrapper backgroundColor={screenBg} barBackgroundColor={screenBg}>
      <MainWrapper>
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{
          paddingTop: tabletOnly ? verticalSpacing(12) : scaledHeight(16),
          paddingBottom: insets.bottom + (tabletOnly ? verticalSpacing(20) : scaledHeight(28)),
          alignItems: 'center',
          width: '100%',
        }}>
      <ScreenContentInsets style={{gap: tabletOnly ? verticalSpacing(12) : scaledHeight(18)}}>
      <View style={{gap: tabletOnly ? verticalSpacing(6) : scaledHeight(8)}}>
        <Text style={styles.h1}>Stack radar</Text>
        <Text style={styles.li}>
          Technical skills from the CV — grouped the same way you’d pitch them in a stand-up or interview.
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: scaledWidth(8),
        }}>
        {technicalSkills.map(s => (
          <View
            key={s}
            style={{
              paddingHorizontal: scaledWidth(12),
              paddingVertical: tabletOnly ? verticalSpacing(5) : scaledHeight(8),
              borderRadius: scaledWidth(999),
              backgroundColor: chipBg,
              borderWidth: StyleSheet.hairlineWidth,
              borderColor: border,
            }}>
            <Text style={[styles.chip, {color: textPrimary}]}>{s}</Text>
          </View>
        ))}
      </View>

      {Object.entries(skillGroups).map(([label, items]) => (
        <View key={label} style={{gap: tabletOnly ? verticalSpacing(6) : scaledHeight(8)}}>
          <Text style={styles.group}>{label}</Text>
          <View
            style={{
              borderRadius: scaledWidth(tabletOnly ? 12 : 16),
              padding: scaledWidth(tabletOnly ? 10 : 14),
              backgroundColor: chipBg,
              borderWidth: StyleSheet.hairlineWidth,
              borderColor: border,
              gap: tabletOnly ? verticalSpacing(4) : scaledHeight(6),
            }}>
            {items.map(it => (
              <Text key={it} style={styles.li}>
                · {it}
              </Text>
            ))}
          </View>
        </View>
      ))}

      <View style={{gap: tabletOnly ? verticalSpacing(6) : scaledHeight(8)}}>
        <Text style={styles.group}>Additional UI exposure</Text>
        <View
          style={{
            borderRadius: scaledWidth(tabletOnly ? 12 : 16),
            padding: scaledWidth(tabletOnly ? 10 : 14),
            backgroundColor: chipBg,
            borderWidth: StyleSheet.hairlineWidth,
            borderColor: border,
            gap: tabletOnly ? verticalSpacing(4) : scaledHeight(6),
          }}>
          {additionalUiProjects.map(p => (
            <Text key={p} style={styles.li}>
              • {p}
            </Text>
          ))}
        </View>
      </View>
      </ScreenContentInsets>
      </ScrollView>
      </MainWrapper>
    </ParentWrapper>
  );
}
