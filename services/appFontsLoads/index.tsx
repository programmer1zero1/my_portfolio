import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';
import {SpaceGrotesk_700Bold} from '@expo-google-fonts/space-grotesk';
import {useFonts} from 'expo-font';
// import * as SplashScreen from 'expo-splash-screen';
import {useTheme} from '@/services/appTheme';
import React, {createContext, useContext, useEffect, type ReactNode} from 'react';
import {ActivityIndicator, View} from 'react-native';

interface FontContextType {
  fontsLoaded: boolean;
}

const FontContext = createContext<FontContextType | undefined>(undefined);

// SplashScreen.preventAutoHideAsync().catch(() => {});

export const FontProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const {colors} = useTheme();

  const [loaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    SpaceGrotesk_700Bold,
  });

  useEffect(() => {
    if (loaded) {
      // SplashScreen.hideAsync().catch(() => {});
    }
  }, [loaded]);

  if (!loaded) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: colors.brand,
        }}>
        <ActivityIndicator color={colors.white} size="large" />
      </View>
    );
  }

  return (
    <FontContext.Provider value={{fontsLoaded: true}}>{children}</FontContext.Provider>
  );
};

export function useLoadedFont(): FontContextType {
  const ctx = useContext(FontContext);
  if (!ctx) {
    throw new Error('useLoadedFont must be used within FontProvider');
  }
  return ctx;
}
