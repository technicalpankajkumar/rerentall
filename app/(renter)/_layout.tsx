import { useColorScheme } from "@/lib/useColorScheme";
import { Tabs } from "expo-router";
import { CircleUserRound, House, MessageCircle, ScanSearch } from "lucide-react-native";

const RentalLayout = () => {
  const {isDarkColorScheme} = useColorScheme()
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: isDarkColorScheme ? '#000000'  :"#FFFFFF",
          borderTopWidth: 1,
          borderTopColor: "#E5E7EB",
          paddingTop: 4,
          height: 60,
        },
        tabBarActiveTintColor: "#3B82F6",
        tabBarInactiveTintColor: isDarkColorScheme ? "#FFFFFF" : "#9CA3AF",
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "400",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <House color={color} size={size} strokeWidth={1} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color, size }) => (
            <ScanSearch color={color} size={size} strokeWidth={1} />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: 'Chat',
          tabBarIcon: ({ color, size }) => (
            <MessageCircle color={color} size={size} strokeWidth={1} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <CircleUserRound color={color} size={size} strokeWidth={1} />
          ),
        }}
      />
    </Tabs>
  );
};

export default RentalLayout;
