import SafeAreaWithGradientBg from "@/components/utility/SafeAreaWithGradientBg";
import { router } from "expo-router";
import {
  ArrowLeft,
  Heart,
  MapPin,
  Search,
  Star,
  Verified
} from "lucide-react-native";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View
} from "react-native";

export default function RentalListingScreen() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const { width } = useWindowDimensions();

  // Responsive breakpoints
  const isTablet = width >= 768;
  const isLargeTablet = width >= 1024;

  const filters = ["All", "Type", "Payment", "Pricing"];

  const properties = [
    {
      id: 1,
      title: "Shade Type 15, Bekasi City",
      location: "Bekasi City",
      rooms: "2 Rooms Available",
      price: "$145/mo",
      rating: 4.8,
      image:
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
      verified: true,
      available: "Available",
      dormitory: "Boys Dormitory",
    },
    {
      id: 2,
      title: "Diablo House Type 3, Bekasi City",
      location: "Bekasi City",
      rooms: "1 Room Available",
      price: "$148/mo",
      rating: 4.6,
      image:
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
      verified: true,
      available: "Booking Dahulu",
      dormitory: "Boys Dormitory",
    },
    {
      id: 3,
      title: "Mira Pandansari Type 3 Bintaro, Jakarta Selatan",
      location: "Jakarta Selatan",
      rooms: "3 Rooms Available",
      price: "$155/mo",
      rating: 4.6,
      image:
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80",
      verified: true,
      available: "Available",
      dormitory: "Boys Dormitory",
    },
    {
      id: 4,
      title: "Sam Darmadi Type 3 Duren, Bekasi Timur",
      location: "Bekasi Timur",
      rooms: "2 Rooms Available",
      price: "$170/mo",
      rating: 4.5,
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      verified: true,
      available: "Duluan Dahulu",
      dormitory: "Boys Dormitory",
    },
  ];

  const renderPropertyCard = ({ item }: { item: any }) => {
    const cardWidth = isLargeTablet
      ? (width - 48) / 3 - 16
      : isTablet
        ? (width - 32) / 2 - 8
        : width - 32;

    return (
      <TouchableOpacity
        className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-4 overflow-hidden"
        style={{ width: cardWidth }}
      >
        <View className="relative">
          <Image
            source={{ uri: item.image }}
            className={`w-full ${isTablet ? "h-40" : "h-32"} bg-gray-200`}
            resizeMode="cover"
          />
          <TouchableOpacity className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full items-center justify-center">
            <Heart size={16} color="#6B7280" />
          </TouchableOpacity>

          {/* Available status */}
          <View className="absolute bottom-3 left-3">
            <View className="bg-green-500 px-2 py-1 rounded-md">
              <Text className="text-white text-xs font-medium">
                {item.available}
              </Text>
            </View>
          </View>
        </View>

        <View className={`p-${isTablet ? "4" : "3"}`}>
          <View className="flex-row items-start justify-between mb-2">
            <Text
              className={`font-bold text-gray-900 flex-1 ${isTablet ? "text-base" : "text-sm"}`}
              numberOfLines={2}
            >
              {item.title}
            </Text>
            {item.verified && (
              <View className="ml-2">
                <Verified size={16} color="#8B5CF6" fill="#8B5CF6" />
              </View>
            )}
          </View>

          <View className="flex-row items-center mb-1">
            <MapPin size={12} color="#6B7280" />
            <Text className="text-gray-500 text-xs ml-1">{item.location}</Text>
          </View>

          <Text className="text-gray-600 text-xs mb-2">{item.rooms}</Text>
          <Text className="text-gray-500 text-xs mb-3">{item.dormitory}</Text>

          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Star size={12} color="#F59E0B" fill="#F59E0B" />
              <Text className="text-gray-900 font-semibold text-xs ml-1">
                {item.rating}
              </Text>
            </View>
            <Text className="font-bold text-gray-900 text-sm">
              {item.price}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaWithGradientBg >
      {/* Header */}
      <View
        className={`bg-white px-${isTablet ? "6" : "4"} py-4 border-b border-gray-100`}
      >
        <View className="flex-row items-center justify-between mb-4">
          <TouchableOpacity className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center">
            <ArrowLeft size={20} color="#374151" onPress={()=>router.back()}/>
          </TouchableOpacity>

          <View className="flex-1 mx-4">
            <Text className="text-center font-bold text-gray-900 text-lg">
              Bekasi City
            </Text>
            <Text className="text-center text-gray-500 text-sm">
              10 Rooms • Near Me
            </Text>
          </View>

          {/* <TouchableOpacity className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center">
            <SlidersHorizontal size={20} color="#374151" />
          </TouchableOpacity> */}
        </View>

        {/* Search Bar */}
        <View className="flex-row items-center bg-gray-100 rounded-xl px-4 py-3">
          <Search size={20} color="#6B7280" />
          <TextInput
            className="flex-1 ml-3 text-gray-900"
            placeholder="Search properties..."
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Filter Tabs */}
      <View
        className={`bg-white px-${isTablet ? "6" : "4"} py-3 border-b border-gray-100`}
      >
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row space-x-4">
            {filters.map((filter) => (
              <TouchableOpacity
                key={filter}
                className={`px-4 py-2 rounded-full ${
                  activeFilter === filter ? "bg-black" : "bg-gray-100"
                }`}
                onPress={() => setActiveFilter(filter)}
              >
                <Text
                  className={`font-medium ${
                    activeFilter === filter ? "text-white" : "text-gray-600"
                  }`}
                >
                  {filter}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Property List */}
        {isLargeTablet ? (
          // Grid layout for large tablets
          <FlatList
            data={properties}
            renderItem={renderPropertyCard}
            numColumns={3}
            key="large-tablet"
            contentContainerStyle={{ padding: 16 }}
            columnWrapperStyle={{ justifyContent: "space-between" }}
            showsVerticalScrollIndicator={false}
          />
        ) : isTablet ? (
          // Grid layout for tablets
          <FlatList
            data={properties}
            renderItem={renderPropertyCard}
            numColumns={2}
            key="tablet"
            contentContainerStyle={{ padding: 16 }}
            columnWrapperStyle={{ justifyContent: "space-between" }}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          // Single column for mobile
          <FlatList
            data={properties}
            renderItem={renderPropertyCard}
            key="mobile"
            contentContainerStyle={{ padding: 16 }}
            showsVerticalScrollIndicator={false}
          />
        )}
    </SafeAreaWithGradientBg>
  );
}
