import {Stack} from 'expo-router';

export default function AuthFlowLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'fade',
        contentStyle: {backgroundColor: '#0f1117'},
      }}
    />
  );
}
