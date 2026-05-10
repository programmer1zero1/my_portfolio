import {CustomTabBar} from '@/components';
import {Tabs} from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs
      initialRouteName="home"
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}>
      <Tabs.Screen
        name="home"
        options={{title: 'Profile', tabBarLabel: 'Profile'}}
      />
      <Tabs.Screen name="projects" options={{title: 'Shipped'}} />
      <Tabs.Screen name="skills" options={{title: 'Stack'}} />
      <Tabs.Screen name="contact" options={{title: 'Contact'}} />
    </Tabs>
  );
}
