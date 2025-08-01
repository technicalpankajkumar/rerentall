import SafeAreaWithGradientBg from '@/components/utility/SafeAreaWithGradientBg';
import { Tabs } from 'expo-router';
import { House, LayoutDashboard, User } from 'lucide-react-native';
import { StyleSheet } from 'react-native';

 const RentalLayout=()=> {
  return (
    <SafeAreaWithGradientBg colors={['#fff',"#fff"]}>
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: '#3B82F6',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarLabelStyle: styles.tabBarLabel,
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <House color={color} size={size} strokeWidth={2} />
          ),
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <User color={color} size={size} strokeWidth={2} />
          ),
        }}
      />
      {/* <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favorites',
          tabBarIcon: ({ color, size }) => (
            <Heart color={color} size={size} strokeWidth={2} />
          ),
        }}
      /> */}
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color, size }) => (
            <LayoutDashboard color={color} size={size} strokeWidth={2} />
          ),
        }}
      />
    </Tabs>
    </SafeAreaWithGradientBg>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 4,
    height: 60,
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
});

export default RentalLayout