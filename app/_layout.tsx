import 'react-native-gesture-handler';
import {FontProvider, ThemeProvider} from '@/services';
import {ScreenLayoutSettingsProvider} from '@programmer1zero1/expo-responsive-window';
import {Stack} from 'expo-router';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {KeyboardProvider} from 'react-native-keyboard-controller';
import {SafeAreaProvider} from 'react-native-safe-area-context';

export default function RootLayout() {
  return (
    <ThemeProvider>
      <FontProvider>
        <ScreenLayoutSettingsProvider>
        <GestureHandlerRootView style={{flex: 1}}>
          <SafeAreaProvider>
            <KeyboardProvider>
            <Stack
              initialRouteName="index"
              screenOptions={{
                headerShown: false,
                animation: 'fade',
              }}>
              <Stack.Screen name="index" />
              <Stack.Screen name="authFlow" />
              <Stack.Screen name="appFlow" />
            </Stack>
            </KeyboardProvider>
          </SafeAreaProvider>
        </GestureHandlerRootView>
        </ScreenLayoutSettingsProvider>
      </FontProvider>
    </ThemeProvider>
  );
}
