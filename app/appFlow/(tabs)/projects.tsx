import {MainWrapper, ParentWrapper} from '@/components';
import {FontFamily} from '@/constants/Fonts';
import {projects} from '@/constants/cvData';
import {useTheme} from '@/services';
import {ScreenContentInsets, useScreenLayout} from 'expo-responsive-window';
import {router} from 'expo-router';
import {useMemo} from 'react';
import {
  FlatList,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export default function ProjectsTab() {
  const {colors, theme} = useTheme();
  const {scaledFont, scaledHeight, verticalSpacing, scaledWidth, tabletOnly} =
    useScreenLayout();
  const insets = useSafeAreaInsets();

  const screenBg = theme === 'dark' ? colors.black : colors.grey5;
  const cardBg = theme === 'dark' ? colors.darkGrey : colors.white;
  const border = theme === 'dark' ? colors.grey1 : colors.lightGrey;

  const styles = useMemo(
    () =>
      StyleSheet.create({
        h1: {
          fontFamily: FontFamily.displayBold,
          fontSize: scaledFont(26),
          color: theme === 'dark' ? colors.white : colors.black,
        },
        title: {
          fontFamily: FontFamily.interBold,
          fontSize: scaledFont(17),
          color: theme === 'dark' ? colors.white : colors.black,
        },
        body: {
          fontFamily: FontFamily.interRegular,
          fontSize: scaledFont(14),
          lineHeight: scaledFont(20),
          color: theme === 'dark' ? colors.grey5 : colors.darkGrey,
        },
        meta: {
          fontFamily: FontFamily.interMedium,
          fontSize: scaledFont(11),
          color: colors.grey,
        },
        badge: {
          fontFamily: FontFamily.interSemiBold,
          fontSize: scaledFont(10),
        },
      }),
    [colors.black, colors.darkGrey, colors.grey, colors.grey5, colors.white, scaledFont, theme],
  );

  return (
    <ParentWrapper backgroundColor={screenBg} barBackgroundColor={screenBg}>
      <MainWrapper>
      <FlatList
        style={{flex: 1, width: '100%'}}
        data={projects}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: tabletOnly ? verticalSpacing(12) : scaledHeight(16),
          paddingBottom: insets.bottom + (tabletOnly ? verticalSpacing(18) : scaledHeight(24)),
          gap: tabletOnly ? verticalSpacing(8) : scaledHeight(12),
          flexGrow: 1,
          alignItems: 'stretch',
          width: '100%',
        }}
        ListHeaderComponent={
          <ScreenContentInsets
            style={{
              gap: tabletOnly ? verticalSpacing(6) : scaledHeight(8),
              marginBottom: tabletOnly ? verticalSpacing(6) : scaledHeight(8),
            }}>
            <Text style={styles.h1}>Shipped work</Text>
            <Text style={styles.body}>
              Live apps, internal builds, and products in motion — same detail as the CV, in a tap-friendly
              timeline.
            </Text>
          </ScreenContentInsets>
        }
        renderItem={({item}) => (
          <ScreenContentInsets>
          <Pressable
            onPress={() => router.push(`/appFlow/project/${item.id}`)}
            style={{
              width: '100%',
              borderRadius: scaledWidth(tabletOnly ? 14 : 18),
              padding: scaledWidth(tabletOnly ? 12 : 16),
              backgroundColor: cardBg,
              borderWidth: StyleSheet.hairlineWidth,
              borderColor: border,
              gap: tabletOnly ? verticalSpacing(6) : scaledHeight(8),
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: scaledWidth(8), flexWrap: 'wrap'}}>
              <Text style={styles.title}>{item.title}</Text>
              {item.status ? (
                <View
                  style={{
                    paddingHorizontal: scaledWidth(8),
                    paddingVertical: tabletOnly ? verticalSpacing(3) : scaledHeight(4),
                    borderRadius: scaledWidth(8),
                    backgroundColor:
                      item.status === 'live'
                        ? colors.success
                        : item.status === 'wip'
                          ? colors.pending
                          : colors.grey2,
                  }}>
                  <Text style={[styles.badge, {color: colors.white}]}>
                    {item.status === 'live'
                      ? 'Live'
                      : item.status === 'wip'
                        ? 'WIP'
                        : 'Internal'}
                  </Text>
                </View>
              ) : null}
            </View>
            <Text style={styles.body}>{item.summary}</Text>
            <View style={{flexDirection: 'row', gap: scaledWidth(10), flexWrap: 'wrap'}}>
              {item.appStoreUrl ? (
                <Pressable onPress={() => Linking.openURL(item.appStoreUrl!)}>
                  <Text style={{fontFamily: FontFamily.interSemiBold, fontSize: scaledFont(12), color: colors.blue}}>
                    App Store
                  </Text>
                </Pressable>
              ) : null}
              {item.playStoreUrl ? (
                <Pressable onPress={() => Linking.openURL(item.playStoreUrl!)}>
                  <Text style={{fontFamily: FontFamily.interSemiBold, fontSize: scaledFont(12), color: colors.blue}}>
                    Play Store
                  </Text>
                </Pressable>
              ) : null}
            </View>
            <Text style={[styles.meta, {color: colors.brand}]}>Open case study →</Text>
          </Pressable>
          </ScreenContentInsets>
        )}
      />
      </MainWrapper>
    </ParentWrapper>
  );
}
