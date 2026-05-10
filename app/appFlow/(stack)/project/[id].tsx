import {Header, MainWrapper, ParentWrapper} from '@/components';
import {FontFamily} from '@/constants/Fonts';
import {projects} from '@/constants/cvData';
import {useTheme} from '@/services';
import {ScreenContentInsets, useScreenLayout} from '@programmer1zero1/expo-responsive-window';
import * as Linking from 'expo-linking';
import {useLocalSearchParams} from 'expo-router';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export default function ProjectDetailScreen() {
  const {id} = useLocalSearchParams<{id: string}>();
  const {colors, theme} = useTheme();
  const {scaledHeight, scaledWidth} = useScreenLayout();
  const insets = useSafeAreaInsets();
  const project = projects.find(p => p.id === id);

  const screenBg = theme === 'dark' ? colors.black : colors.grey5;

  if (!project) {
    return (
      <ParentWrapper backgroundColor={screenBg} barBackgroundColor={screenBg}>
        <MainWrapper>
          <View
            style={{
              flex: 1,
              paddingTop: scaledHeight(16),
              paddingHorizontal: scaledHeight(16),
            }}>
            <Header />
            <View style={[styles.center, {flex: 1}]}>
              <Text
                style={{
                  color: theme === 'dark' ? colors.white : colors.black,
                  fontFamily: FontFamily.interMedium,
                }}>
                Project not found.
              </Text>
            </View>
          </View>
        </MainWrapper>
      </ParentWrapper>
    );
  }

  return (
    <ParentWrapper backgroundColor={screenBg} barBackgroundColor={screenBg}>
      <MainWrapper>
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{
          paddingTop: scaledHeight(12),
          paddingBottom: insets.bottom + scaledHeight(28),
          alignItems: 'center',
          width: '100%',
        }}>
      <ScreenContentInsets style={{gap: scaledHeight(12)}}>
      <Header />

      <Text
        style={{
          fontFamily: FontFamily.displayBold,
          fontSize: scaledWidth(26),
          color: theme === 'dark' ? colors.white : colors.black,
        }}>
        {project.title}
      </Text>
      <Text style={{fontFamily: FontFamily.interMedium, fontSize: scaledWidth(13), color: colors.grey}}>
        {project.role} · {project.stack.join(' · ')}
      </Text>
      <Text
        style={{
          fontFamily: FontFamily.interRegular,
          fontSize: scaledWidth(15),
          lineHeight: scaledWidth(23),
          color: theme === 'dark' ? colors.grey5 : colors.darkGrey,
        }}>
        {project.body}
      </Text>

      <View style={{flexDirection: 'row', flexWrap: 'wrap', gap: scaledWidth(12)}}>
        {project.appStoreUrl ? (
          <Pressable onPress={() => Linking.openURL(project.appStoreUrl!)}>
            <Text style={{fontFamily: FontFamily.interSemiBold, fontSize: scaledWidth(14), color: colors.blue}}>
              App Store
            </Text>
          </Pressable>
        ) : null}
        {project.playStoreUrl ? (
          <Pressable onPress={() => Linking.openURL(project.playStoreUrl!)}>
            <Text style={{fontFamily: FontFamily.interSemiBold, fontSize: scaledWidth(14), color: colors.blue}}>
              Play Store
            </Text>
          </Pressable>
        ) : null}
      </View>
      </ScreenContentInsets>
      </ScrollView>
      </MainWrapper>
    </ParentWrapper>
  );
}

const styles = StyleSheet.create({
  center: {flex: 1, alignItems: 'center', justifyContent: 'center'},
});
