import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { StyleSheet } from 'react-native';
import CallRequestsScreen from './call-requests';
import RecentChatsScreen from './recent-chats';

const Tab = createMaterialTopTabNavigator();

export default function TabLayout() {
  return (
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#007AFF',
          tabBarInactiveTintColor: '#8E8E93',
          tabBarIndicatorStyle: {
            backgroundColor: '#007AFF',
            height: 3,
          },
          tabBarLabelStyle: {
            fontSize: 14,
            fontWeight: '600',
            textTransform: 'none',
          },
          tabBarStyle: {
            backgroundColor: '#FFFFFF',
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 1,
            borderBottomColor: '#E5E5EA',
          },
        }}
      >
        <Tab.Screen 
          name="recent-chats" 
          component={RecentChatsScreen}
          options={{ title: 'Recent Chats' }}
        />
        <Tab.Screen 
          name="call-requests" 
          component={CallRequestsScreen}
          options={{ title: 'Call Requests' }}
        />
      </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});