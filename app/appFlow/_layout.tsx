import {Stack} from 'expo-router';

/**
 * App shell: `(tabs)` shows the tab bar; `(stack)` is a sibling for full-screen routes
 * (no bottom tabs) — same pattern as discussed for Retailerz / scalable Expo Router apps.
 */
export default function AppFlowLayout() {
  return (
    <Stack screenOptions={{headerShown: false, animation: 'slide_from_right'}}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="(stack)" />
    </Stack>
  );
}
