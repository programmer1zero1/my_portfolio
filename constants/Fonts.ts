/**
 * Font family names match `@expo-google-fonts/*` keys loaded in `services/appFontsLoads`.
 */
export const FontFamily = {
  interRegular: 'Inter_400Regular',
  interMedium: 'Inter_500Medium',
  interSemiBold: 'Inter_600SemiBold',
  interBold: 'Inter_700Bold',
  displayBold: 'SpaceGrotesk_700Bold',
} as const;

export type FontFamilyKey = keyof typeof FontFamily;
