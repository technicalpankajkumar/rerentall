import SafeAreaWithGradientBg from "@/components/utility/SafeAreaWithGradientBg";
import {
    Bell,
    ChevronRight,
    CreditCard,
    HelpCircle,
    Home,
    MessageCircle,
    Shield,
    Trophy,
    User,
} from "lucide-react-native";
import React from "react";
import {
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    useWindowDimensions,
    View
} from "react-native";

export default function ProfileScreen() {
  const { width } = useWindowDimensions();

  // Responsive breakpoints
  const isTablet = width >= 768;
  const isLargeTablet = width >= 1024;

  // Calculate container width for tablets
  const containerWidth = isLargeTablet ? 600 : isTablet ? width * 0.8 : width;
  const containerStyle = isTablet
    ? { alignSelf: "center", width: containerWidth }
    : {};

  const settingsItems = [
    {
      id: 1,
      title: "Personal information",
      icon: User,
      category: "Settings",
    },
    {
      id: 2,
      title: "Payments & payouts",
      icon: CreditCard,
      category: "Settings",
    },
    {
      id: 3,
      title: "League",
      icon: Trophy,
      category: "Settings",
    },
    {
      id: 4,
      title: "Notifications",
      icon: Bell,
      category: "Settings",
    },
    {
      id: 5,
      title: "Privacy and security",
      icon: Shield,
      category: "Settings",
    },
    {
      id: 6,
      title: "Get help",
      icon: HelpCircle,
      category: "Supports",
    },
    {
      id: 7,
      title: "Contact support center",
      icon: MessageCircle,
      category: "Supports",
    },
  ];

  const renderSettingsItem = (item: any) => {
    const IconComponent = item.icon;

    return (
      <TouchableOpacity
        key={item.id}
        className={`flex-row items-center justify-between bg-white px-${isTablet ? "6" : "4"} py-${isTablet ? "5" : "4"} border-b border-gray-100`}
        activeOpacity={0.7}
      >
        <View className="flex-row items-center flex-1">
          <View
            className={`w-${isTablet ? "12" : "10"} h-${isTablet ? "12" : "10"} bg-gray-100 rounded-full items-center justify-center mr-${isTablet ? "4" : "3"}`}
          >
            <IconComponent size={isTablet ? 22 : 20} color="#374151" />
          </View>
          <Text
            className={`font-medium text-gray-900 ${isTablet ? "text-lg" : "text-base"}`}
          >
            {item.title}
          </Text>
        </View>
        <ChevronRight size={isTablet ? 22 : 20} color="#9CA3AF" />
      </TouchableOpacity>
    );
  };

  const renderSection = (title: string, items: any[]) => (
    <View className="mb-6" key={title}>
      <Text
        className={`font-semibold text-gray-900 px-${isTablet ? "6" : "4"} mb-3 ${isTablet ? "text-lg" : "text-base"}`}
      >
        {title}
      </Text>
      <View className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
        {items.map(renderSettingsItem)}
      </View>
    </View>
  );

  return (
    <SafeAreaWithGradientBg>
      <ScrollView
        className="flex-1 "
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        <View style={containerStyle}>
          {/* Profile Header */}
          <View
            className={`  mt-${isTablet ? "6" : "4"} py-4 shadow-sm  overflow-hidden`}
          >
            <TouchableOpacity
              className={`flex-row items-center px-${isTablet ? "6" : "4"} py-${isTablet ? "6" : "5"}`}
              activeOpacity={0.7}
            >
              <Image
                source={{
                  uri: "https://api.dicebear.com/7.x/avataaars/svg?seed=Syaiful",
                }}
                className={`w-${isTablet ? "16" : "12"} h-${isTablet ? "16" : "12"} rounded-full bg-gray-200 mr-${isTablet ? "4" : "3"}`}
              />
              <View className="flex-1">
                <View className="flex-row items-center mb-1">
                  <Text
                    className={`font-bold text-gray-900 ${isTablet ? "text-xl" : "text-lg"}`}
                  >
                    Pankaj Kumar
                  </Text>
                  <View className="w-2 h-2 bg-green-500 rounded-full ml-2" />
                </View>
                <Text
                  className={`text-gray-500 ${isTablet ? "text-base" : "text-sm"}`}
                >
                  Show my profile
                </Text>
              </View>
              <ChevronRight size={isTablet ? 24 : 20} color="#9CA3AF" />
            </TouchableOpacity>
          </View>

          {/* Rent Your Home Banner */}
          <View className={`mx-${isTablet ? "6" : "4"} mt-6`}>
            <View className=" rounded-xl overflow-hidden shadow-sm">
              <View
                className={`px-${isTablet ? "6" : "4"} py-${isTablet ? "6" : "5"} flex-row items-center justify-between`}
              >
                <View className="flex-1">
                  <View className="flex-row items-center mb-2">
                    <Text
                      className={`font-bold text-white ${isTablet ? "text-xl" : "text-lg"}`}
                    >
                      Rent your home
                    </Text>
                    <Home
                      size={isTablet ? 22 : 20}
                      color="white"
                      className="ml-2"
                    />
                  </View>
                  <Text
                    className={`text-blue-100 ${isTablet ? "text-base" : "text-sm"} leading-5`}
                  >
                    Join the top 5% of millions of people{"\n"}who rent their
                    best housing here
                  </Text>
                </View>
                <TouchableOpacity
                  className={`bg-white px-${isTablet ? "6" : "4"} py-${isTablet ? "3" : "2"} rounded-full ml-4`}
                  activeOpacity={0.8}
                >
                  <Text
                    className={`font-semibold text-blue-600 ${isTablet ? "text-base" : "text-sm"}`}
                  >
                    Start now
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
         </View>
          {/* Settings Sections */}
          <View className={`mt-8 px-${isTablet ? "6" : "4"}`}>
            {renderSection(
              "Settings",
              settingsItems.filter((item) => item.category === "Settings"),
            )}
            {renderSection(
              "Supports",
              settingsItems.filter((item) => item.category === "Supports"),
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaWithGradientBg>
  );
}
