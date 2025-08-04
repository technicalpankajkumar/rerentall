import SafeAreaWithGradientBg from "@/components/partials/SafeAreaWithGradientBg";
import {
    Bath,
    Bed,
    Filter,
    Heart,
    MapPin,
    Menu,
    Search,
    Square,
} from "lucide-react-native";
import React, { useState } from "react";
import {
    Image,
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    useWindowDimensions,
    View
} from "react-native";

export default function RentalListingScreen() {
  const { width, height } = useWindowDimensions();
  const [isLiked, setIsLiked] = useState(false);

  // Responsive breakpoints
  const isTablet = width >= 768;
  const isLargeTablet = width >= 1024;

  return (
    <SafeAreaWithGradientBg>

      <StatusBar barStyle="dark-content" backgroundColor="white" />

      {/* Header with Search */}
      <View
        className={`px-${isTablet ? "6" : "4"} pt-${isTablet ? "4" : "2"} pb-4 bg-white`}
      >
        <View className="flex-row items-center justify-between mb-4">
          <TouchableOpacity className="p-2">
            <Menu size={isTablet ? 28 : 24} color="#374151" />
          </TouchableOpacity>
          <TouchableOpacity className="p-2">
            <Filter size={isTablet ? 28 : 24} color="#374151" />
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center bg-gray-100 rounded-full px-4 py-3">
          <Search size={20} color="#9CA3AF" className="mr-3" />
          <TextInput
            placeholder="414 Parker Rd, Allentown"
            className={`flex-1 ${isTablet ? "text-lg" : "text-base"} text-gray-700`}
            placeholderTextColor="#9CA3AF"
          />
        </View>
      </View>

      {/* Map Area */}
      <View className="flex-1 bg-gray-200 relative">
        {/* Map Background - Using a placeholder */}
        <View className="absolute inset-0 bg-gray-300">
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80",
            }}
            className="w-full h-full opacity-30"
            resizeMode="cover"
          />
        </View>

        {/* Map Markers */}
        <View className="absolute top-20 left-8">
          <TouchableOpacity className="bg-blue-600 rounded-full p-3 shadow-lg">
            <Text className="text-white font-bold text-sm">$1k</Text>
          </TouchableOpacity>
        </View>

        <View className="absolute top-32 right-12">
          <TouchableOpacity className="bg-blue-600 rounded-full p-3 shadow-lg">
            <Text className="text-white font-bold text-sm">$2k</Text>
          </TouchableOpacity>
        </View>

        <View className="absolute bottom-40 left-16">
          <TouchableOpacity className="bg-gray-800 rounded-full p-3 shadow-lg">
            <MapPin size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Property Card */}
      <View
        className={`absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl px-${isTablet ? "6" : "4"} pt-6 pb-8`}
      >
        {/* Property Image */}
        <View className="relative mb-4">
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
            }}
            className={`w-full h-${isTablet ? "64" : "48"} rounded-2xl`}
            resizeMode="cover"
          />

          {/* Heart Icon */}
          <TouchableOpacity
            className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md"
            onPress={() => setIsLiked(!isLiked)}
          >
            <Heart
              size={isTablet ? 24 : 20}
              color={isLiked ? "#EF4444" : "#9CA3AF"}
              fill={isLiked ? "#EF4444" : "transparent"}
            />
          </TouchableOpacity>
        </View>

        {/* Property Details */}
        <View className="mb-4">
          <Text
            className={`font-bold text-gray-900 mb-2 ${isTablet ? "text-2xl" : "text-xl"}`}
          >
            Azure Bay Villas
          </Text>
          <Text
            className={`font-bold text-blue-600 mb-3 ${isTablet ? "text-xl" : "text-lg"}`}
          >
            $580,670
          </Text>

          {/* Property Features */}
          <View className="flex-row items-center space-x-6">
            <View className="flex-row items-center">
              <Bed size={isTablet ? 20 : 18} color="#6B7280" className="mr-1" />
              <Text
                className={`text-gray-600 ${isTablet ? "text-base" : "text-sm"}`}
              >
                3
              </Text>
            </View>

            <View className="flex-row items-center">
              <Bath
                size={isTablet ? 20 : 18}
                color="#6B7280"
                className="mr-1"
              />
              <Text
                className={`text-gray-600 ${isTablet ? "text-base" : "text-sm"}`}
              >
                4
              </Text>
            </View>

            <View className="flex-row items-center">
              <Square
                size={isTablet ? 20 : 18}
                color="#6B7280"
                className="mr-1"
              />
              <Text
                className={`text-gray-600 ${isTablet ? "text-base" : "text-sm"}`}
              >
                3450 sqft
              </Text>
            </View>
          </View>
        </View>

        {/* View Detail Button */}
        <TouchableOpacity
          className={`bg-gray-900 rounded-full py-${isTablet ? "4" : "3"} items-center`}
          activeOpacity={0.8}
        >
          <Text
            className={`text-white font-semibold ${isTablet ? "text-lg" : "text-base"}`}
          >
            View Detail
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaWithGradientBg>
  );
}
