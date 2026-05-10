import {Header, MainWrapper, ParentWrapper} from '@/components';
import {FontFamily} from '@/constants/Fonts';
import {
  education,
  experience,
  expertise,
  internshipProject,
  languages,
  profile,
  profileBullets,
  projects,
  strengths,
  technicalSkills,
} from '@/constants/cvData';
import {useTheme} from '@/services';
import {ScreenContentInsets, useScreenLayout} from 'expo-responsive-window';
import type {ReactNode} from 'react';
import {Pressable, ScrollView, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export default function ResumeScreen() {
  const {colors, theme} = useTheme();
  const {scaledFont, scaledHeight, scaledWidth} = useScreenLayout();
  const insets = useSafeAreaInsets();

  const screenBg = theme === 'dark' ? colors.black : colors.grey5;
  const text = theme === 'dark' ? colors.white : colors.black;
  const muted = theme === 'dark' ? colors.grey5 : colors.darkGrey;

  return (
    <ParentWrapper backgroundColor={screenBg} barBackgroundColor={screenBg}>
      <MainWrapper>
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{
          paddingTop: scaledHeight(12),
          paddingBottom: insets.bottom + scaledHeight(32),
          alignItems: 'center',
          width: '100%',
        }}>
      <ScreenContentInsets style={{gap: scaledHeight(18)}}>
      <Header />

      <Text style={{fontFamily: FontFamily.displayBold, fontSize: scaledFont(28), color: text}}>{profile.name}</Text>
      <Text style={{fontFamily: FontFamily.interSemiBold, fontSize: scaledFont(16), color: colors.brand}}>
        {profile.title}
      </Text>
      <Text style={{fontFamily: FontFamily.interRegular, fontSize: scaledFont(14), lineHeight: scaledFont(21), color: muted}}>
        {profile.tagline}
      </Text>
      <Text style={{fontFamily: FontFamily.interRegular, fontSize: scaledFont(13), color: muted}}>
        {profile.location} · {profile.email} · {profile.phone}
      </Text>

      <Block title="Profile" theme={theme}>
        {profileBullets.map((b, i) => (
          <Text key={i} style={{fontFamily: FontFamily.interRegular, fontSize: scaledFont(14), lineHeight: scaledFont(21), color: muted}}>
            • {b}
          </Text>
        ))}
      </Block>

      <Block title="Technical skills" theme={theme}>
        <Text style={{fontFamily: FontFamily.interRegular, fontSize: scaledFont(13), lineHeight: scaledFont(20), color: muted}}>
          {technicalSkills.join(' · ')}
        </Text>
      </Block>

      <Block title="Key expertise" theme={theme}>
        {expertise.map(e => (
          <Text key={e} style={{fontFamily: FontFamily.interRegular, fontSize: scaledFont(13), color: muted}}>
            · {e}
          </Text>
        ))}
      </Block>

      <Block title="Experience" theme={theme}>
        {experience.map(exp => (
          <View key={exp.id} style={{marginBottom: scaledHeight(12), gap: scaledHeight(4)}}>
            <Text style={{fontFamily: FontFamily.interBold, fontSize: scaledFont(15), color: text}}>{exp.role}</Text>
            <Text style={{fontFamily: FontFamily.interMedium, fontSize: scaledFont(12), color: colors.grey}}>
              {exp.company} · {exp.period} · {exp.location}
            </Text>
            {exp.points.map((p, i) => (
              <Text key={i} style={{fontFamily: FontFamily.interRegular, fontSize: scaledFont(13), color: muted}}>
                • {p}
              </Text>
            ))}
          </View>
        ))}
      </Block>

      <Block title="Projects & applications" theme={theme}>
        {projects.map(p => (
          <View key={p.id} style={{marginBottom: scaledHeight(10), gap: 4}}>
            <Text style={{fontFamily: FontFamily.interBold, fontSize: scaledFont(14), color: text}}>{p.title}</Text>
            <Text style={{fontFamily: FontFamily.interRegular, fontSize: scaledFont(13), color: muted}}>{p.summary}</Text>
          </View>
        ))}
      </Block>

      <Block title="Education" theme={theme}>
        {education.map(ed => (
          <Text key={ed.id} style={{fontFamily: FontFamily.interRegular, fontSize: scaledFont(14), color: muted}}>
            {ed.degree}, {ed.school} ({ed.period}){' '}
            {'note' in ed && ed.note ? `— ${ed.note}` : ''}
          </Text>
        ))}
      </Block>

      <Block title="Languages" theme={theme}>
        {languages.map(l => (
          <Text key={l.name} style={{fontFamily: FontFamily.interRegular, fontSize: scaledFont(13), color: muted}}>
            {l.name} {Array.from({length: l.dots}).map(() => '●').join(' ')}
          </Text>
        ))}
      </Block>

      <Block title="Strengths" theme={theme}>
        <Text style={{fontFamily: FontFamily.interRegular, fontSize: scaledFont(13), color: muted}}>
          {strengths.join(' · ')}
        </Text>
      </Block>

      <Block title="Internship project" theme={theme}>
        <Text style={{fontFamily: FontFamily.interBold, fontSize: scaledFont(14), color: text}}>{internshipProject.title}</Text>
        <Text style={{fontFamily: FontFamily.interRegular, fontSize: scaledFont(13), color: muted}}>
          {internshipProject.description}
        </Text>
      </Block>
      </ScreenContentInsets>
      </ScrollView>
      </MainWrapper>
    </ParentWrapper>
  );
}

function Block({
  title,
  children,
  theme,
}: {
  title: string;
  children: ReactNode;
  theme: 'light' | 'dark' | 'custom';
}) {
  const {colors} = useTheme();
  return (
    <View
      style={{
        borderTopWidth: 1,
        borderTopColor: theme === 'dark' ? colors.grey1 : colors.lightGrey,
        paddingTop: 12,
        gap: 8,
      }}>
      <Text style={{fontFamily: FontFamily.interBold, fontSize: 16, color: theme === 'dark' ? colors.white : colors.black}}>
        {title}
      </Text>
      {children}
    </View>
  );
}
